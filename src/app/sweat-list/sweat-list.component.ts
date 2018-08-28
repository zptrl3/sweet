import { Component, OnInit } from '@angular/core';
import { ISweat } from '../shared/sweat.model';
import { SweatService } from '../shared/sweat.service';
import { Router } from '@angular/router';
import { concat } from '../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-sweat-list',
  templateUrl: './sweat-list.component.html',
  styleUrls: ['./sweat-list.component.css']
})
export class SweatListComponent implements OnInit {
  allSweats: any = [];
  containImage = false;
  commentCounter = 0;

  lat = 41.0214;
  lng = 28.9948;
  z = 1;

  constructor(
    private sweatService: SweatService,
    private router: Router 
  ) { }

  ngOnInit() {
    this.getMessages();
  }

  getMessages(): any {
    let params = '?n=10';
    this.sweatService.get('get', params).subscribe(res => {
      this.allSweats = res;
      console.log(res);
    },
    err => {
      console.log(err);
    }
  );
  }
  
}
