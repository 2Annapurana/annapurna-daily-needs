# Annapurna Daily Needs — Deployment Guide

Yeh project ek **Vite + React** app hai jisme aapke prototype ka poora code
(`src/App.jsx`) already daala hua hai. Neeche do hisse hain:

1. Isko **live website** banana (Vercel) — sab log link se use kar sakenge
2. **Firebase** lagana — real phone-OTP login + sabka data hamesha ke liye save

---

## Part 1: Vercel pe Deploy karna (5 minute, free)

1. [vercel.com](https://vercel.com) pe jaakar free account banayein
   (GitHub/Google se seedha login ho jaata hai).
2. Yeh poora `annapurna-app` folder ek GitHub repository mein upload karein
   — GitHub website pe "New repository" → "uploading an existing folder"
   se drag-drop bhi kar sakte hain, coding ki zaroorat nahi.
3. Vercel dashboard mein **"Add New Project"** → apna GitHub repo select
   karein → **Deploy** button dabayein.
4. 1-2 minute mein aapko ek live link milega, jaise:
   `https://annapurna-daily-needs.vercel.app`
5. Yeh link kisi ko bhi (customer, vendor) WhatsApp pe bhej sakte hain —
   wo browser mein khol lenge. Phone pe "Add to Home Screen" karne se icon
   bhi ban jaayega (kyunki isme PWA already set hai).

**Local pe test karna ho to:**
```
npm install
npm run dev
```

---

## Part 2: Firebase lagana (real login + shared data)

Abhi jo prototype hai usme data sirf ek browser mein rehta hai. Sabhi
customers/admin/vendors ka data ek jagah save karne aur **real phone-OTP
login** ke liye Firebase sabse aasan free tareeka hai.

### Step A — Firebase project banayein
1. [console.firebase.google.com](https://console.firebase.google.com) pe
   jaayein → **Add Project** → naam dein "Annapurna Daily Needs".
2. Left menu mein **Build → Authentication** → "Get Started" → **Phone**
   sign-in method ON karein.
3. Left menu mein **Build → Firestore Database** → "Create Database" →
   production mode mein start karein.
4. Left menu mein **Build → Storage** → "Get Started" (product images
   yahan save hongi).

### Step B — App se connect karein
1. Firebase console mein **Project Settings → Your apps → Web app (</>)**
   se ek naya web app banayein — yeh aapko ek chhota config code dega
   (apiKey, projectId, waghera).
2. Us config ko project mein `src/firebase.js` naam ki file mein daalna
   hoga (yeh file abhi nahi bani hai — jab aap yahan tak pahunch jayein,
   mujhe wapas Firebase config bhejkar bolna: "isse connect kar do", main
   `src/App.jsx` ke andar ka mock data (`useState`) real Firebase calls
   (Firestore `onSnapshot`, `addDoc`, Auth `signInWithPhoneNumber`) se
   badal dunga).

### Kya-kya Firebase se badlega
| Abhi (prototype)              | Firebase ke baad                          |
|--------------------------------|--------------------------------------------|
| Phone number se koi bhi login  | Real OTP SMS verification                  |
| Data browser refresh pe udd jaata hai | Firestore mein hamesha save rehta hai |
| Image browser memory mein      | Firebase Storage mein upload hoti hai      |
| Sirf ek user ka data dikhta hai | Sabhi admin/customer/vendor same data dekhte hain (real-time) |

**Free tier limits** (chhoti-medium dukaan ke liye kaafi hain): 50k reads/day,
20k writes/day, 1GB storage — agar business bade to paid plan lag sakta hai
(bahut saste hote hain, ₹ mein per-usage).

---

## Play Store pe daalna (optional, baad ka step)
Isi PWA ko **Bubblewrap** ya **Capacitor** tool se wrap karke Android APK
banaya ja sakta hai, phir Play Store pe submit kar sakte hain (Google
Play Developer account ka one-time $25 fee lagta hai). Yeh Part 1 aur 2
ke baad ka step hai — jab wahan tak pahunchein to bata dena, uske exact
steps bhi de dunga.
