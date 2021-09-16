import faker from "faker/locale/pt_BR";

import Enrollment from "@/entities/Enrollment";

export async function createEnrollment(userId: number) {
  const enrollmentData = {
    name: faker.name.findName(),
    cpf: "012.345.678-90",
    birthday: "01-09-2021",
    phone: faker.phone.phoneNumber(),
    image: "data:image/png;base64,", 
    userId,
    address: {
      cep: faker.address.zipCode(),
      street: faker.address.streetName(),
      city: faker.address.city(),
      number: "123",
      state: faker.address.state(),
      neighborhood: faker.address.cityName(),
      addressDetail: faker.lorem.word(),
    }
  };
  const enrollment = await Enrollment.create(enrollmentData);
  await enrollment.save();

  return enrollment;
}
