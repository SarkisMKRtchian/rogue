class Enemy extends Character{
    health = 100;
    damage = 10;
    game;

    /**
     * 
     * @param {Game} game 
     * @param {Scripts} scripts 
     */
    constructor(game, scripts){
        super(scripts)
        this.game = game; 
    }

    /**
     * Спавнит врагов в слуйчаных местах 10шт
     */
    spawn = () => {
        let i = 0; 
        while (i < 10){
            this.init('enemy', this.health, i); i++;
        }

        this.searchHero()
    }


    /**
     * Передвижение врага. Каждую секунду проходмится по всем врагам и установливает случайное направление на 1 клетку. После перехода делает атаку
     * и проверят - если игрока больше нет на поле - заончивает игру
     */
    searchHero = () => {
        const direction = {
            1: this.goLeft,
            2: this.goRight,
            3: this.goDown,
            4: this.goUp  
        };
        const interval = setInterval(() => {
            if(this.isWon()){
                this.game.win();
                clearInterval(interval); return;
            }

            const enemys = document.querySelectorAll('.tileE')
            enemys.forEach(enemy => {
                const randomDir = this.scripts.randomInt(1, 4);
                direction[randomDir]('enemy', enemy.getAttribute('data-type'));
                this.attack("E", this.damage, enemy.getAttribute('data-type'));
                if(!this.isLive()) {
                    this.game.gameOver()
                    clearInterval(interval); return;
                }
            })
        }, 1000)
    }
}