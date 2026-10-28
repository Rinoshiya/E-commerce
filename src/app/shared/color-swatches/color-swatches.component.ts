import { Component, input, model } from '@angular/core';
import { ColorOption } from '../../models/product';

@Component({
  selector: 'app-color-swatches',
  imports: [],
  templateUrl: './color-swatches.component.html',
  styleUrl: './color-swatches.component.scss',
})
export class ColorSwatchesComponent {
  colors = input.required<ColorOption[]>();
  selected = model<string | null>(null);
  size = input<'sm' | 'md'>('md');
  selectable = input(true);
}
