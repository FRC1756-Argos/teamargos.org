---
sidebar_position: 2
---

# Version Control

## Overview

**Version control** is like having a super-powered "undo" button for your entire robot project.

Imagine you're working on a school essay:
- Without version control: You save different versions like "essay_v1.doc", "essay_v2.doc", "essay_final.doc" and get confused about which is the latest 😱
- With version control: You save your work whenever you want, and you can go back to any previous version instantly 😎

For robotics teams, version control lets you:
- **Save progress** - Like checkpoints in a video game, you can save your work at any point
- **Go back in time** - Made a mistake? No problem! Go back to when it was working
- **See what changed** - Know exactly what you changed and when

We use **Git** (the tool that tracks changes) and **GitHub** (the website where we store our code) to keep our robot code organized and safe. Our code is stored in a **repository**, which acts as a central place for all our files and their history.

---

## Repositories

### What is a Repository

A **repository** (or "repo" for short) is like a special folder that holds all your robot's code and remembers every change you've ever made.

Think of it like this:
- **Regular folder**: Just files on your computer
- **Repository**: Files + a complete history of every change

For your FRC team, the repository contains:
- Robot code
- Build instructions
- Documentation
- Everything needed to make your robot work

The repository lives on **GitHub** (like a cloud storage for code) and you can "download" it to your computer to work on it. This is called **cloning** or **pulling** the repository.

---

### Cloning a Repository

**Cloning** means downloading the repository from GitHub to your computer so you can work on it. Here's how to do it in VS Code:

#### Step 1: Get the Repository URL
1. Go to your team's GitHub page (usually `https://github.com/FRC1756-Argos/your-repo-name`)
2. Click the green **"Code"** button
3. Copy the URL (it looks like: `https://github.com/FRC1756-Argos/your-repo-name.git`)

#### Step 2: Clone in VS Code
1. Open VS Code
2. Click the **Source Control** icon on the left sidebar (looks like a branch with dots)
3. Click **"Clone Repository"**
4. Paste the URL you copied from GitHub
5. Choose where to save it on your computer (pick an easy-to-find folder)
6. Click **"Open"** when VS Code asks if you want to open the cloned repository

#### Step 3: You're Done!
- VS Code will open the repository
- You can see all the robot code files
- The repository is now on your computer and ready to work with

**Tip:** If you get stuck, ask a team mentor for the exact repository URL - they know which one to use!


---
## Branches

Now that you have cloned the repository and have the code on your computer, the next step is to create a branch. This allows you to work on new features or changes without affecting the main codebase.

### What is a Branch?


**Branches** are like having multiple versions of your robot code that can exist at the same time. Think of them as parallel universes where you can experiment safely!

#### The LEGO Robot Analogy 🧱

Imagine you built a LEGO robot that works perfectly. You want to try adding a new arm, but you're worried you might break it.

**Without branches:** You have to take apart your working robot to experiment 😱

**With branches:** You make an exact copy of your robot and experiment on the copy! If it works great, you can add the new arm to your original robot. If it doesn't work, no problem - your original robot is still perfect! 😎

#### Why Use Branches?

Branches let your team:
- **Experiment safely** - Try new features without breaking working code
- **Work together** - Multiple people can work on different parts at the same time
- **Test ideas** - Try crazy ideas without risking the main robot code
- **Organize work** - Keep different features separate until they're ready

#### Common Branch Types

- **main** (or master): Your "golden" copy that always works (never break this!)
- **feature branches**: Where you build new features (like "add-elevator" or "fix-drivetrain")
- **bug-fix branches**: Quick fixes for problems

#### Branch Workflow

```
main branch (working robot):     🤖---🤖---🤖
                                      \
experiment branch:                     🔧---🔧 (trying new arm)
```

When your experiment works, you can **merge** it back into main, combining the best of both!

**Remember:** Branches are your safety net. They let you be creative and take risks without breaking what already works!


### Creating a New Branch

**When to create a branch:** Before you start working on a new feature or experiment.

#### Step-by-Step in VS Code:
1. **Open Source Control** - Click the branch icon in the left sidebar (or press `Ctrl+Shift+G`)
2. **Click the branch name** - At the bottom of VS Code, you'll see the current branch (usually "main")
3. **Choose "Create new branch"** - Click the branch name, then select "Create new branch from..."
4. **Name your branch** - Use a clear name like:
   - `add-elevator-controls`
   - `fix-drivetrain-speed`
   - `test-new-autonomous`
5. **Press Enter** - VS Code will create and switch to your new branch automatically!

### Switching Between Branches

**When to switch branches:** When you want to work on a different version of your code.

#### Step-by-Step in VS Code:
1. **Click the branch name** - Bottom-left corner of VS Code
2. **See all branches** - A dropdown will show all available branches
3. **Click the branch you want** - VS Code will switch to that branch instantly

---

## Committing

### What is a Commit?

Once you've made changes to your robot code, you need to **save** them to Git. This is called **committing**. Think of it like saving your game progress - it creates a checkpoint you can always return to.

:::caution

**Important:** Commits are saved locally on your computer only. Your team won't see them until you push them to GitHub. We'll cover pushing in the next section!

:::

#### When to Commit

- After finishing a small task (like adding a new function)
- Before switching branches
- At the end of each work session
- When your code is in a good, working state

#### Commit Messages

When you commit your changes, you should include a commit message that clearly describes what you committed. This message helps your team and future you understand the purpose of the changes without needing to dive into the code details.

**Good messages:**
- ✅ "Add PID constants for elevator positioning"
- ✅ "Fix autonomous routine timing issue"
- ✅ "Update dashboard with match timer"

**Bad messages:**
- ❌ "fixed stuff"
- ❌ "changes"
- ❌ "update"

#### What Happens When You Commit?

- **Changes are saved** - Git remembers exactly what you changed
- **History is created** - You can go back to this exact point anytime
- **Safe experimentation** - You can try risky changes and always return here


### Step-by-Step Committing in VS Code

1. **Open Source Control** - Click the branch icon in the left sidebar (or press `Ctrl+Shift+G`)
2. **See your changes** - VS Code shows all files you've modified
3. **Stage your changes** - Click the `+` button next to files you want to save (or click the checkmark at top to stage all)
4. **Write a commit message** - In the message box at the top, write a clear description like:
   - "Add elevator motor controls"
   - "Fix drivetrain turning speed"
   - "Update autonomous path for qualification match"
5. **Click the checkmark** - This saves your changes as a commit!

---

## Pushing Changes

### What is Pushing?

**Pushing** is like uploading your saved robot code to the cloud so your whole team can see and use it! 

Remember how committing saves your work locally on your computer? Pushing takes those commits and shares them with everyone on GitHub.

#### The Cloud Storage Analogy ☁️

Imagine you have a super cool LEGO robot design on your desk. You've been working on it all day and saved your progress (that's committing). Now you want to show it to your friends and let them help build it too.

**Without pushing:** Your awesome robot stays on your desk - only you can see it 😢

**With pushing:** You upload photos and instructions to a shared folder online! Everyone can see your work, download it, and even add their own improvements! 😎

#### Why Push Your Code?

- **Share with your team** - Let mentors and teammates see your work
- **Backup your code** - Your work is safe on GitHub even if your computer breaks
- **Collaborate** - Others can build on your changes
- **Show progress** - Demonstrate what you've accomplished

#### When to Push

- After committing your changes
- At the end of a work session
- When you want feedback from your team
- Before switching to work on something else

**Remember:** Push often to keep your team in the loop, but make sure your code works first!

### Step-by-Step Pushing in VS Code

1. **Make sure you're committed** - You should have committed your changes first ([See commiting section](#committing))
2. **Open Source Control** - Click the branch icon in the left sidebar (or press `Ctrl+Shift+G`)
3. **Click the sync button** - Look for the circular arrow icon (🔄) at the bottom of the Source Control panel
4. **Choose "Push"** - If it asks, select "Push" to upload your commits
5. **Wait for success** - VS Code will show a progress message, then "Successfully pushed" when done

---

## Pulling Changes

### What is Pulling?

**Pulling** is like downloading the latest version of your robot code from the cloud so you have what your teammates have been working on!

Remember how pushing uploads your commits to GitHub? Pulling does the opposite - it downloads commits from GitHub to your computer.

#### The Shared Document Analogy 📥

Imagine you and your friends are working on a group project using a shared document:

**Without pulling:** You keep working on your old version while your friends make improvements. You miss out on their changes and your work gets out of sync 😢

**With pulling:** You download the latest version with everyone's changes! Now you're working with the most up-to-date code and can build on what others have done 😎

#### Why Pull Changes?

- **Stay up-to-date** - Get the latest code your team has written
- **Avoid conflicts** - Working with old code causes problems when you try to push
- **See improvements** - Benefit from bug fixes and features your team added
- **Collaborate better** - Build on top of your teammates' work

#### When to Pull

- **Before you start working** - Always pull before making changes
- **Before you push** - Make sure you have the latest code before sharing yours
- **When teammates tell you** - If someone says "I just pushed an important fix"
- **Regularly throughout the day** - Stay synchronized with your team

**Remember:** Pull early and often to avoid merge conflicts and stay in sync with your team!

### Step-by-Step Pulling in VS Code

1. **Open Source Control** - Click the branch icon in the left sidebar (or press `Ctrl+Shift+G`)
2. **Click the sync button** - Look for the circular arrow icon (🔄) at the bottom of the Source Control panel
3. **Choose "Pull"** - If it asks, select "Pull" to download the latest commits
4. **Wait for success** - VS Code will show a progress message, then display any new changes
5. **Review the changes** - Check what your teammates changed before continuing your work

:::tip

**Pro Tip:** If you see conflicts after pulling, don't panic! Ask a mentor for help resolving them. Conflicts happen when you and a teammate changed the same part of a file.

:::

---

## Merging Branches (Advanced Topic)

:::info

**Note for Students:** Your team mentors will usually handle merging branches, but it's important to understand what it is so you know what's happening when they do it!

:::

### What is Merging?

**Merging** is like combining two different versions of your robot code into one perfect version!

When you work on a branch (remember our LEGO robot experiments?), you create separate versions of the code. Merging brings those experimental changes back into the main codebase.

#### The LEGO Robot Merge Analogy 🧱🤝🧱

Imagine you and a teammate both have LEGO robot bases, and you've each added different features:

- You added a stronger drivetrain
- Your teammate added better sensors

**Without merging:** You have two separate robots - you can't use both improvements together 😕

**With merging:** You combine the best of both! The final robot has your strong drivetrain AND your teammate's better sensors 😎

#### Why Merge Branches?

- **Combine improvements** - Bring new features from experiments into the main code
- **Team collaboration** - Merge everyone's contributions together
- **Keep code organized** - Clean up experimental branches after they're tested
- **Release new features** - Make approved changes available to everyone

#### When Merging Happens

- **After testing** - When experimental features are proven to work
- **Team review** - Usually a mentor reviews the changes before merging
- **Milestone completion** - When a feature branch is finished (like "add-elevator" or "fix-autonomous")
- **Code cleanup** - To keep the main branch clean and working

**Remember:** Merging is usually done by experienced team members who can handle any conflicts that arise.

### Understanding Merge Conflicts

Sometimes when merging, Git finds **conflicts** - when two people changed the same part of the code differently.

#### Example Conflict

Imagine you and your teammate both changed the same motor speed setting:

- You set it to `0.8` for better control
- Your teammate set it to `0.6` for more power

Git doesn't know which one to choose! This creates a **merge conflict** that needs human judgment to resolve.

**Don't worry:** Your mentors will handle conflicts. Just know that they happen when teams work on similar code at the same time.

### The Merge Workflow (What Mentors Do)

1. **Review the branch** - Check that the experimental code works and is ready
2. **Pull latest changes** - Make sure main branch is current
3. **Merge the branch** - Combine the changes using Git commands or GitHub
4. **Resolve conflicts** - Fix any conflicts that arise
5. **Test the merge** - Make sure everything still works
6. **Push the merged code** - Share the combined version with the team

**Your role:** Keep your branches focused on one feature, commit often, and communicate with your team about what you're working on. This makes merging much easier for everyone!
