(()=>{
  const certificates=[
    {id:'agile',after:1,weeks:[1],title:'Agile Explorer',provider:'IBM SkillsBuild',note:'Digital Credential في أساسيات Agile ومبادئه وممارساته.',url:'https://skillsbuild.org/students/course-catalog/agile',cost:'مجاني'},
    {id:'ba',after:5,weeks:[2,3,4,5],title:'Getting Started with Business Analysis',provider:'Simplilearn SkillUp',note:'شهادة إتمام في Business Analysis وRequirements وElicitation وProcess Modeling.',url:'https://www.simplilearn.com/cbap-basics-skillup',cost:'مجاني'},
    {id:'qa',afterSelector:'.qaTrack',tasks:['qa-1','qa-2','qa-3','qa-4','qa-5','qa-6'],title:'Manual Testing Expert',provider:'BrowserStack Test University',note:'شهادة عملية في Manual Testing وCross-Browser Testing وتشخيص المشاكل على متصفحات وأجهزة مختلفة.',url:'https://www.browserstack.com/test-university',cost:'مجاني'},
    {id:'sql',after:7,weeks:[7],title:'SQL (Basic) Skills Certification',provider:'HackerRank',note:'اختبار مهارة عملي لإثبات أساسيات SQL.',url:'https://www.hackerrank.com/skills-directory/sql_basic',cost:'مجاني'},
    {id:'api',after:8,weeks:[8],title:'REST API (Intermediate) Skills Certification',provider:'HackerRank',note:'اختبار مهارة في استهلاك REST APIs والفلترة والترتيب والـPagination.',url:'https://www.hackerrank.com/skills-directory/rest_api_intermediate',cost:'مجاني'},
    {id:'cloud',after:9,weeks:[9],title:'Cloud Computing Fundamentals',provider:'IBM SkillsBuild',note:'Digital Credential في Cloud Services وDeployment وVirtualization وCloud Security.',url:'https://skillsbuild.org/college-students/course-catalog/cloud-computing-fundamentals',cost:'مجاني'}
  ];

  const style=document.createElement('style');
  style.textContent=`
    .certMilestone{grid-column:1/-1;display:grid;grid-template-columns:auto 1fr auto;gap:16px;align-items:center;padding:18px 20px;border:1px solid var(--line);border-radius:17px;background:linear-gradient(135deg,var(--surface),var(--brandSoft));box-shadow:var(--shadow);position:relative;overflow:hidden}
    .certMilestone:before{content:'';position:absolute;inset-inline-start:0;top:0;bottom:0;width:4px;background:var(--line)}
    .certMilestone.ready:before{background:var(--ok)}
    .certIcon{width:50px;height:50px;border-radius:14px;display:grid;place-items:center;font-size:23px;background:var(--surface);border:1px solid var(--line)}
    .certEyebrow{display:block;font:800 9px var(--mono);letter-spacing:.11em;color:var(--brand);margin-bottom:2px}
    .certMilestone h4{margin:0;font-size:15px}.certMilestone p{margin:3px 0 7px;color:var(--muted);font-size:11.5px}
    .certMeta{display:flex;gap:6px;flex-wrap:wrap}.certMeta span{padding:3px 7px;border-radius:99px;border:1px solid var(--line);background:var(--surface);font-size:9.5px;font-weight:800;color:var(--muted)}
    .certAction{min-width:150px;text-align:center;padding:10px 12px;border-radius:10px;border:1px solid var(--line);background:var(--surface2);font-size:11px;font-weight:900;color:var(--muted);cursor:not-allowed}
    .certMilestone.ready .certAction{background:var(--ok);border-color:var(--ok);color:#fff;cursor:pointer}.certMilestone.ready .certIcon{border-color:color-mix(in srgb,var(--ok) 45%,var(--line))}
    @media(max-width:620px){.certMilestone{grid-template-columns:auto 1fr}.certAction{grid-column:1/-1;width:100%}}
  `;
  document.head.append(style);

  const weekDone=n=>{
    const w=document.querySelector(`.week[data-week="${n}"]`);
    if(!w)return false;
    const tasks=[...w.querySelectorAll('[data-task]')];
    return tasks.length>0&&tasks.every(t=>t.checked);
  };
  const tasksDone=ids=>ids.every(id=>document.querySelector(`[data-task="${id}"]`)?.checked);

  certificates.forEach(c=>{
    const anchor=c.afterSelector?document.querySelector(c.afterSelector):document.querySelector(`.week[data-week="${c.after}"]`);
    if(!anchor)return;
    const requirement=c.tasks?'Software Testing Module':(c.weeks.length===1?'Week '+String(c.weeks[0]).padStart(2,'0'):'Weeks '+String(c.weeks[0]).padStart(2,'0')+'–'+String(c.weeks.at(-1)).padStart(2,'0'));
    const card=document.createElement('div');
    card.className='certMilestone';
    card.dataset.cert=c.id;
    card.innerHTML=`<div class="certIcon">🎓</div><div><span class="certEyebrow">MILESTONE CERTIFICATE</span><h4>${c.title}</h4><p>${c.note}</p><div class="certMeta"><span>${c.provider}</span><span>${c.cost}</span><span>المطلوب: ${requirement}</span></div></div><a class="certAction" href="#" aria-disabled="true">🔒 أكمل المرحلة أولًا</a>`;
    anchor.insertAdjacentElement('afterend',card);
  });

  function refreshCertificates(){
    certificates.forEach(c=>{
      const card=document.querySelector(`[data-cert="${c.id}"]`);if(!card)return;
      const ready=c.tasks?tasksDone(c.tasks):c.weeks.every(weekDone),a=card.querySelector('.certAction');
      card.classList.toggle('ready',ready);
      if(ready){a.href=c.url;a.target='_blank';a.rel='noopener';a.removeAttribute('aria-disabled');a.textContent='ابدأ الشهادة ↗';}
      else{a.href='#';a.removeAttribute('target');a.setAttribute('aria-disabled','true');a.textContent='🔒 أكمل المرحلة أولًا';}
    });
  }

  document.addEventListener('click',e=>{const a=e.target.closest('.certAction[aria-disabled="true"]');if(a)e.preventDefault();});
  document.querySelectorAll('[data-task]').forEach(t=>t.addEventListener('change',refreshCertificates));
  document.getElementById('resetBtn')?.addEventListener('click',()=>setTimeout(refreshCertificates));
  window.addEventListener('roadmap:progress-loaded',refreshCertificates);
  refreshCertificates();
  setTimeout(refreshCertificates,1200);
})();