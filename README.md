# Blaugrana Daily — Setup & Deployment Guide

Everything below is written for someone doing this for the first time. Follow
it top to bottom. Each numbered section is a separate free account you'll
need — they only take a few minutes each.

## 1. Get a free MongoDB Atlas database (do this first)

This is where every article, comment, user, and subscriber actually lives —
unlike a local file, this survives restarts and redeploys forever, for free.

1. Go to **mongodb.com/cloud/atlas/register** and sign up (no card required)
2. Create a free **M0** cluster (choose any region close to you)
3. Under **Database Access**, create a database user with a username and password — save these somewhere safe
4. Under **Network Access**, click **Add IP Address** → **Allow Access From Anywhere** (0.0.0.0/0) — needed so your hosting provider can reach it
5. Click **Connect** on your cluster → **Drivers** → copy the connection string, which looks like:
   `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
6. Replace `<username>` and `<password>` with the real values from step 3, and add a database name before the `?`, e.g. `.../blaugrana?retryWrites=...`
7. Save this full string — you'll paste it as `MONGODB_URI` in Step 3 below

**To view or edit your data later:** log into Atlas → your cluster → **Browse Collections**. Every article, comment, and user is right there in a friendly table/document view — no code needed, works whether you're running locally or deployed.

## 2. Run it locally first (to make sure everything works)

1. Unzip this project
2. Open a terminal in the folder (address bar → `cmd`)
3. Run `npm install`
4. Create a file named `.env` in this same folder (no extension) with:
   ```
   MONGODB_URI=your connection string from Step 1
   SESSION_SECRET=any-long-random-string-you-make-up
   ```
5. Since plain Node doesn't read `.env` files by itself, run instead:
   ```
   node -r dotenv/config server.js
   ```
   (If that errors saying `dotenv` isn't found, run `npm install dotenv` first, once.)
6. You should see `Connected to MongoDB` and `Blaugrana Daily running at http://localhost:3000`
7. Open `localhost:3000` — you should see all 51 seeded articles

## 3. Deploy it online for free (Render)

1. Create a GitHub account if you don't have one, and create a new repository
2. Upload this entire project folder's contents to that repository (GitHub's website lets you drag-and-drop files — no Git required)
3. Go to **render.com** → sign up (no card required for free tier)
4. Click **New** → **Web Service** → connect your GitHub repo
5. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** Free
6. Under **Environment Variables**, add:
   - `MONGODB_URI` = your connection string from Step 1
   - `SESSION_SECRET` = a long random string
   - (optional, see sections below) `PAYSTACK_SECRET_KEY`, `EMAIL_USER`, `EMAIL_PASS`
7. Click **Create Web Service**. After a few minutes you'll get a live URL like `blaugrana-daily.onrender.com` — that's your site, live for anyone.

**Note:** Render's free tier sleeps after 15 minutes of no visitors, and takes ~30 seconds to wake back up on the next visit. This is normal and free — nothing is broken. Since your data now lives in MongoDB Atlas (not on Render itself), nothing is lost when it sleeps or restarts.

## 4. Admin access

- Default login: **username `bode`, password `changeme123`**
- The admin panel is hidden — it's the tiny period at the very end of the footer text ("...every matchday**.**") on every page. Click it.
- **Change the password immediately** under the Account tab.
- To add more admins (e.g. for a co-editor), go to the **Admins** tab and create one there — no code needed.

## 5. Fill in your real details

All of this is in the admin panel's **Site Settings** tab — no code required:
- Site name, tagline, logo (upload an image file)
- Homepage background (upload an image or video file)
- Contact email, phone, and WhatsApp number
- Facebook, TikTok, Instagram, X/Twitter, YouTube links

## 6. Accepting real payments (Paystack)

1. Sign up free at **paystack.com** (no card required to get test keys)
2. Dashboard → **Settings → API Keys & Webhooks**
3. Copy your **Secret Key** (starts with `sk_`)
4. Add it as an environment variable: `PAYSTACK_SECRET_KEY` = that key (in Render's Environment tab, or your `.env` file locally)
5. Test-mode payments work immediately with Paystack's test card numbers (listed in their docs). Switch to live keys once you're ready to accept real money — same process, just toggle "Live" in the Paystack dashboard and use the live secret key instead.

Supporters automatically get a badge based on total given: 🎽 Supporter → ⭐ Star (₦2,000+) → 🏅 Medal (₦15,000+) → 👑 Crown (₦50,000+), visible on their profile page.

## 7. Automated daily subscriber emails

1. Sign up free at **brevo.com** (300 free emails/day — plenty for a subscriber list starting out)
2. Get your SMTP credentials from Brevo's dashboard (**SMTP & API** section)
3. Add these environment variables:
   - `EMAIL_USER` = your Brevo SMTP login
   - `EMAIL_PASS` = your Brevo SMTP key
   - `EMAIL_FROM` = the email address you want subscribers to see it from
4. Since Render's free tier sleeps when idle, an internal daily timer isn't reliable — instead, use a free external scheduler:
   - Sign up at **cron-job.org** (free)
   - Create a job that sends a request to `https://your-site.onrender.com/api/send-digest` once a day
   - This also has a side benefit of keeping your site "awake" around that time each day

## 8. Monetization ideas beyond Paystack

- **Google AdSense** — once you have steady traffic, apply for AdSense and add ad slots to article pages
- **Affiliate links** — official Barça kit/merch links via any sports retailer's affiliate program
- **Sponsored posts** — a clearly-labelled sponsored match report or clip roundup for a local business
- **Higher membership tiers** — e.g. an early-access tier that sees articles a day before everyone else

## What's in this project

```
blaugrana-daily/
├── server.js              → starts everything
├── db.js                  → MongoDB connection + all data models
├── digest.js               → daily subscriber email logic
├── seed-posts.js          → the 51 starting articles + match reports/clips/banter
├── routes/                 → all API endpoints (posts, comments, auth, profile, settings, payment, contact)
├── middleware/              → login-protection for admin and reader routes
├── data/                   → (not used anymore — data lives in MongoDB Atlas now)
└── public/                → the actual website
    ├── index.html, articles.html, article.html, matchreports.html,
    │   eras.html, clips.html, banter.html, about.html, contact.html,
    │   subscribe.html, support.html, profile.html, admin.html
    ├── css/style.css
    ├── js/ (main.js, posts.js)
    └── uploads/            → images/logos/avatars uploaded via the admin panel
```

## A note on images of real players

Real photographs of professional footballers are copyrighted — using them
without a license (even on a fan site) carries real legal risk, especially
once the site accepts payments. That's why legend/coach cards use initials
instead of photos by default. If you want real images, source them yourself
from a properly licensed source (a stock photo service, or images explicitly
marked for reuse on Wikimedia Commons) and upload them per-post via the
admin panel's image field — that keeps you in control of what you're legally
allowed to use.
