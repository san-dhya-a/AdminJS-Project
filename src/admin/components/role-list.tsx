import React from 'react'
import { Badge, Box } from '@adminjs/design-system'
import { BasePropertyProps } from 'adminjs'

const RoleList: React.FC<BasePropertyProps> = (props) => {
  const { record } = props
  
  // Use the pre-processed role names from our 'after' hook
  const roleNames = record.params.roleNames || []
  
  if (!roleNames || roleNames.length === 0) {
    // Check if we have populated roles as fallback
    const populated = record.populated?.roles
    const populatedRoles = Array.isArray(populated) ? populated : (populated ? [populated] : [])
    
    if (populatedRoles.length > 0) {
      return (
        <Box flex flexDirection="row" flexWrap="wrap">
          {populatedRoles.map((role: any, index: number) => (
            <Badge key={role.id || index} mr="xs" mb="xs" variant="primary">
              {role.params?.name || role.name || 'Role'}
            </Badge>
          ))}
        </Box>
      )
    }
    return <Box color="grey40" fontSize="sm">No roles assigned</Box>
  }

  // Handle case where it might be a JSON string
  const roleArray = Array.isArray(roleNames) ? roleNames : []

  return (
    <Box flex flexDirection="row" flexWrap="wrap">
      {roleArray.map((name: string, index: number) => (
        <Badge key={index} mr="xs" mb="xs" variant="primary">
          {name}
        </Badge>
      ))}
    </Box>
  )
}

export default RoleList
