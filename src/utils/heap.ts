import type { ClientFragment } from "@/__generated__/dashboards-api";
import { PROCESS_CONFIG } from "@/process-config";

export const HEAP_APP_ID = "728099901";

function init() {
  if (!PROCESS_CONFIG.enableHeap) return;
  window.heap?.load(HEAP_APP_ID);
}

function setIntercomId(intercomId: string | null) {
  if (!PROCESS_CONFIG.enableHeap) return;
  window.heap?.addUserProperties({ intercomId });
}

function identify(email: string) {
  if (!PROCESS_CONFIG.enableHeap) return;
  window.heap?.identify(email);
}

function track(eventName: string) {
  if (!PROCESS_CONFIG.enableHeap) return;
  window.heap?.track(eventName);
}

function setClient(client: ClientFragment | null) {
  if (!PROCESS_CONFIG.enableHeap) return;

  const clientKey = client?.clientKey ?? null;
  const clientTier = client?.tier ?? null;

  window.heap?.addUserProperties({ clientKey, clientTier });
}

export const Heap = {
  init,
  setIntercomId,
  identify,
  track,
  setClient,
};
