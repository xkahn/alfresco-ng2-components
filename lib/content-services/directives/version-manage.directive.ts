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

/* tslint:disable:no-input-rename  */

import { Directive, ElementRef,  HostListener, Input , Output, EventEmitter } from '@angular/core';
import { MinimalNodeEntryEntity } from 'alfresco-js-api';
@Directive({
    selector: '[versionDialog]'
})
export class VersionManagerDirective   {

    @Output() permissionchecked = new EventEmitter<any>();

    @Input('versionDialog')
    node: MinimalNodeEntryEntity;

    @HostListener('click', [ '$event' ])
    onClick(event) {
    }

    constructor(
        public element: ElementRef
    ) {
    }

displaypermissionbadge(contentEntry): boolean {
    if (contentEntry.properties['cm:lockOwner'] && contentEntry.properties['cm:lockOwner'].id === localStorage.getItem('ACS_USERNAME')) {
     return this.checkOwnerPermissions(contentEntry);
    } else {
         if (!contentEntry.isLocked  ) {
             return true;
         } else {
            return false;
         }
     }
    }

    checkOwnerPermissions(contentEntry): boolean {
        if (contentEntry.properties['cm:lockOwner'].id === localStorage.getItem('ACS_USERNAME')) {
            if (contentEntry.properties['cm:lockType'] === 'WRITE_LOCK') {
                return true;
            } else {
            return false;
            }
        }
    }
}
