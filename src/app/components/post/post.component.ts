import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Amos } from 'src/app/amos';
import { AmosService } from 'src/app/amos.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  openState = false;
  sub: Subscription;

  loading = false;

  length = 0;
  postPerPage = 2;
  currentPage = 1;
  pageSizeOption = [1, 2, 5, 10];

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
    this.loading = true;
    this.amosservice.myPost(this.postPerPage, this.currentPage);
    this.sub = this.amosservice.getPostsUpdate()
    .subscribe((data: {postdata: Amos[], maxCount: number}) => {
      this.loading = false;
      this.posts = data.postdata;
      this.length = data.maxCount;
    });

  }

  onPage(pageData: PageEvent) {
    console.log(pageData);
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;

    this.amosservice.myPost(this.postPerPage, this.currentPage);
  }

  onEdit(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  onDelete(id) {
    this.amosservice.delete(id).subscribe(() => {
      this.amosservice.myPost(this.postPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    // tslint:disable-next-line: no-unused-expression
    this.sub.unsubscribe;
  }

}
