# 9103_final_individual
# Dove in the Dream – Meditation  
### Time-Based  
### Group D  

| Name              | Unikey     |  
|-------------------|------------|  
| Chloe KU          | chku0036   |

## Overview

My individual work is based on our group’s peaceful theme and uses looping, time-based animation to simulate breathing. In the default state, the dove slowly expands and contracts, creating a calm, meditative rhythm. When users click on the particles, they briefly change color, adding a sense of playful interaction. Double-clicking a particle causes it to burst into larger, colorful particles, like a quiet release of energy. The entire work aims to feel dreamy, and the dove is gently floating in the soft world.


## How to Interact

1. **The entire image slowly expands and contracts over time**, creating a soft, slow rhythm.
2. **Click** on any dot to colorize it temporarily.
3. **Double-click** on a dot to make it burst into bigger colorful particles.
4. **Watch how the particles move in and out in a smooth loop**, changing their speed and distance over time.


## My Individual Animation Approach

I chose Time-Based Animation as my method to animate the group artwork. My goal was to keep the peaceful, dreamlike feeling of our dove theme by making the whole image expand and shrink in a loop.

- A **state-based loop** (`expanding → contracting → waiting`) controlled by time and a simple frame counter (`stateTimer`).
- A **gentle wave motion** that affects all dots’ movement intensity (`explosionStrength`), creating a same wave of expansion and return.
- **Interactive features** like clicking to color the dots or double-clicking to make them burst into colorful particles.


## Animation Driver

- **Main Driver:** Time (using a repeating timer to control `explosionStrength`)
- **Secondary Driver:** User interaction (clicks and double-clicks)


## Animated Properties


| Property           | What It Does                                                       | How Mine Is Different                  |
|--------------------|---------------------------------------------------------------------|----------------------------------------|
| **Breathing Motion** | Dots expand and contract over time in a slow, looped rhythm         | Only mine uses a timer (`stateTimer`)  |
| **Color Click**     | Click to color a dot temporarily; it fades back smoothly            | Others use random or fixed colors      |
| **Dot Movement**    | Dots move based on `explosionStrength`                              | Mine is smooth and synced              |
| **Timing System**   | Uses `updateState()` to handle motion stages                        | Others rely on Perlin noise or input   |


## Inspiration

![picture1](https://i.pinimg.com/736x/93/94/40/939440160737155a2a3d47d190293e71.jpg)

I was inspired by the black-and-white artwork in the picture above. The floating figure and soft wave in the picture made me think of breathing, energy release, and meditation.These concepts have also become the main feature of my work. I use time-controlled particle movement, gradient color and slow expanding effects to express this feeling.


## Technical Explanation

- **Dots (dove shape):** Dots are sampled from dark areas in the dove image. Each dot stores its own position using `p5.Vector`, so we can move them smoothly.
- **`explosionStrength`:** A time-based value that controls how much each dot is pushed and pulled.
- **`updateState()`:** A simple timer-based loop (`expanding → contracting → waiting`) that controls how strong the movement is at any moment.
- **Interactive coloring:** When a dot is clicked, it turns colorful for a few seconds and slowly fades back to gray using `lerpColor()`.
- **Firework particles:** When a dot is double-clicked, it bursts into new `FireworkDot` instances with random speed and color that fade away.
- **Vectors (`p5.Vector`):** Used to store and update each dot’s position, speed, and movement direction. This makes the motion smoother and easier to manage.


## Tools & External Techniques

- **ChatGPT:** After building the basic structure, I designed different visual effects and asked ChatGPT to help optimize the code, including features like gathering, explosion, and drag interactions. I also referred to p5.js examples, and when I didn’t fully understand certain parts, I asked ChatGPT to explain them to ensure the logic was clear and everything worked smoothly.
- **[p5.js](https://p5js.org/):**  I used p5.js as the main tool for drawing, animation, and interaction on the canvas. The official documentation was especially helpful when I needed to understand how certain functions or vector behaviors worked.helped with specific functions and vector behaviors.


## Reference

- **[Source of inspiration](https://pin.it/KdKsSQMwF)** 
- **[p5.js](https://p5js.org/reference/p5/p5.Vector/)** 
- **[p5.js](https://p5js.org/reference/p5.Vector/dot/)** 

