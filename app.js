"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var promptSync = require("prompt-sync");
var banco_1 = require("./banco");
var input = promptSync();
var b = new banco_1.Banco();
var opcao = '';
do {
    console.log('\nBem vindo\nDigite uma opção:');
    console.log('1 - Cadastrar       2 - Consultar saldo       3 - Sacar\n' +
        '4 - Depositar       5 - Excluir               6 - Transferir\n' +
        '0 - Sair\n');
    opcao = input("Opção: ");
    switch (opcao) {
        case "1":
            inserir();
            break;
        case "2":
            consultar();
            break;
        case "3":
            sacar();
            break;
        case "4":
            depositar();
            break;
        case "5":
            excluir();
            break;
        case "6":
            transferir();
            break;
    }
    input("\nOperação finalizada. Digite <enter>");
} while (opcao != "0");
console.log("Aplicação encerrada");
function inserir() {
    console.log("\nCadastrar conta\n");
    var numero = input('Digite o número da conta:');
    var conta;
    conta = new banco_1.Conta(numero, 0);
    b.inserir(conta);
    exibirConta(numero);
}
function sacar() {
    console.log("\nSacar de conta\n");
    var numero = input('Digite o número da conta:');
    var valor = parseFloat(input('Digite o valor:'));
    b.sacar(numero, valor);
    exibirConta(numero);
}
function exibirConta(numero) {
    console.log("N\u00FAmero: ".concat(b.consultar(numero).numero, " - Saldo: ").concat(b.consultar(numero).saldo));
}
function consultar() {
    console.log("\Consultar conta\n");
    var numero = input('Digite o número da conta:');
    var conta = b.consultar(numero);
    exibirConta(conta.numero);
}
function depositar() {
    console.log("\Depositar em conta\n");
    var numero = input('Digite o número da conta:');
    var valor = parseFloat(input('Digite o valor:'));
    b.depositar(numero, valor);
    exibirConta(numero);
}
function excluir() {
    console.log("\nExcluir conta\n");
    var numero = input('Digite o número da conta:');
    try {
        b.excluir(numero);
        console.log("Conta ".concat(numero, " exclu\u00EDda com sucesso."));
    }
    catch (error) {
        console.error("Erro ao excluir conta: ".concat(error.message));
    }
}
function transferir() {
    console.log("\nTransferir entre contas\n");
    var origemNumero = input('Digite o número da conta de origem:');
    var destinoNumero = input('Digite o número da conta de destino:');
    var valor = parseFloat(input('Digite o valor:'));
    try {
        b.transferir(origemNumero, destinoNumero, valor);
        console.log("Transfer\u00EAncia de ".concat(valor, " de ").concat(origemNumero, " para ").concat(destinoNumero, " realizada com sucesso."));
    }
    catch (error) {
        console.error("Erro ao transferir: ".concat(error.message));
    }
}
