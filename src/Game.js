class Game{
    scripts = new Scripts();
    map     = new GameMap(this.scripts);
    hero    = new Hero(this.scripts);
    enemy   = new Enemy(this, this.scripts);
    Booster = new Booster(this.scripts, this.hero)

    /**
     * Иницилизация игры.
     * Сначал очищает карту, далее рисует карту после чего начинает спавн игрока, врагов и бустеров
     * После каждого нажатия клавиши проверят наступил ли игрок на меч или хилку
     */
    init = () => {
        this.map.clear()
        this.map.render()
        this.hero.spawn()
        this.enemy.spawn()
        this.Booster.spawn('sword')
        this.Booster.spawn('potion')
        
        document.addEventListener("keyup", event => {
            switch (event.code){
                case "KeyA":
                    this.hero.goLeft("P"); 
                    this.Booster.check(); break;
                case "KeyD":
                    this.hero.goRight("P"); 
                    this.Booster.check(); break;
                case "KeyW":
                    this.hero.goUp("P"); 
                    this.Booster.check(); break;
                case "KeyS":
                    this.hero.goDown("P"); 
                    this.Booster.check(); break;
                case "Space":
                    console.log(this.hero.damage, this.hero.health)
                    this.hero.attack("P", this.hero.damage); this.hero.isWon(); break;
            }
        })
    }

    /**
     * Рисует окно проигриша
     */
    gameOver = () => {
        const field = document.querySelector('.field')
        field.insertAdjacentHTML("beforeend", `<div class="game gameOver"><h1>Игра окончена</h1><button id='reloadBtn'>Начать заново</button></div>`)
    }

    /**
     * Рисует окно победы
     */
    win = () => {
        const field = document.querySelector('.field')
        field.insertAdjacentHTML("beforeend", `<div class="game gameWin"><h1>Вы победили всех врагов!</h1><button id='reloadBtn'>Начать заново</button></div>`)
    }
}