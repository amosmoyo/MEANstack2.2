import { Component, OnInit, Output,  EventEmitter } from '@angular/core';
import { Amos } from 'src/app/amos';
import { NgForm } from '@angular/forms';
import { AmosService } from 'src/app/amos.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  enterTitle = '';
  enterDescription = '';
  // @Output() posting = new EventEmitter<Amos>();

  constructor(private amosservice: AmosService) { }

  ngOnInit() {
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: Amos = {
      title: form.value.title,
      description: form.value.description
    };
    // this.posting.emit(post);
    this.amosservice.getPost(post);

    form.resetForm();
  }

}
