import { NgModule } from '@angular/core';

import { ContentModule } from '@alfresco/adf-content-services';
import { ProcessModule } from '@alfresco/adf-process-services';
import { ProcessCloudModule } from '@alfresco/adf-process-cloud-services';
import { CoreModule } from '@alfresco/adf-core';
import { InsightsModule } from '@alfresco/adf-insights';

export function modules() {
    return [
        CoreModule,
        ContentModule,
        InsightsModule,
        ProcessModule,
        ProcessCloudModule
    ];
}

@NgModule({
    imports: modules(),
    exports: modules()
})
export class AdfModule {
}
