declare module "redux-persist-encrypted-storage" {
  export interface ReduxPersistSectoredStorage {
    getItem(key: string): Promise<any>;
    setItem: (
      key: string,
      value: any,
      callback?: (error: any) => any
    ) => Promise<any>;
    removeItem(key: string, callback?: (error: any) => any): Promise<any>;
  }

  export default function(): ReduxPersistSectoredStorage;
}
