import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppliGatewaySharedModule } from '../../shared';
import {
    AgentImmobilierService,
    AgentImmobilierPopupService,
    AgentImmobilierComponent,
    AgentImmobilierDetailComponent,
    AgentImmobilierDialogComponent,
    AgentImmobilierPopupComponent,
    AgentImmobilierDeletePopupComponent,
    AgentImmobilierDeleteDialogComponent,
    agentImmobilierRoute,
    agentImmobilierPopupRoute,
} from './';

const ENTITY_STATES = [
    ...agentImmobilierRoute,
    ...agentImmobilierPopupRoute,
];

@NgModule({
    imports: [
        AppliGatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AgentImmobilierComponent,
        AgentImmobilierDetailComponent,
        AgentImmobilierDialogComponent,
        AgentImmobilierDeleteDialogComponent,
        AgentImmobilierPopupComponent,
        AgentImmobilierDeletePopupComponent,
    ],
    entryComponents: [
        AgentImmobilierComponent,
        AgentImmobilierDialogComponent,
        AgentImmobilierPopupComponent,
        AgentImmobilierDeleteDialogComponent,
        AgentImmobilierDeletePopupComponent,
    ],
    providers: [
        AgentImmobilierService,
        AgentImmobilierPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppliGatewayAgentImmobilierModule {}
