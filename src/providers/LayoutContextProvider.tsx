import {
    Accessor,
    Setter,
    createContext,
    createSignal,
    useContext,
} from "solid-js";
import { Layout } from "../lib/types/layout";
import { layouts } from "../lib/layouts/layouts";

export type LayoutContext = {
    layout: Accessor<Layout | null>;
    setLayout: Setter<Layout | null>;
};

const LayoutContext = createContext<LayoutContext>();

export function LayoutContextProvider(props: {
    layout?: string;
    children: any;
}) {
    const [layout, setLayout] = createSignal<Layout | null>(null);

    if (props.layout) {
        setLayout(layouts[props.layout]);
    }

    const values = {
        layout: layout,
        setLayout: setLayout,
    };

    return (
        <LayoutContext.Provider value={values}>
            {props.children}
        </LayoutContext.Provider>
    );
}

export function useLayoutContext() {
    return useContext(LayoutContext);
}
