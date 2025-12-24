let index = 0;
const slides = document.querySelectorAll('#diapo img');

function montrerSlide(i) {
    slides.forEach((s, j) => s.style.display = (i === j ? 'block' : 'none'));
}

function suivant() {
    index = (index + 1) % slides.length;
    montrerSlide(index);
}

function precedent() {
    index = (index - 1 + slides.length) % slides.length;
    montrerSlide(index);
}

montrerSlide(index);
