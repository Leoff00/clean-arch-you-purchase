import { PurchaseModel } from "@/domain/models";

export namespace LoadPurchases {
  export type Result = PurchaseModel;
}

export interface SavePurchases {
  loadAll: () => Promise<Array<LoadPurchases.Result>>;
}
