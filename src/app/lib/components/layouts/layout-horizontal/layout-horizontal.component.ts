import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {NavbarComponent} from "../../navbar/navbar.component";


@Component({
  selector: 'app-layout-horizontal',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './layout-horizontal.component.html',
  styleUrls: ['./layout-horizontal.component.css']
})
export class LayoutHorizontalComponent {

}
