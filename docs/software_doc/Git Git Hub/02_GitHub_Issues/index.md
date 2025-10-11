---
sidebar_position: 3
---

# GitHub Issues

## What is a GitHub Issue?

A **GitHub Issue** is like a task card or work ticket that describes something that needs to be done on your robot project. Think of it as a to-do list item that your team can track from start to finish.

Issues can be:
- **New Features** - "Add autonomous driving mode"
- **Bug Fixes** - "Fix left motor running backwards"
- **Documentation** - "Update wiring diagram"
- **Questions** - "How should we tune the PID controller?"

### Why Use Issues?

- **Organization** - Keep track of all the work that needs to be done
- **Assignment** - Know who is working on what
- **Communication** - Discuss problems and solutions in one place
- **History** - See what's been completed and what's still pending
- **Progress Tracking** - Move issues through different stages (Ready → In Progress → Done)

---

## Viewing Issues

### Where to Find Issues

#### Method 1: Issues Tab
1. Go to your team's GitHub repository (e.g., `https://github.com/FRC1756-Argos/your-repo-name`)
2. Click on the **"Issues"** tab near the top of the page
3. You'll see a list of all open issues

#### Method 2: Projects (Recommended for Argos)
1. Go to your team's GitHub repository
2. Click on the **"Projects"** tab near the top of the page
3. Select the active project (your mentor will tell you which one)
4. You'll see issues organized by status (Ready, In Progress, In Review, Done)
5. This view makes it easy to see what's available to work on and what others are doing

### Understanding the Issues List

Each issue shows:
- **Title** - A short description of the task
- **Number** - A unique identifier (like #42)
- **Status** - What state it's in (Ready, In Progress, In Review, Done)
- **Assignees** - Who is working on it
- **Labels** - Tags that categorize the issue (bug, feature, documentation, etc.)

### Viewing Issue Details

Click on any issue to see:
- **Full Description** - Detailed explanation of the task
- **Comments** - Discussion between team members
- **Linked Pull Requests** - Code changes related to this issue
- **Project Status** - Where it is in the workflow

---

## The Argos Workflow

Team Argos uses a specific workflow to manage issues from start to finish. Following this process helps everyone stay organized and ensures nothing falls through the cracks.

### Step-by-Step Process

#### 1. **Find an Issue in "Ready" State**
   - Go to the Issues tab on GitHub
   - Look for issues marked as "Ready" - these are available to work on
   - Read the issue description carefully to understand what needs to be done

#### 2. **Assign Yourself to the Issue**
   - Click on the issue you want to work on
   - On the right side, find **"Assignees"**
   - Click **"assign yourself"** to let others know you're working on it

#### 3. **Move Issue to "In Progress"**
   - Still on the issue page, look for the **Project** section on the right
   - Change the status from **"Ready"** to **"In Progress"**
   - This tells the team you've started working

#### 4. **Create a Branch from the Issue**
   - See [Creating a Branch from an Issue](../01_Version_Control/index.md#method-1-create-branch-from-an-issue-recommended-for-argos) below
   - This creates a separate workspace for your changes

#### 5. **Make Changes and Test**
   - Write your code
   - Test thoroughly to make sure it works
   - Run the robot simulator or test on the actual robot
   - Make sure you haven't broken anything else

#### 6. **Commit and Push Changes**
   - Save your work with commits (checkpoints)
   - Push your commits to your feature branch on GitHub
   - See [Version Control Guide](../01_Version_Control/index.md#committing) for details

#### 7. **Create a Pull Request**
   - Once your changes are ready, create a Pull Request (PR)
   - Link the PR to your issue (GitHub may do this automatically)
   - Write a description of what you changed and why
   - Request a review from a mentor

#### 8. **Move Issue to "In Review"**
   - Back on the issue page, change status to **"In Review"**
   - This tells mentors your code is ready for review

#### 9. **Respond to Review Feedback**
   - Mentors will review your code and may request changes
   - Make the requested changes in your branch
   - Commit and push the updates
   - The PR will automatically update

#### 10. **Mentor Merges and Closes**
   - Once everything looks good, a mentor will merge your PR
   - This automatically closes the issue and moves it to **"Done"**
   - Your code is now part of the main project! 🎉

---

