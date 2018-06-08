import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppliGatewayClientModule } from './client/client.module';
import { AppliGatewayTypeClientModule } from './type-client/type-client.module';
import { AppliGatewayAgentImmobilierModule } from './agent-immobilier/agent-immobilier.module';
import { AppliGatewayBienModule } from './bien/bien.module';
import { AppliGatewayTypeBienModule } from './type-bien/type-bien.module';
import { AppliGatewayEtatBienModule } from './etat-bien/etat-bien.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        AppliGatewayClientModule,
        AppliGatewayTypeClientModule,
        AppliGatewayAgentImmobilierModule,
        AppliGatewayBienModule,
        AppliGatewayTypeBienModule,
        AppliGatewayEtatBienModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppliGatewayEntityModule {}
