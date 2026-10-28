import { Component } from '@angular/core';


@Component({
  selector: 'app-perks-strip',
  imports: [],
  templateUrl: './perks-strip.component.html',
  styleUrl: './perks-strip.component.scss',
})
export class PerksStripComponent {
  perks = [
    { icon: 'pi pi-truck', title: 'Free delivery', text: 'On orders over AED 300' },
    { icon: 'pi pi-replay', title: 'Free returns', text: 'Within 14 days' },
    { icon: 'pi pi-gift', title: 'Gift wrapping', text: 'With a handwritten note' },
  ];
}
