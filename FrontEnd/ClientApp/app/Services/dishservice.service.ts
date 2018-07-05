import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DishService {
    myAppUrl: string = "";

    constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.myAppUrl = "http://localhost:65092/";
    }

    getDishes() {

        return this._http.get(this.myAppUrl + 'api/Dishes')
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    getDishById(id: string) {
        return this._http.get(this.myAppUrl + "api/Dishes/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    saveDish(dish) {
        return this._http.post(this.myAppUrl + 'api/Dishes/', dish)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    updateDish(dish) {
        return this._http.put(this.myAppUrl + 'api/Dishes/' + dish.id, dish)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    deleteDish(id) {
        return this._http.delete(this.myAppUrl + "api/Dishes/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
} 