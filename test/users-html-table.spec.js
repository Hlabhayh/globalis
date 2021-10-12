import { expect } from "chai";
import jsdom from "jsdom";
import UsersHtmlTable from "../src/dom/users-html-table.js";

const USER_MOCK = [
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
];

describe("UserHtmlTable", () => {

  before(() => {
    return jsdom.JSDOM.fromFile("./dist/index.html").then((dom) => {
      global.window = dom.window;
      global.document = window.document;
    });
  });

  it("$container should not be null before render", () => {
    const usersHtmlTable = new UsersHtmlTable();
    expect(usersHtmlTable.$container).to.be.not.null;
  });

  it('updates the innerHTML of element with id "users"', () => {
    const usersHtmlTable = new UsersHtmlTable();
    usersHtmlTable.render(USER_MOCK);
    const usersHtml = document.querySelector("#users tbody").innerHTML;
    expect(usersHtml).to.deep.include(`<td>38</td>`);
    expect(usersHtml).to.deep.include(`<td>blue</td>`);
    expect(usersHtml).to.deep.include(`<td>Henson</td>`);
    expect(usersHtml).to.deep.include(`<td>Jacobson</td>`);
    expect(usersHtml).to.deep.include(`<td>DELPHIDE</td>`);
    expect(usersHtml).to.deep.include(`<td>henson.jacobson@delphide.org</td>`);
    expect(usersHtml).to.deep.include(`<td>+1 (846) 597-3879</td>`);
  });
});