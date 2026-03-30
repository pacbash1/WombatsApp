# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A fan-made viewer for *Work It Out Wombats!* (PBS Kids) with two separate components that share a theme but are otherwise independent:

1. **Web PWA** (`index.html`, `sw.js`, `manifest.json`) — deployed to GitHub Pages at `https://pacbash1.github.io/WombatsApp/`
2. **Android app** (`app/`) — Jetpack Compose app, not yet connected to the web PWA

## Web PWA

There is no build step. Edit `index.html` directly and push to deploy.

**Important constraints:**
- Episode `.mp4` files in `Episodes/` are tracked via **Git LFS**. GitHub Pages does not serve LFS files — it serves the 138-byte pointer stub instead. Never point `S1_BASE` at the GitHub Pages `/Episodes/` path for streaming; use `https://archive.org/download/work-it-out-wombats-ellies-island/` instead.
- The service worker (`sw.js`) intentionally bypasses caching for `archive.org` requests so videos always stream fresh.
- Episode state (saved/downloaded) is stored in `localStorage` under the key `wombats_saved_v2`.

**Episode data lives entirely in `index.html`** inside the `SEASONS` array. Season 1 episodes with `file: null` are not on archive.org and show a PBS Kids fallback button. Season 2 episodes are PBS Kids-only (no local files).

## Android app

The app is a skeleton at `app/src/main/java/com/pbskids/wombats/`. It uses the YouTube Data API v3 to search for episodes and opens them in the YouTube app on tap.

- The API key must be pasted into `HomeScreen.kt` at `private const val YOUTUBE_API_KEY`.
- Required dependencies and the `INTERNET` permission are documented in `DEPENDENCIES.md` (they are not yet in a `build.gradle` — the file is a reference only).
- Stack: Retrofit + Gson for API calls, Coil for thumbnail images, Jetpack Compose + Material3 UI, `HomeViewModel` with `StateFlow<HomeUiState>`.
