import { Component, OnInit } from '@angular/core';
import { UserProfile, Personal } from '../../services/models/secure.user.profile';
import { SecureAccountsService } from '../../services/secure.account.service';
import { AuthenticationService } from '../../../../common/services/authenticationService';
import { ECWCommonService } from '../../../../common/services/ecw.common.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

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

@Component({
  selector: 'app-secure-profile-update',
  templateUrl: './secure.profile.update.component.html',
  styleUrls: ['./secure.profile.update.component.css']
})
export class SecureProfileUpdateComponent implements OnInit {

  public model: UserProfile;
  userRegistrationForm: FormGroup;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;
  constructor(private secureAccountsService: SecureAccountsService,
    private authenticationService: AuthenticationService,
    private commonService: ECWCommonService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) {
    this.createForm();


    this.model = <UserProfile>{
      userName: this.authenticationService.user.userName
    };
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
  ngOnInit() {

  }
  click(){
    console.log(this.userRegistrationForm);
  }
  onSubmit() {
    console.log(this.model);
    this.commonService.isBusy = true;
    this.secureAccountsService.updateUserProfile(this.model).subscribe(
      (response) => {
        //proccess response
        console.log(response);
      },
      (error) => {
        //error occured
        console.log(error);
      },
      () => {
        //task completed
        this.commonService.isBusy = false;
        this.toastr.success('Profile saved !');
        console.log('success');
      },
    );
  }
}
