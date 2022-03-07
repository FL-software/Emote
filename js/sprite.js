class Sprite {
    constructor(x, y, largura, altura) {
        this.x = x
        this.y = y
        this.largura = largura
        this.altura = altura

        this.desenha = function (xCanvas, yCanvas) {
            contexto.drawImage(imagem, this.x, this.y, this.largura, this.altura, xCanvas, yCanvas, this.largura, this.altura)
        }
    }
}

let spriteFundo = new Sprite (0, 0, 600, 600),
spriteBloco = new Sprite (618, 16, 87, 87),
spritePerdeu = new Sprite (603, 478, 397, 358),
spriteJogar = new Sprite (603, 127, 397, 347),
spriteNovo = new Sprite (68, 721, 287, 93),
spriteRecorde = new Sprite (28, 879, 441, 95),
spriteChao = new Sprite (0, 604, 600, 54),
spriteObstaculoVermelho = new Sprite (662, 867, 50, 120),
spriteObstaculoRosa = new Sprite (719, 867, 50, 120),
spriteObstaculoAzul = new Sprite (779, 867, 50, 120),
spriteObstaculoVerde = new Sprite (839, 867, 50, 120),
spriteObstaculoAmarelo = new Sprite (898, 867, 50, 120)