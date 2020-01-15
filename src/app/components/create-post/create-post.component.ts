import { Component, OnInit, Output,  EventEmitter } from '@angular/core';
import { Amos } from 'src/app/amos';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AmosService } from 'src/app/amos.service';
import { mimeTypeValidator } from './mimeType.Validators';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  enterTitle = '';
  enterDescription = '';
  // @Output() posting = new EventEmitter<Amos>();
  previewImage;
  postForm: FormGroup;

  constructor(
    private amosservice: AmosService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required]],
      image: [null, [Validators.required], mimeTypeValidator]
    });
  }

  get title() {
    return this.postForm.get('title');
  }

  get description() {
    return this.postForm.get('description');
  }

  onImagePick(e: Event) {
    const file = (e.target as HTMLInputElement).files[0];
    this.postForm.patchValue({image: file});
    this.postForm.get('image').updateValueAndValidity();

    console.log(file);
    console.log(this.postForm);

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.previewImage = reader.result;
    });
    reader.readAsDataURL(file);
  }


  onAddPost() {
    if (this.postForm.invalid) {
      return;
    }
    const post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description
    };
    // this.posting.emit(post);
    this.amosservice.post(
      this.postForm.value.title,
      this.postForm.value.description,
      this.postForm.value.image
    );

    this.postForm.reset();

    Object.keys(this.postForm.controls).forEach(key => {
      this.postForm.controls[key].setErrors(null);
    });
  }

}
