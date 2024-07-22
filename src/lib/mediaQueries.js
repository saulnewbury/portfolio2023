import { gsap } from 'gsap'
import { md } from './stores'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

let mm

export function addQueries() {
  if (!mm) {
    mm = gsap.matchMedia()

    mm.add('(min-width: 769px)', () => {
      console.log('large')
      md.update(() => true)
      ScrollTrigger.refresh()
    })
    mm.add('(max-width: 768px)', () => {
      console.log('small')
      md.update(() => false)
    })
  }
}
