import hoop from './hoop.png'
import field from './hoopla_field_layout.png'

# Game Manual

## 1. Overview

The 2026 Argobot Challenge: Hoopla is played by opposing **TEAMS** on a rectangular **FIELD**. Named after the classic carnival ring-toss game, the primary objective is for **ROBOTS** to score **HOOPS** (6-inch rubber rings) on **PRIZE PEGS** mounted on their **TEAM's** three **PRIZE TREES**, or in their **TEAM's CONSOLATION ZONE** on the floor. Higher **PRIZE PEGS** are worth more points, and stacking **HOOPS** of the same color on one **PRIZE PEG** earns a **COLOR COMBO** bonus.

## 2. Game Pieces

The only game piece used in Hoopla is the **HOOP**, which comes in six colors (Red, Orange, Yellow, Green, Blue, and Purple).

| Game Piece | Description |
| --- | --- |
| **HOOP** | A 6-inch Gopher rainbow rubber ring. Each **TEAM** has **18 HOOPS**: **3** of each of the **6 colors**. The game utilizes **36 HOOPS** total. |

<img src={hoop} width="300"/>
**HOOP**

## 3. Scoring Locations

There are two types of scoring locations, each offering a different point value and scoring method. Every scoring location belongs to one **TEAM**.

| Scoring Location | Count/Ownership |
| --- | --- |
| **PRIZE TREE** | Three per **TEAM**, each holding three **PRIZE PEGS** |
| **BOTTOM SHELF** (low **PRIZE PEG**) | One per **PRIZE TREE** |
| **MIDDLE SHELF** (mid **PRIZE PEG**) | One per **PRIZE TREE** |
| **TOP SHELF** (high **PRIZE PEG**) | One per **PRIZE TREE** |
| **CONSOLATION ZONE** | One per **TEAM** |

## 4. Field Layout and Dimensions

The **HOOPLA FIELD** is a rectangle measuring **24 feet long** by **16 feet wide**. All field elements are mirrored so both **TEAMS** face the same layout.

| Component | Dimensions and Location |
| --- | --- |
| **FIELD** | 24' long x 16' wide playing surface. Each **TEAM's** station wall is one of the 16' ends. |
| **MIDWAY** | The centerline of the **FIELD**, marked with tape, dividing the two halves. |
| **RING BOOTH** (Team-Specific) | A 3' x 3' taped square against the **TEAM's** station wall, starting 2' in from the side wall on the **TEAM's** left. The tape is part of the **RING BOOTH**. |
| **RING RAMP** (Team-Specific) | A 1" wide 80-20 rail that crosses the station wall 18" above the floor and slopes down at about 30°, reaching the floor about 31" inside the **RING BOOTH**. It is narrow enough that a **HOOP** must roll on its edge. |
| **RING HOOK** (Team-Specific) | A 4" 80-20 peg on the station wall, 12" above the floor, angled 15° upward and pointing into the **RING BOOTH**. It holds **one HOOP**. |
| **CONSOLATION ZONE** (Team-Specific) | A taped rectangle 5' wide along the **TEAM's** station wall and 3' deep, starting 2' in from the side wall on the **TEAM's** right. The tape is part of the **CONSOLATION ZONE**. |
| **PRIZE TREE** (Team-Specific) | An 80-20 tower standing entirely outside the **FIELD** along the side wall nearest the **TEAM's CONSOLATION ZONE**. **Three** are provided for **each team**, 2', 6.5', and 11' from the **TEAM's** station wall. |
| **PRIZE PEG** | About 4" of 80-20, angled 15° upward and pointing straight into the **FIELD**. Holds a maximum of **3 HOOPS**. Heights where the peg meets the tree: **BOTTOM SHELF** 12", **MIDDLE SHELF** 24", **TOP SHELF** 36". |

Any **FIELD** wall in front of a **PRIZE TREE** is lower than 12" so it does not block the **BOTTOM SHELF**.

### Field Layout

<img src={field} width="800"/>

## 5. Scoring Definition

This section defines what constitutes a score, how credit is assigned, and how the **COLOR COMBO** bonus works. Scores are counted once all **HOOPS** and **ROBOTS** come to rest after the match ends.

### A. Scored (PRIZE PEG) Definition

A **HOOP** counts as **SCORED** on a **PRIZE PEG** when:
* The **PRIZE PEG** passes through the center of the **HOOP**.
* It is **supported only** by that **PRIZE PEG**, its **PRIZE TREE**, or other **HOOPS SCORED** on that same **PRIZE PEG**.
* It is **not in contact with a ROBOT** or any **HOOP** a **ROBOT** is touching.

A **HOOP** resting on a tree base or caught on the tree, but not around a **PRIZE PEG**, is **not SCORED** and earns nothing. A **PRIZE PEG** scores at most **3 HOOPS**. If more than 3 are on one **PRIZE PEG**, only the 3 closest to the tree count.

### B. Scored (CONSOLED) Definition

A **HOOP** counts as **CONSOLED** (scored in the **CONSOLATION ZONE**) when:
* It is touching the floor, or another **CONSOLED HOOP**, inside the **CONSOLATION ZONE**.
* It is **fully contained** within the outer edge of the tape.
* It is **not in contact with a ROBOT** or any **HOOP** a **ROBOT** is touching.

### C. Scoring Credit Rules

* **HOOPS SCORED** on a **PRIZE PEG** or **CONSOLED** in a **CONSOLATION ZONE** count for the **TEAM** that owns the **PRIZE TREE** or **CONSOLATION ZONE**, regardless of which **ROBOT** placed them or what color they are.

### D. COLOR COMBO Bonus

* On each **PRIZE PEG**, every **HOOP** that shares its color with at least one other **HOOP** on that peg earns **1 BONUS POINT**.
    * A **PRIZE PEG** holding **2 Red HOOPS** earns **+2**.
    * A **PRIZE PEG** holding **3 Red HOOPS** earns **+3**.
* **COLOR COMBO** only applies on **PRIZE PEGS**, not in the **CONSOLATION ZONE**.

## 6. Scoring Summary

The following table summarizes all potential points a **TEAM** can earn by scoring **HOOPS** or achieving bonuses.

| Scoring Action | Points Earned | Scoring Method / Credit |
| --- | --- | --- |
| **CONSOLATION ZONE** (Per HOOP) | 1 POINT | Credited to the **TEAM** owning the zone, regardless of **HOOP** color. |
| **BOTTOM SHELF** (Per HOOP) | 2 POINTS | Credited to the **TEAM** owning the **PRIZE TREE**, regardless of **HOOP** color. |
| **MIDDLE SHELF** (Per HOOP) | 3 POINTS | Credited to the **TEAM** owning the **PRIZE TREE**, regardless of **HOOP** color. |
| **TOP SHELF** (Per HOOP) | 5 POINTS | Credited to the **TEAM** owning the **PRIZE TREE**, regardless of **HOOP** color. |
| **COLOR COMBO** (Per HOOP) | 1 BONUS POINT | Each **HOOP** that matches the color of another **HOOP** on the same **PRIZE PEG**. |

**Examples:**

| Location | HOOPS | Base Points | COLOR COMBO | Total |
| --- | --- | --- | --- | --- |
| **TOP SHELF** | Red, Red, Blue | 3 x 5 = 15 | +2 (both Reds) | **17** |
| **BOTTOM SHELF** | Green, Green, Green | 3 x 2 = 6 | +3 (all three Greens) | **9** |
| **MIDDLE SHELF** | Red, Orange, Yellow | 3 x 3 = 9 | +0 | **9** |
| **CONSOLATION ZONE** | Purple, Purple | 2 x 1 = 2 | None on the floor | **2** |

## 7. Gameplay Rules

The following rules govern the match, the control of **HOOPS**, and general **ROBOT** behavior:
* A match lasts **2 minutes**, all driver-controlled. There is no autonomous period.
* At the start of the match, each **ROBOT** must be at least partially inside its own **TEAM's CONSOLATION ZONE**.
* A **TEAM** may preload **1 HOOP** onto its **ROBOT**. The preload must be **Red**, the first **HOOP** of the **ENTRY ORDER**. If a **TEAM** chooses not to preload, that **HOOP** starts with its **ATTENDANT**.
* A **ROBOT** can control only **1 HOOP** at a time.
* A **ROBOT** may only score on its own **TEAM's PRIZE TREES** and **CONSOLATION ZONE**.
* A **ROBOT** may not remove **HOOPS** from the opposing **TEAM's PRIZE PEGS** or **CONSOLATION ZONE**.
* A **ROBOT** may not touch the opposing **TEAM's PRIZE TREES**.
* A **ROBOT** may not attempt to attach to or move any **PRIZE TREE**. Brief contact while scoring is allowed.
* A **ROBOT** may not enter the opposing **TEAM's RING BOOTH** or take **HOOPS** from it.
* **ROBOTS** must not intentionally eject **HOOPS** from the **FIELD**. A **HOOP** that leaves the **FIELD** is out of play for the rest of the match.
* **ROBOTS** must stay within the boundary of the **FIELD** at all times.
* **ROBOTS** may not attempt to contact the opposing **TEAM's ROBOT**.

**Violations:** There are no point penalties. Any score that results from breaking a rule is **voided**, and the **HOOPS** involved do not count at the completion of the match. An **egregious** violation may result in that **TEAM forfeiting** the match.

## 8. Ring Booth Rules

The **HUMAN PLAYER** (designated **ATTENDANT**) introduces **HOOPS** to the **FIELD** using the **RING RAMP** or the **RING HOOK**. All of a **TEAM's HOOPS** except the optional preload start with the **ATTENDANT**, outside the **FIELD**.

When entering **HOOPS** to the **FIELD** the **ATTENDANT**:
* **MUST** enter **HOOPS** one at a time in the **ENTRY ORDER**: Red, Orange, Yellow, Green, Blue, Purple, repeated three times. If the **TEAM** preloaded, the **ATTENDANT** starts with Orange.
* **MAY** choose the **RING RAMP** or the **RING HOOK** for each **HOOP**.
* **MUST** stand a **HOOP** upright on the **RING RAMP** and release it while it is in contact with the **RING RAMP**, without adding push or spin.
* **MAY** release a **HOOP** from any point on the **RING RAMP**, at any time, even with a **ROBOT** in the **RING BOOTH**. Only one **HOOP** may be on the **RING RAMP** at a time.
* **MAY** hang a **HOOP** on the **RING HOOK** only while no part of any **ROBOT** is inside the **RING BOOTH**. Only one **HOOP** may be on the **RING HOOK** at a time.
* **MUST** let go at once if a **ROBOT** enters the **RING BOOTH** while placing a **HOOP** on the **RING HOOK**.
* **MAY NOT** throw **HOOPS**, hand them to a **ROBOT**, or touch a **ROBOT**.
* **MAY NOT** cross into the **FIELD** in any fashion.

A **HOOP** that rolls off the **RING RAMP** and out of the **RING BOOTH** stays in play wherever it stops, unless it leaves the **FIELD**.

## 9. Robot Construction Rules

All **ROBOTS** must adhere to the following construction and size limitations:
* A **TEAM's ROBOT** will be **unable to play** if any part of the **ROBOT** is deemed **unsafe** by event officials, or is likely to damage **HOOPS**, **PRIZE TREES**, or the **FIELD**.
* **ROBOTS** must be constructed using a standard argobot drivebase.
* No part of a **TEAM's ROBOT** can exceed **36 inches** at any time during the match. The **TOP SHELF** is set at the height limit on purpose.
* The maximum extension outside of the frame of the **ROBOT** is **18 inches**.

## 10. Q&A

Please post any questions regarding rules in the 2026 Argobot Challenge Q&A discord channel.
