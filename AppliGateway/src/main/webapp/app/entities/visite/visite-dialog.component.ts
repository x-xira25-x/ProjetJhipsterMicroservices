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

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private visiteService: VisiteService,
        private etatVisiteService: EtatVisiteService,
        private eventManager: JhiEventManager,
        private agentImmoService: AgentImmobilierService,
        private bienService: BienService,
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
            console.log(this.agentsImmo);
            }, (res: HttpErrorResponse) => this.onError(res.message) );

        this.bienService.query().subscribe((res: HttpResponse<Bien[]>) => {
            this.biens = res.body;
            console.log(this.biens);
            }, (res: HttpErrorResponse) => this.onError(res.message) );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.visite.id !== undefined) {
            this.visite.idAgentImmobilier = this.agentImmobilier.id;
            this.visite.idBien = this.bien.id;
            this.subscribeToSaveResponse(
                this.visiteService.update(this.visite));
        } else {
            this.visite.idAgentImmobilier = this.agentImmobilier.id;
            this.visite.idBien = this.bien.id;
            this.subscribeToSaveResponse(
                this.visiteService.create(this.visite));
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

    trackAgentImmoById(index: number, item: AgentImmobilier) {
        return item.id;
    }

    trackBienById(index: number, item: Bien) {
        return item.id;
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
