import { useCallback, useEffect, useRef, useState } from 'react';
import { getPg } from './api.js';

const MIN = 1000;

// loads one page at a time, stops when a page comes back empty
export default function usePics() {
  const [pics, setPics] = useState([]);
  const [pg, setPg] = useState(1);
  const [ld, setLd] = useState(false);
  const [more, setMore] = useState(true);
  const [err, setErr] = useState(null);
  const busy = useRef(false);

  const load = useCallback(async () => {
    if (busy.current || !more) return;
    busy.current = true;
    setLd(true);
    setErr(null);
    const t0 = Date.now();
    try {
      const d = await getPg(pg);
     
      await new Promise((ok) => setTimeout(ok, Math.max(0, MIN - (Date.now() - t0))));
      if (d.length === 0) {
        setMore(false);
      } else {
        setPics((p) => {
          const ids = new Set(p.map((x) => x.id));
          return [...p, ...d.filter((x) => !ids.has(x.id)).map((x) => ({ ...x, lk: 0 }))];
        });
        setPg((n) => n + 1);
      }
    } catch (e) {
      setErr(e.message);
    } finally {
      busy.current = false;
      setLd(false);
    }
  }, [pg, more]);

  const like = useCallback((id) => {
    setPics((p) => p.map((x) => (x.id === id ? { ...x, lk: x.lk + 1 } : x)));
  }, []);

  return { pics, ld, more, err, load, like };
}


export function useScrl(fn, on, key) {
  const ref = useRef(null);
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => {
    const el = ref.current;
    if (!el || !on) return;
    const obs = new IntersectionObserver((es) => es[0].isIntersecting && fnRef.current());
    obs.observe(el);
    return () => obs.disconnect();
  }, [on, key]); 

  return ref;
}
