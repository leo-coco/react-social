import type React from "react"

interface WithLoadingAndErrorProps {
  isPending: boolean
  error: any
}

const withLoadingAndError = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  return ({ isPending, error, ...props }: WithLoadingAndErrorProps & P) => {
    if (isPending) return <div>Loading...</div>

    if (error) return <div>An error has occurred: {error.message}</div>

    return <WrappedComponent {...(props as P)} />
  }
}

export default withLoadingAndError
