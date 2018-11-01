import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoCloudComponent } from './components/user-info-cloud.component';
import { UserCloudService } from './services/user-cloud.service';
import { MaterialModule } from '../../../../core/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule
    ],
    declarations: [
        UserInfoCloudComponent
    ],
    providers: [
        UserCloudService
    ],
    exports: [
        UserInfoCloudComponent
    ]
})
export class UserInfoCloudModule { }
