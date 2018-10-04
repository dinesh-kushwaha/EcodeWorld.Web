import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatTabsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatGridListModule,
  MatInputModule,
  MatCardModule, MatDialogModule, MatTableModule,
  MatMenuModule, MatProgressSpinnerModule,
  MatRadioModule,MatSelectModule,
  MatNativeDateModule, MatExpansionModule,
  MatProgressBarModule
} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFileUploadModule } from 'angular-material-fileupload';


@NgModule({
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatInputModule,
    MatCardModule, MatDialogModule, MatTableModule,
    MatMenuModule, MatProgressSpinnerModule,
    MatRadioModule,MatSelectModule,MatDatepickerModule,
    MatNativeDateModule,MatFileUploadModule,MatExpansionModule,
    MatProgressBarModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatInputModule,
    MatCardModule, MatDialogModule, MatTableModule,
    MatMenuModule, MatProgressSpinnerModule,
    MatRadioModule,MatSelectModule,MatDatepickerModule,
    MatNativeDateModule,MatFileUploadModule,MatExpansionModule,
    MatProgressBarModule
  ]
})
export class AppMaterialModule { }