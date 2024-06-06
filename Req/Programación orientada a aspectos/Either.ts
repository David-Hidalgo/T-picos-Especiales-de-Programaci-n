import { Optional } from "./../Genéricos y TiposFuncionales/Opcional";

class EitherA<TL, TR> {
	private dato: TL | TR;
	constructor(entrada: TL | TR) {
		this.dato = entrada
	}
	/**
	 * Prueba
	 */
	public TipoDeDato() {
		let a: string = typeof this.dato
		console.log(a);
	}

}
export class Either<TL, TR> {
	private readonly dato?: TL | TR;
	private readonly contiene: number;
	private constructor(entradaL?: TL, entradaR?: TR) {
		if (entradaL != undefined) {
			this.dato = entradaL;
			this.contiene = 0;
		} else {
			if (entradaR != undefined) {
				this.dato = entradaR;
				this.contiene = 1;
			} else this.contiene = 2;
		}
	}
	/**
	 * Prueba
	 */
	public TipoDeDato() {
		if (this.contiene == 2) {
			throw new Error("NO HAY");
		}
		let a: string = typeof this.dato;
		console.log(a);
	}

	public isLeft(): boolean {
		if (this.contiene == 0) {
			return true;
		} else return false;
	}
	public isRight(): boolean {
		if (this.contiene == 1) {
			return true;
		} else return false;
	}

	public get valor(): TL | TR {
		if (this.contiene == 0) {
			return this.dato as TL;
		} else {
			if (this.contiene == 1) {
				return this.dato as TR;
			}
		}
		throw new Error("NO HAY NADA DENTRO");
	}

	/**
	 * CrearLeft
	 */
	public static CrearLeft<TL, TR>(left: TL) {
		return new Either<TL, TR>(left);
	}
	/**
	 * crearRight
	 */
	public static crearRight<TL, TR>(right: TR) {
		return new Either<TL, TR>(undefined, right);
	}
}
let a: string
let b: number
let queso = Either.CrearLeft("Comida");
queso.TipoDeDato()
if (queso.isLeft()) {
	console.log(queso.valor);
}