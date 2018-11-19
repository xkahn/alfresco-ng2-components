import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateLoaderService, CoreModule, TemplateModule } from '@alfresco/adf-core';
import { TaskHeaderCloudComponent } from './components/task-header-cloud.component';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useClass: TranslateLoaderService
        }
    }),
    MaterialModule,
    TemplateModule
  ],
  declarations: [TaskHeaderCloudComponent],
  exports: [TaskHeaderCloudComponent]
})
export class TaskHeaderCloudModule { }
