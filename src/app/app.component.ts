import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {LayoutHorizontalComponent, NavbarComponent} from "@lib/components";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, LayoutHorizontalComponent,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myliba-frontend';
}
