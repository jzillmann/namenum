<!-- Active or pinned name card with number results -->

<script>
    import CharacterNumbers from './CharacterNumbers.svelte';
    import NameNumber from './NameNumber.svelte';

    import { charMap } from './stores.js';

    // Name item {id, name}
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

<div class="cardContainer">
    <label class="card">
        <div style="display:flex; flex-direction: row; justify-content: center">
            {#each nameParts as namePart,i }
                {#if i>0}
                    &nbsp;&nbsp;&nbsp;
                {/if}
                <CharacterNumbers chars={charParts[i]} charNumbers={charNumberParts[i]} partCount={charParts.length} />
            {/each}
        </div>
        
        <br />
        <div style="display:flex; flex-direction: row; justify-content: center; align-items: flex-start; flex-wrap:wrap">
            <NameNumber numbers = {charNumberParts.flat()}/>
        </div>
    </label>
    <div class="cardAction">
        <slot></slot>
    </div>
</div>

<style>

    .cardContainer {
        position: relative;
    }

    .card {
        box-shadow: 0 4px 8px 0 var(--color3);
        border-radius: 2px;
        padding: 20px;
        margin: 0 15px 15px;
        min-height: 85px;
        min-width: 145px;
    }

    .cardAction {
        position: absolute;
        top: 5%;
        left: 84%;
        color: var(--color3);
    }

    label {
        user-select: none;
    }
    
</style>