<script>
    export let numbers;
    let crossfoots = [];
    $: {
        crossfoots = [];
        let currentCrossfootNumbers = numbers.filter(number => !isNaN(number));
        do {
            let nextCrossfoot = calculateCrossfoot(currentCrossfootNumbers);
            crossfoots = [...crossfoots, nextCrossfoot];
            currentCrossfootNumbers = nextCrossfoot.toString().split("").map(singleNumber => Number(singleNumber));
        } while (currentCrossfootNumbers.length > 1);
    }

    function calculateCrossfoot(numberArray) {
        return numberArray.reduce((sum, number) => sum + number, 0);
    }

</script>

<div>
    {#each crossfoots as crossfoot, i}
        {#if i>0}
            {' / '}
        {/if}
        {#if i==crossfoots.length-1 && i >0}
            <u><b>{crossfoot}</b></u>
        {:else}
            <b>{crossfoot}</b>
        {/if}
    {/each}
</div>