import { Component, ViewChild } from '@angular/core';
import{ User} from './shared/user';
import {UsersService} from './shared/users.service';
import { TreeModule } from 'angular2-tree-component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
        let currentUser = {'id': this.usersList[userKey]._id, "name": this.usersList[userKey].first_name};
        let currentPaths = [];
        for(let pathKey in this.usersList[userKey].paths){
          currentPaths.push({'name': this.usersList[userKey].paths[pathKey]._id});
        }
        currentUser["children"] = currentPaths;
        this.nodes.push(currentUser);
      }
      console.log(this.nodes);
    }); 
   
  }
}
