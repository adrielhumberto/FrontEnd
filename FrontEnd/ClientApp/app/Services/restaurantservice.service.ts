import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class RestaurantService {
    myAppUrl: string = "";

    constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.myAppUrl = "http://localhost:65092/";
    }

    getRestaurants() {
        
        return this._http.get(this.myAppUrl + 'api/Restaurants')
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    getRestaurantById(id: string) {
        return this._http.get(this.myAppUrl + "api/Restaurants/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    saveRestaurant(restaurant) {
        return this._http.post(this.myAppUrl + 'api/Restaurants/', restaurant)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    updateRestaurant(restaurant) {
        return this._http.put(this.myAppUrl + 'api/Restaurants/' + restaurant.id, restaurant)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    deleteRestaurant(id) {
        return this._http.delete(this.myAppUrl + "api/Restaurants/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
} 