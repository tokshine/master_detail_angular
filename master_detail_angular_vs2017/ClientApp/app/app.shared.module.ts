import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { PlaceListComponent } from './components/placelist/placelist.component';
import { AppService } from './services/app.service';
import { LoungeListComponent } from './components/loungelist/loungelist.component';
import { LoungeDetailComponent } from './components/lounge/loungedetail.component';
import { PlaceDetailComponent } from './components/place/placedetail.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        PlaceListComponent,
        LoungeListComponent,
        LoungeDetailComponent,
        PlaceDetailComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            {
                path: 'lounge/:id',
                component: LoungeDetailComponent
            },
            {
                path: 'explore/:id',
                component: PlaceDetailComponent
            },
            { path: '**', redirectTo: 'home' }
           
           
        ])
    ],
    providers: [
        AppService
    ]
})
export class AppModuleShared {
}
