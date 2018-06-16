/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AppliGatewayTestModule } from '../../../test.module';
import { EtatVisiteDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/etat-visite/etat-visite-delete-dialog.component';
import { EtatVisiteService } from '../../../../../../main/webapp/app/entities/etat-visite/etat-visite.service';

describe('Component Tests', () => {

    describe('EtatVisite Management Delete Component', () => {
        let comp: EtatVisiteDeleteDialogComponent;
        let fixture: ComponentFixture<EtatVisiteDeleteDialogComponent>;
        let service: EtatVisiteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AppliGatewayTestModule],
                declarations: [EtatVisiteDeleteDialogComponent],
                providers: [
                    EtatVisiteService
                ]
            })
            .overrideTemplate(EtatVisiteDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EtatVisiteDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EtatVisiteService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
