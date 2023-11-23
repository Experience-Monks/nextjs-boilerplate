import type { FC } from 'react'

import { memo, useMemo } from 'react'

import { getRuntimeEnv } from '@/utils/runtime-env'

import { View } from './AppAdmin.view'

export interface ControllerProps {
  className?: string
}

// Controller (handles global state, router, data fetching, etc. Feeds props to the view component)
export const Controller: FC<ControllerProps> = memo((props) => {
  const env = useMemo(() => getRuntimeEnv(), [])

  return (
    <View
      {...props}
      env={env}
      date={process.env.NEXT_PUBLIC_COMMIT_DATE || ''}
      commit={process.env.NEXT_PUBLIC_COMMIT_ID || ''}
      version={process.env.NEXT_PUBLIC_VERSION_NUMBER || ''}
    />
  )
})

Controller.displayName = 'AppAdmin_Controller'
