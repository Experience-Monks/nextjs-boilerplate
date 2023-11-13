import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { AppSlice, AppSliceState } from './slice-app'
import { ConsentSlice, ConsentSliceState } from './slice-consent'

export type Mutators = [['zustand/devtools', never], ['zustand/subscribeWithSelector', never], ['zustand/immer', never]]

export type AppState = AppSliceState & ConsentSliceState

const localStore = create<AppState>()(
  devtools(
    subscribeWithSelector(
      immer((...props) => ({
        ...AppSlice(...props),
        ...ConsentSlice(...props)
      }))
    )
  )
)

export const localState = () => localStore.getState()

export default localStore
