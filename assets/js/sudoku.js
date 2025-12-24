function genererSudoku() {
    const table = document.getElementById('sudoku-grid');
    table.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const row = table.insertRow();
        for (let j = 0; j < 9; j++) {
            const cell = row.insertCell();
            const input = document.createElement('input');
            input.type = 'number';
            input.min = 1;
            input.max = 9;
            input.style.width = '40px';
            input.style.textAlign = 'center';
            cell.appendChild(input);
        }
    }
}
