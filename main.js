let caixaInicial = document.getElementById('caixaDeTexto');
let dificuldades = document.getElementById('dificuldades');
let start = document.getElementById('btnIniciar');
let textoCampo = document.getElementById('texto');

function startGame() {
  caixaInicial.style.display = 'none';
  dificuldades.style.display = 'block';
}

dificuldades.addEventListener('click', function() {
  const e = event.target;
  let configuracoes;
  const prompt = 'Escreva um parágrafo aleatório';
  if(e.id === 'btnFacil' || e.id === 'btnMedio' || e.id === 'btnDificil') {textoCampo.style.display = 'block';}
  //há três dificuldades, iniciante, intermediário e avançado e elas estão ligadas as divs com id btnFacil, btnMedio e btnDificil
    if (e.id === 'btnFacil') {
        // tempo = 180;
        configuracoes = {
            tom: 'aleatório',
            comprimento: 100,
            estilo: 'descritivo',
          };

        console.log('Iniciante');
    } else if (e.id === 'btnMedio') {
        configuracoes = {
            tom: 'aleatório',
            comprimento: 500,
            estilo: 'descritivo',
          };
        console.log('Intermediário');
    } else if (e.id === 'btnDificil') {
        configuracoes = {
            tom: 'aleatório',
            comprimento: 1000,
            estilo: 'descritivo',
          };

        console.log('Avançado');
    }

    const texto = gerarTexto(prompt, configuracoes).then(texto => {
        document.getElementById('resultado').innerHTML = texto;
      });
    iniciarTeste(texto, tempo);

});

function iniciarTeste(texto, tempo) {
    let caixaTexto = document.getElementById('textoGerado');
    let contador = document.getElementById('contador');
    let tempoRestante = tempo;
    let intervalo = setInterval(() => {
        tempoRestante--;
        contador.innerHTML = tempoRestante;
        if (tempoRestante === 0) {
        clearInterval(intervalo);
        caixaTexto.style.display = 'none';
        }
    }, 1000);
    caixaTexto.style.display = 'block';
    caixaTexto.innerHTML = texto;
    }

async function gerarTexto(prompt, configuracoes) {
    const resposta = await fetch('https://api.textcortex.com/generate', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + 'gAAAAABlyrZbpI3oBl7DsihEWQaPmtDTl-wnEr3Y-ho_ulHZEZAQn4k8a67MgWZOmb4tDrzeNXT-HXoB5RoyJ6lONC8TdGQWwvy4NOBqsJX13jhzG18h_f30VfpIDegksm3UWIKRAUOu',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language: 'pt-br',
        prompt: prompt,
        ...configuracoes,
      }),
    });
  
    const data = await resposta.json();
    return data.text;
  }