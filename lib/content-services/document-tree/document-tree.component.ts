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

import { Component } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { DynamicFlatNode, DynamicDataSource } from './dynamic-data-source.service';
import { DocumentListService } from "../../content-services/document-list/services/document-list.service";
import { ThumbnailService } from "@alfresco/adf-core";
import { MinimalNodeEntryEntity } from "alfresco-js-api";

@Component({
    selector: 'adf-document-tree',
    templateUrl: './document-tree.component.html',
    styleUrls: ['./document-tree.component.css']
})
export class DocumentTreeComponent {

    constructor(
        private documentListService: DocumentListService,
        private thumbnailService: ThumbnailService
    ) {
        this.treeControl = new FlatTreeControl<DynamicFlatNode>(
            (node: DynamicFlatNode) => node.level,
            (node: DynamicFlatNode) => node.expandable
        );

        this.dataSource = new DynamicDataSource(this.treeControl, this.documentListService);
        this.dataSource.getData().then((data) => {
            this.dataSource.data = data;
        });
    }

    treeControl: FlatTreeControl<DynamicFlatNode>;
    dataSource: DynamicDataSource;
    hasChild = (_: number, _nodeData: DynamicFlatNode) => { return _nodeData.expandable; };

    getMimeTypeIcon(node: MinimalNodeEntryEntity): string {
        let mimeType;

        if (node.content && node.content.mimeType) {
            mimeType = node.content.mimeType;
        }
        if (node.isFolder) {
            mimeType = 'folder';
        }

        return this.thumbnailService.getMimeTypeIcon(mimeType);
    }
}
