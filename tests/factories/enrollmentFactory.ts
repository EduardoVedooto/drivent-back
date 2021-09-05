import faker from "faker/locale/pt_BR";

import Enrollment from "@/entities/Enrollment";

export async function createEnrollment(userId: number) {
  const enrollmentData = {
    name: faker.name.findName(),
    cpf: "012.345.678-90",
    birthday: faker.date.past(),
    address: {
      cep: faker.address.zipCode(),
      street: faker.address.streetName(),
      city: faker.address.city(),
      number: "123",
      state: faker.address.state(),
      neighborhood: faker.address.cityName(),
      addressDetail: faker.lorem.word(),
    },
    phone: faker.phone.phoneNumber(),
    userId,
  };

  const enrollment = await Enrollment.create(enrollmentData);
  await enrollment.save();
  return enrollment;
}
