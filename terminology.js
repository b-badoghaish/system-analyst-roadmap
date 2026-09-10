(()=>{
'use strict';
if(document.getElementById('terminology')) return;

const terms=[
  {term:'SDLC',full:'Software Development Life Cycle',cat:'Foundation',ar:'دورة حياة تطوير النظام من التخطيط إلى الصيانة.',use:'لما نتكلم عن مراحل بناء وتشغيل النظام بالكامل.'},
  {term:'Deployment',full:'Deployment',cat:'Foundation',ar:'نشر النسخة على البيئة الفعلية لتصبح متاحة للاستخدام.',use:'بعد نجاح الاختبار وتجهيز النسخة للإطلاق.'},
  {term:'Go-Live',full:'Go-Live',cat:'Foundation',ar:'لحظة بدء استخدام النظام فعليًا في بيئة الإنتاج.',use:'يوم أو نقطة الانتقال من التجهيز إلى التشغيل الحقيقي.'},
  {term:'Maintenance',full:'Maintenance',cat:'Foundation',ar:'الصيانة والتحديثات والإصلاحات بعد الإطلاق.',use:'بعد الـGo-Live عند ظهور Bugs أو تحسينات أو تحديثات.'},
  {term:'Impact Analysis',full:'Impact Analysis',cat:'Analysis',ar:'تحليل تأثير أي تغيير مقترح قبل تنفيذه.',use:'مثلاً إضافة تسجيل دخول عبر نفاذ أثناء التطوير ودراسة أثره على الشاشات والتكامل والوقت.'},
  {term:'UAT',full:'User Acceptance Testing',cat:'Testing',ar:'اختبار قبول المستخدم للتأكد أن النظام يحقق المطلوب منه.',use:'لما يجرب العميل أو ممثلوه السيناريوهات قبل الاعتماد.'},
  {term:'SaaS',full:'Software as a Service',cat:'Architecture',ar:'تقديم البرنامج كخدمة مستضافة يستخدمها العميل عبر الإنترنت.',use:'لما نقول نحول النظام إلى SaaS بدل نسخة مستقلة لكل عميل.'},
  {term:'Scrum',full:'Scrum Framework',cat:'Scrum',ar:'إطار عمل لتنظيم تطوير المنتج بشكل تكراري على فترات قصيرة.',use:'لما يكون العمل مقسم إلى Sprints مع Backlog ومراجعات مستمرة.'},
  {term:'Product Owner',full:'Product Owner',cat:'Scrum',ar:'المسؤول عن تعظيم قيمة المنتج وترتيب الـProduct Backlog.',use:'يرتب الأولويات ويوضح ما يحتاجه المنتج للفريق.'},
  {term:'Product Backlog',full:'Product Backlog',cat:'Scrum',ar:'القائمة الشاملة لكل الأعمال والطلبات والأفكار المعروفة للمنتج.',use:'كل ما قد نحتاج تطويره موجود هنا قبل اختياره لسبرنت معين.'},
  {term:'PBI',full:'Product Backlog Item',cat:'Scrum',ar:'عنصر واحد داخل الـProduct Backlog مثل Feature أو تحسين أو إصلاح.',use:'لما نشير إلى طلب محدد داخل الباك لوق.'},
  {term:'Sprint Planning',full:'Sprint Planning',cat:'Scrum',ar:'اجتماع بداية السبرنت لتحديد الهدف والعمل الذي سيتم أخذه.',use:'نختار من الـProduct Backlog ما سيدخل في السبرنت القادم.'},
  {term:'Sprint',full:'Sprint',cat:'Scrum',ar:'فترة زمنية ثابتة يعمل خلالها الفريق لتحقيق Sprint Goal.',use:'هي مدة العمل نفسها، وليست الناتج.'},
  {term:'Sprint Backlog',full:'Sprint Backlog',cat:'Scrum',ar:'العمل المختار للسبرنت الحالي مع الخطة اللازمة لإنجازه.',use:'الأشياء التي التزم الفريق بالعمل عليها خلال السبرنت الحالي.'},
  {term:'Increment',full:'Increment',cat:'Scrum',ar:'الناتج المكتمل والقابل للاستخدام الذي أُضيف للمنتج خلال السبرنت.',use:'مثلاً ميزة تسجيل المتقدمين بعد إكمالها واختبارها.'},
  {term:'Sprint Review',full:'Sprint Review',cat:'Scrum',ar:'مراجعة ناتج السبرنت مع أصحاب المصلحة وأخذ Feedback.',use:'نراجع الـIncrement ونحدد ما الذي تغير أو يحتاج تعديلًا في الـBacklog.'},
  {term:'Sprint Retrospective',full:'Sprint Retrospective',cat:'Scrum',ar:'اجتماع لتحسين طريقة عمل الفريق نفسه.',use:'وش مشى كويس؟ وش ما مشى؟ وكيف نحسن السبرنت القادم؟'},
  {term:'Daily Scrum',full:'Daily Scrum',cat:'Scrum',ar:'اجتماع يومي قصير للفريق لمراجعة التقدم والتنسيق تجاه Sprint Goal.',use:'يساعد الفريق يضبط خطته اليومية ويكشف العوائق مبكرًا.'},
  {term:'Self-Managing Team',full:'Self-Managing Team',cat:'Scrum',ar:'فريق ينظم داخليًا من يعمل على ماذا وكيف ينجز العمل.',use:'الفريق يدير طريقة التنفيذ وتوزيع العمل داخليًا بدل انتظار توزيع تفصيلي من مدير.'},
  {term:'Stakeholder',full:'Stakeholder',cat:'Analysis',ar:'أي شخص أو جهة تؤثر في النظام أو تتأثر به.',use:'مثل العميل، المستخدم النهائي، الإدارة، الدعم، أو جهة تكامل.'}
];

const style=document.createElement('style');
style.textContent=`
#terminology .termTop{display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap;margin:18px 0 16px}
#terminology .termSearch{flex:1;min-width:220px;max-width:520px;border:1px solid var(--line);background:var(--surface);color:var(--text);border-radius:12px;padding:12px 14px;font:inherit;outline:none}
#terminology .termSearch:focus{border-color:var(--brand);box-shadow:0 0 0 3px color-mix(in srgb,var(--brand) 12%,transparent)}
#terminology .termCount{font:700 12px var(--mono);color:var(--muted)}
#terminology .termGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
#terminology .termCard{background:var(--surface);border:1px solid var(--line);border-radius:15px;padding:16px;box-shadow:var(--shadow)}
#terminology .termHead{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:9px}
#terminology .termName{direction:ltr;text-align:left;font:800 18px var(--mono);color:var(--brand)}
#terminology .termFull{direction:ltr;text-align:left;font-size:11px;color:var(--muted);margin-top:3px}
#terminology .termCat{white-space:nowrap;background:var(--brandSoft);color:var(--brand);border-radius:999px;padding:5px 8px;font-size:10px;font-weight:800}
#terminology .termMeaning{margin:8px 0 10px;line-height:1.8}
#terminology .termUse{border-top:1px dashed var(--line);padding-top:9px;color:var(--muted);font-size:12px;line-height:1.8}
#terminology .termUse b{color:var(--text)}
#terminology .termEmpty{grid-column:1/-1;text-align:center;padding:28px;color:var(--muted)}
@media(max-width:760px){#terminology .termGrid{grid-template-columns:1fr}}
`;
document.head.append(style);

const section=document.createElement('section');
section.className='section alt';
section.id='terminology';
section.innerHTML=`<div class="container"><span class="eyebrow">ANALYST TERMINOLOGY</span><h2>قاموس المصطلحات</h2><p class="desc">نربط الشيء اللي تعرفه عمليًا باسمه المهني. كل مصطلح نتعلمه بنضيفه هنا عشان يصير استحضاره أسرع في الاجتماعات والشغل.</p><div class="termTop"><input id="termSearch" class="termSearch" type="search" placeholder="ابحث: Sprint, UAT, SaaS..." autocomplete="off"><span id="termCount" class="termCount"></span></div><div id="termGrid" class="termGrid"></div></div>`;

const reference=document.getElementById('reference');
if(reference) reference.insertAdjacentElement('afterend',section);
else document.querySelector('main')?.append(section);

const nav=document.querySelector('.nav');
if(nav){
  const link=document.createElement('a');
  link.href='#terminology';
  link.innerHTML='<span class="n">T</span>قاموس المصطلحات';
  const refLink=nav.querySelector('a[href="#reference"]');
  if(refLink) refLink.insertAdjacentElement('afterend',link); else nav.append(link);
  link.addEventListener('click',()=>{document.getElementById('sidebar')?.classList.remove('open');document.getElementById('overlay')?.classList.remove('show')});
}

const grid=document.getElementById('termGrid'),search=document.getElementById('termSearch'),count=document.getElementById('termCount');
function render(q=''){
  const s=q.trim().toLowerCase();
  const filtered=terms.filter(t=>[t.term,t.full,t.cat,t.ar,t.use].join(' ').toLowerCase().includes(s));
  count.textContent=`${filtered.length} / ${terms.length} مصطلح`;
  grid.innerHTML=filtered.length?filtered.map(t=>`<article class="termCard"><div class="termHead"><div><div class="termName">${t.term}</div><div class="termFull">${t.full}</div></div><span class="termCat">${t.cat}</span></div><div class="termMeaning">${t.ar}</div><div class="termUse"><b>متى أسمعه/أستخدمه؟</b> ${t.use}</div></article>`).join(''):'<div class="termEmpty">ما لقيت مصطلح مطابق.</div>';
}
search.addEventListener('input',e=>render(e.target.value));
render();
})();