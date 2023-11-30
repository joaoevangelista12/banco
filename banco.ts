import { ContaInexistenteError } from "./containexistenteError";
import { PoupancaInvalidaError } from "./poupancainvalidaerror";
import { SaldoInsuficienteError } from "./saldoinsuficienteError";
import { ValorInvalidoError } from "./valorinvalidoerror";
import { ValorNegativoError } from "./valornegativoerror";

class Conta {
    private _numero: string;
    private _saldo: number;
    consultar: any
    constructor(numero: string, saldoInicial: number) {
        if (saldoInicial < 0) {
            throw new SaldoInsuficienteError("O saldo inicial não pode ser menor que zero.");
        }
        this._numero = numero;
        this._saldo = saldoInicial;
    }

    get numero(): string {
        return this._numero;
    }

    get saldo() {
        return this._saldo;
    }

    alterar(numero: string, novoNumero: string): void {
        const conta = this.consultar(numero);
        conta.alterarNumero(novoNumero);
    }

    private validarValor(valor: number): void {
        if (valor <= 0) {
            if (valor < 0) {
                throw new ValorNegativoError("O valor não pode ser negativo.");
            } else {
                throw new ValorInvalidoError("O valor deve ser maior que zero.");
            }
        }
    }

    depositar(valor: number): void {
        this.validarValor(valor);

        this._saldo += valor;
        console.log(`Depósito de ${valor} realizado. Novo saldo: ${this._saldo}`);
    }

    sacar(valor: number): void {
        this.validarValor(valor);

        if (valor > this._saldo) {
            throw new SaldoInsuficienteError("Saldo insuficiente para realizar o saque.");
        }

        this._saldo -= valor;
        console.log(`Saque de ${valor} realizado. Novo saldo: ${this._saldo}`);
    }

    transferir(destino: Conta, valor: number): void {
        this.sacar(valor);
        destino.depositar(valor);
    }
    renderJuros(): void {
        if (!(this instanceof Poupanca)) {
            throw new PoupancaInvalidaError("A conta não é uma conta poupança.");
        }

        // Implementação do cálculo de juros para conta poupança (se necessário)
        console.log("Renderização de juros realizada.");
    }
}

class Banco {
    private contas: Conta[] = [];
    adicionarConta(conta: Conta): void {
        this.contas.push(conta);
    }

    inserir(conta: Conta): void {
        try {
            // Tenta consultar a conta pelo número
            this.consultar(conta.numero);

            // Se não lançar exceção, a conta já existe
            console.error(`Conta com número ${conta.numero} já existe. Não é possível cadastrar.`);
        } catch (error) {
            // Se lançar exceção, a conta não existe, então pode ser cadastrada
            this.contas.push(conta);
            console.log(`Conta com número ${conta.numero} cadastrada com sucesso.`);
        }
    }
    depositar(numero: string, valor: number): void {
        const conta = this.consultar(numero);

        try {
            conta.depositar(valor);
            console.log(`Depósito de ${valor} na conta ${numero} realizado com sucesso.`);
        } catch (error) {
            console.error(`Erro ao depositar: ${error.message}`);
        }
    }
    sacar(numero: string, valor: number): void {
        try {
            const conta = this.consultar(numero);
            conta.sacar(valor);
            console.log(`Saque de ${valor} na conta ${numero} realizado com sucesso.`);
        } catch (error) {
            console.error(`Erro ao sacar: ${error.message}`);
        }
    }
    
    renderJuros(numero: string): void {
        const conta = this.consultar(numero);

        try {
            conta.renderJuros();
        } catch (error) {
            console.error(`Erro ao renderizar juros: ${error.message}`);
        }
    }

    consultar(numero: String): Conta {
        const contaEncontrada = this.contas.find(conta => conta.numero === numero);

        if (!contaEncontrada) {
            throw new ContaInexistenteError(`Conta com número ${numero} não encontrada.`);
        }

        return contaEncontrada;
    }

    consultarPorIndice(indice: number): Conta {
        if (indice < 0 || indice >= this.contas.length) {
            throw new ContaInexistenteError(`Índice ${indice} fora dos limites.`);
        }

        return this.contas[indice];
    }

    transferir(origemNumero: string, destinoNumero: string, valor: number): void {
        const origem = this.consultar(origemNumero);
        const destino = this.consultar(destinoNumero);
    
        try {
            origem.transferir(destino, valor);
            console.log(`Transferência de ${valor} de ${origemNumero} para ${destinoNumero} realizada com sucesso.`);
        } catch (error) {
            console.error(`Erro ao transferir: ${error.message}`);
        }
    }
    excluir(numero: string): void {
        const contaIndex = this.contas.findIndex(conta => conta.numero === numero);

        if (contaIndex === -1) {
            console.error(`Conta com número ${numero} não encontrada. Não é possível excluir.`);
            return;
        }

        this.contas.splice(contaIndex, 1);
        console.log(`Conta com número ${numero} excluída com sucesso.`);
    }
}

class Poupanca extends Conta {
    private _taxaRendimento: number;

    constructor(numero: string, saldoInicial: number, taxaRendimento: number) {
        super(numero, saldoInicial);
        this._taxaRendimento = taxaRendimento;
    }

    renderJuros(): void {
        const rendimento = this.saldo * (this._taxaRendimento / 100);
        this.depositar(rendimento);
        console.log(`Renderização de juros realizada. Rendimento: ${rendimento}. Novo saldo: ${this.saldo}`);
    }
}
class ContaImposto extends Conta {
	private _taxaDesconto: number;

	constructor(numero: string, saldo: number, taxaDesconto: number) {
		super(numero, saldo);
		this._taxaDesconto = taxaDesconto
	}

	sacar(valor: number): void {
		let valorDesconto = this.saldo * this._taxaDesconto / 100;
		super.sacar(valor + valorDesconto);
	}

	get taxaDesconto(): number {
		return this._taxaDesconto;
	}
}
export{Conta, Banco, Poupanca, ContaImposto}