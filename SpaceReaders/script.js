const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')

class Entidade {
    constructor(x, y, largura, altura, cor) {
        this.x = x
        this.y = y
        this.largura = largura
        this.altura = altura
        this.cor = cor
    }


    desenhar() {
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
}

class Jogador extends Entidade {
    constructor(x, y, largura, altura, cor, velocidade) {
        super(x, y, largura, altura, cor)
        this.velocidade = velocidade
        
    }

    mover(direcao) {
        if (direcao == 'esquerda' && this.x > 0) {
            this.x -= this.velocidade
        } else if (direcao == 'direita' && this.x + this.largura < canvas.width) {
            this.x += this.velocidade
        }
    }
}

class Projetil extends Entidade {
    constructor(x, y, largura, altura, cor, velocidade) {
        super(x, y, largura, altura, cor)
        this.velocidade = velocidade
    }

    atualizar() {
        this.y -= this.velocidade
    }
}
class Obstaculo{
    constructor(x,y,largura,altura,cor){
        this.x = x,
        this.y = y,
        this.largura = largura,
        this.altura = altura,
        this.cor = cor
    }
    desenhar(){
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
}


const obstaculo = new Entidade(50,50,50,50,'red')


function loop(){
    ctx.clearRect(0,0,canvas.width, canvas.height)
    objeto_na_tela.desenhar()
    aliens.desenhar()
    aliens.atualizar()

    requestAnimationFrame(loop)
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    jogador.desenhar()

    projeteis.forEach((projetil, index) => {
        projetil.atualizar()
        projetil.desenhar()
        if (projetil.y < 0) {
            projeteis.splice(index, 1)
        }
    })

  

    requestAnimationFrame(loop)
}

document.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowLeft') {
        jogador.mover('esquerda')
    } else if (event.key == 'ArrowRight') {
        jogador.mover('direita')
    } else if (event.key == ' ') {
        projeteis.push(new Projetil(jogador.x + jogador.largura / 2 - 5, jogador.y, 10, 20, 'blue', 7))
    }
})

const jogador = new Jogador(canvas.width / 2 - 25, canvas.height - 60, 50, 50, 'purple', 5)
const aliens = []
const projeteis = []
loop()

//quase desistindo
//desisti