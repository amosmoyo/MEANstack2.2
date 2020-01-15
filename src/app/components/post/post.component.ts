import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Amos } from 'src/app/amos';
import { AmosService } from 'src/app/amos.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  openState = false;
  sub: Subscription;

  /*@Input()*/ posts: Amos[] = [
    /*
    {title: 'first post', description: 'this is my first post'},
    {title: 'first post', description: 'this is my first post'},
    {title: 'first post', description: 'this is my first post'}
    */
  ];
  constructor(
    private amosservice: AmosService,
    private router: Router
    ) { }

  ngOnInit() {
    this.amosservice.myPost();
    this.sub = this.amosservice.getPostsUpdate()
    .subscribe((data: Amos[]) => {
      this.posts = data;
    });

  }

  onEdit(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  onDelete(id) {
    this.amosservice.delete(id);
  }

  ngOnDestroy() {
    // tslint:disable-next-line: no-unused-expression
    this.sub.unsubscribe;
  }

}
