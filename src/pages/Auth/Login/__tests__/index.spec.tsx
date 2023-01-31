import PageLogin from 'pages/Auth/Admin'
import { renderWithApollo } from 'test-utils/render/renderWithApollo'

describe('<PageLogin />', () => {
  it('should render component', () => {
    const { container } = renderWithApollo(<PageLogin />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
