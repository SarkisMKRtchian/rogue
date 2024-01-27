class Scripts{
    
    /**
     * Возврашает рандомное целое число(от, до)
     * @param {number} min 
     * @param {number} max 
     * @returns {number}
     */
    randomInt = (min, max) => {
        return Math.round(Math.random() * (min - max) + max);
    }
}