 # WXT + React

This template should help get you started developing with React in WXT.

## Build & Load in Chrome

- **Install dependencies:**

```bash
npm install
```

- **Build the extension:**

```bash
npm run build
```

The build output will be placed under the `.output` directory (for Chrome MV3 the folder is typically `.output/chrome-mv3`).

- **Load into Chrome (developer mode):**

1. Open Chrome and go to `chrome://extensions`.
2. Enable **Developer mode** (top-right).
3. Click **Load unpacked** and select the built folder (for example `.output/chrome-mv3`).

If you prefer to run a development server with hot reload, use:

```bash
npm run dev
```
