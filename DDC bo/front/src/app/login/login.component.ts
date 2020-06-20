import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { SpinnerService } from '../shared/services/spinner.service';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(public authService: AuthService , private spinnerService : SpinnerService , private router : Router,
              private notificationService : NotificationService ) {}


  onLogin(form: NgForm) {
    this.spinnerService.activate();
    this.authService.login(form.value.email, form.value.password).subscribe(
      response => {
        const token = response.token;
        this.authService.setToken(token)  ;
        this.authService.setIsAuthenticated(true);
        const expiresInDuration = 60 * 60 * 10;
        this.authService.setAuthTimer(expiresInDuration);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.authService.saveAuthData(token, expirationDate );
        this.router.navigate(["/home"]);
        this.notificationService.openSnackBar('Vous êtes connecté' , 'green-snackbar')
        this.spinnerService.deactivate();
      },
      err => {
        this.spinnerService.deactivate();
        this.notificationService.openSnackBar('Vérifiez votre nom d\'utilisateur et votre mot de passe\n' , 'red-snackbar')
      });
  }

}
