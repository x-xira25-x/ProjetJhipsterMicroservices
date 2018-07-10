import { Routes } from '@angular/router';
import {PresentationComponent} from './presentation.component';


export const presentationRoute: Routes = [
    {
        path: 'Presentation',
        component: PresentationComponent,
        data: {
            // authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.entities.presentation'
        },
    }
];
