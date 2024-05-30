import {
    Accessor,
    createContext,
    createEffect,
    createSignal,
    onMount,
    useContext,
} from "solid-js";

export type KeyContext = {
    allKeys: Accessor<string[]>;
    lastKey: Accessor<string | null>;
};

const KeyContext = createContext<KeyContext>({
    allKeys: () => [],
    lastKey: () => null,
});

export function KeyContextProvider(props: { layout?: string; children: any }) {
    const [keys, setKeys] = createSignal<string[]>([]);
    const [lastKey, setLastKey] = createSignal<string | null>(null);

    createEffect(() => {
        console.log(keys());
    });

    function onKeyDown(event: KeyboardEvent) {
        if (event.key === "Tab") {
            event.preventDefault();
        }
        if (event.repeat) return;
        setKeys((keys) => [...keys, event.key]);
        setLastKey(event.key);
    }

    function onKeyUp(event: KeyboardEvent) {
        setTimeout(() => {
            setKeys((keys) => keys.filter((key) => key !== event.key));
        }, 100);
    }

    onMount(() => {
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
    });

    const values = {
        allKeys: keys,
        lastKey: lastKey,
    };

    return (
        <KeyContext.Provider value={values}>
            {props.children}
        </KeyContext.Provider>
    );
}

export function useKeyContext() {
    return useContext(KeyContext);
}
