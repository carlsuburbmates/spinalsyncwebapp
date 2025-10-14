// Module: Bladder Complications Recognition
// Category: Module 1 - Bladder Management System
// Injury Level: All (focus on T6+ for AD) | Duration: 5 min | Priority: Critical | Difficulty: Advanced

import React from 'react';

const BladderComplications: React.FC = () => (
  <div className="module-content">
    <h1>Bladder Complications Recognition</h1>
    <p><strong>Description:</strong> This module focuses on recognizing and managing common bladder complications after spinal cord injury, with special attention to urinary tract infections and autonomic dysreflexia prevention and management.</p>
    <h2>Common Bladder Complications After SCI</h2>
    <p>People with spinal cord injuries face increased risks of bladder complications due to neurogenic bladder dysfunction, catheter use, and altered immune responses. Early recognition and prompt management of these complications are essential to prevent serious health consequences and maintain quality of life.</p>
    <h3>1. Urinary Tract Infections (UTIs)</h3>
    <ul>
      <li>Most common bladder complication after SCI</li>
      <li>Risk factors: incomplete emptying, catheter use, reduced immunity, stones, poor hygiene, sexual activity</li>
      <li>Signs: cloudy/strong-smelling/bloody urine, fever, spasticity, malaise, pain, changes in emptying, increased AD in T6+</li>
      <li>Prevention: hygiene, complete emptying, fluids, avoid prolonged catheters, monitor for infection, treat early</li>
    </ul>
    <h3>2. Bladder Stones</h3>
    <ul>
      <li>Formed due to incomplete emptying, infections, urine chemistry changes</li>
      <li>Signs: blood in urine, more UTIs, pain, difficulty catheterizing, urine flow changes</li>
    </ul>
    <h3>3. Vesicoureteral Reflux</h3>
    <ul>
      <li>Backward flow of urine to kidneys, can cause damage</li>
      <li>Risk: high bladder pressures, poor compliance, frequent UTIs</li>
    </ul>
    <h3>4. Autonomic Dysreflexia (AD)</h3>
    <ul>
      <li>Life-threatening, affects T6 and above</li>
      <li>Triggers: bladder overdistension, catheter issues, UTIs, stones, procedures</li>
      <li>Signs: sudden severe headache, sweating, flushing, congestion, high BP, bradycardia/tachycardia, anxiety, blurred vision, nausea</li>
      <li>Immediate management: sit upright, loosen clothing, check bladder/catheter, monitor BP, call emergency if persists</li>
      <li>Prevention: regular emptying, patent catheters, treat UTIs, anesthetic gel, monitor during care</li>
    </ul>
    <h3>5. Kidney Complications</h3>
    <ul>
      <li>Hydronephrosis, chronic kidney disease, stones</li>
      <li>Warning signs: AD, high fever, inability to catheterize, severe pain, blood in urine, confusion, rapid decline</li>
    </ul>
    <h3>Regular Monitoring and Follow-up</h3>
    <ul>
      <li>Annual kidney tests, urine analysis, BP monitoring, review management, technique checks</li>
      <li>Self-monitor: urine color/odor, temperature, BP, volumes, spasticity, wellbeing</li>
    </ul>
    <h2>Learning Objectives</h2>
    <ol>
      <li>Identify common bladder complications following SCI, including UTIs, retention, and stones</li>
      <li>Recognize signs and symptoms of AD linked to bladder issues in T6+</li>
      <li>Describe practical steps to prevent and manage complications</li>
      <li>Explain the importance of timely reporting and regular monitoring</li>
    </ol>
    <h2>Assessment Questions</h2>
    <ol>
      <li>
        <strong>Which is the most common bladder complication after SCI and a leading cause of hospitalization?</strong>
        <ul>
          <li>A. Bladder stones</li>
          <li>B. Urinary tract infection (UTI)</li>
          <li>C. Bladder cancer</li>
          <li>D. Vesicoureteral reflux</li>
        </ul>
        <strong>Answer:</strong> B. Urinary tract infection (UTI)<br/>
        <em>Explanation:</em> UTIs occur frequently due to incomplete bladder emptying, catheter use, and bacterial colonization, making them the most common bladder complication post-SCI and a major cause of hospital admission.
      </li>
      <li>
        <strong>A patient with a T4 SCI reports a sudden pounding headache, sweating above injury, and congestion. What is the most appropriate immediate action?</strong>
        <ul>
          <li>A. Lay the patient flat and monitor vital signs</li>
          <li>B. Sit the patient upright and check for bladder distension or catheter blockage</li>
          <li>C. Administer a diuretic</li>
          <li>D. Encourage more fluids</li>
        </ul>
        <strong>Answer:</strong> B. Sit the patient upright and check for bladder distension or catheter blockage<br/>
        <em>Explanation:</em> These symptoms suggest autonomic dysreflexia, a medical emergency. Sit upright, lower BP, and identify/remove the trigger—often bladder distension or catheter blockage.
      </li>
      <li>
        <strong>Which is NOT a recommended strategy to prevent UTIs in people with SCI?</strong>
        <ul>
          <li>A. Adhering to clean intermittent catheterization</li>
          <li>B. Maintaining adequate fluid intake</li>
          <li>C. Using antibiotics prophylactically long-term</li>
          <li>D. Regular monitoring for infection</li>
        </ul>
        <strong>Answer:</strong> C. Using antibiotics prophylactically on a long-term basis<br/>
        <em>Explanation:</em> Long-term prophylactic antibiotics are not routinely recommended due to resistance and side effects. Prevention focuses on hygiene, hydration, and early detection.
      </li>
    </ol>
  </div>
);

export default BladderComplications;
