import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdvertisementApiService } from '../../api-services';

@Component({
  selector: 'add-advertisement',
  templateUrl: './add-advertisement.component.html',
  styleUrls: ['./add-advertisement.component.scss'],
})
export class AddAdvertisementComponent {
  public form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private apiService: AdvertisementApiService
  ) {
    this.form = formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(150)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      price: [0, [Validators.required, Validators.min(0)]],
      contact: ['', [Validators.required, Validators.maxLength(255)]],
      address: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  public submit(): void {
    this.apiService
      .add(this.form.value)
      .then((res) => this.router.navigate([`/advertisement/${res.guid}`]));
  }
}
