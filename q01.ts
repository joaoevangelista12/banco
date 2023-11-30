/* 1. Try-Catch
function dividir(a: number, b: number): number {
    try {
        if (b === 0) {
            throw new Error("Divisão por zero não permitida");
        }
        return a / b;
    } catch (error) {
        console.error(`Erro: ${error.message}`);
        return NaN;
    }
}

const resultado1 = dividir(10, 2);
console.log(`O resultado é ${resultado1}`);

const resultado2 = dividir(10, 0);
console.log(`O resultado é ${resultado2}`);
*/
// 2. Retorno de Código de erro 
/*function dividir(a: number, b: number): [number | null, string | null] {
    if (b === 0) {
        return [null, "Divisão por zero não permitida"];
    } else {
        return [a / b, null];
    }
}

const [resultado_3, erro3] = dividir(10, 2);
if (erro3 !== null) {
    console.log(`Erro: ${erro3}`);
} else {
    console.log(`O resultado é ${resultado_3}`);
}
*/
// 3. Lançamento de Exceções Personalizadas
/* class ValorNegativoError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValorNegativoError";
    }
}

function calcularRaizQuadrada(numero: number): number {
    if (numero < 0) {
        throw new ValorNegativoError("Não é possível calcular a raiz quadrada de um número negativo.");
    } else {
        return Math.sqrt(numero);
    }
}

try {
    const resultado4 = calcularRaizQuadrada(-4);
    console.log(`A raiz quadrada é ${resultado4}`);
} catch (error) {
    if (error instanceof ValorNegativoError) {
        console.log(`Erro: ${error.message}`);
    } else {
        console.error(`Erro inesperado: ${error.message}`);
    }
}
*/
/*

Try-Catch:

Limitações:
Desempenho: O uso excessivo de blocos try-catch pode impactar o desempenho do código, 
pois o mecanismo de exceções é mais caro em termos de processamento do que simples verificações condicionais.
Legibilidade: O uso inadequado de blocos try-catch pode tornar o código menos legível,
especialmente se usado para controlar fluxo de execução normal, em vez de tratar exceções genuínas.


Retorno de Códigos de Erro:

Limitações:
Ignorância: Os códigos de erro podem ser ignorados, levando a bugs difíceis de serem identificados, 
especialmente se o programador não verificar corretamente os códigos de erro após cada chamada de função.
Inconsistência: O programador deve ser consistente ao verificar códigos de erro, 
e a falta dessa consistência pode levar a comportamentos inesperados.


Lançamento de Exceções Personalizadas:

Limitações:
Desempenho: O lançamento de exceções personalizadas pode ter um custo de desempenho, 
especialmente em ambientes onde a otimização de exceções não é eficiente.
Complexidade: O uso excessivo de exceções personalizadas pode aumentar a complexidade do código. 
Elas devem ser reservadas para situações verdadeiramente excepcionais, e não para controle de fluxo normal.
*/ 