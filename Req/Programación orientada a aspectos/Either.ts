import { Optional } from "./../Genéricos y TiposFuncionales/Opcional";

class EitherA<TL,TR> {
    private dato:TL|TR;
    constructor(entrada:TL|TR) {
        this.dato= entrada
    }
    /**
     * Prueba
     */
    public TipoDeDato() {
        let a:string = typeof this.dato
        console.log(a);
    }

}
class EitherB<TL,TR> {
    private dato?:TL|TR;
    private contiene:number
    public constructor(entradaL?:TL,entradaR?:TR) {
            if (entradaL==undefined) {
                this.dato=entradaL
                this.contiene=0
            } else{ if (entradaR===undefined) {
                this.dato=entradaR
                this.contiene=1
                
                }else this.contiene=2
            }
        }
    /**
     * Prueba
     */
    public TipoDeDato() {
        if (this.contiene==2){
            throw new Error("NO HAY");
        }
        let a:string = typeof this.dato
        console.log(a);
    }

    public isLeft(  ):boolean{
        if (this.contiene==0) {
            return  true
        }else return false
    }
    public isRight(  ):boolean{
        if (this.contiene==1) {
            return  true
        }else return false
    }
    
    public get valor() : TL|TR {
        if (this.contiene==0) {
            return this.dato as TL
        }else{
            if (this.contiene==1) {
            return this.dato as TR
            }
        }
        throw new Error("NO HAY NADA DENTRO");
    }
    

}
let a:string
let b:number

const queso = new EitherB<string,number>("queso");

queso.TipoDeDato()
if (queso.isLeft()) {
    console.log(queso.valor);
}