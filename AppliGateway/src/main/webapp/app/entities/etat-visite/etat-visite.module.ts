import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppliGatewaySharedModule } from '../../shared';
import {
    EtatVisiteService,
    EtatVisitePopupService,
    EtatVisiteComponent,
    EtatVisiteDetailComponent,
    EtatVisiteDialogComponent,
    EtatVisitePopupComponent,
    EtatVisiteDeletePopupComponent,
    EtatVisiteDeleteDialogComponent,
    etatVisiteRoute,
    etatVisitePopupRoute,
} from './';

const ENTITY_STATES = [
    ...etatVisiteRoute,
    ...etatVisitePopupRoute,
];

@NgModule({
    imports: [
        AppliGatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EtatVisiteComponent,
        EtatVisiteDetailComponent,
        EtatVisiteDialogComponent,
        EtatVisiteDeleteDialogComponent,
        EtatVisitePopupComponent,
        EtatVisiteDeletePopupComponent,
    ],
    entryComponents: [
        EtatVisiteComponent,
        EtatVisiteDialogComponent,
        EtatVisitePopupComponent,
        EtatVisiteDeleteDialogComponent,
        EtatVisiteDeletePopupComponent,
    ],
    providers: [
        EtatVisiteService,
        EtatVisitePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppliGatewayEtatVisiteModule {}
