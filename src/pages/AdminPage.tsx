import AdminHeader from "../components/AdminHeader";

export default function AdminDashboard() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminHeader />
      <main className="py-10 mt-16 container mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>
          <p className="text-lg mb-4">Welcome to the Admin Dashboard. Here, you can manage various administrative tasks.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-200 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">Orders Management</h2>
              <p className="text-lg">View and manage orders placed by customers.</p>
            </div>
            <div className="bg-green-200 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">Products Management</h2>
              <p className="text-lg">Add, edit, and delete products available for sale.</p>
            </div>
            <div className="bg-yellow-200 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">Users Management</h2>
              <p className="text-lg">Manage user accounts and permissions.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
