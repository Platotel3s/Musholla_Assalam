document.addEventListener('DOMContentLoaded', function() {
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');    
hamburger.addEventListener('click', function() {
    nav.classList.toggle('active');
    hamburger.innerHTML = nav.classList.contains('active') ? 
    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});
const navLinks = document.querySelectorAll('.nav-link a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
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
      slides[slideIndex-1].style.display = "block";
      dots[slideIndex-1].className += " active";
}
    let slideInterval = setInterval(() => plusSlides(1), 5000);
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
    carousel.addEventListener('mouseleave', () => {
      slideInterval = setInterval(() => plusSlides(1), 5000);
    });
    window.addEventListener('scroll', function() {
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
    let prayerTimesData = null;
    let countdownInterval = null;
    async function getPrayerTimes(city = "Jakarta", country = "Indonesia") {
    try {
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`);
        const data = await response.json();
        console.log(data); 
        if (data.code !== 200) {
          throw new Error(data.status);
        }
        prayerTimes = data.data.timings;
        updatePrayerTimesUI();
        startCountdown();
      } catch (error) {
        console.error("Gagal mengambil waktu sholat:", error.message);
        alert("Terjadi kesalahan saat mengambil data waktu sholat. Coba lagi nanti.");
      }
    }
    function updatePrayerTimesUI() {
      if (!prayerTimesData) return;
      const timings = prayerTimesData.timings;
      const dateInfo = prayerTimesData.date;
      document.getElementById("fajr").querySelector(".prayer-time").textContent = formatTime(timings.Fajr);
      document.getElementById("dhuhr").querySelector(".prayer-time").textContent = formatTime(timings.Dhuhr);
      document.getElementById("asr").querySelector(".prayer-time").textContent = formatTime(timings.Asr);
      document.getElementById("maghrib").querySelector(".prayer-time").textContent = formatTime(timings.Maghrib);
      document.getElementById("isha").querySelector(".prayer-time").textContent = formatTime(timings.Isha);
      document.getElementById("hijri-date").textContent = 
        `${dateInfo.hijri.weekday.en} ${dateInfo.hijri.day} ${dateInfo.hijri.month.en} ${dateInfo.hijri.year}`;
    }
    function formatTime(timeString) {
      const [hours, minutes] = timeString.split(':');
      const hourNum = parseInt(hours);
      const period = hourNum >= 12 ? 'PM' : 'AM';
      const displayHour = hourNum % 12 || 12;
      return `${displayHour}:${minutes} ${period}`;
    }
    function startCountdown() {
      if (countdownInterval) clearInterval(countdownInterval);
      countdownInterval = setInterval(() => {
        if (!prayerTimesData) return;
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const prayers = [
          { id: 'fajr', time: prayerTimesData.timings.Fajr },
          { id: 'dhuhr', time: prayerTimesData.timings.Dhuhr },
          { id: 'asr', time: prayerTimesData.timings.Asr },
          { id: 'maghrib', time: prayerTimesData.timings.Maghrib },
          { id: 'isha', time: prayerTimesData.timings.Isha }
        ];
        document.querySelectorAll('.prayer-next .countdown').forEach(el => {
          el.textContent = '';
        });
        let nextPrayer = null;
        for (const prayer of prayers) {
          const [hours, minutes] = prayer.time.split(':');
          const prayerTime = parseInt(hours) * 60 + parseInt(minutes);
          if (prayerTime > currentTime) {
            nextPrayer = { ...prayer, minutesRemaining: prayerTime - currentTime };
            break;
          }
        }
        if (!nextPrayer) {
          const [hours, minutes] = prayers[0].time.split(':');
          const prayerTime = parseInt(hours) * 60 + parseInt(minutes) + 1440;
          nextPrayer = { 
            id: prayers[0].id, 
            minutesRemaining: prayerTime - currentTime 
          };
        }
        const hoursRemaining = Math.floor(nextPrayer.minutesRemaining / 60);
        const minutesRemaining = nextPrayer.minutesRemaining % 60;
        document.querySelector(`#${nextPrayer.id} .countdown`).textContent = 
          `${hoursRemaining}h ${minutesRemaining}m`;
          
      }, 60000);
      updateCountdownImmediately(); 
    }
  
    function updateCountdownImmediately() {
      if (countdownInterval) clearInterval(countdownInterval);
      countdownInterval = null;
      startCountdown();
    }
    document.getElementById('update-location').addEventListener('click', function() {
      const city = document.getElementById('city-input').value.trim();
      if (city) {
        getPrayerTimes(city);
      }
    });
    getPrayerTimes();
  }
);

