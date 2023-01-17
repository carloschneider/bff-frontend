import { MockedProvider, MockedResponse } from '@apollo/react-testing'
import { render } from '@testing-library/react'
import { ReactNode } from 'react'

export const renderWithApollo = (
  children: ReactNode | undefined,
  mocks: ReadonlyArray<MockedResponse> = []
) => {
  return render(
    <MockedProvider
      mocks={mocks}
      addTypename={false}
      defaultOptions={{ mutate: { errorPolicy: 'all' } }}
    >
      {children}
    </MockedProvider>
  )
}
