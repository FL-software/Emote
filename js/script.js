//variáveis do jogo
let canvas, contexto, ALTURA, LARGURA, frames = 0

function clique(evento) {

}

function principal() {
    ALTURA = window.innerHeight
    LARGURA = window.innerWidth

    if (LARGURA >= 500) {
        LARGURA = 600
        ALTURA = 600
    }

    canvas = document.createElement("canvas")
    canvas.width = LARGURA
    canvas.height = ALTURA
    canvas.style.border = "1px solid #000"

    contexto = canvas.getContext("2d")

    document.body.appendChild(canvas)

    document.addEventListener("mousedown", clique)
}

function roda() {

}

function atualiza() {

}

function desenha() {

}

//inicializa o jogo
principal()