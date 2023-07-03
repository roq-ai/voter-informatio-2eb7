const mapping: Record<string, string> = {
  organizations: 'organization',
  roles: 'role',
  users: 'user',
  'user-roles': 'user_role',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
