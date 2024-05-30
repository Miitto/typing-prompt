import { For, Show, createEffect } from "solid-js";
import { useLayoutContext } from "./providers/LayoutContextProvider";
import { useKeyContext } from "./providers/KeyContextProvider";

export default function Keyboard() {
    const layoutContext = useLayoutContext();
    const layout = layoutContext?.layout;

    const { allKeys: keys } = useKeyContext();

    const maxLength = () =>
        layout!()?.layout.reduce((acc, row) => Math.max(acc, row.length), 0) ??
        0;

    createEffect(() => {
        console.log(maxLength());
    });

    return (
        <div class="w-fit h-fit ">
            <Show when={layout}>
                <div
                    style={`grid-template-columns: 4rem repeat(${maxLength()}, 3rem);`}
                    class="grid w-full h-full gap-0.5"
                >
                    <For each={layout!()?.layout ?? []}>
                        {(row, i) => (
                            <div class="grid grid-cols-subgrid col-span-full h-12">
                                <Show when={i() === 0}>
                                    <div
                                        class="w-full h-full flex grow-0 shrink-0 justify-center items-center"
                                        classList={{
                                            "bg-accent": keys().includes("Tab"),
                                            "bg-emerald-600":
                                                !keys().includes("Tab"),
                                        }}
                                    >
                                        <p>Tab</p>
                                    </div>
                                </Show>
                                <Show when={i() === 1}>
                                    <div
                                        class="w-full h-full flex grow-0 shrink-0 justify-center items-center"
                                        classList={{
                                            "bg-accent":
                                                keys().includes("Shift"),
                                            "bg-emerald-600":
                                                !keys().includes("Shift"),
                                        }}
                                    >
                                        <p>Shift</p>
                                    </div>
                                </Show>
                                <Show when={i() === 2}>
                                    <div
                                        class="w-full h-full flex grow-0 shrink-0 justify-center items-center"
                                        classList={{
                                            "bg-accent":
                                                keys().includes("Control"),
                                            "bg-emerald-600":
                                                !keys().includes("Control"),
                                        }}
                                    >
                                        <p>Ctrl</p>
                                    </div>
                                </Show>
                                <For each={row}>
                                    {(key) => (
                                        <div
                                            class="w-12 h-full flex grow-0 shrink-0 justify-center items-center"
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
