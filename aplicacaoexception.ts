class AplicacaoException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AplicacaoException';
    }
}

export {AplicacaoException}