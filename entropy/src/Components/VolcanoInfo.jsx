import React from "react";
import "./InfoPage.css";

const KRAKATOA_JOULES = 8.4e17;
const KRAKATOA_MEGATONS_TNT = 200;

function VolcanoInfo() {
  return (
    <main className="info-page">
      <section className="info-panel">
        <a href="/" className="back-link">
          Back to converter
        </a>
        <h1>Volcano Energy Calculation</h1>
        <p>
          We compare your input to the 1883 Krakatoa eruption scale. Wikipedia
          describes that event as roughly {KRAKATOA_MEGATONS_TNT} megatons of
          TNT, which is about 8.4 x 10^17 joules.
          <sup className="cite">
            <a href="#volcano-ref-1">[1]</a>
          </sup>
        </p>

        <h2>What happened at Krakatoa</h2>
        <ul className="info-list">
          <li>
            The 1883 eruption is one of the most violent recorded volcanic
            events.
            <sup className="cite">
              <a href="#volcano-ref-1">[1]</a>
            </sup>
          </li>
          <li>
            The explosions were heard thousands of kilometers away.
            <sup className="cite">
              <a href="#volcano-ref-1">[1]</a>
            </sup>
          </li>
          <li>
            Tsunamis caused most of the human loss of life in nearby regions.
            <sup className="cite">
              <a href="#volcano-ref-1">[1]</a>
            </sup>
          </li>
        </ul>

        <h2>Formula</h2>
        <p className="formula">
          Volcano equivalents = Input energy (J) / 8.4 x 10^17
        </p>

        <h2>Why this helps visualize energy</h2>
        <p>
          If the result is below 1, your energy is smaller than one
          Krakatoa-scale event. If it is above 1, your energy is larger than
          that benchmark. This gives a quick real-world mental picture.
        </p>

        <h2>Example</h2>
        <p>For 21 kilotons TNT:</p>
        <p className="formula">
          21 kt = 21 x 4.184 x 10^12 J = 8.7864 x 10^13 J
        </p>
        <p className="formula">
          Volcano equivalents = 8.7864 x 10^13 / 8.4 x 10^17 = 1.046 x 10^-4
        </p>
        <p>That is about 0.0001046 Krakatoa-scale eruptions.</p>

        <h2>Important note</h2>
        <p>
          Real eruptions vary widely by volcano and eruption style. We use one
          fixed Krakatoa-scale value as a consistent comparison reference.
        </p>

        <p className="footnote">
          Reference constant: Krakatoa-scale eruption energy ={" "}
          {KRAKATOA_JOULES.toExponential(3)} J
        </p>

        <h2>Citations</h2>
        <ol className="citations-list">
          <li id="volcano-ref-1">
            <a
              href="https://en.wikipedia.org/wiki/Krakatoa"
              target="_blank"
              rel="noreferrer"
            >
              Wikipedia: Krakatoa
            </a>
          </li>
        </ol>
      </section>
    </main>
  );
}

export default VolcanoInfo;
