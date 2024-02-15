const caixaInicial = document.getElementById('caixaDeTexto');
const dificuldades = document.getElementById('dificuldades');
const start = document.getElementById('btnIniciar');
const textoCampo = document.getElementById('texto');
const textoGerado = document.getElementById('textoGerado');
const campoDigitacao = document.getElementById('entrada');
const tempoCampo = document.getElementById('tempo');
let tempoTotal = 0;
let palavrasDigitadasCorretamente = [];

const frases = [

  // Frases curtas
  "A pressa é inimiga da perfeição.",
  "Devagar se vai ao longe.",
  "Água mole em pedra dura tanto bate até que fura.",
  "Quem não arrisca não petisca.",
  "Em terra de cego, quem tem um olho é rei.",
  "Mais vale um pássaro na mão do que dois voando.",
  "A fome aguça o paladar.",
  "Gato escaldado tem medo de água fria.",
  "Erro de português é um tiro no pé.",
  "Tempo é dinheiro.",

  // Frases longas
  "A arte da vida é saber aproveitar o presente, aprender com o passado e esperar com confiança o futuro.",
  "A felicidade não está no destino, mas sim no caminho.",
  "A educação é o passaporte para o futuro.",
  "O conhecimento é poder.",
  "A união faz a força.",
  "A liberdade é um direito inalienável do ser humano.",
  "A paz é o único caminho para a felicidade.",
  "O amor é a força que move o mundo.",
  "A esperança é a última que morre.",
  "A fé remove montanhas.",

  // Frases engraçadas
  "O que é um pontinho verde no mar? Uma ervilha marinha.",
  "O que o pato disse para a pata? Vem Quá!",
  "Qual o cúmulo da preguiça? Nascer de cesariana.",
  "O que o tomate foi fazer no banco? Foi tirar extrato.",
  "Qual o animal que come com o pé? A galinha, porque ela tem pé de galinha.",
  "Por que a planta carnívora não come preguiça? Porque ela se cansa de esperar.",
  "Qual o animal que come com o ouvido? O elefante, porque ele tem orelha de abano.",
  "O que o advogado do queijo disse para o advogado do presunto? Vamos resolver isso no tribunal.",
  "Por que a bolacha não quis entrar no forno? Porque ela estava com frio na barriga.",
  "Qual o animal que come com o ouvido? O elefante, porque ele tem orelha de abano.",

  // Frases poéticas
  "A vida é um poema, e cada dia é um verso.",
  "O amor é uma flor, e cada beijo é uma pétala.",
  "A felicidade é uma borboleta, e cada sorriso é uma asa.",
  "A esperança é uma estrela, e cada sonho é um raio de luz.",
  "A paz é uma pomba, e cada ramo de oliveira é um símbolo de união.",

  // Frases de filósofos
  "Penso, logo existo.",
  "A única coisa que sei é que nada sei.",
  "A vida é o que fazemos dela.",
  "O homem é a medida de todas as coisas.",
  "A felicidade é o bem supremo.",

  // Frases de filmes e séries
  "Hakuna Matata! O que significa que você tem que relaxar.",
  "Hasta la vista, baby!",
  "Que a Força esteja com você.",
  "Ao infinito e além!",
  "Carpe Diem! Aproveite o dia!",

  // Frases de músicas
  "Imagine um mundo sem guerra.",
  "É preciso amar as pessoas como se não houvesse amanhã.",
  "O sol é para todos.",
  "A vida é um rio que deságua no mar.",
  "Deixa a vida me levar.",

  // Frases de livros
  "O que importa não é o que você tem, mas sim o que você faz com o que tem.",
  "A vida é uma aventura, e cada dia é uma nova história.",
  "O futuro pertence àqueles que acreditam na beleza dos seus sonhos.",
  "A leitura é a porta de entrada para um mundo novo.",
  "A educação é a arma mais poderosa que você pode usar para mudar o mundo.",

  // Provérbios e ditados
  "Quem não chora não mama.",
  "Deus ajuda quem cedo madruga.",
  "A cavalo dado não se olham os dentes.",
  "Em boca fechada não entra mosca.",
  "Filho de peixe, peixinho é.",

];
const frasesSelecionadas = [];

function gerarFraseAleatoria(dificuldade) {

  // Se a dificuldade for "easy", a frase terá no máximo 100 caracteres, do contrário terá no máximo 1000 caracteres
  const max = dificuldade === 'easy' ? 300 : 2000;
  let numeroAleatorio, frase, palavras;
  let caracteres = 0;
  const novoTexto = [];
  while (caracteres < max) {
    numeroAleatorio = Math.floor(Math.random() * frases.length);
    frase = frases[numeroAleatorio];
    palavras = frase.split(' ');
    for (const palavra of palavras) {
      const numeroAleatorio = Math.random();
      if (numeroAleatorio < 0.5) {
        novoTexto.push(palavra);
        caracteres += palavra.length; // Incrementa o número de caracteres
      }
    }
  }

  const textoFinal = novoTexto.join(" ");
  return textoFinal;
}

function startGame() {
  caixaInicial.style.display = 'none';
  dificuldades.style.display = 'block';
}

dificuldades.addEventListener('click', function() {
  const e = event.target;
  if(e.id === 'easy' || e.id === 'hard') {
    textoCampo.style.display = 'block'; textoGerado.style.display = 'block';
  }
  //há três dificuldades, iniciante, intermediário e avançado e elas estão ligadas as divs com id btnFacil, btnMedio e btnDificil
  if (e.id === 'easy') {
      
      textoGerado.innerText = gerarFraseAleatoria('easy');

  } else if(e.id === 'hard') {

    textoGerado.innerText = gerarFraseAleatoria('hard');
  }

});

//O campo de digitação é o campo onde o usuário irá digitar o texto que aparece na tela o qual é o textoGerado.innerText
//O texto gerado se vincula ao campo de digitação e verifica se o texto digitado é igual ao texto gerado a cada espaço
campoDigitacao.addEventListener('keyup', function() {
  let texto = textoGerado.innerText;
  let palavraDigitada = campoDigitacao.value;
  //separar o texto gerado em palavras
  let palavras = texto.split(' ');
  if(palavras.length === 0) {fimDeJogo();}
  let palavraAtual = palavras[0];
  //A fim do usuário saber se está digitando corretamente, cada letra certa referente a palavra atual ficará verde e as erradas vermelhas com base nas letras digitadas
  //Aqui o código verifica se a palavra digitada é igual a palavra atual
  palavraAtual = palavraAtual.split('');
  palavraDigitada = palavraDigitada.split('');
  let span = '';
  for(let i = 0; i < palavraAtual.length; i++) {
    if(palavraDigitada[i] === palavraAtual[i]) {
      span += `<span style="color: green">${palavraAtual[i]}</span>`;
    } else {
      span += `<span style="color: red">${palavraAtual[i]}</span>`;
    }
  }
  palavras[0] = span;
  textoGerado.innerHTML = palavras.join(' ');

  //Aqui o código verifica se a palavra digitada é igual a palavra atual
  if(palavraDigitada.join('') === palavraAtual.join('')) {
    palavras.shift();
    palavrasDigitadasCorretamente.push(palavraAtual.join(''));
    campoDigitacao.value = '';
    textoGerado.innerHTML = palavras.join(' ');
  }
});

campoDigitacao.addEventListener('focus', function() {
  if(!cronometro()) {fimDeJogo();}
  //começa a contar o tempo quando o campo de digitação é focado
  tempoTotal = 0;
  setInterval(function() {
    tempoTotal++;
    document.getElementById('WPM').innerText = `WPM: ${calculaWPM(palavrasDigitadasCorretamente.length, tempoTotal)}`;
  }, 1000);
});

function calculaWPM(palavras, tempo) {
  const minutos = tempo / 60;
  const wpm = palavras / minutos;
  //Arredonda o valor para o inteiro mais próximo
  return Math.round(wpm);
}

//função que marca o tempo e a taxa de palavras por minuto
function cronometro() {
  let tempo = 120;
  //exibe o tempo formatado e zera quando chega a zero
  let intervalo = setInterval(function() {
    tempo--;
    let minutos = Math.floor(tempo / 60);
    let segundos = tempo % 60;
    if(segundos < 10) {
      segundos = `0${segundos}`;
    }
    if(minutos < 10) {
      minutos = `0${minutos}`;
    }
    tempoCampo.innerText = `${minutos}:${segundos}`;
    if(tempo === 0) {
      clearInterval(intervalo);
    }
  }, 1000);
  return intervalo;
}

function fimDeJogo() {
  tempoTotal = 0;
  campoDigitacao.disabled = true;
  campoDigitacao.value = '';
  textoGerado.innerHTML = `<h1 style="text-align:center">Fim de jogo!</h1>`;
  tempoCampo.innerText = '00:00';
  document.getElementById('WPM').innerText = `WPM: ${calculaWPM(palavrasDigitadasCorretamente.length, tempoTotal)}`;
}