import { Component, OnInit, Input } from '@angular/core';
import { UserCloudService } from '../services/user-cloud.service';
import { UserCloud } from '../models/user-cloud';

@Component({
  selector: 'adf-cloud-user-info',
  templateUrl: './user-info-cloud.component.html',
  styleUrls: ['./user-info-cloud.component.scss']
})
export class UserInfoCloudComponent implements OnInit {

    /** Custom choice for opening the menu at the bottom. Can be `before` or `after`. */
    @Input()
    menuPositionX: string = 'after';

    /** Custom choice for opening the menu at the bottom. Can be `above` or `below`. */
    @Input()
    menuPositionY: string = 'below';

    /** Shows/hides the username next to the user info button. */
    @Input()
    showName: boolean = true;

    /** When the username is shown, this defines its position relative to the user info button.
     * Can be `right` or `left`.
     */
    @Input()
    namePosition: string = 'right';

    loggedInUser: UserCloud = new UserCloud();

    constructor(private userCloudService: UserCloudService) { }

    ngOnInit() {
        this.getUserInfo();
    }

    getUserInfo() {
        const userInfo = this.userCloudService.getCurrentUserInfo();
        this.loggedInUser = new UserCloud(userInfo);
    }
}
