function genererMotCroise() {
    const container = document.getElementById('motcroise-grid');
    container.innerHTML = '';

    const numbers = {
        "0-0": 1,
        "0-4": 2,
        "3-2": 3
    };

    const size = 10;

    container.style.display = 'grid';
    container.style.gridTemplateColumns = `repeat(${size}, 30px)`;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.classList.add('motcroise-cell');

            if (numbers[`${i}-${j}`]) {
                input.dataset.number = numbers[`${i}-${j}`];
            }
            if (!grille[i][j]) {
                input.disabled = true;
                input.style.background = '#000';
            }


            container.appendChild(input);
        }
    }
}
