class Booster extends Character{
    hero;

    /**
     * 
     * @param {Scripts} scripts 
     * @param {Hero} hero 
     */
    constructor(scripts, hero){
        super(scripts);
        this.hero = hero;
    }
    
    /**
     * Спавнит хилки/мечи в случайных местах карты 5 шт
     * @param {"potion" | "sword"} type 
     */
    spawn = (type) => {
        let i = 0; 
        while (i < 5){
            this.init(type, this.health, i); i++;
        }
    }

    /**
     * Проверяет если игрок наступил на меч/хилку то дает сотвественый эффект
     */
    check = () => {
        const {charcter, pos} = this.getPos("P");
        const sword = document.querySelector(`.tileSW[data-pos="${pos.x}, ${pos.y}"]`);
        const hp    = document.querySelector(`.tileHP[data-pos="${pos.x}, ${pos.y}"]`);

        if(!sword && !hp) return;

        if(hp) {
            this.hero.heal();
            charcter.setAttribute('data-health', 100);
            charcter.querySelector('.health').setAttribute('style', '100%');
            hp.remove()
        }
        
        if(sword) {
            this.hero.boostDamage();
            sword.remove()
        }
    }
}