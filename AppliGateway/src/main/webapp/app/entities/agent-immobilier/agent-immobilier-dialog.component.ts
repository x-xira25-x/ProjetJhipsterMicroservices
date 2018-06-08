import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import { AgentImmobilier } from './agent-immobilier.model';
import { AgentImmobilierPopupService } from './agent-immobilier-popup.service';
import { AgentImmobilierService } from './agent-immobilier.service';
import {User, UserService} from '../../shared';
import {Register} from '../../account';

@Component({
    selector: 'jhi-agent-immobilier-dialog',
    templateUrl: './agent-immobilier-dialog.component.html'
})
export class AgentImmobilierDialogComponent implements OnInit {

    agentImmobilier: AgentImmobilier;
    isSaving: boolean;
    registerAccount: any;
    users: User[];
    success: boolean;
    confirmPassword: string;
    doNotMatch: string;
    error: string;
    errorEmailExists: string;
    errorUserExists: string;
    user: User;
    authorities: any[];

    constructor(
        public activeModal: NgbActiveModal,
        private agentImmobilierService: AgentImmobilierService,
        private eventManager: JhiEventManager,
        private userService: UserService,
        private registerService: Register,
        private jhiAlertService: JhiAlertService
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = [];
        this.registerAccount = {};
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.userService.authorities().subscribe((authorities) => {
            this.authorities = authorities;

        });
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.agentImmobilier.id !== undefined) {
            this.subscribeToSaveResponse(
                this.agentImmobilierService.update(this.agentImmobilier));
        } else {
            if (this.registerAccount.password !== this.confirmPassword) {
                this.doNotMatch = 'ERROR';
            } else {
                this.doNotMatch = null;
                this.error = null;
                this.errorUserExists = null;
                this.errorEmailExists = null;
                this.registerAccount.langKey = 'en';
                this.registerService.save(this.registerAccount).subscribe(() => {
                    this.success = true;
                    this.userService.find(this.registerAccount.login).subscribe(resp => {
                        this.user = resp.body;
                        this.user.authorities = this.authorities;
                        this.userService.update(this.user).subscribe();
                        this.agentImmobilier.email = this.registerAccount.email;
                        this.agentImmobilier.idUser = this.user.id;
                        this.subscribeToSaveResponse(
                            this.agentImmobilierService.create(this.agentImmobilier));
                    });
                });
            }
        }
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
