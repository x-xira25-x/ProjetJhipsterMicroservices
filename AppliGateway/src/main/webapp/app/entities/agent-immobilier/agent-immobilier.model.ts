import { BaseEntity } from './../../shared';

export class AgentImmobilier implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public adresse?: string,
        public npa?: number,
        public localite?: string,
        public numTel?: number,
        public email?: string,
        public idUser?: number,
    ) {
    }
}
