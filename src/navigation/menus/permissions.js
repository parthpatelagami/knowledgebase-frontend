// ** Icons Import
import { Circle, ToggleRight, Star } from 'react-feather'

export default [
  {
    id: 'permissions',
    title: 'Permissions',
    icon: <ToggleRight size={20} />,
    disabled: true,
    children: [
      {
        id: 'role',
        title: 'Role',
        icon: <Star size={20} />,
        navLink: '/permissions/role',
        action: 'view',
        resource: 'Permissions'
      }
    ]
  }
]
