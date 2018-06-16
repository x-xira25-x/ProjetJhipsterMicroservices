/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AppliGatewayTestModule } from '../../../test.module';
import { ClientVisiteDetailComponent } from '../../../../../../main/webapp/app/entities/client-visite/client-visite-detail.component';
import { ClientVisiteService } from '../../../../../../main/webapp/app/entities/client-visite/client-visite.service';
import { ClientVisite } from '../../../../../../main/webapp/app/entities/client-visite/client-visite.model';

describe('Component Tests', () => {

    describe('ClientVisite Management Detail Component', () => {
        let comp: ClientVisiteDetailComponent;
        let fixture: ComponentFixture<ClientVisiteDetailComponent>;
        let service: ClientVisiteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AppliGatewayTestModule],
                declarations: [ClientVisiteDetailComponent],
                providers: [
                    ClientVisiteService
                ]
            })
            .overrideTemplate(ClientVisiteDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientVisiteDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientVisiteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ClientVisite(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.clientVisite).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
