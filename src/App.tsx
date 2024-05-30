import { invoke } from "@tauri-apps/api/tauri";
import { ColorModeProvider, ColorModeScript } from "@kobalte/core";
import Keyboard from "./Keyboard";
import { LayoutContextProvider } from "./providers/LayoutContextProvider";
import { KeyContextProvider } from "./providers/KeyContextProvider";

function App() {
    return (
        <>
            <ColorModeScript />
            <ColorModeProvider>
                <LayoutContextProvider layout="colemak-dh">
                    <KeyContextProvider>
                        <main class="flex flex-col items-center justify-center h-full grow">
                            <Keyboard />
                        </main>
                    </KeyContextProvider>
                </LayoutContextProvider>
            </ColorModeProvider>
        </>
    );
}

export default App;
