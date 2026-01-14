# Postre

A delicious tool for creating and managing blog posts. It aims to be a simple SPA using next.js,
with features like:

- Integrated comments with optional CAPTCHAs and moderation, with extended markdown for quotes etc.
- Simple file uploads and management.
- Extended Markdown syntax with support for MathJax, uploaded files, image and video previews.
- Patreon-only/gated posts/content for members-only.
- Handy admin panel for administration
- Built in view metrics, optional analytics with Umami.

Sometimes you don't want to use something as heavy as Wordpress, nor do you want to handle various SSGs like Hugo,
along with the inflexibility of normal Markdown.

Current documentation is in my notepad but will be migrated here as the project progresses.

## Dependencies/Installation

I plan on Dockerising the project, so you will want to install `docker`.

Other runtime and development dependencies include

- `node.js`, along with a package manager e.g. `npm, yarn`.
- `redis`, for configuration key-value storage (possible caching?)
- `postgres`, for storage of users, posts, content.

`yarn i` should get you started if you're looking to work on the web app.

## Running

I currently just have Valkey up and running with Docker Compose.

Before running everything, ensure you have set the following environment variables in `.env`.

- `POSTGRES_PASSWORD`
- `POSTGRES_READONLY_PASSWORD`

```sh
POSTGRES_PASSWORD=example_password
POSTGRES_READONLY_PASSWORD=${POSTGRES_PASSWORD}
```

```sh
docker compose -f docker/valkey/docker-compose.yml up
```

TODO: Dockerise all the services
