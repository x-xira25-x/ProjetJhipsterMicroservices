import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppliGatewaySharedModule } from '../../shared';
import {
    ClientVisiteService,
    ClientVisitePopupService,
    ClientVisiteComponent,
    ClientVisiteDetailComponent,
    ClientVisiteDialogComponent,
    ClientVisitePopupComponent,
    ClientVisiteDeletePopupComponent,
    ClientVisiteDeleteDialogComponent,
    clientVisiteRoute,
    clientVisitePopupRoute,
} from './';

const ENTITY_STATES = [
    ...clientVisiteRoute,
    ...clientVisitePopupRoute,
];

@NgModule({
    imports: [
        AppliGatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ClientVisiteComponent,
        ClientVisiteDetailComponent,
        ClientVisiteDialogComponent,
        ClientVisiteDeleteDialogComponent,
        ClientVisitePopupComponent,
        ClientVisiteDeletePopupComponent,
    ],
    entryComponents: [
        ClientVisiteComponent,
        ClientVisiteDialogComponent,
        ClientVisitePopupComponent,
        ClientVisiteDeleteDialogComponent,
        ClientVisiteDeletePopupComponent,
    ],
    providers: [
        ClientVisiteService,
        ClientVisitePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppliGatewayClientVisiteModule {}
