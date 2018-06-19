import { BaseEntity } from './../../shared';
import {Visite} from '../visite';

export class ClientVisite implements BaseEntity {
    constructor(
        public id?: number,
        public idClient?: number,
        public visite?: Visite,
    ) {
    }
}
