import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchRestaurantComponent } from '../fetchrestaurant/fetchrestaurant.component';
import { RestaurantService } from '../../services/restaurantservice.service';

@Component({
    selector: 'createrestaurant',
    templateUrl: './AddRestaurant.component.html'
})

export class createrestaurant implements OnInit {
    restaurantForm: FormGroup;
    title: string = "Cadastrar";
    id: string = "0";
    errorMessage: any;

    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _restaurantService: RestaurantService, private _router: Router) {
        if (this._avRoute.snapshot.params["id"]) {
            this.id = this._avRoute.snapshot.params["id"];
            this.restaurantForm = this._fb.group({
                id: '',
                name: ['', [Validators.required]]
            })
            
        }
        else {
            this.restaurantForm = this._fb.group({
                name: ['', [Validators.required]]
            })
        }
        
    }

    ngOnInit() {
        if (this.id != "0") {
            this.title = "Editar";
            
            this._restaurantService.getRestaurantById(this.id)
                .subscribe(resp => this.restaurantForm.setValue(resp)
                , error => this.errorMessage = error);
        }
    }

    save() {

        if (!this.restaurantForm.valid) {
            return;
        }

        if (this.title == "Cadastrar") {
            this._restaurantService.saveRestaurant(this.restaurantForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/fetch-restaurant']);
                }, error => this.errorMessage = error)
        }
        else if (this.title == "Editar") {
            

            this._restaurantService.updateRestaurant(this.restaurantForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/fetch-restaurant']);
                }, error => this.errorMessage = error)
        }
    }

    cancel() {
        this._router.navigate(['/fetch-restaurant']);
    }

    get name() { return this.restaurantForm.get('name'); }
}  