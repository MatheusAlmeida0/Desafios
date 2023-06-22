const OperacaoAnterior = document.querySelector(".calculoAtual")
const OperacaoAtual = document.querySelector(".resultado span")
const buttons = document.querySelectorAll(".teclado button")

class calculadora {
  constructor(OperacaoAnterior , OperacaoAtual) {
    this.OperacaoAnterior = OperacaoAnterior
    this.OperacaoAtual = OperacaoAtual
    this.OperacaoAndamento = ""
  }

  addDigit(digit) {
    if (digit === "," && this.OperacaoAtual.innerText.includes(",")){
      return;
    }


    this.OperacaoAndamento = digit
    this.AtualizarTela();
  }


  processOperation(operation){

    if(this.OperacaoAtual.innerText === "" && operation !== "CE"){
      if(this.OperacaoAnterior.innerText !== ""){
        this.changeOperation(operation)
      }
      return
    }
    
      let operationValue
      let previous = +this.OperacaoAnterior.innerText.split(" ")[0]
      let current = +this.OperacaoAtual.innerText

      switch (operation) {
        case '+':
          operationValue = previous + current;
          this.AtualizarTela(operationValue, operation, current, previous);
          break;
        case '-':
          operationValue = previous - current;
          this.AtualizarTela(operationValue, operation, current, previous);
          break;
        case '/':
          operationValue = previous / current;
          this.AtualizarTela(operationValue, operation, current, previous);
          break;
        case 'x':
          operationValue = previous * current;
          this.AtualizarTela(operationValue, operation, current, previous);
          break;
        case '%':
          operationValue = (previous * current) / 100;
          this.AtualizarTela(operationValue, operation, current, previous);
          break;
        case 'CE':
          this.processClearOp();
          break;
        case 'C':
          this.processCoperator();
          break;
        case '=':
          this.processEquals();
          break;
        default:
          return;
      }
  }

  AtualizarTela( 
    operationValue = null,
    operation = null,
    current = null,
    previous = null
    ){
      if (operationValue === null){
        this.OperacaoAtual.innerText += this.OperacaoAndamento;
      }else{
          if(operation === 0 ){
            operationValue = current
          }
          
          this.OperacaoAnterior.innerText = `${operationValue} ${operation}`
          this.OperacaoAtual.innerText = ""
      }
  }

  changeOperation(operation){
    const mathOperation = ["+", "-", "x", "/", "%"]

    if(!mathOperation.includes(operation)){
      return
    }

    this.OperacaoAnterior.innerText = this.OperacaoAnterior.innerText.slice(0, -1) + operation
  }

  processCoperator(){
    this.OperacaoAtual.innerText = ""
  }

  processClearOp(){
    this.OperacaoAtual.innerText = ""
    this.OperacaoAnterior.innerText = ""
  }

  processEquals(){
    const operation = OperacaoAnterior.innerText.split(" ")[1]

    this.processOperation(operation)
  }
}

const calc = new calculadora(OperacaoAnterior, OperacaoAtual)

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) =>{
    const valor = e.target.innerText;

    if(+valor >= 0 ||  valor === ","){
      calc.addDigit(valor)
    }else{
      calc.processOperation(valor)
    }
  })
})