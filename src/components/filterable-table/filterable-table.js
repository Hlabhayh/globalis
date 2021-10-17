import ItemsService from "./items-service.js";
import ItemsFilters from "./items-filters.js";

export default class FilterableTable extends HTMLElement {
  constructor() {
    super();
  }

  get items() {
    return JSON.parse(this.getAttribute("items"));
  }

  set items(data) {
    const itemsFilters = new ItemsFilters(JSON.parse(this.filters));
    const items = data.filter((item) => itemsFilters.fulfilled(item));
    this.setAttribute("items", JSON.stringify(items));
  }

  static get observedAttributes() {
    return ["api-url", "columns", "filters", "items"];
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (name === "api-url") {
      if (!newValue) {
        throw Error("No api-url provided");
      }

      const itemsService = new ItemsService(newValue);
      this.items = await itemsService.fetchAll();
    }

    if (name === "columns") {
      if (!newValue) {
        throw Error("No columns provided");
      }
      this.columns = JSON.parse(newValue);
    }

    if (name === "filters" && newValue) {
      this.filters = newValue;
    }

    if (name === "items" && newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  renderHeaders() {
    return this.columns
      .map((column) => {
        return `
        <th>${column.label}</th>
      `;
      })
      .join("");
  }

  renderItems() {
    return this.items
      .map((item) => {
        return `
        <tr>       
          ${this.columns
            .map((column) => {
              if (column.name.indexOf(".") !== -1) {
                const value = column.name.split(".").reduce((acc, namePart) => {
                  return acc[namePart];
                }, item);
                return `
                <td>${value}</td>
              `;
              }
              return `
              <td>${item[column.name]}</td>
            `;
            })
            .join("")}
        </tr>
      `;
      })
      .join("");
  }

  render() {
    if (!this.items) {
      this.innerHTML = `Loading...`;
    } else {
      this.innerHTML = `
        <table class="table table-striped">
          <thead>
            <tr>
              ${this.renderHeaders()}
            </tr>
          </thead>  
          <tbody>
            ${this.renderItems()}
          </tbody>
        </table>
      `;
    }
  }
}
