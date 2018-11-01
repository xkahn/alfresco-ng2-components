import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import moment from 'moment-es6';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { UserCloud } from '../models/user-cloud';

@Injectable()
export class UserCloudService {
    private helper;

    constructor() {
        this.helper = new JwtHelperService();
    }

    getCurrentUserInfo() {
        const fullName = this.getValueFromToken<string>('given_name');
        const email = this.getValueFromToken<string>('email');
        const nameParts = fullName.split(' ');
        const user = { firstName: nameParts[0], lastName: nameParts[1], email: email };
        return new UserCloud(user);
    }

    private getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    private getValueFromToken<T>(key: string): T {
        let value;
        const token = localStorage.getItem('access_token');
        if (token) {
            const tokenPayload = this.helper.decodeToken(token);
            value = tokenPayload[key];
        }
        return <T> value;
    }
}
