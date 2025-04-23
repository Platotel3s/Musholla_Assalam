# 🕌 Prayer Times Web App

This is a simple and responsive web application that displays Islamic prayer times (Fajr, Dhuhr, Asr, Maghrib, and Isha) for any Indonesian city using the [Aladhan Prayer Times API](https://aladhan.com/prayer-times-api).

---

## 📦 Features

- 📍 Get prayer times by city name (e.g., Jakarta, Surabaya)
- 🗓️ Show Islamic Hijri date
- 🔁 Dynamic update without refreshing the page
- 🕰️ Display last update time
- 🇮🇩 Uses Method 11 – Kemenag Indonesia

---

## 🚀 Live Preview

You can host this on any static site provider like GitHub Pages, Netlify, or Vercel.

---

## 📁 File Structure

    prayer-times-app/
    ├── index.html          # Main application interface
    ├── style.css           # Stylesheet
    ├── script.js           # Application logic
    ├── README.md           # Documentation
    └── assets/             # Additional resources
        ├── images/         # App images
        └── fonts/          # Custom fonts


---

## 🧠 How It Works

- On page load, the app fetches the prayer times for **Jakarta**.
- You can type a new city name and click the update button to fetch new times.
- The Hijri date and the last updated time are also displayed.

---

## 🔧 How to Use

1. Clone or download this repository:

```bash
git clone https://github.com/yourusername/prayer-times-app.git
cd prayer-times-app

```
2. Navigate your project
   
        cd prayer-times-app

--- 

### 📸 Screenshot


--- 

### 📚 API Reference

Endpoint used:

    GET https://api.aladhan.com/v1/timingsByCity?city=Jakarta&country=Indonesia&method=11

city → Input from user
method=11 → Kemenag Indonesia calculation method
More info: Aladhan API Documentation

--- 

### 🤝 Contributing
Contributions are welcome! Please fork the repository and create a pull request.
