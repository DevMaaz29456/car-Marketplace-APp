import { faker } from "@faker-js/faker";
function createRandomCarList() {
  return {
    name: faker.vehicle.vehicle(),
    fuelType: faker.vehicle.fuel(),
    model: faker.vehicle.model(),
    type: faker.vehicle.type(),
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTET-fMfK92ySh8YM6FMSr6e8JgGqKu0_Frwg&s",
    miles: 1000,
    gearType: "Automatic",
    price: faker.finance.amount({ min: 4000, max: 200000 }),
  };
}

const CarList = faker.helpers.multiple(createRandomCarList, {
  count: 7,
});
export default {
  CarList,
};
