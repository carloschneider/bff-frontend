import { createContext, useState } from 'react'

export type DynamicBreadcrumbContextType = {
  title: string | null
  setTitle: (value: string | null) => void
}

const initialValue: DynamicBreadcrumbContextType = {
  title: null,
  setTitle: (_) => _
}

export const DynamicBreadcrumbContext =
  createContext<DynamicBreadcrumbContextType>(initialValue)

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

export default DynamicBreadcrumbProvider
