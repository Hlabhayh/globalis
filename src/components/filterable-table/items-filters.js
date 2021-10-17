export default class ItemsFilters {
  filtersList = null;
  urlParams = null;

  constructor(filtersList) {
    this.filtersList = filtersList;
    // filtration grâce à des paramètre en query "?" dans l'URL;
    const queryString = window.location.search;
    this.urlParams = new URLSearchParams(queryString);
  }
  
  fulfilled(item) {
    if (!this.filtersList) {
      return true;
    }
    const fulfilledFilters = this.filtersList.map((filter) => {
      if (!this.urlParams.has(filter.name)) {
        return true;
      }

      if (
        filter.allowedValues &&
        !filter.allowedValues.includes(this.urlParams.get(filter.name))
      ) {
        return true;
      }

      switch (filter.type) {
        case "STRING":
          return item[filter.name] === this.urlParams.get(filter.name);

        case "NUMBER":
        case "BOOLEAN":
          return (
            item[filter.name] === JSON.parse(this.urlParams.get(filter.name))
          );

        case "RANGE":
          const [start, end] = this.urlParams.get(filter.name).split("-");
          return (
            item[filter.name] >= Number(start) &&
            item[filter.name] <= Number(end)
          );

        default:
          return true;
      }
    });

    return fulfilledFilters.filter((v) => v).length === this.filtersList.length;
  }
}
