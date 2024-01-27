
document.addEventListener("DOMContentLoaded", () => {
    const game = new Game()

    game.init();
    

    document.addEventListener('click', event => {
        if(event.target.id == 'reloadBtn'){
            window.location.reload()
        }
    })
})





