<script>
  import Home from './routes/Home.svelte';  // 이렇게 되어 있어야 합니다
</script>

<main>
  <Home />
</main>

<style>
  :global(html), :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: 100%;
    width: 100%;
  }
</style>