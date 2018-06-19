import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {avendrePopupRoute, avendreRoute} from './avendre.route';
import {RouterModule} from '@angular/router';
import {AvendreComponent} from './avendre.component';
import {AppliGatewaySharedModule} from '../shared';
import {AvendreVisiteDialogueComponent, avendreVisitePopupComponent} from './avendre-visite-dialogue.component';
import {AvendreVisitePopupService} from './avendre-visite-popup.service';
import {AvendreVisiteService} from './avendre-visite.service';

const ENTITY_STATES = [
    ...avendreRoute,
    ...avendrePopupRoute,
];
@NgModule({
  imports: [
    CommonModule,
      AppliGatewaySharedModule,
      RouterModule.forChild(ENTITY_STATES)
  ],
    declarations: [

        AvendreComponent,
        AvendreVisiteDialogueComponent,
        avendreVisitePopupComponent ,

    ],
    entryComponents: [
        AvendreComponent,
        AvendreVisiteDialogueComponent,
        avendreVisitePopupComponent,

    ],

    providers: [
        AvendreVisitePopupService,
        AvendreVisiteService
    ]

})
export class AvendreModule { }
