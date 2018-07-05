import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchDishComponent } from '../fetchdish/fetchdish.component';
import { DishService } from '../../services/dishservice.service';
import { RestaurantService } from '../../services/restaurantservice.service';

@Component({
    selector: 'createdish',
    templateUrl: './AddDish.component.html'
})

export class createdish implements OnInit {
    dishForm: FormGroup;
    title: string = "Cadastrar";
    id: string = "0";
    errorMessage: any;
    temp: string = "";
    public restaurantList: Restaurant[];
    dish: Dish

    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _dishService: DishService, private _restaurantService: RestaurantService, private _router: Router) {
        if (this._avRoute.snapshot.params["id"]) {
            this.id = this._avRoute.snapshot.params["id"];
            this.dishForm = this._fb.group({
                id: '',
                name: ['', [Validators.required]],
                price: 0,
                restaurantId: '',
                restaurant: [{ id: '', name: ''}]
            })
            
        }
        else {
            this.dishForm = this._fb.group({
                name: ['', [Validators.required]],
                price: 0,
                restaurantId: '',
                restaurant: [{ id: '', name: '' }]
            })
        }
        
        this.getRestaurants();
    }

    getRestaurants() {
        this._restaurantService.getRestaurants().subscribe(
            data => this.restaurantList = data
        )
    }

    ngOnInit() {
        if (this.id != "0") {
            this.title = "Editar";
            
            this._dishService.getDishById(this.id)
                .subscribe(resp => this.dishForm.setValue(resp)
                , error => this.errorMessage = error);
        }
    }

    save() {

        if (!this.dishForm.valid) {
            return;
        }


        this.dishForm.removeControl('restaurant');
        if (this.title == "Cadastrar") {
            this._dishService.saveDish(this.dishForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/fetch-dish']);
                }, error => this.errorMessage = error)
        }
        else if (this.title == "Editar") {
            

            this._dishService.updateDish(this.dishForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/fetch-dish']);
                }, error => this.errorMessage = error)
        }
    }

    cancel() {
        this._router.navigate(['/fetch-dish']);
    }

    get name() { return this.dishForm.get('name'); }
    get price() { return this.dishForm.get('price'); }
    get restaurant() { return this.dishForm.get('restaurant'); }

}  

interface Dish {
    id: number;
    name: string;
    price: number;
    restaurantId: string;
    restaurant: Restaurant

}  
interface Restaurant {
    id: string;
    name: string;
}  