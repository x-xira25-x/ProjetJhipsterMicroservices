import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Client } from './client.model';
import { ClientPopupService } from './client-popup.service';
import { ClientService } from './client.service';
import { TypeClient, TypeClientService } from '../type-client';
import {User, UserService} from "../../shared";

@Component({
    selector: 'jhi-client-dialog',
    templateUrl: './client-dialog.component.html'
})
export class ClientDialogComponent implements OnInit {

    client: Client;
    isSaving: boolean;
    users: User[];
    clients: Client[];
    typeclients: TypeClient[];
    listeIdUserClient: number [];
    listeIdUser: number[];
    usersDispo: User[];
    email : string;
    user: User;


    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private clientService: ClientService,
        private typeClientService: TypeClientService,
        private eventManager: JhiEventManager,
        private userService: UserService,
    ) {
    }

    ngOnInit() {
        console.log("inih")
        this.isSaving = false;
        this.listeIdUserClient = [];
        this.listeIdUser = [];
        this.usersDispo= [];
        this.user ={};
        this.typeClientService.query()
            .subscribe((res: HttpResponse<TypeClient[]>) => { this.typeclients = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => {
                this.users = res.body;
                this.clientService.query().subscribe((res: HttpResponse<Client[]>) => {
                    this.clients = res.body;
                    console.log("user")
                    // sortir les id
                    for (let i = 0; i < this.clients.length; i++) {
                        this.listeIdUserClient.push(this.clients[i].idUser);
                    }
                    for(let i = 0; i < this.users.length; i ++){
                        for(let l =0; l< this.users[i].authorities.length; l ++){
                                if(this.users[i].authorities[l] == "ROLE_USER"){
                                    this.listeIdUser.push(this.users[i].id)
                                }
                            }
                        }
                    //comparaison, resort les id dispo
                    let missingUser = this.listeIdUser.filter(item => this.listeIdUserClient.indexOf(item) < 0);
                    let num=0;
                    //aller recherche les users pour les mettre dans la liste
                    for (let y =0; y< missingUser.length; y++){

                        this.userService.findUserById(missingUser[y]).subscribe((res: HttpResponse<User>) => {
                                this.usersDispo[num]= res.body;
                                num++;
                            }
                        )
                    }
                });
              })
        if(this.client.idUser){
            this.userService.findUserById(this.client.idUser).subscribe(resp => {
                this.user = resp.body;
            });
        }
        console.log("email " +this.user.email)
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.email = this.user.email;
        console.log("email" +this.email)
        this.userService.findUserById(this.client.idUser).subscribe(resp => {
            this.user = resp.body;

            this.client.email= this.email;
            this.user.email = this.email;
            console.log("user" +this.user.email)
            console.log("client " + this.client.email)
        if (this.client.id !== undefined) {
            this.subscribeToSaveResponse(
               this.clientService.update(this.client));
            console.log(this.user.email);
            this.userService.update(this.user).subscribe( res =>{
                console.log("update" + this.user.email);
            });
        } else {
            this.subscribeToSaveResponse(
                this.clientService.create(this.client));
        }
        })
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Client>>) {
        result.subscribe((res: HttpResponse<Client>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Client) {
        this.eventManager.broadcast({ name: 'clientListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTypeClientById(index: number, item: TypeClient) {
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
    selector: 'jhi-client-popup',
    template: ''
})
export class ClientPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clientPopupService: ClientPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.clientPopupService
                    .open(ClientDialogComponent as Component, params['id']);
            } else {
                this.clientPopupService
                    .open(ClientDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
