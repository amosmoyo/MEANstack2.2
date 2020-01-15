import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AmosService } from 'src/app/amos.service';
import { Amos } from 'src/app/amos';
import { mimeTypeValidator } from '../create-post/mimeType.Validators';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  updateForm: FormGroup;

  previewImage;
  postId;
  post;

  constructor(
    private amosservice: AmosService,
    private fb: FormBuilder,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.updateForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required]],
      image: [null, [Validators.required], mimeTypeValidator]
    });

    this.route.paramMap.subscribe((param: ParamMap) => {
      if (param.has('id')) {
        this.postId = param.get('id');
      }
    });

    this.amosservice.getOnePost(this.postId)
    .subscribe((data) => {
      this.post = data.document;
      console.log(this.post);

      this.updateForm.setValue({
        title: this.post.title,
        description: this.post.description,
        image: this.post.imagePath
      });
    });

  }

  get title() {
    return this.updateForm.get('title');
  }

  get description() {
    return this.updateForm.get('description');
  }

  onImagePick(e: Event) {
    const file = (e.target as HTMLInputElement).files[0];
    this.updateForm.patchValue({image: file});
    this.updateForm.get('image').updateValueAndValidity();

    console.log(file);
    console.log(this.updateForm);

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.previewImage = reader.result;
    });
    reader.readAsDataURL(file);
  }


  onAddPost() {
    if (this.updateForm.invalid) {
      return;
    }
    const post = {
      title: this.updateForm.value.title,
      description: this.updateForm.value.description
    };

    this.amosservice.updateOnePost(
      this.postId,
      this.updateForm.value.title,
      this.updateForm.value.description,
      this.updateForm.value.image
    );
    // this.posting.emit(post);
    // this.amosservice.post(post);

    this.updateForm.reset();

    Object.keys(this.updateForm.controls).forEach(key => {
      this.updateForm.controls[key].setErrors(null);
    });
  }

}
