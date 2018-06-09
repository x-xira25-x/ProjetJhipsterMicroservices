import { BaseEntity } from './../../shared';

export class ClientVisite implements BaseEntity {
    constructor(
        public id?: number,
        public idClient?: number,
        public visite?: BaseEntity,
    ) {
    }
}
