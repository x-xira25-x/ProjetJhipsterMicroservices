import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Visite } from './visite.model';
import { VisitePopupService } from './visite-popup.service';
import { VisiteService } from './visite.service';
import { EtatVisite, EtatVisiteService } from '../etat-visite';
import {AgentImmobilier, AgentImmobilierService} from '../agent-immobilier';
import {Bien, BienService} from '../bien';
import {ClientVisite, ClientVisiteService} from '../client-visite';
import {Client, ClientService} from '../client';

@Component({
    selector: 'jhi-visite-dialog',
    templateUrl: './visite-dialog.component.html'
})
export class VisiteDialogComponent implements OnInit {

    visite: Visite;
    isSaving: boolean;
    agentsImmo: AgentImmobilier[];
    agentImmobilier: AgentImmobilier;
    etatvisites: EtatVisite[];
    biens: Bien[];
    bien: Bien;
    clients: Client[];
    clientVisite: ClientVisite;
    clientVisites: ClientVisite[];
    clientsVisitesBefore: ClientVisite[];
    listeIdClient: number [];
    listeNewIdClient: number[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private visiteService: VisiteService,
        private etatVisiteService: EtatVisiteService,
        private eventManager: JhiEventManager,
        private agentImmoService: AgentImmobilierService,
        private bienService: BienService,
        private clientService: ClientService,
        private clientVisiteService: ClientVisiteService,
    ) {
    }

    ngOnInit() {

        this.isSaving = false;
        this.etatVisiteService.query()
            .subscribe((res: HttpResponse<EtatVisite[]>) => {
                this.etatvisites = res.body;
                }, (res: HttpErrorResponse) => this.onError(res.message));
        this.agentImmoService.query().subscribe((res: HttpResponse<AgentImmobilier[]>) => {
            this.agentsImmo = res.body;
            console.log('agent ' + this.agentsImmo);
            }, (res: HttpErrorResponse) => this.onError(res.message) );

        this.bienService.query().subscribe((res: HttpResponse<Bien[]>) => {
            this.biens = res.body;
            console.log('bien' + this.biens);
            }, (res: HttpErrorResponse) => this.onError(res.message) );
        this.clientService.query().subscribe((res: HttpResponse<Client[]>) => {
            this.clients = res.body;
            console.log('client' + this.clients);
        }, (res: HttpErrorResponse) => this.onError(res.message) );

        // récupérer les clients de la visite
        this.clientVisiteService.queryVisiteByIdVisite(this.visite.id).subscribe((res:HttpResponse<ClientVisite[]>) => {
            this.clientVisites = res.body;
            console.log(this.clientVisites);
        });
        console.log(this.visite.etatVisite );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.listeIdClient =  [];
        this.listeNewIdClient = [];
        console.log(this.clientVisites);
        if (this.visite.id !== undefined) {
            this.subscribeToSaveResponse(
                this.visiteService.update(this.visite));
            // aller chercher la liste par rapport à id visite et comparer
            this.clientVisiteService.queryVisiteByIdVisite(this.visite.id).subscribe((res:HttpResponse<ClientVisite[]>) => {
                this.clientsVisitesBefore = res.body;
                console.log(this.clientsVisitesBefore);
                // sortir les id et les mettre dans une liste
                for (let i = 0 ; i < this.clientsVisitesBefore.length; i++) {
                    this.listeIdClient.push(this.clientsVisitesBefore[i].idClient);
                }
                console.log('liste des clients pour la liste avant modif' + this.listeIdClient);
                console.log(this.clientVisites[0].id);
                for (let i = 0; i < this.clientVisites.length; i++) {
                    console.log('boucle' + this.clientVisites[i] );
                    this.listeNewIdClient.push(this.clientVisites[i].id);
                }
                console.log('liste new' + this.listeNewIdClient);
                let missingClient = this.listeIdClient.filter(item => this.listeNewIdClient.indexOf(item) < 0);
                console.log(missingClient);
            });
        } else {
            this.subscribeToSaveResponse(
                this.visiteService.create(this.visite));
            this.clientVisiteService.create(this.clientVisite);
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Visite>>) {
        result.subscribe((res: HttpResponse<Visite>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Visite) {
        this.eventManager.broadcast({ name: 'visiteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEtatVisiteById(index: number, item: EtatVisite) {
        return item.id;
    }

    trackClientById(index: number, item: Client) {
        return item.id;
    }

    trackAgentImmoById(index: number, item: AgentImmobilier) {
        return item.id;
    }

    trackBienById(index: number, item: Bien) {
        return item.id;
    }
    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-visite-popup',
    template: ''
})
export class VisitePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private visitePopupService: VisitePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.visitePopupService
                    .open(VisiteDialogComponent as Component, params['id']);
            } else {
                this.visitePopupService
                    .open(VisiteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
