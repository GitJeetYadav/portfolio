import { Firebase } from '../../services/firebase';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  styleUrl: './contact.scss',
  templateUrl: './contact.html',
  imports: [ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Contact implements OnInit {
  private contact = inject(ContactService);
  contactForm!: FormGroup;
  isFormSubmit = signal(false);

  constructor(
    private fb: FormBuilder,
    private firebaseService: Firebase,
  ) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      message: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
    });
  }


  async test() {
    await this.contact.addTestMessage();
    alert('Message written to Firestore ✅');
    }
  
  async sendMessage() {
    this.isFormSubmit.set(true);
    if (this.contactForm.valid) {
      try {
        console.log('Value are as given',this.contactForm.value)
        await this.firebaseService.sendMessage(this.contactForm.value);
        this.contactForm.reset();
        this.isFormSubmit.set(false);
      } catch (err: any) {
        console.error('Unable to send message: ', err);
      }
    }
  }
}
