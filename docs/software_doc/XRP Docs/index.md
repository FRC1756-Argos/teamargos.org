---
sidebar_position: 1
---

import VSCommunity2022 from './01_Overview/VS_Comminity_2022.png';

# XRP Overview

## What is the XRP Robot?
The XRP is a compact robot designed to teach the fundamentals of writing software and using sensors to accomplish tasks. A key feature of the XRP is its support for multiple programming languages, providing a versatile learning path.

We will begin with Blockly, a visual programming language where you build programs by connecting blocks, much like assembling LEGOs. This approach is excellent for learning core coding concepts, though it has its limitations.

After mastering Blockly, we will transition to C++, the same language used for our full-sized competition robot. The benefit of this is that the XRP C++ code shares the same structure as our main robot's code. This means nearly every skill you develop with the XRP is directly transferable to programming the competition robot.

Now, let's get started!

![XRP beta robot](01_Overview/XRP_Robot-02.webp)

for more details on the XRP robot visit [XRP Overview](https://xrpusersguide.readthedocs.io/en/latest/course/introduction.html)

## Robot Overview

To move and interact with its environment, the XRP comes equipped with several components:

*   **Motors:** The XRP has two motors that drive the wheels, allowing it to move forward, backward, and turn.
    
*   **Encoders:** Each motor has a built-in encoder. These sensors measure how far the wheels have turned, which allows for precise control over the robot's movement and distance traveled. The encoder are built into the motors.
   
*   **6-axis IMU (Inertial Measurement Unit):** Located on the main controller board, the IMU measures the robot's linear acceleration and rotational velocity across three axes. This is useful for detecting movement, orientation, and tilt.

*   **Ultrasonic Rangefinder:** This sensor measures the distance to objects directly in front of it by sending out sound waves and measuring how long they take to return. It's great for obstacle avoidance.

*   **Line Follower:** The kit includes a line follower sensor. This sensor can detect a dark line on a light surface (or vice-versa), allowing the robot to be programmed to follow a path.

*   **Servo Outputs:** The controller board includes four outputs to control servos. Servos are small motors that allow for precise control of angular position, making them ideal for tasks like operating a gripper or a small arm.

![XRP Sensor Overview](01_Overview/XRP_Sensor_Overview.png)

## Assembling your XRP robot
Click the video link below for instructions on assembling your XRP robot

[![XRP Introduction Video](https://img.youtube.com/vi/JQyKhzlMSms/hqdefault.jpg)](https://www.youtube.com/watch?v=JQyKhzlMSms&list=PLV6srU7KoAx4enIaCHo3Aiddv8gy4Sghd&index=1)

## XRP Computer Setup

:::warning Important

This should be done already on the Argos laptop. If you are having issues please contact a mentor.

:::

If you want to use the XRP robot on your own computer, you'll need to set it up. Follow the instructions on [WPILib Setup](https://docs.wpilib.org/en/stable/docs/zero-to-robot/step-2/wpilib-setup.html).

:::important

Since we write our software in C++, make sure you follow the [Additional C++ Installation for Simulation](https://docs.wpilib.org/en/stable/docs/zero-to-robot/step-2/wpilib-setup.html#additional-c-installation-for-simulation).

When installing Visual Studio, select the Community 2022 version (shown below), not 2026.

<img src={VSCommunity2022} width="800"/>

:::


## Imaging XRP Robot

:::warning Important

This should be done by a mentor and should already be done on your robot.

:::

For instructions on how to setup the XRP robot for WPILib software, see [WPILib Imaging](https://docs.wpilib.org/en/stable/docs/xrp-robot/hardware-and-imaging.html) or the video below
[![XRP 01: Introduction and Software Setup](https://img.youtube.com/vi/Nlk52QdoasE/hqdefault.jpg)](https://www.youtube.com/watch?v=Nlk52QdoasE&list=PLV6srU7KoAx4enIaCHo3Aiddv8gy4Sghd&index=5)

## XRP Tutorial overview

## Useful links
