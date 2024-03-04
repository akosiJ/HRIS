import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullTitleCase',
  standalone: true,
})
export class FullTitleCasePipe implements PipeTransform {
  transform(value: string): string | null {
    if (!value) {
      return null;
    }

    return value
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .replace(/^\w/, (c) => c.toUpperCase());
  }
}
