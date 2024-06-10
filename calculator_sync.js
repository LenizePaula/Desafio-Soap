const soap = require('soap');

const url = 'http://www.dneonline.com/calculator.asmx?WSDL';

const args = process.argv.slice(2);

function operation(url, intA, intB, operation) {
    if (args.length !== 3) {
        console.log('Certifique-se de ter informado os três parâmetros.');
        process.exit(1);
    }

    const operations = {
        adicionar: 'Add',
        subtrair: 'Subtract',
        multiplicar: 'Multiply',
        dividir: 'Divide'
    };

    if (!operations[operation]) {
        console.log('Operação inválida. Use "adicionar", "subtrair", "multiplicar" ou "dividir".');
        process.exit(1);
    }

    const operationMethod = operations[operation];

    soap.createClient(url, function(err, client) {
        if (err) throw err;

        client[operationMethod]({ intA: intA, intB: intB }, function(err, result) {
            if (err) throw err;
            console.log(`Result: ${result[`${operationMethod}Result`]}`);
        });
    });
}

operation(url, parseInt(args[0]), parseInt(args[1]), args[2]);














