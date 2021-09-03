import User from "@/entities/User";
import Enrollment from "@/entities/Enrollment";

export async function createEnrollment(user: User) {
  const data = {
    name: "mock",
    cpf: "14190475742",
    birthday: "1990/04/02",
    phone: "+5521971275567",
    userId: user.id,
    address: {
      cep: "20540220",
      street: "Rua Gastao Penalva",
      city: "Rio de Janeiro",
      number: "38",
      state: "RJ",
      neighborhood: "Andarai",
      addressDetail: "304",
    },
  };

  const enrollment = await Enrollment.createOrUpdate(data);

  return enrollment;
}
