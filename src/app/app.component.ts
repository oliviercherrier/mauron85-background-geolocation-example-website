import { Component, ViewChild } from '@angular/core';
import{ User} from './shared/user';
import {UsersService} from './shared/users.service';
import { TreeModule } from 'angular2-tree-component';

import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app/app.component.css'],
  providers: [UsersService],

})

export class AppComponent {
  usersList: User[];
  nodes: any[];

  constructor(private _usersService: UsersService) {
    this._usersService.getUsers().subscribe((r: User[]) => {
      this.usersList = r;
      this.nodes = []; 
      for (let userKey in this.usersList){
        let currentUser = {'userObject': this.usersList[userKey],'id': this.usersList[userKey]._id, "name": this.usersList[userKey].first_name};
        let currentPaths = [];
        for(let pathKey in this.usersList[userKey].paths){
          currentPaths.push({'pathObject': this.usersList[userKey].paths[pathKey], 'name': this.usersList[userKey].paths[pathKey]._id, 'id': this.usersList[userKey].paths[pathKey]._id});
        }
        currentUser["children"] = currentPaths;
        this.nodes.push(currentUser);
      }
      console.log(this.nodes);
    }); 
   
  }
  ngOnInit(){
    var myMap = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(myMap);

  }

  onActivate = ($event) => {
    console.log($event);
    if ($event.node.data.userObject){
      // If it is not a path object, do nothing
      console.log("I am a user Object");
    }
    else if ($event.node.data.pathObject){
      console.log("I am a path Object");
    }
    
  }
}
