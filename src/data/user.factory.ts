import { faker } from '@faker-js/faker';

export interface UserData {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
}

export class UserFactory {
  static create(prefix = 'test'): UserData {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const rand = faker.number.int({ min: 10000, max: 999999 });
    return {
      name: `${firstName}${rand}`,
      email: `${prefix}_${rand}_${Date.now()}@example.com`.toLowerCase(),
      password: 'Test@12345',
      firstName,
      lastName,
      company: faker.company.name(),
      address: faker.location.streetAddress(),
      country: 'India',
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode('######'),
      mobile: faker.string.numeric(10),
      birthDay: '10',
      birthMonth: '5',
      birthYear: '1995',
    };
  }
  static createInvalid() {
    return { email: `invalid_${Date.now()}@example.com`, password: 'Wrong123' };
  }
  static createContact() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      subject: `Subject ${Date.now()}`,
      message: faker.lorem.paragraph(),
    };
  }
}
export class ProductData {
  static search = { valid: ['Top','Tshirt','Dress'], invalid: 'xyznonexistent123' };
}
