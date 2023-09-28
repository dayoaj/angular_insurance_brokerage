import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NgxSpinnerService } from 'ngx-spinner';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppLoginComponent {

  // email: string = '';
  // password: string = '';
  // loginForm = new FormGroup({ email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]), password: new FormControl('', Validators.required) });
  loginForm = new FormGroup({ email: new FormControl('', [Validators.required, Validators.email]), password: new FormControl('', Validators.required) });

  constructor(private auth: AuthService, private spinner: NgxSpinnerService, private router: Router) {

    // this.auth.currentUser.subscribe((user) => {
    //   if (user) {
    //     this.router.navigateByUrl('/', { replaceUrl: true });
    //   }
    // });
    // this.auth.signout();

  }

  async signIn() {
    this.spinner.show();
    console.log(this.loginForm.value);
    const result = await this.auth.signIn(this.loginForm.value.email ?? '', this.loginForm.value.password ?? '');
    this.spinner.hide();

    if (!result.error) {
      this.router.navigateByUrl('/dashboard', { replaceUrl: true });
    } else {
      alert(result.error.message);
    }
  }

  // get email() { return this.loginForm.get('email'); }

  // get password() { return this.loginForm.get('password'); }


}
