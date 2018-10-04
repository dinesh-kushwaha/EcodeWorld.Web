import { NgModule} from '@angular/core';
import { SecureComponent } from './layout/secure';
import { SecureHomeComponent } from './secure/home';
import { SecureHeaderComponent } from './layout/secure/header/secure.header.component';
import { SecureFooterComponent } from './layout/secure/footer/secure.footer.component';
import { SecureLoginComponent } from './secure/accounts/login/secure.login.component';
import { SecureCreateArticleComponent,DialogContentExampleDialog } from './secure/articles/secure.create.article.component';
import { SecureProfileUpdateComponent } from './secure/accounts/profile/update/secure.profile.update.component';
import { SecureProfileComponent } from './secure/accounts/profile/secure.profile.component';
import { AppRoutingModule } from './app.routing.module';



//import { QuillModule } from 'ngx-quill';
// import {QuillDebounceWithBlurDirective} from './directives/debounceWithBlur.directive';
// import { QuillActiveOnFocusDirective } from './directives/activeOnFocus.directive';
//import { QuillInitializeService } from './services/quill-initialize.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppMaterialModule } from './app.material.module';
import { CKEditorModule } from 'ngx-ckeditor';
import { UploadComponent } from './common/components/upload.component';
//import { ECWFileManager } from './common/components/file.manager.component';


@NgModule({
  declarations: [
    SecureHomeComponent,
    SecureHomeComponent,
    SecureComponent,
    SecureHeaderComponent,
    SecureFooterComponent,
    SecureLoginComponent,
    SecureCreateArticleComponent,
    SecureProfileUpdateComponent,
    SecureProfileComponent,
    UploadComponent,
    DialogContentExampleDialog
  ],
  entryComponents: [
    DialogContentExampleDialog
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppMaterialModule,
    CKEditorModule
  ],
  exports:[
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    CKEditorModule
  ],
  providers: [],
  //providers: [QuillInitializeService],
})
export class AppSecureModule {

  constructor(){}
}