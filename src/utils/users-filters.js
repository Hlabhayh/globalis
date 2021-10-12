export default class UsersFilters {
  eyeColor = null;
  ageRange = null;

  constructor() {
    // filtration grâce à des paramètre en query "?" dans l'URL;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const eyeColor = urlParams.get("eyeColor");
    const ageRange = urlParams.get("age");
    // filtration suivant les valeurs: `blue`, `brown`, `green`;
    if (["blue", "brown", "green"].includes(eyeColor)) {
      this.eyeColor = eyeColor;
    }
    //filtration par tranche de 5 ans;
    if (["20-25", "26-30", "31-35", "36-41"].includes(ageRange)) {
      const [start, end] = ageRange.split("-");
      this.ageRange = {
        start: Number(start),
        end: Number(end),
      };
    }
  }
  // verification si l'un des deux filteres exist ( eyeColor & age );
  fulfilled(user) {
    return this.eyeColorFilter(user.eyeColor) && this.ageRangeFilter(user.age);
  }
  
  eyeColorFilter(eyeColor) {
    if (!this.eyeColor) {
      return true;
    }

    return this.eyeColor === eyeColor;
  }

  ageRangeFilter(age) {
    if (!this.ageRange) {
      return true;
    }

    return this.ageRange.start <= age && this.ageRange.end >= age;
  }
};