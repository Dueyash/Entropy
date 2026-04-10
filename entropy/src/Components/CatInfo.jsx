import React from "react";
import "./InfoPage.css";

const C = 299792458;
const CAT_MASS_KG = 4;
const CAT_PAIR_JOULES = 2 * CAT_MASS_KG * C * C;
const ONE_KG_JOULES = C * C;

function CatInfo() {
  return (
    <main className="info-page">
      <section className="info-panel">
        <a href="/" className="back-link">
          Back to converter
        </a>
        <h1>Cat and Anti-Cat Energy Calculation</h1>
        <p>
          This comparison is based on mass-energy equivalence from
          Einstein&apos;s equation E = mc^2, using a 4 kg cat plus a 4 kg
          anti-cat.
          <sup className="cite">
            <a href="#cat-ref-1">[1]</a>
          </sup>
        </p>

        <h2>What E = mc^2 means (in plain language)</h2>
        <ul className="info-list">
          <li>
            Mass stores energy, even when something is not moving.
            <sup className="cite">
              <a href="#cat-ref-1">[1]</a>
            </sup>
          </li>
          <li>
            The conversion factor is c^2, where c is the speed of light.
            <sup className="cite">
              <a href="#cat-ref-1">[1]</a>
            </sup>
          </li>
          <li>
            Because c is huge, even small mass can map to huge energy.
            <sup className="cite">
              <a href="#cat-ref-1">[1]</a>
            </sup>
          </li>
        </ul>

        <p className="formula">
          1 kg mass equivalent is about {ONE_KG_JOULES.toExponential(3)} J
        </p>

        <h2>Formula</h2>
        <p className="formula">
          Cat equivalents = Input energy (J) / (2 x 4 x c^2)
        </p>

        <h2>How the cat comparison is computed</h2>
        <p>
          For one cat + anti-cat pair, total mass is 8 kg. If annihilated, the
          model assumes that mass converts to energy:
        </p>
        <p className="formula">
          E = 8 x (299,792,458)^2 J = {CAT_PAIR_JOULES.toExponential(3)} J
        </p>
        <p>
          Even a few kilograms of matter produce enormous energy, which is why
          this comparison can quickly reach large values.
        </p>

        <h2>Real-world caveat</h2>
        <p>
          This is a visualization model, not a practical engineering method.
          Wikipedia notes antimatter is extremely difficult and energy-expensive
          to produce and store, so this comparison is for intuition only.
          <sup className="cite">
            <a href="#cat-ref-1">[1]</a>
          </sup>
        </p>

        <p className="footnote">
          Assumption used by converter: one cat mass = {CAT_MASS_KG} kg.
        </p>

        <h2>Citations</h2>
        <ol className="citations-list">
          <li id="cat-ref-1">
            <a
              href="https://en.wikipedia.org/wiki/Mass%E2%80%93energy_equivalence"
              target="_blank"
              rel="noreferrer"
            >
              Wikipedia: Mass-energy equivalence
            </a>
          </li>
        </ol>
      </section>
    </main>
  );
}

export default CatInfo;
