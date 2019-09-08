<!-- Table showing which character maps to which number based on the selected numerology system -->

<script>
    import { fade, fly } from 'svelte/transition';
    import { characterMapping } from './stores.js';

    $: maxCharCount = Object.keys($characterMapping).reduce((max, number) => Math.max(max, $characterMapping[number].length), 0);
    let expandMapping = false;
</script>

<table class="fixedWidth" on:click={()=>expandMapping=!expandMapping}>
    <tr>
        {#each Object.keys($characterMapping) as number}
            <th>{number}</th>
        {/each}
    </tr>
        {#each [...Array(maxCharCount).keys()] as row}
            <tr transition:fade="{{ duration: 270 }}" class={ expandMapping ? '' : 'hidden' }>
                {#each Object.values($characterMapping) as mapping}
                    <td>{mapping[row] || ""}</td>
                {/each}
            </tr>
        {/each}
</table>

<style>
    table {
        color: var(--color3);
        padding: 0.1em
    }

    table:hover {
        cursor: pointer;
    }

    td {
        color: var(--color4);
    }

    /*Keep all other flexbox elements stable when showing the mapping*/
    .fixedWidth {
        width: 132px;
        text-align: left;
    }

    .hidden {
        visibility: collapse;
    }
</style>