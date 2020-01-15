import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PostComponent } from 'src/app/components/post/post.component';
import { CreatePostComponent } from 'src/app/components/create-post/create-post.component';
import { EditComponent } from 'src/app/components/edit/edit.component';

const routes: Routes = [
  {path: 'post', component: PostComponent },
  {path: 'create', component: CreatePostComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: '', redirectTo: 'post', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutesModule { }
