/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AppliGatewayTestModule } from '../../../test.module';
import { EtatVisiteDialogComponent } from '../../../../../../main/webapp/app/entities/etat-visite/etat-visite-dialog.component';
import { EtatVisiteService } from '../../../../../../main/webapp/app/entities/etat-visite/etat-visite.service';
import { EtatVisite } from '../../../../../../main/webapp/app/entities/etat-visite/etat-visite.model';

describe('Component Tests', () => {

    describe('EtatVisite Management Dialog Component', () => {
        let comp: EtatVisiteDialogComponent;
        let fixture: ComponentFixture<EtatVisiteDialogComponent>;
        let service: EtatVisiteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AppliGatewayTestModule],
                declarations: [EtatVisiteDialogComponent],
                providers: [
                    EtatVisiteService
                ]
            })
            .overrideTemplate(EtatVisiteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EtatVisiteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtatVisiteService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EtatVisite(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.etatVisite = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'etatVisiteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EtatVisite();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.etatVisite = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'etatVisiteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
