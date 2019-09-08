<!-- Shows the active name & the pinned names -->

<script>
    import { fade, crossfade, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { flip } from 'svelte/animate';

    import Icon from 'fa-svelte'
    import { faMapPin } from '@fortawesome/free-solid-svg-icons/faMapPin'
    import { faTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt'

    import { activeName, pinnedNames } from './stores.js';
    import NameCard from './NameCard.svelte';

    const [send, receive] = crossfade({
        duration: d => Math.sqrt(d * 3000),

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
        <div out:send="{{key: entry.id}}" animate:flip>
            <NameCard name={entry.name}>  
                <div on:click="{ () => activeName.pin($activeName) }">
                    <Icon icon={faMapPin}/>
                </div>
            </NameCard>  
        </div>
    {/each}
</div>

<!-- Pinned Names -->
{#if $pinnedNames.length > 0}
        <h3 in:fade={{ duration: 2000 }} out:fade={{ duration: 200 }} style="margin-top: 60px">Pinned Items</h3>
        <div class="pinnedCards">
            {#each $pinnedNames as entry (entry.id)}
            <div in:receive="{{key: entry.id}}" out:send="{{key: entry.id}}" animate:flip>
                <NameCard name={entry.name}>
                    <div on:click="{ () => pinnedNames.remove(entry) }">
                        <Icon icon={faTrashAlt}/>
                    </div>
                </NameCard>
            </div>
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

    .hidden {
        visibility: collapse;
    }

</style>