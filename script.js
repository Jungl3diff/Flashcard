// =========================================================
// VERDADEIRA OU FALSA?
// Flashcards de notícias
// =========================================================


// =========================================================
// ELEMENTOS DO DOM
// =========================================================

const flashcard = document.getElementById("flashcard");
const flashcardTrigger = document.getElementById("flashcard-trigger");

const flashcardAnswer = document.getElementById("flashcard-answer");

const categoria = document.getElementById("card-category");
const pergunta = document.getElementById("card-question");

const resultado = document.getElementById("card-result");
const explicacao = document.getElementById("card-explanation");

const anterior = document.getElementById("anterior");
const proximo = document.getElementById("proximo");

const currentCard = document.getElementById("current-card");
const totalCards = document.getElementById("total-cards");


// =========================================================
// VALIDAÇÃO DO DOM
// =========================================================

const elementosObrigatorios = [
    flashcard,
    flashcardTrigger,
    flashcardAnswer,
    categoria,
    pergunta,
    resultado,
    explicacao,
    anterior,
    proximo,
    currentCard,
    totalCards
];


const domValido = elementosObrigatorios.every(
    elemento => elemento instanceof HTMLElement
);


if (!domValido) {

    console.error(
        "Flashcards: um ou mais elementos obrigatórios não foram encontrados no DOM."
    );

    throw new Error(
        "Não foi possível inicializar os flashcards."
    );
}


// =========================================================
// BANCO DE NOTÍCIAS
// =========================================================

const noticias = [

    {
        categoria: "Amazônia",

        pergunta:
            "Vídeo de motoqueiros carregando madeira mostra um roubo de madeira na Amazônia?",

        resposta:
            "A informação é falsa. Segundo a Agência Lupa, o vídeo não foi gravado na Amazônia. As imagens foram registradas em 6 de agosto, em Davao City, nas Filipinas.",

        resultado: "FALSA ",

        tipo: "falsa"
    },


    {
        categoria: "Amazônia",

        pergunta:
            "Antropólogo detido na Amazônia é esquerdista e acredita que o governo é do PT?",

        resposta:
            "A informação é falsa. Segundo a Agência Lupa, a pessoa que aparece no vídeo é o antropólogo Eduardo Luz, apoiador do presidente Jair Bolsonaro e crítico de ambientalistas e da esquerda em geral.",

        resultado: "FALSA ",

        tipo: "falsa"
    },


    {
        categoria: "Queimadas",

        pergunta:
            "É verdade que o número de focos de queimadas na Amazônia é o menor desde 1998?",

        resposta:
            "Essa informação precisa ser conferida com os dados apresentados pela Agência Lupa. A classificação e a explicação serão adicionadas após a confirmação da matéria original.",

        resultado: "A CONFERIR ",

        tipo: "conferir"
    },


    {
        categoria: "Clima",

        pergunta:
            "El Niño: o Brasil deve ter ao menos seis ondas de calor até o fim do ano?",

        resposta:
            "Essa informação precisa ser conferida na fonte original da Agência Lupa antes de ser classificada como verdadeira ou falsa.",

        resultado: "A CONFERIR ",

        tipo: "conferir"
    }

];


// =========================================================
// ESTADO DA APLICAÇÃO
// =========================================================

let indiceAtual = 0;
let mostrandoResposta = false;


// =========================================================
// MOSTRAR FRENTE DO CARD
// =========================================================

function mostrarFrente() {

    flashcardAnswer.hidden = true;

    flashcardTrigger.setAttribute(
        "aria-expanded",
        "false"
    );

    mostrandoResposta = false;
}


// =========================================================
// MOSTRAR VERSO DO CARD
// =========================================================

function mostrarVerso() {

    flashcardAnswer.hidden = false;

    flashcardTrigger.setAttribute(
        "aria-expanded",
        "true"
    );

    mostrandoResposta = true;
}


// =========================================================
// VIRAR O CARD
// =========================================================

function alternarCard() {

    if (mostrandoResposta) {
        mostrarFrente();
    } else {
        mostrarVerso();
    }
}


// =========================================================
// ATUALIZAR CONTADOR
// =========================================================

function atualizarContador() {

    currentCard.textContent =
        String(indiceAtual + 1);

    totalCards.textContent =
        String(noticias.length);
}


// =========================================================
// ATUALIZAR RESULTADO
// =========================================================

function atualizarResultado(noticia) {

    resultado.textContent =
        noticia.resultado;


    resultado.className =
        "flashcard__result";


    resultado.classList.add(
        `flashcard__result--${noticia.tipo}`
    );
}


// =========================================================
// MOSTRAR FLASHCARD
// =========================================================

function mostrarFlashcard() {

    const noticia = noticias[indiceAtual];


    if (!noticia) {

        console.error(
            "Flashcards: notícia não encontrada.",
            {
                indice: indiceAtual
            }
        );

        return;
    }


    // -----------------------------------------
    // Atualiza frente
    // -----------------------------------------

    categoria.textContent =
        noticia.categoria;

    pergunta.textContent =
        noticia.pergunta;


    // -----------------------------------------
    // Atualiza verso
    // -----------------------------------------

    atualizarResultado(noticia);

    explicacao.textContent =
        noticia.resposta;


    // -----------------------------------------
    // Atualiza contador
    // -----------------------------------------

    atualizarContador();


    // -----------------------------------------
    // Sempre inicia mostrando a pergunta
    // -----------------------------------------

    mostrarFrente();
}


// =========================================================
// PRÓXIMO FLASHCARD
// =========================================================

function proximoFlashcard() {

    indiceAtual++;

    if (indiceAtual >= noticias.length) {
        indiceAtual = 0;
    }

    mostrarFlashcard();

    flashcard.focus({
        preventScroll: true
    });
}


// =========================================================
// FLASHCARD ANTERIOR
// =========================================================

function flashcardAnterior() {

    indiceAtual--;

    if (indiceAtual < 0) {
        indiceAtual = noticias.length - 1;
    }

    mostrarFlashcard();

    flashcard.focus({
        preventScroll: true
    });
}


// =========================================================
// EVENTO — BOTÃO DO FLASHCARD
// =========================================================

flashcardTrigger.addEventListener(
    "click",
    alternarCard
);


// =========================================================
// EVENTO — PRÓXIMO
// =========================================================

proximo.addEventListener(
    "click",
    proximoFlashcard
);


// =========================================================
// EVENTO — ANTERIOR
// =========================================================

anterior.addEventListener(
    "click",
    flashcardAnterior
);


// =========================================================
// ATALHOS DO TECLADO
// =========================================================

document.addEventListener(
    "keydown",
    evento => {

        /*
            Evita que as setas interfiram quando
            o usuário estiver digitando em um campo.
        */

        const elementoAtivo =
            document.activeElement;

        const estaDigitando =
            elementoAtivo instanceof HTMLInputElement ||
            elementoAtivo instanceof HTMLTextAreaElement ||
            elementoAtivo instanceof HTMLSelectElement;


        if (estaDigitando) {
            return;
        }


        // -------------------------------------
        // Seta direita → próximo
        // -------------------------------------

        if (evento.key === "ArrowRight") {

            evento.preventDefault();

            proximoFlashcard();
        }


        // -------------------------------------
        // Seta esquerda → anterior
        // -------------------------------------

        if (evento.key === "ArrowLeft") {

            evento.preventDefault();

            flashcardAnterior();
        }


        // -------------------------------------
        // Escape → fecha resposta
        // -------------------------------------

        if (
            evento.key === "Escape" &&
            mostrandoResposta
        ) {

            evento.preventDefault();

            mostrarFrente();
        }

    }
);


// =========================================================
// INICIALIZAÇÃO
// =========================================================

if (noticias.length === 0) {

    console.error(
        "Flashcards: o banco de notícias está vazio."
    );

    proximo.disabled = true;
    anterior.disabled = true;

} else {

    mostrarFlashcard();
}