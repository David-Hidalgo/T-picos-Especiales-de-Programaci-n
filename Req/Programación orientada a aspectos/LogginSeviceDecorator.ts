import { Either } from './Either';

//  interface IServiciosNOSEPUEDE<TServicio, _RService> {

// 	/**
// 	 * Ejecuta interfáz genérica de Servicios
// 	 */
// 	cosa(a: number): number;
// 	Execute(entrada: TServicio): number{
// 	return 1
// }
// }

interface IService<TServicio, RService> {

	/**
	 * Ejecuta interfáz genérica de Servicios
	 */
	Execute(entrada:TServicio): Either<Error[],RService>;
}

type CreateOrderParams={
	a:string
	
}
type DeleateOrderParams={
	idOrder:string

}

class CreateOrder implements IService<CreateOrderParams,void> {
	constructor() {
		
	}
	public Execute(_entrada: CreateOrderParams): Either<Error[], void> {
		const a = new Error("arguments");
		return  Either.CrearLeft([a]);
	}
}
class DeleateOrder implements IService<DeleateOrderParams,void> {
	constructor() {
		
	}
	public Execute(_entrada: DeleateOrderParams): Either<Error[], void> {
		const a = new Error("arguments");
		return  Either.CrearLeft([a]);
	}
}

class Logger {
	constructor() {
	}
	log(a:any){
		console.log(a);
	}
}

class LogginServiceDecorator<TService, RService> implements IService<TService, RService> {
	private readonly service: IService<TService, RService>
	private readonly logger: Logger
	constructor(servicio: IService<TService, RService>, loggeador: Logger) {
		this.service=servicio
		this.logger=loggeador
	}
	public Execute(_entrada: TService): Either<Error[], RService> {
		let r = this.service.Execute(_entrada);
		if (r.isLeft()) {
			this.logger.log(r.valorLeft);
			return r;
			}
		return r;
	}
}