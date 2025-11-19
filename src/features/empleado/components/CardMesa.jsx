export default function CardMesa({ mesa }) {
  const color =
    mesa.estadoMesa.nombre === "DISPONIBLE"
      ? "bg-green-100"
      : mesa.estadoMesa.nombre === "RESERVADA"
      ? "bg-yellow-100"
      : "bg-red-100";

  return (
    <div className={`p-4 rounded shadow ${color}`}>
      <p className="font-semibold">Mesa {mesa.numeroMesa}</p>
      <p>{mesa.estadoMesa.nombre}</p>
    </div>
  );
}
