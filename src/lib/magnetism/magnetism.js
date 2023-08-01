// Magnetic Cursor - Streamlined Cassie Style

// Summary:
// When the mouse enters the trigger-zone, the text element
// is to be pulled from it's center of gravity, as if attracted
// by the mouse. It will move to half the distance, between
// the mouse and the center of the trigger zone.

//-----------------------------------------------------------------

import { gsap } from 'gsap'

let mouseInTarget = false
let left, top

export function pull(e, target, portfolioOf, bool) {
  left = e.clientX
  top = e.clientY

  mouseInTarget = bool
  console.log(mouseInTarget)

  const targetElements = [target]

  targetElements.forEach((targetEle) => {
    const rect = targetEle.getBoundingClientRect()

    const triggerDistance = rect.width

    // Get position of target instance from its center point
    const targetPosition = {
      left: rect.left + rect.width / 2,
      top: rect.top + rect.width / 2
    }

    // Get distance between target instance and mouse (adj & opp)
    const distance = {
      adj: targetPosition.left - left,
      opp: targetPosition.top - top
    }

    const hypotenuse = Math.sqrt(
      distance.adj * distance.adj + distance.opp * distance.opp
    )

    // get angle from coordinate adj and opp
    const angle = Math.atan2(distance.adj, distance.opp)

    // Define the trigger area - inside
    if (hypotenuse * 0.5 < triggerDistance && mouseInTarget) {
      // tween custom cursor position

      // Pulls on text
      gsap.to(portfolioOf, {
        x: -((Math.sin(angle) * hypotenuse) / 3),
        y: -((Math.cos(angle) * hypotenuse) / 3),
        duration: 0.6
      })
    }
  })
}

export function release(portfolioOf, bool) {
  mouseInTarget = bool
  // Releases text
  gsap.to(portfolioOf, {
    x: 0,
    y: 0,
    duration: 2.5,
    ease: 'elastic'
  })
}

// Pseudo code

// SCENARIO - MOUSE MOVE 1:
//  LET inside target = false
//  EACH target 1: Not inside
//  EACH target 2: Inside
//    make cursor big
//    SET inside target = true
//  EACH target 3: Not inside
//  ENDFOR (!!)
//  IS inside target : don't shrink

// SCENARIO - MOUSE MOVE 2:
//  LET inside target = false
//  EACH target 1: Not inside
//  EACH target 2: Not inside
//  EACH target 3: Not inside
//  ENDFOR
//  IS NOT inside (any) target : shrink cursor
