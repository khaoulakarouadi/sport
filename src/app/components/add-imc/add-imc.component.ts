import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImcService } from 'src/app/services/imc.service';

@Component({
  selector: 'app-add-imc',
  templateUrl: './add-imc.component.html',
  styleUrls: ['./add-imc.component.css']
})
export class AddImcComponent implements OnInit {
  imcForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private imcService: ImcService) { }

  ngOnInit() {
    this.imcForm = this.formBuilder.group({
      name: ["", [Validators.required,]],
      taille: ["", [Validators.required,]],
      poids: ["", [Validators.required,]],
    })
  }

  addImc() {

  }


}
