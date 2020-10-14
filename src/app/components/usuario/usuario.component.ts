import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/_models/usuario';
import { UsuarioService } from 'src/app/_services/usuario.service';

declare var $:any;

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios:Usuario[] | any;
  usuario:Usuario | any;
  usuarioForm:FormGroup;
  submitted = false;
  formStatus = "registrar";

  constructor(private usuarioService:UsuarioService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      id: [''],
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      tipo_usuario: ['', Validators.required]
    });

    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarios = [];
    this.usuarioService.getUsuarios().subscribe(
      res => {
        this.usuarios = res;
        this.usuarios = this.usuarios.map(u => new Usuario(u.id, u.usuario, u.password, u.tipo_usuario));
        console.log(this.usuarios);
      },
      err => {
        console.log(err);
      }
    );
  }

  createUsuario() {
    this.submitted = true;
    if(this.usuarioForm.invalid) {
      console.log("Formulario inválido");
      return;
    }
    this.usuarioService.createUsuario(this.usuarioForm.value).subscribe(
      res => {
        this.getUsuarios();
        $("#formularioUsuarioModal").modal("hide");
      },
      err => {
        console.log(err);
      }
    );
  }

  updateUsuario() {
    this.submitted = true;
    if(this.usuarioForm.invalid) {
      console.log("Formulario inválido");
      return;
    }
    this.usuarioService.updateUsuario(this.usuarioForm.value).subscribe(
      res => {
        this.getUsuarios();
        $('#formularioUsuarioModal').modal("hide");
      },
      err => {
        console.log();
      }
    );

  }

  deleteUsuario(id:number) {
    this.usuarioService.deleteUsuario(id).subscribe(
      res => {
        this.getUsuarios();
      },
      err => {
        console.log(err);
      }
    );
  }

  openModalRegister() {
    this.usuarioForm.reset();
    this.submitted = false;
    this.formStatus = "registrar";
    $("#formularioUsuarioModal").modal("show");
  }

  openModalUpdate(usuario:Usuario) {
    this.usuarioForm.setValue({
      id: usuario.id,
      usuario: usuario.usuario,
      password: usuario.password,
      tipo_usuario: usuario.tipo_usuario
    });
    this.formStatus = "actualizar";
    this.submitted = false;
    $("#formularioUsuarioModal").modal("show");
  }

  get f() {
    return this.usuarioForm.controls;
  }

  submitForm() {
    if(this.formStatus == "registrar") {
      this.createUsuario();
    } else {
      this.updateUsuario();
    }
  }
}
