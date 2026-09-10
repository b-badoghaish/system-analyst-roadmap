(()=>{
'use strict';
const d=document,$=(s,c=d)=>c.querySelector(s),$$=(s,c=d)=>[...c.querySelectorAll(s)],S='sa-roadmap-progress',T='sa-roadmap-theme';

// Practical QA specialization: placed after Requirements/Traceability without changing the 10-week core numbering.
const week5=$('.week[data-week="5"]');
if(week5&&!$('.qaTrack')){
  const style=d.createElement('style');
  style.textContent=`.qaTrack{grid-column:1/-1;background:var(--surface);border:1px solid color-mix(in srgb,var(--brand) 35%,var(--line));border-radius:17px;overflow:hidden;box-shadow:var(--shadow);position:relative}.qaTrack:before{content:'SPECIALIZATION';position:absolute;top:11px;inset-inline-start:16px;font:800 8px var(--mono);letter-spacing:.1em;color:var(--brand);opacity:.72}.qaTrack .weekHead{padding-top:30px}.qaTrack h3{margin:0;font-size:16px}.qaTrack .weekNo{background:linear-gradient(145deg,var(--brandSoft),var(--surface2))}.qaTrack.done{border-color:color-mix(in srgb,var(--ok) 48%,var(--line))}`;
  d.head.append(style);
  const qa=d.createElement('article');
  qa.className='qaTrack';
  qa.dataset.title='Software Testing & Manual QA';
  qa.innerHTML=`<div class="weekHead"><div class="weekNo">QA</div><div><h3>Software Testing & Manual QA</h3><div class="weekSub">Test Cases · Bug Reports · Smoke · Regression · Exploratory Testing</div></div><button class="weekToggle" type="button">⌃</button></div><div class="weekBody"><div class="weekRow"><strong>نتعلم</strong><div class="chips"><span class="chip brand">Manual Testing</span><span class="chip">Test Scenario</span><span class="chip">Test Case</span><span class="chip">Defect</span><span class="chip">Severity / Priority</span><span class="chip">Regression</span></div></div><div class="weekRow"><strong>مصادر الدراسة</strong><div class="sources"><div class="source"><div><strong>ISTQB Foundation Level V4.0 — عربي</strong><small>مرجع منظم لأساسيات الاختبار ومبادئه وتقنياته</small></div><a target="_blank" rel="noopener" href="https://www.udemy.com/course/istqb-foundation-level-ar/">افتح المصدر ↗</a></div><div class="source"><div><strong>Software Testing from Zero — عربي</strong><small>تطبيق عملي: Test Scenarios, Test Cases, Execution, Defect Reporting وJira</small></div><a target="_blank" rel="noopener" href="https://www.udemy.com/course/software-testing-ar/">افتح المصدر ↗</a></div><div class="source"><div><strong>BrowserStack — Software Testing Guide</strong><small>مرجع مجاني للتخطيط والتنفيذ واكتشاف العيوب والاختبار العملي</small></div><a target="_blank" rel="noopener" href="https://www.browserstack.com/guide/learn-software-application-testing">افتح المصدر ↗</a></div></div></div><div class="weekRow"><strong>التطبيق</strong><div class="deliverable">اختبر رحلة التوظيف الموسمي End-to-End وجهّز Test Case Pack + Bug Report حقيقي بصياغة احترافية.</div></div><div class="tasks"><label class="task"><input type="checkbox" data-task="qa-1">أفهم الفرق بين Error وDefect وFailure ومبادئ الاختبار الأساسية</label><label class="task"><input type="checkbox" data-task="qa-2">أكتب Test Scenarios وTest Cases من الـRequirements وAcceptance Criteria</label><label class="task"><input type="checkbox" data-task="qa-3">أطبق Equivalence Partitioning وBoundary Value Analysis وتقنيات الاختبار الأساسية</label><label class="task"><input type="checkbox" data-task="qa-4">أتعلم كتابة Bug Report: Steps + Expected + Actual + Evidence + Environment</label><label class="task"><input type="checkbox" data-task="qa-5">أفرق عمليًا بين Severity وPriority وبين Smoke وSanity وRegression وExploratory Testing</label><label class="task"><input type="checkbox" data-task="qa-6">أنفذ دورة اختبار على التوظيف الموسمي وأجهز Test Case Pack + Defect Log</label></div></div>`;
  week5.insertAdjacentElement('afterend',qa);
}

let saved={};try{saved=JSON.parse(localStorage.getItem(S)||'{}')}catch{}
const tasks=$$('[data-task]'),toast=$('#toast');
function note(t){toast.textContent=t;toast.classList.add('show');clearTimeout(window.__t);window.__t=setTimeout(()=>toast.classList.remove('show'),1200)}
function qaState(){const q=$('.qaTrack');if(q){const a=$$('[data-task]',q);q.classList.toggle('done',a.length>0&&a.every(x=>x.checked))}}
tasks.forEach(x=>{x.checked=!!saved[x.dataset.task];x.addEventListener('change',()=>{saved[x.dataset.task]=x.checked;localStorage.setItem(S,JSON.stringify(saved));update();note('تم حفظ التقدم')})});
function update(){
  const total=tasks.length,done=tasks.filter(x=>x.checked).length,p=total?Math.round(done/total*100):0;
  $('#totalCount').textContent=total;$('#doneCount').textContent=done;$('#overallPct').textContent=p+'%';$('#sidePct').textContent=p+'%';$('#sideBar').style.width=p+'%';
  let current=10;
  $$('.week').forEach(w=>{const c=$$('[data-task]',w),n=c.filter(x=>x.checked).length,wp=c.length?Math.round(n/c.length*100):0;w.classList.toggle('done',wp===100);if(wp<100&&current===10)current=+w.dataset.week});
  const w=$(`.week[data-week="${current}"]`)||$('.week'),c=$$('[data-task]',w),n=c.filter(x=>x.checked).length,wp=c.length?Math.round(n/c.length*100):100;
  $('#currentWeek').textContent=String(current).padStart(2,'0');$('#focusTitle').textContent=`الأسبوع ${String(current).padStart(2,'0')} — ${w.dataset.title}`;$('#focusText').textContent=w.dataset.focus;$('#focusProgress').textContent=wp+'%';
  $$('#artifacts tbody tr').forEach((tr,i)=>{const ww=$(`.week[data-week="${i+1}"]`),all=$$('[data-task]',ww),ok=all.length&&all.every(x=>x.checked),s=$('.status',tr);s.textContent=ok?'Ready':'To Do';s.className='status '+(ok?'ready':'todo')});
  qaState();
}
$$('.weekToggle').forEach(b=>b.onclick=()=>{const card=b.closest('.week,.qaTrack'),body=$('.weekBody',card);body.hidden=!body.hidden;b.textContent=body.hidden?'⌄':'⌃'});
$('#themeBtn').onclick=()=>{const r=d.documentElement,n=r.dataset.theme==='dark'?'light':'dark';r.dataset.theme=n;localStorage.setItem(T,n)};
const theme=localStorage.getItem(T);if(theme)d.documentElement.dataset.theme=theme;
$('#resetBtn').onclick=()=>{if(confirm('تصفير جميع علامات الإنجاز؟')){localStorage.removeItem(S);tasks.forEach(x=>x.checked=false);saved={};update();note('تم تصفير التقدم')}};
const side=$('#sidebar'),ov=$('#overlay');$('#menuBtn').onclick=()=>{side.classList.toggle('open');ov.classList.toggle('show')};ov.onclick=()=>{side.classList.remove('open');ov.classList.remove('show')};$$('.nav a').forEach(a=>a.onclick=()=>{side.classList.remove('open');ov.classList.remove('show')});
update();
})();
import('./cloud.js');
import('./certificates.js');
import('./my-certificates.js');
import('./videos.js');