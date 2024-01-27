class Character{
    scripts;

    /**
     * 
     * @param {Scripts} scripts 
     */
    constructor(scripts){
        this.scripts = scripts;
    }

    /**
     * Иницализация(отрисовка) игрока/врага/хилок/мечей
     * Спавнит в случ. позициях
     * @param {"hero" | "enemy" | "potion" | "sword"} type 
     * @param {string} health 
     * @param {string} id 
     */
    init = (type, health, id) => {
        const floor = document.querySelectorAll('div[data-type="floor"]');
        const spawn = floor[this.scripts.randomInt(0, floor.length - 1)];
        const types = {
            hero:   `<div class="tileP" data-pos="${spawn.getAttribute('data-pos')}" data-health="${health}" data-type="hero" style="${spawn.getAttribute('style')}"><div class="health" style="width: ${health}%;"></div></div>`,
            enemy:  `<div class="tileE" data-pos="${spawn.getAttribute('data-pos')}" data-health="${health}" data-type="enemy-${id}" style="${spawn.getAttribute('style')}"><div class="health" style="width: ${health}%;"></div></div>`,
            potion: `<div class="tileHP" data-pos="${spawn.getAttribute('data-pos')}" data-type="potion" style="${spawn.getAttribute('style')}"></div>`,
            sword:  `<div class="tileSW" data-pos="${spawn.getAttribute('data-pos')}" data-type="sword" style="${spawn.getAttribute('style')}"></div>`,
        }
        
        
        spawn.insertAdjacentHTML("afterend", types[type]);
    }

    /**
     * Передвижение игрока/врага
     * @param {"E" | "P"} type 
     * @param {string?} id 
     */
    goLeft = (type, id) => {
        const {charcter, pos} = this.getPos(type, id);
        pos.y = parseInt(pos.y) - 50 < 0 ? pos.y : parseInt(pos.y) - 50;
        const canWalk = this.chekPossition(pos.x, pos.y).walk
        if(canWalk) this.setPos(charcter, pos.x, pos.y)
    }

    /**
     * 
     * @param {"E" | "P"} type 
     * @param {string?} id 
     */
    goRight = (type, id) => {
        const {charcter, pos} = this.getPos(type, id);
        pos.y = parseInt(pos.y) + 50 > 1000 ? pos.y : parseInt(pos.y) + 50;
        const canWalk = this.chekPossition(pos.x, pos.y).walk
        if(canWalk) this.setPos(charcter, pos.x, pos.y)
    }

    /**
     * 
     * @param {"E" | "P"} type 
     * @param {string?} id 
     */
    goUp = (type, id) => {
        const {charcter, pos} = this.getPos(type, id);
        pos.x = parseInt(pos.x) - 50 < 0 ? pos.x : parseInt(pos.x) - 50;
        const canWalk = this.chekPossition(pos.x, pos.y).walk
        console.log(canWalk)
        if(canWalk) this.setPos(charcter, pos.x, pos.y)
    }

    /**
     * 
     * @param {"E" | "P"} type 
     * @param {string?} id 
     */
    goDown = (type, id) => {
        const {charcter, pos} = this.getPos(type, id);
        pos.x = parseInt(pos.x) + 50 > 640 ? pos.x : parseInt(pos.x) + 50;
        const canWalk = this.chekPossition(pos.x, pos.y).walk
        if(canWalk) this.setPos(charcter, pos.x, pos.y)
    }

    /**
     * 
     * @param {string | number} posX 
     * @param {string | number} posY 
     * @returns {{
     *      walk: boolean
     * }}
     */
    chekPossition = (posX, posY) => {
        const wall  = document.querySelector(`.tileW[data-pos="${posX}, ${posY}"]`); 
        const enemy = document.querySelector(`.tileE[data-pos="${posX}, ${posY}"]`); 
        const hero  = document.querySelector(`.tileP[data-pos="${posX}, ${posY}"]`); 
        return {
            walk: wall || enemy || hero ? false : true
        }
    }

    /**
     * Атака игрока/врага
     * @param {"P" | "E"} type 
     * @param {number} damage 
     * @param {string?} id 
     */
    attack = (type, damage, id) => {
        const {pos} = this.getPos(type, id)
        const enemy = this.getCharacter(type == "P" ? "E" : "P", pos.x, pos.y);

        
        for(let [key, value] of Object.entries(enemy)){
            if(!value) continue;
            const health = value.getAttribute('data-health') - damage;
            if(health <= 0) value.remove();

            value.setAttribute('data-health', health);
            value.querySelector('.health').setAttribute('style', `width: ${health}%`)
        }
    }

    /**
     * Возврашает противноков/игрока если они есть по окр клеткам
     * @param {"P" | "E"} type 
     * @param {string | number} posX 
     * @param {string | number} posY 
     * @returns {{
     *      1: HTMLDivElement?,
     *      2: HTMLDivElement?,
     *      3: HTMLDivElement?,
     *      4: HTMLDivElement?
     * }}
     */
    getCharacter = (type, posX, posY) => {
        return {
            1: document.querySelector(`.tile${type}[data-pos="${parseInt(posX) + 50}, ${posY}"]`),
            2: document.querySelector(`.tile${type}[data-pos="${posX - 50}, ${posY}"]`),
            3: document.querySelector(`.tile${type}[data-pos="${posX}, ${parseInt(posY) + 50}"]`),
            4: document.querySelector(`.tile${type}[data-pos="${posX}, ${posY - 50}"]`),
        }
    }

    /**
     * Возврашает позицию P - игрока, E - врага
     * @param {"P" | "E"} type 
     * @param {string?} id 
     * @returns {{
     *      charcter: HTMLDivElement,
     *      pos: {
     *          x: string,
     *          y: string
     *      }
     * }}
     */
    getPos = (type, id) => {
        const charcter = document.querySelector(type == 'P' ? '.tileP[data-type="hero"]' : `.tileE[data-type="${id}"]`);
        const [x, y] = charcter.getAttribute('data-pos').split(',');
        return {
            charcter: charcter,
            pos: {
                x: x.trim(),
                y: y.trim()
            }
        }
    }

    /**
     * Устанавливает новую позицию игрока/врага
     * @param {HTMLDivElement} charcter 
     * @param {string | number} posX 
     * @param {string | number} posY 
     */
    setPos = (charcter, posX, posY) => {
        charcter.setAttribute("style", `top: ${posX}px; left: ${posY}px`);
        charcter.setAttribute("data-pos", `${posX}, ${posY}`)
    }

    /**
     * Проверят жив ли игрок или нет
     * @returns {boolean}
     */
    isLive = () => {
        const hero = document.querySelector(".tileP");
        return hero ? true : false;
    }

    /**
     * Проверят остались ли враги или нет
     * @returns {boolean}
     */
    isWon = () => {
        const enemys = document.querySelectorAll('.tileE');

        return enemys.length ? false : true; 
    }
}