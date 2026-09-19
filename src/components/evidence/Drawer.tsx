import { X } from "lucide-react";
import type { ReactNode } from "react";
export function Drawer({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/45" onClick={onClose}>
      <aside
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-soc-line bg-[#091525] p-5 shadow-2xl scrollbar"
      >
        <div className="flex items-center justify-between border-b border-soc-line pb-4">
          <h2 className="text-sm font-semibold text-white">{title}</h2>
          <button onClick={onClose}>
            <X size={17} className="text-soc-muted" />
          </button>
        </div>
        <div className="pt-5">{children}</div>
      </aside>
    </div>
  );
}
