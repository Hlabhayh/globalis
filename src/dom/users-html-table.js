export default class UsersHtmlTable {
  $container = null;

  constructor() {
    this.$container = document.querySelector("#users tbody");
  }

  render(users) {
    this.$container.innerHTML = users
      .map((user) => this.createRow(user))
      .join("");
  }

  createRow(user) {
    return `
      <tr>
        <td>${user.name.last}</td>
        <td>${user.name.first}</td>
        <td>${user.age}</td>
        <td>${user.eyeColor}</td>
        <td>${user.phone}</td>
        <td>${user.company}</td>
        <td>${user.email}</td>
      </tr>
    `;
  }
}