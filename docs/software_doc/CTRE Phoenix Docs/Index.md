# Phoenix 6 Overview

## Introduction

Phoenix 6 is the latest software framework from Cross The Road Electronics (CTRE) for controlling their suite of CAN-based devices in FRC robotics. It provides the necessary APIs to interface with CTRE hardware in your robot code.

## Supported Devices

Phoenix 6 supports a wide range of CTRE devices commonly used in FRC, categorized as follows:

### Motors
- **Talon FX**: Intigrated brushless motor controller compatible with Falcon 500, Kraken X60, Kraken X44. [C++ API](https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1hardware_1_1_talon_f_x.html)
- **Talon FXS**: Standalone brushless motor controller compatiable with Minion. [C++ API](https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1hardware_1_1_talon_f_x_s.html)

### Sensors
- **CANcoder**: Absolute magnetic encoder for precise position feedback. [C++ API](https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1hardware_1_1_c_a_ncoder.html)
- **Pigeon 2.0**: Inertial measurement unit (IMU) for gyroscopic and accelerometer data. [C++ API](https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1hardware_1_1_pigeon2.html)
- **CANrange**: Time-of-flight sensor for distance measurement. [C++ API](https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1hardware_1_1_c_a_nrange.html)
- **SRX Mag Encoder**: Rotary position and velocity sensor.
- **WCP ThroughBore Encoder**: Compact rotary sensor powered by CANcoder. [C++ API](https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1hardware_1_1_c_a_ncoder.html)
- **Gadgeteer Pigeon IMU**: Legacy inertial measurement unit (IMU).

### Other
- **CANdi**: Digital I/O module for additional digital inputs and outputs. [C++ API](https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1hardware_1_1_c_a_ndi.html)
- **CANdle**: LED controller for managing robot lighting and indicators. [C++ API](https://api.ctr-electronics.com/phoenix6/release/cpp/classctre_1_1phoenix6_1_1hardware_1_1_c_a_ndle.html)
- **CANivore**: CAN FD to USB adapter for interfacing with CAN devices. [API](https://v6.docs.ctr-electronics.com/en/stable/docs/canivore/canivore-api.html)

## Why Use Phoenix 6

If you use Cross The Road Electronics (CTRE) hardware, you need to use their API. Phoenix 6 provides built-in libraries that make controlling motors, sensors, and other devices easier, and it's fully integrated with FIRST robotics frameworks like WPILib.

## C++ API for FRC Teams

FRC teams using C++ can access the Phoenix 6 API documentation at: [https://api.ctr-electronics.com/phoenix6/release/cpp/](https://api.ctr-electronics.com/phoenix6/release/cpp/)

This documentation includes detailed references for all classes, methods, and examples specific to C++ integration with WPILib.
