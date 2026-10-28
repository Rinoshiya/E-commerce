import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnnouncementBarComponent } from './layout/announcement-bar/announcement-bar.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MiniCartComponent } from './layout/mini-cart/mini-cart.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AnnouncementBarComponent, HeaderComponent, FooterComponent, MiniCartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  bagOpen = signal(false);
}
