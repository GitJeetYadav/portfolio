import { Firebase } from '../../services/firebase';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  styleUrl: './contact.scss',
  templateUrl: './contact.html',
  imports: [ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Contact implements OnInit {
  contactForm!: FormGroup;
  isFormSubmit = signal(false);

  constructor(
    private fb: FormBuilder,
    // private firebaseService: Firebase,
  ) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      message: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
    });
  }

  async sendMessage() {
    this.isFormSubmit.set(true);
    if (this.contactForm.valid) {
      try {
        console.log('Value are as given',this.contactForm.value)
        // await this.firebaseService.sendMessage(this.contactForm.value); will implement later
        this.contactForm.reset();
        this.isFormSubmit.set(false);
      } catch (err: any) {
        console.error('Unable to send message: ', err);
      }
    }
  }
}
