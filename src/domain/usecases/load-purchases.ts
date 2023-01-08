import { PurchaseModel } from "@/domain/models";

export namespace LoadPurchases {
  export type Result = PurchaseModel;
}

export interface LoadPurchases {
  loadAll: () => Promise<Array<LoadPurchases.Result>>;
}
