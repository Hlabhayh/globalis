import ItemsService from "../src/components/filterable-table/items-service.js";

const MOCK_ITEM = [
  {
    age: 38,
    eyeColor: "blue",
    name: {
      first: "Henson",
      last: "Jacobson",
    },
    company: "DELPHIDE",
    email: "henson.jacobson@delphide.org",
    phone: "+1 (846) 597-3879",
  },
  {
    age: 28,
    eyeColor: "blue",
    name: {
      first: "robert",
      last: "Jackson",
    },
    company: "ROB",
    email: "henson.jacobson@delphide.org",
    phone: "+1 (746) 597-3879",
  },
];

describe("itemsService", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(MOCK_ITEM),
    })
  );

  beforeEach(() => {
    fetch.mockClear();
  });

  it("Should Call Api and receive results", async () => {
    const itemsService = new ItemsService();

    const res = await itemsService.fetchAll();

    expect(res).toMatchObject(MOCK_ITEM);
    expect(fetch.mock.calls.length).toEqual(1);
  });
});