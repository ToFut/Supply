import {Inject, Injectable} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Injectable()
export class ReturnProductsService {

  constructor(public dialogRef: MatDialogRef<ReturnProductsService>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
