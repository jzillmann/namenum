<script>

    import CharacterResult from './CharacterResult.svelte';

    export let version;
    const numberMapping = {
        1: ["a", "j", "s"],
        2: ["b", "k", "t", "ö", "ß"],
        3: ["c", "l", "u"],
        4: ["d", "m", "v"],
        5: ["e", "n", "w"],
        6: ["f", "o", "x", "ä"],
        7: ["g", "p", "y"],
        8: ["h", "q", "z", "ü"],
        9: ["i", "r"]
    }
    const charMap = new Map(Object.keys(numberMapping).flatMap(function (key) {
        return numberMapping[key].map(char => [char, Number(key)])
    }));

    let name = "";
    let nameParts = [];
    let charParts = [];
    let charNumberParts = [];
    let number;
    $: {
        nameParts = name
            .toLowerCase()
            .split(" ")
            .filter(elem => elem !== "");

        charParts = nameParts.map(namePart => [...namePart.toLowerCase()].filter(char => char !== ' '));
        charNumberParts = charParts.map(charPart => charPart.map(char => charMap.get(char)));
        number = charNumberParts.flat().reduce((sum, charNumber) => sum + charNumber, 0);
    }
	// TODO recursivly resolve final number
	// TODO handle invalid characters
</script>

<style>
    h1 {
        color: purple;
    }

    .centered {
        text-align: center;
    }
</style>

<h1 class="centered">Name Numerology Calculator {version}</h1>

<div class="centered">
    <form>
        <input bind:value={name} type="text" autofocus autocomplete="off" autocorrect="off" autocapitalize="off"
            spellcheck="false" />
    </form>
    <hr />
    <br />

    <div style="display:flex; flex-direction: row; justify-content: center">
        {#each nameParts as namePart,i }
            {#if i>0}
                {' . '}
            {/if}
            <CharacterResult chars={charParts[i]} charNumbers={charNumberParts[i]} />
        {/each}
    </div>
    <br />
    <div><b>{number}</b></div>
</div>