
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductManagement from '@/components/ProductManagement';
import { 
  SidebarProvider, 
  SidebarInset, 
  SidebarTrigger 
} from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/AdminSidebar';
import { Spinner } from '@/components/ui/spinner';

const AdminProducts = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login');
      } else if (!isAdmin) {
        navigate('/');
      }
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Spinner variant="bars" size={32} className="mx-auto mb-4" />
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AdminSidebar />
        
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="text-gray-600 hover:text-admin-red-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
                  <p className="text-gray-600">Manage your product catalog</p>
                </div>
              </div>
            </div>
          </header>

          <main className="p-6">
            <ProductManagement />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminProducts;
