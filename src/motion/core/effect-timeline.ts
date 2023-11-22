import { gsap } from 'gsap'

export const effectTimeline = (
  duration: gsap.TweenValue,
  reversed: boolean,
  timelineFactory: () => gsap.core.Timeline
) => {
  let timeline: gsap.core.Timeline

  const helper = { progress: reversed ? 1 : 0, completed: false }

  return gsap
    .timeline({
      onStart: () => {
        timeline = timelineFactory()
      },
      onUpdate: () => {
        if (helper.completed) {
          // if onUpdate is called after the timeline is finished
          // it means the timeline is playing backwards for some reason.
          // This is often due scrolltrigger scrubbing.
          helper.completed = false
          timeline = timelineFactory()
        }
        timeline?.progress(helper.progress)
      },
      onComplete: () => {
        helper.completed = true
      }
    })
    .to(helper, { progress: reversed ? 0 : 1, duration, ease: 'none' })
}
