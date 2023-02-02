import { PetType } from 'pages/Pet/graphql'

export const getAllPetsFixture: Omit<PetType, 'tutors'>[] = [
  {
    id: 'c504316d-5d49-4a8e-8d3f-0e47e94a8694',
    name: 'Fake Pet Name 1',
    birthDate: new Date('2018-11-11T01:00:00.000Z'),
    createdAt: new Date('2022-12-30T17:45:40.000Z'),
    breed: {
      name: 'Fake Breed 1'
    },
    count: 2
  },
  {
    id: '54737ecb-ed7e-4f5a-b645-25e7033f5fc2',
    name: 'Fake Pet Name 2',
    birthDate: new Date('2018-11-11T01:00:00.000Z'),
    createdAt: new Date('2022-12-30T17:45:38.000Z'),
    breed: {
      name: 'Fake Breed 2'
    },
    count: null
  }
]

export const getAllPetsOrderFixture: Omit<PetType, 'tutors'>[] = [
  {
    id: '54737ecb-ed7e-4f5a-b645-25e7033f5fc2',
    name: 'Fake Pet Name 2',
    birthDate: new Date('2018-11-11T01:00:00.000Z'),
    createdAt: new Date('2022-12-30T17:45:38.000Z'),
    breed: {
      name: 'Fake Breed 2'
    },
    count: 2
  },
  {
    id: 'c504316d-5d49-4a8e-8d3f-0e47e94a8694',
    name: 'Fake Pet Name 1',
    birthDate: new Date('2018-11-11T01:00:00.000Z'),
    createdAt: new Date('2022-12-30T17:45:40.000Z'),
    breed: {
      name: 'Fake Breed 1'
    },
    count: null
  }
]

export const getAllPetsSearchResultFixture: Omit<PetType, 'tutors'>[] = [
  {
    id: 'c504316d-5d49-4a8e-8d3f-0e47e94a8694',
    name: 'search pet',
    birthDate: new Date('2018-11-11T01:00:00.000Z'),
    createdAt: new Date('2022-12-30T17:45:40.000Z'),
    breed: {
      name: 'Fake Breed Search'
    },
    count: 1
  }
]

export const getAllPetsPaginationFixture: Omit<PetType, 'tutors'>[] = [
  {
    id: 'c504316d-5d49-4a8e-8d3f-0e47e94a8694',
    name: 'Fake Pet Name 1',
    birthDate: new Date('2018-11-11T01:00:00.000Z'),
    createdAt: new Date('2022-12-30T17:45:40.000Z'),
    breed: {
      name: 'Fake Breed 1'
    },
    count: 3
  },
  {
    id: '54737ecb-ed7e-4f5a-b645-25e7033f5fc2',
    name: 'Fake Pet Name 2',
    birthDate: new Date('2018-11-11T01:00:00.000Z'),
    createdAt: new Date('2022-12-30T17:45:38.000Z'),
    breed: {
      name: 'Fake Breed 2'
    },
    count: null
  }
]

export const getAllPetsPaginationPageTwoFixture: Omit<PetType, 'tutors'>[] = [
  {
    id: 'a6a3300f-fcf9-40cc-89f2-1fa85d4c4ba2',
    name: 'Fake Pet Name 3',
    birthDate: new Date('2018-11-11T01:00:00.000Z'),
    createdAt: new Date('2022-12-30T17:45:40.000Z'),
    breed: {
      name: 'Fake Breed 3'
    },
    count: 3
  }
]
