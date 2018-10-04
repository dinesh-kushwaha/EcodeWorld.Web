import { PublicHomeComponent } from '../../public/home';
import { Routes, RouterModule } from '@angular/router';

import{PublicSingleComponent} from '../../public/single/public.single.component';
import{PublicCategoryComponent} from '../../public/category/public.category.component';
import{PublicProfileComponent} from '../../public/profile/public.profile.component';
import{PublicAboutUsComponent} from '../../public/aboutus/public.aboutus.component';
import{PublicVideosComponent} from '../../public/videos/public.videos.component';
import{PublicArticlesComponent} from '../../public/articles/public.articles.component';
import{PublicServicesComponent} from '../../public/services/public.services.component';
import{PublicJobsComponent} from '../../public/jobs/public.jobs.component';
import{PublicNewsComponent} from '../../public/news/public.news.component';
import{PublicEventsComponent} from '../../public/events/public.events.component';

export const PUBLIC_ROUTES: Routes = [
    // { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '', component: PublicHomeComponent },
    { path: 'category', component: PublicCategoryComponent },
    { path: 'single', component: PublicSingleComponent },
    { path: 'profile', component: PublicProfileComponent },
    { path: 'aboutus', component: PublicAboutUsComponent },
    { path: 'videos', component: PublicVideosComponent },
    { path: 'articles', component: PublicArticlesComponent },
    { path: 'services', component: PublicServicesComponent },
    { path: 'jobs', component: PublicJobsComponent },
    { path: 'news', component: PublicNewsComponent },
    { path: 'events', component: PublicEventsComponent }
];