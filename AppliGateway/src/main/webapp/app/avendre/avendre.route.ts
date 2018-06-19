import { Routes } from '@angular/router';
import {AvendreComponent} from './avendre.component';
import {UserRouteAccessService} from '../shared';
import {AvendreVisitePopupService} from './avendre-visite-popup.service';
import {avendreVisitePopupComponent} from './avendre-visite-dialogue.component';

export const avendreRoute: Routes = [
    {
        path: 'avendre',
        component: AvendreComponent,
        data: {
            // authorities: ['ROLE_USER'],
            pageTitle: 'appliGatewayApp.Avendre.home.title'
        },
    }
];
export const avendrePopupRoute: Routes = [
    {
        path: 'bienVisite/:id/visite',

        component: avendreVisitePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_ADMIN'],
            pageTitle: 'BiensVisite'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }

];
