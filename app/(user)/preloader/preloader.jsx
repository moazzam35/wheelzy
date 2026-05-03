"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./Preloader.module.css";

const SEG_COUNT = 20;
const CIRC = 2 * Math.PI * 45;
const CX = 60, CY = 60, R = 45;

function buildTicks() {
  const ticks = [];
  for (let i = 0; i <= 24; i++) {
    const angle = (i / 24) * 2 * Math.PI - Math.PI / 2;
    const isMajor = i % 4 === 0;
    const innerR = isMajor ? R - 8 : R - 5;
    ticks.push({
      x1: +(CX + Math.cos(angle) * innerR).toFixed(3),
      y1: +(CY + Math.sin(angle) * innerR).toFixed(3),
      x2: +(CX + Math.cos(angle) * R).toFixed(3),
      y2: +(CY + Math.sin(angle) * R).toFixed(3),
      major: isMajor,
    });
  }
  return ticks;
}
const TICKS = buildTicks();

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [done, setDone]     = useState(false);
  const canvasRef  = useRef(null);
  const linesRef   = useRef([]);
  const rafRef     = useRef(null);
  const intervalRef = useRef(null);

  // ── Speed lines canvas ──────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    linesRef.current = Array.from({ length: 55 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      length: Math.random() * 180 + 60,
      speed:  Math.random() * 4 + 1.5,
      opacity: Math.random() * 0.18 + 0.04,
      width:  Math.random() * 0.8 + 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      linesRef.current.forEach((l) => {
        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        ctx.lineTo(l.x + l.length, l.y);
        ctx.strokeStyle = `rgba(201,168,76,${l.opacity})`;
        ctx.lineWidth = l.width;
        ctx.stroke();
        l.x -= l.speed;
        if (l.x + l.length < 0) {
          l.x = canvas.width + 20;
          l.y = Math.random() * canvas.height;
          l.length = Math.random() * 180 + 60;
        }
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Progress simulation ─────────────────────────────────
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const step = prev < 70
          ? Math.random() * 2.8 + 0.8
          : Math.random() * 1.1 + 0.25;
        const next = Math.min(prev + step, 100);
        if (next >= 100) {
          clearInterval(intervalRef.current);
          setTimeout(() => setHidden(true), 600);
          setTimeout(() => setDone(true), 1600);
        }
        return next;
      });
    }, 60);
    return () => clearInterval(intervalRef.current);
  }, []);

  if (done) return null;

  const pct    = Math.min(progress, 100);
  const offset = CIRC - (pct / 100) * CIRC;
  const angle  = (pct / 100) * 2 * Math.PI - Math.PI / 2;
  const dotX   = CX + Math.cos(angle) * R;
  const dotY   = CY + Math.sin(angle) * R;
  const activeSegs = Math.floor((pct / 100) * SEG_COUNT);

  return (
    <div className={`${styles.preloader} ${hidden ? styles.hidden : ""}`}>
      {/* Speed lines */}
      <canvas ref={canvasRef} className={styles.speedCanvas} />

      {/* Vignette handled by ::after in CSS */}

      <div className={styles.wrap}>
        {/* Logo */}
        <div className={styles.logo}>
          <span className={styles.prefix}>wheelzy</span>
          
        </div>

        {/* Car */}
        <div className={styles.carStage}>
          <svg className={styles.carSvg} viewBox="0 0 440 130" xmlns="http://www.w3.org/2000/svg" overflow="visible">
            <defs>
              <linearGradient id="beamGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%"   stopColor="#e8cc82" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#e8cc82" stopOpacity="0"/>
              </linearGradient>
              <radialGradient id="brakeGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#ff3a1a" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#ff3a1a" stopOpacity="0"/>
              </radialGradient>
            </defs>

            <ellipse className={styles.beam} cx="415" cy="72" rx="60" ry="22" fill="url(#beamGrad)" />
            <ellipse className={styles.puff} cx="48" cy="96" rx="10" ry="6" fill="rgba(180,180,160,0.3)" />

            <path className={styles.carBody} d="M55,85 L55,72 Q60,62 76,54 L104,42 Q118,34 150,28 L220,24 Q258,22 290,24 L330,26 Q354,28 370,38 L395,54 Q408,62 412,72 L412,85 Z" />
            <path className={styles.carBody} d="M60,98 L380,98 L390,93 L394,88 L390,85 L60,85 Q52,87 50,93 Q50,98 60,98 Z" />
            <path className={styles.carRoof} d="M108,38 Q130,18 160,14 L230,11 Q268,10 296,16 L322,24 Q340,30 350,40 L108,40 Z" />
            <path className={styles.carGlass} d="M296,18 L320,26 Q338,32 348,42 L248,42 L260,16 Z" />
            <path className={styles.carGlass} d="M110,40 L160,14 L180,14 L150,40 Z" />
            <path className={styles.carGlass} d="M154,14 L220,12 L222,40 L152,40 Z" />

            <path className={styles.carDetail} d="M180,40 L180,82" />
            <path className={styles.carDetail} d="M222,40 L222,82" />
            <path className={styles.carDetail} d="M154,40 L152,82" />
            <path className={styles.carDetail} d="M88,90 L375,90" />

            <path className={styles.grilleLines} d="M388,68 L400,64" />
            <path className={styles.grilleLines} d="M387,73 L399,70" />
            <path className={styles.grilleLines} d="M388,78 L400,76" />

            {/* Rear wheel */}
            <path className={styles.wheelArch} d="M76,98 Q76,70 108,70 Q140,70 140,98" />
            <circle className={styles.wheel} cx="108" cy="100" r="24" />
            <circle className={styles.wheel} cx="108" cy="100" r="16" />
            <g className={styles.spokes}>
              <line x1="108" y1="84" x2="108" y2="116" />
              <line x1="92"  y1="100" x2="124" y2="100" />
              <line x1="96.7" y1="88.7" x2="119.3" y2="111.3" />
              <line x1="119.3" y1="88.7" x2="96.7" y2="111.3" />
            </g>
            <circle className={styles.hub} cx="108" cy="100" r="4" />

            {/* Front wheel */}
            <path className={styles.wheelArch} d="M308,98 Q308,70 340,70 Q372,70 372,98" />
            <circle className={styles.wheel} cx="340" cy="100" r="24" />
            <circle className={styles.wheel} cx="340" cy="100" r="16" />
            <g className={styles.spokes}>
              <line x1="340" y1="84" x2="340" y2="116" />
              <line x1="324" y1="100" x2="356" y2="100" />
              <line x1="328.7" y1="88.7" x2="351.3" y2="111.3" />
              <line x1="351.3" y1="88.7" x2="328.7" y2="111.3" />
            </g>
            <circle className={styles.hub} cx="340" cy="100" r="4" />

            <path className={styles.carDetail} d="M395,58 Q406,62 410,70 L406,70 Q403,63 395,60 Z" fill="rgba(201,168,76,0.15)" />
            <line className={styles.carDetail} x1="398" y1="62" x2="408" y2="66" />
            <line className={styles.carDetail} x1="397" y1="67" x2="408" y2="69" />

            <ellipse className={styles.brakeGlow} cx="62" cy="72" rx="14" ry="10" fill="url(#brakeGrad)" />
            <path className={styles.carDetail} d="M58,66 L66,66 L68,72 L66,78 L58,78 L56,72 Z"
              fill="rgba(201,60,20,0.08)" stroke="rgba(201,60,20,0.6)" strokeWidth="0.8"/>
          </svg>
        </div>

        {/* Ground */}
        <div className={styles.ground}>
          <div className={styles.groundLine} />
          <div className={styles.groundGlow} />
        </div>

        {/* Gauge */}
        <div className={styles.gaugeWrap}>
          <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#8a6b20"/>
                <stop offset="50%"  stopColor="#c9a84c"/>
                <stop offset="100%" stopColor="#e8cc82"/>
              </linearGradient>
            </defs>
            {TICKS.map((t, i) => (
              <line key={i}
                x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
                className={`${styles.tick} ${t.major ? styles.tickMajor : ""}`}
              />
            ))}
            <circle className={styles.gaugeBg} cx="60" cy="60" r="45"
              strokeDasharray="283" strokeDashoffset="0"
              transform="rotate(-90 60 60)" />
            <circle className={styles.gaugeArc} cx="60" cy="60" r="45"
              style={{ strokeDashoffset: offset }} />
            <circle className={styles.gaugeDot} cx={dotX} cy={dotY} r="3" />
          </svg>
          <div className={styles.gaugeCenter}>
            <div className={styles.gaugeNum}>{Math.floor(pct)}</div>
            <div className={styles.gaugeLbl}>loading</div>
          </div>
        </div>

        {/* Bar */}
        <div className={styles.barWrap}>
          <div className={styles.barLabels}>
            <span className={styles.barLabel}>System Init</span>
            <span className={styles.barLabel}>{Math.floor(pct)}%</span>
          </div>
          <div className={styles.barTrack}>
            <div className={styles.barFill} style={{ width: `${pct}%` }} />
          </div>
          <div className={styles.barSegs}>
            {Array.from({ length: SEG_COUNT }, (_, i) => (
              <div key={i} className={`${styles.barSeg} ${i < activeSegs ? styles.barSegActive : ""}`} />
            ))}
          </div>
        </div>

        <p className={styles.tagline}>Precision Engineered &nbsp;·&nbsp; whellzy</p>
      </div>
    </div>
  );
}