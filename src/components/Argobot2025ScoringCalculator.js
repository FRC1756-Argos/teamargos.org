import React, { useMemo, useState } from 'react';
import styles from '../css/ScoringCalculator.module.css';

let actionIdCounter = 0;

const ActionMode = {
  Attempts: 'attempts',
  Cycle: 'cycle',
};

const createAction = (label = '', points = 0, count = 0, mode = ActionMode.Attempts) => ({
  id: `action-${Date.now()}-${actionIdCounter++}`,
  label,
  points,
  count,
  cycleTime: 0,
  maxCycles: 0,
  mode,
});

const makeInitialSections = () => ([
  {
    id: 'teleop',
    name: 'Teleop',
    duration: 135,
    actions: [createAction('Teleop Game Piece', 3)],
  },
  {
    id: 'endgame',
    name: 'End Game',
    duration: 30,
    actions: [createAction('End Game Action', 10)],
  },
]);

const clampNonNegativeNumber = (value) => {
  const numeric = Number(value);
  if (Number.isNaN(numeric) || numeric < 0) {
    return 0;
  }
  return numeric;
};

const formatNumber = (value, digits = 2) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return '0';
  }
  return numeric.toFixed(digits);
};

const calculateActionMetrics = (action, sectionDuration) => {
  const pointsPerScore = clampNonNegativeNumber(action.points);
  const duration = clampNonNegativeNumber(sectionDuration);

  if (action.mode === ActionMode.Cycle) {
    const cycleTime = clampNonNegativeNumber(action.cycleTime);
    if (cycleTime <= 0) {
      return {
        subtotal: 0,
        detail: 'Add cycle time to see cycles',
        cycles: 0,
        valid: false,
        pointsPerSecond: 0,
      };
    }

    const possibleCycles = duration > 0 ? Math.floor(duration / cycleTime) : 0;
    const maxCycles = clampNonNegativeNumber(action.maxCycles);
    const cappedCycles = maxCycles > 0 ? Math.min(possibleCycles, maxCycles) : possibleCycles;
    const subtotal = cappedCycles * pointsPerScore;
    const activeTime = cappedCycles * cycleTime;
    let detail = `${cappedCycles} cycle${cappedCycles === 1 ? '' : 's'} possible`;
    if (maxCycles > 0 && cappedCycles < possibleCycles) {
      detail = `${cappedCycles} cycle${cappedCycles === 1 ? '' : 's'} (capped from ${possibleCycles})`;
    }
    if (activeTime > 0) {
      detail += ` · ${formatNumber(activeTime, activeTime % 1 === 0 ? 0 : 1)}s active`;
    }
    const effectiveDuration = activeTime > 0 ? activeTime : duration;
    return {
      subtotal,
      detail,
      cycles: cappedCycles,
      valid: true,
      pointsPerSecond: effectiveDuration > 0 ? subtotal / effectiveDuration : 0,
    };
  }

  const attempts = clampNonNegativeNumber(action.count);
  const totalPoints = attempts * pointsPerScore;
  const assumedTime = duration > 0 ? duration : 0;
  return {
    subtotal: totalPoints,
    detail: `${attempts} attempt${attempts === 1 ? '' : 's'}`,
    cycles: attempts,
    valid: true,
    pointsPerSecond: assumedTime > 0 ? totalPoints / assumedTime : 0,
  };
};

export default function MatchScoringCalculator() {
  const [sections, setSections] = useState(makeInitialSections);

  const totals = useMemo(() => {
    const perSection = sections.map((section) => {
      const duration = clampNonNegativeNumber(section.duration);
      const sectionPoints = section.actions.reduce((sum, action) => {
        const metrics = calculateActionMetrics(action, duration);
        return sum + metrics.subtotal;
      }, 0);
      const pps = duration > 0 ? sectionPoints / duration : 0;

      return {
        id: section.id,
        points: sectionPoints,
        duration,
        pointsPerSecond: pps,
      };
    });

    const totalPoints = perSection.reduce((sum, section) => sum + section.points, 0);
    const totalDuration = perSection.reduce((sum, section) => sum + section.duration, 0);
    const totalPointsPerSecond = totalDuration > 0 ? totalPoints / totalDuration : 0;

    return {
      perSection,
      totalPoints,
      totalDuration,
      totalPointsPerSecond,
    };
  }, [sections]);

  const updateSection = (sectionId, updater) => {
    setSections((prev) => prev.map((section) => {
      if (section.id !== sectionId) {
        return section;
      }
      return updater(section);
    }));
  };

  const handleDurationChange = (sectionId, value) => {
    updateSection(sectionId, (section) => ({
      ...section,
      duration: clampNonNegativeNumber(value),
    }));
  };

  const handleActionChange = (sectionId, actionId, field, value) => {
    updateSection(sectionId, (section) => ({
      ...section,
      actions: section.actions.map((action) => {
        if (action.id !== actionId) {
          return action;
        }
        if (field === 'label') {
          return { ...action, label: value };
        }
        if (field === 'mode') {
          return { ...action, mode: value };
        }
        return { ...action, [field]: clampNonNegativeNumber(value) };
      }),
    }));
  };

  const addAction = (sectionId) => {
    updateSection(sectionId, (section) => ({
      ...section,
      actions: [...section.actions, createAction('New Action', 0)],
    }));
  };

  const removeAction = (sectionId, actionId) => {
    updateSection(sectionId, (section) => ({
      ...section,
      actions: section.actions.filter((action) => action.id !== actionId),
    }));
  };

  const resetCalculator = () => {
    setSections(makeInitialSections());
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Match Scoring Calculator</h1>
          <p>
            Build your own scoring breakdown for autonomous, teleop, and end game phases.
            Adjust action counts, point values, and phase durations to compare strategies.
          </p>
        </div>
        <button type="button" className={styles.resetButton} onClick={resetCalculator}>
          Reset Calculator
        </button>
      </header>

      <section className={styles.summaryCard}>
        <h2>Match Summary</h2>
        <div className={styles.summaryGrid}>
          <div>
            <span className={styles.summaryLabel}>Total Points</span>
            <span className={styles.summaryValue}>{totals.totalPoints}</span>
          </div>
          <div>
            <span className={styles.summaryLabel}>Total Time (s)</span>
            <span className={styles.summaryValue}>{totals.totalDuration}</span>
          </div>
          <div>
            <span className={styles.summaryLabel}>Points / Second</span>
            <span className={styles.summaryValue}>{formatNumber(totals.totalPointsPerSecond)}</span>
          </div>
        </div>
      </section>

      <div className={styles.sectionGrid}>
        {sections.map((section) => {
          const sectionTotals = totals.perSection.find((item) => item.id === section.id);
          const showRemoveColumn = section.actions.length > 1;

          return (
            <section key={section.id} className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <h2>{section.name}</h2>
                <label className={styles.durationLabel}>
                  Duration (s)
                  <input
                    type="number"
                    min="0"
                    inputMode="decimal"
                    value={section.duration}
                    onChange={(event) => handleDurationChange(section.id, event.target.value)}
                  />
                </label>
              </div>

              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Mode</th>
                    <th>Points</th>
                    <th>Attempts / Cycle Time</th>
                    <th>Subtotal</th>
                    <th>Pts / s</th>
                    {showRemoveColumn && <th aria-label="Delete" />}
                  </tr>
                </thead>
                <tbody>
                  {section.actions.map((action) => {
                    const sectionDuration = clampNonNegativeNumber(section.duration);
                    const metrics = calculateActionMetrics(action, sectionDuration);

                    return (
                      <tr key={action.id}>
                        <td>
                          <input
                            type="text"
                            value={action.label}
                            onChange={(event) => handleActionChange(section.id, action.id, 'label', event.target.value)}
                            placeholder="e.g., Speaker Note"
                          />
                        </td>
                        <td>
                          <select
                            className={styles.modeSelect}
                            value={action.mode}
                            onChange={(event) => handleActionChange(section.id, action.id, 'mode', event.target.value)}
                          >
                            <option value={ActionMode.Attempts}>Attempts</option>
                            <option value={ActionMode.Cycle}>Cycle Time</option>
                          </select>
                        </td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            inputMode="decimal"
                            value={action.points}
                            onChange={(event) => handleActionChange(section.id, action.id, 'points', event.target.value)}
                          />
                        </td>
                        <td>
                          {action.mode === ActionMode.Cycle ? (
                            <div className={styles.controlStack}>
                              <div className={styles.cycleFields}>
                                <label className={styles.fieldLabel}>
                                  <span className={styles.fieldLabelText}>Cycle time (s)</span>
                                  <input
                                    type="number"
                                    min="0"
                                    inputMode="decimal"
                                    value={action.cycleTime}
                                    onChange={(event) => handleActionChange(section.id, action.id, 'cycleTime', event.target.value)}
                                  />
                                </label>
                                <label className={styles.fieldLabel}>
                                  <span className={styles.fieldLabelText}>Max cycles (0 = unlimited)</span>
                                  <input
                                    type="number"
                                    min="0"
                                    inputMode="decimal"
                                    value={action.maxCycles}
                                    onChange={(event) => handleActionChange(section.id, action.id, 'maxCycles', event.target.value)}
                                  />
                                </label>
                              </div>
                              <div className={styles.helperText}>
                                {metrics.valid
                                  ? metrics.detail
                                  : 'Add cycle time to calculate cycles'}
                              </div>
                            </div>
                          ) : (
                            <div className={styles.controlStack}>
                              <label className={styles.fieldLabel}>
                                <span className={styles.fieldLabelText}>Attempts</span>
                                <input
                                  type="number"
                                  min="0"
                                  inputMode="decimal"
                                  value={action.count}
                                  onChange={(event) => handleActionChange(section.id, action.id, 'count', event.target.value)}
                                />
                              </label>
                              <div className={styles.helperText}>{metrics.detail}</div>
                            </div>
                          )}
                        </td>
                        <td>
                          <div className={styles.subtotalValue}>{formatNumber(metrics.subtotal, 2)}</div>
                        </td>
                        <td>
                          <div className={styles.subtotalValue}>{formatNumber(metrics.pointsPerSecond, 2)}</div>
                        </td>
                        {showRemoveColumn && (
                          <td>
                            <button
                              type="button"
                              className={styles.iconButton}
                              onClick={() => removeAction(section.id, action.id)}
                              aria-label={`Remove ${action.label || 'action'}`}
                            >
                              ×
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className={styles.sectionFooter}>
                <button type="button" className={styles.addButton} onClick={() => addAction(section.id)}>
                  + Add Action
                </button>
                <div className={styles.sectionTotals}>
                  <div>
                    <span className={styles.sectionTotalsLabel}>Section Points</span>
                    <span className={styles.sectionTotalsValue}>{sectionTotals?.points ?? 0}</span>
                  </div>
                  <div>
                    <span className={styles.sectionTotalsLabel}>Section Points / Second</span>
                    <span className={styles.sectionTotalsValue}>{formatNumber(sectionTotals?.pointsPerSecond ?? 0)}</span>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
