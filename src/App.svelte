<script>

    import { fade, crossfade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { flip } from 'svelte/animate';
    import CharacterMapping from './CharacterMapping.svelte';
    import Result from './Result.svelte';

    export let version;

    let name = "";
    let numberMapping;
    let mappingNumbers;
    let charMap;
    let selectedMapping = "Chaldean";
    let showMapping = false;

    let uid = -1;
    let results = [freshResult()];
    $: {
        results[uid].name = name;

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

        charMap = new Map(Object.keys(numberMapping).flatMap(function (key) {
            return numberMapping[key].map(char => [char, Number(key)])
        }));
    }

    const [send, receive] = crossfade({
        duration: d => Math.sqrt(d * 2000),

        fallback(node, params) {
            const style = getComputedStyle(node);
            const transform = style.transform === 'none' ? '' : style.transform;

            return {
                duration: 600,
                easing: quintOut,
                css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
            };
        }
    });

    let pinnedResults = [];
    let inputElement;
    function pinResult() {
        if (name !== "") {
            const resultToPin = results.filter(r => !r.pinned)[0];
            resultToPin.pinned = true;
            results = [...results, freshResult()];
            name = "";
        }
        inputElement.focus();
    }

    function freshResult() {
        return { id: uid++, name, pinned: false };
    }

</script>

<h1 class="centered">Name Numerology Calculator</h1>

<div class="centered">
    <div style="display:flex; flex-direction: row; justify-content: center; align-items: flex-start; flex-wrap:wrap">
        <input bind:this={inputElement} bind:value={name} type="text" autofocus autocomplete="off" autocorrect="off"
            autocapitalize="off" spellcheck="false" on:keydown={e=> e.which === 13 && pinResult()}/>
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

    &nbsp;&nbsp;&nbsp;
    {#each results.filter(r => !r.pinned) as result (result.id)}
        <label in:receive="{{key: result.id}}" out:send="{{key: result.id}}" animate:flip>
            <Result name={result.name} {charMap} />
        </label>
    {/each}

    {#if name !==""}
        <button on:click="{() => pinResult()}">Pin</button>
    {/if}

    <br/><br/><br/><br/>
    {#if results.filter(r => r.pinned).length > 0}
        <h3 in:fade>Pinned Items</h3>
        {#each results.filter(r => r.pinned) as result (result.id)}
            <label in:receive="{{key: result.id}}" out:send="{{key: result.id}}" animate:flip>
                <Result name={result.name} {charMap} />
                <br />
            </label>
        {/each}
    {/if}

    <div class="footer">
        <a href="https://github.com/jzillmann/nanuca">Nanuca {version}</a>
    </div>
</div>

<style>
    /*Keep all other flexbox elements stable when showing the mapping*/
    .fixedWidth {
        width: 132px;
        text-align: left;
    }

    td {
        color: var(--color4);
    }

    h3 {
        color: var(--color3);
    }

    .colored {
        color: red;
    }

    .left {
        text-align: left;
    }

    .right {
        text-align: right;
    }
</style>