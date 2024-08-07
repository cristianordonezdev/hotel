import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import { Utils } from '../libs/config';

@Injectable()
export class ImagesService {
    utils: Utils;
    headers: HttpHeaders;
    constructor(private _http:HttpClient) {
        this.utils = new Utils();
        this.headers = new HttpHeaders({
            'Authorization': `Bearer ${this.utils.getTokenSession()}`
        });
    }
    getImages(type_image: string | undefined): Observable<any> {
        const query: string = type_image ? `?type_image=${type_image}` : '';
        return this._http.get(`${this.utils.getCoreUrl()}/images/${query}`);
    }
    deleteImage(id: string): Observable<any> {
        return this._http.delete(`${this.utils.getCoreUrl()}/images/${id}`, { headers: this.headers })
    }
    uploadImages(data: FormData): Observable<any> {
        return this._http.post(`${this.utils.getCoreUrl()}/images`, data, { headers: this.headers })
    }
    getImagesTypes(): Observable<any> {
        return this._http.get(`${this.utils.getCoreUrl()}/images/types`, { headers: this.headers });
    }
}
