import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CATEGORIES } from '../../data/mock-data';

@Component({
  selector: 'app-collection-tiles',
  imports: [RouterLink],
  templateUrl: './collection-tiles.component.html',
  styleUrl: './collection-tiles.component.scss',
})
export class CollectionTilesComponent {
  tiles = CATEGORIES.slice(0, 4);
}
