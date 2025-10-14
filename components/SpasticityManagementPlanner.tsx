import React, { useState } from "react";

interface SpasticityManagementPlannerProps {
  initialPlan?: string;
}

const strategies = [
  "Stretching and Range of Motion Exercises",
  "Oral Medications (baclofen, tizanidine)",
  "Botulinum Toxin Injections",
  "Physical Therapy",
  "Trigger Management (UTI, skin, bowel)",
  "Splinting and Positioning",
  "Surgical Interventions (rare)"
];

export default function SpasticityManagementPlanner({ initialPlan = "" }: SpasticityManagementPlannerProps) {
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([]);
  const [notes, setNotes] = useState(initialPlan);
  const [showSummary, setShowSummary] = useState(false);

  function toggleStrategy(strategy: string) {
    setSelectedStrategies((prev) =>
      prev.includes(strategy)
        ? prev.filter((s) => s !== strategy)
        : [...prev, strategy]
    );
  }

  function handleSave() {
    setShowSummary(true);
  }

  function handleReset() {
    setSelectedStrategies([]);
    setNotes("");
    setShowSummary(false);
  }

  return (
    <div className="spasticity-management-planner">
      <h2>Spasticity Management Planner</h2>
      {!showSummary ? (
        <>
          <h3>Select Management Strategies:</h3>
          <ul>
            {strategies.map((strategy) => (
              <li key={strategy}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedStrategies.includes(strategy)}
                    onChange={() => toggleStrategy(strategy)}
                  />
                  {strategy}
                </label>
              </li>
            ))}
          </ul>
          <h3>Notes / Individualized Plan:</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
            placeholder="Add notes, goals, or triggers here..."
          />
          <br/>
          <button onClick={handleSave}>Save Plan</button>
          <button onClick={handleReset} style={{ marginLeft: 8 }}>Reset</button>
        </>
      ) : (
        <div>
          <h3>Management Plan Summary</h3>
          <ul>
            {selectedStrategies.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p><strong>Notes:</strong> {notes || "None"}</p>
          <button onClick={handleReset}>Edit Plan</button>
        </div>
      )}
    </div>
  );
}
