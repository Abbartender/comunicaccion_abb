/* global React, ReactDOM */
const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "terracotta",
  "headerStyle": "manifesto",
  "showQuoteBand": true,
  "density": "comfortable"
}/*EDITMODE-END*/;

const PALETTES = {
  terracotta: { copper: "oklch(0.66 0.17 42)",  dk: "oklch(0.50 0.15 38)",  bg: "oklch(0.165 0.014 40)",  bg2: "oklch(0.205 0.016 40)" },
  amber:      { copper: "oklch(0.74 0.135 70)", dk: "oklch(0.58 0.12 65)",  bg: "oklch(0.17 0.012 70)",   bg2: "oklch(0.21 0.014 70)"  },
  absinthe:   { copper: "oklch(0.74 0.13 130)", dk: "oklch(0.55 0.12 130)", bg: "oklch(0.17 0.012 145)",  bg2: "oklch(0.21 0.014 145)" },
  vermouth:   { copper: "oklch(0.66 0.18 18)",  dk: "oklch(0.50 0.16 18)",  bg: "oklch(0.16 0.014 25)",   bg2: "oklch(0.20 0.016 25)"  }
};

function App(){
  const { TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakSelect, TweakToggle } = window;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const root = document.documentElement.style;
    const p = PALETTES[t.palette] || PALETTES.terracotta;
    root.setProperty("--copper", p.copper);
    root.setProperty("--copper-dk", p.dk);
    root.setProperty("--bg", p.bg);
    root.setProperty("--bg-2", p.bg2);
  }, [t.palette]);

  useEffect(() => {
    const h1 = document.querySelector(".hero h1");
    if (!h1) return;
    if (t.headerStyle === "manifesto") {
      h1.innerHTML = '<span class="es">No es servicio.</span><span class="accion">Es comunic<span class="aa">aa</span>ción.</span>';
    } else if (t.headerStyle === "direct") {
      h1.innerHTML = '<span class="accion">Hablá<br/>para <span class="aa">ser</span><br/>escuchado.</span>';
    } else if (t.headerStyle === "question") {
      h1.innerHTML = '<span class="es">¿Y si el problema</span><span class="accion">no era <span class="aa">lo que decís</span>?</span>';
    }
  }, [t.headerStyle]);

  useEffect(() => {
    const band = document.querySelector(".band");
    if (band) band.style.display = t.showQuoteBand ? "" : "none";
  }, [t.showQuoteBand]);

  useEffect(() => {
    const map = { tight: "70px", comfortable: "110px", spacious: "140px" };
    document.querySelectorAll("section.s").forEach(s => {
      s.style.paddingTop = map[t.density];
      s.style.paddingBottom = map[t.density];
    });
  }, [t.density]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Paleta">
        <TweakSelect
          label="Acento"
          value={t.palette}
          onChange={v => setTweak("palette", v)}
          options={[
            { value: "terracotta", label: "Terracotta (marca)" },
            { value: "amber",      label: "Ámbar" },
            { value: "absinthe",   label: "Absenta" },
            { value: "vermouth",   label: "Vermouth" }
          ]}
        />
      </TweakSection>

      <TweakSection label="Hero">
        <TweakSelect
          label="Titular"
          value={t.headerStyle}
          onChange={v => setTweak("headerStyle", v)}
          options={[
            { value: "manifesto", label: "Manifiesto — No es servicio." },
            { value: "direct",    label: "Directo — Hablá para ser escuchado." },
            { value: "question",  label: "Pregunta — ¿Y si el problema no era…?" }
          ]}
        />
      </TweakSection>

      <TweakSection label="Layout">
        <TweakRadio
          label="Densidad"
          value={t.density}
          onChange={v => setTweak("density", v)}
          options={[
            { value: "tight",        label: "Tight" },
            { value: "comfortable",  label: "Med" },
            { value: "spacious",     label: "Aire" }
          ]}
        />
        <TweakToggle
          label="Cita central visible"
          value={t.showQuoteBand}
          onChange={v => setTweak("showQuoteBand", v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<App />);
