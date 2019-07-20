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
    let chars = [];
    let charNumbers = [];
    let number;
    $: {
        chars = [...name.toLowerCase()];
        charNumbers = chars.map(char => charMap.get(char));
        number = charNumbers.reduce((sum, charNumber) => sum + charNumber, 0);
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
    <CharacterResult {chars} {charNumbers} />
    <br />
    <div><b>{number}</b></div>
</div>