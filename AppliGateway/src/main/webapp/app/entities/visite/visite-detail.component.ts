import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Visite } from './visite.model';
import { VisiteService } from './visite.service';
import {AgentImmobilier, AgentImmobilierService} from "../agent-immobilier";

@Component({
    selector: 'jhi-visite-detail',
    templateUrl: './visite-detail.component.html'
})
export class VisiteDetailComponent implements OnInit, OnDestroy {

    visite: Visite;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    agentImmos: AgentImmobilier[];

    constructor(
        private eventManager: JhiEventManager,
        private visiteService: VisiteService,
        private route: ActivatedRoute,
        private agentImmoService: AgentImmobilierService,
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVisites();
    }

    load(id) {
        this.visiteService.find(id)
            .subscribe((visiteResponse: HttpResponse<Visite>) => {
                this.visite = visiteResponse.body;
            });
        this.agentImmoService.query().subscribe(
            (res: HttpResponse<AgentImmobilier[]>) =>{
                this.agentImmos=res.body;
                console.log(this.agentImmos)
            })
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVisites() {
        this.eventSubscriber = this.eventManager.subscribe(
            'visiteListModification',
            (response) => this.load(this.visite.id)
        );
    }
}
