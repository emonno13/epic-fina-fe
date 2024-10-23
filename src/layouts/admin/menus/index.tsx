export const AdminMenuSchema = {
  domains: {
    name: 'domains',
    icon: 'icon',
    href: '/admin/domains',
  },
  organizations: {
    name: 'Organization',
    icon: 'icon',
    href: '/admin/organizations',
    schema: {
      user: {
        name: 'User',
        icon: 'user',
        href: '/admin/organizations/users',
      },
      role: {
        name: 'Role',
        icon: 'role',
        href: '/admin/organizations/roles',
      },
      permission: {
        name: 'permissions',
        icon: 'permissions',
        href: '/admin/organizations/permissions',
      },
      position: {
        name: 'positions',
        icon: 'positions',
        href: '/admin/organizations/positions',
      },
      skill: {
        name: 'skills',
        icon: 'skills',
        href: '/admin/organizations/skills',
      },
    },
  },
};