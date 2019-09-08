<script>
    import ResultCharacters from './ResultCharacters.svelte';
    import ResultNumber from './ResultNumber.svelte';

    import { charMap } from './stores.js';

    export let name;
    let nameParts = [];
    let charParts = [];
    let charNumberParts = [];

    $: {
        nameParts = name
            .split(" ")
            .filter(elem => elem !== "");
        charParts = nameParts.map(namePart => [...namePart].filter(char => char !== ' '));
        charNumberParts = charParts.map(charPart => charPart.map(char => {
            if (!isNaN(char)) {
                return Number(char);
            }
            return $charMap.get(char.toLowerCase());
        }));
    }
</script>

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