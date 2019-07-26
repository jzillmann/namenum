<script>
    import ResultCharacters from './ResultCharacters.svelte';
    import ResultNumber from './ResultNumber.svelte';

    export let name;
    export let charMap;
    let nameParts = [];
    let charParts = [];
    let charNumberParts = [];

    $: {
        nameParts = name
            .toLowerCase()
            .split(" ")
            .filter(elem => elem !== "");
        charParts = nameParts.map(namePart => [...namePart.toLowerCase()].filter(char => char !== ' '));
        charNumberParts = charParts.map(charPart => charPart.map(char => {
            if (!isNaN(char)) {
                return Number(char);
            }
            return charMap.get(char);
        }));
    }
</script>

<style>

</style>

<div style="display:flex; flex-direction: row; justify-content: center">
    {#each nameParts as namePart,i }
    {#if i>0}
    &nbsp;&nbsp;&nbsp;
    {/if}
    <ResultCharacters chars={charParts[i]} charNumbers={charNumberParts[i]} partCount={charParts.length} />
    {/each}
</div>
<br />
<div style="display:flex; flex-direction: row; justify-content: center; align-items: flex-start; flex-wrap:wrap">
    <ResultNumber numbers = {charNumberParts.flat()}/>
</div>