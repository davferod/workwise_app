import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faInfoCircle, faClose, faAngleDown, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { ButtonComponent } from '@shared/components/button/button.component';

import { Router } from '@angular/router';
import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';

import { XauthService } from '@shared/services/xauth.service';
import { BoardFormComponent } from '@shared/components/board-form/board-form.component';
import { BoardsService } from '@shared/services/boards.service';
import { Colors, NAVBAR_BACKGROUNDS } from '@shared/models/colors.model';
import { ProfileStore } from '../../stores/profile.store';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ButtonComponent, BoardFormComponent, OverlayModule, FontAwesomeModule, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  isOpenAccount = false;
  isOpenMenu = false;
  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
  isOpenOverlayCreateBoards = false;
  //iconos
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;
  faUserSecret = faUserSecret;


  navBarBackgroundColor: Colors = 'sky';
  colors = NAVBAR_BACKGROUNDS;

  private profileStore = inject(ProfileStore);
  private xauthService = inject(XauthService);
  private boardsService= inject(BoardsService);
  private router = inject(Router);
  profile = this.profileStore.profileData;

  constructor(
  ) {
    this.boardsService.backgroundColor$.subscribe(color => {
      this.navBarBackgroundColor = color
    });
  }


  logout() {
    this.xauthService.logout();
    this.router.navigate(['/login']);
  }

  closeOverlayCreateBoard(event: boolean) {
    this.isOpenOverlayCreateBoards = event
  }

  get navbar_colors() {
    const clases = this.colors[this.navBarBackgroundColor];
    return clases ? clases : {};
  }
}
