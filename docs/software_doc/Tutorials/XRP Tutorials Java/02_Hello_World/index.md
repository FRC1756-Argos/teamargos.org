---
sidebar_position: 2
---

# Hello World in Java
## Overview
Welcome to your first step into the world of programming! In this tutorial, we'll be creating a "Hello, World!" program in Java.

---

## What is "Hello, World!"?

"Hello, World!" is a classic and simple program that, when run, displays the message "Hello, World!" on the screen. It's traditionally the very first program that beginners write when they are learning a new programming language.

The purpose of a "Hello, World!" program is to:
-   Confirm that your programming environment (editor, build tools, etc.) is set up correctly.
-   Introduce you to the basic syntax and structure of a programming language.
-   Give you a small, achievable first win to build your confidence.

Think of it as the programming equivalent of saying "hello" when you meet someone new. It's a simple greeting to the vast world of coding.

Let's get started!

---

## Clone Repository

Before we start coding, you need to get the robot code on your computer. This is called **cloning** a repository.

> **TBD — Java starter repository URL to be added.** A Java version of the XRP tutorial project does not exist yet. Once it is created, the clone URL will be added here.

For detailed instructions on how to clone the repository, please follow the guide for [cloning a repository](<../../../Git GitHub/01_Version_Control/index.md#cloning-a-repository>).

Once your repository is cloned, return to this tutorial to write your first lines of Java code.

---

## Opening Robot.java
Now that your project is set up, we need to open the file where we will write our code. We will be writing our code in the `Robot.java` file.

In the file explorer on the left side of VS Code, navigate to the `src/main/java/frc/robot` folder. Inside this folder, you will find `Robot.java`. Double-click it to open it in the editor.

> 📷 **TBD:** Java screenshot needed showing the location of `Robot.java` in the file explorer.

---

## Writing Code
Now for the fun part - writing the code! We are going to add code that prints "Hello, World!" to the console when our program starts.

### Step 1: Find the robotPeriodic Method

In Java, we don't need to import anything special to print to the console — it's built right in. We just need to find the right place to add our code.

Find the `robotPeriodic()` method in `Robot.java`. This is a method that the robot runs over and over again, about 50 times every second.

### Step 2: Add the Print Statement

Inside the `robotPeriodic()` method, after the `CommandScheduler.getInstance().run();` line, add the following:

```java
System.out.println("Hello, World!");
```

`System.out.println(...)` is Java's way of printing a line of text to the console. Whatever you put inside the quotes is what gets printed.

<details>
<summary> your code should now look like this  📊</summary>
    ```java
    // Copyright (c) FIRST and other WPILib contributors.
    // Open Source Software; you can modify and/or share it under the terms of
    // the WPILib BSD license file in the root directory of this project.

    package frc.robot;

    import edu.wpi.first.wpilibj.TimedRobot;
    import edu.wpi.first.wpilibj2.command.CommandScheduler;

    public class Robot extends TimedRobot {
      private Command m_autonomousCommand;

      private RobotContainer m_robotContainer;

      public Robot() {
        m_robotContainer = new RobotContainer();
      }

      /**
       * This function is called every 20 ms, no matter the mode. Use
       * this for items like diagnostics that you want to run during disabled,
       * autonomous, teleoperated and test.
       */
      @Override
      public void robotPeriodic() {
        CommandScheduler.getInstance().run();

        System.out.println("Hello, World!");
      }
    }
    ```
</details>

**Note:** Don't worry if you don't understand all of this code right now. We will go over all the details in future tutorials. The main goal here is to get your first program running!

---

## Running your code
Now that you've written and saved your code, the next step is to run it and see your message appear!

Need help connecting to the XRP robot? See: [Connecting to the XRP Robot](../../../XRP%20Docs/04_Connecting_to_XRP/index.md)

For detailed instructions, on how to run your code please follow the guide on [how to simulate your robot code](<../../../WPILib%20VSCode%20Docs/04_Simulate%20Robot%20Code/index.md>)

---

## Testing Your Code

Now that you've written your "Hello, World!" program, it's time to test it and ensure everything is working as expected. Once the program is running, look at the console output in the simulation window or the terminal in VS Code. You should see the following message:

```text
Hello, World!
```

> 📷 **TBD:** Java screenshot needed showing the "Hello, World!" output in the console.

If you see this message, congratulations! You've successfully written and tested your first Java program.

---

## Troubleshooting

If you don't see the expected output, here are a few things to check:

- **Did you save your changes?** Make sure you saved the `Robot.java` file before building the code.
- **Are there any errors in the terminal?** If the build process failed, carefully read the error messages and fix any issues in your code.
- **Is the simulation running?** Ensure that the simulation window is open and running your program.

Once you've resolved any issues, try running your program again.

---

## Congratulations! 🎉

You've just written and tested your very first Java program! This is a huge milestone in your programming journey. By completing this tutorial, you've learned how to:

- Set up a project.
- Write and edit Java code.
- Print text to the console with `System.out.println`.
- Test and troubleshoot your program.

This is just the beginning of your adventure into the world of programming and robotics. Keep practicing, experimenting, and building on what you've learned here. The skills you develop will open up endless possibilities for creating amazing projects.

Great job, and welcome to the world of coding!

---

## Challenge: Make It Your Own 🚀

Before you move on, try customizing your program. Pick one or more of these mini‑challenges:

- Change the message to something unique (team name, mascot, or a fun quote).
- Print two (or more) lines by using multiple `System.out.println` statements.
- Add a blank line between messages using an empty `System.out.println("");`.

When you're happy with your custom version, save it and run again to verify the output. Nice work pushing beyond the basics!

---
