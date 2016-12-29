import { Component, ViewChild } from '@angular/core';
import{ User} from './shared/user';
import{ Location} from './shared/location';
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
  private map: any;

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
    }); 
   
  }
  ngOnInit(){
    this.map = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(this.map);
  }

  onActivate = ($event) => {
    console.log($event);
    if ($event.node.data.userObject){
      // If it is not a path object, do nothing
    }
    else if ($event.node.data.pathObject){
      let leafletLatLong = this.toLeafLetLatLong($event.node.data.pathObject.locations);
      let leafLetLocation = L.polyline(leafletLatLong, {color: 'red'}).addTo(this.map);
      this.map.fitBounds(leafLetLocation.getBounds());
    }
  }

  toLeafLetLatLong = (locations: Location[]): LatLng[] =>{
    let leafletLatLong: LatLng[] = [];
    for (let locKey in locations){
      leafletLatLong.push([locations[locKey].latitude, locations[locKey].longitude])
    }
    return leafletLatLong;
  }
}
