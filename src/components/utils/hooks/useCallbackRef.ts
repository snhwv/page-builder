import { useRef, useCallback } from "react";

export default function useCallbackRef(rawCallback: any) {
  const cleanupRef = useRef(null);
  const callback = useCallback(
    (node) => {
      if (typeof cleanupRef.current === "function") {
        (cleanupRef.current as any)();
        cleanupRef.current = null;
      }

      if (node) {
        cleanupRef.current = rawCallback(node);
      }
    },
    [rawCallback]
  );

  return callback;
}
