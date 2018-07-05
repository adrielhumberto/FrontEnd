import { Component, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../services/restaurantservice.service'

@Component({
    selector: 'fetchrestaurant',
    templateUrl: './fetchrestaurant.component.html'
})

export class FetchRestaurantComponent {
    public restaurantList: RestaurantData[];

    constructor(public http: Http, private _router: Router, private _restaurantService: RestaurantService) {
        this.getRestaurants();
    }

    getRestaurants() {
        this._restaurantService.getRestaurants().subscribe(
            data => this.restaurantList = data
        )
    }

    delete(restaurantID) {
        var ans = confirm("Você tem certeza que deseja apagar este prato com id: " + restaurantID);
        if (ans) {
            this._restaurantService.deleteRestaurant(restaurantID).subscribe((data) => {
                this.getRestaurants();
            }, error => console.error(error))
        }
    }
}

interface RestaurantData {
    id: number;
    name: string;
}  