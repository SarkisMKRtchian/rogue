class Hero extends Character{
    health = 100; // Здоровье героя
    damage = 20;  // урон героя

    /**
     * Спавнит игрока в случайном месте
     */
    spawn = () => this.init('hero', this.health)

    /**
     * Восстонавливает здоровье игрока
     */
    heal = () => {
        this.health = 100;
    }

    /**
     * Увеличивает урон игрока
     */
    boostDamage = () => {
        this.damage += 10;
    }

}