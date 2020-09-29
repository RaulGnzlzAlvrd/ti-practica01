import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../_models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  API_URI = 'http://localhost:8080';
  
  constructor(private http:HttpClient) { }

  getPersonas() {
    return this.http.get(this.API_URI + '/persona');
  }

  getPersona(id:number) {
    return this.http.get(this.API_URI + '/persona/' + id);
  }

  createPersona(persona:Persona) {
    return this.http.post(this.API_URI + '/persona', persona);
  }

  updatePersona(persona:Persona) {
    return this.http.put(this.API_URI + '/persona/' + persona.id, persona);
  }

  deletePersona(id:number) {
    return this.http.delete(this.API_URI + '/persona/' + id);
  }
}
