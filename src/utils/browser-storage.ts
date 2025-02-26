import type { DecoratedDataSetQueryResult } from "@/api/queries/use-decorated-data-set-query";
import z from "zod";

const storageVarsSchema = z.object({
  activeDataSet: z.custom<DecoratedDataSetQueryResult>(),
  hideBetaCta: z.boolean(),
});

export type StorageVars = z.infer<typeof storageVarsSchema>;

const makeStorage = (kind: "local" | "session" = "session") => {
  const storage = kind === "local" ? localStorage : sessionStorage;

  const setItem = <T extends keyof StorageVars>(key: T, value: StorageVars[T]) => {
    // @ts-ignore
    const parsedItem = storageVarsSchema.pick({ [key]: true }).safeParse({ [key]: value });
    if (parsedItem.success) {
      storage.setItem(key, JSON.stringify(parsedItem.data[key]));
    } else {
      console.error(`Invalid key or value for local storage: ${key}`);
    }
  };
  const getItem = <T extends keyof StorageVars>(key: T) => {
    const item = JSON.parse(storage.getItem(key) ?? "null");

    if (!item) {
      console.info("No item found in local storage for key: ", key);
      return null;
    }

    const parsedItem = storageVarsSchema.safeParse({ [key]: item });

    if (parsedItem.success) {
      return parsedItem.data[key];
    }

    storage.removeItem(key);
    console.error(`Invalid key or value for local storage: ${key}`);
    return null;
  };

  const removeItem = <T extends keyof StorageVars>(key: T) => {
    storage.removeItem(key);
  };

  return { setItem, getItem, removeItem };
};

export const localStore = makeStorage("local");
export const sessionStore = makeStorage("session");
