import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ClientComponent } from './client.component';
import { ClientDetailComponent } from './client-detail.component';
import { ClientPopupComponent } from './client-dialog.component';
import { ClientDeletePopupComponent } from './client-delete-dialog.component';

export const clientRoute: Routes = [
    {
        path: 'client',
        component: ClientComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appliGatewayApp.client.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'client/:id',
        component: ClientDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appliGatewayApp.client.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const clientPopupRoute: Routes = [
    {
        path: 'client-new',
        component: ClientPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appliGatewayApp.client.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'client/:id/edit',
        component: ClientPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appliGatewayApp.client.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'client/:id/delete',
        component: ClientDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'appliGatewayApp.client.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
