import { gsap } from 'gsap'
import { md } from './stores'

const mm = gsap.matchMedia()

mm.add('(min: 769px)', () => {
  console.log('large')
  md.update(() => true)
})
mm.add('(max: 768px)', () => {
  console.log('small')
  md.update(() => false)
})
