import { useRef, useState } from "react";
import { Upload, FileUp, X, CheckCircle } from "lucide-react";
import { ingestTelemetry } from "../../services/forecastService";
export function UploadModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  if (!open) return null;
  const pick = async (file?: File) => {
    if (!file) return;
    if (!/\.(pcap|pcapng|csv)$/i.test(file.name)) {
      setMsg("Unsupported file. Use PCAP, PCAPNG, or CSV.");
      return;
    }
    setBusy(true);
    setMsg("");
    const r = await ingestTelemetry(file);
    setBusy(false);
    setMsg(`${r.message} ${r.rows.toLocaleString()} rows/packets staged.`);
  };
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
      <div className="w-full max-w-xl rounded-xl border border-soc-line bg-soc-panel shadow-2xl">
        <div className="flex items-center justify-between border-b border-soc-line px-5 py-4">
          <div>
            <div className="text-sm font-semibold">
              Ingest network telemetry
            </div>
            <div className="text-[11px] text-soc-muted">
              Demo ingestion • preprocessing is simulated
            </div>
          </div>
          <button onClick={onClose}>
            <X size={17} className="text-soc-muted" />
          </button>
        </div>
        <div className="p-5">
          <button
            disabled={busy}
            onClick={() => input.current?.click()}
            className="flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-cyan-400/30 bg-cyan-400/[.03] px-6 py-12 hover:bg-cyan-400/[.06]"
          >
            <input
              ref={input}
              type="file"
              accept=".pcap,.pcapng,.csv"
              hidden
              onChange={(e) => pick(e.target.files?.[0])}
            />
            {busy ? (
              <Upload className="animate-bounce text-cyan-300" />
            ) : (
              <FileUp className="text-cyan-300" />
            )}
            <span className="mt-3 text-xs text-slate-200">
              Drop PCAP / CSV or click to browse
            </span>
            <span className="mt-1 text-[10px] text-soc-muted">
              PCAP, PCAPNG, CSV
            </span>
          </button>
          {msg && (
            <div className="mt-4 flex gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/[.05] p-3 text-xs text-emerald-200">
              <CheckCircle size={15} />
              {msg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
