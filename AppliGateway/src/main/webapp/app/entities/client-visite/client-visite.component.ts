import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ClientVisite } from './client-visite.model';
import { ClientVisiteService } from './client-visite.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-client-visite',
    templateUrl: './client-visite.component.html'
})
export class ClientVisiteComponent implements OnInit, OnDestroy {
clientVisites: ClientVisite[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private clientVisiteService: ClientVisiteService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.clientVisiteService.query().subscribe(
            (res: HttpResponse<ClientVisite[]>) => {
                this.clientVisites = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInClientVisites();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ClientVisite) {
        return item.id;
    }
    registerChangeInClientVisites() {
        this.eventSubscriber = this.eventManager.subscribe('clientVisiteListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
