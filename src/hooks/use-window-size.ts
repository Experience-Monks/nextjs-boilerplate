import { useEffect, useReducer } from 'react'

import { ResizeService } from '@/services/resize.service'

import { detector } from '@/utils/detect'

interface State {
  width: number
  height: number
}

export function useWindowSize() {
  const [state, setState] = useReducer((curState: State, newState: State) => ({ ...curState, ...newState }), {
    width: detector.window.innerWidth,
    height: detector.window.innerHeight
  })

  useEffect(() => {
    function update() {
      setState({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    update()
    ResizeService.listen(update)
    return () => {
      ResizeService.dismiss(update)
    }
  }, [])

  return state
}
