---
sidebar_position: 3
---

# Step 3: Creating the Ideal Alliance

## Overview

After analyzing Points Per Second, you need to think beyond your own robot and consider how you'll work with alliance partners. FRC is fundamentally a team sport - you compete in alliances of three robots. Understanding what makes a successful alliance is critical to making smart design decisions.

---

## Why Alliance Strategy Matters:

Your robot doesn't win matches alone. You need to consider:
- How will other teams approach this game?
- What capabilities will be common vs. rare?
- What role should our robot fill to maximize alliance success?
- What combinations of robots create the strongest alliances?
- What can we do to make other robots play their best when partnered with Argos?

---

## Enabling Alliance Partners:

A great alliance partner doesn't just score points - they help their partners succeed too. Consider how your robot can enable others:

- **Clear the field** - Pick up game pieces quickly so partners have options
- **Feed partners** - Stage game pieces for alliance partners to score faster
- **Control space** - Position strategically to give partners room to operate
- **Cover weaknesses** - Fill gaps in capabilities that other robots might lack
- **Reliable execution** - Consistent performance lets partners plan around you
- **Complementary timing** - Don't compete for the same space or resources simultaneously

**Examples of Enabling Strategies:**
- If you intake from the floor quickly, you free up the human player station for partners
- If you can score in difficult locations, partners can focus on high-volume easy scoring
- If you play defense effectively, you give scoring partners more time and space
- If you're reliable at ranking point tasks, partners can focus purely on points

---

## Analyzing the Ideal Alliance:

**The Three-Robot Alliance:**

Every alliance has three robots, and the most successful alliances have robots with **complementary capabilities** that work together efficiently. You need to envision what the ideal three-robot alliance looks like.

**Key Questions to Answer:**

### Robot Roles and Specialization:
- Should all three robots do the same thing, or should they specialize?
- What are the different roles robots could fill (scorer, feeder, defender, etc.)?
- How many robots are needed to accomplish specific tasks?
- Can robots work simultaneously or do they interfere with each other?

### Ranking Point Strategy:
- What are the ranking point criteria?
- Can one robot achieve ranking points alone, or does it require alliance coordination?
- Which ranking points are realistic to pursue vs. which are too difficult?
- Should our robot be designed to enable ranking points for the alliance?

### Scoring Optimization:
- What combination of robot strategies produces the highest alliance score?
- Should we have multiple robots doing the same high-PPS task or is it better to have robots doing different complementary tasks?
- Are there bottlenecks where multiple robots would interfere with each other?

### Defense Considerations:
- Will defense be effective in this game?
- Should our alliance have a dedicated defensive robot?
- How does defense impact scoring strategies and PPS calculations?
- What robot capabilities make good defenders?

---

## Modeling Alliance Performance:

Create scenarios to model different alliance compositions using your Points Per Second analysis from Step 2. For each scenario, calculate the projected alliance score based on realistic cycle times and match duration.

### Example Scenarios

Assume these individual robot capabilities:
- **High goal scorer** = 0.30 PPS
- **Feeder robot** = Enables scorer to reach 0.65 PPS (by staging game pieces)
- **Defender** = Reduces opponent by 0.12 PPS (16.2 points per scoring robot)

**Example Alliance Scenarios:**

*Assuming 135-second teleop period:*

| Alliance Composition | Robot 1 PPS | Robot 2 PPS | Robot 3 PPS | Alliance PPS (Alliance Points) | Note |
|---------------------|-------------|-------------|-------------|------------------------------|------|
| 3 high-goal scorers | 0.30 | 0.30 | 0.30 | **0.90 (122 pts)** | All three robots score independently |
| High goal + High goal + Defender | 0.30 | 0.30 | 0 | **0.60 (81 pts)** | Defender reduces opponent by 16.2 pts per opposing scorer|
| High goal + Feeder + Defender | 0.65 | 0.00 | 0 | **0.65 (88 pts)** | Feeder boosts scorer but doesn't score itself. Defender reduces opponent by 16.2 pts per opposing scorer |

#### Head-to-Head Alliance Matchups:

Now let's analyze how each alliance composition performs against every other composition, accounting for defensive impact. Each cell shows the final score accounting for defense effects.

**Matchup Matrix:**

| Blue Alliance ↓ \ Red Alliance →  | 3 High-Goal Scorers  | 2 High-Goal + Defender | High-Goal + Feeder + Defender |
|---------------------------------- |--------------------- |------------------------|-------------------------------|
| **3 High-Goal Scorers**           | 🟨 122 vs 122 (TIE) | 🟥 73 vs 81 (LOSS)     | 🟥 73 vs 88 (LOSS)           |
| **2 High-Goal + Defender**        | 🟩 81 vs 73 (WIN)   | 🟨 81 vs 81 (TIE)      | 🟥 49 vs 72 (LOSS)           |
| **High-Goal + Feeder + Defender** | 🟩 88 vs 73 (WIN)   | 🟩 72 vs 49 (WIN)      | 🟨 72 vs 72 (TIE)            |


#### Analysis:

The High-Goal + Feeder + Defender composition emerges as the strongest strategy due to its high efficiency and effective use of defense:

---

## Predicting the Meta:

The "meta" refers to the most common and effective strategies that emerge in a season. Predicting the meta helps you make smart design choices.

**Questions to Consider:**

**What will most teams build?**
- What capabilities are easiest to implement?
- What mechanisms are most obvious or common?
- What will rookie teams or less experienced teams attempt?

**What will be rare or difficult?**
- What capabilities require advanced manufacturing?
- What mechanisms are complex or risky?
- What strategies require exceptional driver skill?

**Where is there opportunity?**
- If everyone does X, is there value in doing Y instead?
- What niche role could make your robot highly valuable?
- What capabilities would make you a "must-pick" alliance partner?

---

## Defining Your Robot's Role:

Based on your alliance analysis, determine what role your robot should fill:

**Generalist Robot:**
- Can perform multiple tasks reasonably well
- Flexible and adaptable to different alliance partners
- Good for Week 1 when the meta is uncertain
- May not excel at any single task

**Specialist Robot:**
- Excels at one specific high-value task
- Highly efficient but less flexible
- Good if you're confident in the meta
- Needs the right alliance partners to succeed

**Complementary Robot:**
- Fills a specific niche that other robots won't
- Enables ranking points or unique strategies
- Makes you valuable in alliance selection
- Risk if the meta develops differently than expected

