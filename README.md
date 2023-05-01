# Svelte-Kit + PayloadCMS Turborepo

This is an custom made Turborepo starter.

## What's inside?

This [Turborepo] includes the following packages/apps:

### Apps

Each app is 100% [TypeScript].

- `web`: a [Svelte-kit] web app with [UnoCSS] for styling
- `server`: an [Express] app with [PayloadCMS] and [tRPC] setup

### Packages

- `eslint-config-custom`: `eslint` configurations (includes `eslint-plugin-svelte` and `eslint-config-prettier`)

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript] for static type checking
- [ESLint] for code linting
- [Prettier] for code formatting

## Getting Started

This project uses [pnpm].

```sh
npx degit AmcecHealth/amcechealth.com # download the project

cd amcechealth.com # navigate into the project

pnpm install # install dependencies
```

### Running the apps

In the project root and run the following command.

```sh
pnpm dev
```

This will run both the Svelte-kit and Payload apps in parallel.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

<!-- initialise all the links used -->

[turborepo]: https://turbo.build/repo
[eslint]: https://eslint.org
[express]: https://expressjs.com
[fastify]: https://www.fastify.io
[payloadcms]: https://www.payloadcms.com
[prettier]: https://prettier.io
[prisma]: https://www.prisma.io
[svelte-kit]: https://kit.svelte.dev
[unocss]: https://github.com/unocss/unocss
[trpc]: https://trpc.io
[typescript]: https://www.typescriptlang.org
[rust]: https://www.rust-lang.org
[pnpm]: https://pnpm.io
