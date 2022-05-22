/*
Lista de cadastro de alunos 
prcorrer a lista : 
- percorrer a lista de 0 ate o numero de alunos
- se o numero for pas, escreva par e numero correspondente
- se o numero for impar, escreva impar e o numero correspondent
- se o numero for 0, escreva Zero
*/

let numeroDeAlunos = 10

for (let contador = 0; contador < numeroDeAlunos; contador++) {
    if (contador == 0 ) {
        console.log("O numero atual e zero")        
    } else if (contador %2 == 0 ) {
        console.log(`O numero ${contador} e PAR`)        
    } else {
        console.log(`O numero ${contador} e IMPAR`)
    }    
}