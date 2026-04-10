import React, { useState } from "react";
import "./Landing.css";

const MAX_VALUE = `1${"0".repeat(200)}`;

const INPUT_UNIT_OPTIONS = [
  { value: "joule", label: "Joules (J)", log10J: 0 },
  { value: "kilojoule", label: "Kilojoules (kJ)", log10J: 3 },
  { value: "megajoule", label: "Megajoules (MJ)", log10J: 6 },
  { value: "gigajoule", label: "Gigajoules (GJ)", log10J: 9 },
  { value: "tonTnt", label: "Tons of TNT", log10J: Math.log10(4.184e9) },
  {
    value: "kilotonTnt",
    label: "Kilotons of TNT",
    log10J: Math.log10(4.184e12),
  },
  {
    value: "megatonTnt",
    label: "Megatons of TNT",
    log10J: Math.log10(4.184e15),
  },
];

const SI_UNITS = [
  { name: "gigatons of TNT", log10J: Math.log10(4.184e18) },
  { name: "megatons of TNT", log10J: Math.log10(4.184e15) },
  { name: "kilotons of TNT", log10J: Math.log10(4.184e12) },
  { name: "tons of TNT", log10J: Math.log10(4.184e9) },
  { name: "joules", log10J: 0 },
];

const VOLCANO_LOG10_J = Math.log10(8.4e17);
const CAT_PAIR_LOG10_J = Math.log10(2 * 4 * 299792458 * 299792458);
// const LOG10_J_PER_HYDROGEN_ATOM = Math.log10(
//   1.6735575e-27 * 299792458 * 299792458,
// );
// const LOG10_OBSERVABLE_UNIVERSE_ATOMS = 80;
// const EXTREME_COMPARISON_MIN_LOG10_J = 27;

const NUKE_REFERENCES = [
  { name: "Little Boy bombs (15 kt)", log10J: Math.log10(6.276e13) },
  { name: "Fat Man bombs (21 kt)", log10J: Math.log10(8.7864e13) },
  { name: "Tsar Bomba bombs (50 Mt)", log10J: Math.log10(2.092e17) },
];

const DISPLAY_MODE_OPTIONS = [
  { value: "readable", label: "Readable" },
  { value: "scientific", label: "Scientific" },
];

// Short scale names based on the naming convention used in modern English.
const SHORT_SCALE_ILLION_NAMES = [
  "",
  "million",
  "billion",
  "trillion",
  "quadrillion",
  "quintillion",
  "sextillion",
  "septillion",
  "octillion",
  "nonillion",
  "decillion",
  "undecillion",
  "duodecillion",
  "tredecillion",
  "quattuordecillion",
  "quindecillion",
  "sexdecillion",
  "septendecillion",
  "octodecillion",
  "novemdecillion",
  "vigintillion",
  "unvigintillion",
  "duovigintillion",
  "tresvigintillion",
  "quattuorvigintillion",
  "quinvigintillion",
  "sesvigintillion",
  "septemvigintillion",
  "octovigintillion",
  "novemvigintillion",
  "trigintillion",
  "untrigintillion",
  "duotrigintillion",
  "trestrigintillion",
  "quattuortrigintillion",
  "quintrigintillion",
  "sestrigintillion",
  "septentrigintillion",
  "octotrigintillion",
  "noventrigintillion",
  "quadragintillion",
  "unquadragintillion",
  "duoquadragintillion",
  "tresquadragintillion",
  "quattuorquadragintillion",
  "quinquadragintillion",
  "sesquadragintillion",
  "septenquadragintillion",
  "octoquadragintillion",
  "novenquadragintillion",
  "quinquagintillion",
  "unquinquagintillion",
  "duoquinquagintillion",
  "tresquinquagintillion",
  "quattuorquinquagintillion",
  "quinquinquagintillion",
  "sesquinquagintillion",
  "septenquinquagintillion",
  "octoquinquagintillion",
  "novenquinquagintillion",
  "sexagintillion",
  "unsexagintillion",
  "duosexagintillion",
  "tresexagintillion",
  "quattuorsexagintillion",
  "quinsexagintillion",
  "sessexagintillion",
];

function decimalStringLog10(value) {
  if (value === "0") {
    return Number.NEGATIVE_INFINITY;
  }

  // Compute log10 without parsing huge integers directly.
  const leading = value.slice(0, 15);
  const leadingNumber = Number(leading) / 10 ** (leading.length - 1);
  return value.length - 1 + Math.log10(leadingNumber);
}

function formatPowerOfTen(log10Value, significantDigits = 4) {
  if (!Number.isFinite(log10Value)) {
    return "0";
  }

  const exponent = Math.floor(log10Value);
  const mantissa = 10 ** (log10Value - exponent);
  return `${mantissa.toFixed(significantDigits - 1)} x 10^${exponent}`;
}

function formatScientificValue(log10Value, unitName) {
  return `${formatPowerOfTen(log10Value)} ${unitName}`;
}

function trimTrailingZeros(value) {
  return value.replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
}

function getShortScaleNameForPower(powerOfTen) {
  if (powerOfTen === 3) {
    return "thousand";
  }

  if (powerOfTen < 6 || (powerOfTen - 3) % 3 !== 0) {
    return null;
  }

  const illionIndex = (powerOfTen - 3) / 3;
  return SHORT_SCALE_ILLION_NAMES[illionIndex] ?? null;
}

function formatWithNamedScale(log10Value) {
  if (!Number.isFinite(log10Value)) {
    return "0";
  }

  const order = Math.floor(log10Value);
  if (order < 3) {
    const numeric = 10 ** log10Value;
    return trimTrailingZeros(
      numeric.toLocaleString("en-US", {
        maximumFractionDigits: 6,
        useGrouping: false,
      }),
    );
  }

  const namedPower = Math.floor(order / 3) * 3;
  const scaleName = getShortScaleNameForPower(namedPower);
  if (!scaleName) {
    return formatPowerOfTen(log10Value, 5);
  }

  const mantissa = 10 ** (log10Value - namedPower);
  const digits = mantissa >= 100 ? 1 : mantissa >= 10 ? 2 : 3;
  return `${trimTrailingZeros(mantissa.toFixed(digits))} ${scaleName}`;
}

function formatReadableNumber(log10Value) {
  if (!Number.isFinite(log10Value)) {
    return "0";
  }

  if (log10Value < -12) {
    return formatPowerOfTen(log10Value, 5);
  }

  const numeric = 10 ** log10Value;

  if (numeric === 0) {
    return "0";
  }

  if (numeric >= 1) {
    if (numeric >= 1e6) {
      return formatWithNamedScale(log10Value);
    }

    const rounded = numeric.toLocaleString("en-US", {
      maximumFractionDigits: 6,
    });
    return rounded;
  }

  const decimals = Math.min(10, Math.max(4, Math.ceil(-log10Value) + 3));
  return trimTrailingZeros(numeric.toFixed(decimals));
}

function formatNumberByMode(log10Value, mode) {
  if (mode === "scientific") {
    return formatPowerOfTen(log10Value, 5);
  }

  return formatReadableNumber(log10Value);
}

function buildNumberSizeText(log10Joules, displayMode) {
  if (!Number.isFinite(log10Joules)) {
    return "0 J | order: 10^0 | 1 digit";
  }

  if (log10Joules < 0) {
    return `${formatPowerOfTen(log10Joules, 5)} J | less than 1 joule`;
  }

  const order = Math.floor(log10Joules);
  const digits = order + 1;
  const approx =
    displayMode === "scientific"
      ? formatPowerOfTen(log10Joules, 5)
      : formatReadableNumber(log10Joules);

  if (order >= 6) {
    return `${approx} J | order: 10^${order} | about ${digits} digits (roughly 1 followed by ${order} zeros)`;
  }

  return `${approx} J | order: 10^${order} | about ${digits} digits`;
}

function buildConversions(log10Joules, displayMode) {
  if (!Number.isFinite(log10Joules)) {
    return [
      { label: "Number Size", value: "0 J | order: 10^0 | 1 digit" },
      { label: "SI Unit", value: "0 joules" },
      { label: "Volcano", value: "0 Krakatoa-scale eruptions" },
      { label: "Cats", value: "0 cat + anti-cat annihilations" },
      { label: "Nukes", value: "0 Little Boy | 0 Fat Man | 0 Tsar Bomba" },
    ];
  }

  const bestSi =
    SI_UNITS.find((entry) => log10Joules >= entry.log10J) ??
    SI_UNITS[SI_UNITS.length - 1];
  const siValue = `${formatNumberByMode(log10Joules - bestSi.log10J, displayMode)} ${bestSi.name}`;

  const volcanoReadable = `${formatNumberByMode(log10Joules - VOLCANO_LOG10_J, displayMode)} Krakatoa-scale eruptions`;
  const catValue = `${formatNumberByMode(log10Joules - CAT_PAIR_LOG10_J, displayMode)} cat + anti-cat annihilations`;

  const nukeValues = NUKE_REFERENCES.map((entry) => {
    return `${formatNumberByMode(log10Joules - entry.log10J, displayMode)} ${entry.name}`;
  }).join(" | ");

  const rows = [
    {
      label: "Number Size",
      value: buildNumberSizeText(log10Joules, displayMode),
    },
    { label: "SI Unit", value: siValue },
    { label: "Volcano", value: volcanoReadable },
    { label: "Cats", value: catValue },
    { label: "Nukes", value: nukeValues },
  ];

  //   if (log10Joules >= EXTREME_COMPARISON_MIN_LOG10_J) {
  //     const atomEquivalentLog10 = log10Joules - LOG10_J_PER_HYDROGEN_ATOM;
  //     const universeSharePercentLog10 =
  //       atomEquivalentLog10 - LOG10_OBSERVABLE_UNIVERSE_ATOMS + 2;

  //     rows.push({
  //       label: "Extreme Scale",
  //       value:
  //         `${formatNumberByMode(atomEquivalentLog10, displayMode)} hydrogen-atom mass equivalents | ` +
  //         `${formatNumberByMode(universeSharePercentLog10, displayMode)}% of estimated atoms in the observable universe`,
  //     });
  //   }

  return rows;
}

function normalizeDigits(value) {
  const trimmed = value.replace(/^0+(?=\d)/, "");
  return trimmed === "" ? "0" : trimmed;
}

function isWithinLimit(value) {
  if (value.length < MAX_VALUE.length) {
    return true;
  }

  if (value.length > MAX_VALUE.length) {
    return false;
  }

  return value <= MAX_VALUE;
}

function parseInput(rawValue) {
  const value = rawValue.trim();

  if (!value) {
    return { error: "Please enter a number." };
  }

  const exponentMatch = value.match(/^10\^(\d{1,3})$/i);
  if (exponentMatch) {
    const exponent = Number(exponentMatch[1]);
    if (exponent > 200) {
      return { error: "Exponent must be between 0 and 200." };
    }

    return {
      value: exponent === 0 ? "1" : `1${"0".repeat(exponent)}`,
      normalizedInput: `10^${exponent}`,
    };
  }

  if (!/^\d+$/.test(value)) {
    return { error: "Use a whole number or 10^x format (for example: 10^12)." };
  }

  const normalized = normalizeDigits(value);
  if (!isWithinLimit(normalized)) {
    return { error: "Number must be in the range 0 to 10^200." };
  }

  return {
    value: normalized,
    normalizedInput: normalized,
  };
}

function Landing() {
  const [rawInput, setRawInput] = useState("");
  const [unit, setUnit] = useState("joule");
  const [displayMode, setDisplayMode] = useState("readable");
  const [conversionResult, setConversionResult] = useState({
    type: "idle",
    message: "Output will appear here after you click Convert.",
    rows: [],
  });

  const handleConvert = () => {
    const parsed = parseInput(rawInput);

    if (parsed.error) {
      setConversionResult({
        type: "error",
        message: parsed.error,
        rows: [],
      });
      return;
    }

    const selectedUnit = INPUT_UNIT_OPTIONS.find(
      (option) => option.value === unit,
    );
    const unitLog10 = selectedUnit?.log10J ?? 0;
    const log10Input = decimalStringLog10(parsed.value);
    const log10Joules = Number.isFinite(log10Input)
      ? log10Input + unitLog10
      : Number.NEGATIVE_INFINITY;
    const rows = buildConversions(log10Joules, displayMode);

    setConversionResult({
      type: "ok",
      message: `Input: ${parsed.normalizedInput} (${selectedUnit?.label ?? "Joules (J)"})`,
      rows,
    });
  };

  const getHelpLinkForLabel = (label) => {
    if (label === "Volcano") {
      return "/volcano-info";
    }

    if (label === "Cats") {
      return "/cat-info";
    }

    return null;
  };

  return (
    <main className="landing-page">
      <section className="panel" aria-label="Number converter panel">
        <h1>Energy Visualizer</h1>
        <p className="subtitle">
          Enter a value from 0 to 10^200 (or use 10^x) and convert it into
          human-scale comparisons.
        </p>

        <label htmlFor="number-input" className="field-label">
          Number
        </label>
        <input
          id="number-input"
          type="text"
          value={rawInput}
          onChange={(event) => setRawInput(event.target.value)}
          placeholder="Examples: 2500, 00042, 10^18"
          className="text-input"
        />

        <label htmlFor="unit-select" className="field-label">
          Input Energy Unit
        </label>
        <select
          id="unit-select"
          value={unit}
          onChange={(event) => setUnit(event.target.value)}
          className="select-input"
        >
          {INPUT_UNIT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p className="helper-note">
          Comparisons use reference energies for TNT equivalents, Krakatoa
          eruption scale, matter-antimatter pairs, and famous nuclear devices.
          Extreme-scale comparisons appear only from 10^27 joules and above.
        </p>

        <div className="display-mode" role="group" aria-label="Display mode">
          {DISPLAY_MODE_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`mode-button ${displayMode === option.value ? "mode-button-active" : ""}`}
              onClick={() => setDisplayMode(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleConvert}
          className="convert-button"
        >
          Convert
        </button>

        <div className="output-panel" aria-live="polite">
          <h2>Output</h2>
          <p
            className={`output-message ${conversionResult.type === "error" ? "output-error" : ""}`}
          >
            {conversionResult.type === "error"
              ? `Error: ${conversionResult.message}`
              : conversionResult.message}
          </p>
          {conversionResult.rows.length > 0 && (
            <ul className="results-list">
              {conversionResult.rows.map((row) => (
                <li key={row.label} className="result-item">
                  <span className="result-label">
                    {row.label}
                    {getHelpLinkForLabel(row.label) && (
                      <a
                        href={getHelpLinkForLabel(row.label)}
                        className="help-icon"
                        aria-label={`Learn how ${row.label} energy is calculated`}
                        title={`How ${row.label} is calculated`}
                      >
                        ?
                      </a>
                    )}
                  </span>
                  <span className="result-value">{row.value}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}

export default Landing;
