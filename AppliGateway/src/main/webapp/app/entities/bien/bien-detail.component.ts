import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Bien } from './bien.model';
import { BienService } from './bien.service';
import {Client, ClientService} from '../client';

@Component({
    selector: 'jhi-bien-detail',
    templateUrl: './bien-detail.component.html'
})
export class BienDetailComponent implements OnInit, OnDestroy {

    bien: Bien;
    client: Client;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private bienService: BienService,
        private route: ActivatedRoute,
        private clientService: ClientService,
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);

        });
        this.registerChangeInBiens();

    }

    load(id) {
        this.bienService.find(id)
            .subscribe((bienResponse: HttpResponse<Bien>) => {
                this.bien = bienResponse.body;
                console.log(this.bien.idClient);
                this.clientService.find(this.bien.idClient).subscribe( resp => {
                    this.client = resp.body;
                    console.log(this.client);
                });
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBiens() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bienListModification',
            (response) => this.load(this.bien.id)
        );
    }
}
