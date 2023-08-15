function abrirModal() {
    const modal = document.getElementById('janela-snake')
    modal.classList.add('abrir-snake')

    modal.addEventListener('click', (e) => {
        if(e.target.id == 'fechar-snake' || e.target.id == 'janela-snake') {
            modal.classList.remove('abrir-snake')
        }
    })
}

function sairModal() {
    const exit = document.getElementById('system-snake')
    exit.classList.add('exit-snake')

    exit.addEventListener('click', (e) => {
        if(e.target.id == 'nao-snake' || e.target.id == 'system-snake') {
            exit.classList.remove('exit-snake')
        }
    })
}