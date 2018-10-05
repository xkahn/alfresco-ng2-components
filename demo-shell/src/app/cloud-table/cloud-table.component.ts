import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Params, ActivatedRoute } from '@angular/router';
export interface Process {
  id: string;
  appName: string;
  initiator: string;
  status: string;
  processDefinitionId: string;
  lastModified: string;
}

const PROCESSES: Process[] = [
  {id: '1', appName: '', initiator: '', status: '', processDefinitionId: '', lastModified: ''},
  {id: '2', appName: '', initiator: '', status: '', processDefinitionId: '', lastModified: ''},
  {id: '3', appName: '', initiator: '', status: '', processDefinitionId: '', lastModified: ''},
  {id: '4', appName: '', initiator: '', status: '', processDefinitionId: '', lastModified: ''},
  {id: '5', appName: '', initiator: '', status: '', processDefinitionId: '', lastModified: ''},
  {id: '6', appName: '', initiator: '', status: '', processDefinitionId: '', lastModified: ''},
  {id: '7', appName: '', initiator: '', status: '', processDefinitionId: '', lastModified: ''},
  {id: '8', appName: '', initiator: '', status: '', processDefinitionId: '', lastModified: ''}
];

@Component({
  selector: 'app-cloud-table',
  templateUrl: './cloud-table.component.html',
  styleUrls: ['./cloud-table.component.scss']
})
export class CloudTableComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  processes: Process[] = PROCESSES;

  displayedColumns: string[] = ['id', 'appName', 'initiator', 'status'];
  dataSource = new MatTableDataSource<Process>();

  appName: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
      if (this.route) {
          this.route.params.forEach((params: Params) => {
              if (params['appName']) {
                  this.appName = params['appName'];
              } else {
                  this.appName = 'my-app-1';
              }
          });
      }

      this.getProcesses();
      this.setProcesses();

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getProcesses() {
      this.processes.forEach((process, index) => {
        process.appName = this.appName;
        process.initiator = this.appName + '_' + index;

      });
  }

  setProcesses() {
      this.dataSource = new MatTableDataSource<Process>(this.processes);
  }
}
