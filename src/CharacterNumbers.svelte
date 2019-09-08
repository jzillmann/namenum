<!-- Table mapping each character of a name to a number based on the choosen numerology system  -->

<script>
    import NameNumber from './NameNumber.svelte';

    export let chars;
    export let charNumbers;
    export let partCount;

    function highlightElements(elementId) {
        var elements = document.getElementsByClassName(elementId);
        var n = elements.length;
        for (var i = 0; i < n; i++) {
            elements[i].classList.add("highlighted");
        }
    }

    function lowlightElements(elementId) {
        var elements = document.getElementsByClassName(elementId);
        var n = elements.length;
        for (var i = 0; i < n; i++) {
            elements[i].classList.remove("highlighted");
        }
    }
</script>

<div>
    <table>
        <tr>
            {#each chars as char }
                <td class={"char_"+char } 
                    on:mouseover={ ()=> highlightElements("char_"+char)}
                    on:mouseout={ ()=> lowlightElements("char_"+char)}
                >{char}
                </td>
            {/each}
        </tr>
        <tr>
            {#each charNumbers as charNumber}
                {#if isNaN(charNumber)}
                    <td>?</td>
                {:else}
                    <td class={"num_"+charNumber }
                        on:mouseover={ ()=> highlightElements("num_"+charNumber)}
                        on:mouseout={ ()=> lowlightElements("num_"+charNumber)}
                    >{charNumber}
                </td>
                {/if}
            {/each}
        </tr>
    </table>
    {#if partCount >1}
        <br/>
        <NameNumber numbers={charNumbers} />
    {/if}
</div>

<style>
    table {
        border-bottom: 1pt solid var(--color3);
    }
    
    .highlighted {
        background-color: var(--color3);
    }
</style>