import { NgModule } from '@angular/core';
import { RestaurantService } from './services/restaurantservice.service'
import { DishService } from './services/dishservice.service'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { FetchRestaurantComponent } from './components/fetchrestaurant/fetchrestaurant.component';
import { createrestaurant } from './components/addrestaurant/AddRestaurant.component';
import { FetchDishComponent } from './components/fetchdish/fetchdish.component';
import { createdish } from './components/adddish/AddDish.component';

import { SearchFilterPipe } from './Pipe/SearchFilter.pipe';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        FetchRestaurantComponent,
        createrestaurant,
        FetchDishComponent,
        createdish,
        SearchFilterPipe
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'fetch-restaurant', component: FetchRestaurantComponent },
            { path: 'register-restaurant', component: createrestaurant },
            { path: 'restaurant/edit/:id', component: createrestaurant },
            { path: 'fetch-dish', component: FetchDishComponent },
            { path: 'register-dish', component: createdish},
            { path: 'dish/edit/:id', component: createdish },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [RestaurantService, DishService]  
})
export class AppModuleShared {
}
