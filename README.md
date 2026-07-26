# CloudCommerce Website

Full bilingual (EN/TH) marketing site. Vite + React, hash-routed.

## Deploy to Vercel (preview or production)

Option 1 — Vercel CLI (fastest):
    npm install
    npx vercel          # follow prompts -> gives a preview URL
    npx vercel --prod   # promote to production

Option 2 — Vercel dashboard:
    1. Zip this folder (or push to GitHub)
    2. vercel.com -> Add New -> Project -> import
    3. Framework preset: Vite (auto-detected). Deploy.

## Run locally
    npm install
    npm run dev     # http://localhost:5173

## Routes
    /                home
    /platform        integrated stack + flywheel + rent-traffic-own-customer
    /solutions       persona + goal bundles (each shows products inside)
    /products        index -> /products/fastship | connex | kollab | cloudmall
    /contact         lead-gen form (?sol= or ?product= pre-fills)
