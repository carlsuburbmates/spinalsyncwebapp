// Minimal data bootstrap; in production, fetch from Google Sheets or a JSON endpoint.
const state = {
  modules: [
    { module_id:1, title:'Introduction to SCI', category:'Foundation', summary:'Overview of SCI, ASIA, functional potential', objectives:['Understand SCI basics'], order:1 },
    { module_id:2, title:'Role of the Primary Nurse', category:'Foundation', summary:'Scope and processes', objectives:['Define PN role'], order:2 },
    { module_id:3, title:'Bowel Management', category:'Body Systems', summary:'Reflex vs flaccid, routines, safety', objectives:['Differentiate bowel types','Establish routine'], order:3 },
    { module_id:4, title:'Bladder Management', category:'Body Systems', summary:'Catheters, trials, scripts', objectives:['Bladder options'], order:4 },
    { module_id:5, title:'Skin Care', category:'Core', summary:'Prevention and treatment', objectives:['Skin checks'], order:5 },
    { module_id:6, title:'Mobility & Positioning', category:'Core', summary:'Spinal precautions', objectives:['Safe positioning'], order:6 },
    { module_id:7, title:'SCI Complications', category:'Complications', summary:'AD, HO, etc.', objectives:['Recognize complications'], order:7 },
    { module_id:8, title:'Respiratory Management', category:'Body Systems', summary:'Airway, assist cough', objectives:['Resp care'], order:8 },
    { module_id:9, title:'Sexual Health', category:'Core', summary:'Counselling and referrals', objectives:['Discuss sexual health'], order:9 },
    { module_id:10, title:'Pain Management', category:'Core', summary:'Pain types and strategies', objectives:['Manage pain'], order:10 },
    { module_id:11, title:'Nutrition', category:'Core', summary:'Diet in SCI care', objectives:['Nutrition in SCI'], order:11 }
  ],
  interactive: [
    { module_id:3, type:'Protocol', title:'Autonomic Dysreflexia', config:'link://emergency_protocols/AD' },
  ],
  assessments: [
    { module_id:3, difficulty:'Basic', title:'Bowel basics quiz', type:'MCQ' }
  ],
  crossRefs: [
    { module_id:3, related_module_id:5, relation_type:'Skin safety' }
  ],
  resources: [
    { title:'Primary Nursing e-Booklet', type:'InternalPDF', url:'#' }
  ],
  progress:{ completed:0, pending_quizzes:1 }
};

// Tab switching
document.querySelectorAll('.tabs button').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.tabs button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;
    document.querySelectorAll('.tab').forEach(s=>s.classList.remove('active'));
    document.getElementById(tab).classList.add('active');
  });
});

// Dashboard
document.getElementById('kpi-modules').textContent = state.modules.length;
document.getElementById('kpi-complete').textContent = state.progress.completed;
document.getElementById('kpi-pending').textContent = state.progress.pending_quizzes;

// Modules list
const list = document.getElementById('module-list');
state.modules.sort((a,b)=>a.order-b.order).forEach(m=>{
  const li = document.createElement('li');
  li.className='card-item';
  li.innerHTML = `<strong>${m.title}</strong><div>${m.category}</div><p>${m.summary}</p>`;
  li.addEventListener('click',()=>openModule(m.module_id));
  list.appendChild(li);
});

function openModule(id){
  const m = state.modules.find(x=>x.module_id===id);
  if(!m) return;
  document.getElementById('module-detail').classList.remove('hidden');
  document.getElementById('md-title').textContent = m.title;
  document.getElementById('md-summary').textContent = m.summary;
  document.getElementById('md-objectives').innerHTML = (m.objectives||[]).map(o=>`<li>${o}</li>`).join('');

  // Interactive
  const inter = state.interactive.filter(x=>x.module_id===id);
  const ulI = document.getElementById('md-interactive'); ulI.innerHTML='';
  inter.forEach(x=>{
    const li = document.createElement('li');
    li.className='card-item';
    li.textContent = `${x.type}: ${x.title}`;
    ulI.appendChild(li);
  });

  // Assessments
  const as = state.assessments.filter(x=>x.module_id===id);
  const ulA = document.getElementById('md-assessments'); ulA.innerHTML='';
  as.forEach(x=>{
    const li = document.createElement('li');
    li.className='card-item';
    li.textContent = `${x.title} (${x.difficulty})`;
    ulA.appendChild(li);
  });

  // Related
  const rel = state.crossRefs.filter(x=>x.module_id===id);
  const ulR = document.getElementById('md-related'); ulR.innerHTML='';
  rel.forEach(r=>{
    const rm = state.modules.find(x=>x.module_id===r.related_module_id);
    if(!rm) return;
    const li = document.createElement('li');
    li.className='card-item';
    li.textContent = rm.title + ' — ' + r.relation_type;
    ulR.appendChild(li);
  });
}
