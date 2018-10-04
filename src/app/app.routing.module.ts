import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component'

import { SecureComponent, SECURE_ROUTES } from './layout/secure';
import { PublicComponent, PUBLIC_ROUTES } from './layout/public';

import { SecureLoginComponent } from './secure/accounts/login/secure.login.component';
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
import { AuthGuard } from './common/services/authGuard'

// const routes: Routes = [
//   {
//     path:"users",
//     component:UsersComponent
//   }
// ];

const routes: Routes = [
  { path: "users", component: UsersComponent },
  // { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: PublicComponent, data: { title: 'Public Views' }, children: PUBLIC_ROUTES },
  { path: 'account', component: PublicAccountComponent, data: { title: 'Public Views' }, children: PUBLIC_ROUTES },
  { path: 'category', component: PublicCategoryComponent },
  { path: 'single', component: PublicSingleComponent },
  { path: 'profile', component: PublicProfileComponent },
  { path: 'aboutus', component: PublicAboutUsComponent },
  { path: 'videos', component: PublicVideosComponent },
  { path: 'articles', component: PublicArticlesComponent },
  { path: 'services', component: PublicServicesComponent },
  { path: 'jobs', component: PublicJobsComponent },
  { path: 'news', component: PublicNewsComponent },
  { path: 'events', component: PublicEventsComponent },
  { path: 'login', component: PublicComponent, data: { title: 'Public Views' }, children: PUBLIC_ROUTES },
  { path: 'register', component: PublicComponent, data: { title: 'Public Views' }, children: PUBLIC_ROUTES },

  // { path: 'category', component: PublicCategoryComponent, data: { title: 'Public Views' }, children: PUBLIC_ROUTES },
  // { path: 'single', component: PublicSingleComponent, data: { title: 'Public Views' }, children: PUBLIC_ROUTES },
  { path: 'seclogin', component: SecureLoginComponent, data: { title: 'Public Views' }, children: PUBLIC_ROUTES },
  { path: 'secregister', component: PublicComponent, data: { title: 'Public Views' }, children: PUBLIC_ROUTES },
  { path: 'admin', component: SecureComponent, canActivate: [AuthGuard], data: { title: 'Secure Views' }, children: SECURE_ROUTES },
  { path: '**', redirectTo: 'notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


