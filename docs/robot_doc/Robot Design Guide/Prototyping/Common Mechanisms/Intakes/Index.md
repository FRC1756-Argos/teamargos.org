---
sidebar_position: 4
---

# Intakes

import HorizontalRollerIntakes from './Horizontal Roller Intakes.png'
import VerticalWheelIntakes from './Vertical Wheel Intakes.png'
import GripperClay from './Gripper_Clay.png'
import ActivePinchingIntakes from './Active Pinching Intakes.png'
import FunnelIntakes from './Funnel Intakes.png'

## What is an Intake?
An intake is a mechanism on your FRC robot designed to collect and control game pieces from the field, either from the floor or a human player station. It's typically the first point of contact between your robot and the game objects you need to manipulate. A well-designed intake is crucial for competitive success because it directly affects how quickly and reliably your robot can acquire game pieces.

**Key Functions of an Intake:**
- **Acquisition** - Grabbing or collecting game pieces from the field
- **Control** - Maintaining possession of game pieces while moving
- **Feeding** - Transferring game pieces to other mechanisms (shooters, arms, etc.)
- **Ejection** - Releasing game pieces when needed

**Important Considerations:**
- **Intakes must not jam** - If jams occur, there must be a quick and easy way to clear them
- **Wider is usually better** - Wider intakes provide a larger target area and are more forgiving
- **"Touch it, own it"** - The intake should acquire the game piece the instant it makes contact
- **No special operator actions required** - Intakes should work automatically without complex button sequences or precise driver control
- **Reliability is critical** - Intakes must be robust and not break under normal use or defensive contact

---

## Common FRC Intake Types

### Horizontal Roller Intakes

**Description:** Horizontal rollers or wheels that spin to pull the game piece into the robot.

**Best for:** Balls, cylinders, and round game pieces

<img src={HorizontalRollerIntakes} width="400"/>

<iframe width="560" height="315" src="https://www.youtube.com/embed/ISnO6BCw4w4?start=8&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

**Pros:**
- Excellent grip
- Can be large 
- Simple to build and maintain
- Can intake at various angles
- Works well with compression

**Cons:**
- May struggle with irregular shapes
- Rollers can wear out over time
- Requires proper compression tuning

**Note:** When compression is applied to the game piece, roller intakes can struggle to effectively funnel or guide the piece into the desired position

---

### Vertical Wheel Intakes

**Description:** Vertical wheels that spin on each side of the intake, used to pull the game element into the robot. Similar to a claw mechanism but with spinning wheels that actively grip and draw in game pieces.

**Best for:** Large Balls, cubes, weird shaped objects

<img src={VerticalWheelIntakes} width="400"/>

<iframe width="560" height="315" src="https://www.youtube.com/embed/YMa69eiFIXc?mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/oRwvQ2D_B-c?start=53" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

**Pros:**
- Grabs vertical walls well
- Easy to prototype and adjust
- Funnels game element horizontally well

**Cons:**
- Can kick the game element away if not properly aligned
- Needs precise alignment to effectively capture game pieces
- Does not contain the game element in the vertical direction

---

### Claw/Gripper Intakes

**Description:** Mechanical grippers that close around game pieces using motors or pneumatics to create a secure hold.

**Best for:** Cubes, cones, irregular shapes

<img src={GripperClay} width="400"/>

<iframe width="560" height="315" src="https://www.youtube.com/embed/zxrDBtS2Tnk?mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

**Pros:**
- Secure hold on game pieces
- Works with irregular shapes

**Cons:**
- Slower cycle time (open/close)
- Requires precise alignment
- Does not actively pull the game element in
 

---

### Suction Intakes

**Description:** Uses vacuum or suction cups to pick up game pieces by creating negative pressure that holds them against the intake surface.

<iframe width="560" height="315" src="https://www.youtube.com/embed/c7kj6AcPOKI?mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

**Pros:**
- Can pick up from various angles
- Secure hold once suction is established
- Can hold irregular objects
- Can handle multiple different objects
- 

**Cons:**
- Limited to specific game piece types and surfaces
- Requires consistent vacuum
- Can lose suction if surface is dirty or irregular
- May struggle with heavy or textured game pieces

---

### Active Pinching Intakes

**Description:** Uses one or two horizontal rollers that actively pull game pieces in by creating pinching action, either between two counter-rotating wheels or between a wheel and a surface.

**Best for:** Compressible game elements, balls, cylinders, or edges on objects

<img src={ActivePinchingIntakes} width="400"/>

<iframe width="560" height="315" src="https://www.youtube.com/embed/EVxz7j82Cp4?start=278&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

**Pros:**
- Actively pulls game pieces into the robot
- Simple and reliable mechanism

**Cons:**
- May require precise wheel spacing
- Can be affected by floor conditions
- Usually only handles 1 game element at a time
- Does not center object horizontally well

---

### Funnel Intakes

**Description:** Wide-mouthed funnel-shaped mechanisms that guide game pieces from the human player station into the robot, often combined with other intake types for smooth transfer.

<img src={FunnelIntakes} width="400"/>

<iframe width="560" height="315" src="https://www.youtube.com/embed/EXoaH1PdRsM?mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

**Pros:**
- Wide target area for human players
- Guides game pieces reliably into position
- Simple and effective for station pickup

**Cons:**
- Limited to human player station use
- Requires precise positioning relative to station
- Dependent on human player accuracy
- Usually slow due to relying on gravity
- Game pieces may bounce or move unpredictably since there's no active pulling mechanism

---

## Additional Resources

- **[Intake by Game Piece](https://www.projectb.net.au/resources/robot-mechanisms/#IT)** - This resource goes over different game pieces and how they have been picked up, including videos of them in action. It's a great reference for seeing real-world examples of intake concepts.