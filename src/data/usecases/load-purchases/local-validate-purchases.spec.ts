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
});
