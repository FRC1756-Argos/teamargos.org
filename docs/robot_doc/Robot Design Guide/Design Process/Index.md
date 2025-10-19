---
sidebar_position: 1
---

# Design Process

## Introduction

The Argos Design Process is a systematic approach to understanding the game, analyzing scoring opportunities, and making informed decisions about what your robot should do. This process is broken into four main phases that guide your team from game analysis to competition success.

### Phases:

**Phase 1: Planning** - Understanding the game, analyzing strategies, and prioritizing robot capabilities  
**Phase 2: Prototyping** - Testing mechanisms and validating design decisions  
**Phase 3: Execution** - Building, integrating, and refining the robot  
**Phase 4: Competition** - Competing, adapting, and improving

This guide walks through all four phases of the Argos Design Process, from initial game analysis to competition success. Each phase builds upon the previous one, creating a systematic approach that sets Argos up for success.

---

## Phase 1: Planning

The planning phase is where you analyze the game, calculate strategies, and determine what your robot should do. **This is the most critical phase because it sets the foundation for your entire season.** The decisions you make during planning will guide prototyping, building, and competition strategy. A strong planning phase prevents wasted time and resources on the wrong capabilities, while a rushed or incomplete planning phase can doom your season before it begins.

This phase has four critical steps that must be completed before moving to prototyping.

### Step 1: Understanding the Rules and Game

Before you can design an effective robot, you must thoroughly understand the game you're playing. This goes far beyond just reading the game manual once - it requires deep analysis and discussion.

#### Key Questions to Answer:

**Scoring Opportunities:**
- What are ALL the possible ways to score points?
- How many points is each scoring action worth?
- Are there multipliers, bonuses, or special conditions that affect scoring?
- What game elements can be scored, and where can they be scored?
- Where do you score?

**Ranking Points:**
- What are the criteria for earning ranking points (RPs)?
- What is the maximum number of ranking points you can earn?

**Game Elements:**
- How many game elements are available on the field?
- Where are they located at the start of the match?
- How do game elements become available during the match?
- What are the physical properties (size, weight, shape) of each element?
- Are there different types of game elements?

**Defense and Game Dynamics:**
- Is defense allowed in this game?
- How could defense affect your scoring strategy?
- Are there protected zones or time periods where defense is restricted?
- Can opponents interfere with your game elements or scoring?
- What are the penalties for illegal defense or contact?

**Match Timeline:**
- How is time allocated (autonomous vs. teleop vs. endgame)?
- Are there time-sensitive objectives or bonuses?
- When do certain scoring opportunities become available or unavailable?

**Remember:** You can't design a winning robot if you don't understand the game you're playing!

---

### Step 2: Points Per Second Analysis

Once you understand the game, the next critical step is analyzing **Points Per Second (PPS)** - the rate at which you can score points during different phases of the match. This analysis helps you understand which scoring actions are most valuable and where to focus your design efforts.

#### What is Points Per Second? 

Points Per Second measures how efficiently you can score points with different strategies. It accounts for all the time required to complete a scoring cycle, not just the scoring action itself.

**A complete scoring cycle includes:**
- Time to acquire/collect the game element 
- Time to transport the game element (if needed)
- Time to position for scoring
- Time to execute the scoring action
- Time to return to acquire the next game element

#### How to Calculate PPS:

Points Per Second is calculated by dividing the points scored by the total cycle time:

```
Points Per Second = Points Scored / Total Cycle Time
```

**For detailed instructions, examples, and interactive calculators, see the [Points Per Second Calculator](../Points%20Per%20Second) pages.**
#### The Importance of Accurate Cycle Time Estimates:

**Your PPS calculations are only as good as your cycle time estimates.** Inaccurate time estimates will lead to flawed strategy decisions and wasted development effort.

:::note
When estimating cycle times, consider the robot's maximum speed, which is typically around 16 ft/sec, to ensure realistic drive times.
:::

#### What to Analyze:

**Teleop PPS:**
- Calculate PPS for each possible scoring location
- Calculate PPS for each type of game element (if multiple types exist)
- Consider different pickup methods (floor, human player station, etc.)
- Account for drive time based on field layout

**Autonomous PPS:**
- Calculate PPS for autonomous-specific scoring
- Account for preprogrammed paths and timing
- Consider reliability factors (autonomous must work without driver input)
- Evaluate risk vs. reward for complex autonomous routines

**Different Game Element Sources:**
- Floor pickup - Requires intake mechanism, may be slower but more flexible
- Human player station - May be faster but requires coordination and positioning
- Pre-loaded elements - Fastest but limited quantity

#### Comparing Strategies:

Once you have PPS calculations for different approaches, you can make informed comparisons:

| Scoring Method | Points | Cycle Time | PPS | Notes |
|----------------|--------|------------|-----|-------|
| Floor pickup → Low goal | 2 | 8 sec | 0.25 | Simple but low value |
| Floor pickup → High goal | 5 | 13 sec | 0.38 | More complex mechanism |
| Human player → High goal | 5 | 9 sec | 0.56 | Requires coordination |
| Autonomous bonus | 5 | 15 sec | 0.33 | One-time opportunity |

**Important Considerations:**
- Account for variability and missed attempts (reduce PPS by 10-20% for reliability)
- Consider how defense could impact cycle times
- Evaluate how many cycles you can realistically complete in a match

**Remember:** The highest-value scoring action isn't always the best strategy if it takes too long to execute. PPS helps you find the optimal balance between points and speed!

---

### Step 3: Creating the Ideal Alliance

After analyzing Points Per Second, you need to think beyond your own robot and consider how you'll work with alliance partners. FRC is fundamentally a team sport - you compete in alliances of three robots. Understanding what makes a successful alliance is critical to making smart design decisions.

#### Why Alliance Strategy Matters:

Your robot doesn't win matches alone. You need to consider:
- How will other teams approach this game?
- What capabilities will be common vs. rare?
- What role should our robot fill to maximize alliance success?
- What combinations of robots create the strongest alliances?
- **What can we do to make other robots play their best when partnered with Argos?**

**Enabling Alliance Partners:**

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

#### Analyzing the Ideal Alliance:

**The Three-Robot Alliance:**

Every alliance has three robots, and the most successful alliances have robots with **complementary capabilities** that work together efficiently. You need to envision what the ideal three-robot alliance looks like.

**Key Questions to Answer:**

**Robot Roles and Specialization:**
- Should all three robots do the same thing, or should they specialize?
- What are the different roles robots could fill (scorer, feeder, defender, etc.)?
- How many robots are needed to accomplish specific tasks?
- Can robots work simultaneously or do they interfere with each other?

**Ranking Point Strategy:**
- What are the ranking point criteria?
- Can one robot achieve ranking points alone, or does it require alliance coordination?
- Which ranking points are realistic to pursue vs. which are too difficult?
- Should our robot be designed to enable ranking points for the alliance?

**Scoring Optimization:**
- What combination of robot strategies produces the highest alliance score?
- Should we have multiple robots doing the same high-PPS task?
- Or is it better to have robots doing different complementary tasks?
- Are there bottlenecks where multiple robots would interfere with each other?

**Defense Considerations:**
- Will defense be effective in this game?
- Should our alliance have a dedicated defensive robot?
- How does defense impact scoring strategies and PPS calculations?
- What robot capabilities make good defenders?

#### Modeling Alliance Performance:

Create scenarios to model different alliance compositions:

**Example Alliance Scenarios:**

| Alliance Composition | Strategy | Projected Score | Ranking Points | Notes |
|---------------------|----------|----------------|----------------|-------|
| 3 high-goal scorers | All score high goal | 75 points | 2 RPs | High ceiling but redundant |
| 2 scorers + 1 defender | Score + prevent opponents | 65 points | 2 RPs | Balanced approach |
| 1 scorer + 1 feeder + 1 defender | Specialized roles | 80 points | 2 RPs | Maximum efficiency |
| 2 floor + 1 human player | Different pickup sources | 70 points | 2 RPs | Flexibility |

**Important Considerations:**
- Model realistic scenarios, not perfect execution
- Account for how common certain robot types will be
- Consider what happens if you're paired with weaker partners
- Think about alliance selection strategy (would you be picked?)

#### Predicting the Meta:

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

#### Defining Your Robot's Role:

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

#### Alliance Strategy Example:

**Scenario: 2024 Crescendo**

**Ranking Points:**
- Melody RP: Score in specific pattern (requires coordination)
- Ensemble RP: 2+ robots on stage at end (requires 2-3 climbers)

**Ideal Alliance Analysis:**
- **Robot 1**: Fast cycler, floor pickup, high note scoring (8+ notes/match)
- **Robot 2**: Fast cycler, amp scoring + human player (6+ notes/match)
- **Robot 3**: Moderate scoring + reliable climb (enables Ensemble RP)

**Why this works:**
- Robot 1 & 2 maximize scoring through different paths (no interference)
- Robot 3 ensures Ensemble RP while still contributing points
- Complementary strategies create well-rounded alliance
- Achievable ranking points increase qualification ranking

#### Argos Approach:

At Team Argos, we create alliance models that consider:

1. **Multiple alliance compositions** - Model 5-10 different three-robot scenarios
2. **Meta prediction** - Analyze what capabilities will be common vs. rare
3. **Role definition** - Decide if we should be generalist, specialist, or complementary
4. **Ranking point strategy** - Determine if our robot should enable specific RPs
5. **Alliance selection planning** - Think about what makes us valuable to other teams
6. **Flexibility planning** - Consider backup roles if the meta develops differently

**Remember:** The best robot for your team might not be the highest-scoring robot in isolation. It's the robot that fills the right role to create championship-winning alliances!

---

### Step 4: Prioritizing Robot Capabilities

After understanding the game, analyzing Points Per Second, and defining your alliance strategy, you need to prioritize what your robot should do. This is not yet about how you'll design the robot - it's about establishing clear priorities for robot capabilities based on your complete analysis.

### The Three Categories:

#### Must Have ✅
These are the absolute core capabilities your robot MUST have to be competitive. Without these, your robot cannot effectively contribute to winning matches.

**Criteria for "Must Have":**
- Directly contributes to winning matches
- High Points Per Second value
- Feasible within time and resource constraints
- Required for ranking points or crucial scoring
- Reliable and proven technology

**Examples:**
- Floor pickup of primary game element
- Scoring in the highest-value location
- Basic autonomous routine (cross line + score preload)
- Ability to play defense if needed

#### Nice to Have ⭐
These are capabilities that would improve your robot's performance but aren't essential for being competitive. They add value but should only be pursued after "Must Have" items are complete.

**Criteria for "Nice to Have":**
- Provides additional strategic flexibility
- Moderate Points Per Second value
- More complex or risky to implement
- Enhances performance but not required
- Could be added later in the season

**Examples:**
- Human player station pickup (if floor pickup exists)
- Scoring in medium-value locations
- Advanced autonomous routines (multiple pieces)
- Specialized endgame mechanisms
- Climb or other endgame bonuses

#### Out of Scope 🚫
These are capabilities that, while potentially interesting, are not worth pursuing given your time, resources, and skill level. Being honest about what's out of scope prevents wasted effort.

**Criteria for "Out of Scope":**
- Low Points Per Second value
- Extremely complex or risky
- Requires resources or skills your team doesn't have
- Doesn't meaningfully contribute to winning
- Would compromise "Must Have" capabilities

**Examples:**
- Very difficult scoring locations with minimal point value
- Mechanisms that require advanced manufacturing capabilities
- Strategies that depend on unrealistic cycle times
- Features that violate the "keep it simple" principle

### Creating Your Priority List:

**Step 1: List All Possible Capabilities**
- Brainstorm everything your robot could potentially do
- Don't filter yet - just list possibilities
- Consider both offensive and defensive capabilities

**Step 2: Evaluate Each Capability**
- What is the PPS value?
- How complex is it to implement?
- How reliable can we make it?
- Does it support ranking points?
- Can we realistically build it in time?

**Step 3: Assign Categories**
- Work as a team to categorize each capability
- Be honest about your team's abilities
- Consider your team's past experience
- Factor in build season timeline

**Step 4: Rank Within Categories**
- Within "Must Have," rank by importance
- This helps if you run out of time
- Ensures you focus on highest-priority items first

### Example Priority List:

**Must Have:**
1. Floor pickup of game pieces
2. Score in high goal (5 points)
3. Autonomous: cross line + score preload
4. Defensive capability (if needed)

**Nice to Have:**
1. Human player station pickup
2. Score in medium goal (3 points)
3. Climb mechanism for endgame
4. Two-piece autonomous

**Out of Scope:**
1. Score in difficult low goal
2. Manipulate multiple game piece types
3. Complex three-piece autonomous
4. Hanging/traversal mechanisms

### Argos Approach:

At Team Argos, we hold team-wide design reviews where we:

1. **Present analysis** - Share game understanding and PPS data with everyone
2. **Facilitate discussion** - Let all subteams contribute to prioritization
3. **Vote on priorities** - Use democratic process for major decisions
4. **Document decisions** - Write down priorities and reasoning
5. **Revisit regularly** - Priorities may shift as prototyping reveals challenges
6. **Stay flexible** - Be willing to adjust if initial assumptions prove wrong

**Remember:** Prioritization is about making informed trade-offs. You can't build everything, so focus on what matters most for winning matches!

---

### Completing Phase 1: Planning

The planning phase creates a clear roadmap for your robot design:

```
Game Understanding → PPS Analysis → Alliance Strategy → Prioritization → Phase 2: Prototyping
```

#### Before Moving to Phase 2 (Prototyping):

You should be able to answer these questions:

✓ What are the highest-value scoring opportunities in this game?  
✓ What is our realistic Points Per Second for each strategy?  
✓ What will the ideal three-robot alliance look like?  
✓ What role should our robot fill to maximize alliance success?  
✓ What capabilities will help us earn ranking points?  
✓ What must our robot do to be competitive?  
✓ What nice-to-have features would enhance our performance?  
✓ What are we explicitly NOT going to attempt?  
✓ How will our robot capabilities contribute to winning matches?  
✓ Do we have team alignment on priorities?

### Common Pitfalls to Avoid:

**Pitfall: Skipping the analysis**
- Problem: Teams jump straight to designing without understanding the game
- Solution: Invest time upfront in thorough game analysis

**Pitfall: Overcomplicating the robot**
- Problem: Trying to do everything instead of doing a few things well
- Solution: Stick to your "Must Have" list and resist feature creep

**Pitfall: Ignoring Points Per Second**
- Problem: Pursuing high-point-value scoring that takes too long
- Solution: Always calculate and compare PPS for different strategies

**Pitfall: Being unrealistic about capabilities**
- Problem: Prioritizing mechanisms beyond your team's skill level
- Solution: Be honest about your team's abilities and timeline

**Pitfall: Not documenting decisions**
- Problem: Forgetting why certain priorities were chosen
- Solution: Write down your analysis, PPS data, and priority reasoning

---

## Phase 2: Prototyping

*Content for Phase 2 (Prototyping) will be added here. This phase covers:*
- Testing "Must Have" mechanisms to validate feasibility
- Building quick prototypes to evaluate different approaches
- Gathering data on mechanism performance
- Making design decisions based on prototype results
- Iterating on designs before committing to final build

---

## Phase 3: Execution

*Content for Phase 3 (Execution) will be added here. This phase covers:*
- Developing detailed CAD designs for the competition robot
- Creating a build timeline and schedule
- Manufacturing and assembling the robot
- Integrating all subsystems
- Testing and refining the complete robot
- Preparing for competition

---

## Phase 4: Competition

*Content for Phase 4 (Competition) will be added here. This phase covers:*
- Pre-competition preparation and robot inspection
- Match strategy and alliance selection
- Adapting to field conditions and competition dynamics
- Between-match repairs and adjustments
- Continuous improvement based on match performance
- Post-event analysis and lessons learned

---

## Summary and Final Advice

The Argos Design Process follows four distinct phases that build upon each other:

**Phase 1: Planning** → Understand the game and prioritize what your robot should do  
**Phase 2: Prototyping** → Test mechanisms and validate your design decisions  
**Phase 3: Execution** → Build, integrate, and refine the competition robot  
**Phase 4: Competition** → Compete, adapt, and continuously improve at events

### Key Principles Across All Phases:

**Start with strategy, not mechanisms** - Don't design a mechanism until you know why it's needed (Phase 1)

**Be data-driven** - Use Points Per Second analysis to make informed decisions (Phase 1)

**Prioritize ruthlessly** - You can't build everything, so focus on what matters most (Phase 1)

**Test before committing** - Validate assumptions through prototyping before final build (Phase 2)

**Stay flexible** - Be willing to adjust priorities based on prototyping results (Phase 2)

**Iterate and refine** - Continuous improvement throughout build season (Phase 3)

**Adapt and improve** - Learn from each match and adjust strategy accordingly (Phase 4)

**Communicate clearly** - Ensure entire team understands and agrees on priorities (All Phases)

**Document everything** - Future you will thank present you for writing things down (All Phases)

**The best robot design starts with the best design process!**
