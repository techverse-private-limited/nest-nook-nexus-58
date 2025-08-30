
import { SidebarProvider } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/AdminSidebar';
import { SidebarInset } from '@/components/ui/sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import ProjectManagement from '@/components/ProjectManagement';

const AdminProjects = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-admin-red-50">
        <AdminSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-lg font-semibold">Projects</h1>
          </header>
          <div className="flex-1 p-6">
            <ProjectManagement />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminProjects;
