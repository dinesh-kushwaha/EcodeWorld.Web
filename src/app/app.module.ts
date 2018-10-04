import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
// import {FlexLayoutModule} from '@angular/flex-layout';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { NgxEditorModule } from 'ngx-editor';
// import { TooltipModule } from 'ngx-bootstrap/tooltip';
//import { CKEditorModule } from 'ngx-ckeditor';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppPublicModule } from './app.public.module';
import { AppSecureModule } from './app.secure.module';

// import { QuillModule } from 'ngx-quill';
// import {QuillDebounceWithBlurDirective} from './directives/debounceWithBlur.directive';
// import { QuillActiveOnFocusDirective } from './directives/activeOnFocus.directive';
// import { QuillInitializeService } from './services/quill-initialize.service';

import { ECWCommonService } from './common/services/ecw.common.service';
import { AuthenticationService } from './common/services/authenticationService';
import { AuthGuard } from './common/services/authGuard';
import { ClipboardModule, ClipboardService } from 'ngx-clipboard';

// import { WebStorageModule } from 'ngx-store';
import { ToastrModule } from 'ngx-toastr';
//import { UploadComponent } from './common/components/upload.component';


@NgModule({
  declarations: [
    AppComponent
    //UploadComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    NgtUniversalModule,
    AppRoutingModule,
    ReactiveFormsModule,
    //WebStorageModule,
    AngularFontAwesomeModule,
    AppPublicModule,
    AppSecureModule,
    ToastrModule.forRoot(),
    ClipboardModule
    //CKEditorModule
    //FlexLayoutModule

    //AngularFileUploaderModule,
    // NgxEditorModule,
    // TooltipModule.forRoot()
    //QuillModule
  ],
  providers: [AuthenticationService, AuthGuard, ECWCommonService, ClipboardService]
})
export class AppModule {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }

}