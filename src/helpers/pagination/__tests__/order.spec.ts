import { convertOrder } from '../order'

describe('convertOrder', () => {
  it('should return ASC', () => {
    expect(convertOrder('ascend')).toBe('ASC')
  })

  it('should return DESC', () => {
    expect(convertOrder('descent')).toBe('DESC')
  })
})
