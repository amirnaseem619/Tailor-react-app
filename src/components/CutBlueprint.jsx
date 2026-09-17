import React from 'react';
import { useApp } from '../context/AppContext';
import { Scissors } from 'lucide-react';

export default function CutBlueprint() {
  const { activeCustomer, setActiveCustomer } = useApp();

  if (!activeCustomer) return null;

  const designs = activeCustomer.designs || {
    collarStyle: 'Gol',
    cuffStyle: 'Kaf-dar',
    pocketStyle: 'Pocket',
    damanStyle: 'Round'
  };

  const setDesign = (category, value) => {
    setActiveCustomer(prev => ({
      ...prev,
      designs: {
        ...prev.designs,
        [category]: value
      }
    }));
  };

  // Collar Styles with uploaded high-resolution atelier cut sketches
  const collarOptions = [
    {
      id: 'Qasimi',
      nameEn: 'Qasimi',
      nameUr: 'قاسمی',
      imgSrc: '/patterns/collar_qasimi.png',
      svg: null
    },
    {
      id: 'Gol',
      nameEn: 'Gol',
      nameUr: 'گول',
      imgSrc: '/patterns/collar_gol.png',
      svg: null
    },
    {
      id: 'Chaar Kunj',
      nameEn: 'Chaar Kunj',
      nameUr: 'چارکنج',
      svg: (
        <svg width="44" height="28" viewBox="0 0 44 28" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 8 22 L 8 8 L 36 8 L 36 22" />
          <path d="M 16 8 L 16 18 L 28 18 L 28 8" strokeDasharray="2 2" />
        </svg>
      )
    },
    {
      id: 'Collar',
      nameEn: 'Collar',
      nameUr: 'کالر دار',
      svg: (
        <svg width="44" height="28" viewBox="0 0 44 28" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 4 8 L 16 22 L 22 14 L 28 22 L 40 8 Z" />
          <path d="M 16 8 L 28 8" />
        </svg>
      )
    },
    {
      id: 'Hindi',
      nameEn: 'Hindi',
      nameUr: 'ہندی',
      imgSrc: '/patterns/collar_hindi.png',
      svg: null
    },
    {
      id: 'Sada',
      nameEn: 'Sada',
      nameUr: 'سادہ',
      imgSrc: '/patterns/collar_sada.png',
      svg: null
    }
  ];

  // Cuff Options
  const cuffOptions = [
    {
      id: 'Kaf-dar',
      nameEn: 'Kaf-dar',
      nameUr: '(کف‌دار)',
      svg: (
        <svg width="34" height="24" viewBox="0 0 34 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="4" width="22" height="16" rx="2" />
          <line x1="6" y1="12" x2="28" y2="12" strokeDasharray="2 2" />
          <circle cx="23" cy="8" r="1" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'Plain',
      nameEn: 'Plain',
      nameUr: '(سادہ)',
      svg: (
        <svg width="34" height="24" viewBox="0 0 34 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 8 4 L 8 20 L 26 20 L 26 4" />
        </svg>
      )
    }
  ];

  // Pocket Options
  const pocketOptions = [
    {
      id: 'Pocket',
      nameEn: 'Pocket',
      nameUr: '(جیب‌دار)',
      svg: (
        <svg width="30" height="26" viewBox="0 0 30 26" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 6 6 L 24 6 L 24 16 C 24 22, 15 24, 15 24 C 15 24, 6 22, 6 16 Z" />
        </svg>
      )
    },
    {
      id: 'No Pocket',
      nameEn: 'No Pocket',
      nameUr: '(بےجیب)',
      svg: (
        <svg width="30" height="26" viewBox="0 0 30 26" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="15" cy="13" r="9" />
          <line x1="9" y1="7" x2="21" y2="19" />
        </svg>
      )
    }
  ];

  // Daman Edge Options
  const damanOptions = [
    {
      id: 'Round',
      nameEn: 'Round',
      nameUr: '(گول)',
      svg: (
        <svg width="34" height="24" viewBox="0 0 34 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 6 4 L 6 14 C 6 20, 28 20, 28 14 L 28 4" />
        </svg>
      )
    },
    {
      id: 'Square',
      nameEn: 'Square',
      nameUr: '(راستہ/چورس)',
      svg: (
        <svg width="34" height="24" viewBox="0 0 34 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 6 4 L 6 20 L 28 20 L 28 4" />
        </svg>
      )
    }
  ];

  return (
    <div className="bench-card">
      {/* Header */}
      <div className="bench-card-header">
        <div className="bench-header-left">
          <div style={{ color: '#2563EB', display: 'flex', alignItems: 'center' }}>
            <Scissors size={22} />
          </div>
          <div className="card-title-group">
            <h2>Architectural Cut Blueprint (طرح‌های یخن، کف و دامن)</h2>
            <p>Traditional Tailor Sketches &amp; Pattern Elements</p>
          </div>
        </div>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: '#6B7280'
          }}
        >
          CLICK SKETCHES TO SELECT
        </span>
      </div>

      <div className="blueprint-section">
        {/* Collar Cut Section */}
        <div>
          <div className="cut-category-title">
            <span className="cut-cat-name">Collar Cut (یخن)</span>
            <span className="cut-active-tag">
              {designs.collarStyle}{' '}
              {collarOptions.find(c => c.id === designs.collarStyle)?.nameUr &&
                `(${collarOptions.find(c => c.id === designs.collarStyle)?.nameUr})`}
            </span>
          </div>

          <div className="collar-cards-grid">
            {collarOptions.map((item) => {
              const isSelected = designs.collarStyle === item.id;
              return (
                <div
                  key={item.id}
                  className={`blueprint-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => setDesign('collarStyle', item.id)}
                >
                  {item.imgSrc ? (
                    <img
                      src={item.imgSrc}
                      alt={item.nameEn}
                      className="blueprint-card-img"
                    />
                  ) : (
                    item.svg
                  )}
                  <div className="blueprint-en-name">{item.nameEn}</div>
                  <div className="blueprint-ur-name">{item.nameUr}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sub-row: Cuff, Pocket, and Daman */}
        <div className="sub-cut-row">
          {/* Cuff */}
          <div>
            <div className="cut-category-title">
              <span className="cut-cat-name">Cuff / Kaf (کف)</span>
              <span className="cut-active-tag">{designs.cuffStyle}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {cuffOptions.map((item) => {
                const isSelected = designs.cuffStyle === item.id;
                return (
                  <div
                    key={item.id}
                    className={`blueprint-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setDesign('cuffStyle', item.id)}
                  >
                    {item.svg}
                    <div className="blueprint-en-name">{item.nameEn}</div>
                    <div className="blueprint-ur-name">{item.nameUr}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pocket */}
          <div>
            <div className="cut-category-title">
              <span className="cut-cat-name">Pocket (جیب)</span>
              <span className="cut-active-tag">{designs.pocketStyle}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {pocketOptions.map((item) => {
                const isSelected = designs.pocketStyle === item.id;
                return (
                  <div
                    key={item.id}
                    className={`blueprint-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setDesign('pocketStyle', item.id)}
                  >
                    {item.svg}
                    <div className="blueprint-en-name">{item.nameEn}</div>
                    <div className="blueprint-ur-name">{item.nameUr}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Daman Edge */}
          <div>
            <div className="cut-category-title">
              <span className="cut-cat-name">Daman Edge (دامن)</span>
              <span className="cut-active-tag">{designs.damanStyle}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {damanOptions.map((item) => {
                const isSelected = designs.damanStyle === item.id;
                return (
                  <div
                    key={item.id}
                    className={`blueprint-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setDesign('damanStyle', item.id)}
                  >
                    {item.svg}
                    <div className="blueprint-en-name">{item.nameEn}</div>
                    <div className="blueprint-ur-name">{item.nameUr}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
