import { Show, createSignal, onMount } from "solid-js";
import { invoke } from "@tauri-apps/api/tauri";
import { ColorModeProvider, ColorModeScript } from "@kobalte/core";
import Keyboard from "./Keyboard";
import { LayoutContextProvider } from "./LayoutContextProvider";

function App() {
    const [keyEvent, setKeyEvent] = createSignal<KeyboardEvent | null>(null);
    const key = () => keyEvent()?.key;

    function onKeyDown(event: KeyboardEvent) {
        setKeyEvent(event);
    }

    onMount(() => {
        window.addEventListener("keydown", onKeyDown);
    });

    return (
        <>
            <ColorModeScript />
            <ColorModeProvider>
                <LayoutContextProvider layout="colemak-dh">
                    <main>
                        <Keyboard />
                    </main>
                </LayoutContextProvider>
            </ColorModeProvider>
        </>
    );
}

export default App;
