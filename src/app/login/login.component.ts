import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from '../rest.service'; // ✅ import service

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  isAuthenticated = false;
  loginFailed = false;
  users: any[] = []; // ✅ will hold data from users.json

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private restService: RestService // ✅ inject RestService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    // ✅ fetch users from JSON
    this.restService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onLogin() {
    this.submitted = true;
    this.loginFailed = false;

    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    this.isAuthenticated = this.users.some(
      user =>
        user.username === username.trim() &&
        user.password === password.trim()
    );

    if (this.isAuthenticated) {
      alert('Login Successful!');
      this.router.navigate(['/book-ride']);
    } else {
      this.loginFailed = true;
    }
  }
}
