import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public menuOpen:boolean=false;
  title = 'SYSMCLTD-frontend';
  menuState() {
    if (this.menuOpen) return 'menu-open'
  }
  toggleMenu() {
    this.menuOpen=!this.menuOpen;
  }
}
