import { expect } from "chai";
import sinon from "sinon";
import UsersService from "../src/services/users-service.js";
import axios from "axios";

const MOCK_USERS = [
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

describe("UsersService", () => {
  let sandbox;
  const usersService = new UsersService();

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("Should have basePath", () => {
    expect(usersService).to.have.property("basePath");
  });

  it("Should be a function", () => {
    expect(usersService.fetchAll).to.be.a("function");
  });

  it("Should get Api result", (done) => {
    const resolved = new Promise((r) => r({ data: MOCK_USERS }));
    sandbox.stub(axios, "get").returns(resolved);

    usersService
      .fetchAll()
      .then((response) => {
        expect(response).to.deep.equal(MOCK_USERS);
      })
      .then(done, done);
  });
});
