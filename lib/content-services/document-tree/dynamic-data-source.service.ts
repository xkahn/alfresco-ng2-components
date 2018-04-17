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

import { Injectable } from '@angular/core';
import { CollectionViewer, SelectionChange } from "@angular/cdk/collections";
import { FlatTreeControl } from "@angular/cdk/tree";
import { map } from "rxjs/operators/map";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { merge } from "rxjs/observable/merge";
import { DocumentListService } from "../../../lib/content-services/document-list/services/document-list.service";
import { MinimalNodeEntity } from 'alfresco-js-api';

export class DynamicFlatNode {
    constructor(
        public entry: MinimalNodeEntity,
        public level: number = 1,
        public expandable: boolean = false,
        public isLoading: boolean = false
    ) {}
}

@Injectable()
export class DynamicDataSource {

    dataChange: BehaviorSubject<DynamicFlatNode[]> = new BehaviorSubject<DynamicFlatNode[]>([]);

    get data(): DynamicFlatNode[] { return this.dataChange.value; }
    set data(value: DynamicFlatNode[]) {
        this.treeControl.dataNodes = value;
        this.dataChange.next(value);
    }

    constructor(
        private treeControl: FlatTreeControl<DynamicFlatNode>,
        private documentListService: DocumentListService
    ) {}

    getData(node?: DynamicFlatNode): Promise<DynamicFlatNode[]> {
        return new Promise((resolve, reject) => {
            this.documentListService.getFolder(null, { ...(node ? { rootFolderId: node.entry.id } : {}) }, [])
                .subscribe((response) => {
                    resolve(response.list.entries.map((item) => {
                        return new DynamicFlatNode(item.entry, (node ? node.level + 1 : 0), item.entry.isFolder);
                    }));
                }, reject);
        });
    }

    connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
        this.treeControl.expansionModel.onChange!.subscribe(change => {
            if ((change as SelectionChange<DynamicFlatNode>).added ||
                (change as SelectionChange<DynamicFlatNode>).removed) {
                this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
            }
        });

        return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
    }

    private handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
        if (change.added) {
            change.added.forEach((node) => this.toggleNode(node, true));
        }
        if (change.removed) {
            change.removed.reverse().forEach((node) => this.toggleNode(node, false));
        }
    }

    private toggleNode(node: DynamicFlatNode, expand: boolean) {
        node.isLoading = true;

        this.getData(node).then((nodes) => {
            const index = this.data.indexOf(node);
            if (!nodes || index < 0) {
                return;
            }

            if (expand) {
                this.data.splice(index + 1, 0, ...nodes);
            } else {
                this.data.splice(index + 1, nodes.length);
            }

            this.dataChange.next(this.data);
            node.isLoading = false;
        });
    }
}
