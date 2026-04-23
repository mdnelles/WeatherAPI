# Weather App

A Next.js 16 weather app with current conditions, 5-day forecast, animated backgrounds, and city search. Data is pulled from the OpenWeather API.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, React 19)
- TypeScript
- Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com/) components
- [SWR](https://swr.vercel.app/) for data fetching
- [Leaflet](https://leafletjs.com/) / [Mapbox GL](https://www.mapbox.com/) for maps
- [Recharts](https://recharts.org/) for charts
- PM2 for process management in production
- GitHub Actions for CI/CD

## Getting started

### Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/) (`corepack enable` then `corepack prepare pnpm@latest --activate`)
- A free [OpenWeather](https://openweathermap.org/api) API key

### Local development

```bash
# install dependencies
pnpm install

# create your env file
cp .env.example .env.local
# then edit .env.local and set OPENWEATHER_API_KEY

# run the dev server
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Available scripts

| Command      | Description          |
| ------------ | -------------------- |
| `pnpm dev`   | Start the dev server |
| `pnpm build` | Production build     |
| `pnpm start` | Run the built app    |
| `pnpm lint`  | Lint with ESLint     |

## Environment variables

Create a `.env.local` (dev) or `.env.production` (server) with:

```
OPENWEATHER_API_KEY=your_key_here
```

`.env*` files are gitignored — never commit them.

## Project structure

```
app/
  api/
    weather/route.ts    # OpenWeather proxy (current + forecast)
    geocode/route.ts    # City geocoding proxy
  page.tsx              # Main UI
  layout.tsx
components/
  ui/                   # shadcn/ui primitives
  current-weather.tsx
  forecast.tsx
  city-search.tsx
  city-selector.tsx
  animated-background.tsx
lib/
  cities.ts             # Popular city presets
  weather-types.ts      # API response types
  utils.ts
```

## Deployment

This repo ships with a GitHub Actions workflow ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) that SSHes into the target server on every push to `main`, pulls the latest code, builds, and reloads PM2.

### Server prerequisites (one-time)

```bash
# as a user with sudo
sudo mkdir -p /var/www/weather
sudo chown -R $USER:$USER /var/www/weather

# install Node (via nvm), pnpm, pm2
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
nvm install 20
corepack enable
npm i -g pm2
pm2 startup   # follow the printed command so pm2 survives reboots
```

Drop your production env file at `/var/www/weather/.env.production` — it survives deploys because `.env*` is gitignored and `git reset --hard` won't touch untracked files.

### GitHub secrets required

Set these in **Settings → Secrets and variables → Actions**:

| Secret     | Description                                         |
| ---------- | --------------------------------------------------- |
| `SSH_HOST` | Server IP or hostname                               |
| `SSH_USER` | SSH user (needs write access to `/var/www/weather`) |
| `SSH_KEY`  | Private key contents (e.g. `id_ed25519`)            |
| `SSH_PORT` | SSH port (optional, defaults to 22)                 |
| `REPO_URL` | Git URL, only used on first clone                   |

### How the deploy runs

On each push to `main` the workflow:

1. Clones the repo into `/var/www/weather` if it's not there yet.
2. `git fetch` + `git reset --hard origin/main`.
3. `pnpm install --frozen-lockfile`.
4. `pnpm build`.
5. `pm2 reload ecosystem.config.js` (or `start` on first run) and `pm2 save`.

The PM2 app is called `weather` and listens on port **3033**. An Nginx config is provided at [`nginx/weather.conf`](nginx/weather.conf) to reverse-proxy it. Install it, then run certbot to add TLS:

```bash
sudo cp nginx/weather.conf /etc/nginx/sites-available/weather
sudo ln -s /etc/nginx/sites-available/weather /etc/nginx/sites-enabled/weather
# edit server_name to your real domain first
sudo nginx -t && sudo systemctl reload nginx

# then add HTTPS (certbot rewrites the config in place)
sudo certbot --nginx -d weather.example.com
```

## License

MIT
