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
        this.personas = this.personas.map(p => new Persona(p.id, p.nombre, p.apellidos, p.fecha_nacimiento, p.domicilio, p.rfc));
        console.log(this.personas)
      },
      err => console.error(err)
    );
  }

  // Consultar una persona
  getPersona(id){
    this.persona = null;
    this.personaService.getPersona(id).subscribe(
      res => {
        this.persona = res;
        this.persona = new Persona(
          this.persona.id, 
          this.persona.nombre, 
          this.persona.apellidos, 
          this.persona.fecha_nacimiento, 
          this.persona.domicilio, 
          this.persona.rfc
        );
      },
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
      fecha_nacimiento: persona.getDateForInput(),
      domicilio: persona.domicilio,
      rfc: persona.rfc
    });
    $("#updatePersonaModal").modal("show");
  }
}
