<script>
    import ResultNumber from './ResultNumber.svelte';

    export let chars;
    export let charNumbers;
    export let partCount;
</script>

<style>
    table {
        overflow: hidden;
        border-bottom: 1pt solid #ccc;
    }

    td,
    th {
        position: relative;
    }

    td:hover::after,
    th:hover::after {
        content: "";
        position: absolute;
        background-color: rgb(167, 167, 236);
        left: 0;
        top: -5000px;
        height: 10000px;
        width: 100%;
        z-index: -1;
    }
</style>

<div>
    <table>
        <tr>
            {#each chars as char}
                <td>{char}</td>
            {/each}
        </tr>
        <tr>
            {#each charNumbers as charNumber}
                <td>{charNumber}</td>
            {/each}
        </tr>
    </table>
    {#if partCount >1}
        <ResultNumber numbers={charNumbers} />
    {/if}
</div>