# Octofit Tracker presentation tier

The React 19 frontend uses React Router for navigation and reads activities, leaderboard entries, teams, users, and workouts from the backend API.

## Configure the API URL

When using Codespaces, define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local`:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite uses this value to request the API at `https://<codespace-name>-8000.app.github.dev`. Replace the example with the Codespace name, then restart the Vite development server so the variable is loaded. Do not include the `-8000.app.github.dev` suffix.

When `VITE_CODESPACE_NAME` is unset or empty, the frontend uses `http://localhost:8000`.
