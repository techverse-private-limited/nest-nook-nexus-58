
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Package, 
  BarChart, 
  TrendingUp, 
  DollarSign,
  ShoppingCart,
  Eye,
  Settings,
  Plus,
  ArrowUpRight
} from 'lucide-react';
import { 
  SidebarProvider, 
  SidebarInset, 
  SidebarTrigger 
} from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/AdminSidebar';

const AdminDashboard = () => {
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-admin-red-500 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const stats = [
    {
      title: 'Total Revenue',
      value: '$24,780',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50',
      iconBg: 'bg-emerald-500',
    },
    {
      title: 'Total Orders',
      value: '156',
      change: '+8.2%',
      changeType: 'positive',
      icon: ShoppingCart,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      iconBg: 'bg-blue-500',
    },
    {
      title: 'Total Products',
      value: '89',
      change: '+2.4%',
      changeType: 'positive',
      icon: Package,
      gradient: 'from-admin-red-500 to-red-600',
      bgGradient: 'from-admin-red-50 to-red-50',
      iconBg: 'bg-admin-red-500',
    },
    {
      title: 'Active Users',
      value: '1,247',
      change: '+18.1%',
      changeType: 'positive',
      icon: Users,
      gradient: 'from-purple-500 to-violet-600',
      bgGradient: 'from-purple-50 to-violet-50',
      iconBg: 'bg-purple-500',
    },
  ];

  const quickActions = [
    {
      title: 'Add New Product',
      description: 'Create a new product listing',
      icon: Package,
      gradient: 'from-admin-red-500 to-red-600',
      iconBg: 'bg-admin-red-500',
    },
    {
      title: 'View Orders',
      description: 'Manage customer orders',
      icon: ShoppingCart,
      gradient: 'from-blue-500 to-indigo-600',
      iconBg: 'bg-blue-500',
    },
    {
      title: 'Analytics',
      description: 'View detailed analytics',
      icon: BarChart,
      gradient: 'from-emerald-500 to-teal-600',
      iconBg: 'bg-emerald-500',
    },
    {
      title: 'Settings',
      description: 'Configure system settings',
      icon: Settings,
      gradient: 'from-purple-500 to-violet-600',
      iconBg: 'bg-purple-500',
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <AdminSidebar />
        
        <SidebarInset className="flex-1">
          {/* Modern Header */}
          <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
            <div className="flex items-center justify-between px-8 py-6">
              <div className="flex items-center space-x-6">
                <SidebarTrigger className="text-slate-600 hover:text-admin-red-600 transition-colors p-2 hover:bg-slate-100 rounded-lg" />
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                  <p className="text-slate-500 mt-1 font-medium">Welcome back, Admin! Here's what's happening today.</p>
                </div>
              </div>
              
              <Button className="bg-gradient-to-r from-admin-red-500 to-red-600 hover:from-admin-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 border-0">
                <Plus className="h-4 w-4 mr-2" />
                Quick Add
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-8 space-y-8">
            {/* Modern Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <Card key={stat.title} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-50`}></div>
                  <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-3 rounded-xl ${stat.iconBg} shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="text-3xl font-bold text-slate-900 mb-2">
                      {stat.value}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-semibold">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {stat.change}
                      </div>
                      <span className="text-slate-500 text-xs">from last month</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Modern Quick Actions */}
              <div className="xl:col-span-2">
                <Card className="border-0 shadow-xl bg-white/50 backdrop-blur-sm">
                  <CardHeader className="pb-6">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl font-bold text-slate-900">Quick Actions</CardTitle>
                      <div className="h-1 w-12 bg-gradient-to-r from-admin-red-500 to-red-600 rounded-full"></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {quickActions.map((action) => (
                        <Button
                          key={action.title}
                          variant="outline"
                          className="group relative h-auto p-6 flex items-center space-x-4 border-0 bg-white hover:bg-gradient-to-r hover:from-white hover:to-slate-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                          <div className={`p-3 ${action.iconBg} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-200 relative z-10`}>
                            <action.icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="text-left relative z-10">
                            <div className="font-bold text-slate-900 group-hover:text-slate-800">{action.title}</div>
                            <div className="text-sm text-slate-500 group-hover:text-slate-600">{action.description}</div>
                          </div>
                          <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 ml-auto relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Modern Recent Activity */}
              <Card className="border-0 shadow-xl bg-white/50 backdrop-blur-sm">
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold text-slate-900">Recent Activity</CardTitle>
                    <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: 'New order received', time: '2 minutes ago', icon: ShoppingCart, color: 'bg-emerald-500' },
                      { action: 'Product updated', time: '1 hour ago', icon: Package, color: 'bg-admin-red-500' },
                      { action: 'User registered', time: '3 hours ago', icon: Users, color: 'bg-purple-500' },
                      { action: 'Analytics report', time: '1 day ago', icon: BarChart, color: 'bg-blue-500' },
                    ].map((item, index) => (
                      <div key={index} className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-slate-50 transition-all duration-200 hover:shadow-md">
                        <div className={`p-3 ${item.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                          <item.icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 group-hover:text-slate-800">{item.action}</p>
                          <p className="text-sm text-slate-500 group-hover:text-slate-600">{item.time}</p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500 transition-colors duration-200" />
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="ghost" 
                    className="w-full mt-6 text-admin-red-600 hover:text-admin-red-700 hover:bg-admin-red-50 font-semibold transition-all duration-200"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View All Activity
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
