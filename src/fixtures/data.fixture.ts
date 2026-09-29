import { UserFactory } from '../data/user.factory';
export const dataFixtures = {
  userData: async ({}, use) => { await use(UserFactory.create()); },
};
