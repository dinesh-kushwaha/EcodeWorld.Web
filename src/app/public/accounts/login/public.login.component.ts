import { Component, OnInit } from '@angular/core';
import { User } from '../../../common/models/common.user';
import { AuthenticationService } from '../../../common/services/authenticationService';
// import { SharedModel } from '../../../common/services/ecw.common.model';
// import { SessionStorage, SharedStorage } from 'ngx-store';
//https://www.npmjs.com/package/ngx-store
import { ECWCommonService } from '../../../common/services/ecw.common.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
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
  userName: 'User Name is required!',
  password: 'Password is required!',

};

declare var $: any;
@Component({
  selector: 'app-public-login',
  templateUrl: './public.login.component.html',
  styleUrls: ['./public.login.component.css']
})
export class PublicLoginComponent implements OnInit {
  // @SharedStorage() userSessionShared = { userName: "", isAuthenticated: false };
  // @SessionStorage({ key: 'userSession' }) userSession = { userName: "", isAuthenticated: false };
  public model = { user: <User>{}, errorMessage: <string>{} };
  userLoginForm: FormGroup;
  userRegistrationForm: FormGroup;

  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;

  constructor(private authenticationService: AuthenticationService,
    private commonService: ECWCommonService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.model.user = <User>{};
  }
  createForm() {
    this.userLoginForm = this.formBuilder.group({
      userName: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    });

    this.userRegistrationForm = this.formBuilder.group({
      userName: ['', [
        Validators.required
      ]],
      passwordGroup: this.formBuilder.group({
        password: ['', [
          Validators.required,
          Validators.pattern(regExps.password)
        ]],
        confirmPassword: ['', Validators.required]
      }, { validator: CustomValidators.childrenEqual })
    });
  }


  signIn() {
    this.authenticationService.signIn(this.model.user)
      .subscribe((response: any) => {
        if (response.isAuthenticated) {
          this.model.user.isAuthenticated = true;
          $('#loginModal').modal('hide');
          // $('#btnSignIn').hide();
          // $('#iSetting').show();
        } else {
          this.model.user.isAuthenticated = false;
          this.model.user.errorMessage = "Eror";
        }
      },
      (error) => {
        this.model.user.isAuthenticated = false;
        this.model.user.errorMessage = "Eror";
      },
      () => {
        //Task completed.
        //navigate to other route.
      }
      );
  }

  register() {
    this.commonService.isBusy = true;
    this.authenticationService.register(this.model.user)
      .subscribe((response: any) => {
        console.log(response);
        if (!response.hasError) {
          $('#loginModal').modal('hide');
          this.toastr.success('Profile saved !');
        }else{
          var errors=[];
          for(var index in response.brokenRules) {
            errors.push(response.brokenRules[index]);
          }
          this.toastr.warning(errors.join(' '));
        }
      },
      (error) => {
        this.toastr.error('Error !');
      },
      () => {
        //Task completed.
        //navigate to other route.
        this.commonService.isBusy = false;
        
      }
      );
  }
}
