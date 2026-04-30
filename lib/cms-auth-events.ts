const CMS_AUTH_CHANGED_EVENT = "cms-auth-changed";

export function emitCmsAuthChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CMS_AUTH_CHANGED_EVENT));
}

export function subscribeToCmsAuthChanged(listener: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handler = () => listener();
  window.addEventListener(CMS_AUTH_CHANGED_EVENT, handler);

  return () => {
    window.removeEventListener(CMS_AUTH_CHANGED_EVENT, handler);
  };
}
