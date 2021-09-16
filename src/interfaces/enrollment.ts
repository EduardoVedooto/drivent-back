import AddressData from "@/interfaces/address";

interface EnrollmentData {
    name: string,
    cpf: string,
    birthday: string,
    address: AddressData,
    phone: string, 
    userId: number,
    image: string
}

export default EnrollmentData;
