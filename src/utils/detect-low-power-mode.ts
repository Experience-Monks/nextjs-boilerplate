import { os } from '@/utils/detect'

// battery API is not supported for iOS Safari - here is the hack
export const getLowPowerMode = async () => {
  if (window.location.host.includes('localhost')) return false
  if (!os.ios) return false

  let video: HTMLVideoElement | null = document.createElement('video')
  video.setAttribute('playsinline', 'playsinline')
  video.setAttribute('src', '')

  try {
    await video.play()
  } catch (error) {
    if ((error as Error).name === 'NotAllowedError') {
      return true
    }
  } finally {
    video = null
  }

  return false
}
