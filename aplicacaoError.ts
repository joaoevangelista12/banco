class AplicacaoError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Aplicacao Invalida';
    }
}
export {AplicacaoError}