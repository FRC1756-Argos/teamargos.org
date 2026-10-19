---
sidebar_position: 3
---

# FRC Java Cheat Sheet

A one-page reference for the Java basics you will use in FRC robot code: variables, classes, and methods. For longer explanations and XRP examples, see the [Java Quick Reference](../Java_software_quick_reference/index.md).

## 1. Common variable types

A variable is a named box that holds one value. Its type decides what kind of value fits in the box.

| Type | Holds | Example value | FRC use |
| --- | --- | --- | --- |
| `int` | Whole numbers | `5`, `-12` | CAN IDs, port numbers, counters |
| `double` | Decimal numbers | `0.75`, `-1.0` | Motor speed (-1.0 to 1.0), distances, angles |
| `boolean` | `true` or `false` | `true` | Is a sensor triggered? Is the button pressed? |
| `String` | Text, in double quotes | `"Intake"` | Names, SmartDashboard keys |
| `char` | One character, in single quotes | `'A'` | Rarely used in robot code |
| `long` | Very large whole numbers | `3000000000L` | Timestamps |

- Primitive types (`int`, `double`, `boolean`, `char`, `long`) start lowercase.
- `String` starts uppercase because it is a class, not a primitive.
- Hardware types like `TalonFX`, `DigitalInput` and `XboxController` are also classes used as variable types.

## 2. Defining a variable

Every variable definition follows the same pattern: type, name, equals sign, value, semicolon.

```java
//  type     name           value
    double   intakeSpeed  = 0.6;
```

| Part | Example | Rule |
| --- | --- | --- |
| Type | `double` | What kind of value it holds |
| Name | `intakeSpeed` | camelCase: first word lowercase, later words capitalized |
| `=` | `=` | Assigns (stores) the value; it does not mean "is equal to" |
| Value | `0.6` | Must match the type |
| `;` | `;` | Ends every statement in Java |

```java
int motorId = 3;              // declare and assign in one line
boolean hasNote;              // declare only (no value yet)
hasNote = true;               // assign later — no type the second time
intakeSpeed = 0.8;            // change an existing value

final int kIntakeMotorId = 5; // final = constant, can never change
```

- Use `final` for values that never change, such as CAN IDs and gear ratios. FRC teams usually name these with a `k` prefix and keep them in `Constants.java`.
- `==` compares two values (`if (count == 3)`); a single `=` assigns.

## 3. What is a class?

A class is a blueprint; an object is one real thing built from that blueprint. The `Intake` class describes what every intake knows and does; `new Intake()` builds an actual intake.

- **Fields** — variables the object remembers (its motor, its sensor).
- **Constructor** — runs once when the object is created with `new`; sets up the fields. Same name as the class, no return type.
- **Methods** — actions the object can do (run, stop, check a sensor).

```java
public class Intake extends SubsystemBase {    // class name: PascalCase, matches file name Intake.java

    // FIELDS
    private final TalonFX motor;
    private final DigitalInput noteSensor;

    // CONSTRUCTOR
    public Intake() {
        motor = new TalonFX(5);              // build the motor object on CAN ID 5
        noteSensor = new DigitalInput(0);    // sensor on DIO port 0
    }

    // METHODS
    public void run(double speed) {
        motor.set(speed);
    }

    public boolean hasNote() {
        return !noteSensor.get();
    }
}
```

- `extends SubsystemBase` means Intake inherits everything a WPILib subsystem already knows how to do.
- `private` = only code inside this class can use it. `public` = any class can use it.
- Curly braces `{ }` mark where the class, constructor or method starts and ends.

## 4. Methods

A method is a named block of code that does one job. Define it once, then call it as many times as you need.

```java
// access   return   name        parameters
   public   double   getSpeed  ( double percent, boolean inverted ) {
       double speed = percent / 100.0;     // body
       if (inverted) {
           speed = -speed;
       }
       return speed;                       // return value
   }
```

| Part | Example | What it means |
| --- | --- | --- |
| Access modifier | `public` / `private` | Who can call it: any class, or only this class |
| Return type | `double` | Type of value it sends back; `void` = sends nothing back |
| Name | `getSpeed` | camelCase verb that says what it does |
| Parameters | `(double percent, boolean inverted)` | Inputs: type + name each, separated by commas; `()` if none |
| Body | `{ ... }` | The code that runs when the method is called |
| `return` | `return speed;` | Sends a value back and ends the method; required unless `void` |

```java
public void stop() {               // void: does something, returns nothing
    motor.set(0);
}

public boolean isAtTarget() {      // no parameters, returns a boolean
    return encoder.getPosition() > 10.0;
}

public static double clamp(double value) {   // static: belongs to the class, not an object
    return Math.max(-1.0, Math.min(1.0, value));
}
```

## 5. Calling a method

To call a method, write the object, a dot, the method name, and parentheses holding any arguments: `object.method(arguments);`

```java
Intake intake = new Intake();           // 1. create the object

intake.run(0.6);                        // 2. call with one argument
intake.stop();                          // 3. no arguments: empty ()

boolean gotIt = intake.hasNote();       // 4. store the returned value
if (intake.hasNote()) {                 // 5. or use it directly
    intake.stop();
}

double s = Math.abs(-0.5);              // 6. static: ClassName.method()
run(0.5);                               // 7. inside the same class: no object needed
```

- Arguments must match the parameters in number, order and type: `run(double speed)` needs one `double`, so `intake.run("fast")` will not compile.
- A `void` method returns nothing, so `double x = intake.stop();` is an error.
- Chained calls run left to right: `controller.a().onTrue(...)` calls `a()`, then calls `onTrue` on its result.
- Forgetting the `()` or the `;` are the two most common beginner errors.
