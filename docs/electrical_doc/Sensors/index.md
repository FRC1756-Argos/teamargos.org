---
sidebar_position: 1
---

import encoder from './Encoder.png'
import throughBoreEncoder from './ThroughBore Encoder.png'
import beamBreak from './Beam Break Sensor.png'
import imu from './IMU.png'
import timeOfFlight from './Time Of Flight.png'
import limitSwitch from './Limit Switch.png'
import colorSensor from './Color Sensor.png'
import limelight from './LimeLight.png'

# Sensors

## What are Sensors

Sensors are devices that help your robot perceive its environment and determine its position. Think of them as the robot's senses (eyes, ears, and touch). They are crucial for making a robot controllable, as manually managing everything would be too difficult and slow.

---

## Choosing the Right Sensor

When deciding which sensor to use, ask yourself:

1. **What do I need to know?**
   - Position/distance → [Encoder](#encoders) or [Time of Flight](#time-of-flight-sensor)
   - Color → [Color Sensor](#color-sensor)
   - Object present/absent → [Beam Brake](#beam-brake-sensors) or [Limit Switch](#limit-switch)
   - Direction/angle → [IMU](#imu-inertial-measurement-unit)
   - Visual target location → [Vision Sensor](#vision-sensor-camera)

2. **How accurate does it need to be?**
   - Very precise → [Encoder](#encoders) or [Vision](#vision-sensor-camera)
   - Just need to know "yes/no" → [Limit Switch](#limit-switch) or [Beam Brake](#beam-brake-sensors)

3. **Did I design for the sensor?**
    - Check if there's enough room on the robot without interfering with other components.
        - For cameras, ensure the mounting locations provide a clear view of the targets.
    - Make sure they are protected from damage from your robot or other robots.
    - Check if you can get wires to the sensors

---

## Most Common Sensors on Argos Robots

The sensors listed below are the most frequently used on Team 1756 Argos robots. These have proven to be reliable, effective, and essential for building competitive robots. Most of our robots use a combination of sensors.

---

### Encoders

**What they do:** Encoders measure how much a wheel or motor shaft has rotated.

<img src={encoder} width="200"/>

**Why you need them:** They help your robot know how far it has traveled or how much an arm has moved. Without encoders, your robot would just guess!

**How they work:** As the shaft spins, the encoder counts the rotations and tells the robot's brain (the roboRIO) the position.

**Common uses:**
- Measuring how far the robot has driven
- Tracking arm or elevator position
- Controlling motor speed precisely
**Example:** Encoders can measure how far your robot has driven, like knowing it's traveled exactly 10 feet .

---

### Through Bore Encoders

**What they do:** These are special encoders where the shaft passes through the middle of the sensor.

<img src={throughBoreEncoder} width="300"/>

**Why you need them:** They're easier to install because the shaft goes right through them.

**How they work:** As the shaft spins, the encoder counts the rotations and tells the robot's brain (the roboRIO) the position.

**Common uses:**
- Same as regular encoders, but easier to mount
- Great for places you cannot reach the end of the shaft
- Reliable position tracking
**Example:**  If your robot's arm needs to move exactly 90 degrees, encoders tell you when it's reached that angle.

---
### Vision Sensor (Camera)

**What they do:** Vision sensors are cameras that help your robot "see" targets, measure distances, and find game pieces.

<img src={limelight} width="300"/>

**Why you need them:** They're the robot's eyes! They can automatically aim at targets, find your position on the field, and detect objects.

**How they work:** A camera captures images, and a computer (like Limelight) processes the images to find targets.

**Types:**
- **AprilTag detection:** Finds special markers on the field to know where your robot is
- **Retroreflective vision:** Uses bright LEDs to spot reflective tape on field targets
- **Object detection:** Uses AI to find game pieces like balls or cones

**Common uses:**
- Automatically aiming at scoring targets
- Finding AprilTags to know robot position
- Detecting and tracking game pieces
- Auto-aligning with field elements

**Example:** Mount a Limelight on your robot. It spots the AprilTag above the scoring target and tells your robot how to turn and aim perfectly.

---

### Beam Brake Sensors

**What they do:** These sensors shoot an invisible infrared light beam and detect when something blocks it.

<img src={beamBreak} width="300"/>

**Why you need them:** They're perfect for knowing when a game piece enters your robot or when a mechanism reaches a certain spot.

**How they work:** There's a sender (emits light) and a receiver. When something breaks the beam between them, the sensor signals the robot.

**Common uses:**
- Detecting when a ball enters your intake
- Knowing when a game piece is fully loaded
- Counting objects passing through

**Example:** Put one at the entrance of your intake. When a game piece breaks the beam, your robot knows to stop the intake motors.

---

### IMU (Inertial Measurement Unit)

**What they do:** An IMU is like a compass and level combined. It tells the robot which direction it's facing and if it's tilted.

<img src={imu} width="300"/>

**Why you need them:** They help your robot drive straight, turn to exact angles, and balance on ramps. 

**How they work:** Inside are gyroscopes (detect rotation) and accelerometers (detect tilt and movement).

**Common uses:**
- Driving straight in autonomous
- Turning to a specific angle
- Balancing on the charging station
- Field-oriented drive (drive relative to the field, not the robot)

**Example:** In autonomous, use the IMU to make sure your robot turns exactly 90 degrees, not 87 or 93 degrees.

---

### Time of Flight Sensor

**What they do:** These sensors measure distance by shooting out a laser beam and timing how long it takes to bounce back.

<img src={timeOfFlight} width="300"/>

**Why you need them:** They tell your robot how far away something is - like a tape measure that works automatically.

**How they work:** A laser pulse goes out, hits an object, bounces back. The sensor calculates distance from the time delay.

**Common uses:**
- Detecting how far away a game piece is
- Stopping at the right distance from a target
- Measuring when something is inside your intake
- Avoiding obstacles

**Example:** Mount one facing forward to stop your robot exactly 12 inches from the scoring target.

---

### Limit Switch

**What they do:** Limit switches are simple buttons that get pressed when something touches them.

<img src={limitSwitch} width="300"/>

**Why you need them:** They tell your robot when something has reached a specific position inside your robot.

**How they work:** When a mechanism hits the switch, it closes (or opens) an electrical circuit, sending a signal to the robot.

**Common uses:**
- Stopping an arm from going too high or low
- Knowing when an elevator hits the top or bottom
- Detecting when a mechanism is in the "home" position
- Safety - preventing motors from over-extending

**Example:** Put limit switches at the top and bottom of an elevator. When the elevator hits the top switch, stop the motor to prevent damage.

---

### Color Sensor

**What they do:** Color sensors identify what color an object is by shining light on it and measuring the reflected light.

<img src={colorSensor} width="300"/>

**Why you need them:** Some games require sorting game pieces by color.

**How they work:** The sensor shines red, green, and blue light, then measures how much of each color reflects back.

**Common uses:**
- Identifying red vs blue game pieces
**Example:** A color sensor could detect red vs blue game pieces and eject the wrong one so you do not score the wrong game element.

---


