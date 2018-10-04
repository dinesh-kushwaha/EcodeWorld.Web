
import { NgModule } from '@angular/core';
import { PublicComponent } from './layout/public';
import { PublicHomeComponent } from './public/home';
import { PublicHeaderComponent } from './layout/public/header/public.header.component';
import { PublicHeaderSecondaryComponent } from './layout/public/header/secondary/public.header.secondary.component';
import { PublicFooterComponent } from './layout/public/footer/public.footer.component';
import { PublicLoginComponent } from './public/accounts/login/public.login.component';
import { PublicSingleComponent } from './public/single/public.single.component';
import { PublicCategoryComponent } from './public/category/public.category.component';
import { PublicProfileComponent } from './public/profile/public.profile.component';
import { PublicAboutUsComponent } from './public/aboutus/public.aboutus.component';
import { PublicVideosComponent } from './public/videos/public.videos.component';
import { PublicArticlesComponent } from './public/articles/public.articles.component';
import { PublicServicesComponent } from './public/services/public.services.component';
import { PublicJobsComponent } from './public/jobs/public.jobs.component';
import { PublicNewsComponent } from './public/news/public.news.component';
import { PublicEventsComponent } from './public/events/public.events.component';
import { PublicAccountComponent } from './public/accounts/public.account.component';
import { UsersComponent } from './users/users.component';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppMaterialModule } from './app.material.module';

//import { QuillModule } from 'ngx-quill';
// import {QuillDebounceWithBlurDirective} from './directives/debounceWithBlur.directive';
// import { QuillActiveOnFocusDirective } from './directives/activeOnFocus.directive';
//import { QuillInitializeService } from './services/quill-initialize.service';



@NgModule({
  declarations:[
    PublicHomeComponent,
    PublicComponent,
    PublicHeaderComponent,
    PublicHeaderSecondaryComponent,
    PublicFooterComponent,
    PublicLoginComponent,
    PublicSingleComponent,
    PublicCategoryComponent,
    PublicProfileComponent,
    PublicAboutUsComponent,
    PublicVideosComponent,
    PublicArticlesComponent,
    PublicServicesComponent,
    PublicJobsComponent,
    PublicNewsComponent,
    PublicEventsComponent,
    PublicAccountComponent,
    UsersComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  exports:[
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  providers: [],
  //providers: [QuillInitializeService],
})
export class AppPublicModule {

}