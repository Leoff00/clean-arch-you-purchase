export interface CacheStore {
  deleteCallsCount: number;
  delete: (key: string) => void;
  insert: (key: string, value: any) => void;
}
