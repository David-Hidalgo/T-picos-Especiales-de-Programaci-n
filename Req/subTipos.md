# Tipos de funciones
## subfunción
teniendo 2 funciones definidas `f` <: `g`;
`f` subTipo de `g`


```ts
function f(a:A):B {

   return b:B
}
```
y
```ts
function g(ab:Ab):Bp {

   return bp:Bp
}
```
donde `Ab<:A` y `B<:Bp`

<u>r ⊢A'<:A && r ⊢B<:B'</u> <br> 
r ⊢f<:g y <br>
r ⊢A->B <: A'->B'

contravariente = de subtipo a supertipo
<br>invariante = mismo tipo = reflexiva
<br>covariante = de supertipo a subtipo  
   
De `g` a `f`

`Ab` invariante/contravariante   `A`  
`B` invariante/covariante        `Bp`


```ts
function g(a:Ab):Bp {
   function f(a:A):B {   
      return b:B
   }
   return b:Bp
}
```

donde encuentre la función g yo la puedo sustituir por la funcion f

⫭r⊢a'◁▷▻▾▹⊳⊲⊳⊦→
r ⊢ a'<: ◁▷▻▾▹⊳⊲⊳⊦→

## funciones de orden superior

funciones en funciones ya sea que pida o devuelva función

teniendo en cuenta
```ts
function f(x:number):number

```
y
```ts
function f(x():number->string):void->boolean
```
igual que en matemáticas fºg=f(g)
### ejecicio
---
<u>r ⊢ S'<:T && U<:V</u><br>
¿T->(T->U) <: S->(S->V)?<br>
¿f<:g?<br>
S<:T && (T->U) <:(S->V)<br>
√ && S<:T && U<:V<br>
√ && √ && √

---
<u>r ⊢ A<:B<:C && O<:P<:Q && W<:Z</u><br>
```Swift
f:  (Z->(C->O)) X (C->(Q->(B->Z))) -> (W->B)<br>
f': (Z->(B->P)) X (A->(P->(A->W))) -> (Z->A)<br>
```
¿f'<:f?<br>
```Swift
(Z->(C->O)) X (C->(Q->(B->Z))) <: (Z->(B->P)) X (A->(P->(A->W)))  && (W->B) <: (Z->A)
RELLENA                                                           && (W<:Z) && (A<:B)
                                                                  && √ && √
                                                                  && √
(Z->(C->O)) <: (Z->(B->P)) && (C->(Q->(B->Z))) <: (A->(P->(A->W)))&& √
(Z->(C->O)) <: (Z->(B->P)) && RELLENA                             && √
Z=Z && (C->O) <: (B->P)    && RELLENA                             && √
√  && (B<:C) && (O<:P)
√  && √     && √           && (C->(Q->(B->Z))) <: (A->(P->(A->W)))&& √
√                          &&A<:C && (Q->(B->Z)) <: (P->(A->W))   && √
√                                 && (P<:Q)  && (B->Z) <: (A->W)  && √
√                                            && (A<:B) && (Z<:W)  && √
√                                                      && (Z<:W)  && √
√                                                      && ⊗      && √
⊗
```