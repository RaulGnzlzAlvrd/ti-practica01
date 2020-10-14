export class Usuario {
    id:number;
    usuario:String;
    password:String;
    tipo_usuario:number;

    constructor(id, usuario, password, tipo_usuario) {
        this.id = id;
        this.usuario = usuario;
        this.password = password;
        this.tipo_usuario = tipo_usuario;
    }
}