import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';
import { Lounge } from '../../viewmodels/lounge';


@Component({
    selector: "lounge-list",
    templateUrl: './loungelist.component.html' 
})

export class LoungeListComponent implements OnInit {
    title: string;
    selectedItem: Lounge;
    items: Lounge[];
    errorMessage: string;

    constructor(private AppService: AppService, private router: Router) { }

    ngOnInit() {
        this.title = "The Lounge";
        var data = this.AppService.getLatestDiscussion();

        data.subscribe(
            items => this.items = items,
            error => this.errorMessage = <any>error
        );

    }

    onSelect(item: Lounge) {
        this.selectedItem = item;
        var link = ['/lounge', this.selectedItem.ID];
        this.router.navigate(link);
    }
}


