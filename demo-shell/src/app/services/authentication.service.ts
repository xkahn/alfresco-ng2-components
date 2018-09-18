/*!
 * @license
 * Copyright 2018 Alfresco Software, Ltd.
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

import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import moment from 'moment-es6';
import { AlfrescoApiService } from '@alfresco/adf-core';

@Injectable()
export class AuthenticationService {

    constructor(
        private alfrescoApiService: AlfrescoApiService) { }

    private bearerExcludedUrls: string[] = ['app.config.json', 'assets/', 'assets/adf-core/i18n/',
        'auth/realms', 'resources/', 'assets/adf-insights/i18n/', 'assets/adf-process-services/i18n/', 'resources/lazy-loading/i18n'];

    token: string;

    getToken(): string {
        return localStorage.getItem('access_token');
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    logout(): void {
        if (this.alfrescoApiService.getInstance()) {
            this.alfrescoApiService.getInstance().logout();
        }
    }

    getBearerExcludedUrls(): string[] {
        return this.bearerExcludedUrls;
    }

    addTokenToHeader(headersArg?: HttpHeaders): Observable<HttpHeaders> {
        return Observable.create(async (observer: Observer<any>) => {
            let headers = headersArg;
            if (!headers) {
                headers = new HttpHeaders();
            }
            try {
                const token: string = this.getToken();
                headers = headers.set('Authorization', 'bearer ' + token);
                observer.next(headers);
                observer.complete();
            } catch (error) {
                observer.error(error);
            }
        });
    }

}
