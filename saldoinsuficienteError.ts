import { AplicacaoError } from "./aplicacaoError";
class SaldoInsuficienteError extends AplicacaoError {
    constructor(message: string) {
        super(message);
        this.name = 'Saldo Insuficiente.';
    }
}

export{SaldoInsuficienteError}