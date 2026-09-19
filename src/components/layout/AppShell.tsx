import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { UploadModal } from "../evidence/UploadModal";
export function AppShell() {
  const [upload, setUpload] = useState(false);
  const [presentation, setPresentation] = useState(false);
  return (
    <div className="min-h-screen bg-soc-bg text-slate-200">
      <div className="flex">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <Header
            onUpload={() => setUpload(true)}
            onPresentation={() => setPresentation(true)}
          />
          <main className="mx-auto max-w-[1700px] p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
      <UploadModal open={upload} onClose={() => setUpload(false)} />
      {presentation && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-6">
          <div className="w-full max-w-lg rounded-xl border border-cyan-400/20 bg-soc-panel p-6">
            <div className="text-sm font-semibold text-white">
              Presentation mode
            </div>
            <p className="mt-2 text-xs leading-5 text-soc-muted">
              Use browser full-screen and follow PRESENTATION_FLOW.md. This demo
              keeps all telemetry synthetic and makes the forecast path easy to
              inspect.
            </p>
            <button
              onClick={() => setPresentation(false)}
              className="mt-5 rounded-md bg-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
