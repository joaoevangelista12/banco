"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContaImposto = exports.Poupanca = exports.Banco = exports.Conta = void 0;
var containexistenteError_1 = require("./containexistenteError");
var poupancainvalidaerror_1 = require("./poupancainvalidaerror");
var saldoinsuficienteError_1 = require("./saldoinsuficienteError");
var valorinvalidoerror_1 = require("./valorinvalidoerror");
var valornegativoerror_1 = require("./valornegativoerror");
var Conta = /** @class */ (function () {
    function Conta(numero, saldoInicial) {
        if (saldoInicial < 0) {
            throw new saldoinsuficienteError_1.SaldoInsuficienteError("O saldo inicial não pode ser menor que zero.");
        }
        this._numero = numero;
        this._saldo = saldoInicial;
    }
    Object.defineProperty(Conta.prototype, "numero", {
        get: function () {
            return this._numero;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Conta.prototype, "saldo", {
        get: function () {
            return this._saldo;
        },
        enumerable: false,
        configurable: true
    });
    Conta.prototype.alterar = function (numero, novoNumero) {
        var conta = this.consultar(numero);
        conta.alterarNumero(novoNumero);
    };
    Conta.prototype.validarValor = function (valor) {
        if (valor <= 0) {
            if (valor < 0) {
                throw new valornegativoerror_1.ValorNegativoError("O valor não pode ser negativo.");
            }
            else {
                throw new valorinvalidoerror_1.ValorInvalidoError("O valor deve ser maior que zero.");
            }
        }
    };
    Conta.prototype.depositar = function (valor) {
        this.validarValor(valor);
        this._saldo += valor;
        console.log("Dep\u00F3sito de ".concat(valor, " realizado. Novo saldo: ").concat(this._saldo));
    };
    Conta.prototype.sacar = function (valor) {
        this.validarValor(valor);
        if (valor > this._saldo) {
            throw new saldoinsuficienteError_1.SaldoInsuficienteError("Saldo insuficiente para realizar o saque.");
        }
        this._saldo -= valor;
        console.log("Saque de ".concat(valor, " realizado. Novo saldo: ").concat(this._saldo));
    };
    Conta.prototype.transferir = function (destino, valor) {
        this.sacar(valor);
        destino.depositar(valor);
    };
    Conta.prototype.renderJuros = function () {
        if (!(this instanceof Poupanca)) {
            throw new poupancainvalidaerror_1.PoupancaInvalidaError("A conta não é uma conta poupança.");
        }
        // Implementação do cálculo de juros para conta poupança (se necessário)
        console.log("Renderização de juros realizada.");
    };
    return Conta;
}());
exports.Conta = Conta;
var Banco = /** @class */ (function () {
    function Banco() {
        this.contas = [];
    }
    Banco.prototype.adicionarConta = function (conta) {
        this.contas.push(conta);
    };
    Banco.prototype.inserir = function (conta) {
        try {
            // Tenta consultar a conta pelo número
            this.consultar(conta.numero);
            // Se não lançar exceção, a conta já existe
            console.error("Conta com n\u00FAmero ".concat(conta.numero, " j\u00E1 existe. N\u00E3o \u00E9 poss\u00EDvel cadastrar."));
        }
        catch (error) {
            // Se lançar exceção, a conta não existe, então pode ser cadastrada
            this.contas.push(conta);
            console.log("Conta com n\u00FAmero ".concat(conta.numero, " cadastrada com sucesso."));
        }
    };
    Banco.prototype.depositar = function (numero, valor) {
        var conta = this.consultar(numero);
        try {
            conta.depositar(valor);
            console.log("Dep\u00F3sito de ".concat(valor, " na conta ").concat(numero, " realizado com sucesso."));
        }
        catch (error) {
            console.error("Erro ao depositar: ".concat(error.message));
        }
    };
    Banco.prototype.sacar = function (numero, valor) {
        try {
            var conta = this.consultar(numero);
            conta.sacar(valor);
            console.log("Saque de ".concat(valor, " na conta ").concat(numero, " realizado com sucesso."));
        }
        catch (error) {
            console.error("Erro ao sacar: ".concat(error.message));
        }
    };
    Banco.prototype.renderJuros = function (numero) {
        var conta = this.consultar(numero);
        try {
            conta.renderJuros();
        }
        catch (error) {
            console.error("Erro ao renderizar juros: ".concat(error.message));
        }
    };
    Banco.prototype.consultar = function (numero) {
        var contaEncontrada = this.contas.find(function (conta) { return conta.numero === numero; });
        if (!contaEncontrada) {
            throw new containexistenteError_1.ContaInexistenteError("Conta com n\u00FAmero ".concat(numero, " n\u00E3o encontrada."));
        }
        return contaEncontrada;
    };
    Banco.prototype.consultarPorIndice = function (indice) {
        if (indice < 0 || indice >= this.contas.length) {
            throw new containexistenteError_1.ContaInexistenteError("\u00CDndice ".concat(indice, " fora dos limites."));
        }
        return this.contas[indice];
    };
    Banco.prototype.transferir = function (origemNumero, destinoNumero, valor) {
        var origem = this.consultar(origemNumero);
        var destino = this.consultar(destinoNumero);
        try {
            origem.transferir(destino, valor);
            console.log("Transfer\u00EAncia de ".concat(valor, " de ").concat(origemNumero, " para ").concat(destinoNumero, " realizada com sucesso."));
        }
        catch (error) {
            console.error("Erro ao transferir: ".concat(error.message));
        }
    };
    Banco.prototype.excluir = function (numero) {
        var contaIndex = this.contas.findIndex(function (conta) { return conta.numero === numero; });
        if (contaIndex === -1) {
            console.error("Conta com n\u00FAmero ".concat(numero, " n\u00E3o encontrada. N\u00E3o \u00E9 poss\u00EDvel excluir."));
            return;
        }
        this.contas.splice(contaIndex, 1);
        console.log("Conta com n\u00FAmero ".concat(numero, " exclu\u00EDda com sucesso."));
    };
    return Banco;
}());
exports.Banco = Banco;
var Poupanca = /** @class */ (function (_super) {
    __extends(Poupanca, _super);
    function Poupanca(numero, saldoInicial, taxaRendimento) {
        var _this = _super.call(this, numero, saldoInicial) || this;
        _this._taxaRendimento = taxaRendimento;
        return _this;
    }
    Poupanca.prototype.renderJuros = function () {
        var rendimento = this.saldo * (this._taxaRendimento / 100);
        this.depositar(rendimento);
        console.log("Renderiza\u00E7\u00E3o de juros realizada. Rendimento: ".concat(rendimento, ". Novo saldo: ").concat(this.saldo));
    };
    return Poupanca;
}(Conta));
exports.Poupanca = Poupanca;
var ContaImposto = /** @class */ (function (_super) {
    __extends(ContaImposto, _super);
    function ContaImposto(numero, saldo, taxaDesconto) {
        var _this = _super.call(this, numero, saldo) || this;
        _this._taxaDesconto = taxaDesconto;
        return _this;
    }
    ContaImposto.prototype.sacar = function (valor) {
        var valorDesconto = this.saldo * this._taxaDesconto / 100;
        _super.prototype.sacar.call(this, valor + valorDesconto);
    };
    Object.defineProperty(ContaImposto.prototype, "taxaDesconto", {
        get: function () {
            return this._taxaDesconto;
        },
        enumerable: false,
        configurable: true
    });
    return ContaImposto;
}(Conta));
exports.ContaImposto = ContaImposto;
