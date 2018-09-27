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

import { Component, Input, Output, EventEmitter} from '@angular/core';
import { ApplicationInstanceModel } from '../model/application-instance.model';

@Component({
  selector: 'adf-application-instance-cloud',
  templateUrl: './application-instance-cloud.component.html',
  styleUrls: ['./application-instance-cloud.component.scss']
})

export class ApplicationInstanceCloudComponent {

  @Input()
  applicationInstances: ApplicationInstanceModel[] = [];

  @Output()
  selectedApp: EventEmitter<ApplicationInstanceModel> = new EventEmitter<ApplicationInstanceModel>();

  constructor() {}
  
  /**
   * Pass the selected app as next
   * @param app
   */
  public onSelectApp(app: ApplicationInstanceModel): void {
    this.selectedApp.emit(app);
  }
}
