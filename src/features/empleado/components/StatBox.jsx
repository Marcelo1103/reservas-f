export default function StatBox({ title, value }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
