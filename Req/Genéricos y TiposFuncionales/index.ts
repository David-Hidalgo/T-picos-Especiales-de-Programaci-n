console.log("Hello via Bun!");

class Box<T> {
	#inicial: T;
	constructor(contenido: T) {
		this.#inicial = contenido;
	}

	public get contenido(): T {
		return this.#inicial;
	}
}

const name = new Box(1);
console.log(name.contenido);

let b: boolean;
// MARK: generico ejercicio

function all<T>(contenedor: T[], pred: (a: T) => boolean): boolean {
	for (let i = 0; i < contenedor.length; i++) {
		if (!pred(contenedor[i])) {
			return false;
		}
	}
	return true;
}

function first<T>(contenedor: T[], pred: (a: T) => boolean): T | void {
	contenedor.forEach((element) => {
		if (pred(element)) {
			return element;
		}
	});
}

import { Optional } from "./Opcional";

//MARK: Ejercicio
abstract class Component<T> {
	value: T;
	constructor(v: T) {
		this.value = v;
	}
	abstract count(predicate: (e: T) => boolean): number;
	abstract first(predicate: (e: T) => boolean): Optional<T>;
}
class Leaf<T> extends Component<T> {
	count(predicate: (e: T) => boolean): number {
		//MARK: Contar Hoja
		if (predicate(this.value)) {
			return 1;
		}
		return 0;
	}
	first(predicate: (e: T) => boolean): Optional<T> {
		//MARK: Primero Hoja
		let opcional: Optional<T>;
		if (predicate(this.value)) {
			opcional = new Optional(this.value);
		} else {
			opcional = new Optional<T>();
		}
		return opcional;
	}
}
class Composite<T> extends Component<T> {
	components: Component<T>[];
	constructor(v: T) {
		super(v);
		this.components = [];
	}
	add(e: Component<T>) {
		this.components.push(e);
	}
	count(predicate: (e: T) => boolean): number {
		//MARK: Contar Componente
		let cuantos: number = 0;
		if (predicate(this.value)) {
			cuantos++;
		}
		for (let i = 0; i < this.components.length; i++) {
			cuantos = + this.components[i].count(predicate);
		}
		return cuantos;
	}

	first(predicate: (e: T) => boolean): Optional<T> {
		//MARK: Primero Componente
		if (new Optional(this.value).hasValue) {
			if (predicate(this.value)) {
				return new Optional(this.value);
			}
			this.components.forEach((element) => {
				let op = element.first(predicate);
				if (op.hasValue) {
					return new Optional(element);
				}
			});
		}
		return new Optional<T>();
	}
}

const composite = new Composite<number>(3);