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

import { Component, OnInit, Input } from '@angular/core';
import { UserCloudService } from '../services/user-cloud.service';
import { UserCloud } from '../models/user-cloud';

@Component({
  selector: 'adf-cloud-user-info',
  templateUrl: './user-info-cloud.component.html',
  styleUrls: ['./user-info-cloud.component.scss']
})
export class UserInfoCloudComponent implements OnInit {

    /** Custom choice for opening the menu at the bottom. Can be `before` or `after`. */
    @Input()
    menuPositionX: string = 'after';

    /** Custom choice for opening the menu at the bottom. Can be `above` or `below`. */
    @Input()
    menuPositionY: string = 'below';

    /** Shows/hides the username next to the user info button. */
    @Input()
    showName: boolean = true;

    /** When the username is shown, this defines its position relative to the user info button.
     * Can be `right` or `left`.
     */
    @Input()
    namePosition: string = 'right';

    loggedInUser: UserCloud;

    constructor(private userCloudService: UserCloudService) { }

    ngOnInit() {
        this.getUserInfo();
    }

    getUserInfo() {
        this.userCloudService.getCurrentUserInfo()
            .subscribe((res: UserCloud) => {
                this.loggedInUser = new UserCloud(res);
        });
    }

    showOnRight() {
        return this.namePosition === 'right';
    }
}
