<script>
    import { fade, crossfade, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { flip } from 'svelte/animate';

    import Icon from 'fa-svelte'
    import { faMapPin } from '@fortawesome/free-solid-svg-icons/faMapPin'
    import { faTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt'

    import { activeName, pinnedNames } from './stores.js';
    import Result from './Result.svelte';

    const [send, receive] = crossfade({
        duration: d => Math.sqrt(d * 300),

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
</script>

<!-- Current Name -->
<div style="display:flex; justify-content: center" class={$activeName.name==="" ? "hidden" : "" }>
    {#each [$activeName] as entry (entry.id)}
        <label class="card" out:send="{{key: entry.id}}" animate:flip>
            <div class="cardAction" on:click="{ () => activeName.pin($activeName) }">
                <Icon icon={faMapPin}/>
            </div>
            <Result name={entry.name} />
        </label>
    {/each}
</div>

<!-- Pinned Names -->
{#if $pinnedNames.length > 0}
        <h3 in:fade style="margin-top: 60px">Pinned Items</h3>
        <div class="pinnedCards">
            {#each $pinnedNames as entry (entry.id)}
                <label class="card" in:receive="{{key: entry.id}}" out:send="{{key: entry.id}}" animate:flip>
                    <div class="cardAction" on:click="{ () => pinnedNames.remove(entry) }">
                        <Icon icon={faTrashAlt}/>
                    </div>
                    <Result name={entry.name}/>
                    <br />
                </label>
            {/each}
        </div>
    {/if}

<style>
    
    h3 {
        color: var(--color3);
    }
    .pinnedCards {
        display:flex;
        flex-direction: row;
        flex-wrap:wrap;
        justify-content: center;
    }

    .card {
        box-shadow: 0 4px 8px 0 var(--color3);
        border-radius: 2px;
        padding: 20px;
        margin: 0 15px 15px;
        min-height: 85px;
        min-width: 145px;
    }

    .hidden {
        visibility: collapse;
    }

    .cardAction {
        position: relative;
        float: right;
        top: -12px;
        right: -15px;
        color: var(--color3);
    }

    label {
        user-select: none;
    }
    
</style>