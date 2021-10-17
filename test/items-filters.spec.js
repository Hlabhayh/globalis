import ItemsFilters from "../src/components/filterable-table/items-filters.js";

const MOCK_ITEM = {
  age: 38,
  eyeColor: "blue",
  name: {
    first: "Henson",
    last: "Jacobson",
  },
  company: "DELPHIDE",
  email: "henson.jacobson@delphide.org",
  phone: "+1 (846) 597-3879",
};

const filters = [
  {
    name: "age",
    type: "RANGE",
    allowedValues: ["20-25", "26-30", "31-35", "36-41"],
  },
  {
    name: "eyeColor",
    type: "STRING",
    allowedValues: ["blue", "brown", "green"],
  },
];

describe("ItemsFilters", () => {
  it("Should return correct value when filtered", () => {
    window.history.pushState({}, "jest", "/?age=20-25&eyeColor=blue");

    const itemsFilters = new ItemsFilters(filters);

    expect(itemsFilters.fulfilled(MOCK_ITEM)).toEqual(false);
    expect(itemsFilters.fulfilled({ ...MOCK_ITEM, age: 22 })).toEqual(true);
    expect(itemsFilters.fulfilled({ ...MOCK_ITEM, age: 22, eyeColor: "brown" })).toEqual(false);
  });
});
