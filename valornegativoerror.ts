class ValorNegativoError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Valor Negativo.';
    }
}

export {ValorNegativoError}