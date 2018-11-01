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

import { UserCloudService } from './../services/user-cloud.service';
import { ProcessServiceCloudTestingModule } from './../../testing/process-service-cloud.testing.module';
import { setupTestBed } from '@alfresco/adf-core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoCloudComponent } from './user-info-cloud.component';
import { UserInfoCloudModule } from '../user-info-cloud.module';
import { UserCloud } from '../models/user-cloud';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('UserInfoCloudComponent', () => {
    let component: UserInfoCloudComponent;
    let userService: UserCloudService;
    let element: HTMLElement;
    let fixture: ComponentFixture<UserInfoCloudComponent>;
    let getValueFromTokenSpy: jasmine.Spy;

    function openUserInfo() {
        fixture.detectChanges();
        let imageButton: HTMLButtonElement = <HTMLButtonElement> element.querySelector('#adf-cloud-user-initial-id');
        imageButton.click();
        fixture.detectChanges();
    }

    const userModel = new UserCloud({ firstName: 'firstName', lastName: 'lastName', email: 'email' });
    const userWithOutFirstName = new UserCloud({ firstName: null, lastName: 'lastName', email: 'email' });
    const userWithOutLastName = new UserCloud({ firstName: 'firstName', lastName: null, email: 'email' });

    setupTestBed({
        imports: [
            ProcessServiceCloudTestingModule, UserInfoCloudModule
        ],
        providers: [UserCloudService]
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserInfoCloudComponent);
        component = fixture.componentInstance;
        userService = TestBed.get(UserCloudService);
        element = fixture.nativeElement;
        getValueFromTokenSpy = spyOn(userService, 'getValueFromToken').and.returnValue('firstName lastName');
        fixture.detectChanges();
    });

    it('should create UserInfoCloudComponent', () => {
        expect(component instanceof UserInfoCloudComponent).toBeTruthy();
    });

    it('should able to show full Name', () => {
        spyOn(userService, 'getCurrentUserInfo').and.returnValue(of(userModel));
        fixture.detectChanges();
        const fullName = element.querySelector('.adf-cloud-user-info-name');
        expect(fullName.textContent).toBe(' firstName lastName ');
    });

    it('should able to show short name', () => {
        spyOn(userService, 'getCurrentUserInfo').and.returnValue(of(userModel));
        fixture.detectChanges();
        const fullName = element.querySelector('#adf-cloud-user-initial-id');
        expect(fullName.textContent).toBe('fl');
    });

    it('should not show first name if it is null string', async(() => {
        getValueFromTokenSpy.and.returnValue('null lastName');
        spyOn(userService, 'getCurrentUserInfo').and.returnValue(userWithOutFirstName);
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(element.querySelector('.adf-cloud-user-info-container')).toBeDefined();
            expect(element.querySelector('#adf-cloud-user-info-name-id')).toBeDefined();
            expect(element.querySelector('#adf-cloud-user-info-name-id').textContent).toContain('lastName');
            expect(element.querySelector('#adf-cloud-user-info-name-id').textContent).not.toContain('null');
        });
    }));

    it('should not show last name if it is null string', async(() => {
        getValueFromTokenSpy.and.returnValue('firstName null');
        spyOn(userService, 'getCurrentUserInfo').and.returnValue(userWithOutLastName);
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(element.querySelector('.adf-cloud-user-info-container')).toBeDefined();
            expect(element.querySelector('#adf-cloud-user-info-name-id')).toBeDefined();
            expect(element.querySelector('#adf-cloud-user-info-name-id').textContent).toContain('firstName');
            expect(element.querySelector('#adf-cloud-user-info-name-id').textContent).not.toContain('null');
        });
    }));

    it('should show the username when showName attribute is true', async(() => {
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(component.showName).toBeTruthy();
            expect(element.querySelector('#adf-cloud-user-info-name-id')).not.toBeNull();
            expect(element.querySelector('#adf-cloud-user-info-name-id').textContent).toContain(' firstName lastName ');
        });
    }));

    it('should hide the username when showName attribute is false', async(() => {
        component.showName = false;

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(element.querySelector('#adf-cloud-user-info-name-id')).toBeNull();
        });
    }));

    it('should have the defined class to show the name on the right side', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(element.querySelector('#adf-cloud-user-info-id').classList).toContain('adf-cloud-user-info-name-right');
        });
    }));

    it('should not have the defined class to show the name on the left side', async(() => {
        component.namePosition = 'left';
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(element.querySelector('#adf-cloud-user-info-id').classList).not.toContain('adf-cloud-user-info-name-right');
        });
    }));

    it('should show the user information on click of userInfo button', async(() => {
        openUserInfo();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            let userMenu = fixture.debugElement.query(By.css('.adf-cloud-user-info-menu'));
            let fullName = fixture.debugElement.query(By.css('#adf-cloud-user-name-id'));
            let shortName = fixture.debugElement.query(By.css('#adf-cloud-user-initial-id'));
            expect(userMenu).not.toBeNull();
            expect(shortName).not.toBeNull();
            expect(fullName).not.toBeNull();
            expect(fullName.nativeElement.textContent).toContain('firstName lastName');
            expect(shortName.nativeElement.textContent).toContain('fl');
        });
    }));
});
