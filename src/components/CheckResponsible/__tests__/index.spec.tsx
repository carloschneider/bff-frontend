import { render, screen } from '@testing-library/react'

import CheckResponsible from '../'
import { checkResponsibleLeave } from '../__fixtures__'

describe('<CheckResponsible />', () => {
  it('should render component', () => {
    const { container } = render(
      <CheckResponsible
        date={new Date('2020-01-01T20:00:00.573Z')}
        type="arrive"
        record={checkResponsibleLeave}
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render date and staff member name', () => {
    const date = new Date()

    render(
      <CheckResponsible
        date={date}
        type="leave"
        record={checkResponsibleLeave}
      />
    )

    const responsible = screen.getByText(
      `${date.toLocaleString('pt-BR', {
        hourCycle: 'h23'
      })} (Fausto Silva)`
    )

    expect(responsible).toBeInTheDocument()
  })

  it('should show hyphen when data is null', () => {
    render(
      <CheckResponsible
        date={null}
        type="leave"
        record={checkResponsibleLeave}
      />
    )

    const hyphen = screen.getByText('-')

    expect(hyphen).toBeInTheDocument()
  })
})
