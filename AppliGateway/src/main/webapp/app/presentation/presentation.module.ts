import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppliGatewaySharedModule} from '../shared';
import {RouterModule} from '@angular/router';
import {PresentationComponent} from './presentation.component';
import {presentationRoute} from './presentation.route';

const ENTITY_STATES = [
    ...presentationRoute,
];

@NgModule({
  imports: [
    CommonModule,
      AppliGatewaySharedModule,
      RouterModule.forChild(ENTITY_STATES)
  ],
    declarations: [
        PresentationComponent,

    ],
    entryComponents: [
        PresentationComponent,

    ]
})
export class PresentationModule { }
