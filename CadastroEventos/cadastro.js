/*
Situacao problema:
-Se o participante for maior de 18 anos, permitir o cadastro; senão, alertar que o cadastro não é permitido pela idade.
-Listar participantes e palestrantes por evento.
-Enquanto a quantidade de participantes for inferior a 100, permitir cadastro; senão, alertar que o cadastro não será permitido por ter excedido o limite.
-Criar fluxograma com todos os requisitos que devem ser atendidos pelo sistema.

Notas ao avaliador :
O numero maximo e participates foi reduzido para 5 para facilitar a correcao do exercicio
Assumi que os palestrantes se incluem no numero total de palestrantes
O meu fluxograma origial tem um menu, para simplificar eu nao coloquei um meno e sim um "auto teste" para facilitar a correcao
*/ 

//lista de eventos
listaEventos =  []
//cosntantes
const maxPessoasCadastradas = 5
const idadeMinima = 18

//funcoes auxiliares
//fornece a data de hoje 
function dataDeHoje() {
    var hoje = new Date();
    var dd = String(hoje.getDate()).padStart(2, '0');
    var mm = String(hoje.getMonth() + 1).padStart(2, '0');
    var yyyy = hoje.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
}


//cria um evento desde que a data seja maior que a de hoje e o evento noa tenha o mesmo nome que outro 
function  criarEvento(nomeEvento,dataEvento)  {
    let hoje = dataDeHoje()
    let hojePorCampo = hoje.split("/")
    let dataPorCampo = dataEvento.split("/");
    let dataValida=1
    //checca a data do evento 
    if (dataPorCampo[2]<hojePorCampo[2]){ //checa se o ano eh menor ou igual
        dataValida=0
    }
    else if (dataPorCampo[2]==hojePorCampo[2]){//mesmo ano
        if (dataPorCampo[1]<hojePorCampo[1]){ //checa se o mes eh menor ou igual 
            dataValida=0
        }
        else if (dataPorCampo[1]=hojePorCampo[1]){ // mesmo mes 
            if (dataPorCampo[0]<=hojePorCampo[0]){  //checa se o dia eh menor 
                dataValida=0
            }
        }
    }
    if (dataValida == 0){
        console.log(`Nao foi possivel criar evento ${nomeEvento} em ${dataEvento} pois a data nao eh menor que a de hoje(${hoje})`)
        return 
    }
    //checa se o evento ja existe 
    for (var i = 0; i < listaEventos.length; i++) {
        if ( listaEventos[i].nomeEvento == nomeEvento){
            console.log(`Nao foi possivel criar evento ${nomeEvento} pois ja existe um evento com esse nome`)
            return
        }
    } 
    //cria evento 
    let evento = {
        nomeEvento : nomeEvento,
        dataEvento : dataEvento,
        listaParticipantes : [],
        listaPalestrantes : []
    }
    listaEventos.push(evento)
    console.log("Criado evento : '" + evento.nomeEvento + "' em " + evento.dataEvento);
}

//adiciona  uma pessoa a um evento desde que o nome do evento exista e  a pessoa  tenha idade maior ou igual a 18 anos 
function adicionarPessoa( cadastrar,nomeEvento)  {
    //checa idade
    let identacao="    "
    if(cadastrar.Idade <= idadeMinima ){
        console.log(`${identacao}Nao foi possivel cadastrar ${cadastrar.Nome} pois o participante eh menor de idade`)
        return
    }  
    //checa se o evento existe
    for (var i = 0; i < listaEventos.length; i++) {
        if ( listaEventos[i].nomeEvento == nomeEvento){
            //checa se a quantidade de participantes eh menor do que 100
            if (( listaEventos[i].listaPalestrantes.length +  listaEventos[i].listaParticipantes.length ) < maxPessoasCadastradas ){
                if (cadastrar.Palestrante == "sim"){
                    listaEventos[i].listaPalestrantes.push(cadastrar)
                    console.log(`${identacao}Palestrante ${cadastrar.Nome}  cadastrado em evento ${nomeEvento}`)
                }else{
                    listaEventos[i].listaParticipantes.push(cadastrar)  
                    console.log(`${identacao}Participante ${cadastrar.Nome}  cadastrado em evento ${nomeEvento}`)
                }
                return
            }else{
                console.log(`Nao foi possivel cadastrar ${cadastrar.Nome} pois evento:"${nomeEvento}" ja tem ${maxPessoasCadastradas} pessoas cadastradas`)
                return
            }
        }
    }  

    console.log(`Nao foi possivel cadastrar ${cadastrar.Nome} pois evento:"${nomeEvento}" nao existe`)
    return          
}

//imprime todos os eventos palestrantes e participantes 
function  imprimirEventos ()  {
    for (var i = 0; i < listaEventos.length; i++) {
        console.log("Evento : '" + listaEventos[i].nomeEvento + "' em " + listaEventos[i].dataEvento);
        console.log(" Palestrantes:")
        for (var j = 0; j < listaEventos[i].listaPalestrantes.length; j++) {
            console.log(listaEventos[i].listaPalestrantes[j])
        }
        console.log(" Participantes:")
        for (var k = 0; k < listaEventos[i].listaParticipantes.length; k++) {
            console.log(listaEventos[i].listaParticipantes[k])
        }
    }          
}

//forcece um dia aleatorio a partir de um ano base, o dia fornecido pode nao existir de fato no calendario 
function diaAleatorio(anoBase) {
    diaX = Math.floor(Math.random() * 31)
    mesX = Math.floor(Math.random() * 12)
    anoX = Math.floor(Math.random() * 10)+anoBase
    dataEvento  = diaX + '/' + mesX + '/' + anoX;
    return dataEvento
}




hoje = dataDeHoje()
console.log(`Hoje eh : ${hoje}, iniciando cadastros`)

console.log(`Cadastrando eventos validos:`)
//criando eventos validos em datas validas(nem tao validas assim ja que nao valida se os dias de cada mes existem)
//cria dias aleatorios  a partir de 2023 para garantir q as datas sao sempre posteriores
let nomesEventos = ["Simposio de cerveja","Palestra importante","Congresso de Programacao"]
for (var i = 0; i < nomesEventos.length; i++) {
    criarEvento(nomesEventos[i],diaAleatorio(2023))
}

console.log(`Cadastrando eventos INVALIDOS:`)
//cadastrante eventos invalidos  que ja existem
for (var i = 0; i < nomesEventos.length; i++) {
    criarEvento(nomesEventos[i],diaAleatorio(2023))
}
//cadastrando eventos no passado ou hoje 
criarEvento("Evento no pasado",diaAleatorio(2000))
criarEvento("Evento hoje",hoje)


//Cadastrando algumas pessoas nos eventos   com nome e sobrenome  
let nomesPessoas = ["Augusto","Joao","Jose","Maria","Antonio","Jim","Pamela","Creed","Michael","Angela","Angelina"]
let sobreNomesPessoas = ["da Silva","da Costa","Fernandes","da Penha","Figueiredo","Gusmao","Goes","Musk","Ribas","Queiroz","da Costa e Silva"]
let palestranteSN = ["sim","nao"]


console.log(`Cadastrando pessoas aleatorias em cada evento`)
//cadastra pesssoas aleatorias em cada evento ,  minimo 2 pessoas por evento
//pessoas podem ser  maiores ou menores de 18 anos 
for (var i = 0; i < nomesEventos.length; i++) {
    let maxNumPessoas = nomesPessoas.length;
    let numPessoas  = Math.floor(Math.random() * maxNumPessoas) +2
    console.log(`Cadastrando ${numPessoas} pessoas em evento ${nomesEventos[i]}`)

    for (var j = 0; j < numPessoas; j++) {
        let cadastrar = {
            Nome: nomesPessoas[Math.floor(Math.random() * maxNumPessoas)] +" "+sobreNomesPessoas[Math.floor(Math.random() * maxNumPessoas)],
            Idade : Math.floor(Math.random() * 70),
            Palestrante : palestranteSN[Math.floor(Math.random() * 2)]
        } 
        adicionarPessoa(cadastrar,nomesEventos[i])
    }
}

//somente eventos validos com participantes acima de 60 anos 
console.log("Imprimindo eventos e participantes")
console.log("Todos os eventos sao posteriores a hoje e os participantes sao maiores de 18 anos ")
imprimirEventos()














