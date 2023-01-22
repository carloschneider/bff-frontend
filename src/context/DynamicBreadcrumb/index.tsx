import { createContext, useContext, useState } from 'react'

export type DynamicBreadcrumbContextType = {
  title: string | null
  setTitle: (value: string | null) => void
}

const initialValue: Pick<DynamicBreadcrumbContextType, 'title'> = {
  title: null
}

export const DynamicBreadcrumbContext = createContext<
  DynamicBreadcrumbContextType | undefined
>(undefined)

type DynamicBreadcrumbProviderType = {
  children: React.ReactElement | React.ReactElement[]
}

const DynamicBreadcrumbProvider = ({
  children
}: DynamicBreadcrumbProviderType) => {
  const [title, setTitle] = useState<DynamicBreadcrumbContextType['title']>(
    initialValue.title
  )

  return (
    <DynamicBreadcrumbContext.Provider value={{ title, setTitle }}>
      {children}
    </DynamicBreadcrumbContext.Provider>
  )
}

DynamicBreadcrumbProvider.displayName = 'DynamicBreadcrumbProvider'

export const useDynamicBreadcrumbContext = () => {
  const breadcrumb = useContext(DynamicBreadcrumbContext)

  if (typeof breadcrumb === 'undefined') {
    throw new Error(
      'useDynamicBreadcrumbContext must be inside of <DynamicBreadcrumbProvider>'
    )
  }

  return breadcrumb
}

export default DynamicBreadcrumbProvider
