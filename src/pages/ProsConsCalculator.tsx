import React, { useState, useEffect, useRef } from 'react';
import './ProsConsCalculator.css';

interface Factor {
  id: number;
  text: string;
  weight: number;
}

interface OptionState {
  name: string;
  pros: Factor[];
  cons: Factor[];
}

const MAX_FACTORS = 5;

let factorIdCounter = 0;
const getId = () => {
  factorIdCounter += 1;
  return factorIdCounter;
};

export default function ProsConsCalculator() {
  const [optionA, setOptionA] = useState<OptionState>({
    name: '',
    pros: [{ id: getId(), text: '', weight: 3 }],
    cons: [{ id: getId(), text: '', weight: 3 }],
  });
  
  const [optionB, setOptionB] = useState<OptionState>({
    name: '',
    pros: [{ id: getId(), text: '', weight: 3 }],
    cons: [{ id: getId(), text: '', weight: 3 }],
  });

  const [results, setResults] = useState<{
    show: boolean;
    scoreA: number;
    scoreB: number;
    margin: number;
  }>({
    show: false,
    scoreA: 0,
    scoreB: 0,
    margin: 0,
  });

  const resultsRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);

  const isValid = () => {
    const checkOption = (opt: OptionState) => 
      opt.name.trim() !== '' && 
      opt.pros.every(f => f.text.trim() !== '') &&
      opt.cons.every(f => f.text.trim() !== '') &&
      opt.pros.length >= 1 && 
      opt.cons.length >= 1;

    return checkOption(optionA) && checkOption(optionB);
  };

  const addFactor = (opt: 'a' | 'b', type: 'pros' | 'cons') => {
    const isA = opt === 'a';
    const setOption = isA ? setOptionA : setOptionB;
    const optionState = isA ? optionA : optionB;
    
    if (optionState[type].length >= MAX_FACTORS) return;

    setOption({
      ...optionState,
      [type]: [...optionState[type], { id: getId(), text: '', weight: 3 }]
    });
  };

  const deleteFactor = (opt: 'a' | 'b', type: 'pros' | 'cons', id: number) => {
    const isA = opt === 'a';
    const setOption = isA ? setOptionA : setOptionB;
    const optionState = isA ? optionA : optionB;

    if (optionState[type].length <= 1) return;

    setOption({
      ...optionState,
      [type]: optionState[type].filter(f => f.id !== id)
    });
  };

  const updateFactor = (opt: 'a' | 'b', type: 'pros' | 'cons', id: number, field: 'text' | 'weight', value: string | number) => {
    const isA = opt === 'a';
    const setOption = isA ? setOptionA : setOptionB;
    const optionState = isA ? optionA : optionB;

    setOption({
      ...optionState,
      [type]: optionState[type].map(f => f.id === id ? { ...f, [field]: value } : f)
    });
  };

  const calculateWinner = () => {
    const rawScore = (opt: OptionState) => {
      const proAvg = opt.pros.reduce((sum, f) => sum + f.weight, 0) / opt.pros.length;
      const conAvg = opt.cons.reduce((sum, f) => sum + f.weight, 0) / opt.cons.length;
      return proAvg - conAvg;
    };

    const normalizeScore = (raw: number) => {
      return Math.round(Math.min(100, Math.max(0, ((raw + 4) / 8) * 100)));
    };

    const scoreA = normalizeScore(rawScore(optionA));
    const scoreB = normalizeScore(rawScore(optionB));

    setResults({
      show: true,
      scoreA,
      scoreB,
      margin: Math.abs(scoreA - scoreB)
    });

    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getScoreInfo = (score: number) => {
    if (score >= 85) return { color: 'var(--color-green)', label: 'Clear Leader' };
    if (score >= 65) return { color: 'var(--color-accent)', label: 'Strong Choice' };
    if (score >= 45) return { color: 'var(--color-amber)', label: 'Competitive' };
    return { color: 'var(--color-purple)', label: 'Marginal' };
  };

  const renderFactorRow = (opt: 'a' | 'b', type: 'pros' | 'cons', factor: Factor, listLength: number) => {
    const pct = ((factor.weight - 1) / 4) * 100;
    const sliderStyle = {
      background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${pct}%, var(--color-surface-secondary) ${pct}%, var(--color-surface-secondary) 100%)`
    };

    return (
      <div key={factor.id} className="factor-row">
        <input
          type="text"
          className="factor-input"
          placeholder={type === 'pros' ? 'Add a pro...' : 'Add a con...'}
          value={factor.text}
          onChange={(e) => updateFactor(opt, type, factor.id, 'text', e.target.value)}
          autoComplete="off"
        />
        <div className="slider-wrapper">
          <input
            type="range"
            className="weight-slider"
            min="1"
            max="5"
            step="1"
            value={factor.weight}
            onChange={(e) => updateFactor(opt, type, factor.id, 'weight', parseInt(e.target.value))}
            style={sliderStyle}
          />
          <span className="weight-value">{factor.weight}</span>
        </div>
        <button
          className="delete-btn"
          onClick={() => deleteFactor(opt, type, factor.id)}
          title="Remove"
          style={listLength <= 1 ? { opacity: 0.25, pointerEvents: 'none' } : {}}
        >
          ×
        </button>
      </div>
    );
  };

  return (
    <div className="pros-cons-calculator">
      <div className="container">
        {/* ===== HEADER ===== */}
        <header className="header" id="page-header">
          <span style={{display:'inline-block', fontSize:'11px', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--color-accent)', marginBottom:'16px', fontWeight:600}}>
            Claritee
          </span>
          <div className="logo-wrapper">
            <div className="claritee-logo">
              <span className="logo-c">C</span>
              <span className="logo-dot"></span>
            </div>
          </div>
          <h1>Weighted Pros/Cons Calculator</h1>
          <p>Weight what matters. See who wins.</p>
        </header>

        {/* ===== FORM SECTION ===== */}
        <section id="input-form" ref={formRef}>
          {/* Decision Question */}
          <div className="decision-section card">
            <label className="input-label" htmlFor="decision-input">Your Decision</label>
            <input type="text" id="decision-input" className="text-input" placeholder="e.g. Should I take the new job offer?" autoComplete="off" />
          </div>

          {/* Options Grid */}
          <div className="options-grid">
            {/* Option A */}
            <div className="option-card">
              <input 
                type="text" 
                className="option-name-input" 
                placeholder="Option A" 
                autoComplete="off" 
                value={optionA.name}
                onChange={(e) => setOptionA(prev => ({...prev, name: e.target.value}))}
              />

              <div className="section-label pros">PROS</div>
              <div className="factors-list">
                {optionA.pros.map((f) => renderFactorRow('a', 'pros', f, optionA.pros.length))}
              </div>
              <button 
                className={`add-btn ${optionA.pros.length >= MAX_FACTORS ? 'disabled' : ''}`}
                onClick={() => addFactor('a', 'pros')}
              >
                <span className="plus-icon">+</span> Add Pro
              </button>

              <div className="section-divider"></div>

              <div className="section-label cons">CONS</div>
              <div className="factors-list">
                {optionA.cons.map((f) => renderFactorRow('a', 'cons', f, optionA.cons.length))}
              </div>
              <button 
                className={`add-btn ${optionA.cons.length >= MAX_FACTORS ? 'disabled' : ''}`}
                onClick={() => addFactor('a', 'cons')}
              >
                <span className="plus-icon">+</span> Add Con
              </button>
            </div>

            {/* Option B */}
            <div className="option-card">
              <input 
                type="text" 
                className="option-name-input" 
                placeholder="Option B" 
                autoComplete="off" 
                value={optionB.name}
                onChange={(e) => setOptionB(prev => ({...prev, name: e.target.value}))}
              />

              <div className="section-label pros">PROS</div>
              <div className="factors-list">
                {optionB.pros.map((f) => renderFactorRow('b', 'pros', f, optionB.pros.length))}
              </div>
              <button 
                className={`add-btn ${optionB.pros.length >= MAX_FACTORS ? 'disabled' : ''}`}
                onClick={() => addFactor('b', 'pros')}
              >
                <span className="plus-icon">+</span> Add Pro
              </button>

              <div className="section-divider"></div>

              <div className="section-label cons">CONS</div>
              <div className="factors-list">
                {optionB.cons.map((f) => renderFactorRow('b', 'cons', f, optionB.cons.length))}
              </div>
              <button 
                className={`add-btn ${optionB.cons.length >= MAX_FACTORS ? 'disabled' : ''}`}
                onClick={() => addFactor('b', 'cons')}
              >
                <span className="plus-icon">+</span> Add Con
              </button>
            </div>
          </div>

          <button className="calculate-btn" disabled={!isValid()} onClick={calculateWinner}>
            Calculate Winner
          </button>
        </section>

        {/* ===== RESULTS SECTION ===== */}
        {results.show && (
          <section className="results-section" ref={resultsRef}>
            <div className="results-header">
              <h2>Decision Outcome</h2>
            </div>
            <ScoreCards scoreA={results.scoreA} scoreB={results.scoreB} nameA={optionA.name} nameB={optionB.name} getScoreInfo={getScoreInfo} />

            <div className="result-summary">
              <p>
                {results.margin > 5 
                  ? `${results.scoreA > results.scoreB ? optionA.name : optionB.name} leads with a ${results.margin}-point margin.`
                  : 'These options are closely matched. Adjusting weights may shift the result.'}
              </p>
            </div>

            <button className="adjust-btn" onClick={scrollToForm}>
              Adjust Weights
            </button>

            <div className="cta-banner">
              <div className="cta-text">
                <h3>Want the full 6-step decision analysis?</h3>
                <p>Claritee is launching soon — join the waitlist for early access.</p>
              </div>
              <a href="https://clariteeai.me/waitlist" className="cta-btn" target="_blank" rel="noopener noreferrer">
                Join the Waitlist →
              </a>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function ScoreCards({ scoreA, scoreB, nameA, nameB, getScoreInfo }: any) {
  const aWins = scoreA > scoreB;
  const bWins = scoreB > scoreA;
  
  const infoA = getScoreInfo(scoreA);
  const infoB = getScoreInfo(scoreB);
  
  const circumference = 2 * Math.PI * 58;
  const offsetA = circumference - (circumference * scoreA / 100);
  const offsetB = circumference - (circumference * scoreB / 100);

  return (
    <div className="score-cards-grid">
      <div className={`score-card ${aWins ? 'winner' : ''}`}>
        <span className={`winner-badge ${aWins ? 'is-winner' : ''}`}>{aWins ? 'WINNER' : ''}</span>
        <div className="score-card-name">{nameA}</div>
        <div className="score-ring-wrapper">
          <svg className="score-ring-svg" viewBox="0 0 140 140">
            <circle className="score-ring-bg" cx="70" cy="70" r="58"></circle>
            <circle className="score-ring-progress" cx="70" cy="70" r="58" 
              strokeDasharray={circumference} 
              strokeDashoffset={offsetA} 
              style={{ stroke: infoA.color }}
            ></circle>
          </svg>
          <div className="score-number">{scoreA}</div>
        </div>
        <div className="score-label">{infoA.label}</div>
      </div>

      <div className={`score-card ${bWins ? 'winner' : ''}`}>
        <span className={`winner-badge ${bWins ? 'is-winner' : ''}`}>{bWins ? 'WINNER' : ''}</span>
        <div className="score-card-name">{nameB}</div>
        <div className="score-ring-wrapper">
          <svg className="score-ring-svg" viewBox="0 0 140 140">
            <circle className="score-ring-bg" cx="70" cy="70" r="58"></circle>
            <circle className="score-ring-progress" cx="70" cy="70" r="58" 
              strokeDasharray={circumference} 
              strokeDashoffset={offsetB} 
              style={{ stroke: infoB.color }}
            ></circle>
          </svg>
          <div className="score-number">{scoreB}</div>
        </div>
        <div className="score-label">{infoB.label}</div>
      </div>
    </div>
  );
}
