// let titulo = document.querySelector('h1'); // o document.querySelector é utilizado pelo JS para trazer e manipular elementos do HTML. Veja que, no caso em questão, trouxemos o h1 e o atribuímos a uma variavel (titulo)
// titulo.innerHTML = 'Jogo do número secreto'; // aqui, nós estamos utilizando a propriedade innerHTML para, através da variável criada com o elemento h1, atribuir valor inserindo um texto na página.

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

let listaDeNumerosSorteados = []; // Criamos uma variável do tipo array para armazenar os números sorteados e criar uma lista com eles, com o objetivo de evitar repetição na geração do número aleatório.
let numeroLimite = 60; // Criamos uma variável para sistematizar no código a quantidade de números que podem ser sorteados.
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) { // Observe que os códigos das linhas 1/2 e 3/4 são iguais, sendo diferentes apenas quanto ao nome da variável, elemento trazido do HTML e o texto inserido com a propriedade innerHTML. Dessa forma, como boa prática, para evitar a repetição de código com uma função, na qual, ao invés de escrevermos os códigos acima em 4 linhas, escreveremos em menos.
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); // Criamos este comando para utilizar um código em javascript trazido na linha 7 do código HTML. Este código possibilita a utilização do responsive voice, que não é um recurso nativo do javascript, para que seja narrado/falado aquilo que estamos passando para o sistema. Explicando o código, primeiro indicamos o que queremos que o sistema fale, em seguida, especificamos o idioma que queremos (olhar no site do responsive voice) e, por fim, podemos também alterar uma propriedade, que é a velocidade da fala (rate entre chaves). 
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto'); // O que aconteceu? Criamos a função, nomeamos genericamente os campos que gostaríamos de mudar de acordo com a execução da função, indicamos estes campos dentro dela e inserimos o código de forma genérica para ser executado de acordo com os parâmetros informados. Veremos que bastará informar a tag e o texto dentro dos parênteses da função para que ela execute corretamente. 
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 60');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value; // Criamos uma variável e atribuímos a ela o valor informado pelo usuário no input. Veja que, para isso, após chamar o input com o querySelector, ao final acrescentamos o .value, justamente para trazer o valor informado pelo usuário.
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++; // Como visto no projeto anterior, o ++ é como um incrementador, ele adiciona +1 à variável tentativas a cada execução do código e erro do usuário. Assim, ele soma todas as tentativas e o código informa o total quando o usuário acerta o número secreto.
        limparCampo();
    }
}

function gerarNumeroAleatorio() { // esta é uma função que não tem parâmetro, mas tem retorno
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); // Declaramos a variável numeroEscolhido e lhe atribuímos o número gerado aleatoriamente.
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; //Criamos uma variável e atribuímos a ela o valor do comprimento da lista (array) referente aos números que já foram gerados aleatoriamente.

    if (quantidadeDeElementosNaLista == numeroLimite) { // Criamos uma condição para que, caso a quantidade de elementos na lista tenha se igualado à quantidade de números sorteados, a lista seja esvaziada.
        listaDeNumerosSorteados = []; // Veja que, como a variável é uma array, para esvaziar a lista basta atribuir o valor de colchetes sem nada dentro.
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)){ // Aqui, estamos perguntando, através do atributo includes, se o numeroEscolhido está na listaDeNumerosSorteados, pois se estiver, vamos pedir para que seja gerado um novo número aleatório e seja evitada a repetição.
        return gerarNumeroAleatorio();
    } else { // Se não estiver na lista, não houve repetição na geração do número aleatório, então pedimos o retorno do numeroEscolhido.
        listaDeNumerosSorteados.push(numeroEscolhido); // push é um atributo que adiciona um item ao final da lista (array). Estamos pedindo para que o numeroEscolhido seja adicionado à listaDeNumerosSorteados para que possamos saber quais números já foram sorteados e evitar a repetição na próxima geração de número aleatório.
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() { // Criamos esta função para limpar o campo de chute a cada erro do usuário. O que fizemos na função? Atribuímos à variável chute o input através do document.querySelector e depois usamos o .value para atribuir valor à variável, que neste caso foi o campo vazio, como almejamos.
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}