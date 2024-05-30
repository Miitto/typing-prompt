import { For, Show, createSignal, onMount } from "solid-js";
import { useLayoutContext } from "./LayoutContextProvider";
import { A } from "node_modules/@kobalte/core/dist/index-bbdc4715";

export default function Keyboard() {
    const layoutContext = useLayoutContext();
    const layout = layoutContext?.layout;
    const [keys, setKeys] = createSignal<string[]>([]);

    const maxLength = () =>
        layout!()?.layout.reduce((acc, row) => Math.max(acc, row.length), 0) ??
        0;

    function onKeyDown(event: KeyboardEvent) {
        setKeys((keys) => [...keys, event.key]);
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

    return (
        <div class="w-fit h-fit ">
            <Show when={layout}>
                <div class="flex h-8 w-fit flex-col">
                    <For each={layout!()?.layout ?? []}>
                        {(row) => (
                            <div class="flex w-8 h-full">
                                <For each={row}>
                                    {(key) => (
                                        <div
                                            class="w-8 h-8 border border-border flex grow-0 shrink-0 justify-center"
                                            classList={{
                                                "bg-accent": keys().includes(
                                                    key.key
                                                ),
                                                "bg-blue-700":
                                                    key.finger === 4 &&
                                                    !keys().includes(key.key),
                                                "bg-fuchsia-600":
                                                    key.finger === 5 &&
                                                    !keys().includes(key.key),
                                                "bg-yellow-600":
                                                    (key.finger === 2 ||
                                                        key.finger === 6) &&
                                                    !keys().includes(key.key),
                                                "bg-lime-500":
                                                    (key.finger === 3 ||
                                                        key.finger === 7) &&
                                                    !keys().includes(key.key),
                                                "bg-emerald-600":
                                                    (key.finger === 1 ||
                                                        key.finger === 8) &&
                                                    !keys().includes(key.key),
                                            }}
                                        >
                                            <p>{key.key.toUpperCase()}</p>
                                        </div>
                                    )}
                                </For>
                            </div>
                        )}
                    </For>
                </div>
            </Show>
        </div>
    );
}
