import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'snakeToTitle', standalone: true })
export class SnakeToTitlePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return ''; // Handle empty values
    }

    const words = value.split('_');

    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
