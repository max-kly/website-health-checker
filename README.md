# Website Health + SEO Checker

A full-stack web application to analyze the health and SEO of any web page.

---

## Features

- **Website Health:** Check if a website is online, its HTTP status, and response time.
- **SEO Audit:** Analyze title, meta description, H1, viewport tag, and image alt attributes.
- **Modern UI:** Simple, responsive React frontend.
- **API:** Fast Express backend using Puppeteer for SEO checks.
- **Dockerized:** One-command setup for both production and development.

---

## Quick Start

### 1. Clone the repository

```sh
git clone https://github.com/max-kly/website-health-checker.git
cd website-health-checker
```

---

## Running with Docker

### Production Mode

This builds and runs both frontend and backend in production mode.

```sh
make prod
```

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:10000](http://localhost:10000)

---

### Development Mode

This builds and runs both frontend and backend in development mode with hot-reloading and live development.

```sh
make dev
```

- **Frontend (dev):** [http://localhost:5173](http://localhost:5173)
- **Backend (dev):** [http://localhost:10000](http://localhost:10000)

> **Note:**  
> The frontend dev server is started with `vite --host` in the Dockerfile, so it is accessible from your host machine.

---

## Manual Local Development (No Docker)

#### Backend

```sh
cd backend
npm install
node app/index.js
# or for development with auto-reload:
# npx nodemon app/index.js
```

#### Frontend

```sh
cd frontend
npm install
npm run dev
```

---

## Environment Variables

### Frontend

- `VITE_SERVER` — URL of the backend API (e.g., `http://localhost:10000`).

### Backend

- `PUPPETEER_EXECUTABLE_PATH` — Set automatically in Docker. If running locally, ensure Puppeteer can find Chromium.

---

## Project Structure

```
website-health-checker/
  backend/    # Express API, Puppeteer SEO logic
    Dockerfile
    Dockerfile.dev
  frontend/   # React app (Vite, TypeScript)
    Dockerfile
    Dockerfile.dev
    nginx.conf
  docker-compose.yml
```

---

## API Endpoints

- `GET /check-status?url=...` — Checks if the site is online, HTTP status, and response time.
- `GET /check-seo?url=...` — Uses Puppeteer to audit SEO (title, meta description, H1, viewport, images/alt).

---

## Nginx Config (Production Frontend)

The frontend is served by Nginx in production, with this config (see `frontend/nginx.conf`):

```nginx
server {
  listen 80;
  server_name localhost;
  root /usr/share/nginx/html;
  index index.html;
  location / {
    try_files $uri /index.html;
  }
}
```

---

## Troubleshooting

- **Frontend 404s in Docker:**  
  The Nginx config is set up to support client-side routing. If you see a 404, ensure you’re using the provided `nginx.conf`.
- **Puppeteer/Chromium errors:**  
  If running backend locally, make sure Chromium is installed or use Docker for a pre-configured environment.
- **Dev server not accessible:**  
  Make sure you use the dev Dockerfiles and map ports as shown above.

---

## License

MIT