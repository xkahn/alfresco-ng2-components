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

import { Component, OnInit } from '@angular/core';
import { TaskListCloudService } from '../services/task-list-cloud.service';

@Component({
  selector: 'adf-cloud-task-list',
  templateUrl: './task-list-cloud.component.html',
  styleUrls: ['./task-list-cloud.component.css']
})

export class TaskListCloudComponent implements OnInit {

  rows: any[] = [];

  constructor(private taskListCloudService: TaskListCloudService) { }

  ngOnInit() {
    this.load();
  }

  private load() {
    this.taskListCloudService.getTasks(this.createRequestNode(), 'sentiment-analysis-app').subscribe(
      response => console.log(response)
    );
  }

  private createRequestNode() {

        let requestNode = {
            state: '',
            sort: '',
            page: '',
            size: '',
            start: ''
        };
        return requestNode;
    }

}
