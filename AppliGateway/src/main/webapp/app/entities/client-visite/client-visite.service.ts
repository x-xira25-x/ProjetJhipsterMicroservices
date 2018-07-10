import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ClientVisite } from './client-visite.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ClientVisite>;

@Injectable()
export class ClientVisiteService {

    private resourceUrl =  SERVER_API_URL + 'service3visite/api/client-visites';

    constructor(private http: HttpClient) { }

    create(clientVisite: ClientVisite): Observable<EntityResponseType> {
        const copy = this.convert(clientVisite);
        return this.http.post<ClientVisite>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(clientVisite: ClientVisite): Observable<EntityResponseType> {
        const copy = this.convert(clientVisite);
        return this.http.put<ClientVisite>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ClientVisite>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ClientVisite[]>> {
        const options = createRequestOption(req);
        return this.http.get<ClientVisite[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ClientVisite[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    // ajout
    queryVisiteByIdClient(id: number): Observable<HttpResponse<ClientVisite[]>> {
        return this.http.get<ClientVisite[]>(`http://localhost:8080/service3visite/api/client-visites/${id}/client/`, {observe: 'response' })
            .map((res: HttpResponse<ClientVisite[]>) => this.convertArrayResponse(res));
    }

    // ajout
    queryVisiteByIdVisite(idVisite: number): Observable<HttpResponse<ClientVisite[]>> {
        return this.http.get<ClientVisite[]>(`http://localhost:8080/service3visite/api/client-visites/${idVisite}/visite/`, {observe: 'response' })
            .map((res: HttpResponse<ClientVisite[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ClientVisite = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ClientVisite[]>): HttpResponse<ClientVisite[]> {
        const jsonResponse: ClientVisite[] = res.body;
        const body: ClientVisite[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ClientVisite.
     */
    private convertItemFromServer(clientVisite: ClientVisite): ClientVisite {
        const copy: ClientVisite = Object.assign({}, clientVisite);
        return copy;
    }

    /**
     * Convert a ClientVisite to a JSON which can be sent to the server.
     */
    private convert(clientVisite: ClientVisite): ClientVisite {
        const copy: ClientVisite = Object.assign({}, clientVisite);
        return copy;
    }
}
