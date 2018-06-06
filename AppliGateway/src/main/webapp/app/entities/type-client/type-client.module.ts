import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppliGatewaySharedModule } from '../../shared';
import {
    TypeClientService,
    TypeClientPopupService,
    TypeClientComponent,
    TypeClientDetailComponent,
    TypeClientDialogComponent,
    TypeClientPopupComponent,
    TypeClientDeletePopupComponent,
    TypeClientDeleteDialogComponent,
    typeClientRoute,
    typeClientPopupRoute,
} from './';

const ENTITY_STATES = [
    ...typeClientRoute,
    ...typeClientPopupRoute,
];

@NgModule({
    imports: [
        AppliGatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TypeClientComponent,
        TypeClientDetailComponent,
        TypeClientDialogComponent,
        TypeClientDeleteDialogComponent,
        TypeClientPopupComponent,
        TypeClientDeletePopupComponent,
    ],
    entryComponents: [
        TypeClientComponent,
        TypeClientDialogComponent,
        TypeClientPopupComponent,
        TypeClientDeleteDialogComponent,
        TypeClientDeletePopupComponent,
    ],
    providers: [
        TypeClientService,
        TypeClientPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppliGatewayTypeClientModule {}
