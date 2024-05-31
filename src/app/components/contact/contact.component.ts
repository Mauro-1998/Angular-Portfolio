import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { ContactService } from 'src/app/service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  showClass: boolean = false;
  contactForm: FormGroup;
  sentMessage: string = '';
  errorMessage: string = '';

  constructor(private contactService: ContactService, private fb: FormBuilder) { 
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const delay = timer(300);
    delay.subscribe(() => {
      this.showClass = true;
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.contactService.sendContactForm(this.contactForm.value).subscribe(
      response => {
        this.sentMessage = response;
        this.errorMessage = '';
      },
      error => {
        this.errorMessage = error.error;
        this.sentMessage = '';
      }
    );
  }
}
