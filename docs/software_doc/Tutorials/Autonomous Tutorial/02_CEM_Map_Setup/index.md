---
sidebar position: 2
---
# Choreo Event Manager Setup

## What is Choreo Event Manager?

**Choreo Event Manager** is a tool that we use to track and trigger commands during a choreo based autonomous routine.

Choreo, a FRC path planning tool, allows users to add event markers on a path. These markers don't do anything on their own but we can use these markers to trigger commands by mapping a string to a command.

A **choreo event** contains 2 components: a `name` and a `timestamp`. 

The `name` is just a string of characters that means nothing to our robot, so we need to tell it what to do when it sees a command with a certain `name` when that event's `timestamp` is reached by the auto routine.

In order to do this we must first creat a `ChoreoEventManager` instance within our `RobotContainer`. 

Start by looking at your `robotContainer.h` file. Ensure you have included the `ChoreoEventManager.h`, then create a new `ChoreoEventManager` object instance.