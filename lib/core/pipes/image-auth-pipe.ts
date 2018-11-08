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

import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
    name: 'adfImageSecure'
})
export class ImageAuthPipe implements PipeTransform {

    constructor(private http: HttpClient, private sanitizer: DomSanitizer, private authenticationService: AuthenticationService) {
    }

    transform(url): Observable<SafeUrl> {
        const regexp = new RegExp('^((?![^\\n]*\\.$)(?:https?:\\/\\/)?(?:(?:[2][1-4]\\d|25[1-5]|1\\d{2}|[1-9]\\d|[1-9])(?:\\.(?:[2][1-4]\\d|25[1-5]|1\\d{2}|[1-9]\\d|[0-9])){3}(?::\\d{4})?|[a-z\\-]+(?:\\.[a-z\\-]+){2,}).*)|(^(http|https):\\/\\/).*');

        if (regexp.test(url)) {
            const header = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authenticationService.getToken() });
            const params = {
                observe: 'body',
                responseType: 'blob' as 'json'
            };

            const options = { header, params, responseType: 'blob' as 'json' };

            return this.http.get(url, options)
                .pipe(map((val) => {
                    let trustUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val));
                    return trustUrl;
                }));
        } else {
            return new Observable((subscriber) => {
                subscriber.next(this.sanitizer.bypassSecurityTrustUrl(url));
                subscriber.complete();
            });
        }

    }

}
