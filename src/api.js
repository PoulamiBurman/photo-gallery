
const BU = import.meta.env.VITE_USE_PROXY === 'true' ? '/picsum' : 'https://picsum.photos';

export async function getPg(pg) {
  const r = await fetch(`${BU}/v2/list?page=${pg}`);
  if (!r.ok) throw new Error(`Request failed with status ${r.status}`);
  return r.json();
}
