const display = document.getElementById('display')
const displayText = document.getElementById('display').textContent // Obtem o texto exibido
const igual = document.getElementById('igual')
const apagar = document.getElementById('apagar')
const maismenos = document.getElementById('maismenos')
const limparCalculo = document.getElementById('limparCalculo')
const limparTudo = document.getElementById('limparTudo')
const porc = document.getElementById('porc')
const virg = document.getElementById('virg')
const divisaoUm = document.getElementById('divisaoUm')
const potencia = document.getElementById('potencia')
const raiz = document.getElementById('raiz')

const nums = document.querySelectorAll("[id*=num]") // Seleciona todos os botões de números
const operadores = document.querySelectorAll("[id*=sinal]") // Selecionan todos os botões de operações

// Variáveis para controlar o fluxo da calculadora
let primeiro = true
let operador
let numeroAnterior
let numeroAtual
let apagarIgual

// Função para substituir ponto por vírgula no display
const ajustaPontoVirgula = () => display.textContent = display.textContent.replace('.', ',')

// Função para inserir texto no display
const inserirDisplay = text => {

  if (primeiro) {
    display.textContent = text
    primeiro = false
  } else {
    display.textContent += text
  }

  display.textContente = display.textContent.substring(0,17) // Limita o tamanho do texto exibido
  numeroAtual = display.textContent
  apagarIgual = true
}

// Event listener para os botões de números
const inserir = e => inserirDisplay(e.target.textContent)
nums.forEach(e => e.addEventListener('click', inserir))

// Função para inserir operadores e controlar variáveis correspondentes
const inserirOperador = e => {
  primeiro = true
  operador = e.target.textContent
  if (operador == 'x') {
    operador = "*"
  } else if (operador == '÷') {
    operador = '/'
  }
  numeroAnterior = display.textContent
}

// Event listener para os botões de operações
operadores.forEach(e => e.addEventListener('click', inserirOperador))

// Função para realizar o cálculo
const calcular = () => {
  if (numeroAnterior && operador) {
    let result = numeroAnterior + operador

    if(numeroAtual) {
      result += numeroAtual
    } else {
      result += numeroAnterior
    }

    
    display.textContent = eval(result.replace(',', '.')) // Avalia a expressão matemática
    ajustaPontoVirgula()

    if(display.textContent == 'NaN') {
      display.textContent = '0'
    }

    numeroAnterior = display.textContent
    primeiro = true
    apagarIgual = false
  }
}

igual.addEventListener('click', calcular)

const apagarUltimo = () => {
  if (apagarIgual) {
    if (display.textContent.length > 1) {
      display.textContent = display.textContent.slice(0, -1)
    } else {
      display.textContent = 0
    }
    primeiro = true
  }
}

apagar.addEventListener('click', apagarUltimo)

const inverteSinal = () => {
  display.textContent = parseFloat(display.textContent.replace(',', '.')) * -1
  ajustaPontoVirgula()
}

maismenos.addEventListener('click', inverteSinal)

const limpaCalculo = () => {
  display.textContent = '0'
  primeiro = true
}

limparCalculo.addEventListener('click', limpaCalculo)

const limpaTudo = () => {
  display.textContent = '0'
  numeroAnterior = '0'
  numeroAtual = '0'
  primeiro = true
}

limparTudo.addEventListener('click', limpaTudo)

const calcPorc = () => {
  display.textContent = parseFloat(display.textContent.replace(',', '.')) / 100
  ajustaPontoVirgula()
  numeroAtual = display.textContent
  primeiro = true
}

porc.addEventListener('click', calcPorc)

const calcDivisaoUm = () => {
  display.textContent = 1 / parseFloat(display.textContent.replace(',', '.'))
  ajustaPontoVirgula()
  numeroAtual = display.textContent
  numeroAnterior = '0'
  primeiro = true
}

divisaoUm.addEventListener('click', calcDivisaoUm)

const calcPotencia = () => {
  display.textContent = Math.pow(parseFloat(display.textContent.replace(',', '.')), 2)
  ajustaPontoVirgula()
  numeroAtual = display.textContent
  numeroAnterior = '0'
  primeiro = true
}

potencia.addEventListener('click', calcPotencia)

const calcRaiz = () => {
  display.textContent = Math.sqrt(parseFloat(display.textContent.replace(',', '.')))
  ajustaPontoVirgula()
  numeroAtual = display.textContent
  numeroAnterior = '0'
  primeiro = true
}

raiz.addEventListener('click', calcRaiz)