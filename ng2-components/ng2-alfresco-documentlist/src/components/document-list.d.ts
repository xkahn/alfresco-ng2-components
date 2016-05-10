/**
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
import { OnInit, EventEmitter, AfterContentInit, AfterViewChecked } from 'angular2/core';
import { AlfrescoService } from './../services/alfresco.service';
import { FolderEntity, DocumentEntity } from './../models/document-library.model';
import { ContentActionModel } from './../models/content-action.model';
import { ContentColumnModel } from './../models/content-column.model';
export declare class DocumentList implements OnInit, AfterViewChecked, AfterContentInit {
    private _alfrescoService;
    navigate: boolean;
    breadcrumb: boolean;
    folderIcon: string;
    itemClick: EventEmitter<any>;
    rootFolder: {
        name: string;
        path: string;
    };
    currentFolderPath: string;
    folder: FolderEntity;
    errorMessage: any;
    route: any[];
    actions: ContentActionModel[];
    columns: ContentColumnModel[];
    canNavigateParent(): boolean;
    constructor(_alfrescoService: AlfrescoService);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterViewChecked(): void;
    getContentActions(target: string, type: string): ContentActionModel[];
    onNavigateParentClick($event: any): void;
    onItemClick(item: DocumentEntity, $event?: any): void;
    goToRoute(r: any, $event: any): void;
    getContentUrl(node: DocumentEntity): string;
    getDocumentThumbnailUrl(node: DocumentEntity): string;
    executeContentAction(node: DocumentEntity, action: ContentActionModel): void;
    displayFolderContent(path: any): void;
    getNodePath(node: DocumentEntity): string;
    /**
     * Gets a value from an object by composed key
     * documentList.getObjectValue({ item: { nodeType: 'cm:folder' }}, 'item.nodeType') ==> 'cm:folder'
     * @param target
     * @param key
     * @returns {string}
     */
    getObjectValue(target: any, key: string): string;
    setupDefaultColumns(): void;
}
