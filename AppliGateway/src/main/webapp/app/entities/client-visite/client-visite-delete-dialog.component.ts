import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ClientVisite } from './client-visite.model';
import { ClientVisitePopupService } from './client-visite-popup.service';
import { ClientVisiteService } from './client-visite.service';

@Component({
    selector: 'jhi-client-visite-delete-dialog',
    templateUrl: './client-visite-delete-dialog.component.html'
})
export class ClientVisiteDeleteDialogComponent {

    clientVisite: ClientVisite;

    constructor(
        private clientVisiteService: ClientVisiteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.clientVisiteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'clientVisiteListModification',
                content: 'Deleted an clientVisite'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-client-visite-delete-popup',
    template: ''
})
export class ClientVisiteDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clientVisitePopupService: ClientVisitePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.clientVisitePopupService
                .open(ClientVisiteDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
