import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IContactForm } from '../core/models/IContactForm';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;

  name: FormControl = new FormControl(null, [Validators.required, Validators.minLength(6)]);
  email: FormControl = new FormControl(null, [Validators.required, 
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
  message: FormControl = new FormControl(null, [Validators.required]);

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      message: this.message,
    });
  }

  ngOnInit(): void { }

  async onSubmit() {
    if (!this.contactForm.valid) {
      alert('Fields are not valid');
      return;
    }

    this.contactForm.disable();
    const data: IContactForm = this.contactForm.value;
    
  }

}
