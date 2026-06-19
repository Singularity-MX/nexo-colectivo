    import { useEffect, useState } from "react";

    export const usePageLoader = (deps = []) => {
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            setLoading(true);

            const timer = setTimeout(() => {
                setLoading(false);
            }, 400);

            return () => clearTimeout(timer);
        }, deps);

        return loading;
    };