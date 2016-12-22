import { Injectable } from '@angular/core';
import { User } from './user';
import { Http, Response, Headers } from '@angular/http';
import {Config} from '../config/config'

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UsersService {
  private actionUrl: string;
  private headers: Headers;

  constructor(private _http: Http) { 
    this.actionUrl = Config.REST_API_ADDRESS+"/users";

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
  }

  public getUsers = (): Observable<User[]> => {
      let users = this._http
          .get(`${this.actionUrl}/populated`, {headers: this.getHeaders()}).map((response: Response) => <User[]>response.json());
      return users;
  }

  private getHeaders(){
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      return headers;
  }

  private handleError(error: Response) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }

}