import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { seatValidator } from './seat-validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer-ride',
  templateUrl: './offerride.component.html',
  styleUrls: ['./offerride.component.css']
})
export class OfferRideComponent implements OnInit {
  rideForm!: FormGroup;
  submitted = false;

  @Output() closeForm = new EventEmitter<void>(); // 👈 for parent component

  constructor(private fb: FormBuilder ,private router: Router) {}

  ngOnInit(): void {
    this.rideForm = this.fb.group({
      name: ['', Validators.required],
      startLocation: ['', Validators.required],
      destination: ['', Validators.required],
      car: ['', Validators.required],
      seatsAvailable: ['', [Validators.required, seatValidator]]
    });
  }

  get f() {
    return this.rideForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.rideForm.invalid) return;

    alert('🚗 Ride Offered Successfully!');
    this.rideForm.reset();
    this.submitted = false;
    this.closeForm.emit(); // ✅ go back after submit
  }

  goBack() {
  this.router.navigate(['/book-ride']);
}

}
