import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { PostService } from '../services/post.service';
import { CommonService } from '../services/common.service';
import { Post } from '../models/post';
import { Role } from '../models/role';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public post: Post;
  public posts: any [];
  public nowDate: any;
  currentUser: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private postService: PostService,
    private commonService: CommonService
  ) {
    this.post = new Post();
    this.nowDate = new Date();
    this.post.date = this.nowDate;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  get isAdmin() {
    return this.currentUser && this.currentUser.user.role === Role.Admin;
  }

  ngOnInit(): void {
    this.getAllPost();

    this.commonService.postAdded_Observable.subscribe(res => {
      this.getAllPost();
    });
  }

  getAllPost() {
    this.postService.getPost().subscribe((data) => {
      this.posts = data;
    });
  }

  addPost() {
    if (this.post.title && this.post.description) {
      this.postService.addPost(this.post).subscribe(res =>{
        this.commonService.notifyPostAddition();
      });
    } else {
      alert('Заголовок или текст записи не зполнены');
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  deletePost(id) {
    if (confirm('Подтвердите удаление')) {
      this.postService.delPost(id).subscribe(res => {
        this.posts.splice(id, 1);
        this.delay(1000);
        this.getAllPost();
      });
    }
  }

}
