<script>

    import { fade } from 'svelte/transition';
    import CharacterMapping from './CharacterMapping.svelte';
    import ResultCharacters from './ResultCharacters.svelte';
    import ResultNumber from './ResultNumber.svelte';

    export let version;

    let numberMapping;
    let mappingNumbers;
    let name = "";
    let nameParts = [];
    let charParts = [];
    let charNumberParts = [];
    let selectedMapping = "Chaldean";
    let showMapping = false;
    $: {
        switch (selectedMapping) {
            case "Chaldean":
                numberMapping = {
                    1: ["a", "i", "j", "q", "y"],
                    2: ["b", "k", "r"],
                    3: ["c", "g", "l", "s"],
                    4: ["d", "m", "t"],
                    5: ["e", "h", "n", "x"],
                    6: ["u", "v", "w"],
                    7: ["o", "z"],
                    8: ["f", "p"]
                }
                break;
            case "Phytagorean":
                numberMapping = {
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
                break;
            default:
                alert("No mapping defined for " + selectedMapping);
        }

        mappingNumbers = Object.keys(numberMapping).reduce((newObject, number) => {
            newObject[number] = [];
            return newObject;
        }, {});

        const charMap = new Map(Object.keys(numberMapping).flatMap(function (key) {
            return numberMapping[key].map(char => [char, Number(key)])
        }));

        nameParts = name
            .toLowerCase()
            .split(" ")
            .filter(elem => elem !== "");

        charParts = nameParts.map(namePart => [...namePart.toLowerCase()].filter(char => char !== ' '));
        charNumberParts = charParts.map(charPart => charPart.map(char => {
            if (!isNaN(char)) {
                return Number(char);
            }
            return charMap.get(char);
        }));
    }

</script>

<style>
    h1 {
        color: purple;
    }

    .centered {
        text-align: center;
    }

    /*Keep all other flexbox elements stable when showing the mapping*/
    .fixedWidth {
        width: 132px;
        text-align: left;
    }
</style>

<h1 class="centered">Name Numerology Calculator {version}</h1>

<div class="centered">
    <div style="display:flex; flex-direction: row; justify-content: center; align-items: flex-start; flex-wrap:wrap">
        <input bind:value={name} type="text" autofocus autocomplete="off" autocorrect="off" autocapitalize="off"
            spellcheck="false" />
        &nbsp;&nbsp;&nbsp;
        <select bind:value={selectedMapping}>
            <option value="Chaldean">Chaldean</option>
            <option value="Phytagorean">Phytagorean</option>
        </select>
        &nbsp;&nbsp;&nbsp;
        {#if showMapping}
                <span class="fixedWidth" on:click={()=>showMapping=!showMapping} in:fade="{{ duration: 200 }}" >
                    <CharacterMapping {numberMapping} />
                </span>
            {:else} 
                <span class="fixedWidth" on:click={()=>showMapping=!showMapping} in:fade="{{ duration: 200 }}" >
                    <CharacterMapping numberMapping={mappingNumbers} />
                </span>
            {/if}
    </div>
    <hr />
    <br />

    <div style="display:flex; flex-direction: row; justify-content: center">
        {#each nameParts as namePart,i }
            {#if i>0}
                &nbsp;&nbsp;&nbsp;
            {/if}
            <ResultCharacters chars={charParts[i]} charNumbers={charNumberParts[i]} partCount={charParts.length} />
        {/each}
    </div>
    <br />
    <ResultNumber numbers = {charNumberParts.flat()}/>
</div>