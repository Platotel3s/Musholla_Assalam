document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("city-input");
    const updateBtn = document.getElementById("update-location");
  
    const prayerTimesElements = {
      fajr: document.querySelector("#fajr .prayer-time"),
      dhuhr: document.querySelector("#dhuhr .prayer-time"),
      asr: document.querySelector("#asr .prayer-time"),
      maghrib: document.querySelector("#maghrib .prayer-time"),
      isha: document.querySelector("#isha .prayer-time")
    };
  
    const lastUpdated = document.getElementById("last-updated");
    const hijriDate = document.getElementById("hijri-date");
  
    async function fetchPrayerTimes(city) {
      try {
        const url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Indonesia&method=11`;
        const response = await fetch(url);
        const data = await response.json();
  
        const timings = data.data.timings;
        const hijri = data.data.date.hijri;
  
        prayerTimesElements.fajr.textContent = timings.Fajr;
        prayerTimesElements.dhuhr.textContent = timings.Dhuhr;
        prayerTimesElements.asr.textContent = timings.Asr;
        prayerTimesElements.maghrib.textContent = timings.Maghrib;
        prayerTimesElements.isha.textContent = timings.Isha;
  
        lastUpdated.textContent = new Date().toLocaleTimeString();
        hijriDate.textContent = `${hijri.weekday.en}, ${hijri.day} ${hijri.month.en} ${hijri.year}`;
      } catch (error) {
        alert("Failed to fetch prayer times. Please check the city name.");
        console.error(error);
      }
    }
  
    updateBtn.addEventListener("click", () => {
      const city = cityInput.value.trim();
      if (city) fetchPrayerTimes(city);
    });
  
    // Load default city on page load
    fetchPrayerTimes("Jakarta");
  });