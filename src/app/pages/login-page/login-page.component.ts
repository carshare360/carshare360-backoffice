import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLoginRequest } from 'src/app/interfaces/AuthLoginRequest.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  constructor(private userService: UserService, private router: Router) {}
  mail: string = '';
  password: string = '';
  errorMessages: string[] = [];
  submitForm() {
    let req: AuthLoginRequest = {
      email: this.mail,
      password: this.password,
    };
    this.userService.authLogin(req).subscribe(
      (res) => {
        console.log('Response:', res);
        if (res.roles == 'admin') {
          this.router.navigate(['/panel']);
        } else {
          this.errorMessages.push('Your account is not authorized!');
        }
      },
      (error) => {
        console.error('Errorr:', error);
        this.errorMessages = error.error.message.map((msg: string) =>
          this.formatErrorMessage(msg)
        );
      }
    );
  }

  formatErrorMessage(errorMessage: string): string {
    const capitalizedErrorMessage = errorMessage.replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
    const formattedErrorMessage = capitalizedErrorMessage.endsWith('.')
      ? capitalizedErrorMessage
      : `${capitalizedErrorMessage}.`;

    return formattedErrorMessage;
  }
}
