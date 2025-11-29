---
sidebar_position: 5
---

# Indexers

import MecanumWheels from './mecanum_wheels.webp'
import VerticalWheel from './Vertical_Wheel.png'

## What is an Indexer?

An indexer (also called an indexing mechanism, sorter, or transfer system) is a mechanism designed to control, position, and manage game pieces inside your robot after they've been collected by the intake. The indexer's job is to move game pieces from the intake to the scoring mechanism while ensuring they are correctly oriented, positioned, and ready for deployment. Think of it as the "logistics system" of your robot.

**Key Functions of an Indexer:**
- **Transport** - Moving game pieces from intake to scoring mechanism
- **Positioning** - Placing game pieces in the correct location for scoring
- **Orientation** - Rotating or aligning game pieces to the proper angle
- **Storage** - Holding multiple game pieces when needed
- **Staging** - Preparing game pieces for rapid scoring sequences

**Important Considerations:**
- **Minimize handoffs** - Each handoff between mechanisms is a potential failure point. Try to eliminate handoffs whenever possible by designing continuous systems that carry game pieces directly from intake to scoring
- **Reliability is paramount** - Indexers must work consistently without jamming
- **Speed matters** - Fast indexing reduces cycle time and increases scoring potential
- **Sensor integration** - Know where your game pieces are at all times
- **Clearance and jam prevention** - Design with enough space to prevent sticking or wedging


---

## Centering  

Centering is the process of moving a game element into the correct orientation within your robot. This ensures the game piece is positioned and aligned properly for consistent scoring. Centering mechanisms use physical guides, funnels, or active positioning to guide game pieces into the desired orientation before they reach the scoring mechanism.

### Omni / Mecanum wheels

<img src={MecanumWheels} width="400"/>

**Mecanum Wheels** are special wheels with rollers attached around the circumference at a 45-degree angle. Unlike standard wheels that only push forward, the angled rollers create a force that pushes game pieces both forward and sideways.

In an indexer, this is extremely useful for **centering**. By placing mecanum wheels on the outer edges of your intake path, you can "vector" (push) game pieces toward the middle while they travel into the robot. This ensures that no matter where a ball or cube enters, it ends up perfectly aligned in the center for your shooter or mechanism.

:::caution Tuning Required
These systems can be finicky to perfect. The key to reliable centering is finding the correct **compression** (how tightly the wheels squeeze the game piece).
*   **Too little compression:** The rollers will slip on the game piece, and it won't move sideways.
*   **Too much compression:** The game piece will not vector .
Expect to adjust the spacing multiple times during prototyping to find the "sweet spot" where the piece flows smoothly.
:::

<iframe width="560" height="315" src="https://www.youtube.com/embed/vQFly_NYXCw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

### Vertical Sorting Wheels / Belts

Vertical sorting wheels or belts are active rollers placed on the sides of the robot's intake path. They spin to push the game piece toward the center of the robot.

These systems are **very effective** at centering game pieces quickly and reliably. However, they come with a trade-off: they usually require **additional motors** and mechanical complexity to implement compared to passive guides.

:::tip Compression is Key
For vertical sorting wheels to work, the game piece must be able to slide sideways. If the game piece is under too much **compression** (squeezed too tightly by the floor or intake rollers), it won't be able to move. You need to ensure the game piece is held loosely enough to slide when it touches the sorting wheels.
:::

<iframe width="315" height="560" src="https://www.youtube.com/embed/hgKm5OYKUrw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> 
<br/>

<img src={VerticalWheel} width="400"/>

<iframe width="560" height="315" src="https://www.youtube.com/embed/TOrZXRaGbcQ?start=33" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> 

---

### Funnel 

A funnel is the simplest form of centering. It uses angled walls or guides to passively direct the game piece toward the center as it moves forward.

**Pros:**
*   **Simplicity:** No motors, sensors, or moving parts required.
*   **Lightweight:** Just requires some polycarbonate or sheet metal.

**Cons:**
*   **Passive:** There is nothing actively pushing the game piece to the center; you are often relying on the momentum of the piece or gravity.
*   **Reliability:** Driving around or aggressive robot movement can cause game pieces to bounce out or get stuck, as there is no active force correcting their path.

See [Funnel Intakes](../Intakes/#funnel-intakes) for more details.

---

### Spindex

A Spindex is a storage and funneling system that spins and holds game pieces in a funnel. It acts as both a centering mechanism and a magazine, rotating to organize game pieces into a single file line for the shooter or scoring mechanism.

<iframe width="560" height="315" src="https://www.youtube.com/embed/9TeZc5jDEdE?start=44" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

### Conveyor Belt

A conveyor belt system uses belts to transport game pieces through the robot, similar to a checkout counter. It is a very common method for moving balls or objects from the intake to a shooter or storage area.

**Double-Sided Control:**
Conveyors can be double-sided (belts on top and bottom or both sides) to provide better control of the game element. This ensures the piece doesn't slip or roll freely, giving you more precise handling.

**Sensor Requirement:**
One common issue is that you need to have **sensors** to properly index the game elements. You need to know where each piece is so you can stop the belt to store them without jamming, or speed it up to close gaps.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ISnO6BCw4w4?start=8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> 

---

### Agitator

An agitator is a mechanism designed to keep game pieces moving within a storage hopper or indexer to prevent them from jamming or bridging. When you have a large volume of game pieces (like balls) sitting together, they can get stuck against each other and stop flowing.

<iframe width="560" height="315" src="https://www.youtube.com/embed/x6CtdZ91qzI?start=11" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

## Additional Resources

- **[Indexers by Game Piece](https://www.projectb.net.au/resources/robot-mechanisms/#ID)** - This resource goes over different indexers and how they have been used, including videos of them in action. It's a great reference for seeing real-world examples of indexing concepts.

