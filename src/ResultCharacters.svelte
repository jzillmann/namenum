<script>
    import ResultNumber from './ResultNumber.svelte';

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

<style>
    table {
        overflow: hidden;
        border-bottom: 1pt solid #ccc;
    }

    .highlighted {
        background-color: rgb(167, 167, 236);
    }
</style>

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
                <td class={"num_"+charNumber }
                    on:mouseover={ ()=> highlightElements("num_"+charNumber)}
                    on:mouseout={ ()=> lowlightElements("num_"+charNumber)}
                >{charNumber}
                </td>
            {/each}
        </tr>
    </table>
    {#if partCount >1}
        <ResultNumber numbers={charNumbers} />
    {/if}
</div>