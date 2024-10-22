import { BaseModel } from './base.model';
import { Profile } from 'selenium-webdriver/firefox';

export class User extends BaseModel {
    id: number;
    username: string;
    name: string;
    password: string;
    mail: string;
    confirmPassword: string;
    mailId: number;
    personId: number;
    profileIds: number[];
    profiles: Profile[] = [];
    authorities = [];

}
