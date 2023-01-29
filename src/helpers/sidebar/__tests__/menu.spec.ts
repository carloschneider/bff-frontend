import { selectedKey, MatchesType, LocationType } from '../menu'

describe('selectedKey', () => {
  const mockedLocation: LocationType = {
    hash: '',
    key: 'fake-key',
    pathname: '/',
    search: '',
    state: null
  }

  it('should return current location pathname when matches is empty array', () => {
    const mockedMatches: MatchesType[] = []

    expect(selectedKey(mockedMatches, mockedLocation)).toEqual(
      mockedLocation.pathname
    )
  })

  it('should return current location pathname when matches params are empty', () => {
    const mockedMatches: MatchesType[] = [
      {
        id: 'fake-id',
        pathname: 'fake-pathname',
        params: {},
        data: undefined,
        handle: undefined
      }
    ]

    expect(selectedKey(mockedMatches, mockedLocation)).toEqual(
      mockedLocation.pathname
    )
  })

  it('should return path without dynamic params', () => {
    const mockedMatches: MatchesType[] = [
      {
        id: 'fake-id',
        pathname: '/admin/pets/123',
        params: {
          petId: '123'
        },
        data: undefined,
        handle: undefined
      }
    ]

    expect(selectedKey(mockedMatches, mockedLocation)).toEqual('/admin/pets')
  })
})
