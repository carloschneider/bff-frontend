export enum OrderEnum {
  DESC = 'DESC',
  ASC = 'ASC'
}

export const convertOrder = (order: string): OrderEnum => {
  const desc = OrderEnum.DESC
  const asc = OrderEnum.ASC

  if (order.includes(desc.toLowerCase())) {
    return desc
  }

  return asc
}
