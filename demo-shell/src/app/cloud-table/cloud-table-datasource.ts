import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { CloudProcessService } from '../cloud-process.service';

/**
 * Data source for the CloudTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CloudTableDataSource extends DataSource<CloudTableItem> {
  data: CloudTableItem[] = [];

  private processSubject = new BehaviorSubject<any[]>([]);

  constructor(private paginator: MatPaginator,
              private sort: MatSort,
              private service: CloudProcessService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<CloudTableItem[]> {
    return this.processSubject.asObservable();
  }

  loadProcesses(query): void {
    this.service.findAll(query).pipe(
      catchError(() => of([]))
    )
      .subscribe((processes: any) => {
        this.paginator.length = processes.total;
        processes.data.map((process) => process.lastModified = new Date(process.lastModified));
        this.processSubject.next(Object.assign(processes.data));
      });
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  getPagedData(data: CloudTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  getSortedData(data: CloudTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
