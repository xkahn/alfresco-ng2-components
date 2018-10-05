import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CloudTableDataSource } from './cloud-table-datasource';

@Component({
  selector: 'app-cloud-table',
  templateUrl: './cloud-table.component.html',
  styleUrls: ['./cloud-table.component.css']
})
export class CloudTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: CloudTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new CloudTableDataSource(this.paginator, this.sort);
  }
}
