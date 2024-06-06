class Item {
	constructor() {

	}
}
class Cliente {
	protected teléfono?: string;
	protected dirección: string;
	protected códigoPostal: string;
	protected status: boolean;
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

abstract class Validador {


	protected constructor(errores: Array<Error>){ 
		if (errores.length!=0){
			Either.CrearLeft(errores)
		}else{
			let ar: void;
			const a = Either.crearRight<Error[], void>(ar);
		}
	}

	public abstract validate<TValidar>(aValidar: TValidar): Either<Error[], void>;
}

class ValidadorOrdenDeCompra extends Validador{

	private constructor(errores: Array<Error>) {
		super(errores)
	}

	private validateTlfn(a: string) {
		if (a.length == 10) {
			const operador: string = a.slice(0, 2);

			const resto: string = a.slice(3, 9);
		} else {
			return new Error("El teléfono no tiene 9 dígitos");
		}
	}

	/**
	 * validate
	 */
	public validate<TValidar>(aValidar: TValidar): Either<Error[], void>;

}


import { Either } from './Req/Programación orientada a aspectos/Either';
interface ValidateI {
	/**
	 * validate
	 */
	validate(OrdenDeCompra: OrdenDeCompra): Either<Error[], void>
} 
