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
  faTrello = faTrello;
  faBox = faBox;
  faWaveSquare = faWaveSquare;
  faClock = faClock;
  faHeart = faHeart;
  faBorderAll = faBorderAll;
  faUsers = faUsers;
  faGear = faGear;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;

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
