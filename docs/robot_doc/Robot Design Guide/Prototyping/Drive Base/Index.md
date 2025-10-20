---
sidebar_position: 3
---

# Drive Base Types

import WestCoastDrive from './West Coast Product Drive.png'
import MecanumDrive from './Mecanum Drive.png'
import MecanumWheels from './Mecanum Wheels.png'
import SwerveDrive from './Swerve Drive.png'
import SwerveModule from './Swerve module.png'

## Why Choosing the Right Drive Base is Important

The drive base is the foundation of your robot - it determines how your robot moves around the field. Choosing the right drive base is one of the most important decisions your team will make because it affects:

- **Maneuverability** - How easily your robot can navigate the field and position itself
- **Speed** - How fast your robot can travel
- **Pushing power** - How well your robot can push through defense or other robots
- **Complexity** - How difficult it is to build, program, and maintain
- **Weight and space** - How much of your robot's weight budget and space is used
- **Game strategy** - What tasks your robot can effectively accomplish

**Important:** You cannot easily change your drive base once the season has started, so choose wisely based on the game requirements!

---

## Types of FRC Drivetrains

These are the most common drivetrain types used in FRC (FIRST Robotics Competition). Each has its own strengths, weaknesses, and ideal use cases. We'll cover the main options from simplest to most complex.

### West Coast Drive (WCD) / Tank Drive 

In Tank Drive, wheels or treads on each side of the robot are controlled independently. To turn, one side goes faster than the other or they go in opposite directions.  West Coast Drive (WCD) is a type of tank drive with 6 or 8 wheels where the center wheels are slightly lower (dropped center), usually by about 1/8 of an inch. This makes the robot rock slightly and reduces the number of wheels touching the ground, making it easier to turn. 

<img src={WestCoastDrive} width="600"/> 

#### Pros:
- **Simple to build** - Easy mechanical design with fewer parts (basic tank)
- **Easy to program** - Straightforward control code
- **Reliable** - Fewer things that can break
- **Good at going over obstacles** - Can navigate bumps and barriers effectively
- **Cost-effective** - Uses fewer motors and parts than other designs

#### Cons:
- **Poor maneuverability** - Cannot strafe (move sideways)
- **Scrubbing** - Wheels drag when turning, can cause the robot to hop when turning
- **Less precise** - Harder to make small adjustments to position 


#### Best for:
- Teams new to FRC 
- Games requiring strong defense 
- Simple, reliable robots 

---

### Mecanum Drive

#### What it is:
Mecanum drive uses 4 special wheels with rollers at 45-degree angles. By controlling the speed and direction of each wheel, the robot can move in any direction.

<img src={MecanumDrive} width="600"/>
<img src={MecanumWheels} width="200"/>

#### Pros:
- **Holonomic movement** - Can move sideways and diagonally
- **Simpler than swerve** - No rotating modules to build
- **Moderate cost** - Only needs 4 motors
- **Easier programming** - Less complex than swerve kinematics

#### Cons:
- **Lower pushing power** - Rollers provide less traction than solid wheels
- **Vulnerable to defense** - Easy to push around
- **Slower speed** - Not as fast as tank or swerve in straight lines
- **Poor odometry** - Due to wheel slippage, it's harder to accurately track the robot's position

#### Best for:
- Teams wanting holonomic drive without swerve complexity

---

### Swerve Drive

#### What it is:
Swerve drive has 4 independent wheel modules. Each module can rotate 360 degrees AND drive forward/backward independently. This allows the robot to move in any direction while facing any direction.

<img src={SwerveDrive} width="600"/>
<img src={SwerveModule} width="200"/>

#### Pros:
- **Maximum maneuverability** - Can move in any direction (holonomic)
- **Fast repositioning** - No need to turn to change direction
- **Precise control** - Can make very small, accurate movements
- **Defensive capabilities** - Hard for opponents to push you around
- **Field-oriented drive** - Can maintain orientation while moving

#### Cons:
- **Very complex to build** - Requires precision machining and assembly
- **Expensive** - Needs 8 motors minimum (2 per module) plus encoders
- **Difficult to program** - Complex kinematics and control algorithms
- **Heavy** - Swerve modules add significant weight
- **Requires expertise** - Steep learning curve for mechanical and software teams

#### Best for:
- Experienced teams
- Games requiring quick, precise positioning

---

## Argos Standard

**Team Argos primarily uses Swerve Drive** for our competition robots because:
- We have the experience to build and program it effectively
- Swerve provides maximum maneuverability for complex game tasks
- Our strategy often relies on precise, fast positioning
- We have the resources and expertise to maintain swerve systems



