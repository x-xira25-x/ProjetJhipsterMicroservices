import { BaseEntity } from './../../shared';

export class Client implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public adresse?: string,
        public npa?: string,
        public localite?: string,
        public email?: string,
        public idUser?: number,
        public numTel?: string,
        public typeClients?: BaseEntity[],
    ) {
    }
}
