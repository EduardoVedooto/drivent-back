import CpfNotAvailableError from "@/errors/CpfNotAvailable";
import EnrollmentData from "@/interfaces/enrollment";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, getManager } from "typeorm";
import Address from "@/entities/Address";

@Entity("enrollments")
export default class Enrollment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  birthday: string;

  @Column()
  phone: string;

  @Column()
  userId: number;

  @Column()
  image: string;

  @OneToOne(() => Address, (address) => address.enrollment, { eager: true })
  address: Address;

  populateFromData(data: EnrollmentData) {
    this.name = data.name;
    this.cpf = data.cpf;
    this.birthday = data.birthday;
    this.phone = data.phone;
    this.userId = data.userId;
    this.image = data.image || "";

    this.address ||= Address.create();
    const { address } = this;

    address.cep = data.address.cep;
    address.street = data.address.street;
    address.city = data.address.city;
    address.number = data.address.number;
    address.state = data.address.state;
    address.neighborhood = data.address.neighborhood;
    address.addressDetail = data.address.addressDetail;
  }

  static async createOrUpdate(data: EnrollmentData) {
    let enrollment = await this.findOne({ where: { cpf: data.cpf } });

    if(enrollment && enrollment.userId !== data.userId) {
      throw new CpfNotAvailableError(data.cpf>);
    }
    
    await getManager().transaction(async transactionalEntityManager => {
      enrollment ||= Enrollment.create();
      enrollment.populateFromData(data);

      await transactionalEntityManager.save(enrollment);

      enrollment.address.enrollment = enrollment;
      await transactionalEntityManager.save(enrollment.address);
    });

    return enrollment;
  }

  static async getByUserIdWithAddress(userId: number) {
    return await this.findOne({ where: { userId } });
  }
}
