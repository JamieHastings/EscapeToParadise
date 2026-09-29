# Deployment Guide

This project uses **direct upload** to Cloudflare Pages — you build locally and
upload the folder. Cloudflare never runs a build and does not need environment
variables configured in the dashboard.

---

## Two builds, two projects

| Script | Output folder | Cloudflare Pages project | Domain |
|---|---|---|---|
| `npm run build:public` | `dist-public` | Main project | escape2paradisetravels.com |
| `npm run build:admin` | `dist-admin` | e2p-admin | admin.escape2paradisetravels.com |

---

## How to deploy

### Public site
```
npm run build:public
```
Upload `dist-public/` to the main Cloudflare Pages project.

### Admin site
```
npm run build:admin
```
Upload `dist-admin/` to the **e2p-admin** Cloudflare Pages project.

---

## Environment variables

All env values come from local `.env` files — **not** from the Cloudflare
dashboard (direct upload ignores dashboard variables).

| File | Contents | Used by |
|---|---|---|
| `.env` | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | Both builds |
| `.env.admin` | `VITE_APP_MODE=admin` | Admin build only (loaded via `--mode admin`) |

Neither file is committed to git. See `.env.example` for the variable names.

---

## Local dev

```
npm run dev          # Public site (default)
npm run dev:admin    # Admin site
```

---

## Reminders

- **Rebuild both folders when shared code changes** (components, lib files,
  Supabase types, etc.). Changes to shared code won't appear on the other site
  until it is rebuilt and re-uploaded.
- `dist-public/_redirects` redirects `/admin/*` to the admin subdomain.
  This file is intentionally absent from `dist-admin` to prevent redirect loops.
- Never add `VITE_APP_MODE` to `.env` or `.env.production` — it will make
  every build an admin build.
