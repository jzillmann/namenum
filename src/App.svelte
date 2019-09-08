<script>

    import InputBar from './InputBar.svelte';
    import NamesDisplay from './NamesDisplay.svelte';

    export let version;

</script>

<h1 class="centered">Name Numerology Calculator</h1>

<div class="centered">
    <InputBar />
    <hr />
    <br />
    <NamesDisplay />

    <div class="footer">
        <a href="https://github.com/jzillmann/nanuca">Nanuca {version}</a>
    </div>
</div>