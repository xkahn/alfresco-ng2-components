import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as _ from 'lodash';

@Injectable()
export class UserCloudService {
    private helper;

    constructor() {
        this.helper = new JwtHelperService();
    }

    getRoles(): string[] {
        const access = this.getValueFromToken<any>('realm_access');
        const roles = access ? access['roles'] : [];
        return roles;
    }

    hasToken() {
        return localStorage.getItem('access_token');
    }

    hasRole(role: string): boolean {
        let hasRole = false;
        if (this.hasToken()) {
            const roles = this.getRoles();
            hasRole = _.indexOf(roles, role) >= 0;
        }
        return hasRole;
    }

    hasRoles(roles: string[]): boolean {
        let hasRole = false;
        roles.forEach(r => {
            if (this.hasRole(r)) {
                hasRole = true;
                return;
            }
        });
        return hasRole;
    }

    getValueFromToken<T>(key: string): T {
        let value;
        const token = localStorage.getItem('access_token');
        if (token) {
            const tokenPayload = this.helper.decodeToken(token);
            value = tokenPayload[key];
        }
        return <T> value;
    }
}
