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
        this.fecha_nacimiento = new Date(fecha_nacimiento);
        this.domicilio = domicilio;
        this.rfc = rfc;
    }

    getFullName() {
        return `${this.nombre} ${this.apellidos}`
    }

    getFormatBirthDate() {
        var months:String[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        var days:String[] = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        var diaNombre:String = days[this.fecha_nacimiento.getDay()];
        var dia:Number = this.fecha_nacimiento.getDate();
        var mes:String = months[this.fecha_nacimiento.getMonth()];
        var year:Number = this.fecha_nacimiento.getFullYear();
        return `${diaNombre} ${dia} de ${mes} de ${year}`;
    }

    getDateForInput() {
        var d:Date = this.fecha_nacimiento;
        var month:String = (d.getMonth() <= 8 ? '0' : '') + (d.getMonth() + 1);
        var day:String = (d.getDate() <= 9 ? '0' : '') + d.getDate();
        return `${d.getFullYear()}-${month}-${day}`;
    }
}