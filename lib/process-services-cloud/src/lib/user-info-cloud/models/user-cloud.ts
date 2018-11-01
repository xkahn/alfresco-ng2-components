export class UserCloud {

    firstName: string;
    lastName: string;
    email: string;

    constructor(obj?: any) {
        if (obj) {
            this.firstName = obj.firstName || null;
            this.lastName = obj.lastName || null;
            this.email = obj.email || null;
        }
    }

    getFullName(): string {
        return this.firstName + ' ' + this.lastName;
    }

    getInitialUserName(): string {
        const firstName = (this.firstName ? this.firstName[0] : '');
        const lastName = (this.lastName ? this.lastName[0] : '');
        return firstName + '' + lastName;
    }
}
