import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CloudTableDataSource } from './cloud-table-datasource';
import { CloudProcessService } from '../cloud-process.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cloud-table',
  templateUrl: './cloud-table.component.html',
  styleUrls: ['./cloud-table.component.css']
})
export class CloudTableComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  defaultPagination = {
    pageIndex: 0,
    pageSize: 5
  };

  dataSource: CloudTableDataSource;

  appName: string;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'appName', 'initiator', 'status', 'lastModified'];

  constructor(private service: CloudProcessService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.route) {
      this.route.params.forEach((params: Params) => {
        if (params['appName']) {
          this.appName = params['appName'];
        } else {
          this.appName = 'simple-app';
        }
      });
    }

    this.dataSource = new CloudTableDataSource(this.paginator, this.sort, this.service);

    this.dataSource.loadProcesses({ appName: this.appName, page: this.defaultPagination.pageIndex, size: this.defaultPagination.pageSize });
  }

  public updatePagination(pagination) {
    this.dataSource.loadProcesses({ appName: this.appName, page: pagination.pageIndex, size: pagination.pageSize });
  }
}
