import { useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  MarkerType,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type {
  NetworkNode as NNode,
  NetworkEdge as NEdge,
} from "../../types/security";
function SecurityNode({ data }: { data: NNode }) {
  const tone =
    data.risk >= 80
      ? "border-red-400/60 bg-red-400/10"
      : data.risk >= 60
        ? "border-orange-400/50 bg-orange-400/10"
        : "border-cyan-400/30 bg-cyan-400/[.06]";
  return (
    <div className={`min-w-40 rounded-lg border p-3 shadow-lg ${tone}`}>
      <Handle type="target" position={Position.Left} className="!bg-cyan-400" />
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-cyan-200">{data.ip}</span>
        <span className="text-[10px] font-semibold text-white">
          {data.risk}
        </span>
      </div>
      <div className="mt-1 text-xs font-medium text-slate-100">
        {data.hostname}
      </div>
      <div className="mt-2 flex justify-between text-[9px] text-soc-muted">
        <span>{data.role}</span>
        <span>{data.state}</span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-cyan-400"
      />
    </div>
  );
}
export function NetworkGraph({
  nodes,
  edges,
  onNode,
  onEdge,
}: {
  nodes: NNode[];
  edges: NEdge[];
  onNode: (n: NNode) => void;
  onEdge: (e: NEdge) => void;
}) {
  const nodeTypes = useMemo(() => ({ security: SecurityNode }), []);
  const flowNodes: Node[] = nodes.map((n) => ({
    id: n.id,
    type: "security",
    position: { x: n.x, y: n.y },
    data: n,
  }));
  const flowEdges: Edge[] = edges.map((e) => ({
    id: e.id,
    source: e.source,
    target: e.target,
    animated: e.type === "predicted",
    style: {
      stroke:
        e.type === "normal"
          ? "#38bdf8"
          : e.type === "suspicious"
            ? "#f87171"
            : "#fb923c",
      strokeWidth: 2,
      strokeDasharray: e.type === "predicted" ? "7 5" : undefined,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color:
        e.type === "normal"
          ? "#38bdf8"
          : e.type === "suspicious"
            ? "#f87171"
            : "#fb923c",
    },
  }));
  return (
    <div className="h-[540px] overflow-hidden rounded-lg border border-soc-line bg-[#06101d]">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        fitView
        onNodeClick={(_, n) => onNode(n.data as NNode)}
        onEdgeClick={(_, e) => {
          const found = edges.find((x) => x.id === e.id);
          if (found) onEdge(found);
        }}
      >
        <Background color="#17304a" gap={28} size={1} />
        <Controls />
        <MiniMap
          nodeColor={(n: any) => {
            const r = (n.data as NNode)?.risk ?? 0;
            return r > 80 ? "#f87171" : r > 60 ? "#fb923c" : "#22d3ee";
          }}
        />
      </ReactFlow>
    </div>
  );
}
