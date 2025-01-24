# 3D Box Generator Client

An app hosted on Netlify that calculates triangulation for 3D boxes based on provided dimensions

This app is hosted on netlify with netlify serverless functions as app's backend
https://3dboxconfig.netlify.app/

## How to run this app?

### Prerequisites

- Node.js 14.x or higher
- npm

### Installation

1. Clone the repository
2. Install dependencies:

```
npm install
```

3. Use this command for building the app for production:

```
npm run build
```

Or this command to run the app in develop mode:

```
npm run dev
```

### Ports

Basic server port is `3005`
and basic client port is `5173`

But you are free to rewrite these ports in .env file. Use `PORT` variable.
