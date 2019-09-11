import { Http, Response } from "@angular/http";  
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Place } from "../viewmodels/place";

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Lounge } from "../viewmodels/lounge";

@Injectable()
export class AppService {
    constructor(private http: Http) { }

    // URL to web api
    private loungeBaseUrl = 'api/lounge/';
    private placeBaseUrl = 'api/place/';

    getLatestDiscussion(num?: number): Observable<Lounge[]> {
        var url = this.loungeBaseUrl + "GetLatestDiscussion/";
        if (num != null) url += num;
        return this.http.get(url)
            .map((response: Response) => <Lounge[]>response.json())
            .do(data => console.log('All' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getDiscussion(id: number): Observable<Lounge> {
        if (id == null) throw new Error("id is required.");
        var url = this.loungeBaseUrl + id;
        return this.http.get(url)
            .map((response: Response) => <Lounge>response.json())
            .do(data => console.log('All' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getLatestEntries(num?: number): Observable<Place[]> {
        var url = this.placeBaseUrl + "GetLatestEntries/";
        if (num != null) url += num;
        return this.http.get(url)
            .map((response: Response) => <Place[]>response.json())
            .do(data => console.log('All' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getMostViewed(num?: number): Observable<Place[]> {
        var url = this.placeBaseUrl + "GetMostViewed/";
        if (num != null) url += num;
        return this.http.get(url)
            .map((response: Response) => <Place[]>response.json())
            .do(data => console.log('All' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getPlace(id: number) {
        if (id == null) throw new Error("id is required.");
        var url = this.placeBaseUrl + id;
        return this.http.get(url)
            .map((response: Response) => <Place>response.json())
            .do(data => console.log('All' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}

