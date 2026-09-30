export interface ProjectItem {
  id: string;
  num: string;
  title: {
    en: string;
    de: string;
  };
  category: {
    en: string;
    de: string;
  };
  role: {
    en: string;
    de: string;
  };
  period: string;
  tagline: {
    en: string;
    de: string;
  };
  description: {
    en: string;
    de: string;
  };
  metrics: {
    label: { en: string; de: string };
    value: string;
  }[];
  tags: string[];
  techPillColor: string;
  accentGlow: string;
  terminalSnippet: string;
  githubUrl: string;
  liveUrl?: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "rayocr-intel",
    num: "01",
    title: {
      en: "RayOCR Intell Engine",
      de: "RayOCR Intell Engine",
    },
    category: {
      en: "INTELLIGENT OCR & DOCUMENT EXTRACTION",
      de: "DOKUMENTENINTELLIGENZ & NEURALES OCR",
    },
    role: {
      en: "Lead Systems Architect & Core Developer",
      de: "Leitender Systemarchitekt & Entwickler",
    },
    period: "2024 — PRESENT",
    tagline: {
      en: "Ultra-low latency document parsing engine combining neural inference, SIMD vectorization, and WebGL interactive document inspection.",
      de: "Extrem latenzarme Dokumenten-Engine mit neuronaler Inferenz, SIMD-Vektorisierung und interaktiver WebGL-Prüfung.",
    },
    description: {
      en: "Designed for sub-millisecond document tokenization and tabular entity extraction. Features an asynchronous multi-threaded pipeline in Rust, zero-copy buffer sharing with ONNX Runtime, and a WebGL hardware-accelerated preview canvas for pixel-perfect bounding box spatial alignment.",
      de: "Entwickelt für Sub-Millisekunden-Tokenisierung und strukturierte Tabellenextraktion. Beinhaltet eine asynchrone Multi-Thread-Pipeline in Rust, Zero-Copy-Puffer mit ONNX Runtime und eine WebGL-beschleunigte Visualisierungs-Canvas.",
    },
    metrics: [
      { label: { en: "Inference Latency", de: "Inferenz-Latenz" }, value: "3.2ms / page" },
      { label: { en: "Throughput", de: "Durchsatz" }, value: "1,450 doc/min" },
      { label: { en: "Memory Overhead", de: "Speicher-Overhead" }, value: "Zero-Copy SIMD" },
    ],
    tags: ["Rust", "PyTorch / ONNX", "SIMD AVX-512", "WebGL", "TypeScript", "Next.js"],
    techPillColor: "border-cyan-500/30 text-cyan-800 bg-cyan-50/50",
    accentGlow: "rgba(6, 182, 212, 0.18)",
    terminalSnippet: "$ rayocr-cli --input ./financial_audit.pdf --threads 8 --accel cuda\n[OK] Engine: AVX-512 SIMD vectorization active\n[OK] ONNX TensorRT context allocated in 1.4ms\n[STATUS] Processed 42 pages in 134ms | 0 packet drop",
    githubUrl: "https://github.com/rayanelhabib/RayOCR_Intell",
    liveUrl: "https://github.com/rayanelhabib/RayOCR_Intell",
  },
  {
    id: "kernel-ebpf-flow",
    num: "02",
    title: {
      en: "KernelFlow eBPF Telemetry",
      de: "KernelFlow eBPF Telemetrie",
    },
    category: {
      en: "LINUX KERNEL OBSERVABILITY & TELEMETRY",
      de: "LINUX-KERNEL-OBSERVABILITÄT & TELEMETRIE",
    },
    role: {
      en: "Low-Level Kernel Engineer",
      de: "Low-Level-Kernel-Ingenieur",
    },
    period: "2024",
    tagline: {
      en: "Sub-microsecond kernel socket probe & distributed packet inspector running directly on eBPF/XDP network hook layers.",
      de: "Sub-Mikrosekunden-Kernel-Socket-Prüfung und verteilte Paketanalyse direkt auf eBPF/XDP-Netzwerk-Ebenen.",
    },
    description: {
      en: "Directly attaches JIT-compiled eBPF bytecode programs to Linux traffic control (tc) and XDP driver rings. Streams zero-copy telemetry metrics over lock-free ring buffers to a concurrent Go daemon, exporting sub-millisecond anomaly detection to Prometheus & Grafana without context-switching penalties.",
      de: "Verbindet JIT-kompilierte eBPF-Bytecode-Programme direkt mit Linux Traffic Control (tc) und XDP-Treibern. Streamt Zero-Copy-Telemetriedaten über sperrenfreie Ringpuffer an einen hochparallelen Go-Daemon ohne Kontextwechsel-Verluste.",
    },
    metrics: [
      { label: { en: "Probe Overhead", de: "Sonden-Overhead" }, value: "< 0.18µs / pkt" },
      { label: { en: "Line Rate", de: "Leitungsrate" }, value: "10 Gbps Wire-Speed" },
      { label: { en: "Kernel Drops", de: "Kernel-Paketverlust" }, value: "0.000%" },
    ],
    tags: ["C", "eBPF / XDP", "Linux Kernel", "Go", "Ring-Buffer", "Prometheus"],
    techPillColor: "border-sky-500/30 text-sky-800 bg-sky-50/50",
    accentGlow: "rgba(56, 189, 248, 0.18)",
    terminalSnippet: "$ sudo kernel-flow attach --iface eth0 --mode xdp-drv\n[eBPF] JIT Program verified: 48 insns, safe stack depth 64B\n[RINGBUF] Mapped 16MB lockless ring0 buffer to userland\n[TELEMETRY] 1,420,000 pkts/s processed | Jitter: 0.04ms",
    githubUrl: "https://github.com/rayanelhabib",
  },
  {
    id: "nexus-kv-engine",
    num: "03",
    title: {
      en: "Nexus Distributed KV Store",
      de: "Nexus Verteilter KV-Speicher",
    },
    category: {
      en: "DISTRIBUTED CONSENSUS & LSM STORAGE",
      de: "VERTEILTER KONSENS & LSM-SPEICHER",
    },
    role: {
      en: "Distributed Systems Architect",
      de: "Architekt Verteilter Systeme",
    },
    period: "2023 — 2024",
    tagline: {
      en: "High-throughput Log-Structured Merge (LSM) storage engine with Raft quorum consensus and lock-free memory indexing.",
      de: "LSM-Speicher-Engine mit extremem Durchsatz, Raft-Konsens und sperrenfreier Speicher-Indexierung.",
    },
    description: {
      en: "Built from scratch in Rust on top of Tokio async runtime. Implements a multi-level tiered compaction LSM-tree with memory-mapped immutable SSTables, Bloom filter early exit checks, and zero-allocation gRPC wire communication across distributed cluster nodes.",
      de: "Von Grund auf in Rust auf der asynchronen Tokio-Laufzeitumgebung implementiert. Bietet einen mehrstufigen LSM-Tree mit speicherabgebildeten unveränderlichen SSTables, Bloom-Filtern und allokationsfreier gRPC-Netzwerkkommunikation.",
    },
    metrics: [
      { label: { en: "Write Throughput", de: "Schreibdurchsatz" }, value: "240,000 QPS" },
      { label: { en: "Raft Quorum", de: "Raft-Konsenszeit" }, value: "< 1.2ms Commit" },
      { label: { en: "Consistency", de: "Konsistenzgarantie" }, value: "Linearizable" },
    ],
    tags: ["Rust", "Tokio Async", "Raft Consensus", "LSM-Tree", "gRPC", "Protobuf"],
    techPillColor: "border-indigo-500/30 text-indigo-800 bg-indigo-50/50",
    accentGlow: "rgba(99, 102, 241, 0.18)",
    terminalSnippet: "$ nexus-cluster --nodes 5 --cluster-id alpha-mesh\n[RAFT] Node 1 elected LEADER for Term 84 (quorum 3/5)\n[MEMTABLE] Flushed 64MB MemTable to SSTable L0 in 2.1ms\n[BENCH] 240,812 writes/sec @ p99 1.84ms latency",
    githubUrl: "https://github.com/rayanelhabib",
  },
  {
    id: "netmesh-p2p-overlay",
    num: "04",
    title: {
      en: "NetMesh Zero-Trust Overlay",
      de: "NetMesh Zero-Trust Netzwerk",
    },
    category: {
      en: "PEER-TO-PEER MESH & ENCRYPTED PROTOCOLS",
      de: "PEER-TO-PEER-MESH & VERSCHLÜSSELUNG",
    },
    role: {
      en: "Network Protocol Engineer",
      de: "Netzwerkprotokoll-Ingenieur",
    },
    period: "2023",
    tagline: {
      en: "Decentralized mesh routing daemon with NAT hole-punching, WireGuard cryptographic noise handshakes & TUN/TAP virtual network adapters.",
      de: "Dezentrales Mesh-Routing mit NAT-Hole-Punching, WireGuard-Kryptographie und virtuellen TUN/TAP-Netzwerkadaptern.",
    },
    description: {
      en: "Establishes direct, end-to-end encrypted tunnels between nodes behind symmetric and full-cone NAT firewalls using STUN/ICE traversal. Features dynamic Dijkstra route calculation for lowest-latency packet transit over an ad-hoc cryptographic overlay network.",
      de: "Stellt direkte, Ende-zu-Ende verschlüsselte Tunnel zwischen Knoten hinter NAT-Firewalls mittels STUN/ICE-Traversal her. Berechnet dynamisch optimale Dijkstra-Routen für minimale Paketlaufzeiten über ein ad-hoc Overlay-Netzwerk.",
    },
    metrics: [
      { label: { en: "Transit Overhead", de: "Transit-Overhead" }, value: "< 8.4ms" },
      { label: { en: "Encryption", de: "Verschlüsselung" }, value: "ChaCha20-Poly1305" },
      { label: { en: "NAT Traversal", de: "NAT-Erfolgsrate" }, value: "98.7% Direct P2P" },
    ],
    tags: ["Go", "WireGuard Protocol", "UDP Hole-Punching", "TUN / TAP", "Cryptography"],
    techPillColor: "border-teal-500/30 text-teal-800 bg-teal-50/50",
    accentGlow: "rgba(20, 184, 166, 0.18)",
    terminalSnippet: "$ netmesh-daemon --join-peer 198.51.100.4:51820\n[STUN] Hole-punching candidate: 203.0.113.12:44912 (Direct UDP)\n[NOISE] Handshake completed: Curve25519 + ChaCha20-Poly1305\n[INTERFACE] tun0 configured (10.99.0.4/24) | Routing ready",
    githubUrl: "https://github.com/rayanelhabib",
  },
];
