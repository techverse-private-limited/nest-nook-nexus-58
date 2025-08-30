import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { 
  Home, 
  Package, 
  Users, 
  Settings, 
  BarChart, 
  FileText, 
  ShoppingCart,
  LogOut,
  Building,
  FolderOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { title: 'Dashboard', url: '/admin', icon: Home },
  { title: 'Products', url: '/admin/products', icon: Package },
  { title: 'Projects', url: '/admin/projects', icon: FolderOpen },
  { title: 'Orders', url: '/admin/orders', icon: ShoppingCart },
  { title: 'Users', url: '/admin/users', icon: Users },
  { title: 'Analytics', url: '/admin/analytics', icon: BarChart },
  { title: 'Content', url: '/admin/content', icon: FileText },
  { title: 'Settings', url: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/admin') {
      return currentPath === '/admin';
    }
    return currentPath.startsWith(path);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <Sidebar className="bg-admin-red-950 border-admin-red-800">
      <SidebarHeader className="p-4 border-b border-admin-red-800">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-admin-red-600 rounded-lg">
            <Building className="h-6 w-6 text-white" />
          </div>
          {state === 'expanded' && (
            <div>
              <h2 className="text-lg font-bold text-white">Admin Panel</h2>
              <p className="text-admin-red-300 text-sm">Sumit Industries</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-admin-red-300 text-xs uppercase tracking-wide">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={`
                      hover:bg-admin-red-800 hover:text-white
                      ${isActive(item.url) 
                        ? 'bg-admin-red-600 text-white shadow-sm' 
                        : 'text-admin-red-200'
                      }
                    `}
                  >
                    <NavLink to={item.url} className="flex items-center gap-3 p-3 rounded-lg transition-all">
                      <item.icon className="h-5 w-5" />
                      {state === 'expanded' && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-admin-red-800">
        <div className="flex items-center justify-between">
          {state === 'expanded' && (
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-admin-red-700 rounded-full">
                <Users className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Admin</p>
                <p className="text-admin-red-300 text-xs">{user?.email}</p>
              </div>
            </div>
          )}
          <Button
            onClick={handleSignOut}
            variant="ghost"
            size="sm"
            className="text-admin-red-300 hover:text-white hover:bg-admin-red-800"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
