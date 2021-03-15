import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import { IContactForm } from '../models/IContactForm';
import { IRespContact } from '../models/IResContact';

@Injectable()
export class ContactService {
    constructor(
        private http: HttpClient,
    ) {
    }

    addContact(data: IContactForm): Observable<IRespContact> {
        return this.http.post<IRespContact>(`${ environment.baseApiUrl }/contact`, data);
    }
}
