"use client";

import { Github, BookOpen, Zap, Shield, Globe, Package, ExternalLink } from "lucide-react";
import { useRef, useState, useCallback, type MouseEvent } from "react";

function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const onMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`bento-card relative overflow-hidden rounded-xl p-6 ${className}`}
      style={{
        background: active
          ? `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(247,76,0,0.06), transparent 40%), linear-gradient(135deg, rgba(17,18,21,0.8), rgba(21,22,23,0.6))`
          : undefined,
      }}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="noise bg-[#0c0d0d] text-white">
      {/* ── Header fixo ── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1a1a1a]/60 bg-[#0c0d0d]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <a href="/" className="text-[15px] font-semibold tracking-tight text-white">
            fiscal-rs
          </a>
          <nav className="hidden items-center gap-6 sm:flex">
            <a href="/docs" className="text-[13px] text-[#94979E] transition-colors hover:text-white">
              Docs
            </a>
            <a
              href="https://docs.rs/fiscal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[13px] text-[#94979E] transition-colors hover:text-white"
            >
              API Reference <ExternalLink size={11} />
            </a>
            <a
              href="https://crates.io/crates/fiscal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[13px] text-[#94979E] transition-colors hover:text-white"
            >
              crates.io <ExternalLink size={11} />
            </a>
            <a
              href="https://github.com/JoaoHenriqueBarbosa/fiscal-rs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-[#222] px-3 py-1.5 text-[13px] text-[#94979E] transition-colors hover:border-[#a0522d]/50 hover:text-white"
            >
              <Github size={14} /> GitHub
            </a>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60vh]">
          <div className="perspective-grid h-full w-full" />
        </div>

        <div
          className="pointer-events-none absolute left-1/2 top-[30%] h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 animate-glow-pulse rounded-full opacity-60 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(247,76,0,0.2) 0%, rgba(160,82,45,0.1) 40%, transparent 70%)",
          }}
        />

        <div className="glow-line pointer-events-none absolute bottom-[40%] left-0 right-0 opacity-40" />

        {/* Floating Rust snippet (left) */}
        <div
          className="pointer-events-none absolute left-[8%] top-[35%] hidden rotate-[-4deg] rounded-lg border border-[#1a1a1a] bg-[#0A0A0B]/90 px-4 py-3 font-mono text-[11px] leading-relaxed opacity-30 backdrop-blur xl:block"
          style={{ animation: "float 6s ease-in-out infinite" }}
        >
          <span className="text-[#f74c00]">let</span>{" "}
          <span className="text-[#C9CBCF]">nfe</span>{" "}
          <span className="text-[#94979E]">=</span>{" "}
          <span className="text-[#e44d26]">InvoiceBuilder</span>
          <span className="text-[#94979E]">::</span>
          <span className="text-[#F7B983]">new</span>
          <span className="text-[#94979E]">()</span>
        </div>

        {/* Floating Rust snippet (right) */}
        <div
          className="pointer-events-none absolute right-[8%] top-[45%] hidden rotate-[3deg] rounded-lg border border-[#1a1a1a] bg-[#0A0A0B]/90 px-4 py-3 font-mono text-[11px] leading-relaxed opacity-25 backdrop-blur xl:block"
          style={{ animation: "float 7s ease-in-out infinite 1s" }}
        >
          <span className="text-[#94979E]">{"// sign & transmit"}</span>
          <br />
          <span className="text-[#C9CBCF]">invoice</span>
          <span className="text-[#94979E]">.</span>
          <span className="text-[#F7B983]">sign_with</span>
          <span className="text-[#94979E]">(|</span>
          <span className="text-[#C9CBCF]">xml</span>
          <span className="text-[#94979E]">| ...)</span>
        </div>

        <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6">
          <div className="mb-10 animate-fade-in inline-flex items-center gap-2 rounded-full border border-[#a0522d]/40 bg-[#a0522d]/5 px-4 py-1.5 text-[13px] tracking-wide">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#f74c00] shadow-[0_0_6px_rgba(247,76,0,0.8)]" />
            <span className="text-[#f74c00]/90">Open Source Fiscal Library</span>
          </div>

          <h1
            className="animate-fade-in-up max-w-[900px] text-balance text-center font-medium text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.05] tracking-[-0.03em]"
            style={{ animationDelay: "100ms" }}
          >
            Escreva uma vez em{" "}
            <span className="gradient-text">Rust</span>,{" "}
            use em qualquer lugar
          </h1>

          <p
            className="mt-8 max-w-lg animate-fade-in-up text-center text-[17px] leading-[1.7] text-[#7a7d84]"
            style={{ animationDelay: "200ms" }}
          >
            Documentos fiscais brasileiros (NF-e / NFC-e) com a segurança de tipos
            e performance do Rust. Uma lib, todos os runtimes via FFI.
          </p>

          <div
            className="mt-10 flex animate-fade-in-up flex-col gap-3 sm:flex-row sm:gap-4"
            style={{ animationDelay: "300ms" }}
          >
            <a
              href="https://github.com/JoaoHenriqueBarbosa/fiscal-rs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer group inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#a0522d] px-7 py-3.5 text-[15px] font-medium text-white transition-all duration-300 hover:bg-[#f74c00] hover:shadow-[0_0_40px_rgba(247,76,0,0.3)]"
            >
              <Github size={17} className="transition-transform duration-300 group-hover:scale-110" />
              Ver no GitHub
            </a>
            <a
              href="/docs"
              className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-[#222] bg-transparent px-7 py-3.5 text-[15px] font-medium text-[#94979E] transition-all duration-300 hover:border-[#a0522d]/50 hover:text-white"
            >
              <BookOpen size={17} />
              Documentação
            </a>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: "600ms" }}>
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-[#a0522d]/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Story / Why ── */}
      <section className="relative py-28 lg:py-36">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.2em] text-[#a0522d]">
            A História
          </p>
          <h2 className="max-w-2xl text-[24px] font-normal leading-[1.3] tracking-tighter text-[#94979E] md:text-[28px] lg:text-[40px]">
            O ecossistema Rust para documentos fiscais brasileiros era{" "}
            <strong className="font-normal text-white">fragmentado e incompleto</strong>.
          </h2>
          <div className="mt-10 space-y-6 text-[16px] leading-[1.8] text-[#7a7d84]">
            <p>
              O <strong className="text-[#c9cbcf]">sped-nfe</strong> em PHP é a referência do mercado — 2.400+ stars,
              usado em produção por milhares de empresas no Brasil. Portamos ele primeiro para{" "}
              <strong className="text-[#c9cbcf]">TypeScript</strong> no projeto <a href="https://fin-open-pos.johnenrique.tech/" target="_blank" rel="noopener noreferrer" className="text-[#f74c00] hover:underline">FinOpenPOS</a>.
            </p>
            <p>
              Mas a pergunta ficou: e se em vez de manter uma versão por linguagem, a gente escrevesse{" "}
              <strong className="text-[#f74c00]">uma única vez em Rust</strong> e exportasse via FFI para
              Python, Node.js, WebAssembly, Android, iOS?
            </p>
            <p>
              O <strong className="text-[#c9cbcf]">fiscal-rs</strong> nasceu dessa ideia. Portamos 640+ testes
              do PHP/TypeScript primeiro, depois implementamos até todos passarem. Zero float-point drift
              (centavos como inteiros), typestate pattern no InvoiceBuilder, newtypes validados,
              assinatura XML-DSig nativa sem hacks de child_process.
            </p>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-4 text-center text-[13px] font-medium uppercase tracking-[0.2em] text-[#a0522d]">
            Funcionalidades
          </p>
          <h2 className="mb-16 text-center text-[28px] font-normal leading-[1.15] tracking-tighter text-white md:text-[36px]">
            Tudo que você precisa para emissão fiscal
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Package size={20} />,
                title: "NF-e & NFC-e",
                desc: "Modelos 55 e 65 com builder typestate: Draft → Built → Signed. Erros impossíveis em tempo de compilação.",
              },
              {
                icon: <Shield size={20} />,
                title: "Assinatura digital",
                desc: "Certificado A1 (PFX) com OpenSSL nativo. XML-DSig, C14N, RSA-SHA1 — sem shell scripts.",
              },
              {
                icon: <Globe size={20} />,
                title: "SEFAZ completo",
                desc: "URLs por estado, envelopes SOAP, parsers de resposta, client HTTP async com mTLS.",
              },
              {
                icon: <Zap size={20} />,
                title: "Zero float drift",
                desc: "Valores monetários em centavos (i64). Alíquotas em Rate/Rate4. Sem surpresas de ponto flutuante.",
              },
              {
                icon: <Shield size={20} />,
                title: "Tipos validados",
                desc: "TaxId, Gtin, Ncm, Cfop — parse, don't validate. Estados inválidos irrepresentáveis.",
              },
              {
                icon: <Globe size={20} />,
                title: "FFI-ready",
                desc: "Uma lib Rust → PyO3, napi-rs, wasm-bindgen, UniFFI. Qualquer runtime, uma única base de código.",
              },
            ].map((f, i) => (
              <SpotlightCard key={i}>
                <div className="mb-3 inline-flex rounded-lg bg-[#a0522d]/10 p-2 text-[#f74c00]">
                  {f.icon}
                </div>
                <h3 className="mb-2 text-[15px] font-medium text-white">{f.title}</h3>
                <p className="text-[13px] leading-relaxed text-[#7a7d84]">{f.desc}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Getting Started ── */}
      <section className="relative py-28 lg:py-36">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.2em] text-[#a0522d]">
            Quick Start
          </p>
          <h2 className="max-w-lg text-[24px] font-normal leading-[1.15] tracking-tighter text-[#94979E] md:text-[28px] lg:text-[40px]">
            Comece em <strong className="font-normal text-white">um comando</strong>
          </h2>

          <div className="group mt-12 overflow-hidden rounded-xl border border-[#1a1a1a] bg-[#0A0A0B] transition-colors duration-300 hover:border-[#a0522d]/30">
            <div className="flex items-center border-b border-[#1a1a1a] px-5 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/80" />
                </div>
                <span className="font-mono text-[11px] text-[#64676F]">terminal</span>
              </div>
            </div>

            <div className="p-5 font-mono text-[13px] leading-[2]">
              <div className="text-[#4E5159]"># adicione ao seu Cargo.toml</div>
              <div className="text-[#C9CBCF]">
                <span className="select-none text-[#f74c00]">$ </span>
                cargo add fiscal
              </div>

              <div className="mt-3 text-[#4E5159]"># ou use sub-crates individuais</div>
              <div className="text-[#C9CBCF]">
                <span className="select-none text-[#f74c00]">$ </span>
                cargo add fiscal-core fiscal-crypto fiscal-sefaz
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden py-32 lg:py-44">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[100px]"
          style={{
            background: "radial-gradient(circle, rgba(247,76,0,0.15) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-medium text-[clamp(2rem,7vw,5rem)] leading-[0.95] tracking-[-0.03em] text-white">
            Contribua
          </h2>

          <p className="mx-auto mt-6 max-w-md text-[17px] leading-[1.7] text-[#64676F]">
            fiscal-rs é open source e aceita contribuições.
            Dê uma estrela, abra uma issue, ou envie um PR.
          </p>

          <div className="mt-10">
            <a
              href="https://github.com/JoaoHenriqueBarbosa/fiscal-rs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer group inline-flex items-center gap-2.5 rounded-lg bg-[#a0522d] px-8 py-4 text-[15px] font-medium text-white transition-all duration-300 hover:bg-[#f74c00] hover:shadow-[0_0_50px_rgba(247,76,0,0.25)]"
            >
              <Github size={18} className="transition-transform duration-300 group-hover:scale-110" />
              Star no GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#1a1a1a] py-8">
        <div className="mx-auto max-w-5xl px-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-[13px] text-[#4E5159]">
            fiscal-rs — MIT License
          </p>
          <div className="flex gap-6 text-[13px] text-[#64676F]">
            <a href="https://docs.rs/fiscal" className="hover:text-white transition-colors">docs.rs</a>
            <a href="https://crates.io/crates/fiscal" className="hover:text-white transition-colors">crates.io</a>
            <a href="https://github.com/JoaoHenriqueBarbosa/fiscal-rs" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
