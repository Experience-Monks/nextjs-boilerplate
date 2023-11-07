import { RuntimeLoader } from '@rive-app/react-canvas'

export const riveWASMResource = require('@rive-app/canvas/rive.wasm')

function initRive() {
  if (typeof window === 'undefined') return
  RuntimeLoader.setWasmUrl(riveWASMResource)
}

export default initRive
