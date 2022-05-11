
let listaDePecas =  ["Filtro de Ar","Motor","Disco de Freio"]


//cada caixa deve ter um limite de 10 pecas

//nome da peca dve possuir 3 ou mais caracteres

if (listaDePecas.length < 10) {
    console.log("E possivel cadastrar mais pecas")
}else{
    console.log("Nao e possivel cadastrar mais pecas")
}

let peso = 50

if (peso < 100 ) {
    console.log("A peca deve pesar no minimo 100g")
}else {
    console.log("A peca possui o peso adequado")
}

let nomeDaPeca = "Disco de Freio"
if (nomeDaPeca.length <3 ) {
    console.log("O nome da peca precisa ter ao menos 3 caracteres")
} else {
    console.log("O nome da peca esta adequado")

}