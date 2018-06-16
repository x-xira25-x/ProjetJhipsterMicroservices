import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppliGatewaySharedModule } from '../../shared';
import {
    VisiteService,
    VisitePopupService,
    VisiteComponent,
    VisiteDetailComponent,
    VisiteDialogComponent,
    VisitePopupComponent,
    VisiteDeletePopupComponent,
    VisiteDeleteDialogComponent,
    visiteRoute,
    visitePopupRoute,
} from './';

const ENTITY_STATES = [
    ...visiteRoute,
    ...visitePopupRoute,
];

@NgModule({
    imports: [
        AppliGatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VisiteComponent,
        VisiteDetailComponent,
        VisiteDialogComponent,
        VisiteDeleteDialogComponent,
        VisitePopupComponent,
        VisiteDeletePopupComponent,
    ],
    entryComponents: [
        VisiteComponent,
        VisiteDialogComponent,
        VisitePopupComponent,
        VisiteDeleteDialogComponent,
        VisiteDeletePopupComponent,
    ],
    providers: [
        VisiteService,
        VisitePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppliGatewayVisiteModule {}
