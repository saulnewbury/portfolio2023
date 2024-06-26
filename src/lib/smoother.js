import { ScrollSmoother } from 'gsap/dist/ScrollSmoother'

export default function scrollSmoother() {
  let smoother = ScrollSmoother.create({
    smooth: 2,
    speed: 1,
    effects: true,
    normalizeScroll: true
  })
  return smoother
}
