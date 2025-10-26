---
sidebar position: 1
---
# Plan Your Auto Routine

Planning an autonomous routine for an FRC robot involves several key steps to ensure the robot performs reliably and effectively during the autonomous period. Below are the steps to plan and implement an autonomous routine:

## 1. Define Autonomous Goals
- Decide on the specific tasks your robot will perform during the autonomous period (e.g., scoring game pieces, crossing zones, starting position and ending position).
- Consider the time constraints and the scoring potential of each task.

<details>
<summary> Example Auto Goals </summary>

**Starting Location:** Auto line, aligned with leftmost cage

1. Score preload game piece on left pole of face C
2. Aquire new game piece from left human player station
3. Score game piece #2 on left pole of face B
4. Aquire new game piece from left human player station
5. Score game piece #3 on right pole of face B

**End Location:** Side of robot against reef face B
</details>

## 2. Develop a Path Planning Strategy
- Analyze the field layout and identify key locations such as scoring zones, game pieces, and obstacles.
- Plan paths that minimize travel time while avoiding collisions with field elements or other robots.
- Create a list of "stops" that the robot will make in order, you will use this when creating your path in Choreo

## 3. Identify All Unique Commands
- Break down the autonomous routine into individual commands that the robot will execute, excluding path-following drive commands.
- Examples of commands include:
  - **Deploy Intake**: Actuate your intake mechanism
  - **Run Intake**: Run the wheels for your intake mechanism
  - **StageGamePieceCommand**: Move the game piece through the robot to the scoring position
  - **AimAtAprilTag**: Vision command to target the scoring location of a game piece
  - **ShootGamePiece**: Command to shoot the game piece out

<details>
<summary> Example Auto Command List </summary>

Using the initial example as a reference, this is an example of how to get a unique list of commands for an auto routine.

**Full Sequential Command List:**

Path 1:

1. Drive path (Start location to reef side C)
2. Vision align (Left pole)
3. Arm Go to Position (L4, Left side of robot)
4. Place command (L4)
5. Arm Go to Position (Stow)

Path 2:

6. Drive path (Placement 1 to Pickup 1)
7. Intake (HP Position, Right side of robot)
8. Wait (1000ms)
9. Arm Go to Position (Stow)  

Path 3:

10. Drive path (Pickup 1 to Placement 2)
11. Vision align (Left pole)
12. Arm Go to Position (L4, Left Side of robot)
13. Place command (L4)
14. Arm Go to Position (Stow)

Path 4:

15. Drive path (Placment 2 to Pickup 2)
16. Intake (HP Position, Right side of robot)
17. Wait (1000ms)
18. Arm Go to Position (Stow)

Path 5:

19. Drive path (Pickup 2 to Placement 3)
20. Vision align (Right pole)
21. Arm Go to Position (L4, Left side of robot)
22. Place command (L4)
23. Arm Go to Position (Stow)

Now remove any path-following drive commands and any identical duplicate commands to get a list of unique commands.

**Unique Command List:**
- Vision Align (Left pole)
- Vision Align (Right pole)
- Arm Go to Position (L4, Left side of robot)
- Arm Go to Position (Stow)
- Place Command (L4)
- Intake (HP Position, Right side of robot)
- Wait (1000ms)

</details>

Ensure that you list *every* unique command that the robot will use as a part of this autonomous routine, including variations of the same command. For example if you need to shoot twice but each shot needs a different speed setpoint (50% and 75%), you will need to list both a ShootGamePiece (50% power) and a ShootGamePiece (75% power) command.

