import { PetType } from '../graphql'

export const getPetByIdFixture: PetType = {
  id: 'fake-id',
  name: 'Fake Pet Name',
  birthDate: new Date('2018-11-11T01:00:00.000Z'),
  breed: {
    name: 'Fake Pet Breed'
  },
  tutors: [
    {
      id: 'fake-id',
      firstName: 'Fake',
      lastName: 'Tutor',
      phoneNumber: '(99) 99999-9999'
    }
  ]
}
