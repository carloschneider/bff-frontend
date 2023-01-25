import { CheckType } from 'components/PetChecksTable/graphql'

export const checkResponsibleArrive: CheckType = {
  id: 'a6a3300f-fcf8-40cc-89f2-1fa85d4c4ba2',
  arrive: '2023-01-25T18:26:43.000Z',
  leave: null,
  count: 6,
  responsibles: [
    {
      id: '9a6f4710-fd3e-49ac-a0f8-d38498e7b45b',
      type: 'arrive',
      staff: {
        id: 'db8653e6-7ffe-4edf-aa36-8f26c11e8576',
        firstName: 'Silvio',
        lastName: 'Santos'
      },
      user: null
    }
  ]
}

export const checkResponsibleLeave: CheckType = {
  id: '4b63fd9c-d49b-4c5d-8c38-1fe72a6e2f88',
  arrive: '2023-01-07T17:31:36.000Z',
  leave: '2023-01-07T17:31:38.000Z',
  count: 5,
  responsibles: [
    {
      id: 'b9d79e38-bc04-4674-b098-ee00f858e57d',
      type: 'arrive',
      staff: null,
      user: {
        id: 'db8653e6-7ffe-4edf-aa36-8f26c11e8576',
        companyName: 'Walky Reabilitação'
      }
    },
    {
      id: 'cdee01c6-044a-47a3-a0f5-8b94fa59ee3d',
      type: 'leave',
      staff: {
        id: 'db8653e6-7ffe-4edf-aa36-8f26c11e8576',
        firstName: 'Fausto',
        lastName: 'Silva'
      },
      user: null
    }
  ]
}
