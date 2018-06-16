/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AppliGatewayTestModule } from '../../../test.module';
import { ClientVisiteDialogComponent } from '../../../../../../main/webapp/app/entities/client-visite/client-visite-dialog.component';
import { ClientVisiteService } from '../../../../../../main/webapp/app/entities/client-visite/client-visite.service';
import { ClientVisite } from '../../../../../../main/webapp/app/entities/client-visite/client-visite.model';
import { VisiteService } from '../../../../../../main/webapp/app/entities/visite';

describe('Component Tests', () => {

    describe('ClientVisite Management Dialog Component', () => {
        let comp: ClientVisiteDialogComponent;
        let fixture: ComponentFixture<ClientVisiteDialogComponent>;
        let service: ClientVisiteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AppliGatewayTestModule],
                declarations: [ClientVisiteDialogComponent],
                providers: [
                    VisiteService,
                    ClientVisiteService
                ]
            })
            .overrideTemplate(ClientVisiteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientVisiteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientVisiteService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ClientVisite(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.clientVisite = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'clientVisiteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ClientVisite();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.clientVisite = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'clientVisiteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
