import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ClientVisite } from './client-visite.model';
import { ClientVisiteService } from './client-visite.service';

@Component({
    selector: 'jhi-client-visite-detail',
    templateUrl: './client-visite-detail.component.html'
})
export class ClientVisiteDetailComponent implements OnInit, OnDestroy {

    clientVisite: ClientVisite;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private clientVisiteService: ClientVisiteService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInClientVisites();
    }

    load(id) {
        this.clientVisiteService.find(id)
            .subscribe((clientVisiteResponse: HttpResponse<ClientVisite>) => {
                this.clientVisite = clientVisiteResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInClientVisites() {
        this.eventSubscriber = this.eventManager.subscribe(
            'clientVisiteListModification',
            (response) => this.load(this.clientVisite.id)
        );
    }
}
