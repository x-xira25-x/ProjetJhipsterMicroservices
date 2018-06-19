import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ongletVisitesClientRoute} from './onglet-visites-client.route';
import {OngletVisitesClientComponent} from './onglet-visites-client.component';
import {RouterModule} from '@angular/router';
import {AppliGatewaySharedModule} from '../shared';

const ENTITY_STATES = [
    ...ongletVisitesClientRoute,
];

@NgModule({
  imports: [
      CommonModule,
      AppliGatewaySharedModule,
      RouterModule.forChild(ENTITY_STATES)
  ],
    declarations: [
        OngletVisitesClientComponent,

    ],
    entryComponents: [
        OngletVisitesClientComponent,

    ],
})
export class OngletVisitesClientModule { }
