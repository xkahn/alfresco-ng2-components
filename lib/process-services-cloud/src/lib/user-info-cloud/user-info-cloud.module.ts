import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoCloudComponent } from './components/user-info-cloud.component';
import { UserCloudService } from './services/user-cloud.service';
import { MaterialModule } from '../../../../core/material.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
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
