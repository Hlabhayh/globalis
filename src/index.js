import UsersHtmlTable from './dom/users-html-table.js';
import UsersService from './services/users-service.js';
import UsersFilters from './utils/users-filters.js';

async function init() {
  const usersService = new UsersService();
  const usersHtmlTable = new UsersHtmlTable();
  const usersFilters = new UsersFilters();

  const users = await usersService.fetchAll();

  usersHtmlTable.render(users.filter(user => usersFilters.fulfilled(user)));
}

window.addEventListener("DOMContentLoaded", () => init());