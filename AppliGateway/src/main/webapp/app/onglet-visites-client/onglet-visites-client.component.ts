import { Component, OnInit } from '@angular/core';
import {Visite, VisiteService} from "../entities/visite";
import {Client, ClientService} from "../entities/client";
import {Bien, BienService} from "../entities/bien";
import {JhiAlertService, JhiEventManager} from "ng-jhipster";
import {AccountService, Principal, User, UserService} from "../shared";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {ClientVisite, ClientVisiteService} from "../entities/client-visite";

@Component({
  selector: 'jhi-onglet-visites-client',
  templateUrl: './onglet-visites-client.component.html',
  styles: []
})
export class OngletVisitesClientComponent implements OnInit {

    visites: Visite[];
    login:String;
    settingsAccount: any;
    visite: Visite;
    isSaving: boolean;
    client: Client;
    biens: Bien[];
    account: Account
    clients: Client[];
    success: boolean;
    clientVisites: ClientVisite[];
    clientVisite: ClientVisite;

    constructor(
        private visiteService: VisiteService,
        private jhiAlertService: JhiAlertService,
        private accountS: AccountService,
        private principal: Principal,
        private clientVisiteService: ClientVisiteService,
        private bienService: BienService,
        private clientService: ClientService,
        private eventManager: JhiEventManager,
        private userService: UserService,



    ) { }

    loadAll() {
        //récupérer le login
        /*
                this.principal.identity().then((account) => {
                    this.account = account;
                    console.log("account " + aount.name);
                  /*  this.clientService.findIdClient(this.account.name).subscribe(
                        (res: HttpResponse<Client>) => {
                            this.client = res.body;
                            console.log("client " + this.client);


                        }

                    )*/
        /*this.visiteService.queryByclient(this.client.id).subscribe(
            (res: HttpResponse<Visite[]>) => {
                this.visites = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    });*/
    }
    ngOnInit() {
        this.success = false;
        this.principal.identity().then((account) => {
            this.settingsAccount = this.copyAccount(account);
            // recupérer l'id du client

            this.userService.find(this.settingsAccount.login).subscribe((res: HttpResponse<User>) => {
                console.log(res.body)
                //grace au id user on récupère le client
                this.clientService.findIdClient(res.body.id).subscribe(
                    (res: HttpResponse<Client>) => {
                        this.client = res.body;
                        this.clientVisiteService.queryVisiteByIdClient(this.client.id).subscribe(
                            (res: HttpResponse<ClientVisite[]>) => {
                                this.clientVisites = res.body;

                            },
                            (res: HttpErrorResponse) => this.onError(res.message)
                        );
                    })
            })
            });
    }

// suppression client à la visite
    desister(idVisite) {
        console.log('entre dans la inscripton');
        console.log(idVisite)
        console.log(this.clientVisites)
        this.clientVisiteService.delete(idVisite).subscribe((res: HttpResponse<any>) => {
                this.success = true;
            }
        );
        console.log(this.clientVisites)

    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
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
