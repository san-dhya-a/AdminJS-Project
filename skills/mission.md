# Mission Module

The Mission module manages interactive tasks and goals for users, allowing administrators to configure rewards, points, and time-sensitive challenges.

## Key Features
- **Dynamic Status**: Missions automatically calculate their status as **Ativo** (Active) or **Expirado** (Expired) based on the current date and the `expireDate`.
- **Points & Rewards**: Configurable fields to define the value and incentive for each mission.
- **Image Support**: Integrated with the high-performance Base64 image uploader for mission icons/banners.
- **Sidebar Integration**: Displayed with a "Compass" icon for quick navigation.

## Fields Documentation
- **Title**: The name of the mission.
- **Description**: Detailed instructions for the user.
- **Points**: Numeric value assigned to the mission.
- **Rewards**: String description of any additional rewards.
- **Image**: Visual representative of the mission.
- **Expire Date**: The date when the mission will be automatically marked as "Expirado".
- **Status (View-only)**: Calculated dynamically in the AdminJS list.

## Implementation Details
The status logic is implemented using the `after` hook in the `MissionResource` list action, which compares `expireDate` with the system's current date.
