import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';
import { Place } from '../../viewmodels/place';

@Component({
    selector: "place-list",
    templateUrl: './placelist.component.html'   
})

export class PlaceListComponent implements OnInit {
    @Input() class: string;
    title: string;
    items: Place[];
    errorMessage: string;

    constructor(private AppService: AppService, private router: Router) { }

    ngOnInit() {

        var data = null;
        switch (this.class) {
            case "latest":
            default:
                this.title = "What's New?";
                data  = this.AppService.getLatestEntries();
                break;
            case "most-viewed":
                this.title = "Top Places to Visit";
                data= this.AppService.getMostViewed();
                break;
        }

        data.subscribe(p => this.items = p, errors => this.errorMessage = <any>errors);

       
    }

    onSelect(item: Place) {
        var link = ['/explore', item.ID];
        this.router.navigate(link);
    }
}



