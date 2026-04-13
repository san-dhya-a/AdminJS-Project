# Mission Module

The Mission module manages interactive tasks and goals for users, allowing administrators to configure rewards, and time-sensitive challenges. It is fully synchronized with the `missoes` database table.

## Key Features
- **Dynamic Status**: Missions automatically calculate their status as **Ativo** (Active) or **Expirado** (Expired) in the dashboard based on the `expireDate`.
- **Advanced Reward Configuration**: Supports specific types (Diamantes, Pontos), values, and custom button labels.
- **Image Support**: Integrated with the `ImageUploader` for high-resolution mission banners (stored in Base64).
- **Sidebar Integration**: Displayed with a "Compass" icon for quick navigation.

## Fields Documentation
- **Title**: The name of the mission.
- **Description**: Detailed instructions for the user.
- **Image**: Visual representative shown as a thumbnail in the table view.
- **Reward Type**: Dropdown selection (e.g., Diamantes, Pontos).
- **Reward Value**: The amount granted upon completion.
- **Reward Label**: Display text for the reward (e.g., "100 Diamantes").
- **Button Text**: Customizable text for the mission's action button.
- **Dates**:
  - **Start Date / End Date**: The period when the mission is active.
  - **Publish Date**: When the mission becomes visible.
  - **Expire Date**: The final deadline; triggers the "Expirado" status.

## Implementation Details
- **Database Table**: `missoes` (Direct mapping with snake_case columns).
- **Status Logic**: Implemented using the AdminJS `after` hooks in `MissionResource`. This logic ensures that even if the database doesn't have a "status" column, the dashboard UI correctly reflects the mission's current state.
