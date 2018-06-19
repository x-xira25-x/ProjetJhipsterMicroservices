import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ClientVisite } from './client-visite.model';
import { ClientVisitePopupService } from './client-visite-popup.service';
import { ClientVisiteService } from './client-visite.service';
import { Visite, VisiteService } from '../visite';

@Component({
    selector: 'jhi-client-visite-dialog',
    templateUrl: './client-visite-dialog.component.html'
})
export class ClientVisiteDialogComponent implements OnInit {

    clientVisite: ClientVisite;
    isSaving: boolean;
    visites: Visite[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private clientVisiteService: ClientVisiteService,
        private visiteService: VisiteService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.visiteService.query()
            .subscribe((res: HttpResponse<Visite[]>) => { this.visites = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.clientVisite.id !== undefined) {
            this.subscribeToSaveResponse(
                this.clientVisiteService.update(this.clientVisite));
        } else {
            console.log(this.clientVisite);
            this.subscribeToSaveResponse(
                this.clientVisiteService.create(this.clientVisite));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ClientVisite>>) {
        result.subscribe((res: HttpResponse<ClientVisite>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ClientVisite) {
        this.eventManager.broadcast({ name: 'clientVisiteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackVisiteById(index: number, item: Visite) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-client-visite-popup',
    template: ''
})
export class ClientVisitePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clientVisitePopupService: ClientVisitePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.clientVisitePopupService
                    .open(ClientVisiteDialogComponent as Component, params['id']);
            } else {
                this.clientVisitePopupService
                    .open(ClientVisiteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
