export class Persona {
    id:number;
    nombre:string;
    apellidos:string;
    fecha_nacimiento:Date;
    domicilio:string;
    rfc:string;

    constructor(id, nombre, apellidos, fecha_nacimiento, domicilio, rfc) {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.fecha_nacimiento = fecha_nacimiento;
        this.domicilio = domicilio;
        this.rfc = rfc;
    }
}