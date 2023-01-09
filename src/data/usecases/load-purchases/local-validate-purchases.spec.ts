import { describe, expect, test } from "vitest";
import { LocalLoadPurchases } from "@/data/usecases/load-purchases";
import { CacheStoreSpy, CacheStoreSpyNS, mockPurchases, getCacheExpirationDate } from "@/data/tests";

type SutTypes = {
  sut: LocalLoadPurchases;
  cacheStore: CacheStoreSpy;
};

const makeSut = (timestamp = new Date()): SutTypes => {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalLoadPurchases(cacheStore, timestamp);
  return {
    sut,
    cacheStore,
  };
};

describe("LocalSavePurchases", () => {
  test("Should not delete or insert cache on sut.init", () => {
    const { cacheStore } = makeSut();
    expect(cacheStore.actions).toEqual([]);
  });

  test("Should delete cache if load fails", () => {
    const { cacheStore, sut } = makeSut();
    cacheStore.simulateFetchError();
    sut.validate();
    expect(cacheStore.actions).toEqual([CacheStoreSpyNS.Action.fetch, CacheStoreSpyNS.Action.delete]);
    expect(cacheStore.deleteKey).toBe("purchases");
  });

  test("Should has no side effect if load succeeds", () => {
    const currentDate = new Date();
    const timestamp = getCacheExpirationDate(currentDate);
    timestamp.setSeconds(timestamp.getSeconds() + 1);
    const { cacheStore, sut } = makeSut(timestamp);
    cacheStore.fetchResult = { timestamp };
    sut.validate();
    expect(cacheStore.actions).toEqual([CacheStoreSpyNS.Action.fetch]);
    expect(cacheStore.fetchKey).toBe("purchases");
  });

  test("Should delete cache if is expired", () => {
    const currentDate = new Date();
    const timestamp = getCacheExpirationDate(currentDate);
    timestamp.setDate(timestamp.getDate() - 3);
    timestamp.setSeconds(timestamp.getSeconds() - 1);
    const { cacheStore, sut } = makeSut(currentDate);
    cacheStore.fetchResult = { timestamp };
    sut.validate();
    expect(cacheStore.actions).toEqual([CacheStoreSpyNS.Action.fetch, CacheStoreSpyNS.Action.delete]);
    expect(cacheStore.fetchKey).toBe("purchases");
    expect(cacheStore.deleteKey).toBe("purchases");
  });

  test("Should delete cache if its on expiration date", () => {
    const currentDate = new Date();
    const timestamp = getCacheExpirationDate(currentDate);
    timestamp.setDate(timestamp.getDate() - 3);
    const { cacheStore, sut } = makeSut(currentDate);
    cacheStore.fetchResult = { timestamp };
    sut.validate();
    expect(cacheStore.actions).toEqual([CacheStoreSpyNS.Action.fetch, CacheStoreSpyNS.Action.delete]);
    expect(cacheStore.fetchKey).toBe("purchases");
    expect(cacheStore.deleteKey).toBe("purchases");
  });
});
