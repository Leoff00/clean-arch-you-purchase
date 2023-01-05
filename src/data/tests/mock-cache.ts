import { CacheStore } from "@/data/protocols/cache";
import { SavePurchases } from "@/domain/usecases";
import { vi } from "vitest";

export namespace CacheStoreSpyNS {
  export enum Message {
    delete,
    insert,
  }
}
export class CacheStoreSpy implements CacheStore {
  messages: Array<CacheStoreSpyNS.Message> = [];
  deleteKey: string;
  insertKey: string;
  insertValues: Array<SavePurchases.Params> = [];

  delete(key: string): void {
    this.messages.push(CacheStoreSpyNS.Message.delete);
    this.deleteKey = key;
  }

  insert(key: string, value: any): void {
    this.messages.push(CacheStoreSpyNS.Message.insert);
    this.insertKey = key;
    this.insertValues = value;
  }

  simulateDeleteError(): void {
    vi.spyOn(CacheStoreSpy.prototype, "delete").mockImplementationOnce(() => {
      this.messages.push(CacheStoreSpyNS.Message.delete);
      throw new Error();
    });
  }

  simulateInsertError(): void {
    vi.spyOn(CacheStoreSpy.prototype, "insert").mockImplementationOnce(() => {
      this.messages.push(CacheStoreSpyNS.Message.insert);
      throw new Error();
    });
  }
}
