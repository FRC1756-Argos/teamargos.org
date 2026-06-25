---
sidebar_position: 5
---
# Tuning
## Overview
> This tutorial builds on the [XRP Button Drive](../04_Button_Drive/index.md). If you have not completed that one, please do so before continuing.

As you might have noticed when testing your button drive code, the robot turns a little too quickly. This is a great opportunity to address an important concept in programming: **magic numbers**.

Magic numbers are hardcoded values like `1` or `-1` that appear in your code without explanation. They can make your code harder to read and maintain. In this tutorial, we will learn how to replace these magic numbers with meaningful, named constants to make tuning your turning speed easier and your code more understandable.

---

## The Problem with "Magic Numbers"

In our `buttonDrive` method, we used values like `1` and `-1` directly in the code: `m_leftMotor.set(1);`. These hardcoded, unexplained numbers are often called **"magic numbers."**

They cause two main problems:
1.  **Hard to Read:** What does `1` mean? Is it full power? Is it a specific speed? The number itself doesn't say.
2.  **Hard to Change:** If the robot turns too fast, you have to hunt through the code and change every `1` and `-1` related to turning. This is slow and you might miss one!

The solution is to use named **constants** organized inside a **constants class**.

## What are Constants and a Constants Class?

### Constants
A [**constant**](../../../Java%20Docs/Java_software_quick_reference/index.md#variables-and-data-types) is a named value that never changes while the program runs. When you create one, you give it a **data type**, which tells the computer what kind of information it will hold. For example:
-   `double`: For numbers with decimals (like motor speeds `0.5`, `-0.75`).
-   `int`: For whole numbers (1, 2, 43).
-   `boolean`: For true/false values.

Instead of writing `1` everywhere, we can create a constant called `kTurnSpeed` with a `double` data type, give it a value, and then use the *name* `kTurnSpeed` in our code.

**Why is this better?**
-   **Readability:** `kTurnSpeed` is much clearer than `1`.
-   **Tuning:** If the robot turns too fast, you only need to change the value of `kTurnSpeed` in **one place** to update it everywhere it's used.

### The Constants Class
In a WPILib Java project, all of these named values live in one easy-to-find file called `Constants.java`. To keep things tidy, we group related constants inside their own nested class. For example, we can create a `DrivetrainConstants` class to hold all the values related to our drivetrain, like `kMoveSpeed` and `kTurnSpeed`.

For more details, see [The Constants Class](../../../Java%20Docs/Java_software_quick_reference/index.md#the-constants-class).

Now, let's apply this to our project.

## Constants.java file
We will need to open the `Constants.java` file, which is located at `src/main/java/frc/robot/Constants.java`.

Inside this file, we will create a `DrivetrainConstants` class to hold our speed values. This keeps them organized and separate from other constants in your project.

Add the following code inside the `Constants` class:

```java
public static final class DrivetrainConstants {
    public static final double kMoveSpeed = 0.75; // Speed for moving forward and backward (1 = max speed, 0 = stopped)
    public static final double kTurnSpeed = 0.5;  // Speed for turning left and right (1 = max speed, 0 = stopped)
}
```
<details>
<summary>Understanding the code</summary>

-   `public static final class DrivetrainConstants`: This creates a small container named `DrivetrainConstants`. It groups related constants together to keep the code organized.
-   `public`: This means other files (like our `Drivetrain`) are allowed to read these values.
-   `static final`: Together these mean "this value belongs to the class and never changes." `final` is what makes it a constant.
-   `double`: This is the data type, which means the value can hold a number with a decimal point. This is suitable for representing speeds that aren't whole numbers.
-   `kMoveSpeed`: This is the name of the constant. The `k` prefix is a common programming convention (especially in FRC) to indicate that the value is a constant.

</details>

<details>
<summary>Your Constants.java file should look like this</summary>

```java
// Copyright (c) FIRST and other WPILib contributors.
// Open Source Software; you can modify and/or share it under the terms of
// the WPILib BSD license file in the root directory of this project.

package frc.robot;

public final class Constants {
  public static final class DrivetrainConstants {
    public static final double kMoveSpeed = 0.75; // Speed for moving forward and backward (1 = max speed, 0 = stopped)
    public static final double kTurnSpeed = 0.5;  // Speed for turning left and right (1 = max speed, 0 = stopped)
  }
}
```
</details>


## Drivetrain.java file
Now that we have defined the constants, let's use them. The first step is to let `Drivetrain` know about them. We do this by adding an `import` for our nested constants class at the top of `Drivetrain.java`:

```java
import frc.robot.Constants.DrivetrainConstants;
```

Now that `Drivetrain` knows about our constants, we can use them. To read a value, you write the class name, a dot, then the constant name: `DrivetrainConstants.kMoveSpeed`.

In our `buttonDrive` method, we will replace the magic numbers with our new constants:
-   `1` becomes `DrivetrainConstants.kMoveSpeed`
-   `-1` becomes `-DrivetrainConstants.kMoveSpeed`
-   The turning values will use `DrivetrainConstants.kTurnSpeed`

<details>
<summary>your code should look like this</summary>

```java
// Copyright (c) FIRST and other WPILib contributors.
// Open Source Software; you can modify and/or share it under the terms of
// the WPILib BSD license file in the root directory of this project.

package frc.robot.subsystems;

import edu.wpi.first.wpilibj.xrp.XRPMotor;
import edu.wpi.first.wpilibj2.command.SubsystemBase;
import frc.robot.Constants.DrivetrainConstants;

public class Drivetrain extends SubsystemBase {
  // This creates an object for the left motor on channel 0
  private final XRPMotor m_leftMotor = new XRPMotor(0);
  // This creates an object for the right motor on channel 1
  private final XRPMotor m_rightMotor = new XRPMotor(1);

  public Drivetrain() {}

  // A method to drive the robot with button drive controls.
  // It takes button presses and turns them into left and right motor speeds.
  public void buttonDrive(boolean forward, boolean backward, boolean turnLeft, boolean turnRight) {
    // Check if the forward button is pressed
    if (forward) {
      m_leftMotor.set(DrivetrainConstants.kMoveSpeed);   // Drive forward
      m_rightMotor.set(-DrivetrainConstants.kMoveSpeed); // Drive forward (inverted)
    }
    // Check if the backward button is pressed
    else if (backward) {
      m_leftMotor.set(-DrivetrainConstants.kMoveSpeed);  // Drive backward
      m_rightMotor.set(DrivetrainConstants.kMoveSpeed);  // Drive backward (inverted)
    }
    // Check if the turnLeft button is pressed
    else if (turnLeft) {
      m_leftMotor.set(-DrivetrainConstants.kTurnSpeed);  // Turn left
      m_rightMotor.set(-DrivetrainConstants.kTurnSpeed); // Turn left
    }
    // Check if the turnRight button is pressed
    else if (turnRight) {
      m_leftMotor.set(DrivetrainConstants.kTurnSpeed);   // Turn right
      m_rightMotor.set(DrivetrainConstants.kTurnSpeed);  // Turn right
    }
    // If no buttons are pressed, stop the robot
    else {
      m_leftMotor.set(0.0);  // Stop
      m_rightMotor.set(0.0); // Stop
    }
  }

  // This method will be called once per scheduler run
  @Override
  public void periodic() {}
}
```
</details>

## Time to Tune!
Need help connecting to the XRP robot? See: [Connecting to the XRP Robot](../../../XRP%20Docs/04_Connecting_to_XRP/index.md)


 it is time to test your code.  Go to [XRP Run Code](<../../../WPILib%20VSCode%20Docs/04_Simulate%20Robot%20Code/index.md>) to test your code.


Now that you've replaced the magic numbers with constants, it's time to test and tune your robot.

1. **Adjust the Constants:**
   - Open the `Constants.java` file.
   - Modify the values of `kMoveSpeed` and `kTurnSpeed` to fine-tune the robot's speed and turning rate.
     - For example, if the robot moves too fast, reduce `kMoveSpeed` (e.g., change `0.75` to `0.5`).
     - If the robot turns too quickly, reduce `kTurnSpeed` (e.g., change `0.5` to `0.3`).

2. **Re-Test:**
   - Save your changes and redeploy the code.
   - Test the robot again to see if the adjustments improved its behavior.

---

## Challenge: Dial In Your Drive 🚀

Push your tuning further. Pick a few of these mini‑challenges and record what you learn (values tried, driver feedback, final choice, and why):

- Build a quick table of (kMoveSpeed, kTurnSpeed) trials (e.g., 0.75/0.50 → 0.60/0.40 → 0.50/0.35) and note which feels most controllable.
- Define separate "precision" values you would use if a slow mode were added later (just choose numbers and justify them).
- Identify the lowest kTurnSpeed that still produces a smooth 90° pivot without stalling or wobbling.

### Tips
- Change one constant at a time; isolate its effect.
- Favor consistency and controllability over raw speed early on.

When you finish, summarize: "We chose kMoveSpeed = X, kTurnSpeed = Y because …". That habit builds disciplined iteration. 🔧

---
