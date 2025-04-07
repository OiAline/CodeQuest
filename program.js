//PARTE 1: Lista de perguntas e respostas

const perguntas = [
  {
    pergunta: "O que te chama mais atenção?",
    respostas: [
      { opcao: "A beleza e a organização de um site ou aplicativo.", areas: ["Frontend"], pontos: 1 },
      { opcao: "O jeito como um sistema funciona sem erros...", areas: ["Backend"], pontos: 1 },
      { opcao: "A praticidade de aplicativos do meu celular.", areas: ["Mobile"], pontos: 1 },
      { opcao: "A ideia de máquinas aprendendo coisas sozinhas...", areas: ["IA"], pontos: 1 },
      { opcao: "A diversão e a história de um jogo que te prende.", areas: ["Gamedev"], pontos: 1 },
    ]
  },
  {
    pergunta: "Quando você tem um desafio, você geralmente tenta resolver de qual jeito?",
    respostas: [
      { "opcao": "Deixando tudo bem arrumado e fácil de entender para qualquer pessoa.", areas: ["Frontend"], pontos: 1 },
      { "opcao": "Procurando a causa exata do problema para consertar de vez.", areas: ["Backend"], pontos: 1 },
      { "opcao": "Pensando em várias soluções diferentes e testando qual funciona melhor.", areas: ["Mobile"], pontos: 1 },
      { "opcao": "Usando muitas informações para descobrir a melhor resposta ou solução.", areas: ["IA"], pontos: 1 },
      { "opcao": "Criando algo totalmente novo e diferente do que já existe.", areas: ["Gamedev"], pontos: 1 }
    ]
  },
  {
    pergunta: "No seu dia a dia, o que você mais gosta de fazer?",
    respostas: [
      { "opcao": "Cuidar para que as coisas fiquem bonitas e bem apresentadas.", areas: ["Frontend"], pontos: 1 },
      { "opcao": "Fazer com que processos complicados se tornem mais simples e eficientes.", areas: ["Backend"], pontos: 1 },
      { "opcao": "Usar a tecnologia para facilitar a vida das pessoas em qualquer lugar.", areas: ["Mobile"], pontos: 1 },
      { "opcao": "Tentar entender como as coisas funcionam e encontrar padrões escondidos.", areas: ["IA"], pontos: 1 },
      { "opcao": "Imaginar histórias, personagens e mundos novos.", areas: ["Gamedev"], pontos: 1 }
    ]
  },
  {
    pergunta: "O que você acha mais legal em um produto digital (site, aplicativo, jogo)?",
    respostas: [
      { "opcao": "O visual atraente e a facilidade de navegar.", areas: ["Frontend"], pontos: 1 },
      { "opcao": "A segurança e a rapidez com que ele funciona.", areas: ["Backend"], pontos: 1 },
      { "opcao": "A capacidade de fazer coisas úteis no seu celular a qualquer hora.", areas: ["Mobile"], pontos: 1 },
      { "opcao": "A inteligência por trás das funcionalidades, como recomendações ou previsões.", areas: ["IA"], pontos: 1 },
      { "opcao": "A experiência divertida e envolvente que ele proporciona.", areas: ["Gamedev"], pontos: 1 }
    ]
  },
  {
    pergunta: "Se você fosse construir algo para as pessoas usarem, o que te daria mais satisfação?",
    respostas: [
      { "opcao": "Criar uma interface que seja um prazer de usar.", areas: ["Frontend"], pontos: 1 },
      { "opcao": "Construir um sistema que funcione sem falhas e resolva problemas importantes.", areas: ["Backend"], pontos: 1 },
      { "opcao": "Desenvolver um aplicativo que as pessoas usem todos os dias e que faça diferença na vida delas.", areas: ["Mobile"], pontos: 1 },
      { "opcao": "Criar um programa que aprenda com o tempo e ofereça soluções cada vez melhores.", areas: ["IA"], pontos: 1 },
      { "opcao": "Fazer um jogo que as pessoas adorem jogar e que as faça se divertir muito.", areas: ["Gamedev"], pontos: 1 }
    ]
  }
];

// PARTE 2: Pegando os elementos do HTML
const perguntaElemento = document.querySelector(".pergunta");
const respostasElemento = document.querySelector(".respostas");
const progressoElemento = document.querySelector(".progresso");
const textoFinal = document.querySelector(".fim span");
const conteudo = document.querySelector(".conteudo");
const conteudoFinal = document.querySelector(".fim");

// Inicializa a pontuação das áreas
let pontuacaoAreas = {
    "Frontend": 0,
    "Backend": 0,
    "Mobile": 0,
    "IA": 0,
    "Gamedev": 0,
};

// PARTE 3: Variáveis para controle do jogo
let indiceAtual = 0; // Índice da pergunta atual

//PARTE 4: Função para carregar uma nova pergunta
function carregarPergunta() {
    progressoElemento.innerHTML = `${indiceAtual + 1}/${perguntas.length}`;
    const perguntaAtual = perguntas[indiceAtual];
    perguntaElemento.innerHTML = perguntaAtual.pergunta;
    respostasElemento.innerHTML = "";
  
    for (let i = 0; i < perguntaAtual.respostas.length; i++) {
      const resposta = perguntaAtual.respostas[i];
      const botao = document.createElement("button");
      botao.classList.add("botao-resposta");
      botao.innerText = resposta.opcao;
      botao.onclick = function () {
        if (resposta.areas) {
          resposta.areas.forEach(area => {
            pontuacaoAreas[area] += resposta.pontos;
          });
        }
  
        indiceAtual++;
  
        if (indiceAtual < perguntas.length) {
          carregarPergunta();
        } else {
          finalizarJogo();
        }
      };
      respostasElemento.appendChild(botao);
    }
  }

// PARTE 5: Função para mostrar a tela final
function finalizarJogo() {
    let resultadoTexto = "De acordo com as suas preferências, uma área que você poderia se identificar é: ";
    let maiorPontuacao = -1;
    let areasMaisPontuadas = [];
  
    for (const area in pontuacaoAreas) {
      if (pontuacaoAreas[area] > maiorPontuacao) {
        maiorPontuacao = pontuacaoAreas[area];
        areasMaisPontuadas = [area];
      } else if (pontuacaoAreas[area] === maiorPontuacao && maiorPontuacao > -1) {
        areasMaisPontuadas.push(area);
      }
    }
  
    if (areasMaisPontuadas.length === 1) {
      resultadoTexto += traduzirArea(areasMaisPontuadas[0]);
    } else if (areasMaisPontuadas.length > 1) {
      const ultimoArea = areasMaisPontuadas.pop();
      resultadoTexto += areasMaisPontuadas.map(area => traduzirArea(area)).join(", ") + " e " + traduzirArea(ultimoArea);
    } else {
      resultadoTexto = "Não foi possível identificar uma área com base nas suas respostas.";
    }
  
    textoFinal.innerHTML = resultadoTexto;
    conteudo.style.display = "none";
    conteudoFinal.style.display = "flex";
  }
  
  // Função auxiliar para traduzir o nome da área
  function traduzirArea(area) {
    switch (area) {
      case "Frontend":
        return "Desenvolvimento Front-end, que trabalha com interfaces visuais";
      case "Backend":
        return "Desenvolvimento Back-end, que trabalha com lógica e sistemas";
      case "Mobile":
        return "Desenvolvimento Mobile, que trabalha com aplicativos para celular";
      case "IA":
        return "Inteligência Artificial e Machine Learning";
      case "Gamedev":
        return "Desenvolvimento de Jogos";
      default:
        return area;
    }
  }
  
  // PARTE 6: Iniciando o jogo pela primeira vez
  carregarPergunta();