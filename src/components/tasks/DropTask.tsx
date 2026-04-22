import { useDroppable } from "@dnd-kit/core";

type DropTaskProps = {
  status: string;
};

export default function DropTask({ status }: DropTaskProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });

  const style = {
    opacity: isOver ? 0.4 : undefined,
  };

  return (
    <div
      className="mt-5 grid place-content-center border border-dashed border-slate-500 p-2 text-xs font-semibold uppercase"
      ref={setNodeRef}
      style={style}
    >
      Soltar tarea aquí
    </div>
  );
}
