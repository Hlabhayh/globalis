import FilterableTable from "../src/components/filterable-table/filterable-table";
import ItemsService from "../src/components/filterable-table/items-service";

jest.mock("../src/components/filterable-table/items-service");

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
    eyeColor: "brown",
    name: {
      first: "robert",
      last: "Jackson",
    },
    company: "ROB",
    email: "henson.jacobson@delphide.org",
    phone: "+1 (746) 597-3879",
  },
];

describe("FilterableTable", () => {
  beforeAll(() => {
    customElements.define("filterable-table", FilterableTable);
  })

  beforeEach(() => {
    ItemsService.mockImplementation(() => {
      return {
        fetchAll: () => {
          return new Promise((r) => r(MOCK_ITEM));
        },
      };
    });
  });

  it('updates the innerHTML to contain Data', async () => {
    document.body.innerHTML = `
      <filterable-table 
        columns='[{"label":"Nom","name":"name.last"},{"label":"Prénom","name":"name.first"},{"label":"Age","name":"age"}]' 
        filters='[]'
        api-url="http://localhost:3000/data">
      </filterable-table>
      `;

    await new Promise((r) => r());

    expect(document.body.innerHTML).toContain("<td>38</td>");
    expect(document.body.innerHTML).toContain("<td>Jacobson</td>");
    expect(document.body.innerHTML).toContain("<td>Henson</td>");
  });

  it('should not contain element if not match with search query by age ', async () => {
    window.history.pushState({}, "jest", "/?age=20-25");
    document.body.innerHTML = `
      <filterable-table 
        columns='[{"label":"Nom","name":"name.last"},{"label":"Prénom","name":"name.first"},{"label":"Age","name":"age"}]' 
        filters='[{"name":"age","type":"RANGE","allowedValues":["20-25","26-30","31-35","36-41"]}]'
        api-url="http://localhost:3000/data">
      </filterable-table>
      `;

    await new Promise((r) => r());

    expect(document.body.innerHTML).not.toContain("38");
  });

  it('should contain element if match with searched query by eye color', async () => {
    window.history.pushState({}, "jest", "/?eyeColor=blue");
    document.body.innerHTML = `
      <filterable-table 
        columns='[{"label":"Nom","name":"name.last"},{"label":"Prénom","name":"name.first"},{"label":"Age","name":"age"},{"label":"Couleur des yeux","name":"eyeColor"}]' 
        filters='[{"name":"age","type":"RANGE","allowedValues":["20-25","26-30","31-35","36-41"]},{"name":"eyeColor","type":"STRING","allowedValues":["blue","brown","green"]}]'
        api-url="http://localhost:3000/data">
      </filterable-table>
      `;

    await new Promise((r) => r());

    expect(document.body.innerHTML).toContain("blue");
  });

  it('should contain elements if match with searched query by age and eye color', async () => {
    window.history.pushState({}, "jest", "/?eyeColor=blue&age=26-30");
    document.body.innerHTML = `
      <filterable-table 
        columns='[{"label":"Nom","name":"name.last"},{"label":"Prénom","name":"name.first"},{"label":"Age","name":"age"},{"label":"Couleur des yeux","name":"eyeColor"}]' 
        filters='[{"name":"age","type":"RANGE","allowedValues":["20-25","26-30","31-35","36-41"]},{"name":"eyeColor","type":"STRING","allowedValues":["blue","brown","green"]}]'
        api-url="http://localhost:3000/data">
      </filterable-table>
      `;

    await new Promise((r) => r());

    expect(document.body.innerHTML).toContain("30");
    expect(document.body.innerHTML).toContain("blue");
  });

  it('should contain elements if not match with searched query by age and eye color', async () => {
    window.history.pushState({}, "jest", "/?eyeColor=yellow&age=10-15");
    document.body.innerHTML = `
      <filterable-table 
        columns='[{"label":"Nom","name":"name.last"},{"label":"Prénom","name":"name.first"},{"label":"Age","name":"age"},{"label":"Couleur des yeux","name":"eyeColor"}]' 
        filters='[{"name":"age","type":"RANGE","allowedValues":["20-25","26-30","31-35","36-41"]},{"name":"eyeColor","type":"STRING","allowedValues":["blue","brown","green"]}]'
        api-url="http://localhost:3000/data">
      </filterable-table>
      `;

    await new Promise((r) => r());

    expect(document.body.innerHTML).toContain("38");
    expect(document.body.innerHTML).toContain("blue");
  });
});
