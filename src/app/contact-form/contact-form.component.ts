import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IContactForm } from '../core/models/IContactForm';
import { ContactService } from '../core/services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<any> = new Subject<any>();
  
  contactForm: FormGroup;

  name: FormControl = new FormControl(null, [Validators.required, Validators.minLength(6)]);
  email: FormControl = new FormControl(null, [Validators.required, Validators.email]);
  message: FormControl = new FormControl(null, [Validators.required]);

  constructor(private formBuilder: FormBuilder,
    private contactService: ContactService) {
    this.contactForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      message: this.message,
    });
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  async onSubmit() {
    if (!this.contactForm.valid) {
      alert('Fields are not valid');
      return;
    }

    this.contactForm.disable();
    const data: IContactForm = this.contactForm.value;
    this.contactService.addContact(data)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        alert('Saved');
        this.contactForm.enable();
      }, 
      (err: HttpErrorResponse) => {
        alert(err.error.message);
        this.contactForm.enable();
      });
  }

}
