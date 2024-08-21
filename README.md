## Getting Started

you should run the [backend service](https://optimism-java.github.io/superproof-docs/deployment/use_docker) first

### Run with source code

1. install deps:

```bash
pnpm install
```

2. config the dev environment

```bash
cp .env.example .env.local
```

there are four envs in `.env.example` file

```
NEXT_PUBLIC_API_KEY=
NEXT_PUBLIC_OP_MAINNET_URL=
NEXT_PUBLIC_OP_SEPOLIA_URL=
NEXT_PUBLIC_BASE_SEPOLIA_URL=
```

`NEXT_PUBLIC_API_KEY` is the `meiliSearch` service token, know
more about the [token](https://optimism-java.github.io/superproof-docs/deployment/use_docker)

The next three envs deponds on the network, only one env should be set. if frontend host on `http://localhost:300`
and backend service is about `mainnet`, `NEXT_PUBLIC_OP_MAINNET_URL` be set to `http://localhost:300`.
if is `sepolia` network, so `NEXT_PUBLIC_OP_SEPOLIA_URL` should be set, and as `base_sepolia` network

3. change the proxy

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
