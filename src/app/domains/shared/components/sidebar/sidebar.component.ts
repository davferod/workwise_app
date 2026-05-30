import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBox, faWaveSquare, faClock, faHeart, faBorderAll, faUsers, faGear, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faTrello, } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, CdkAccordionModule, RouterLinkWithHref, RouterLinkActive,],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  //iconos
  faTrello: any = faTrello;
  faBox: any = faBox;
  faWaveSquare: any = faWaveSquare;
  faClock: any = faClock;
  faHeart: any = faHeart;
  faBorderAll: any = faBorderAll;
  faUsers: any = faUsers;
  faGear: any = faGear;
  faAngleUp: any = faAngleUp;
  faAngleDown: any = faAngleDown;

  //menu
  workspaceMenu = [
    {
      title: 'Boards',
      icon: faBorderAll,
      route: 'boards',
      isActive: true
    },
    {
      title: 'Highlights',
      icon: faHeart,
      route: 'highlights',
      isActive: false
    },
    {
      title: 'Views',
      icon: faHeart,
      route: 'highlights',
      isActive: false
    },
    {
      title: 'Members',
      icon: faUsers,
      route: 'members',
      isActive: false
    },
    {
      title: 'Settings',
      icon: faGear,
      route: 'settings',
      isActive: false
    }
  ];
}
