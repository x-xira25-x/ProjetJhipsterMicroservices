import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Client, ClientService} from "../entities/client";
import {EtatBien, EtatBienService} from "../entities/etat-bien";
import {TypeBien, TypeBienService} from "../entities/type-bien";
import {Visite, VisiteService} from "../entities/visite";
import {Principal, User, UserService} from "../shared";
import {JhiAlertService, JhiDataUtils, JhiEventManager} from "ng-jhipster";
import {Bien, BienService} from "../entities/bien";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";
import {AvendreVisitePopupService} from "./avendre-visite-popup.service";
import { ClientVisiteService} from "../entities/client-visite";
import {ClientVisite} from "./AvendreClient-visite.model";

@Component({
  selector: 'jhi-avendre-visite-dialogue',
  templateUrl: './avendre-visite-dialogue.component.html',
  styles: []
})
export class AvendreVisiteDialogueComponent implements OnInit {
    bien: Bien;
    isSaving: boolean;
    typebiens: TypeBien[];
    client: Client;
    clients: Client[];
    settingsAccount: any;
    etatbiens: EtatBien[];
    visite: Visite;
    visites: Visite[];
    success: boolean;
    clientVisite: ClientVisite;
    clientsVisites: ClientVisite[];
    visiteDouble:boolean;


    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private bienService: BienService,
        private typeBienService: TypeBienService,
        private clientService: ClientService,
        private etatBienService: EtatBienService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private visiteService: VisiteService,
        private userService: UserService,
        private clientVisiteService : ClientVisiteService,
    ) {
    }
    ngOnInit() {
        this.success = false;
        console.log(this.success);
        this.isSaving = false;
        this.typeBienService.query()
            .subscribe((res: HttpResponse<TypeBien[]>) => { this.typebiens = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.clientService.query()
            .subscribe((res: HttpResponse<Client[]>) => { this.clients = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.etatBienService.query()
            .subscribe((res: HttpResponse<EtatBien[]>) => { this.etatbiens = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));

    }

    inscription(idVisite) {
        console.log('entre dans la inscripton');
        console.log('id visite :' + idVisite);
        // récupérer  client
        this.principal.identity().then((account) => {
            this.settingsAccount = this.copyAccount(account);
            console.log(this.settingsAccount)
            // récupère le user
            this.userService.find(this.settingsAccount.login).subscribe((res: HttpResponse<User>) => {
                console.log(res.body)
            //grace au id user on récuère le client
            this.clientService.findIdClient(res.body.id).subscribe(
                (res: HttpResponse<Client>) => {
                    this.client = res.body;
                    // récupérer la visite
                    this.visiteService.find(idVisite).subscribe(
                        (res: HttpResponse<Visite>) => {
                            this.visite = res.body;
                            console.log(this.visite)
                            // ajout du client dans Clientvisite, création d'un objet ClientVisite pour ajouter idclient et visite
                            console.log("création clientVisite" +this.client.id)
                            console.log("cleintVisite" + this.clientVisite)
                              this.clientVisite ={idClient:this.client.id,visite:this.visite}
                              // rechercher tout les visites client pour controle qu'il n'y ait pas 2x la meme ligne
                            this.clientVisiteService.query().subscribe((res: HttpResponse<ClientVisite[]>) =>{
                                this.clientsVisites = res.body
                                this.visiteDouble=false;
                                console.log("double" + this.visiteDouble)
                                console.log(this.clientsVisites)
                                for (let l =0; l < this.clientsVisites.length; l++) {
                                  if(this.clientsVisites[l].idClient == this.client.id && this.clientsVisites[l].visite.id ==this.visite.id){
                                      this.visiteDouble= true;
                                  }
                                }
                                console.log("double" + this.visiteDouble)
                                //Création de la ligne dans la table clientVisite
                                if(this.visiteDouble ==false){
                                    this.clientVisiteService.create(this.clientVisite).subscribe()
                                    // window.location.reload(false);
                                    this.success = true;}

                            })


                        });
                });
            })
        });
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

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.bien, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

}

@Component({
    selector: 'jhi-avendreVisite-popup',
    template: ''
})
export class avendreVisitePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private avendreVisitePopupService: AvendreVisitePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            console.log('ngninit dans avendrevisitedialogcomponsent')
            if ( params['id'] ) {
                this.avendreVisitePopupService
                    .open(AvendreVisiteDialogueComponent as Component, params['id']);
            } else {
                this.avendreVisitePopupService
                    .open(AvendreVisiteDialogueComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

}
