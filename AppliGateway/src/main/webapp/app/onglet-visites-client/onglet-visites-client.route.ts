import { Routes } from '@angular/router';
import {OngletVisitesClientComponent} from './onglet-visites-client.component';

export const ongletVisitesClientRoute: Routes = [
    {
        path: 'VisitesClient',
        component: OngletVisitesClientComponent,
        data: {
            // authorities: ['ROLE_USER'],
            pageTitle: 'Visite'
        },
    }
];
