import { UserInterface } from 'interfaces/user';
import { RoleInterface } from 'interfaces/role';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface UserRoleInterface {
  id?: string;
  user_id: string;
  role_id: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  role?: RoleInterface;
  organization?: OrganizationInterface;
  _count?: {};
}

export interface UserRoleGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  role_id?: string;
  organization_id?: string;
}
