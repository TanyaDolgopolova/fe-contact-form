import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import { IContactForm } from '../models/IContactForm';

@Injectable()
export class ContactService {
    constructor(
        private http: HttpClient,
    ) {
    }

    addContact(data: IContactForm): Observable<any> {
        return this.http.post(`${ environment.baseApiUrl }/contact`, data);
    }
}
