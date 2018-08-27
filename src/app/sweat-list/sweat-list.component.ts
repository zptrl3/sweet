import { Component, OnInit } from '@angular/core';
import { ISweat } from '../shared/sweat.model';
import { SweatService } from '../shared/sweat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sweat-list',
  templateUrl: './sweat-list.component.html',
  styleUrls: ['./sweat-list.component.css']
})
export class SweatListComponent implements OnInit {
  allSweats: any;
  messagesIds = [];
  messagecount = 0;
  messages: any;

  lat = 41.0214;
  lng = 28.9948;
  z = 1;

  constructor(
    private sweatService: SweatService,
    private router: Router 
  ) { }

  ngOnInit() {
  }

  
  getMessagesId(): any{
    return new Promise((resolve, reject) => {
      let params = "?x="+this.lat+"&y="+this.lng+"&z="+this.z+"&id="+'1234';
       this.sweatService.get('getAndUpdateLocation', params).subscribe(res => {
       this.messagesIds = res.json();
       console.log(res.json());

       //this.addMessages(res.json());

       resolve();
       },
       err =>{
         console.log(err);
       });
    })
 }

 getTenMessages() {
   let limit = 10;
   let idList = this.messagesIds.slice(this.messagecount, this.messagecount + limit);
   this.messagecount += limit;
   
   this.sweatService.post('getMessages', idList).subscribe(res => {
     this.addMessages(res.json());
   },
   err => {
     console.log(err);
   })
 }

 addMessages(res) {
   this.messages = this.messages.concat(res);
 }

}
