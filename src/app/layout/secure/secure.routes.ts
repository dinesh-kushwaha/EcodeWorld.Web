import { SecureHomeComponent } from '../../secure/home';
import { Routes, RouterModule } from '@angular/router';

import { SecureCreateArticleComponent } from '../../secure/articles/secure.create.article.component';
import { SecureProfileUpdateComponent } from '../../secure/accounts/profile/update/secure.profile.update.component';
import { SecureProfileComponent } from '../../secure/accounts/profile/secure.profile.component';
import { AuthGuard } from '../../common/services/authGuard';




export const SECURE_ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: SecureHomeComponent, canActivate: [AuthGuard] },
    { path: 'create-article', component: SecureCreateArticleComponent, canActivate: [AuthGuard] },
    { path: 'profile-update', component: SecureProfileUpdateComponent, canActivate: [AuthGuard] },
    { path: 'profile-view', component: SecureProfileComponent, canActivate: [AuthGuard] }

];