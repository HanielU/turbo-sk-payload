# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

| Technology  | Usage             |
| ----------- | ----------------- |
| [Sveltekit] | Svelte Framework  |
| [UnoCSS]    | Atomic Css engine |
| [Houdini]   | GraphQL Client    | 

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx degit adroyt/sveltekit .

# create a new project in my-app
npx degit adroyt/sveltekit my-app
```

## Developing

Once you've created a project and installed dependencies with `yarn` (or `npm install` or `pnpm install`), start a development server:

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm build
```

You can preview the production build with `pnpm preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

[sveltekit]: https://kit.svelte.dev
[unocss]: https://github.com/unocss/unocss
[vanilla extract]: https://vanilla-extract.style
[houdini]: https://houdinigraphql.com
