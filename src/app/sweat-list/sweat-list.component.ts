import { Component, OnInit } from '@angular/core';
import { SweatService } from '../shared/sweat.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sweat-list',
  templateUrl: './sweat-list.component.html',
  styleUrls: ['./sweat-list.component.css']
})
export class SweatListComponent implements OnInit {
  allSweats: any = [];
  currentSweat = {
    id: null,
    commentCollection: null
  };
  currentCommentSweat: any;
  sendedFormValues: any;

  newCommentForm: FormGroup;
  owner: FormControl;
  body: FormControl;

  constructor(
    private sweatService: SweatService
  ) { }

  ngOnInit() {
    this.getMessages();

    this.owner = new FormControl('');
    this.body = new FormControl('', Validators.required);

    this.newCommentForm = new FormGroup({
      owner: this.owner,
      body: this.body
    });
  }

  getMessages(): any {
    const params = '?n=10';
    this.sweatService.get('get', params).subscribe(res => {
      this.allSweats = res;
      console.log(res);
    },
    err => {
      console.log(err);
    }
  );
  }

  getComment(formValues) {
    this.sendedFormValues = formValues;
  }

  getSweatComment(sweat) {
    this.currentSweat = sweat;
  }

  addComment(sweat) {
    this.currentCommentSweat = sweat;
    console.log(this.currentSweat);
    const commentParams = {
      body: this.sendedFormValues.body.trim(),
      id: this.sendedFormValues.id,
      owner: this.sendedFormValues.owner
    };

    this.sweatService.post('addComment', commentParams).subscribe(
      res => {
        console.log('New POST succesful');
      },
      err => {
        console.log('New Post error');
      });
  }

  validateComment() {
    return this.body.valid || this.body.untouched;
  }

}
