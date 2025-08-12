"use client";
import { useEffect, useMemo, useState } from "react";

/* ===== Contact Form Wizard , pixel-match old ===== */
export default function ContactFormWizard() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [showErr, setShowErr] = useState({ 1: false, 2: false, 3: false });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    sector: "",
    needs: [],
    stage: "",
    brief: "",
  });

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleNeed = (val) =>
    setForm((f) => ({
      ...f,
      needs: f.needs.includes(val)
        ? f.needs.filter((n) => n !== val)
        : [...f.needs, val],
    }));

  const errors = useMemo(() => {
    const e = {};
    if (step === 1) {
      if (!form.name.trim()) e.name = "Required";
      if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
      if (!form.phone.trim()) e.phone = "Required";
      if (!form.country) e.country = "Select a country";
    }
    if (step === 2) {
      if (!form.sector) e.sector = "Select a sector";
      if (!form.needs.length) e.needs = "Pick at least one need";
    }
    if (step === 3) {
      if (!form.stage) e.stage = "Select a stage";
      if (form.brief.trim().length < 10) e.brief = "Add a few more details";
    }
    return e;
  }, [step, form]);

  const canNext = Object.keys(errors).length === 0;

  const goNext = () => {
    if (canNext) {
      setStep((s) => Math.min(3, s + 1));
      setShowErr((s) => ({ ...s, [step]: false }));
    } else {
      setShowErr((s) => ({ ...s, [step]: true }));
    }
  };
  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canNext || step !== 3) {
      setShowErr((s) => ({ ...s, 3: true }));
      return;
    }
    setSubmitting(true);
    try {
      console.log("Submit payload:", form);
      alert("Thanks! We’ll get back to you shortly.");
      setStep(1);
      setForm({
        name: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        sector: "",
        needs: [],
        stage: "",
        brief: "",
      });
      setShowErr({ 1: false, 2: false, 3: false });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="
        rounded-2xl p-6 backdrop-blur-sm
        border bg-[var(--contact-panel-bg)] border-[var(--contact-panel-border)]
      "
    >
      <WizardProgress step={step} />

      <div className="mt-6 space-y-6">
        {step === 1 && (
          <StepOne
            form={form}
            setField={setField}
            errors={showErr[1] ? errors : {}}
          />
        )}
        {step === 2 && (
          <StepTwo
            form={form}
            setField={setField}
            toggleNeed={toggleNeed}
            errors={showErr[2] ? errors : {}}
          />
        )}
        {step === 3 && (
          <StepThree
            form={form}
            setField={setField}
            errors={showErr[3] ? errors : {}}
          />
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        {/* Back — ghost (same look) */}
        <button
          type="button"
          onClick={goBack}
          disabled={step === 1}
          className="
            rounded-lg px-5 py-3 font-semibold transition
            border bg-[var(--contact-panel-bg)] hover:bg-[var(--contact-panel-bg-hover)]
            border-[var(--contact-panel-border)] text-[var(--contact-ghost-text)]
            disabled:opacity-50
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
            ring-offset-[var(--surface-0)] focus-visible:ring-[var(--contact-input-focus)]
          "
        >
          Back
        </button>

        {/* Next/Submit — solid CTA green */}
        {step < 3 ? (
          <button
            type="button"
            onClick={goNext}
            className="
              rounded-lg px-6 py-3 font-semibold transition shadow-sm
              bg-[var(--cta-700)] hover:bg-[var(--cta-800)]
              text-[var(--cta-50)]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              ring-offset-[var(--surface-0)] focus-visible:ring-[var(--contact-input-focus)]
            "
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="
              rounded-lg px-6 py-3 font-semibold transition shadow-sm
              bg-[var(--cta-700)] hover:bg-[var(--cta-800)]
              text-[var(--cta-50)] disabled:opacity-60
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              ring-offset-[var(--surface-0)] focus-visible:ring-[var(--contact-input-focus)]
            "
          >
            {submitting ? "Sending…" : "Send inquiry"}
          </button>
        )}
      </div>
    </form>
  );
}

/* ===== Progress (exact colors) ===== */
function WizardProgress({ step }) {
  const total = 3;
  const pct = (step / total) * 100;
  const labels = ["Contact", "Project", "Review"];

  return (
    <div>
      <div className="flex items-center justify-between text-xs font-medium text-[var(--contact-ghost-text)]">
        {labels.map((l, i) => {
          const active = i + 1 <= step;
          return (
            <div key={l} className="flex items-center gap-2">
              <span
                className={[
                  "h-6 w-6 grid place-items-center rounded-full border",
                  active
                    ? "bg-[var(--contact-badge-active-bg)] text-[var(--contact-badge-active-text)] border-[var(--contact-badge-active-border)]"
                    : "bg-[var(--contact-badge-inactive-bg)] border-[var(--contact-badge-inactive-border)] text-[var(--contact-badge-inactive-text)]",
                ].join(" ")}
              >
                {i + 1}
              </span>
              <span
                className={
                  active ? "text-[var(--contact-badge-active-bg)]" : ""
                }
              >
                {l}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 h-2 rounded-full overflow-hidden bg-[var(--contact-progress-track)]">
        <div
          className="h-full transition-all bg-[var(--contact-progress-fill)]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ===== Step 1 ===== */
function StepOne({ form, setField, errors }) {
  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="Full name"
          name="name"
          value={form.name}
          onChange={(e) => setField("name", e.target.value)}
          error={errors.name}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => setField("email", e.target.value)}
          error={errors.email}
        />
        <Input
          label="Phone number"
          name="phone"
          type="tel"
          placeholder="+213…"
          value={form.phone}
          onChange={(e) => setField("phone", e.target.value)}
          error={errors.phone}
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label>Country</Label>
            <CountrySelect
              name="country"
              value={form.country}
              onChange={(v) => setField("country", v)}
            />
            {errors.country && <Err>{errors.country}</Err>}
          </div>
          <Input
            label="City"
            name="city"
            placeholder="Enter your city"
            value={form.city}
            onChange={(e) => setField("city", e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

/* ===== Step 2 ===== */
function StepTwo({ form, setField, toggleNeed, errors }) {
  const needOptions = [
    ["custom-formulation", "Custom formulation"],
    ["prototype", "Prototype"],
    ["stability", "Stability & efficacy study"],
    ["rnd", "Research & innovation"],
    ["regulatory", "Regulatory analysis"],
    ["other", "Other"],
  ];

  return (
    <>
      <div>
        <Label>Sector</Label>
        <SelectShell
          name="sector"
          value={form.sector}
          onChange={(v) => setField("sector", v)}
          defaultValue=""
        >
          <option value="" disabled>
            Select sector…
          </option>
          <option value="cosmetics">Natural cosmetics</option>
          <option value="supplements">Dietary supplements</option>
          <option value="biopesticides">Biopesticides & biofertilizers</option>
          <option value="animal-nutrition">Animal nutrition</option>
          <option value="agri-food">Agri-food products</option>
        </SelectShell>
        {errors.sector && <Err>{errors.sector}</Err>}
      </div>

      <div>
        <Label>Type of need</Label>
        <div className="mt-2 grid sm:grid-cols-2 gap-2">
          {needOptions.map(([val, label]) => {
            const checked = form.needs.includes(val);
            return (
              <label
                key={val}
                className={[
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition border",
                  checked
                    ? "border-[var(--contact-chip-selected-border)] bg-[var(--contact-chip-selected-bg)]"
                    : "border-[var(--contact-input-border)] hover:bg-[var(--contact-chip-hover-bg)]",
                ].join(" ")}
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-[var(--cta-700)]"
                  checked={checked}
                  onChange={() => toggleNeed(val)}
                />
                <span className="text-[var(--contact-ghost-text)]">
                  {label}
                </span>
              </label>
            );
          })}
        </div>
        {errors.needs && <Err>{errors.needs}</Err>}
      </div>
    </>
  );
}

/* ===== Step 3 ===== */
function StepThree({ form, setField, errors }) {
  return (
    <>
      <div>
        <Label>Project stage</Label>
        <div className="mt-2 grid sm:grid-cols-3 gap-2">
          {[
            ["idea", "Idea"],
            ["early-rnd", "Early R&D"],
            ["in-production", "In production"],
          ].map(([val, label]) => (
            <label
              key={val}
              className={[
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition border",
                form.stage === val
                  ? "border-[var(--contact-chip-selected-border)] bg-[var(--contact-chip-selected-bg)]"
                  : "border-[var(--contact-input-border)] hover:bg-[var(--contact-chip-hover-bg)]",
              ].join(" ")}
            >
              <input
                type="radio"
                name="stage"
                className="h-4 w-4 accent-[var(--cta-600)]"
                checked={form.stage === val}
                onChange={() => setField("stage", val)}
              />
              <span className="text-[var(--contact-ghost-text)]">{label}</span>
            </label>
          ))}
        </div>
        {errors.stage && <Err>{errors.stage}</Err>}
      </div>

      <div>
        <Label>Project brief</Label>
        <textarea
          rows={5}
          value={form.brief}
          onChange={(e) => setField("brief", e.target.value)}
          placeholder="What would you like to build?"
          className="
            mt-1 w-full rounded-lg px-3 py-2 outline-none
            bg-[var(--contact-input-bg)] border border-[var(--contact-input-border)]
            text-[var(--contact-input-text)]
            focus:ring-4 focus:ring-[var(--contact-input-focus)]
          "
        />
        {errors.brief && <Err>{errors.brief}</Err>}
      </div>

      <div
        className="
          rounded-xl px-4 py-3
          border border-[var(--contact-panel-border)]
          bg-[var(--contact-panel-bg)]
        "
      >
        <div className="text-sm text-[var(--contact-ghost-text)]">
          <strong>Quick review:</strong> {form.name || "—"} •{" "}
          {form.email || "—"} • {form.phone || "—"} • {form.country || "—"}{" "}
          {form.city ? `(${form.city})` : ""}
          <br />
          <span className="opacity-80">
            {form.sector || "—"} • {form.needs.join(", ") || "—"} •{" "}
            {form.stage || "—"}
          </span>
        </div>
      </div>
    </>
  );
}

/* ===== Small shared UI bits ===== */
function Label({ children }) {
  return (
    <label className="text-sm font-medium text-[var(--contact-ghost-text)]">
      {children}
    </label>
  );
}
function Err({ children }) {
  return (
    <div className="mt-1 text-xs text-[var(--contact-danger)]">{children}</div>
  );
}
function Input({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={[
          "mt-1 w-full rounded-lg border px-3 py-2 outline-none",
          "bg-[var(--contact-input-bg)] border-[var(--contact-input-border)]",
          "text-[var(--contact-input-text)] focus:ring-4 focus:ring-[var(--contact-input-focus)]",
          error
            ? "border-[var(--contact-danger)] focus:ring-[var(--contact-danger)]/30"
            : "",
        ].join(" ")}
      />
      {error ? <Err>{error}</Err> : null}
    </div>
  );
}

/* ===== Select & Country ===== */
export function SelectShell({
  children,
  name,
  value,
  defaultValue,
  onChange,
  disabled,
  placeholder,
}) {
  return (
    <div className="relative">
      <select
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => onChange && onChange(e.target.value)}
        disabled={disabled}
        className="
          mt-1 w-full appearance-none rounded-lg
          bg-[var(--contact-input-bg)]
          border border-[var(--contact-input-border)]
          px-3 py-2 pr-8 outline-none
          text-[var(--contact-input-text)]
          focus:ring-4 focus:ring-[var(--contact-input-focus)] disabled:opacity-60
        "
        aria-placeholder={placeholder}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-2 grid place-items-center text-[var(--contact-ghost-text-muted)]">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path d="M6 8l4 4 4-4" />
        </svg>
      </span>
    </div>
  );
}

export function CountrySelect({ name, value, onChange }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("https://restcountries.com/v2/all?fields=name");
        const data = await res.json();
        const filtered = (data || [])
          .filter((c) => (c.name || "").toLowerCase() !== "israel")
          .sort((a, b) => a.name.localeCompare(b.name));
        if (alive) setList(filtered);
      } catch {
        if (alive) setList([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);
  return (
    <SelectShell
      name={name}
      value={value}
      onChange={onChange}
      placeholder={loading ? "Loading countries…" : "Select country…"}
    >
      <option value="" disabled>
        {loading ? "Loading countries…" : "Select country…"}
      </option>
      {list.map((c) => (
        <option key={c.name} value={c.name}>
          {c.name}
        </option>
      ))}
    </SelectShell>
  );
}
