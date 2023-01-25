import { render, screen } from '@testing-library/react'

import { checkResponsibleLeave } from './__fixtures__'

import CheckResponsible from '.'

describe('<CheckResponsible />', () => {
  it('should render component', () => {
    const { container } = render(
      <CheckResponsible
        date={new Date()}
        type="arrive"
        record={checkResponsibleLeave}
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should ', () => {
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
})
