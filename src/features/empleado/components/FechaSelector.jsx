export default function FechaSelector({ fecha, setFecha }) {
  return (
    <input
      type="date"
      className="border p-2 rounded"
      value={fecha.toISOString().split("T")[0]}
      onChange={(e) => setFecha(new Date(e.target.value))}
    />
  );
}
