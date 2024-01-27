class GameMap{
    
    filed;
    filedWidth;
    filedHeight;
    scripts;

    /**
     * 
     * @param {Scripts} scripts 
     */
    constructor(scripts){
        this.filed = document.querySelector('.field');
        this.filedWidth = this.filed.offsetWidth;
        this.filedHeight = this.filed.offsetHeight;
        this.scripts = scripts;
    }

    /**
     * Рисует стены и пол
     */
    render = () => {
        this.renderWall(this.filedWidth, this.filedHeight)
        this.renderTile()
    }

    /**
     * Рисует стены по всей карте
     * @param {number} width 
     * @param {number} height 
     */
    renderWall = (width, height) => {
        for (let i = 0; i < height; i += 50){
            for(let y = 0; y < width; y += 50){
                this.filed.insertAdjacentHTML("beforeend",`<div data-type="wall" data-pos="${i}, ${y}" id="${i} - ${i + y}" style="left: ${y}px; top: ${i}px" class="tile tileW"></div>`);
            }
        }
    }

    /**
     * Рисует пол сначала в рандомных места а потом от 3 до 5 прямых
     */
    renderTile = () => {
        const tiles = this.scripts.randomInt(3, 8);
        const roomsQty = this.scripts.randomInt(5, 10);
        
        for(let i = 0; i < roomsQty; i++){
            const {posX, posY} = this.getPos()
            
            this.renderRooms(tiles, posX, posY, "x")
            this.renderRooms(tiles, posX, posY, "y")

        }
        for(let i = 0; i < this.scripts.randomInt(3, 5); i++){
            this.renderLine("x");
            this.renderLine("y");
        }
    }

    /**
     * Рисует полы по рандомным позициям
     * @param {number} length 
     * @param {string | number} posX 
     * @param {string | number} posY 
     * @param {string} direction 
     */
    renderRooms = (length, posX, posY, direction) => {
        for(let i = 0; i < length; i++){
            const floor = document.createElement('div');

            floor.className = 'tile tileF';
            floor.dataset.type = 'floor';

            floor.style.left = posY + "px"
            floor.style.top = posX + "px"

            floor.dataset.pos = `${posX}, ${posY}`

            this.filed.appendChild(floor)
            
            const wall = document.getElementById(`${posX} - ${posX + posY}`);
            wall && wall.remove()
            direction == "x" ? (
                posX = posX + 50 > this.filedHeight ? 0 : posX + 50
            ) : (
                posY = posY + 50 > this.filedWidth  ? 0 : posY + 50
            )
        }
    }

    /**
     * Рисует линии полов по направлению (x, y)
     * @param {string} direction 
     */
    renderLine = (direction) => {
        const {posX, posY} = this.getPos()
        const length = direction == 'x' ? this.filedHeight : this.filedWidth;

        for(let i = 0; i < length; i += 50){
            const floor = document.createElement('div');
            const top  = direction == 'x' ? i : posX;
            const left = direction == 'y' ? i : posY

            floor.style.top  = top  + 'px';
            floor.style.left = left + 'px';
            floor.dataset.type = "floor";
            floor.className = 'tile tileF'

            floor.dataset.pos = `${top}, ${left}`

            const wall = document.getElementById(`${top} - ${top + left}`);
            wall && wall.remove()

            this.filed.appendChild(floor);
        }
    }

    /**
     * Очищает карту
     */
    clear = () => this.filed.innerHTML = ''

    /**
     * Возврашает рандомную позицию на картес окрглением до 50 (100, 150, 200 итд...)
     * @returns {{
     *      posX: number,
     *      posY: number
     * }}
     */
    getPos = () => {
        return {
            posX: Math.round(this.scripts.randomInt(0, this.filedHeight - 50) / 50) * 50,
            posY: Math.round(this.scripts.randomInt(0, this.filedWidth - 50) / 50) * 50
        }
    }

}

