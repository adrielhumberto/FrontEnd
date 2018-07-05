import { Component, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DishService } from '../../services/dishservice.service'
import { DecimalPipe } from '@angular/common/src/pipes/number_pipe';

@Component({
    selector: 'fetchdish',
    templateUrl: './fetchdish.component.html'
})

export class FetchDishComponent {
    public dishList: DishData[];

    constructor(public http: Http, private _router: Router, private _dishService: DishService) {
        this.getDishes();
    }

    getDishes() {
        this._dishService.getDishes().subscribe(
            data => this.dishList = data
        )
        var x = this.dishList;
    }

    delete(dishID) {
        var ans = confirm("Você tem certeza que deseja apagar este prato com id: " + dishID);
        if (ans) {
            this._dishService.deleteDish(dishID).subscribe((data) => {
                this.getDishes();
            }, error => console.error(error))
        }
    }
}

interface DishData {
    id: string;
    name: string;
    price: number;
    restaurant: RestaurantData;

}  

interface RestaurantData {
    id: string;
    name: string;
}  