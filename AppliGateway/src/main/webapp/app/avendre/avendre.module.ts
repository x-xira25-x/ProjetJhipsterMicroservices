import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {avendreRoute} from "./avendre.route";
import {RouterModule} from "@angular/router";
import {AvendreComponent} from "./avendre.component";
import {AppliGatewaySharedModule} from "../shared";

const ENTITY_STATES = [
    ...avendreRoute,
/*    ...avendrePopupRoute*/
];
@NgModule({
  imports: [
    CommonModule,
      AppliGatewaySharedModule,
      RouterModule.forChild(ENTITY_STATES)
  ],
    declarations: [

        AvendreComponent,
      /*  AvendreVisiteDialogComponent,
        avendreVisitePopupComponent*/
    ],
    entryComponents: [
        AvendreComponent,
       /* AvendreVisiteDialogComponent,
        avendreVisitePopupComponent*/
    ],

    providers: [
       /* AvendreVisitePopupService,
        AvendreVisiteService*/
    ]

})
export class AvendreModule { }
