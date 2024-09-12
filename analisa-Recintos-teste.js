class analisaRecintos {
    constructor(nro, bioma, espacoTotal, animais) {
        this.nro = nro;
        this.bioma = bioma;
        this.espacoTotal = espacoTotal;
        this.espacoLivre = espacoTotal;
        this.animais = animais;
    }

    podeAdicionar(tipoAnimal, quantidade) {
        if (tipoAnimal === 'macaco') {
            if (this.animais.size === 0) {
                return false;
            }
        }
        if (this.animais.has(tipoAnimal)) {
            return this.espacoLivre >= quantidade;
        }
        if (this.animais.size > 0) {
            return this.espacoLivre >= quantidade + 1;
        }
        return this.espacoLivre >= quantidade;
    }

    adicionarAnimais(tipoAnimal, quantidade) {
        if (!this.podeAdicionar(tipoAnimal, quantidade)) {
            return false;
        }
        if (this.animais.has(tipoAnimal)) {
            this.espacoLivre -= quantidade;
        } else {
            if (this.animais.size > 0) {
                this.espacoLivre -= (quantidade + 1);
            } else {
                this.espacoLivre -= quantidade;
            }
            this.animais.add(tipoAnimal);
        }
        return true;
    }
}

function encontrarRecintosViaveis(recintos, tipoAnimal, quantidade) {
    const erros = [];
    const recintosViaveis = [];

    const animaisValidos = ['hipopotamo', 'macaco', 'leão', 'girafa', 'zebra'];
    if (!animaisValidos.includes(tipoAnimal)) {
        erros.push("Animal inválido");
        return { recintos: [], erros: erros };
    }

    if (quantidade <= 0) {
        erros.push("Quantidade inválida");
        return { recintos: [], erros: erros };
    }

    for (const recinto of recintos) {
        if (tipoAnimal === 'hipopotamo') {
            if (!recinto.bioma.includes('savana') || !recinto.bioma.includes('rio')) {
                continue;
            }
        }
        if (tipoAnimal === 'macaco' && recinto.animais.size === 0) {
            continue;
        }
        if (recinto.podeAdicionar(tipoAnimal, quantidade)) {
            if (recinto.adicionarAnimais(tipoAnimal, quantidade)) {
                recintosViaveis.push({
                    numero: recinto.nro,
                    espacoLivre: recinto.espacoLivre,
                    espacoTotal: recinto.espacoTotal
                });
            }
        }
    }

    if (recintosViaveis.length === 0) {
        erros.push("Não há recinto viável");
    }

    return {
        recintos: recintosViaveis.sort((a, b) => a.numero - b.numero),
        erros: erros
    };
}

const recintos = [
    new analisaRecintos(1, ['savana', 'rio'], 20, new Set(['hipopotamo'])),
    new analisaRecintos(2, ['floresta'], 10, new Set()),
    new analisaRecintos(3, ['savana'], 15, new Set(['leão'])),
    new analisaRecintos(4, ['savana', 'rio'], 12, new Set(['hipopotamo', 'leão']))
];

const tipoAnimal = 'macaco';
const quantidade = 5;

const resultado = encontrarRecintosViaveis(recintos, tipoAnimal, quantidade);

console.log("Recintos viáveis:");
for (const recinto of resultado.recintos) {
    console.log(`Recinto ${recinto.numero} (espaço livre: ${recinto.espacoLivre} total: ${recinto.espacoTotal})`);
}
if (resultado.erros.length > 0) {
    console.log("Erros:");
    for (const erro of resultado.erros) {
        console.log(erro);
    }
}
