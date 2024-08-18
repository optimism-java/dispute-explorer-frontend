## Getting Started

you should run the [backend](https://github.com/optimism-java/dispute-explorer) first

### Run with source code

First, install deps:

```bash
pnpm install
```

copy the env file and set the real token

```bash
cp .env.example .env
```

change the `destination` to real backend in `rewrites()` method in `next.config.mjs` file

```bash
pnpm run dev
```

### Run with docker

first pull the image

```bash
docker pull ghcr.io/optimism-java/dispute-explorer-frontend:development

```

copy `nginx.conf` and change config

```bash
cp nginx.conf.example nginx.conf
```

replace with the real `proxy_pass` and auth token
