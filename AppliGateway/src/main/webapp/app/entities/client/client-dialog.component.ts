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

    typeclients: TypeClient[];

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
        this.isSaving = false;
        this.typeClientService.query()
            .subscribe((res: HttpResponse<TypeClient[]>) => { this.typeclients = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => {
                this.users = res.body;})
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.client.id !== undefined) {
            this.subscribeToSaveResponse(
                this.clientService.update(this.client));
        } else {
            this.subscribeToSaveResponse(
                this.clientService.create(this.client));
        }
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
