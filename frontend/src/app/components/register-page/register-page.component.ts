import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from '../../api-services';
import { MatchValidator } from './match.validator';

@Component({
  selector: 'register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {
  public form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private apiService: UserApiService
  ) {
    this.form = formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          ],
        ],
        password: ['', [Validators.required]],
        passwordRepeat: ['', Validators.required],
      },
      {
        validator: MatchValidator('password', 'passwordRepeat'),
      }
    );
  }

  public async register(): Promise<void> {
    await this.apiService.register(this.form.value);
    this.router.navigate(['/login']);
  }
}
