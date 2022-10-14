import { ForwardedRef, MutableRefObject, useEffect, useRef } from 'react';

// https://itnext.io/reusing-the-ref-from-forwardref-with-react-hooks-4ce9df693dd

function useCombinedRefs<T>(
  ...refs: (MutableRefObject<T> | ForwardedRef<T> | ((r: T) => void))[]
): MutableRefObject<T> {
  const targetRef = useRef<T>();

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref || !targetRef.current) return;
      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef as MutableRefObject<T>;
}

export default useCombinedRefs;
