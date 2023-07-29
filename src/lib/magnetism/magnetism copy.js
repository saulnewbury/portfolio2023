// Magnetic Cursor - Streamlined Cassie Style

// Summary:
// When the mouse enters the trigger-zone, the text element
// is to be pulled from it's center of gravity, as if attracted
// by the mouse. It will move to half the distance, between
// the mouse and the center of the trigger zone.

//-----------------------------------------------------------------

import { gsap } from 'gsap'

document.addEventListener('mousemove', mouseMove)

gsap.set('.cursor-dot', { scale: 0.04 })
gsap.set('.cursor-outline', { scale: 0.5 })

let xCTo = gsap.quickTo('.cursor-outline', 'left', {
  duration: 0.3
  // ease: "power3",
})
let yCTo = gsap.quickTo('.cursor-outline', 'top', {
  duration: 0.3
  // ease: "power3",
})
let xDTo = gsap.quickTo('.cursor-dot', 'left', {
  duration: 0.6
  // ease: "power3",
})
let yDTo = gsap.quickTo('.cursor-dot', 'top', {
  duration: 0.6
  // ease: "power3",
})

let isVisible = false
let mouseInTarget = false

function mouseMove(e) {
  if (!isVisible) {
    gsap.set('.cursor-outline, .cursor-dot', { opacity: 1 })
    isVisible = true
  }

  const cursorPosition = {
    left: e.clientX,
    top: e.clientY
  }

  const targetElements = document.querySelectorAll('.target')

  targetElements.forEach((targetEle) => {
    if (mouseInTarget) {
    }

    const rect = targetEle.getBoundingClientRect()

    const triggerDistance = rect.width

    // Get position of target instance from its center point
    const targetPosition = {
      left: rect.left + rect.width / 2,
      top: rect.top + rect.width / 2
    }

    // Get distance between target instance and mouse (adj & opp)
    const distance = {
      adj: targetPosition.left - cursorPosition.left,
      opp: targetPosition.top - cursorPosition.top
    }

    const hypotenuse = Math.sqrt(
      distance.adj * distance.adj + distance.opp * distance.opp
    )

    // get angle from coordinate adj and opp
    const angle = Math.atan2(distance.adj, distance.opp)

    // Define the trigger area - inside
    if (hypotenuse * 2 < triggerDistance && mouseInTarget) {
      // tween custom cursor position
      xCTo(targetPosition.left - (Math.sin(angle) * hypotenuse) / 4)
      yCTo(targetPosition.top - (Math.cos(angle) * hypotenuse) / 4)
      xDTo(targetPosition.left - (Math.sin(angle) * hypotenuse) / 4)
      yDTo(targetPosition.top - (Math.cos(angle) * hypotenuse) / 4)

      mouseInTarget = true

      // Pulls on text
      gsap.to(targetEle.querySelector('.text'), {
        x: -((Math.sin(angle) * hypotenuse) / 3),
        y: -((Math.cos(angle) * hypotenuse) / 3),
        duration: 0.6
      })
    } else {
      // Releases text
      gsap.to(targetEle.querySelector('.text'), {
        x: 0,
        y: 0,
        duration: 0.6
      })
    }
  })

  if (!mouseInTarget) {
    // tween custom cursor position
    xCTo(cursorPosition.left)
    yCTo(cursorPosition.top)
    xDTo(cursorPosition.left)
    yDTo(cursorPosition.top)
  }
}

let targets = gsap.utils.toArray('.target')

let scaleAnim = gsap.timeline({
  paused: true
  // ease: Linear.easNone
})

scaleAnim
  .to('.cursor-outline', {
    scale: 1
  })
  .to(
    '.cursor-dot',
    {
      scale: 1,
      duration: 0.35
    },
    0
  )

targets.forEach((target) => {
  target.addEventListener('mouseenter', (e) => {
    mouseInTarget = true
    console.log('play')
    scaleAnim.play()
    // scaleAnim.tweenFromTo(scaleAnim.time(), scaleAnim.duration(), {
    //   ease: "power1.in",
    // });
  })
  target.addEventListener('mouseleave', (e) => {
    mouseInTarget = false
    console.log('reverse')
    scaleAnim.reverse()
    // scaleAnim.tweenFromTo(scaleAnim.time(), 0, scaleAnim.duration(), {
    //   ease: "power1.out",
    // });
  })
})

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
