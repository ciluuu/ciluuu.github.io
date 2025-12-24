---
layout: default
title: fin
permalink: /diaporama/
---


<h1>bravo, tu peux maintenant suivre un super tuto</h1>


<div class="slideshow-container">
  <img id="slide" src="/assets/img/slide1.jpg" alt="slide">
  <div class="buttons">
    <button id="prev">avant</button>
    <button id="next">après</button>
  </div>
</div>


<p>clique ici après le diapo <a href="https://gx.games/games/rxffqj/jeu-formidable-pour-homme-mega-formidable/tracks/2f790347-fe26-4467-a5e4-4470e5338268/" target="_blank">clique ici oublie pas</a></p>


<style>
body {
    background: #121212;
    color: #e0e0e0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    min-height: 100vh;
}


h1 {
    color: #ffffff;
    margin-bottom: 20px;
    text-align: center;
}


a {
    color: #eb2cbb;
    text-decoration: none;
    transition: 0.2s;
}
a:hover { color: #fd70f4; }


.slideshow-container {
    max-width: 900px;
    width: 100%;
    text-align: center;
    margin: 20px auto;
    padding: 20px;
    background: #1e1e1e;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
}


.slideshow-container img {
    width: 100%;
    max-width: 800px;
    border-radius: 8px;
    margin-bottom: 15px;
}


.slideshow-container .buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
}


button {
    padding: 10px 20px;
    background: #ffffff;
    color: #121212;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
}
button:hover {
    background: #e0e0e0;
}


p {
    margin-top: 25px;
    font-size: 16px;
    text-align: center;
}
</style>


<script>
const slides = [
  "/assets/img/slide1.jpg",
  "/assets/img/slide2.jpg",
  "/assets/img/slide3.jpg",
  "/assets/img/slide4.jpg",
];
let current = 0;


function showSlide(index){
  document.getElementById("slide").src = slides[index];
}


document.getElementById("prev").addEventListener("click", function(){
  current = (current-1+slides.length) % slides.length;
  showSlide(current);
});


document.getElementById("next").addEventListener("click", function(){
  current = (current+1) % slides.length;
  showSlide(current);
});
</script>
