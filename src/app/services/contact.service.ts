import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private firestore: Firestore) {}

  addTestMessage() {
    const col = collection(this.firestore, 'messages');
    return addDoc(col, {
      name: 'Mr Jeet',
      email: 'test@example.com',
      message: 'Hello from Angular 20 + Firebase!',
      createdAt: new Date()
    });
  }
}
