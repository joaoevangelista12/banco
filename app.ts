import * as promptSync from 'prompt-sync';
import { Banco, Conta } from './banco';

let input =  promptSync();
let b: Banco = new Banco();
let opcao: String = '';

do {
    console.log('\nBem vindo\nDigite uma opção:');
    console.log('1 - Cadastrar       2 - Consultar saldo       3 - Sacar\n' +
                '4 - Depositar       5 - Excluir               6 - Transferir\n' +
                '0 - Sair\n');
    opcao = input("Opção: ");
    switch (opcao) {
        case "1":
            inserir()
            break
        case "2":
            consultar()
            break
        case "3":
            sacar()
            break
        case "4": 
            depositar()
            break
        case "5":
            excluir()
            break
        case "6":
            transferir()
            break
    }       
    input("\nOperação finalizada. Digite <enter>");
} while (opcao != "0");
console.log("Aplicação encerrada");


function inserir(): void {
    console.log("\nCadastrar conta\n");
    let numero: string = input('Digite o número da conta:');

    let conta: Conta;
    conta = new Conta(numero, 0);
    b.inserir(conta);
    exibirConta(numero);
}

function sacar(): void {
    console.log("\nSacar de conta\n");
    let numero: string = input('Digite o número da conta:');
    let valor: number = parseFloat(input('Digite o valor:'));
    b.sacar(numero, valor);
    exibirConta(numero);
}

function exibirConta(numero: String): void {
    console.log(`Número: ${b.consultar(numero).numero} - Saldo: ${b.consultar(numero).saldo}`);
}

function consultar() {
    console.log("\Consultar conta\n");
    let numero: string = input('Digite o número da conta:');
    let conta: Conta = b.consultar(numero)

    exibirConta(conta.numero)
}

function depositar() {
    console.log("\Depositar em conta\n");
    let numero: string = input('Digite o número da conta:');
    let valor: number = parseFloat(input('Digite o valor:'));
    b.depositar(numero, valor);
    exibirConta(numero)

}

function excluir(): void {
    console.log("\nExcluir conta\n");
    let numero: string = input('Digite o número da conta:');
    
    try {
        b.excluir(numero);
        console.log(`Conta ${numero} excluída com sucesso.`);
    } catch (error) {
        console.error(`Erro ao excluir conta: ${error.message}`);
    }

}

function transferir(): void {
    console.log("\nTransferir entre contas\n");
    let origemNumero: string = input('Digite o número da conta de origem:');
    let destinoNumero: string = input('Digite o número da conta de destino:');
    let valor: number = parseFloat(input('Digite o valor:'));

    try {
        b.transferir(origemNumero, destinoNumero, valor);
        console.log(`Transferência de ${valor} de ${origemNumero} para ${destinoNumero} realizada com sucesso.`);
    } catch (error) {
        console.error(`Erro ao transferir: ${error.message}`);
    }   

}