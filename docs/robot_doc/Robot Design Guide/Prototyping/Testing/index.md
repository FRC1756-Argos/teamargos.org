---
sidebar_position: 2
---

# Testing Prototypes

## Introduction

Testing your prototype properly is critical to getting accurate data and making informed decisions. Poor testing leads to false conclusions and wasted effort building mechanisms that don't actually work.

---
## How to Test

Test early and test often. This lets you quickly see what works, what needs improvement, and what to abandon (fail fast). Keep it simple and focused.

### Test in Real-World Conditions
- Test on carpet (competition surface)
- Avoid sawdust floors (false friction, misleading results)
- Include bumpers (or simulated dimensions)
- Respect frame perimeter limits
- Account for nearby mechanisms/space usage
- Use worn game pieces (not just pristine ones)
- Do not test only in perfect conditions; vary scenarios
- Try different scenarios: off-angle feeds, misalignment, speed changes, debris/wear

----

### Prevent Confirmation Bias
Confirmation bias is when you mostly notice results that support your idea and ignore or downplay results that don’t. It can trick you into believing a weak prototype works better than it really does. To prevent confirmation bias, have someone else verify your results.

**Why this is critical:**
- You may accidentally avoid testing scenarios where it might fail
- You might interpret marginal performance as "good enough"
- Fresh eyes catch problems you've become blind to

**How to do it:**
1. Explain what the prototype is supposed to do
2. Let another team member test it independently
3. Don't intervene or provide guidance during their testing
4. Ask them to document what they observe
5. Compare notes - did you see the same things?

**Warning signs of confirmation bias:**
- "It works most of the time" (translation: it's unreliable)
- "You just have to do it this specific way" (translation: it's fragile)
- "It'll be fine once we..." (translation: it doesn't work yet)

---

## Document Actual Performance

Having a picture, video, or short write‑up of your prototype goes a long way. It not only documents how it works, but also informs others what worked and what did not—so they can build on successes and avoid repeating failures.

**Be honest:**
- Record actual success rate
- Log failures and causes
- Note conditions that changed results
- Measure real cycle time (not best attempts)

**Failed tests are valuable:**
- Show what doesn’t work
- Prevent wasted time
- Guide design improvements
- Only failures if you learn nothing

#### What to Record
**Observations:**
- What worked well
- What didn't work
- What surprised you
- What needs improvement

---

## Moving Forward

Prototyping is about quickly learning which ideas are **Good**, which are **OK**, and which you should **Move On** from.

**Good:** It works reliably on carpet, no manual help, repeatable results, clear performance data. Next step: document critical dimensions, settings, picture, and videos so it can move to CAD/Execution.

**OK:** It sometimes works, performance is inconsistent, or cycle time is borderline. Keep iterating—change one variable at a time, log improvements, and try to push it to "Good" or decide to move on if progress stalls.

**Move On:** It fails repeatedly under realistic conditions, needs human assistance, or conflicts with robot constraints. Capture why it failed (so others don't retry the same path) and shift resources to stronger concepts.

Your goal isn’t to prove an idea right. It’s to sort ideas efficiently and invest only in the ones that earn "Good" status.
