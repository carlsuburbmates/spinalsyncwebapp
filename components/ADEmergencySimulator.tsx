import React, { useState } from "react";

interface ADEmergencySimulatorProps {
  initialBP?: number;
  initialHR?: number;
}

const triggers = [
  { name: "Bladder Distension", risk: "High" },
  { name: "Bowel Impaction", risk: "High" },
  { name: "Skin Injury", risk: "Medium" },
  { name: "Tight Clothing", risk: "Medium" },
  { name: "Other", risk: "Variable" },
];

export default function ADEmergencySimulator({ initialBP = 110, initialHR = 70 }: ADEmergencySimulatorProps) {
  const [bp, setBP] = useState(initialBP);
  const [hr, setHR] = useState(initialHR);
  const [trigger, setTrigger] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState<string>("");
  const [resolved, setResolved] = useState(false);

  function handleTriggerSelect(selected: string) {
    setTrigger(selected);
    setStep(1);
    setMessage("AD triggered! BP rising rapidly. What is your first action?");
    setBP(180);
    setHR(60);
  }

  function handleAction(action: string) {
    if (step === 1) {
      if (action === "Sit Upright") {
        setMessage("Correct! Sitting upright helps lower BP. Next, loosen clothing and check for triggers.");
        setStep(2);
      } else {
        setMessage("Incorrect. The first action is to sit the patient upright.");
      }
    } else if (step === 2) {
      setMessage(`You check for triggers: ${trigger}. What do you do next?`);
      setStep(3);
    } else if (step === 3) {
      setMessage("Trigger removed. BP returning to normal. AD episode resolved.");
      setBP(initialBP);
      setHR(initialHR);
      setResolved(true);
    }
  }

  return (
    <div className="ad-emergency-simulator">
      <h2>Autonomic Dysreflexia Emergency Simulator</h2>
      <div>
        <strong>Blood Pressure:</strong> {bp}/{Math.round(bp * 0.6)} mmHg<br/>
        <strong>Heart Rate:</strong> {hr} bpm
      </div>
      {!trigger && (
        <div>
          <h3>Select a trigger to simulate:</h3>
          {triggers.map((t) => (
            <button key={t.name} onClick={() => handleTriggerSelect(t.name)}>{t.name}</button>
          ))}
        </div>
      )}
      {trigger && !resolved && (
        <div>
          <p>{message}</p>
          {step === 1 && (
            <div>
              <button onClick={() => handleAction("Sit Upright")}>Sit Upright</button>
              <button onClick={() => handleAction("Lay Flat")}>Lay Flat</button>
              <button onClick={() => handleAction("Give Medication")}>Give Medication</button>
            </div>
          )}
          {step === 2 && (
            <div>
              <button onClick={() => handleAction("Check Trigger")}>Check Trigger</button>
            </div>
          )}
          {step === 3 && (
            <div>
              <button onClick={() => handleAction("Remove Trigger")}>Remove Trigger</button>
            </div>
          )}
        </div>
      )}
      {resolved && (
        <div>
          <h3>AD Episode Resolved</h3>
          <p>BP and HR normalized. Patient is safe.</p>
          <button onClick={() => { setTrigger(null); setStep(0); setResolved(false); setMessage(""); setBP(initialBP); setHR(initialHR); }}>Restart Simulation</button>
        </div>
      )}
    </div>
  );
}
