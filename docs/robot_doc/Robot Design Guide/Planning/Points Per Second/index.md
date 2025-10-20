---
sidebar_position: 2
---

import MatchScoringCalculator from '@site/src/components/MatchScoringCalculator';

# Step 2: Points Per Second Analysis

## Overview

Once you understand the game, the next critical step is analyzing **Points Per Second (PPS)** - the rate at which you can score points during different phases of the match. This analysis helps you understand which scoring actions are most valuable and where to focus your design efforts.

Understanding how to score each game element efficiently during the match is crucial. If you are able to score the most points per second, you are almost always able to win a match. However, you need to make sure that your cycle times are realistic and achievable based on your robot's capabilities.

---

## What is Points Per Second? 

Points Per Second measures how efficiently you can score points with different strategies. It accounts for all the time required to complete a scoring cycle, not just the scoring action itself.

**A complete scoring cycle includes:**
- Time to acquire/collect the game element 
- Time to transport the game element (if needed)
- Time to position for scoring
- Time to execute the scoring action
- Time to return to acquire the next game element

---

## How to Calculate PPS:

Points Per Second is calculated by dividing the points scored by the total cycle time:

```
Points Per Second = Points Scored / Total Cycle Time
```

:::note
When estimating cycle times, consider the robot's maximum speed, which is typically around 16 ft/sec, to ensure realistic drive times.
:::

---

## What to Analyze:

### Teleop PPS:
- Calculate PPS for each possible scoring location
- Calculate PPS for each type of game element (if multiple types exist)
- Consider different pickup methods (floor, human player station, etc.)
- Account for drive time based on field layout

### Autonomous PPS:
- Calculate PPS for autonomous-specific scoring
- Account for preprogrammed paths and timing
- Consider reliability factors (autonomous must work without driver input)
- Evaluate risk vs. reward for complex autonomous routines

### Different Game Element Sources:
- Floor pickup - Requires intake mechanism, may be slower but more flexible
- Human player station - May be faster but requires coordination and positioning
- Pre-loaded elements - Fastest but limited quantity

---

## Comparing Strategies Example:

Once you have PPS calculations for different approaches, you can make informed comparisons:

| Scoring Method | Points | Cycle Time | PPS | Notes |
|----------------|--------|------------|-----|-------|
| Floor pickup → Low goal | 2 | 8 sec | 0.25 | Simple but low value |
| Floor pickup → High goal | 5 | 13 sec | 0.38 | More complex mechanism |
| Human player → High goal | 5 | 9 sec | 0.56 | Requires coordination |

**Analyzing the Results:**

In this example, "Human player → High goal" has the best PPS at 0.56 points per second. However, **PPS alone doesn't tell the whole story**. You need to consider:

- **Coordination requirements** - Will receiving from the human player station slow down your alliance partners who also want to use it?
- **Field traffic** - Is there congestion at the human player station that will increase your actual cycle time?
- **Reliability** - Human player handoffs require coordination and communication - are they consistently fast?
- **Flexibility** - Floor pickup may be slower but gives you more strategic options and doesn't compete with alliance partners
- **Defense vulnerability** - Are you more exposed to defense at certain pickup locations?

---

## Interactive Match Scoring Calculator

Use this calculator to explore how design decisions translate into on-field scoring throughput. Adjust the calculator to reflect your current strategy or compare options.

### How to Use the Calculator

1. **Tune the duration** of each match phase if an alternate game structure applies.
2. **Add or rename scoring actions** to match this season's opportunities.
3. **Enter point values and attempt counts** based on scouting data or design goals.
4. **Review section points and points-per-second** to look for bottlenecks or underutilized time.

<MatchScoringCalculator />

---
