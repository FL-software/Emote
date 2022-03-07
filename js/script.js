//variáveis do jogo
let canvas, contexto, ALTURA, LARGURA, LARGURAMAXIMA = 500, ALTURAPADRAO = 600, LARGURAPADRAO = 600,
MAXIMOPULOS = 3, velocidade = 6, estadoAtual, recorde, imagem, //frames = 0,
pontosParaNovaFase = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], faseAtual = 0, 
labelNovaFase = {
    texto: "",
    opacidade: 0.0,
    fonte: "50px Arial",

    aparece(tempo) {
        console.log(this.opacidade)
        let aparecendo = setInterval(function() {
            if (labelNovaFase.opacidade < 1.0){
                labelNovaFase.opacidade += 0.01
            }
            else {
                clearInterval(aparecendo)
            }
        }, 10 * tempo)
    },

    some(tempo) {
        let sumindo = setInterval(function() {
            if (labelNovaFase.opacidade > 0.0){
                labelNovaFase.opacidade -= 0.01
            }
            else {
                clearInterval(sumindo)
            }
        }, 10 * tempo)
    },

    desenha() {
        contexto.fillStyle = "rgba(0, 0, 0," + this.opacidade + ")",
        contexto.font = this.fonte
        contexto.fillText(this.texto, LARGURA / 2 - contexto.measureText(this.texto).width / 2, ALTURA / 3)
    }
} 
estados = {
    jogar: 0,
    jogando: 1,
    perdeu: 2
},
fundo = {
    //cor: "#80daff",

    desenha() {
        //contexto.fillStyle = this.cor
        //contexto.fillRect(0, 0, LARGURA, ALTURA)
        spriteFundo.desenha(0, 0)
    }
},
inicio = {
    //cor: "green",
    //altura: 100,
    //largura: 100,

    desenha() {
        //contexto.fillStyle = this.cor
        //contexto.fillRect((LARGURA / 2) - (this.largura / 2), ALTURA / 2 - (this.altura / 2), this.largura , this.altura)
        spriteJogar.desenha((LARGURA / 2) - (spriteJogar.largura / 2), (ALTURA / 2) - (spriteJogar.altura / 2))
    }
},
fim = {
    //cor: "red",
    //altura: 100,
    //largura: 100,
    corPontuacao: "#fff",
    xPontuacao: 375, //-13,
    yPontuacao: 390, //19,
    xNovoRecorde: -180, //-160,
    yNovoRecorde: 30, //-65,
    xNovoPontuacao: 420,
    yNovoPontuacao: 500,
    xRecorde: 415, //-129,

    desenha() {
        //contexto.fillStyle = this.cor
        //contexto.fillRect((LARGURA / 2) - (this.largura / 2), ALTURA / 2 - (this.altura / 2), this.largura , this.altura)
        //contexto.save()
        //contexto.translate(LARGURA / 2, ALTURA / 2)
        //contexto.fillStyle = pontuacao.cor

        //if (bloco.pontos > recorde) {
        //    contexto.fillText("Novo Recorde!", this.xNovoRecorde, this.yNovoRecorde)
        //}
        //else if (recorde < 10) {
        //    contexto.fillText("Recorde: " + recorde, this.xRecorde, this.yNovoRecorde)
        //}
        //else if (recorde < 100) {
        //    contexto.fillText("Recorde: " + recorde, this.xRecorde + this.xPontuacao, this.yNovoRecorde)
        //}
        //else {
        //    contexto.fillText("Recorde: " + recorde, this.xRecorde + (2 * this.xPontuacao), this.yNovoRecorde)
        //}

        //if (bloco.pontos < 10) {
        //    contexto.fillText(bloco.pontos, this.xPontuacao, this.yPontuacao)
        //}
        //else if (bloco.pontos < 100) {
        //    contexto.fillText(bloco.pontos, this.xPontuacao * 2, this.yPontuacao)
        //}
        //else {
        //    contexto.fillText(bloco.pontos, this.xPontuacao * 3, this.yPontuacao)
        //}

        //contexto.restore()

        spritePerdeu.desenha((LARGURA / 2) - (spritePerdeu.largura / 2), (ALTURA / 2) - (spritePerdeu.altura / 2) - (spriteRecorde.altura / 2))

        spriteRecorde.desenha((LARGURA / 2) - (spriteRecorde.largura / 2), (ALTURA / 2) - (spriteRecorde.altura / 2) + (spritePerdeu.altura / 2))
        
        contexto.fillStyle = this.corPontuacao

        if (bloco.pontos > recorde) {
            spriteNovo.desenha((LARGURA / 2) + this.xNovoRecorde, (ALTURA / 2) + this.yNovoRecorde)
            contexto.fillText(bloco.pontos, this.xNovoPontuacao, this.yNovoPontuacao)
        }
        else {
            contexto.fillText(bloco.pontos, this.xPontuacao, this.yPontuacao)
            contexto.fillText(recorde, this.xRecorde, this.yNovoPontuacao)
        }
    }
},
pontuacao = {
    cor: "#fff",
    fonte: "50px Arial",
    x: 38,
    y: 60,

    desenha() {
        contexto.fillStyle = this.cor
        contexto.font = this.fonte
        contexto.fillText("Pontos: " + bloco.pontos, this.x, this.y)
    }
},
vidas = {
    cor: "#fff",
    fonte: "50px Arial",
    x: 380,
    y: 60,

    desenha() {
        contexto.fillStyle = this.cor
        contexto.font = this.fonte
        contexto.fillText("Vidas: " + bloco.vidas, this.x, this.y)
    }
},
pulos = {
    cor: "#fff",
    fonte: "50px Arial",
    x: 380,
    y: 100,

    desenha() {
        contexto.fillStyle = this.cor
        contexto.font = this.fonte
        contexto.fillText("Pulos: " + (MAXIMOPULOS - bloco.quantidadePulos), this.x, this.y)
    }
},
chao = {
    y: 550,
    x: 0,
    //altura: 50,
    //cor: "#e8da78",
    limite: 30,

    atualiza() {
        this.x -= velocidade

        if (this.x <= -this.limite){
            this.x += this.limite
        }
    },

    desenha() { 
        //contexto.fillStyle = this.cor
        //contexto.fillRect(0, this.y, LARGURA, this.altura)
        spriteChao.desenha(this.x, this.y)
        spriteChao.desenha(this.x + spriteChao.largura, this.y)
    }
},
bloco = {
    x: 50,
    y: 0,
    altura: spriteBloco.altura,
    largura: spriteBloco.largura,
    //cor: "#ff9239",
    gravidade: 1.5,
    velocidade: 0,
    forcaDoPulo: 23.6,
    quantidadePulos: 0,
    pontos: 0,
    rotacao: 0,
    vidas: 3,
    colidindo: false,

    pula() { 
        if (this.quantidadePulos < MAXIMOPULOS) {
            this.velocidade = -this.forcaDoPulo
            this.quantidadePulos++
        }
    },

    reset() {        
        this.velocidade = 0
        this.y = 0
        this.pontos = 0
        this.vidas = 3
        this.gravidade = 1.5
        velocidade = 6
        faseAtual = 0
    },

    atualiza() {
        this.velocidade += this.gravidade
        this.y += this.velocidade
        this.rotacao += Math.PI / 180 * velocidade

        if (this.y >= chao.y - this.altura 
            && estadoAtual != estados.perdeu) {
            this.y = chao.y - this.altura
            this.quantidadePulos = 0
            this.velocidade = 0
        }
    },

    desenha() { 
        //contexto.fillStyle = this.cor
        //contexto.fillRect(this.x, this.y, this.largura, this.altura)
        contexto.save()

        //operações para rotacionar
        contexto.translate(this.x + this.largura / 2, this.y + this.altura /2)
        contexto.rotate(this.rotacao);

        spriteBloco.desenha(-this.largura / 2, -this.altura / 2)

        contexto.restore()
    }
},
obstaculos = {
    itens: [],
    //cores: ["#ffbc1c", "#ff1c1c", "#ff85e1", "#ff85e1", "#52a7ff", "#78ff5d"],
    sprites: [spriteObstaculoVermelho, spriteObstaculoRosa, spriteObstaculoAzul, spriteObstaculoVerde, spriteObstaculoAmarelo],
    //larguraMinima: 30,
    alturaMinima: 20, //30,
    //larguraVariacao: 20,
    alturaVariacao: 100, //120,
    tempoInsere: 0,
    tempoMinimo: 40,
    tempoVariacao: 20,
    pontuado: false,

    insere() {
        this.itens.push({
            x: LARGURA,
            y: chao.y - Math.floor(this.alturaMinima + Math.random() * this.alturaVariacao),
            //largura: this.larguraMinima + Math.floor(this.larguraVariacao * Math.random()),
            //altura: this.alturaMinima + Math.floor(this.alturaVariacao * Math.random()),
            //cor: this.cores[Math.floor(this.cores.length * Math.random())]
            largura: 50,
            sprite: this.sprites[Math.floor(this.sprites.length * Math.random())]
        })

        this.tempoInsere = this.tempoMinimo + Math.floor(this.tempoVariacao * Math.random())
    },

    atualiza() {
        if (this.tempoInsere == 0) {
            this.insere()
        }
        else {
            this.tempoInsere--
        }
        
        for (let i = 0, tam = this.itens.length; i < tam; i++) {
            let obstaculo = this.itens[i]

            obstaculo.x -= velocidade

            console.log(bloco.colidindo )
            console.log(obstaculo.x)
            console.log(bloco.x)
            console.log(bloco.largura)
            console.log(obstaculo.largura)
            console.log(obstaculo.y)
            console.log(bloco.y)
            console.log(bloco.altura)

            if (!bloco.colidindo 
                && obstaculo.x <= bloco.x + bloco.largura
                && bloco.x <= obstaculo.x + obstaculo.largura 
                //&& chao.y  + obstaculo.altura <= bloco.y - bloco.altura) {
                && obstaculo.y <= bloco.y + bloco.altura) {
                    bloco.colidindo = true

                    setTimeout(function () {
                        bloco.colidindo = false;
                    }, 500)

                    if (bloco.vidas > 1){
                        bloco.vidas--
                    }
                    else {
                        bloco.vidas = 0

                        estadoAtual = estados.perdeu
                    }
            }
            else if (!obstaculo.pontuado 
                && obstaculo.x <= 0){
                bloco.pontos++
                obstaculo.pontuado = true

                if (faseAtual < pontosParaNovaFase.length 
                    && bloco.pontos == pontosParaNovaFase[faseAtual]) {
                    passarDeFase()
                }
            }
            else if (obstaculo.x <= -obstaculo.largura) {
                this.itens.splice(i, 1)

                tam--
                i--
            }
        }
    },

    limpa() {
        this.itens = []
    },

    desenha() {
        for (let i = 0; i < this.itens.length; i++) {
            let obstaculo = this.itens[i]

            //contexto.fillStyle = obstaculo.cor
            //contexto.fillRect(obstaculo.x, chao.y - obstaculo.altura, obstaculo.largura, obstaculo.altura)
            obstaculo.sprite.desenha(obstaculo.x, obstaculo.y)
        }
    }
}

function clique() {
    switch (estadoAtual) {
        case estados.jogando: {
            bloco.pula()
            break
        }
        case estados.jogar: {
            estadoAtual = estados.jogando
            break
        }
        case estados.perdeu: {
            if (bloco.y >= ALTURA) {
                estadoAtual = estados.jogar
                obstaculos.limpa()                

                if (bloco.pontos > recorde) {
                    localStorage.setItem("recorde", bloco.pontos)

                    recorde = bloco.pontos
                }
                
                bloco.reset()
            }            
            break
        }
    } 
}

function passarDeFase() {
    velocidade++
    faseAtual++
    bloco.vidas++

    if (faseAtual > 3) {
        bloco.gravidade += 0.5
    }

    labelNovaFase.texto = "Level: " + faseAtual;
    labelNovaFase.aparece(0.4)

    setTimeout(function() {
        labelNovaFase.some(0.4)
    }, 800)
}

function principal() {
    ALTURA = window.innerHeight
    LARGURA = window.innerWidth

    if (LARGURA >= LARGURAMAXIMA) {
        LARGURA = LARGURAPADRAO
        ALTURA = ALTURAPADRAO
    }

    canvas = document.createElement("canvas")

    canvas.width = LARGURA
    canvas.height = ALTURA
    canvas.style.border = "1px solid #000"

    contexto = canvas.getContext("2d")

    document.body.appendChild(canvas)
    document.addEventListener("mousedown", clique)

    estadoAtual = estados.jogar
    recorde = localStorage.getItem("recorde")

    if (!recorde) {
        recorde = 0
    }

    imagem = new Image()
    imagem.src = "img/sprite.png"

    roda()
}

function roda() {
    atualiza()
    desenha()

    window.requestAnimationFrame(roda)
}

function atualiza() {
    //frames++

    switch (estadoAtual) {
        case estados.jogando: {
            obstaculos.atualiza()
            break
        }
    } 
    
    chao.atualiza()
    bloco.atualiza()
}

function desenha() {
    fundo.desenha()
    pontuacao.desenha()
    pulos.desenha()
    vidas.desenha()
    bloco.desenha()     
    labelNovaFase.desenha()

    switch (estadoAtual) {
        case estados.jogar: {
            inicio.desenha()
            break
        }
        case estados.perdeu: {
            fim.desenha()
            break
        }
        case estados.jogando: {
            obstaculos.desenha()
            break
        }
    }

    chao.desenha()
}

//inicializa o jogo
principal()