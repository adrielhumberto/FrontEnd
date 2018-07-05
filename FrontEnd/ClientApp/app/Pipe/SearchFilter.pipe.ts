import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchfilter'
})

@Injectable()
export class SearchFilterPipe implements PipeTransform {
    transform(restaurants: Restaurant[], typed: string): any {
        typed = typed.toLowerCase();
        return restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(typed));
    }
}

interface Restaurant {
    id: string;
    name: string;
} 