import { AplicacaoException } from "./aplicacaoexception";
class ValorInvalidoError extends AplicacaoException {
    constructor(message: string) {
        super(message);
        this.name = 'Valor Invalido.';
    }
}
export {ValorInvalidoError}