import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <ul>
        <li>
          <Link href="/admin/products">
            Manage Products
          </Link>
        </li>
      </ul>
    </div>
  );
}
