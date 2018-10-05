import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProcessListModel } from '@alfresco/adf-process-services/process-list/models/process-list.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CloudProcessService {

    constructor(private http: HttpClient) {
    }

    findAll(query: any): Observable<ProcessListModel> {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'bearer ' + localStorage.getItem('access_token'));
        const params = new HttpParams()
        .set('page', query.page + '')
        .set('size', query.size + '');

        return this.http
          .get<any>(`http://aps2dev.envalfresco.com/${query.appName}-query/v1/process-instances`, { 'headers': headers, 'params': params })
          .pipe(
            map((response: any) => {
            return <any> {
              size: response.list.pagination.count,
              total: response.list.pagination.totalItems,
              start: response.list.pagination.skipCount,
              length: response.list.pagination.totalItems,
              data: response.list.entries.map(data => data.entry)
            };
          })
        );
      }
}
