// Açık doküman sayfasının başlıklarını (TOC) kenar çubuğuyla paylaşmak için küçük bir depo.
let current = null;
const listeners = new Set();

export function setToc(toc) {
  current = toc;
  listeners.forEach((l) => l());
}
export function subscribe(l) {
  listeners.add(l);
  return () => listeners.delete(l);
}
export function getToc() {
  return current;
}
export function getServerToc() {
  return null;
}
