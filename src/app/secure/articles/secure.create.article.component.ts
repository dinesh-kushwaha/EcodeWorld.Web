import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../common/services/authenticationService';
import { ECWCommonService } from '../../common/services/ecw.common.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { UserProfile, Personal } from '../accounts/services/models/secure.user.profile';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpResponse, HttpRequest, HttpErrorResponse, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { catchError, retry, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import * as _ from 'lodash';
import { ClipboardService } from 'ngx-clipboard'
import { Article } from './models/secure.article.models'
import { SecureArticleService } from './services/secure.article.service'
import { PostsComplexityLevels, PostsCategories, PostStatus, PostsType } from './models/secure.posts.model';

declare var $: any;
declare var CKEDITOR: any;
declare var CKFinder: any;

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}


//https://obsessiveprogrammer.com/validating-confirmation-fields-in-angular-reactive-forms-with-angular-material/
/**
 * Custom validator functions for reactive form validation
 */
export class CustomValidators {
  /**
   * Validates that child controls in the form group are equal
   */
  static childrenEqual: ValidatorFn = (formGroup: FormGroup) => {
    const [firstControlName, ...otherControlNames] = Object.keys(formGroup.controls || {});
    const isValid = otherControlNames.every(controlName => formGroup.get(controlName).value === formGroup.get(firstControlName).value);
    return isValid ? null : { childrenNotEqual: true };
  }
}

/**
* Custom ErrorStateMatcher which returns true (error exists) when the parent form group is invalid and the control has been touched
*/
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.parent.invalid && control.touched;
  }
}

/**
* Collection of reusable RegExps
*/
export const regExps: { [key: string]: RegExp } = {
  password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
};

/**
* Collection of reusable error messages
*/
export const errorMessages: { [key: string]: string } = {
  firstName: 'First Name is required!',
  lastName: 'First Name is required!',
  title: 'Degignation is required!',
  company: 'Company is required!',
  description: 'Description is required!',
  highestQualification: 'Qualification is required!',
  aboutMe: 'About me is required!'
};

let httpParams = new HttpParams();
httpParams.set("pageNumber", '1');
httpParams.set("pageSize", '250');
httpParams.set("isOrderByDescending", 'true');
//httpParams.set("criteria", '{}');

@Component({
  selector: 'app-secure-create-article',
  templateUrl: './secure.create.article.component.html',
  styleUrls: ['./secure.create.article.component.css']
})
export class SecureCreateArticleComponent implements OnInit {
  public model: UserProfile;
  public ckEditorconfig: any;
  userRegistrationForm: FormGroup;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;
  public files: Array<string>;
  private fileRootUrl: string;
  public isBusy: boolean = false;
  public article: Article;

  //Maters data
  public postsCategories: Array<PostsCategories>;
  public postsomplexityLevels: Array<PostsComplexityLevels>;
  public postStatuss: Array<PostStatus>;
  public postsTypes: Array<PostsType>;


  constructor(private authenticationService: AuthenticationService,
    private commonService: ECWCommonService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private http: HttpClient,
    private clipboardService: ClipboardService,
    private secureArticleService: SecureArticleService) {
    this.createForm();
    this.model = <UserProfile>{
      userName: this.authenticationService.user.userName
    };
    this.ckEditorconfig = this.ckConfig();
    this.init();
    this.files = [];
    this.fileRootUrl = "https://localhost:44395/files/images/";
    this.article = <Article>{};
  }


  private getPostsCategories() {

    this.secureArticleService.getPostsCategories(httpParams).subscribe((resp) => {
      console.log(resp);
      this.postsCategories = resp;
    });
  }

  private getPostsComplexTypes() {
    this.secureArticleService.getPostsComplexities(httpParams).subscribe(resp => {
      this.postsomplexityLevels = resp;
    });
  }

  private getPostsStatuss() {
    this.secureArticleService.getPostsStatuss(httpParams).subscribe(resp => {
      this.postStatuss = resp;
    });
  }

  private getPostsTypes() {
    this.secureArticleService.getPostsTypes(httpParams).subscribe(resp => {
      this.postsTypes = resp;
    });
  }

  create() {
    console.log(this.article);
  }
  private init() {

    this.getPostsCategories();
    this.getPostsComplexTypes();
    this.getPostsTypes();

    // CKEDITOR.on('dialogDefinition', function (ev) {
    //   //dialogDefinition is a ckeditor event it's fired when ckeditor dialog instance is called  
    //   var dialogName = ev.data.name;
    //   var dialogDefinition = ev.data.definition;
    //   if (dialogName == 'image') { //dialogName is name of dialog and identify which dialog is fired.  
    //     var infoTab = dialogDefinition.getContents('info'); // get tab of the dialog  
    //     var browse = infoTab.get('browse'); //get browse server button  
    //     browse.onClick = function () {
    //       //here we can invoke our custom fileuploader or server files popup  
    //       alert('open your file uploader or server files popup');
    //       this.openModal();
    //       //set image path to dialog  
    //       $( "#dialog" ).dialog();
    //       // var dialog = CKEDITOR.dialog.getCurrent();
    //       // dialog.selectPage('info');
    //       // var tUrl = dialog.getContentElement('info', 'txtUrl');
    //       // tUrl.setValue("put value of image path");
    //     };
    //   }
    // });
  }

  ngOnInit() {

  }
  copy(text: string) {
    this.clipboardService.copyFromContent(text);
    this.toastr.success("Copied in clipboard.");
  }
  openImageExplorer($event: any) {
    //this.showFiles = true; // open pop-up window
  }

  private browseFile() {
    console.log('Hi');
  }
  private ckConfig() {
    // CKEDITOR.editorConfig = function( config ) {  
    //     var ckeditor = element.ckeditor(editorOptions);
    // config.filebrowserBrowseUrl = 'javascript:void(0)';  

    // }  
    var config = {
      //filebrowserBrowseUrl: 'javascript:void(0)',
      //extraPlugins: 'uploadimage',
      //uploadUrl: 'https://localhost:44395/api/Upload',
      height: 400,
      language: "en",
      allowedContent: true,
      dialogDefinition: function (ev) { alert('HI'); },
      toolbar: [
        { name: "clipboard", items: ["Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo"] },
        { name: "links", items: ["Link", "Unlink", "Anchor"] },
        { name: "insert", items: ["Image", "Table", "HorizontalRule", "SpecialChar", "Iframe", "imageExplorer"] }
      ]
    };

    return config;
  }

  upload(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files) {
      //formData.append('file', file);
      formData.append('files', file);
      formData.append('Name', 'Chris');
      formData.append('FileName', files.files);
    }

    this.isBusy = true;
    //this.http.post<any>("https://localhost:44395/api/FileManager/UploadFiles", formData, httpOptions)
    this.http.post<any>("https://localhost:44395/api/FileManager/UploadFiles", formData, null)
      .pipe(catchError(e => throwError(e)))
      .subscribe((resp: any) => {
        //this.isBusy = true;
        let arr = _.map(resp, function (f) {
          return {
            name: f.name,
            file: f.file,
            folder: f.folder,
            extension: f.extension,
            url: "https://localhost:44395/files/images/" + f.folder + "/" + f.file
          };
        });
        console.log(arr);
        this.files = arr;
        console.log(this.files);
        this.isBusy = false;
      },
      (error) => { },
      () => {
        this.isBusy = false;
      });
  }
  openDialog() {
    this.dialog.open(DialogContentExampleDialog, {
      data: {
        animal: 'panda'
      }
    });
  }

  createForm() {
    this.userRegistrationForm = this.formBuilder.group({
      nameGroup: this.formBuilder.group({
        firstName: ['', [
          Validators.required
        ]],
        middleName: ['', [
        ]],
        lastName: ['', [
          Validators.required
        ]],
      }),
      companyGroup: this.formBuilder.group({
        title: ['', [
          Validators.required
        ]],
        company: ['', [
          Validators.required
        ]]

      }),
      description: ['', [
        Validators.required
      ]],
      aboutMe: ['', [
        Validators.required
      ]],
      highestQualification: ['', [
        Validators.required
      ]],
    });
  }

}


@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.html',
  styleUrls: ['./dialog-content-example-dialog.css']
})
export class DialogContentExampleDialog { }