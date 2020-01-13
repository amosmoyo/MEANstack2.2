import { Injectable } from '@angular/core';
import { Amos } from './amos';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AmosService {
  posts: Amos[] = [];
  private postsUpdate = new Subject<Amos[]>();
  constructor() { }

  getPost(post) {
    this.posts.push(post);
    this.postsUpdate.next([...this.posts]);
  }

  getPostsUpdate() {
   return this.postsUpdate.asObservable();
  }

  myPost() {
    return [...this.posts];
  }

}
