declare module "redux-persist-encrypted-storage" {
  export interface ReduxPersistSectoredStorage {
    getItem(key: string): Promise<void>;

    setItem(key: string, value: string): Promise<string | null>;

    removeItem(key: string): Promise<void>;
  }

  export default function(): ReduxPersistSectoredStorage;
}
