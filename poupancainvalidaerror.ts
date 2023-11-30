import { AplicacaoError } from "./aplicacaoError";
class PoupancaInvalidaError extends AplicacaoError {
    constructor(message: string) {
        super(message);
        this.name = 'Poupanca Invalida.';
    }
}

export {PoupancaInvalidaError}