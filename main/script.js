document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  hamburger.addEventListener('click', function () {
    nav.classList.toggle('active');
    hamburger.innerHTML = nav.classList.contains('active') ?
      '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });
  const navLinks = document.querySelectorAll('.nav-link a');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      nav.classList.remove('active');
      hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
  let slideIndex = 1;
  showSlides(slideIndex);
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  function showSlides(n) {
    let slides = document.getElementsByClassName("slides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }
  let slideInterval = setInterval(() => plusSlides(1), 5000);
  const carousel = document.querySelector('.carousel');
  carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
  carousel.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => plusSlides(1), 5000);
  });
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      document.querySelector('header').style.background = 'rgba(46, 125, 50, 0.95)';
      document.querySelector('header').style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
      document.querySelectorAll('.nav-link a').forEach(link => {
        link.style.color = 'white';
      });
      document.querySelector('.mosque-name h2').style.color = 'white';
    } else {
      document.querySelector('header').style.background = 'rgba(255, 255, 255, 0.95)';
      document.querySelector('header').style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      document.querySelectorAll('.nav-link a').forEach(link => {
        link.style.color = 'var(--dark-text)';
      });
      document.querySelector('.mosque-name h2').style.color = 'var(--primary-color)';
    }
  });
}
);

