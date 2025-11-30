---
sidebar_position: 6
---

# Lifts

## What is a Lift?

In almost every robotics competition, you will likely need to lift something—whether it's a game piece, a mechanism, or even your entire robot. Lifts are the mechanisms designed to provide this vertical motion. The choice of lift depends heavily on the game requirements, such as how high you need to reach, how heavy the object is, and what kind of reach or extension is needed.

---

## Common Lift Types

### Arm

An arm is one of the simplest ways to lift an object off the ground. It typically consists of a beam that rotates around a pivot point.

#### Single Degree of Freedom Arm

A single degree of freedom arm is the most basic arm design, consisting of a single pivot point with one rotating beam. This is essentially a lever that rotates around a fixed axis to lift or lower game pieces.

<iframe width="315" height="560" src="https://www.youtube.com/embed/maZZ-Y68PqI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

#### 4 Bar Linkage

A 4 bar linkage uses four bars connected by pivots. With careful design, you can control the end effector's orientation throughout the entire motion, making it ideal for keeping game pieces at the desired angle while lifting.

<iframe width="315" height="560" src="https://www.youtube.com/embed/NBNAvmHImek" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

**Design Tutorial:** [How to Design a 4 Bar Linkage](https://www.youtube.com/watch?v=ivTPfBbzDLY)

#### Virtual 4 Bar

A virtual 4 bar is a mechanical design that uses cables, chains, or belts and a system of sprockets or pulleys to replicate the motion of a traditional four-bar linkage. Instead of rigid bars connecting the pivots, the motion is controlled through the mechanical advantage of the cable/chain system.

<iframe width="315" height="560" src="https://www.youtube.com/embed/6r5TMeHuPN4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

**How Virtual 4 Bars Work:** [Virtual 4 Bar Mechanism Explained](https://www.youtube.com/watch?v=C8Za5GKdSUA)

#### Multi Degree of Freedom Arm

A multi degree of freedom arm consists of multiple joints that can rotate independently, allowing the arm to reach a wide variety of positions and orientations in 3D space. Think of it like a human arm with a shoulder, elbow, and wrist—each joint adds another "degree of freedom" to the system.

<iframe width="315" height="560" src="https://www.youtube.com/embed/a8dcLYsnQic" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

:::caution Programming & Mechanical Challenge
Multi degree of freedom arms are **very programming intensive** and **mechanically complex**. They require sophisticated control algorithms to coordinate multiple joints simultaneously and achieve smooth, predictable motion. The mechanical design must also account for multiple pivot points, bearings, and structural stability throughout the range of motion. Teams should carefully consider whether their programming and mechanical resources and game strategy justify this complexity.
:::

---

### Elevator

Elevators are systems created to move things in a vertical direction. They are generally made with multiple frames (stages) that slide within each other to extend upwards.

#### Single Stage

A single stage elevator has only one moving stage that extends vertically. This is the simplest elevator design and is ideal when you don't need a lot of vertical reach.

<iframe width="315" height="560" src="https://www.youtube.com/embed/eeIObPE4gkM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

#### Multi Stage

A multi stage elevator has multiple stages that slide within each other to achieve greater extension heights. Common configurations include 2-stage and 3-stage elevators, which can reach significantly higher than single stage designs.
##### Cascading Rigged Elevator
<iframe width="315" height="560" src="https://www.youtube.com/embed/gC96vJnl3xk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

##### Continuous Rigged Elevator

<iframe width="315" height="560" src="https://www.youtube.com/embed/QOPb_ahDy3Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

#### How to Rig a Cascading or Continuous Elevator

**Tutorial:** [Elevator Rigging Guide](https://www.youtube.com/watch?v=EutYFEO6Rvw&t=181s)

---

### Linear Extension

Linear extensions are mechanisms that extend in a straight line. An elevator is a specific type of linear extension, but this category also includes other designs.

#### Telescoping Arm

A telescoping arm consists of nested tubes or channels that slide within each other to extend and retract in a straight line. This design allows for compact storage while providing significant reach when extended.

<iframe width="315" height="560" src="https://www.youtube.com/embed/5Yd4HnqIEbs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

#### Rack and Pinion Arm

A rack and pinion arm uses a gear (pinion) that rotates and meshes with a linear toothed bar (rack) to create linear extension. When the pinion rotates, it drives the rack in a straight line, providing precise and powerful linear motion.

<iframe width="560" height="315" src="https://www.youtube.com/embed/WtYIh-KXHNc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

#### Ball Screw

A ball screw converts rotational motion into linear motion using a threaded shaft and a nut with recirculating ball bearings. This mechanism provides very smooth, precise, and efficient linear extension with minimal friction and high load capacity. Ball screws do not allow back driving, meaning wherever you leave the position, it will stay there without requiring continuous motor power to hold its position.

<iframe width="560" height="315" src="https://www.youtube.com/embed/VhLPZ1cpXkA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

**Example of Ball Screw and Rack and Pinion:**

<iframe width="560" height="315" src="https://www.youtube.com/embed/EVxz7j82Cp4?start=304" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

### Arm + Pivot (Pink Arm)

This configuration takes a telescoping arm and combines it with a pivot point to achieve a specific range of motion that neither could achieve alone.

<iframe width="560" height="315" src="https://www.youtube.com/embed/kfg6I2UIN_Q?start=17" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

**Notes:**
- **Versatility:** Allows for unique movement possibilities.
- **Complexity:** High software and engineering complexity due to combining two systems.
- **History:** Often referred to as a "Pink Arm" after FRC Team 233 (The Pink Team) who popularized this style.

---

## Additional Resources

- **[Lifts by Type](https://www.projectb.net.au/resources/robot-mechanisms/#LI)** - This resource covers different lift types and provides examples of how teams have used them. It includes videos and is a great reference for understanding the mechanics of lifting.
