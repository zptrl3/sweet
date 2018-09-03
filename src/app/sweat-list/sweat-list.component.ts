import { Component, OnInit, OnDestroy } from '@angular/core';
import { SweatService } from '../shared/sweat.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sweat-list',
  templateUrl: './sweat-list.component.html',
  styleUrls: ['./sweat-list.component.css']
})
export class SweatListComponent implements OnInit {
  allSweats: any = [];
  sweatId: any;
  navigationSubscription: any;
  currentSweat = {
    id: null,
    commentCollection: null
  };

  newCommentForm: FormGroup;
  owner: FormControl;
  body: FormControl;

  constructor(
    private sweatService: SweatService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

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
    });
  }

  getSweatId(sweat) {
    this.sweatId = sweat.id;
  }

  getSweatComment(sweat) {
    this.currentSweat = sweat;
  }

  addComment(formValues) {
    const commentParams = {
      body: formValues.body.trim(),
      id: this.sweatId,
      owner: formValues.owner
    };

    this.sweatService.post('addComment', commentParams).subscribe(
      res => {
        console.log('New POST succesful');
        this.toastr.success('Your comment added successfully.', 'Success!', {
          timeOut: 2000
        });
      },
      err => {
        console.log('New Post error');
        this.toastr.error('Something is not right.', 'Post Error', {
          timeOut: 3000
        });
      },
      // Anonymous function to reload page after sending message
      () => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }

  validateComment() {
    return this.body.valid || this.body.untouched;
  }

}
