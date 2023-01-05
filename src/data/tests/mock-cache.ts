import { CacheStore } from "@/data/protocols/cache";
import { SavePurchases } from "@/domain/usecases";
import { vi } from "vitest";

export namespace CacheStoreSpyNS {
  export enum Action {
    delete,
    insert,
  }
}
export class CacheStoreSpy implements CacheStore {
  actions: Array<CacheStoreSpyNS.Action> = [];
  deleteKey: string;
  insertKey: string;
  insertValues: Array<SavePurchases.Params> = [];

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
}
