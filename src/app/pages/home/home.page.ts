import {Component, OnInit} from '@angular/core';
import {DataListComponent} from "@lib/components";
import {MatButtonModule} from "@angular/material/button";
import {PersonalModalComponent} from "@pages/home/personal-modal/personal-modal.component";
import {MatDialog, MatDialogConfig, MatDialogModule} from "@angular/material/dialog";
import {PageResponse, Personal} from "@lib/interfaces";
import {PersonalService} from "@lib/services";
import {Response} from "@lib/interfaces/response.interface";
import {Element} from "@angular/compiler";
import {MatSnackBar,MatSnackBarVerticalPosition,MatSnackBarHorizontalPosition} from "@angular/material/snack-bar";
import {queue} from "rxjs";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DataListComponent,MatButtonModule,PersonalModalComponent,MatDialogModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage implements OnInit{
  pageItem!: PageResponse<Personal>;
  columnsToDisplay:string[] = ['name', 'surname', 'email'];
  constructor(private _personalService: PersonalService,public dialog: MatDialog) {}

  getPersonals():void{
    this._personalService.getPersonals().subscribe(personal => {
      this.pageItem=personal.data;
    });
  }
  editPersonal=(id:string)=>{
    this._personalService.getPersonal(id).subscribe((personal:Response<Personal>)=>{
      this.openDialog(personal.data);
    });
  }
  deletePersonal=(id:string)=>{
    this._personalService.deletePersonal(id).subscribe((result:Response<boolean>)=>{
      if(result.data){
        this.getPersonals();
      }
    });
  }
  openDialog(data?:Personal): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      ...data,
      description: 'Create Personal'
    };
    let dialogRef=this.dialog.open(PersonalModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getPersonals();
      }
    });
  }
  ngOnInit(): void {
    this.getPersonals();
  }

}
