var jogadas = 0;
var grade;

function Grade(elementos) {
    this.linhas = [];
    var linha1 = [];
    var linha2 = [];
    var linha3 = [];
    var i = 0;
    for (var j = 0; j < 3; j++) {
        linha1[j] = elementos[i++];
    }
    this.linhas[0] = linha1;

    for (var j = 0; j < 3; j++) {
        linha2[j] = elementos[i++];
    }
    this.linhas[1] = linha2;

    for (var j = 0; j < 3; j++) {
        linha3[j] = elementos[i++];
    }
    this.linhas[2] = linha3;
}

// Essa função deverá ser chamada após jogadas >= 6
function verificaGanhador() {
    // Verifica as jogadas verticais
    var auxVertical = [];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            auxVertical[j] = grade.linhas[j][i];
        }
        verificaArray(auxVertical);
    }

    // Verifica as jogadas horizontais
    var auxHorizontal = [];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            auxHorizontal[j] = grade.linhas[i][j];
        }
        verificaArray(auxHorizontal);
    }

    // Verifica a jogada diagonal esquerda direita
    var auxDiagonal = [];
    for (var i = 0; i < 3; i++) {
        auxDiagonal[i] = grade.linhas[i][i];
    }
    verificaArray(auxDiagonal);

    // Verifica a jogada diagonal direita esquerda
    auxDiagonal = [];
    for (var j = 2, i = 0; j >= 0; j--, i++) {
        auxDiagonal[i] = grade.linhas[i][j];
    }
    verificaArray(auxDiagonal);

}

function verificaArray(array) {
    var aux = array[0].getAttribute('jogador');
    var cont = 0;
    for (var i = 0; i < array.length; i++) {
        if (aux == array[i].getAttribute('jogador') && aux != 0 && array[i].getAttribute('jogador') != 0) {
            cont++;
            aux = array[i].getAttribute('jogador');
        } else {
            return false;
        }
    }
    if (cont == 3) {
        // Incremetando as jogadas para que nenhuma outra seja possível ;)
        jogadas = 10;
        if (aux == 1) {
            for (var i = 0; i < array.length; i++) {
                array[i].setAttribute("style", "color: green;");
            }
            alert("Você ganhou.");
        } else {
            for (var i = 0; i < array.length; i++) {
                array[i].setAttribute("style", "color: red;");
            }
            alert("Você perdeu.");
        }
        return true;
    } else {
        return false;
    }
}

// Monta uma matriz com os elementos div reais da classe "unid"
function montaMatriz() {
    var elementos = document.getElementsByClassName("unid");
    grade = new Grade(elementos);
}

function play(pos) {
    if (!verificaPos(pos)) {
        if (jogadas < 9) {
            plotaIcone(pos, true);
            jogadas++;
            cpuPlay();
            jogadas++;
            verificaGanhador();
        }
    }
}

function cpuPlay() {
    var vetPos= document.getElementsByClassName("unid");
    do {
        cpuPos = vetPos[geraAleatorio()];
    } while (verificaPos(cpuPos));
    plotaIcone(cpuPos, false);
}

function geraAleatorio() {
    var posAleatoria = Math.floor(Math.random() * (8 - 0) + 0);
    return posAleatoria;
}

// Verifica se a posição já foi usada em alguma jogada
function verificaPos(pos) {
    return pos.hasChildNodes();
}

function plotaIcone(pos, humano) {
    var icone;
    var marcador; // 0:vazio, 1:humano, 2:cpu
    if (humano) {
        icone = "face";
        marcador = 1;
    } else {
        icone = "android";
        marcador = 2;
    }
    var elIco = document.createElement("i");
    elIco.setAttribute("class", "material-icons md-64");
    elIco.appendChild(document.createTextNode(icone));
    pos.setAttribute("jogador", marcador);
    pos.appendChild(elIco);
}
