/* Manipulação de formulário */

const formulario = document.querySelector("[data-form]")

function getDados(e) {
    e.preventDefault()

    const nome = document.querySelector("[data-nome]").value
    const idade = document.querySelector("[data-idade]").value
    const altura = document.querySelector("[data-altura]").value
    const peso = document.querySelector("[data-peso]").value

    const cliente = cadastraCliente(nome, idade, peso, altura.replace(",", "."))
    localStorage.setItem("cliente", JSON.stringify(cliente))
    buildPlanos()
}

formulario.addEventListener("submit", e => getDados(e))

/* Apresentação de IMC */

function buildIMC(cliente) {
    const campoIMC = document.querySelector("[data-imc]")
    campoIMC.innerHTML = `
    <h5 class="card-title">${cliente.nome}, seu IMC é de <span>${cliente.imc}</span>.</h5>
    <p class="card-text">Clique no botão abaixo para ver os nossos planos diponiveis.</p>
    <div class="d-flex align-items-center justify-content-center gap-3">
        <button onclick="buildPlanos()" class="btn btn-primary" data-plano>Ver Planos</button>
        <button onclick="resetIMC()" class="btn btn-outline-danger">Restaurar</button>
    </div>`
}

function resetIMC() {
    localStorage.clear()
    limpaFormulario()
    resetPlanos()
}

/* Apresentação de Planos */

function buildPlanos() {
    const clienteStorage = localStorage.getItem("cliente")
    const parsedCliente = JSON.parse(clienteStorage)
    
    const planos = document.querySelector("[data-planos]")
    planos.innerHTML = `<div class="card w-100 text-center" style="width: 18rem;">
    <div class="card-body align-items-center">
      <h5 class="card-title">Operadora A</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">Planos e valores</h6>
      
        <div class="d-flex flex-column gap-3">
            <div class="card w-100 d-flex text-center">
                <div class="card-header text-center">
                    ${operadoraA(parsedCliente).planos.planoBasico.nome}
                </div>
                <div class="card-body">
                <h5 class="card-title">${(operadoraA(parsedCliente).planos.planoBasico.valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h5>
                <a href="#" class="card-link">Escolher Oferta</a>
                </div>
            </div>

            <div class="card w-100 d-flex text-center">
                <div class="card-header">
                ${operadoraA(parsedCliente).planos.planoStandard.nome}
                </div>
                <div class="card-body">
                <h5 class="card-title">${(operadoraA(parsedCliente).planos.planoStandard.valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h5>
                <a href="#" class="card-link">Escolher Oferta</a>
                </div>
            </div>

            <div class="card w-100 d-flex text-center">
                <div class="card-header">
                ${operadoraA(parsedCliente).planos.planoPremium.nome}
                </div>
                <div class="card-body">
                <h5 class="card-title">${(operadoraA(parsedCliente).planos.planoPremium.valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h5>
                <a href="#" class="card-link">Escolher Oferta</a>
                </div>
            </div>
        </div>
        
    </div>
</div>

<div class="card w-100 text-center bg-primary text-white" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">Melhor Oferta</h5>
      <h6 class="card-subtitle mb-2 text-white">Baseada em seus dados</h6>
      <div class="w-100 d-flex flex-column gap-3">
        <div class="card w-100 d-flex text-center">
            <div class="card-header text-center fw-bold">
            ${melhorOferta(parsedCliente).melhorOferta.operadora} &#183; ${melhorOferta(parsedCliente).melhorOferta.plano}
            </div>
            <div class="card-body">
                <h5 class="card-title">${(melhorOferta(parsedCliente).melhorOferta.preco).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h5>
                <a href="#" class="card-link">Escolher Oferta</a>
            </div>
            </div>
            <div class="alert alert-info" role="alert">
                Para chegar no resultado perfeito, utilizamos de um algorítmo de ponta que leva em consideração seu IMC e fator de comorbidade bem como fixado pela OMS.
            </div>
      </div>
    </div>
</div>

<div class="card w-100 text-center" style="width: 18rem;">
    <div class="card-body align-items-center">
      <h5 class="card-title">Operadora B</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">Planos e valores</h6>
      
      <div class="d-flex flex-column gap-3">
            <div class="card w-100 d-flex text-center">
                <div class="card-header text-center">
                    ${operadoraB(parsedCliente).planos.planoBasico.nome}
                </div>
                <div class="card-body">
                <h5 class="card-title">${(operadoraB(parsedCliente).planos.planoBasico.valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h5>
                <a href="#" class="card-link">Escolher Oferta</a>
                </div>
            </div>

            <div class="card w-100 d-flex text-center">
                <div class="card-header">
                ${operadoraB(parsedCliente).planos.planoStandard.nome}
                </div>
                <div class="card-body">
                <h5 class="card-title">${(operadoraB(parsedCliente).planos.planoStandard.valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h5>
                <a href="#" class="card-link">Escolher Oferta</a>
                </div>
            </div>

            <div class="card w-100 d-flex text-center">
                <div class="card-header">
                ${operadoraB(parsedCliente).planos.planoPremium.nome}
                </div>
                <div class="card-body">
                <h5 class="card-title">${(operadoraB(parsedCliente).planos.planoPremium.valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</h5>
                <a href="#" class="card-link">Escolher Oferta</a>
                </div>
            </div>
    </div>
        
    </div>
</div>`
}

function resetPlanos() {
    const planos = document.querySelector("[data-planos]")
    planos.innerHTML = ""
}

/* Funções auxiliares */

function calculaIMC(peso, altura) {
    return Math.floor(peso / altura**2)
}

function calculaComorbidade(imc) {
    let comorbidade;

    switch (true) {
        case (imc < 18.5):
            comorbidade = 10;
            break;
        case (imc >= 18.5 && imc <= 24.9):
            comorbidade = 1;
            break;
        case (imc >= 25 && imc <= 29.9):
            comorbidade = 6;
            break;
        case (imc >= 30 && imc <= 34.9):
            comorbidade = 10;
            break;
        case (imc >= 35 && imc <= 39.9):
            comorbidade = 20;
            break;
        case (imc > 40):
            comorbidade = 30;
            break;
        default:
            comorbidade = 0;
    }

    return comorbidade;
}

/* Cadastro do cliente */

function cadastraCliente(nome, idade, peso, altura) {
    const imc = calculaIMC(peso, altura)
    const comorbidade = calculaComorbidade(imc)
    return {
        nome: nome,
        idade: idade,
        peso: peso,
        altura: altura,
        imc: imc,
        comorbidade: comorbidade
    }
}

/* Planos operadoras */

function operadoraA(cliente) {
    const planos = {
        planoBasico: {
            nome: "Plano Básico",
            valor: 100 + (cliente.idade * 10 * (cliente.imc / 10))
        },
        planoStandard: {
            nome: "Plano Standard",
            valor: (150 + (cliente.idade * 15)) * (cliente.imc / 10)
        },
        planoPremium: {
            nome: "Plano Premium",
            valor: (200 - (cliente.imc * 10) + (cliente.idade * 20)) * (cliente.imc /10)
        }
    }

    const precoMelhorPlano = Math.min(planos.planoBasico.valor, planos.planoStandard.valor, planos.planoPremium.valor)

    let nomeMelhorPlano
    
    precoMelhorPlano === planos.planoBasico.valor ? nomeMelhorPlano = planos.planoBasico.nome : precoMelhorPlano === planos.planoStandard.valor ? planos.planoStandard.nome : precoMelhorPlano === planos.planoPremium.valor ? planos.planoPremium.nome : "default"

    return {
        nome: "Operadora A",
        planos, 
        melhorPlano: {
            nome: nomeMelhorPlano,
            preco: precoMelhorPlano
    }}
}

function operadoraB(cliente) {
    const planos = {
        planoBasico: {
            nome: "Plano Básico",
            valor: 100 + (cliente.comorbidade * 10 * (cliente.imc / 10))
        },
        planoStandard: {
            nome: "Plano Standard",
            valor: (150 + (cliente.comorbidade * 15)) * (cliente.imc / 10)
        },
        planoPremium: {
            nome: "Plano Premium",
            valor: (200 - (cliente.imc * 10) + (cliente.comorbidade * 20)) * (cliente.imc /10)
        }
    }

    const precoMelhorPlano = Math.min(planos.planoBasico.valor, planos.planoStandard.valor, planos.planoPremium.valor)
    let nomeMelhorPlano
    
    precoMelhorPlano === planos.planoBasico.valor ? nomeMelhorPlano = planos.planoBasico.nome : precoMelhorPlano === planos.planoStandard.valor ? nomeMelhorPlano = planos.planoStandard.nome : precoMelhorPlano === planos.planoPremium.valor ? nomeMelhorPlano = planos.planoPremium.nome : "default"

    return {
        nome: "Operadora B",
        planos, 
        melhorPlano: {
            nome: nomeMelhorPlano,
            preco: precoMelhorPlano
    }}
}

/* Calcular melhor preço */

function melhorOferta(cliente) {
    const melhorOferta = Math.min(operadoraA(cliente).melhorPlano.preco, operadoraB(cliente).melhorPlano.preco)

    let nomeMelhorOferta

    melhorOferta === operadoraA(cliente).melhorPlano.preco ?
    nomeMelhorOferta = operadoraA(cliente).melhorPlano.nome :
    melhorOferta === operadoraB(cliente).melhorPlano.preco ?
    nomeMelhorOferta = operadoraB(cliente).melhorPlano.nome :
    "default"

    let operadoraMelhorOferta

    melhorOferta === operadoraA(cliente).melhorPlano.preco ?
    operadoraMelhorOferta = operadoraA(cliente).nome :
    melhorOferta === operadoraB(cliente).melhorPlano.preco ?
    operadoraMelhorOferta = operadoraB(cliente).nome :
    "default"


    return {
        melhorOferta: {
            operadora: operadoraMelhorOferta,
            plano: nomeMelhorOferta,
            preco: melhorOferta
        }
    }
}