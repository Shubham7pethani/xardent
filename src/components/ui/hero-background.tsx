import * as React from "react";

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(46,97,255,0.38),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_-10%,rgba(46,97,255,0.22),transparent_72%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(1100px_650px_at_0%_0%,rgba(0,212,255,0.2),transparent_72%)]" />

      <div className="absolute -top-44 left-[18%] h-[140px] w-[275px] rounded-full bg-linear-to-br from-blue-600/22 via-cyan-400/16 to-transparent blur-3xl motion-reduce:animate-none animate-[xd-float_14s_ease-in-out_infinite]" />
      <div className="absolute -top-28 right-[8%] h-[130px] w-[245px] rounded-full bg-linear-to-br from-indigo-600/18 via-sky-400/14 to-transparent blur-3xl motion-reduce:animate-none animate-[xd-float_18s_ease-in-out_infinite]" />

      <div className="absolute inset-0 opacity-[0.35] mask-[radial-gradient(ellipse_at_center,black_35%,transparent_72%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.10)_1px,transparent_1px)] bg-size-[52px_52px] motion-reduce:animate-none animate-[xd-grid_26s_linear_infinite]" />
      </div>
    </div>
  );
}
