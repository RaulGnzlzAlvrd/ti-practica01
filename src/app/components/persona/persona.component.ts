import { Component, OnInit } from '@angular/core';

import { Persona } from '../../_models/persona';
import { PersonaService } from '../../_services/persona.service';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  personas:Persona[] | any;
  persona:Persona | any;
  personaForm: FormGroup;
  submitted = false;

  constructor(private personaService:PersonaService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    // Inicie el formulario vacío
    this.personaForm = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      domicilio: ['', Validators.required],
      rfc: ['', Validators.required]
    });

    // Consulte lista de personas
    this.getPersonas();
  }

  // Consultar lista de personas
  getPersonas(){
    this.personas = [];
    this.personaService.getPersonas().subscribe(
      res => {
        this.personas = res;
        console.log(this.personas)
      },
      err => console.error(err)
    );
    this.personas = [
      new Persona(11,"Ivan","Saavedra","1992-01-01T00:00:00.000+00:00","Av. Universidad S/N, Coyoacán","SAIV920101"), 
      new Persona(12,"María","Salazar","1974-05-12T00:00:00.000+00:00","Insurgentes Sur 1431, Mixcoac","SAMA740512"), 
      new Persona(13,"Juan","Pérez","1970-08-25T00:00:00.000+00:00","Paseo de la Reforma 4312, Centro", "PEJU501025")
    ];
  }

  // Consultar una persona
  getPersona(id){
    this.persona = null;
    this.personaService.getPersona(id).subscribe(
      res => this.persona = res,
      err => console.error(err)
    )
  }

  // Eliminar una persona
  deletePersona(id){
    this.personaService.deletePersona(id).subscribe(
      res => this.getPersonas(),
      err => console.error(err)
    )
  }

  // Crear una persona
  createPersona(){
    this.submitted = true;

    if(this.personaForm.invalid){
      console.log('Formulario inválido');
      return;
    }

    this.personaService.createPersona(this.personaForm.value).subscribe(
      res => {
        this.getPersonas()
        $("#personaModal").modal("hide");
      },
      err => console.error(err)
    )
  }

  // Actualizar una persona
  updatePersona(){
    this.submitted = true;

    if(this.personaForm.invalid){
      console.log('Formulario inválido');
      return;
    }

    this.personaService.updatePersona(this.personaForm.value).subscribe(
      res => {
        this.getPersonas()
        $("#updatePersonaModal").modal("hide");
      },
      err => console.error(err)
    );
  }

  get f() { 
    return this.personaForm.controls;
  }

  openModalPersona() {
    this.personaForm.reset();
    $("#personaModal").modal("show");
  }

  openModalUpdatePersona(persona:Persona) {
    this.personaForm.setValue({
      id: persona.id,
      nombre: persona.nombre,
      apellidos: persona.apellidos,
      fecha_nacimiento: persona.fecha_nacimiento,
      domicilio: persona.domicilio,
      rfc: persona.rfc
    });
    $("#updatePersonaModal").modal("show");
  }
}
