import { Component, OnInit } from '@angular/core';
import {Title, Meta } from '@angular/platform-browser';
import {ConfigService } from '../../common/services/config.service';
import {Config } from '../../common/services/config.model';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-public-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class PublicHomeComponent implements OnInit {
  config :Config;
  headers:any;
  error:any;
  constructor(private titile: Title,private meta: Meta,private configService:ConfigService) { 
    
    this.titile.setTitle("E Code World - A Social Community of Developers and Programmers and Technology Shapers");
    this.meta.addTag({ name: 'Description', 
    content: 'Free source code and tutorials for Software developers , Architects and Technology Shapers and E-Code World - For those who code and give a shape to technology' });
    this.meta.addTag({ itemprop: 'Description', 
    content: 'Free source code and tutorials for Software developers , Architects and Technology Shapers and E-Code World - For those who code and give a shape to technology' });
    // <!-- Schema.org markup for Google+ -->
//     <meta itemprop="name" content="The Name or Title Here">
// <meta itemprop="description" content="This is the page description">
// <meta itemprop="image" content="http://www.example.com/image.jpg">
    this.meta.addTag({ itemprop: 'name', content: 'E Code World - A Social Community of Developers and Programmers and Technology Shapers' });
    this.meta.addTag({ itemprop: 'description', content: 'Free source code and tutorials for Software developers , Architects and Technology Shapers and E-Code World - For those who code and give a shape to technology' });
    this.meta.addTag({ itemprop: 'image', content: 'https://www.ecodeworld.com/assets/img/ecodeworld/ecodeworld-logo.png' });

    // <!-- Twitter Card data -->
    // <meta name="twitter:card" content="product">
    // <meta name="twitter:site" content="@publisher_handle">
    // <meta name="twitter:title" content="Page Title">
    // <meta name="twitter:description" content="Page description less than 200 characters">
    // <meta name="twitter:creator" content="@author_handle">
    // <meta name="twitter:image" content="http://www.example.com/image.jpg">
    // <meta name="twitter:data1" content="$3">
    // <meta name="twitter:label1" content="Price">
    // <meta name="twitter:data2" content="Black">
    // <meta name="twitter:label2" content="Color">
    this.meta.addTag({ name: 'twitter:card', content: 'E Code World - A Social Community of Developers and Programmers and Technology Shapers' });
    this.meta.addTag({ name: 'twitter:site', content: 'https://www.ecodeworld.com' });
    this.meta.addTag({ name: 'twitter:description', content: 'E Code World - A Social Community of Developers and Programmers and Technology Shapers' });
    this.meta.addTag({ name: 'twitter:creator', content: 'Dinesh Kushwaha' });
    this.meta.addTag({ name: 'twitter:image', content: 'https://www.ecodeworld.com/assets/img/img-author.jpg' });

//     <!-- Open Graph data -->
// <meta property="og:title" content="Title Here" />
// <meta property="og:type" content="article" />
// <meta property="og:url" content="http://www.example.com/" />
// <meta property="og:image" content="http://example.com/image.jpg" />
// <meta property="og:description" content="Description Here" />
// <meta property="og:site_name" content="Site Name, i.e. Moz" />
// <meta property="og:price:amount" content="15.00" />
// <meta property="og:price:currency" content="USD" />
// <meta property="fb:admins" content="Facebook numeric ID" />
   this.meta.addTag({ property: 'og:title', content: 'E Code World - A Social Community of Developers and Programmers and Technology Shapers' });
   this.meta.addTag({ property: 'og:type', content: 'article' });
   this.meta.addTag({ property: 'og:image', content: 'https://www.ecodeworld.com/assets/img/ecodeworld/ecodeworld-logo.png' });
   this.meta.addTag({ property: 'og:description', content: 'E Code World - A Social Community of Developers and Programmers and Technology Shapers' });
   this.meta.addTag({ property: 'fb:admins', content: '100000490749703' });

  }

  ngOnInit() {
  }

  showConfig() {
    this.configService.getConfig()
      .subscribe((data: Config) => this.config = {
          heroesUrl: data['heroesUrl'],
          textfile:  data['textfile']
      });

      this.configService.getConfig()
      // clone the data object, using its known Config shape
      .subscribe((data: Config) => this.config = { ...data });
  }

  showConfigResponse() {
    this.configService.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
  
        // access the body directly, which is typed as `Config`.
        this.config = { ... resp.body };
      });
  }

  showConfigErrorHandling() {
    this.configService.getConfig()
      .subscribe(
        (data: Config) => this.config = { ...data }, // success path
        error => this.error = error // error path
      );
  }
  contents:any;
  download() {
    this.configService.getTextFile('assets/textfile.txt')
      .subscribe(results => this.contents = results);
  }
  heroes=<Config[]>[];
  addConfig(){
    var newConfig:Config=<Config>{};
    this.configService.addHero(newConfig)
    .subscribe(hero => this.heroes.push(hero));
  }

  deleteConfig(){

    this.configService.deleteHero(3).subscribe();
  }
 
}
