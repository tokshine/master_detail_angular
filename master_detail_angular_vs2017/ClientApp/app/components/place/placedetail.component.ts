import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../services/app.service';
import { Place } from '../../viewmodels/place';

@Component({
    selector: "place-detail",
    templateUrl: './placedetail.component.html'   
})

export class PlaceDetailComponent implements OnInit {
    pageTitle = 'Place Detail';
    item: Place;
    errorMessage: string;
    //sub: any;
   

    constructor(private appService: AppService, private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
       
          let id=  +this.route.snapshot.params.id;
            console.log("SELECTED id " + id);
        this.getLounge(id);
        //console.log('Item Subject ' + this.item.Subject);
    }


    //ngOnInit() {
    //    this.sub = this.route.params.subscribe(params => {
    //        var id = +params['id'];
    //        console.log("selected id " + id);
    //        this.AppService.getDiscussion(id).subscribe(item => this.item = item[0]);
    //    });
    //}

    //ngOnDestroy() {
    //    this.sub.unsubscribe();
    //}

    getLounge(id: number) {
           
        var data = this.appService.getPlace(id);

       data.subscribe(p => this.item = p, errors => this.errorMessage = <string>errors);

    }


    onBack(): void {
        this.router.navigate(['/home']);
    }
}



