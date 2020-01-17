import { Injectable } from '@angular/core';
import { Amos } from './amos';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AmosService {
  posts: Amos[] = [];
  private postsUpdate = new Subject<{postdata: Amos[], maxCount: number}>();
  maxCount;
  url = 'http://localhost:3000/api/posts';
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getPostsUpdate() {
    return this.postsUpdate.asObservable();
  }

  // create post //

  post(tit: string, des: string, img: File) {
    const postForm  = new FormData();
    postForm.append('title', tit);
    postForm.append('description', des);
    postForm.append('image', img, tit);

    this.http.post<{message: string, document: any}>(`${this.url}`, postForm)
    .subscribe((data) => {
      /*this.posts.push(data.document);
      this.postsUpdate.next([...this.posts]);*/
      this.router.navigate(['/']);
    });
  }

  // read all posts //
  myPost(postPerPage: number, currentPage: number) {
    this.http.get<{message: string, documents: any, maxCount: number}>(`${this.url}?pagesize=${postPerPage}&page=${currentPage}`)
    .pipe(
      map((data ) => {
        return {
          posts: data.documents.map(x => {
            return {
              id: x._id,
              title: x.title,
              description: x.description,
              imagePath: x.imagePath
            };
          }),
          maxCount: data.maxCount
        };
      })
    )
    .subscribe((dataPosts) => {
      console.log(dataPosts);
      this.posts = dataPosts.posts;
      this.postsUpdate.next({
        postdata: [...this.posts],
        maxCount: dataPosts.maxCount,
      });
    });
  }

  // read one post

  getOnePost(id) {
    return this.http.get<{message: string, document: any}>(`${this.url}/${id}`);
  }

  // update one image

  updateOnePost(Id: string, tit: string, des: string, img: File | string) {
    let postForm;
    if (typeof(img) === 'object') {
      postForm = new FormData();
      postForm.append('id', Id);
      postForm.append('title', tit);
      postForm.append('description', des);
      postForm.append('image', img, tit);
    } else {
      postForm = {
        id: Id,
        title: tit,
        description: des,
        imagePath: img
      };
    }
    this.http.post<{message: string, document: any }>(`${this.url}/update/${Id}`, postForm)
    .subscribe((data) => {
     /* const newPosts = [...this.posts];
      const indx = newPosts.findIndex(x => x.id === Id);
      newPosts[indx] = data.document;
      this.posts = newPosts;
      this.postsUpdate.next([...this.posts]);*/

      this.router.navigate(['/']);
    });
  }

  // delete one image :::

  delete(id) {
    return this.http.get<{message: string}>(`${this.url}/delete/${id}`);
    /*.subscribe((data) => {
      console.log(data.message);
      const newPost = [...this.posts];
      const remainPost = newPost.filter(x => x.id !== id);
      this.posts = remainPost;
      this.postsUpdate.next([...this.posts]);
    });*/
  }


}
