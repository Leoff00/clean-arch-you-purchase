import { SavePurchases } from "@/domain/usecases";
import { faker } from "@faker-js/faker";

export const mockPurchases = (): Array<SavePurchases.Params> => {
  return [
    {
      id: faker.random.alphaNumeric(),
      date: faker.date.recent(),
      value: Number(faker.random.numeric()),
    },
    {
      id: faker.random.alphaNumeric(),
      date: faker.date.recent(),
      value: Number(faker.random.numeric()),
    },
  ];
};
