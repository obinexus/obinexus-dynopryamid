// OBINexus 3D Pyramid Component
// File: src/components/OBINexusPyramid3D.js

import React, { useState, useRef, useEffect } from 'react';
import './OBINexusPyramid3D.css';

const OBINexusPyramid3D = ({ 
  currentLevel = 0, 
  onLevelChange, 
  showUIFlow = true,
  enableFUDMitigation = true 
}) => {
  const [selectedLevel, setSelectedLevel] = useState(currentLevel);
  const [hoveredLevel, setHoveredLevel] = useState(null);
  const [showMetrics, setShowMetrics] = useState(false);
  const [uiFlowStep, setUiFlowStep] = useState('capture');
  
  const svgRef = useRef(null);

  // Level configuration with ODTS metrics
  const levels = [
    { id: 0, color: '#808000', darkColor: '#6B6B00', label: 'Base doodle', d1: 0.0, d2: 0.0, d3: 0.0 },
    { id: 1, color: '#8B7D00', darkColor: '#736700', label: 'Sketch', d1: 0.5, d2: 0.1, d3: 0.0 },
    { id: 2, color: '#9ACD32', darkColor: '#7FA828', label: 'Self-expression', d1: 1.0, d2: 0.3, d3: 0.1 },
    { id: 3, color: '#7CFC00', darkColor: '#65CF00', label: 'User-focused', d1: 1.5, d2: 0.5, d3: 0.2 },
    { id: 4, color: '#32CD32', darkColor: '#29A929', label: 'Cultural', d1: 2.0, d2: 0.7, d3: 0.3 },
    { id: 5, color: '#228B22', darkColor: '#1C6F1C', label: 'Community', d1: 2.5, d2: 0.9, d3: 0.4 },
    { id: 6, color: '#00FF00', darkColor: '#00D100', label: 'Mentorship', d1: 3.0, d2: 1.1, d3: 0.5 },
    { id: 7, color: '#00CED1', darkColor: '#00A8AA', label: 'Self-actualization', d1: 3.5, d2: 1.3, d3: 0.6 },
    { id: 8, color: '#1E90FF', darkColor: '#1876D1', label: 'Active change', d1: 4.0, d2: 1.5, d3: 0.7 },
    { id: 9, color: '#0000FF', darkColor: '#0000D1', label: 'Tech for people', d1: 4.5, d2: 1.7, d3: 0.8 },
    { id: 10, color: '#000080', darkColor: '#000066', label: 'Systemic', d1: 5.0, d2: 2.0, d3: 1.0 }
  ];

  // Calculate isometric pyramid coordinates
  const calculatePyramidPath = (level, totalLevels = 11) => {
    const baseWidth = 400;
    const baseHeight = 40;
    const pyramidHeight = 400;
    const levelHeight = pyramidHeight / totalLevels;
    const shrinkFactor = 0.09;
    
    const y = pyramidHeight - (level + 1) * levelHeight + 100;
    const width = baseWidth * (1 - shrinkFactor * level);
    const xOffset = (baseWidth - width) / 2 + 200;
    
    // Isometric transformation
    const iso = (x, y, z) => ({
      x: x - z * 0.5,
      y: y + z * 0.25
    });
    
    const frontTL = iso(xOffset, y, 0);
    const frontTR = iso(xOffset + width, y, 0);
    const frontBL = iso(xOffset + shrinkFactor * baseWidth / 2, y + levelHeight, 0);
    const frontBR = iso(xOffset + width - shrinkFactor * baseWidth / 2, y + levelHeight, 0);
    
    const depth = 50;
    const backTL = iso(xOffset, y, depth);
    const backTR = iso(xOffset + width, y, depth);
    
    return {
      front: `M ${frontTL.x} ${frontTL.y} L ${frontTR.x} ${frontTR.y} L ${frontBR.x} ${frontBR.y} L ${frontBL.x} ${frontBL.y} Z`,
      right: `M ${frontTR.x} ${frontTR.y} L ${backTR.x} ${backTR.y} L ${backTR.x} ${backTR.y + levelHeight} L ${frontBR.x} ${frontBR.y} Z`,
      top: level === 10 
        ? `M ${frontTL.x} ${frontTL.y} L ${frontTR.x} ${frontTR.y} L ${backTR.x} ${backTR.y} L ${backTL.x} ${backTL.y} Z`
        : '',
      center: {
        x: (frontTL.x + frontTR.x) / 2,
        y: (frontTL.y + frontBL.y) / 2
      }
    };
  };

  const handleLevelClick = (level) => {
    setSelectedLevel(level);
    if (onLevelChange) onLevelChange(level);
    
    // FUD mitigation feedback
    if (enableFUDMitigation) {
      console.log(`Level ${level} selected - Progress tracked`);
    }
  };

  // UI/UX Flow Component
  const UIFlowIndicator = () => (
    <div className="ui-flow-container">
      <div className={`flow-step ${uiFlowStep === 'capture' ? 'active' : ''}`}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <rect x="10" y="10" width="20" height="20" fill="#666" />
          <circle cx="20" cy="20" r="5" fill="#fff" />
        </svg>
        <span>UI Capture</span>
      </div>
      <div className="flow-arrow">→</div>
      <div className={`flow-step ${uiFlowStep === 'interaction' ? 'active' : ''}`}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="15" fill="none" stroke="#666" strokeWidth="2" />
          <circle cx="20" cy="20" r="3" fill="#666" />
          <line x1="20" y1="5" x2="20" y2="15" stroke="#666" strokeWidth="2" />
          <line x1="35" y1="20" x2="25" y2="20" stroke="#666" strokeWidth="2" />
          <line x1="20" y1="35" x2="20" y2="25" stroke="#666" strokeWidth="2" />
          <line x1="5" y1="20" x2="15" y2="20" stroke="#666" strokeWidth="2" />
        </svg>
        <span>UX Interaction</span>
      </div>
      <div className="flow-arrow">→</div>
      <div className={`flow-step ${uiFlowStep === 'output' ? 'active' : ''}`}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <rect x="5" y="10" width="30" height="20" fill="none" stroke="#666" strokeWidth="2" />
          <text x="20" y="25" textAnchor="middle" fontSize="12" fill="#666">OUT</text>
        </svg>
        <span>Output</span>
      </div>
    </div>
  );

  return (
    <div className="obinexus-pyramid-3d">
      <div className="pyramid-header">
        <h1>OBINexus Artistic-Tech Expression Scale</h1>
        <p>Dynamic 0-10 Level Tracking with ODTS Integration</p>
      </div>

      {showUIFlow && <UIFlowIndicator />}

      <div className="pyramid-viewport">
        <svg
          ref={svgRef}
          viewBox="0 0 800 600"
          xmlns="http://www.w3.org/2000/svg"
          className="pyramid-svg"
        >
          {/* 3D Pyramid Layers */}
          {levels.map((level) => {
            const paths = calculatePyramidPath(level.id);
            return (
              <g
                key={level.id}
                className="pyramid-layer-3d"
                onMouseEnter={() => setHoveredLevel(level.id)}
                onMouseLeave={() => setHoveredLevel(null)}
                onClick={() => handleLevelClick(level.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* Front face */}
                <path
                  d={paths.front}
                  fill={level.color}
                  opacity={hoveredLevel === level.id ? 0.8 : 1}
                  stroke={selectedLevel === level.id ? '#fff' : 'none'}
                  strokeWidth="2"
                />
                {/* Right face */}
                <path
                  d={paths.right}
                  fill={level.darkColor}
                  opacity={hoveredLevel === level.id ? 0.8 : 1}
                />
                {/* Top face for level 10 */}
                {paths.top && (
                  <path
                    d={paths.top}
                    fill={level.darkColor}
                    opacity={hoveredLevel === level.id ? 0.8 : 1}
                  />
                )}
                {/* Level number */}
                <text
                  x={paths.center.x}
                  y={paths.center.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="16"
                  fontWeight="bold"
                  pointerEvents="none"
                >
                  {level.id}
                </text>
              </g>
            );
          })}

          {/* Side annotations */}
          <text x="50" y="300" fontSize="14" fill="#666" transform="rotate(-90 50 300)">
            Art as Abstract Protocol
          </text>
          <text x="750" y="300" fontSize="14" fill="#666" transform="rotate(90 750 300)">
            Functional + Aesthetic Integration
          </text>
        </svg>

        {/* Metrics Panel */}
        {selectedLevel !== null && (
          <div className="metrics-panel">
            <h3>Level {selectedLevel}: {levels[selectedLevel].label}</h3>
            <div className="metrics-grid">
              <div className="metric">
                <span className="metric-label">D1 (Rate):</span>
                <span className="metric-value">{levels[selectedLevel].d1}</span>
              </div>
              <div className="metric">
                <span className="metric-label">D2 (Accel):</span>
                <span className="metric-value">{levels[selectedLevel].d2}</span>
              </div>
              <div className="metric">
                <span className="metric-label">D3 (Stability):</span>
                <span className="metric-value">{levels[selectedLevel].d3}</span>
              </div>
            </div>
            {enableFUDMitigation && (
              <div className="fud-mitigation">
                <span className="status-indicator active"></span>
                Progress tracked & verified
              </div>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="pyramid-legend">
        {levels.map((level) => (
          <div key={level.id} className="legend-item">
            <div className="color-box" style={{ background: level.color }}></div>
            <span>Level {level.id}: {level.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OBINexusPyramid3D;
