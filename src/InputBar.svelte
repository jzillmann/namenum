<!-- Name input & numerology selection  -->

<script>
    import { nameInput, activeName, systems, selectedSystem } from './stores.js';
    import CharacterMappings from './CharacterMappings.svelte';

    // Re-focus name input once an element is pinned
    let inputElement;
    $: {
        if (inputElement && $nameInput === "") {
            inputElement.focus();
        }
    }
</script>

<div style="display:flex; flex-direction: row; justify-content: center; align-items: flex-start; flex-wrap:wrap">

    <input bind:this={inputElement} bind:value={$nameInput} type="text" autofocus autocomplete="off" autocorrect="off"
        autocapitalize="off" spellcheck="false" on:keydown={e=> e.which === 13 && activeName.pin($activeName)}>

    &nbsp;&nbsp;&nbsp;

    <select bind:value={$selectedSystem}>
        {#each systems as system}
            <option value={system}>{system}</option>
        {/each}
    </select>
    
    &nbsp;&nbsp;&nbsp;

    <CharacterMappings/>
    
</div>