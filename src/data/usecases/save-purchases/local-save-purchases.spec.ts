import { describe, expect, test } from "vitest";
import { LocalSavePurchases } from "@/data/usecases/save-purchases";
import { mockPurchases, CacheStoreSpy, CacheStoreSpyNS } from "@/data/tests";

type SutTypes = {
  sut: LocalSavePurchases;
  cacheStore: CacheStoreSpy;
};

const makeSut = (timestamp = new Date()): SutTypes => {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalSavePurchases(cacheStore, timestamp);
  return {
    sut,
    cacheStore,
  };
};

describe("LocalSavePurchases", () => {
  test("Should not delete or insert cache on sut.init", () => {
    const { cacheStore } = makeSut();
    expect(cacheStore.messages).toEqual([]);
  });

  test("Should not insert new Cache if delete fails", async () => {
    const { cacheStore, sut } = makeSut();
    cacheStore.simulateDeleteError();
    const promise = sut.save(mockPurchases());
    expect(cacheStore.messages).toEqual([CacheStoreSpyNS.Message.delete]);
    await expect(promise).rejects.toThrow();
  });

  test("Should not insert new Cache if delete succeeds", async () => {
    const timestamp = new Date();
    const { cacheStore, sut } = makeSut(timestamp);
    const purchases = mockPurchases();
    const promise = sut.save(purchases);

    expect(cacheStore.messages).toEqual([CacheStoreSpyNS.Message.delete, CacheStoreSpyNS.Message.insert]);
    expect(cacheStore.insertKey).toBe("purchases");
    expect(cacheStore.insertValues).toEqual({ timestamp, value: purchases });
    await expect(promise).resolves.toBeFalsy();
  });

  test("Should throw if insert throws", async () => {
    const { cacheStore, sut } = makeSut();
    cacheStore.simulateInsertError();
    const promise = sut.save(mockPurchases());

    expect(cacheStore.messages).toEqual([CacheStoreSpyNS.Message.delete, CacheStoreSpyNS.Message.insert]);
    await expect(promise).rejects.toThrow();
  });
});
