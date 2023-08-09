import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from './models/team';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tournament';

  constructor(
    private _matIconRegistry: MatIconRegistry,
    private _domSanatizer: DomSanitizer
  ) {
    this._matIconRegistry.addSvgIcon(
      'left',
      this._domSanatizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/left.svg'
      )
    );
    this._matIconRegistry.addSvgIcon(
      'right',
      this._domSanatizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/right.svg'
      )
    );
    this._matIconRegistry.addSvgIcon(
      'play',
      this._domSanatizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/play.svg'
      )
    );
  }
}
