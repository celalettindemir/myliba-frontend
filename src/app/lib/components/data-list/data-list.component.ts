import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgForOf, NgIf} from "@angular/common";
import {PageResponse, Personal} from "@lib/interfaces";


@Component({
  selector: 'app-data-list',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, MatButtonModule, MatIconModule, NgIf, NgForOf],
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit,OnChanges {

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
  @Input() displayedColumns!:  string[];
  @Input() editable:  boolean=false;
  @Input() onEdit!:  (id:string)=>void;
  @Input() onDelete!:  (id:string)=>void;


  @Input() pageItem!:  PageResponse<any>;
  columnsToDisplay!: string[];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;
  ngOnInit() {
    this.columnsToDisplay=this.editable?[...this.displayedColumns,"actions"]:this.displayedColumns;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['pageItem']&&changes['pageItem'].currentValue){
      this.dataSource= new MatTableDataSource<any>(this.pageItem.data);
      this.length=this.pageItem.totalItems;
      //this.dataSource.paginator = this.paginator||{} as MatPaginator;
    }
  }
}
