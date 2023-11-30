import { AplicacaoError } from "./aplicacaoError";
class ContaInexistenteError extends AplicacaoError {
    constructor(message: string) {
        super(message);
        this.name = 'ContaInexistenteError';
    }
}

export {ContaInexistenteError}