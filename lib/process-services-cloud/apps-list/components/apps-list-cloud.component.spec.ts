/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { DebugElement, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { setupTestBed } from '@alfresco/adf-core';
import { of, throwError } from 'rxjs';

import { AppsListCloudComponent } from './apps-list-cloud.component';
import { AppsProcessCloudService } from '../services/apps-process-cloud.service';
import { ProcessTestingModule } from './../../../process-services/testing/process.testing.module';
import { fakeApplicationInstance } from '../mock/application-instance.mock';

describe('AppsListCloudComponent', () => {

    let component: AppsListCloudComponent;
    let fixture: ComponentFixture<AppsListCloudComponent>;
    let debugElement: DebugElement;
    let service: AppsProcessCloudService;
    let getAppsSpy: jasmine.Spy;

    setupTestBed({
        imports: [ProcessTestingModule]
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppsListCloudComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;

        service = TestBed.get(AppsProcessCloudService);
        getAppsSpy = spyOn(service, 'getDeployedApplications').and.returnValue(of(fakeApplicationInstance));
    });

    it('should define layoutType with the default value', () => {
        component.layoutType = '';
        fixture.detectChanges();
        expect(component.isGrid()).toBe(true);
    });

    it('should load apps on init', () => {
        fixture.detectChanges();
        expect(getAppsSpy).toHaveBeenCalled();
    });

    it('loading should be false by default', () => {
        expect(component.loading).toBeFalsy();
    });

    it('should show the loading spinner when the apps are loading', async(() => {
        component.loading = true;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
        let loadingSpinner = fixture.nativeElement.querySelector('mat-spinner');
        expect(loadingSpinner).toBeDefined();
        });
    }));

    it('should emit an error when an error occurs loading apps', () => {
        let emitSpy = spyOn(component.error, 'emit');
        getAppsSpy.and.returnValue(throwError({}));
        fixture.detectChanges();
        expect(emitSpy).toHaveBeenCalled();
    });

    describe('layout', () => {

        it('should display a grid by default', () => {
            fixture.detectChanges();
            expect(component.isGrid()).toBe(true);
            expect(component.isList()).toBe(false);
        });

        it('should display a grid when configured to', () => {
            component.layoutType = AppsListCloudComponent.LAYOUT_GRID;
            fixture.detectChanges();
            expect(component.isGrid()).toBe(true);
            expect(component.isList()).toBe(false);
        });

        it('should display a list when configured to', () => {
            component.layoutType = AppsListCloudComponent.LAYOUT_LIST;
            fixture.detectChanges();
            expect(component.isGrid()).toBe(false);
            expect(component.isList()).toBe(true);
        });

        it('should throw an exception on init if unknown type configured', () => {
            component.layoutType = 'unknown';
            expect(component.ngOnInit).toThrowError();
        });
    });

    describe('select apps', () => {

        beforeEach(() => {
            getAppsSpy.and.returnValue(of(fakeApplicationInstance));
            fixture.detectChanges();
        });

        it('should display all deployed apps', () => {
          fixture.detectChanges();
          expect(debugElement.queryAll(By.css('h1')).length).toBe(6);
        });

        it('should initially have no app selected', () => {
            let selectedEls = debugElement.queryAll(By.css('.selectedIcon'));
            expect(selectedEls.length).toBe(0);
        });

        it('should emit a click event when app selected', () => {
            spyOn(component.appClick, 'emit');
            component.selectApp(fakeApplicationInstance[1]);
            expect(component.appClick.emit).toHaveBeenCalledWith(fakeApplicationInstance[1]);
        });

        it('should have one app shown as selected after app selected', () => {
            component.selectApp(fakeApplicationInstance[1]);
            fixture.detectChanges();
            let selectedEls = debugElement.queryAll(By.css('.adf-app-listgrid-item-card-actions-icon'));
            expect(selectedEls.length).toBe(1);
        });

        it('should have the correct app shown as selected after app selected', () => {
            component.selectApp(fakeApplicationInstance[1]);
            fixture.detectChanges();
            let appEls = debugElement.queryAll(By.css('.adf-app-listgrid > div'));
            expect(appEls[1].query(By.css('.adf-app-listgrid-item-card-actions-icon'))).not.toBeNull();
        });

    });

});

@Component({
    template: `
    <adf-apps-list-cloud>
        <adf-empty-custom-content>
            <p id="custom-id">No Apps</p>
        </adf-empty-custom-content>
    </adf-apps-list-cloud>
       `
})
class CustomEmptyAppListTemplateComponent {
}

describe('Custom CustomEmptyAppListTemplateComponent', () => {
    let fixture: ComponentFixture<CustomEmptyAppListTemplateComponent>;

    setupTestBed({
        imports: [ProcessTestingModule],
        declarations: [CustomEmptyAppListTemplateComponent],
        schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomEmptyAppListTemplateComponent);
    });

    afterEach(() => {
        fixture.destroy();
    });

    it('should render the custom no-apps template', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            let title: any = fixture.debugElement.queryAll(By.css('#custom-id'));
            expect(title.length).toBe(1);
            expect(title[0].nativeElement.innerText).toBe('No Apps');
        });
    }));
});
