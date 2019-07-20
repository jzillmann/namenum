<script>
    export let numbers;
    let crossfoots = [];
    $: {
        crossfoots = [];
        let currentCrossfootNumbers = numbers;
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
    <b>{crossfoots.join(' / ')}</b>
</div>