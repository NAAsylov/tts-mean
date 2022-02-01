import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AddPostService } from '../../../services/add-post.service';
import { Post } from '../../../models/post';
import { Router } from '@angular/router';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  @ViewChild('closeBtn') closeBtn: ElementRef;
  public post: Post;

  constructor(
    private addPostService: AddPostService,
    private router: Router,
    private commonService: CommonService
  ) {
    this.post = new Post();
  }

  ngOnInit(): void {
  }

  addPost() {
  	if(this.post.title && this.post.description){
  		this.addPostService.addPost(this.post).subscribe(res =>{
  			this.closeBtn.nativeElement.click();
        this.commonService.notifyPostAddition();
  		});
  	} else {
  		alert('Title and Description required');
  	}
  }

}
