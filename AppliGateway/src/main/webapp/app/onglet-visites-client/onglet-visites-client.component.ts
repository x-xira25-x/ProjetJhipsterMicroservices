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

// essaie suppression client à la visite
    desister(idVisite) {
        console.log('entre dans la inscripton');
        // récupérer  client
  /*      this.principal.identity().then((account) => {
            this.settingsAccount = this.copyAccount(account);
            this.clientService.findIdClient(this.settingsAccount.login).subscribe(
                (res: HttpResponse<Client>) => {
                    this.client = res.body;
                    console.log('client' + this.client.id);
                    // essayer de récupérer la visite et mettre le client dedans
                    this.visiteService.find(idVisite).subscribe(
                        (res: HttpResponse<Visite>) => {
                            this.visite=res.body;
                            console.log('visite'+ this.visite.id);

                            // recherche le client de la visite pour le mettre à null
                            for (let i = 0; i <this.visite.clients.length; i++) {
                                if (this.client.id === this.visite.clients[i].id) {
                                    // mettre le client à null

                                    console.log(this.visite.clients[i])
                                    this.visite.clients[i]= null;
                                    console.log(this.visite.clients[i])

                                    this.visiteService.updateSansConvert(this.visite).subscribe(
                                        (res: HttpResponse<Visite>) => {
                                            this.visite = res.body;
                                            console.log('update visite');
                                            console.log(this.visite.clients[i])
                                            this.success = true;
                                        },
                                        (res: HttpErrorResponse) => this.onError(res.message)
                                    );
                                }
                            }

                        });

                });
        });*/
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
