listaEventos =  []

function dataDeHoje() {
    var hoje = new Date();
    var dd = String(hoje.getDate()).padStart(2, '0');
    var mm = String(hoje.getMonth() + 1).padStart(2, '0');
    var yyyy = hoje.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
}


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

function adicionarPessoa( cadastrar,nomeEvento)  {
    //checa idade
    let identacao="    "
    if(cadastrar.Idade < 18 ){
        console.log(`${identacao}Nao foi possivel cadastrar ${cadastrar.Nome} pois o participante eh menor de idade`)
        return
    }  
    //checa se o evento existe
    for (var i = 0; i < listaEventos.length; i++) {
        if ( listaEventos[i].nomeEvento == nomeEvento){
            if (cadastrar.Palestrante == "sim"){
                listaEventos[i].listaPalestrantes.push(cadastrar)
                console.log(`${identacao}Palestrante ${cadastrar.Nome}  cadastrado em evento ${nomeEvento}`)
            }else{
                listaEventos[i].listaParticipantes.push(cadastrar)  
                console.log(`${identacao}Participante ${cadastrar.Nome}  cadastrado em evento ${nomeEvento}`)
            }
            return
        }
    }  

    console.log(`Nao foi possivel cadastrar ${cadastrar.Nome} pois evento:"${nomeEvento}" nao existe`)
    return          
}

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














