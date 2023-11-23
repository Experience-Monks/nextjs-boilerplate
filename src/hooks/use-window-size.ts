import { useEffect, useReducer } from 'react'

import resize from '@/services/resize'

import { detector } from '@/utils/detect'

interface State {
  width: number
  height: number
}

function useWindowSize() {
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
    resize.listen(update)
    return () => {
      resize.dismiss(update)
    }
  }, [])

  return state
}

export default useWindowSize
