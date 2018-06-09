/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AppliGatewayTestModule } from '../../../test.module';
import { ClientVisiteComponent } from '../../../../../../main/webapp/app/entities/client-visite/client-visite.component';
import { ClientVisiteService } from '../../../../../../main/webapp/app/entities/client-visite/client-visite.service';
import { ClientVisite } from '../../../../../../main/webapp/app/entities/client-visite/client-visite.model';

describe('Component Tests', () => {

    describe('ClientVisite Management Component', () => {
        let comp: ClientVisiteComponent;
        let fixture: ComponentFixture<ClientVisiteComponent>;
        let service: ClientVisiteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AppliGatewayTestModule],
                declarations: [ClientVisiteComponent],
                providers: [
                    ClientVisiteService
                ]
            })
            .overrideTemplate(ClientVisiteComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientVisiteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientVisiteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ClientVisite(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.clientVisites[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
