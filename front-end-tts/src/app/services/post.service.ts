import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { url } from './config-URL';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  URL = url;

  constructor(
    private http: HttpClient
  ) { }

  addPost(post: Post) {
    return this.http.post(`${this.URL}post/add`, {
      date: post.date,
      title : post.title,
      description : post.description
    });
  }

  getPost() {
    return this.http.get<any>(`${this.URL}post`);
  }

  delPost(id) {
    return this.http.get(`${this.URL}post/delete/${id}`);
  }
}
