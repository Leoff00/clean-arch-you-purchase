import { CacheStore } from "@/data/protocols/cache";
import { SavePurchases } from "@/domain/usecases";
import { vi } from "vitest";

export const getCacheExpirationDate = (timestamp: Date): Date => {
  const maxCacheAge = new Date(timestamp);
  maxCacheAge.setDate(maxCacheAge.getDate() - 3);
  return maxCacheAge;
};
export namespace CacheStoreSpyNS {
  export enum Action {
    delete,
    insert,
    fetch,
  }
}
export class CacheStoreSpy implements CacheStore {
  actions: Array<CacheStoreSpyNS.Action> = [];
  deleteKey: string;
  insertKey: string;
  fetchKey: string;
  insertValues: Array<SavePurchases.Params> = [];
  fetchResult: any;

  fetch(key: string): any {
    this.actions.push(CacheStoreSpyNS.Action.fetch);
    this.fetchKey = key;
    return this.fetchResult;
  }

  delete(key: string): void {
    this.actions.push(CacheStoreSpyNS.Action.delete);
    this.deleteKey = key;
  }

  insert(key: string, value: any): void {
    this.actions.push(CacheStoreSpyNS.Action.insert);
    this.insertKey = key;
    this.insertValues = value;
  }

  replace(key: string, value: any): void {
    this.delete(key);
    this.insert(key, value);
  }

  simulateDeleteError(): void {
    vi.spyOn(CacheStoreSpy.prototype, "delete").mockImplementationOnce(() => {
      this.actions.push(CacheStoreSpyNS.Action.delete);
      throw new Error();
    });
  }

  simulateInsertError(): void {
    vi.spyOn(CacheStoreSpy.prototype, "insert").mockImplementationOnce(() => {
      this.actions.push(CacheStoreSpyNS.Action.insert);
      throw new Error();
    });
  }

  simulateFetchError(): void {
    vi.spyOn(CacheStoreSpy.prototype, "fetch").mockImplementationOnce(() => {
      this.actions.push(CacheStoreSpyNS.Action.fetch);
      throw new Error();
    });
  }
}
