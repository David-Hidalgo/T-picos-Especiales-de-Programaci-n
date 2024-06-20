import { Optional } from '../Genéricos y TiposFuncionales/Opcional';
import { Either } from '../Programación orientada a aspectos/Either';

class Item {
	price:number
	
	constructor(price:number) {
	this.price=price
	}
}
class Cliente {
	public teléfono?: string;
	protected dirección: string;
	protected códigoPostal: string;
	public status: boolean;
	protected país: string;

	constructor(dir: string, bol: boolean, postCode: string, pais: string, tlfn?: string) {
		this.teléfono = tlfn;
		this.dirección = dir;
		this.status = bol;
		this.códigoPostal = postCode;
		this.país = pais
	}
}
class OrdenDeCompra {
	comprador: Cliente;
	orden: Array<Item>;
	constructor(comprador: Cliente, pedido: Array<Item>) {
		this.orden = pedido;
		this.comprador = comprador;
	}
	public validate(OrdenDeCompra: OrdenDeCompra): Either<Error[], void> {
		let ar: void;
		const a = Either.crearRight<Error[], void>(ar);
		return a;
	}
}

abstract class Validador<TValidar> {
	errores?: Either<Array<Error>, void>;

	protected constructor() {
	}

	/**
	 * protected
	 */
	protected Devolución(errores: Array<Error>){ 
		if (errores.length!=0){
			this.errores = Either.CrearLeft(errores)
		}else{
			let ar: void;
			this.errores = Either.crearRight<Error[], void>(ar);
		}
		;
	}

	public abstract validate(aValidar: TValidar): Either<Error[], void>;
}

class ValidadorOrdenDeCompra<TValidar extends OrdenDeCompra> extends Validador<OrdenDeCompra>{

	private constructor() {
		super()
	}
	
	/**
	 * validate
	 */
	public validate(aValidar: TValidar): Either<Error[], void>{
		let errores: Array<Error> = new Array<Error>();
		if (aValidar==undefined) {
			errores.push(new Error("La orden no puede ser nula"));
		}else{
			let validador: ValidadorClientes<Cliente> = new ValidadorClientes<Cliente>();
			let opcional: Either<Error[], void> = validador.validate(aValidar.comprador);
			if (opcional.isLeft()) {
				errores= errores.concat(opcional.valorLeft);
			}
		}
		if (aValidar.comprador==undefined) {
			errores.push(new Error("El comprador no puede ser nulo"));
		}else{
			let validador: ValidadorClientes<Cliente> = new ValidadorClientes();
			let opcional: Either<Error[], void> = validador.validate(aValidar.comprador);
			if (opcional.isLeft()) {
				errores= errores.concat(opcional.valorLeft);
			}
		}
		if (aValidar.orden==undefined) {
			errores.push(new Error("La orden no puede ser nula"));
		}
		return Either.CrearLeft(errores);
	}
}
class ValidadorClientes<TValidar extends Cliente> extends Validador<Cliente>{

	public constructor() {
		super()
	}

	private validateTlfn(a: string):Optional<Error> {
		let opcional: Optional<Error>
		if (a.length == 10) {
			const operador: string = a.slice(0, 2);

			const resto: string = a.slice(3, 9);
			opcional = new Optional();
		} else {
			opcional = new Optional(new Error("El teléfono no tiene 9 dígitos"));
		}
		return opcional;
	}

	/**
	 * validate
	 */
	public validate(aValidar: TValidar): Either<Error[], void>{
		let errores: Array<Error> = new Array<Error>();
		if (aValidar==undefined) {
			errores.push(new Error("El cliente no puede ser nulo"));
		}
		if (aValidar.teléfono==undefined) {
			errores.push(new Error("El teléfono no puede ser nulo"));
		}else{
			let opcional: Optional<Error> = this.validateTlfn(aValidar.teléfono);
			if (opcional.hasValue==true) {
				errores.push(opcional.value);
			}
		}
		if (aValidar.status==false) {
			errores.push(new Error("La dirección no puede ser nula"));
		}
		return this.Devolución(errores);
	}
}
interface ValidateI {
	/**
	 * validate
	 */
	validate(OrdenDeCompra: OrdenDeCompra): Either<Error[], void>
} 
