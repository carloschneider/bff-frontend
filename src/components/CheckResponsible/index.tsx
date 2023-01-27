import { CheckType } from 'components/PetChecksTable/graphql'

type CheckRenderProps = {
  date: Date | null
  record: CheckType
  type: 'arrive' | 'leave'
}

const dateOptions: Intl.DateTimeFormatOptions = {
  hourCycle: 'h23'
}

const CheckResponsible = ({ date, record, type }: CheckRenderProps) => {
  const getResponsibleName = (): string => {
    return record.responsibles
      .filter((responsible) => responsible.type === type)
      .reduce((acc, responsible) => {
        if (responsible.user === null) {
          acc = `${responsible.staff?.firstName} ${responsible.staff?.lastName}`

          return acc
        }

        acc = responsible.user.companyName

        return acc
      }, '')
  }

  return (
    <>
      {date ? new Date(date).toLocaleString('pt-BR', dateOptions) : '-'}{' '}
      {date && `(${getResponsibleName()})`}
    </>
  )
}

export default CheckResponsible
