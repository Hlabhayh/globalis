import { expect } from "chai";
import UsersFilters from "../src/utils/users-filters.js";

describe("UsersFilters", () => {

  it("Should fill ageRange property and leave eyeColor null", () => {
    global.window = {
      location: {
        search: "?age=20-25",
      },
    };
    const usersFilters = new UsersFilters();
    expect(usersFilters.ageRange).to.deep.equal({ start: 20, end: 25 });
    expect(usersFilters.eyeColor).to.be.null;
  });

  it("Should fill eyeColor property and leave ageRange null", () => {
    global.window = {
      location: {
        search: "?eyeColor=blue",
      },
    };
    const usersFilters = new UsersFilters();
    expect(usersFilters.eyeColor).to.equal("blue");
    expect(usersFilters.ageRange).to.be.null;
  });

  it("Should leave eyeColor and ageRange null if they have wrong values", () => {
    global.window = {
      location: {
        search: "?eyeColor=yellow&age=41-45",
      },
    };
    const usersFilters = new UsersFilters();
    expect(usersFilters.eyeColor).to.be.null;
    expect(usersFilters.ageRange).to.be.null;
  });

  describe('ageRangeFilter', () => {
    it("should return true when filter matched", () => {
      global.window = {
        location: {
          search: "?age=26-30",
        },
      };
      const usersFilters = new UsersFilters();
      expect(usersFilters.ageRangeFilter(26)).to.be.true;
    });

    it("should return false when filter not matched", () => {
      global.window = {
        location: {
          search: "?age=26-30",
        },
      };
      const usersFilters = new UsersFilters();
      expect(usersFilters.ageRangeFilter(20)).to.be.false;
    });

    it("should return true when there is no filter", () => {
      global.window = {
        location: {
          search: "",
        },
      };
      const usersFilters = new UsersFilters();
      expect(usersFilters.ageRangeFilter(1)).to.be.true;
    });
  });

  describe('eyeColorFilter', () => {

    it("should return true when filter matched", () => {
      global.window = {
        location: {
          search: "?eyeColor=blue",
        },
      };
      const usersFilters = new UsersFilters();
      expect(usersFilters.eyeColorFilter('blue')).to.be.true;
    });

    it("should return false when filter not matched", () => {
      global.window = {
        location: {
          search: "?eyeColor=brown",
        },
      };
      const usersFilters = new UsersFilters();
      expect(usersFilters.eyeColorFilter('yellow')).to.be.false;
    });

    it("should return true when there is no filter", () => {
      global.window = {
        location: {
          search: "",
        },
      };
      const usersFilters = new UsersFilters();
      expect(usersFilters.ageRangeFilter('black')).to.be.true;
    });
  });

  describe('fulfilled', () => {

    it("should return true when All filters matched", () => {
      global.window = {
        location: {
          search: "?eyeColor=blue&age=20-25",
        },
      };
      const usersFilters = new UsersFilters();
      expect(usersFilters.fulfilled({eyeColor: 'blue', age: 25})).to.be.true;
    });

    it("should return false when any filter not matched", () => {
      global.window = {
        location: {
          search: "?eyeColor=brown&age=20-25",
        },
      };
      const usersFilters = new UsersFilters();
      expect(usersFilters.fulfilled({eyeColor: 'black', age: 21})).to.be.false;
    });

    it("should return true when there is no filter", () => {
      global.window = {
        location: {
          search: "",
        },
      };
      const usersFilters = new UsersFilters();
      expect(usersFilters.fulfilled({eyeColor: 'black', age: 21})).to.be.true;
    });
  });

});