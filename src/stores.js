import { writable, derived } from 'svelte/store';

/** Helper function to define and export stores in one step */
function result(func) {
    return func();
}

/** The current value of the name input field */
export const nameInput = result(() => {
    const { subscribe, set } = writable('');
    return {
        subscribe,
        set,
        clear: () => set('')
    };
});

/** List of pinned name entries */
export const pinnedNames = result(() => {
    const { subscribe, update } = writable([]);
    return {
        subscribe,
        add: (entry) => {
            update(entries => [...entries, entry])
        },
        remove: (entry) => {
            update(entries => entries.filter(e => e.id !== entry.id))
        }
    }
});

/**  Active name item containing the name plus an id which is required for the crossfade animation */
export const activeName = result(() => {
    let uid = 0;
    const { subscribe } = derived(nameInput, $nameInput => {
        return { id: uid, name: $nameInput }
    })
    return {
        subscribe,
        pin: (value) => {
            /** Move the item to pinned names */
            if (value.name !== "") {
                pinnedNames.add(value);
                uid++;
                nameInput.clear();
            }
        }
    };
});

/** There are different numerology systems */
export const systems = ['Chaldean', 'Phytagorean'];

/** The selected system */
export const selectedSystem = result(() => {
    const { subscribe, set } = writable(systems[0]);
    return {
        subscribe,
        set: (value) => {
            if (!systems.includes(value)) {
                throw Error(`System '${value}' not included in ${systems}`);
            }
            set(value)
        }
    };
});

/** The character to number mapping for the selected system */
export const characterMapping = derived(
    selectedSystem,
    $selectedSystem => {
        switch ($selectedSystem) {
            case "Chaldean":
                return {
                    1: ["a", "i", "j", "q", "y"],
                    2: ["b", "k", "r"],
                    3: ["c", "g", "l", "s"],
                    4: ["d", "m", "t"],
                    5: ["e", "h", "n", "x"],
                    6: ["u", "v", "w"],
                    7: ["o", "z"],
                    8: ["f", "p"]
                }
            case "Phytagorean":
                return {
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
            default:
                throw Error("No mapping defined for " + $selectedSystem);
        }
    }
);

/** Number lookup map for a char */
export const charMap = derived(
    characterMapping,
    $characterMapping => new Map(Object.keys($characterMapping).flatMap(function (key) {
        return $characterMapping[key].map(char => [char, Number(key)])
    }))
);

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

const initialName = getParameterByName('name');
if (initialName) {
    nameInput.set(initialName);
}

const initialNames = getParameterByName('names');
if (initialNames) {
    let uid = 0;
    initialNames.split(',').forEach(name => {
        activeName.pin({ id: uid++, name });
    });
}
