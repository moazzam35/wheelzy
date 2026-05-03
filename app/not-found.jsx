"use client";
import { useEffect, useRef, useState } from "react";


export default function ErrorPage({ code = "404", message = "Page Not Found" }) {
  const [mounted,   setMounted]   = useState(false);
  const [particles, setParticles] = useState([]); // ← empty on server AND client first paint
  const glitchRef = useRef(null);

  /* ── Populate particles AFTER hydration (client only) ── */
  useEffect(() => {
    setParticles(
      Array.from({ length: 18 }, (_, i) => ({
        id:    i,
        size:  Math.random() * 3 + 1,
        x:     Math.random() * 100,
        y:     Math.random() * 100,
        delay: Math.random() * 6,
        dur:   Math.random() * 8 + 6,
      }))
    );
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* ── Glitch pulse ── */
  useEffect(() => {
    const el = glitchRef.current;
    if (!el) return;
    const pulse = () => {
      el.classList.add("wz-glitching");
      setTimeout(() => el.classList.remove("wz-glitching"), 400);
    };
    const id = setInterval(pulse, 3800);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        /* ── Hard reset so nothing leaks in from layout ── */
        #wz-error-root *,
        #wz-error-root *::before,
        #wz-error-root *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        /* ── Tokens ── */
        #wz-error-root {
          --gold:       #c9a84c;
          --gold-light: #e2c070;
          --gold-dark:  #9a7a2e;
          --obsidian:   #0a0a0c;

          /* ── Break out of ANY parent layout ──
             position:fixed + inset:0 makes the page cover the full viewport
             regardless of headers, navbars, or wrapper padding in layout.jsx */
          position: fixed;
          inset: 0;
          z-index: 9999;
          overflow: hidden;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          background:  var(--obsidian);
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Animations ── */
        @keyframes wz-float-up {
          0%   { transform: translateY(0)     scale(1); opacity: 0.6; }
          100% { transform: translateY(-80px) scale(0); opacity: 0;   }
        }
        @keyframes wz-drift {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-18px); }
        }
        @keyframes wz-halo {
          0%, 100% { transform: translate(-50%,-50%) scale(1);    opacity: 0.4; }
          50%       { transform: translate(-50%,-50%) scale(1.12); opacity: 0.7; }
        }
        @keyframes wz-scanline {
          0%   { top: -8%;  }
          100% { top: 108%; }
        }
        @keyframes wz-glitch-1 {
          0%,100% { clip-path: inset(0 0 100% 0); opacity: 0; }
          5%       { clip-path: inset(20% 0 40% 0); opacity: 1; left: -3px; }
          10%      { clip-path: inset(60% 0 10% 0); opacity: 1; left:  3px; }
          15%      { clip-path: inset(0 0 100% 0);  opacity: 0; }
        }
        @keyframes wz-glitch-2 {
          0%,100% { clip-path: inset(0 0 100% 0); opacity: 0; }
          7%       { clip-path: inset(50% 0 20% 0); opacity: 1; left:  4px; }
          12%      { clip-path: inset(10% 0 60% 0); opacity: 1; left: -4px; }
          17%      { clip-path: inset(0 0 100% 0);  opacity: 0; }
        }

        .wz-particle {
          animation: wz-float-up linear infinite;
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .wz-halo-bg {
          animation: wz-halo ease-in-out infinite;
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .wz-scanline-bar {
          position: absolute;
          left: 0; right: 0;
          height: 8%;
          background: linear-gradient(to bottom, transparent, rgba(201,168,76,0.04), transparent);
          animation: wz-scanline 5s linear infinite;
          pointer-events: none;
        }

        /* ── Glitch pseudo-elements ── */
        .wz-glitch {
          position: relative;
          display: inline-block;
        }
        .wz-glitch::before,
        .wz-glitch::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          font-family: 'Bebas Neue', sans-serif;
          font-size: inherit;
          letter-spacing: inherit;
          line-height: inherit;
          color: inherit;
          opacity: 0;
          pointer-events: none;
        }
        .wz-glitch::before { color: #ff4466; }
        .wz-glitch::after  { color: #44aaff; }
        .wz-glitching::before { animation: wz-glitch-1 0.4s steps(1) forwards; }
        .wz-glitching::after  { animation: wz-glitch-2 0.4s steps(1) 0.03s forwards; }
      `}</style>

      {/* ── ROOT — fixed, covers full viewport, above layout ── */}
      <div id="wz-error-root">

        {/* BG radial halo */}
        <div
          className="wz-halo-bg"
          style={{
            top: "50%", left: "50%",
            width: 800, height: 400,
            background: "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)",
            border: "1px solid rgba(201,168,76,0.1)",
            animationDuration: "7s",
          }}
        />

        {/* Scanline */}
        <div className="wz-scanline-bar" />

        {/* Floating particles — rendered only after useEffect, zero on server */}
        {particles.map(p => (
          <span
            key={p.id}
            className="wz-particle"
            style={{
              width:             p.size,
              height:            p.size,
              left:              `${p.x}%`,
              bottom:            `${p.y}%`,
              background:        "var(--gold)",
              opacity:           0.55,
              animationDelay:    `${p.delay}s`,
              animationDuration: `${p.dur}s`,
            }}
          />
        ))}

        {/* ── Main content ── */}
        <div
          style={{
            position:      "relative",
            zIndex:        10,
            display:       "flex",
            flexDirection: "column",
            alignItems:    "center",
            textAlign:     "center",
            padding:       "0 24px",
            opacity:       mounted ? 1 : 0,
            transform:     mounted ? "translateY(0)" : "translateY(40px)",
            transition:    "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >

          {/* Error code with glitch */}
          <div
            ref={glitchRef}
            className="wz-glitch"
            data-text={code}
            style={{
              fontFamily:       "'Bebas Neue', sans-serif",
              fontSize:         "clamp(120px, 22vw, 260px)",
              lineHeight:       0.85,
              letterSpacing:    "0.02em",
              color:            "rgba(255,255,255,0.06)",
              WebkitTextStroke: "1px rgba(201,168,76,0.25)",
              userSelect:       "none",
              marginBottom:     8,
            }}
          >
            {code}
          </div>
          {/* Headline */}
          <h1 style={{
            fontFamily:    "'Bebas Neue', sans-serif",
            fontSize:      "clamp(32px, 5vw, 60px)",
            letterSpacing: 4,
            color:         "#fff",
            marginBottom:  16,
          }}>
            {message}
          </h1>

          {/* Sub */}
          <p style={{
            fontSize:     15, fontWeight: 300,
            color:        "rgba(240,237,232,0.5)",
            lineHeight:   1.75, maxWidth: 440,
            marginBottom: 48,
          }}>
            The road you're looking for doesn't exist — or the engine stalled.
            Let's get you back behind the wheel.
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
            <button
              onClick={() => window.history.back()}
              style={{
                padding:       "14px 36px",
                background:    "var(--gold)",
                color:         "var(--obsidian)",
                fontFamily:    "'DM Sans', sans-serif",
                fontWeight:    700, fontSize: 13,
                letterSpacing: 2, textTransform: "uppercase",
                border:        "none", borderRadius: 2,
                cursor:        "pointer",
                transition:    "background 0.25s, transform 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "var(--gold-light)";
                e.currentTarget.style.transform  = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "var(--gold)";
                e.currentTarget.style.transform  = "translateY(0)";
              }}
            >
              ← Go Back
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              style={{
                padding:       "14px 36px",
                background:    "transparent",
                color:         "#fff",
                fontFamily:    "'DM Sans', sans-serif",
                fontWeight:    600, fontSize: 13,
                letterSpacing: 2, textTransform: "uppercase",
                border:        "1px solid rgba(255,255,255,0.25)",
                borderRadius:  2, cursor: "pointer",
                transition:    "border-color 0.25s, background 0.25s, transform 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "var(--gold)";
                e.currentTarget.style.background  = "rgba(201,168,76,0.08)";
                e.currentTarget.style.transform   = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                e.currentTarget.style.background  = "transparent";
                e.currentTarget.style.transform   = "translateY(0)";
              }}
            >
              Return Home
            </button>
          </div>

        </div>
      </div>
    </>
  );
} 

    