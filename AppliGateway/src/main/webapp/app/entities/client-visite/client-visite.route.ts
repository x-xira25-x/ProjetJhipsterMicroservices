import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ClientVisiteComponent } from './client-visite.component';
import { ClientVisiteDetailComponent } from './client-visite-detail.component';
import { ClientVisitePopupComponent } from './client-visite-dialog.component';
import { ClientVisiteDeletePopupComponent } from './client-visite-delete-dialog.component';

export const clientVisiteRoute: Routes = [
    {
        path: 'client-visite',
        component: ClientVisiteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appliGatewayApp.clientVisite.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'client-visite/:id',
        component: ClientVisiteDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appliGatewayApp.clientVisite.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const clientVisitePopupRoute: Routes = [
    {
        path: 'client-visite-new',
        component: ClientVisitePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appliGatewayApp.clientVisite.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'client-visite/:id/edit',
        component: ClientVisitePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appliGatewayApp.clientVisite.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'client-visite/:id/delete',
        component: ClientVisiteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appliGatewayApp.clientVisite.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
