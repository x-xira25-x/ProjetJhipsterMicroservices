import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppliGatewaySharedModule } from '../../shared';
import {
    VendeurService,
    VendeurPopupService,
    VendeurComponent,
    VendeurDetailComponent,
    VendeurDialogComponent,
    VendeurPopupComponent,
    VendeurDeletePopupComponent,
    VendeurDeleteDialogComponent,
    vendeurRoute,
    vendeurPopupRoute,
} from './';

const ENTITY_STATES = [
    ...vendeurRoute,
    ...vendeurPopupRoute,
];

@NgModule({
    imports: [
        AppliGatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VendeurComponent,
        VendeurDetailComponent,
        VendeurDialogComponent,
        VendeurDeleteDialogComponent,
        VendeurPopupComponent,
        VendeurDeletePopupComponent,
    ],
    entryComponents: [
        VendeurComponent,
        VendeurDialogComponent,
        VendeurPopupComponent,
        VendeurDeleteDialogComponent,
        VendeurDeletePopupComponent,
    ],
    providers: [
        VendeurService,
        VendeurPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppliGatewayVendeurModule {}
