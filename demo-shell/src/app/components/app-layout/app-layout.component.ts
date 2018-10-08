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

import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { UserPreferencesService, AppConfigService, AlfrescoApiService } from '@alfresco/adf-core';
import { HeaderDataService } from '../header-data/header-data.service';

@Component({
    templateUrl: 'app-layout.component.html',
    styleUrls: ['app-layout.component.scss'],
    host: {
        'class': 'adf-app-layout'
    },
    encapsulation: ViewEncapsulation.None
})

export class AppLayoutComponent implements OnInit {

    links: Array<any> = [
        { href: '/cloud', icon: 'cloud', title: 'APS 2' }
    ];

    expandedSidenav = false;

    position = 'start';

    hideSidenav = false;
    showMenu = true;

    enabelRedirect = true;
    color = 'primary';
    title = 'APP_LAYOUT.APP_NAME';
    logo: string;
    redirectUrl: string | any[] = ['/home'];
    tooltip = 'APP_LAYOUT.APP_NAME';

    ngOnInit() {
        const expand = this.config.get<boolean>('sideNav.expandedSidenav');
        const preserveState = this.config.get('sideNav.preserveState');

        if (preserveState && expand) {
            this.expandedSidenav = (this.userpreference.get('expandedSidenav', expand.toString()) === 'true');
        } else if (expand) {
            this.expandedSidenav = expand;
        }

        this.headerService.hideMenu.subscribe(show => this.showMenu = show);
        this.headerService.color.subscribe(color => this.color = color);
        this.headerService.title.subscribe(title => this.title = title);
        this.headerService.logo.subscribe(path => this.logo = path);
        this.headerService.redirectUrl.subscribe(redirectUrl => this.redirectUrl = redirectUrl);
        this.headerService.tooltip.subscribe(tooltip => this.tooltip = tooltip);
        this.headerService.position.subscribe(position => this.position = position);
        this.headerService.hideSidenav.subscribe(hideSidenav => this.hideSidenav = hideSidenav);
    }

    constructor(
        private userpreference: UserPreferencesService,
        private config: AppConfigService,
        private alfrescoApiService: AlfrescoApiService,
        private headerService: HeaderDataService) {
        if (this.alfrescoApiService.getInstance().isOauthConfiguration()) {
            this.enabelRedirect = false;
        }
    }

    setState(state) {
        if (this.config.get('sideNav.preserveState')) {
            this.userpreference.set('expandedSidenav', state);
        }
    }
}
