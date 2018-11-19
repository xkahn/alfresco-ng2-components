import { Component, OnInit, Input } from '@angular/core';
import {
    CardViewDateItemModel,
    CardViewMapItemModel,
    CardViewTextItemModel,
    TranslationService
} from '@alfresco/adf-core';

@Component({
  selector: 'adf-cloud-task-header',
  templateUrl: './task-header-cloud.component.html',
  styleUrls: ['./task-header-cloud.component.css']
})
export class TaskHeaderCloudComponent implements OnInit {

    /** (required) Details related to the task. */
  @Input()
  taskDetails: any;

//   private currentUserId: number;

  properties: any [];
  inEdit: boolean = false;

  constructor( private translationService: TranslationService) { }

    ngOnInit() {
        this.properties = this.initDefaultProperties();
  }

  private initDefaultProperties() {
    return [
        new CardViewTextItemModel(
            {
                label: 'ADF_TASK_LIST.PROPERTIES.ASSIGNEE',
                value: 'FUll NAme',
                key: 'assignee',
                default: this.translationService.instant('ADF_TASK_LIST.PROPERTIES.ASSIGNEE_DEFAULT'),
                clickable: !this.isCompleted(),
                icon: 'create'
            }
        ),
        new CardViewTextItemModel(
            {
                label: 'ADF_TASK_LIST.PROPERTIES.STATUS',
                value: 'status',
                key: 'status'
            }
        ),
        new CardViewTextItemModel(
            {
                label: 'ADF_TASK_LIST.PROPERTIES.PRIORITY',
                value: 'priority',
                key: 'priority',
                editable: true
            }
        ),
        new CardViewDateItemModel(
            {
                label: 'ADF_TASK_LIST.PROPERTIES.DUE_DATE',
                value: 'dueDate',
                key: 'dueDate',
                default: this.translationService.instant('ADF_TASK_LIST.PROPERTIES.DUE_DATE_DEFAULT'),
                editable: true
            }
        ),
        new CardViewTextItemModel(
            {
                label: 'ADF_TASK_LIST.PROPERTIES.CATEGORY',
                value: 'category',
                key: 'category',
                default: this.translationService.instant('ADF_TASK_LIST.PROPERTIES.CATEGORY_DEFAULT')
            }
        ),
        new CardViewMapItemModel(
            {
                label: 'ADF_TASK_LIST.PROPERTIES.PARENT_NAME',
                value: '',
                key: 'parentName',
                default: this.translationService.instant('ADF_TASK_LIST.PROPERTIES.PARENT_NAME_DEFAULT'),
                clickable: true
            }
        ),
        new CardViewDateItemModel(
            {
                label: 'ADF_TASK_LIST.PROPERTIES.CREATED',
                value: 'created',
                key: 'created'
            }
        ),
        new CardViewTextItemModel(
            {
                label: 'ADF_TASK_LIST.PROPERTIES.DURATION',
                value: '',
                key: 'duration'
            }
        ),
        new CardViewTextItemModel(
            {
                label: 'ADF_TASK_LIST.PROPERTIES.PARENT_TASK_ID',
                value: 'parentTaskId',
                key: 'parentTaskId'
            }
        ),
        new CardViewDateItemModel(
            {
                label: 'ADF_TASK_LIST.PROPERTIES.END_DATE',
                value: 'endDate',
                key: 'endDate'
            }
        ),
        new CardViewTextItemModel(
            {
                label: 'ADF_TASK_LIST.PROPERTIES.ID',
                value: 'id',
                key: 'id'
            }
        ),
        new CardViewTextItemModel(
            {
                label: 'ADF_TASK_LIST.PROPERTIES.DESCRIPTION',
                value: 'description',
                key: 'description',
                default: this.translationService.instant('ADF_TASK_LIST.PROPERTIES.DESCRIPTION_DEFAULT'),
                multiline: true,
                editable: true
            }
        ),
        new CardViewTextItemModel(
            {
                label: 'ADF_TASK_LIST.PROPERTIES.FORM_NAME',
                value: '',
                key: 'formName',
                default: this.translationService.instant('ADF_TASK_LIST.PROPERTIES.FORM_NAME_DEFAULT'),
                icon: 'create'
            }
        )
    ];
}

    isCompleted() {
        return true;
    }
}
