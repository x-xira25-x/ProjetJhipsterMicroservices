/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AppliGatewayTestModule } from '../../../test.module';
import { ClientVisiteDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/client-visite/client-visite-delete-dialog.component';
import { ClientVisiteService } from '../../../../../../main/webapp/app/entities/client-visite/client-visite.service';

describe('Component Tests', () => {

    describe('ClientVisite Management Delete Component', () => {
        let comp: ClientVisiteDeleteDialogComponent;
        let fixture: ComponentFixture<ClientVisiteDeleteDialogComponent>;
        let service: ClientVisiteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AppliGatewayTestModule],
                declarations: [ClientVisiteDeleteDialogComponent],
                providers: [
                    ClientVisiteService
                ]
            })
            .overrideTemplate(ClientVisiteDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientVisiteDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientVisiteService);
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
