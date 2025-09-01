---
sidebar_position: 2
---
# Phoenix 6 Quick Reference Guide

This guide provides quick code snippets and examples for using Phoenix 6 in FRC robotics with C++. It covers basic setup, control, and configuration for CTRE devices like TalonFX motors.

## Controlling a TalonFX Motor

### Setup
To control a TalonFX motor controller in C++:

1. Include the necessary headers:
```cpp
#include <ctre/phoenix6/TalonFX.hpp>
```

2. Create a TalonFX object with the CAN ID:
```cpp
ctre::phoenix6::hardware::TalonFX motor{0}; // CAN ID 0
```

### Control
#### Percentage Command
Set the motor to run at a percentage of full speed (Duty Cycle Out):
```cpp
motor.SetControl(ctre::phoenix6::controls::DutyCycleOut{0.5}); // 50% speed
```

Stop the motor:
```cpp
motor.SetControl(ctre::phoenix6::controls::DutyCycleOut{0.0});
```

Reference: [DutyCycleOut C++ API](https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1controls_1_1_duty_cycle_out.html)

### Configure
Include the necessary config headers:
```cpp
#include <ctre/phoenix6/configs/Configs.hpp>
```

#### Invert Motor 
Invert the motor direction:
```cpp
motor.GetConfigurator().Apply(ctre::phoenix6::configs::MotorOutputConfigs{}.WithInverted(true));
```

#### Current Limit
Set and enable current limits to protect the motor and battery:
```cpp
motor.GetConfigurator().Apply(ctre::phoenix6::configs::CurrentLimitsConfigs{}
    .WithStatorCurrentLimitEnable(true)  // Enable stator current limit
    .WithStatorCurrentLimit(30_A)        // Limit stator current to 30A
    .WithSupplyCurrentLimitEnable(true)  // Enable supply current limit
    .WithSupplyCurrentLimit(20_A));      // Limit supply current to 20A
```

### API Reference
- [TalonFX C++ API](https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1hardware_1_1_talon_f_x.html)

## References
- [Phoenix 6 Documentation](https://v6.docs.ctr-electronics.com/en/stable/)
- [Phoenix 6 C++ API](https://api.ctr-electronics.com/phoenix6/release/cpp/)