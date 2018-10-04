import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { AboutusService } from './services/aboutus.service';

@Component({
  selector: 'app-public-aboutus',
  templateUrl: './public.aboutus.component.html',
  styleUrls: ['./public.aboutus.component.css']
})
export class PublicAboutUsComponent implements OnInit {
  members: any;
  constructor(private titile: Title, private meta: Meta, private aboutusService: AboutusService) {
    meta.addTags([
      { name: 'author', content: 'Coursetro.com' },
      { name: 'keywords', content: 'angular seo, angular 4 universal, etc' },
      { name: 'description', content: 'This is my Angular SEO-based App, enjoy it!' }
    ]);
    this.meta.addTag({ name: 'Description', content: 'Free source code and tutorials for Software developers , Architects and Technology Shapers and E-Code World - For those who code and give a shape to technology' });

    //     this.titile.setTitle("About US");
    //     this.meta.addTag({ itemprop: 'Description',  content: 'Free source code and tutorials for Software developers , Architects and Technology Shapers and E-Code World - For those who code and give a shape to technology' });
    //     // <!-- Schema.org markup for Google+ -->
    // //     <meta itemprop="name" content="The Name or Title Here">
    // // <meta itemprop="description" content="This is the page description">
    // // <meta itemprop="image" content="http://www.example.com/image.jpg">
    //     this.meta.addTag({ itemprop: 'name', content: 'E Code World - A Social Community of Developers and Programmers and Technology Shapers' });
    //     this.meta.addTag({ itemprop: 'description', content: 'Free source code and tutorials for Software developers , Architects and Technology Shapers and E-Code World - For those who code and give a shape to technology' });
    //     this.meta.addTag({ itemprop: 'image', content: 'https://www.ecodeworld.com/assets/img/ecodeworld/ecodeworld-logo.png' });

    //     // <!-- Twitter Card data -->
    //     // <meta name="twitter:card" content="product">
    //     // <meta name="twitter:site" content="@publisher_handle">
    //     // <meta name="twitter:title" content="Page Title">
    //     // <meta name="twitter:description" content="Page description less than 200 characters">
    //     // <meta name="twitter:creator" content="@author_handle">
    //     // <meta name="twitter:image" content="http://www.example.com/image.jpg">
    //     // <meta name="twitter:data1" content="$3">
    //     // <meta name="twitter:label1" content="Price">
    //     // <meta name="twitter:data2" content="Black">
    //     // <meta name="twitter:label2" content="Color">
    //     this.meta.addTag({ name: 'twitter:card', content: 'E Code World - A Social Community of Developers and Programmers and Technology Shapers' });
    //     this.meta.addTag({ name: 'twitter:site', content: 'https://www.ecodeworld.com' });
    //     this.meta.addTag({ name: 'twitter:description', content: 'E Code World - A Social Community of Developers and Programmers and Technology Shapers' });
    //     this.meta.addTag({ name: 'twitter:creator', content: 'Dinesh Kushwaha' });
    //     this.meta.addTag({ name: 'twitter:image', content: 'https://www.ecodeworld.com/assets/img/img-author.jpg' });

    // //     <!-- Open Graph data -->
    // // <meta property="og:title" content="Title Here" />
    // // <meta property="og:type" content="article" />
    // // <meta property="og:url" content="http://www.example.com/" />
    // // <meta property="og:image" content="http://example.com/image.jpg" />
    // // <meta property="og:description" content="Description Here" />
    // // <meta property="og:site_name" content="Site Name, i.e. Moz" />
    // // <meta property="og:price:amount" content="15.00" />
    // // <meta property="og:price:currency" content="USD" />
    // // <meta property="fb:admins" content="Facebook numeric ID" />
    //    this.meta.addTag({ property: 'og:title', content: 'E Code World - A Social Community of Developers and Programmers and Technology Shapers' });
    //    this.meta.addTag({ property: 'og:type', content: 'article' });
    //    this.meta.addTag({ property: 'og:image', content: 'https://www.ecodeworld.com/assets/img/ecodeworld/ecodeworld-logo.png' });
    //    this.meta.addTag({ property: 'og:description', content: 'E Code World - A Social Community of Developers and Programmers and Technology Shapers' });
    //    this.meta.addTag({ property: 'fb:admins', content: '100000490749703' });

  }

  ngOnInit() {
    this.getBODMembers();
    this.titile.setTitle("About US");
    this.meta.addTag({ name: 'Description', content: 'Free source code and tutorials for Software developers , Architects and Technology Shapers and E-Code World - For those who code and give a shape to technology' });
  }

  private getBODMembers() {
    this.aboutusService.getMembers()
      .subscribe((data: any) => {
        this.members = data;
        console.log(data);
      });
  }

}
