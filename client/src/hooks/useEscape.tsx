import React, { useEffect } from "react";

export function useKeypress(key: string, action: Function, deps: []) {
    useEffect(() => {
        function onKeyup(e: KeyboardEvent) {
            if (e.key === key) action();
        }
        window.addEventListener("keyup", onKeyup);
        return () => window.removeEventListener("keyup", onKeyup);
    }, deps);
}

