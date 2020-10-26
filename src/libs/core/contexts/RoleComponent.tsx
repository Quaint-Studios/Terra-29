import { IRoute } from '@libs/core/routes/Routes';

export default function RoleComponent({ route, children }: IRoleComponent) {
  if (
    !route.roles === null ||
    (Array.isArray(route.roles) && route.roles.length > 0)
  ) {
    // Validate User Role Here
    return children;
  }
  return children;
}

interface IRoleComponent {
  route: IRoute;
  children: any;
}
