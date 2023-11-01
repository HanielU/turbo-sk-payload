<script lang="ts">
  import { trpc } from "$lib/trpc";

  let msg = "";

  async function handleClick() {
    msg = await trpc().greeting.query();

    setTimeout(() => {
      msg = "";
    }, 2000);
  }
</script>

<!-- Unocss intellisense doesn't work when usng icons unless you download the icon pack -->
<!-- https://github.com/unocss/unocss/tree/main/packages/preset-icons -->

<svelte:head>
  <title>Sveltekit & Unocss template</title>
</svelte:head>

<div transition-400 flex h-full select-none text-center>
  <div m-auto>
    <!-- svelte-ignore a11y-missing-content -->
    <div m-2 flex h-max items-center justify-center gap-2 text-2xl>
      <a
        i-logos-unocss
        transition-200
        brightness="200%"
        hover:brightness="150%"
        text-inherit
        href="https://uno.antfu.me/"
        target="_blank"
        rel="noreferrer"
      />
      <!-- demarcation start -->
      <div class="text-2rem op-30">+</div>
      <!-- demarcation end -->
      <a
        i-logos-svelte-kit
        transition-200
        hover:op-80
        text-40
        text-inherit
        href="https://kit.svelte.dev"
        target="_blank"
        rel="noreferrer"
      />
    </div>

    <div op-30 fw-300 max-w-40ch m="b-2 t--14" text-lg>
      The fastest way to build svelte apps with the Instant on-demand Atomic CSS
      engine
    </div>

    <button class="bg-indigo-6 p-2 rd-full" on:click={handleClick}>
      From Backend: {msg}
    </button>
  </div>
</div>

<div op-30 fw-300 absolute bottom-5 right-0 left-0 text-center>
  on-demand · instant · fully customizable
</div>
