import { CheckType } from '../graphql'

export const getAllChecksByPetId: CheckType[] = [
  {
    id: 'a6a3300f-fcf8-40cc-89f2-1fa85d4c4ba2',
    arrive: '2023-01-25T18:26:43.000Z',
    leave: '2023-01-25T18:27:36.000Z',
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
      },
      {
        id: '62ad42eb-699c-4b8a-a0a3-c0f25189acaa',
        type: 'leave',
        staff: {
          id: 'db8653e6-7ffe-4edf-aa36-8f26c11e8576',
          firstName: 'Silvio',
          lastName: 'Santos'
        },
        user: null
      }
    ]
  },
  {
    id: '4b63fd9c-d49b-4c5d-8c38-1fe72a6e2f88',
    arrive: '2023-01-07T17:31:36.000Z',
    leave: '2023-01-07T17:31:38.000Z',
    count: null,
    responsibles: [
      {
        id: 'cdee01c6-044a-47a3-a0f5-8b94fa59ee3d',
        type: 'leave',
        staff: {
          id: 'db8653e6-7ffe-4edf-aa36-8f26c11e8576',
          firstName: 'Silvio',
          lastName: 'Santos'
        },
        user: null
      },
      {
        id: 'b9d79e38-bc04-4674-b098-ee00f858e57d',
        type: 'arrive',
        staff: {
          id: 'db8653e6-7ffe-4edf-aa36-8f26c11e8576',
          firstName: 'Silvio',
          lastName: 'Santos'
        },
        user: null
      }
    ]
  },
  {
    id: 'ade1d25c-0802-4aca-8524-0f493a609dc2',
    arrive: '2023-01-07T17:29:39.000Z',
    leave: '2023-01-07T17:29:41.000Z',
    count: null,
    responsibles: [
      {
        id: 'b82f9601-1660-4f0a-a19c-f10237868916',
        type: 'leave',
        staff: {
          id: 'db8653e6-7ffe-4edf-aa36-8f26c11e8576',
          firstName: 'Silvio',
          lastName: 'Santos'
        },
        user: null
      },
      {
        id: '6eea4caa-445d-42b8-b196-dc9fdf25f1f8',
        type: 'arrive',
        staff: {
          id: 'db8653e6-7ffe-4edf-aa36-8f26c11e8576',
          firstName: 'Silvio',
          lastName: 'Santos'
        },
        user: null
      }
    ]
  },
  {
    id: '8846501b-c64d-4708-85e1-ba028e02430c',
    arrive: '2023-01-07T03:35:02.000Z',
    leave: '2023-01-07T03:35:04.000Z',
    count: null,
    responsibles: [
      {
        id: 'be15638d-f468-4f25-837d-a384c37c2464',
        type: 'arrive',
        staff: {
          id: 'db8653e6-7ffe-4edf-aa36-8f26c11e8576',
          firstName: 'Silvio',
          lastName: 'Santos'
        },
        user: null
      },
      {
        id: '18be9589-8c4e-4dd6-9fa2-ef5a0a4f2876',
        type: 'leave',
        staff: {
          id: 'db8653e6-7ffe-4edf-aa36-8f26c11e8576',
          firstName: 'Silvio',
          lastName: 'Santos'
        },
        user: null
      }
    ]
  }
]

export const getAllChecksByPetIdPageTwo: CheckType[] = [
  {
    id: 'ade1d25c-0802-4aca-8524-0f493a609dc2',
    arrive: '2023-01-07T17:29:39.000Z',
    leave: '2023-01-07T17:29:41.000Z',
    count: 8,
    responsibles: [
      {
        id: 'b82f9601-1660-4f0a-a19c-f10237868916',
        type: 'leave',
        staff: {
          id: 'db8653e6-7ffe-4edf-aa36-8f26c11e8576',
          firstName: 'Silvio',
          lastName: 'Santos'
        },
        user: null
      },
      {
        id: '6eea4caa-445d-42b8-b196-dc9fdf25f1f8',
        type: 'arrive',
        staff: {
          id: 'db8653e6-7ffe-4edf-aa36-8f26c11e8576',
          firstName: 'Silvio',
          lastName: 'Santos'
        },
        user: null
      }
    ]
  },
  {
    id: '8846501b-c64d-4708-85e1-ba028e02430c',
    arrive: '2023-01-07T03:35:02.000Z',
    leave: '2023-01-07T03:35:04.000Z',
    count: 7,
    responsibles: [
      {
        id: 'be15638d-f468-4f25-837d-a384c37c2464',
        type: 'arrive',
        staff: {
          id: 'db8653e6-7ffe-4edf-aa36-8f26c11e8576',
          firstName: 'Silvio',
          lastName: 'Santos'
        },
        user: null
      },
      {
        id: '18be9589-8c4e-4dd6-9fa2-ef5a0a4f2876',
        type: 'leave',
        staff: {
          id: 'db8653e6-7ffe-4edf-aa36-8f26c11e8576',
          firstName: 'Silvio',
          lastName: 'Santos'
        },
        user: null
      }
    ]
  },
  {
    id: 'e0d3a00b-56d9-4667-abd6-edb62ed1a746',
    arrive: '2023-01-03T21:47:23.000Z',
    leave: '2023-01-03T21:47:32.000Z',
    count: null,
    responsibles: [
      {
        id: '0eaaf655-86c5-4ff6-946b-5fa94f1747ae',
        type: 'arrive',
        staff: {
          id: 'db8653e6-7ffe-4edf-aa36-8f26c11e8576',
          firstName: 'Silvio',
          lastName: 'Santos'
        },
        user: null
      },
      {
        id: 'be9d898c-e7d9-45ca-ac19-b2824248cb98',
        type: 'leave',
        staff: {
          id: 'db8653e6-7ffe-4edf-aa36-8f26c11e8576',
          firstName: 'Silvio',
          lastName: 'Santos'
        },
        user: null
      }
    ]
  },
  {
    id: 'd34065a1-53b7-40b4-a949-8c21268461bb',
    arrive: '2023-01-03T20:32:56.000Z',
    leave: '2023-01-03T20:32:58.000Z',
    count: null,
    responsibles: [
      {
        id: 'bfae6391-9bcd-403a-a54f-ea22066b8dfe',
        type: 'arrive',
        staff: {
          id: 'db8653e6-7ffe-4edf-aa36-8f26c11e8576',
          firstName: 'Silvio',
          lastName: 'Santos'
        },
        user: null
      },
      {
        id: 'c2ad7b13-a5a0-4df6-9813-14300f83a880',
        type: 'leave',
        staff: {
          id: 'db8653e6-7ffe-4edf-aa36-8f26c11e8576',
          firstName: 'Silvio',
          lastName: 'Santos'
        },
        user: null
      }
    ]
  }
]
