NOVA AI — COMPLETE STARTER PROJECT (HopWeb-friendly front end)

WHAT IS INCLUDED
- public/index.html: single-file HTML/CSS/JS mobile UI; can be opened/edited in HopWeb.
- backend/server.js: Node.js backend proxy. The provider key stays on the server, not in HTML.
- package.json: server dependency and start command.
- .env.example: environment-variable template.

IMPORTANT HONEST STATUS
This is a deploy-ready starter project, not a live-hosted website and not an APK. It cannot generate images until you create a provider API key and deploy/run the backend. Free allowance, model availability and rate limits are controlled by the provider; unlimited free generation is not guaranteed.

SETUP / HOSTING
1. Check the image provider's official site and terms for current account/key requirements. Create a key if available to you.
2. Deploy this folder to a Node.js host that supports Node 18+.
3. Set environment variable POLLINATIONS_API_KEY in the host dashboard. Do not paste the secret into the HTML or public GitHub repo.
4. Build/start command: npm install; start command: npm start.
5. Open the deployed website URL. The page checks /api/health and calls /api/generate.

LOCAL TEST (computer)
- Install Node.js 18 or newer.
- In project root: npm install
- Set POLLINATIONS_API_KEY in your shell/environment.
- Run: npm start
- Open http://localhost:3000

HOPWEB
The frontend is in public/index.html and is easy to copy/edit in HopWeb. But HopWeb preview alone cannot run this Node backend. To have working AI generation online, the backend must be deployed on a Node-capable host, and the frontend must be served from the same origin as this API or configured to call your deployed backend URL.

SECURITY
The backend does not expose the key to the browser. Add authentication/rate limiting before sharing a public URL widely, to avoid others consuming your provider quota.
