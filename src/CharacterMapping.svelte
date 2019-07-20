<script>
    export let numberMapping;

    $: maxCharCount = Object.keys(numberMapping).reduce((max, number) => Math.max(max, numberMapping[number].length), 0);
</script>

<style>
    th {
        color: rgb(96, 170, 100);
    }
</style>

<table>
    <tr>
        {#each Object.keys(numberMapping) as number}
            <th>{number}</th>
        {/each}
    </tr>
    {#each [...Array(maxCharCount).keys()] as row}
    <tr>
        {#each Object.values(numberMapping) as mapping}
            <td>{mapping[row] || ""}</td>
        {/each}
    </tr>
    {/each}
</table>