import type { ConsentSliceState } from './slice-consent'
import type { NavigationSliceState } from './slice-navigation'

import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { ConsentSlice } from './slice-consent'
import { NavigationSlice } from './slice-navigation'

export type Mutators = [['zustand/devtools', never], ['zustand/subscribeWithSelector', never], ['zustand/immer', never]]

export type AppState = ConsentSliceState & NavigationSliceState

const localStore = create<AppState>()(
  devtools(
    subscribeWithSelector(
      immer((...props) => ({
        ...ConsentSlice(...props),
        ...NavigationSlice(...props)
      }))
    )
  )
)

export const localState = () => localStore.getState()

export default localStore
