import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import { AgentImmobilier } from './agent-immobilier.model';
import { AgentImmobilierPopupService } from './agent-immobilier-popup.service';
import { AgentImmobilierService } from './agent-immobilier.service';
import {Principal, User, UserService} from '../../shared';
import {Register} from '../../account';
import {Client, ClientService} from "../client";

@Component({
    selector: 'jhi-agent-immobilier-dialog',
    templateUrl: './agent-immobilier-dialog.component.html'
})
export class AgentImmobilierDialogComponent implements OnInit {

    agentImmobilier: AgentImmobilier;
    isSaving: boolean;
    registerAccount: any;
    usersAll: User[];
    success: boolean;
    confirmPassword: string;
    doNotMatch: string;
    error: string;
    user: User;
    authorities: any[];
    users: User[];
    clients: Client[];
    agents: AgentImmobilier[];
    usersDispo: User[];
    num: number;
    listeIdUserClient: number [];
    listeidUserAgent: number [];
    listeIdUser: number [];
    email : string;

    constructor(
        public activeModal: NgbActiveModal,
        private agentImmobilierService: AgentImmobilierService,
        private eventManager: JhiEventManager,
        private userService: UserService,
        private registerService: Register,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private clientService: ClientService,
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = [];
        this.registerAccount = {};
        this.usersDispo= [];
        this.authorities = [];
        this.listeIdUserClient = [];
        this.listeidUserAgent = [];
        this.listeIdUser= [];
        this.user ={};
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => {
                this.users = res.body; this.agentImmobilierService.query().subscribe((res: HttpResponse<AgentImmobilier[]>) => {
                    this.agents = res.body;
                    this.clientService.query().subscribe((res: HttpResponse<Client[]>) => {
                        this.clients = res.body;
                        console.log(this.clients)
                        console.log(this.users);
                        //sortir les id
                        for(let i=0;i<this.clients.length; i++){
                            this.listeIdUserClient.push(this.clients[i].idUser);
                        }
                        console.log("liste id User pour client: " + this.listeIdUserClient);

                        for(let i=0;i<this.agents.length; i++){
                            this.listeidUserAgent.push(this.agents[i].idUser);
                        }
                        console.log("liste id user agent " + this.listeidUserAgent);
                        for(let i=0;i<this.users.length; i++){
                            this.listeIdUser.push(this.users[i].id);

                        }
                        console.log("liste id user " + this.listeIdUser);
                        // comparer les listes

                        let missingClient = this.listeIdUser.filter(item => this.listeIdUserClient.indexOf(item) < 0);
                        console.log(missingClient);
                        let missingAgent = this.listeIdUser.filter(item => this.listeidUserAgent.indexOf(item) < 0);
                        console.log(missingAgent)
                        let missingUser = missingClient.filter(item => missingAgent.indexOf(item)>0);
                        console.log(missingUser)
                        let num=0;
                        //aller recherche les users pour les mettre dans la liste
                        for (let y =0; y< missingUser.length; y++){

                            this.userService.findUserById(missingUser[y]).subscribe((res: HttpResponse<User>) => {
                                    console.log(num)
                                    this.usersDispo[num]= res.body;
                                    console.log(this.usersDispo[y].authorities)
                                    num++;
                                }
                            )
                            console.log(num)

                        }
                        console.log( this.usersDispo);
                        console.log(this.users)
                    });
                }); }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.authorities().subscribe((authorities) => {
            this.authorities = authorities;
        });
        if(this.agentImmobilier.idUser){
            this.userService.findUserById(this.agentImmobilier.idUser).subscribe(resp => {
                this.user = resp.body;
            });
        }

    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.email = this.user.email;
        console.log("email" +this.email)
        this.userService.findUserById(this.agentImmobilier.idUser).subscribe(resp => {
            this.user = resp.body;

            this.agentImmobilier.email= this.email;
            this.user.email = this.email;
            console.log("user" +this.user.email)
            console.log("agent " + this.agentImmobilier.email)
            if (this.agentImmobilier.id !== undefined) {
                console.log(this.agentImmobilier)

                this.subscribeToSaveResponse(
                    this.agentImmobilierService.update(this.agentImmobilier));
                console.log(this.user.email);
                this.userService.update(this.user).subscribe( res =>{

                    console.log("update" + this.user.email);
                });

            } else {
                this.subscribeToSaveResponse(
                    this.agentImmobilierService.create(this.agentImmobilier));

            }
        })

    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AgentImmobilier>>) {
        result.subscribe((res: HttpResponse<AgentImmobilier>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AgentImmobilier) {
        this.eventManager.broadcast({ name: 'agentImmobilierListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index:number, item: User) {
        return item.id;
    }

    copyAccount(account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl
        };
    }
}

@Component({
    selector: 'jhi-agent-immobilier-popup',
    template: ''
})
export class AgentImmobilierPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private agentImmobilierPopupService: AgentImmobilierPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.agentImmobilierPopupService
                    .open(AgentImmobilierDialogComponent as Component, params['id']);
            } else {
                this.agentImmobilierPopupService
                    .open(AgentImmobilierDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
