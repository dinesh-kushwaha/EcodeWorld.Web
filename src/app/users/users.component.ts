import { Component, OnInit } from '@angular/core';
import {Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private titile: Title,private meta: Meta) { 
    
    this.titile.setTitle("Users PAGE");
    this.meta.addTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.addTag({ name: 'twitter:site', content: '@alligatorio' });
    this.meta.addTag({ name: 'twitter:title', content: 'Front-end Web Development, Chewed Up' });
    this.meta.addTag({ name: 'twitter:description', content: 'Learn frontend web development...' });
    this.meta.addTag({ name: 'twitter:image', content: 'https://alligator.io/images/front-end-cover.png' });
    
  }

  ngOnInit() {

  }

}
