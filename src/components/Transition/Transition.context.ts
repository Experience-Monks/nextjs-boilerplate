import type { RefObject } from 'react'
import type { BeforeUnmountCallback } from '@/hooks/use-before-unmount'

import { createContext } from 'react'

export type TransitionContextType = Set<RefObject<BeforeUnmountCallback>> | undefined

export const TransitionContext = createContext<TransitionContextType>(undefined)
