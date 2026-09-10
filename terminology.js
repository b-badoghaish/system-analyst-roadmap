(async()=>{
'use strict';
const section=document.getElementById('terminology');

function addIndexLink(){
  const nav=document.querySelector('.nav');
  if(!nav||nav.querySelector('a[href="terminology.html"]')) return;
  const link=document.createElement('a');
  link.href='terminology.html';
  link.innerHTML='<span class="n">T</span>قاموس المصطلحات';
  const refLink=nav.querySelector('a[href="#reference"]');
  if(refLink) refLink.insertAdjacentElement('afterend',link); else nav.append(link);
}
if(!section){addIndexLink();return;}

const builtIn=[
  {term:'SDLC',full:'Software Development Life Cycle',cat:'Foundation',ar:'دورة حياة تطوير النظام من التخطيط إلى الصيانة.',use:'لما نتكلم عن مراحل بناء وتشغيل النظام بالكامل.'},
  {term:'Agile',full:'Agile',cat:'Foundation',ar:'فكر ومبادئ للعمل بشكل تدريجي ومرن مع Feedback مستمر والتكيف مع التغيير.',use:'لما نقسم العمل إلى أجزاء صغيرة ونسلم قيمة بشكل متكرر بدل انتظار المشروع كاملًا.'},
  {term:'Scrum',full:'Scrum Framework',cat:'Scrum',ar:'إطار عمل يساعد الفرق على تطبيق أفكار Agile بطريقة منظمة.',use:'لما نستخدم Sprints وBacklogs وأحداث Scrum لتنظيم تطوير المنتج.'},
  {term:'Deployment',full:'Deployment',cat:'Foundation',ar:'نشر النسخة على البيئة الفعلية لتصبح متاحة للاستخدام.',use:'بعد نجاح الاختبار وتجهيز النسخة للإطلاق.'},
  {term:'Go-Live',full:'Go-Live',cat:'Foundation',ar:'لحظة بدء استخدام النظام فعليًا في بيئة الإنتاج.',use:'يوم أو نقطة الانتقال من التجهيز إلى التشغيل الحقيقي.'},
  {term:'Maintenance',full:'Maintenance',cat:'Foundation',ar:'الصيانة والتحديثات والإصلاحات بعد الإطلاق.',use:'بعد الـGo-Live عند ظهور Bugs أو تحسينات أو تحديثات.'},
  {term:'Impact Analysis',full:'Impact Analysis',cat:'Analysis',ar:'تحليل تأثير أي تغيير مقترح قبل تنفيذه.',use:'مثلاً إضافة تسجيل دخول عبر نفاذ أثناء التطوير ودراسة أثره على الشاشات والتكامل والوقت.'},
  {term:'UAT',full:'User Acceptance Testing',cat:'Testing',ar:'اختبار قبول المستخدم للتأكد أن النظام يحقق المطلوب منه.',use:'لما يجرب العميل أو ممثلوه السيناريوهات قبل الاعتماد.'},
  {term:'SaaS',full:'Software as a Service',cat:'Architecture',ar:'تقديم البرنامج كخدمة مستضافة يستخدمها العميل عبر الإنترنت.',use:'لما نقول نحول النظام إلى SaaS بدل نسخة مستقلة لكل عميل.'},
  {term:'Product Owner',full:'Product Owner',cat:'Scrum',ar:'المسؤول عن تعظيم قيمة المنتج وترتيب الـProduct Backlog.',use:'يرتب الأولويات ويوضح ما يحتاجه المنتج للفريق.'},
  {term:'Product Backlog',full:'Product Backlog',cat:'Scrum',ar:'القائمة الشاملة لكل الأعمال والطلبات والأفكار المعروفة للمنتج.',use:'كل ما قد نحتاج تطويره موجود هنا قبل اختياره لسبرنت معين.'},
  {term:'PBI',full:'Product Backlog Item',cat:'Scrum',ar:'عنصر واحد داخل الـProduct Backlog مثل Feature أو تحسين أو إصلاح.',use:'لما نشير إلى طلب محدد داخل الباك لوق.'},
  {term:'Sprint Planning',full:'Sprint Planning',cat:'Scrum',ar:'اجتماع بداية السبرنت لتحديد الهدف والعمل الذي سيتم أخذه.',use:'نختار من الـProduct Backlog ما سيدخل في السبرنت القادم.'},
  {term:'Sprint',full:'Sprint',cat:'Scrum',ar:'فترة زمنية ثابتة يعمل خلالها الفريق لتحقيق Sprint Goal.',use:'هي مدة العمل نفسها، وليست الناتج.'},
  {term:'Sprint Backlog',full:'Sprint Backlog',cat:'Scrum',ar:'العمل المختار للسبرنت الحالي مع الخطة اللازمة لإنجازه.',use:'الأشياء التي سيعمل عليها الفريق خلال السبرنت الحالي.'},
  {term:'Increment',full:'Increment',cat:'Scrum',ar:'الناتج المكتمل والقابل للاستخدام الذي أُضيف للمنتج خلال السبرنت.',use:'مثلاً ميزة تسجيل المتقدمين بعد إكمالها واختبارها.'},
  {term:'Sprint Review',full:'Sprint Review',cat:'Scrum',ar:'مراجعة ناتج السبرنت مع أصحاب المصلحة وأخذ Feedback.',use:'نراجع الـIncrement ونرى ما الذي تغير أو يحتاج تعديلًا في الـBacklog.'},
  {term:'Sprint Retrospective',full:'Sprint Retrospective',cat:'Scrum',ar:'اجتماع لتحسين طريقة عمل الفريق نفسه.',use:'وش مشى كويس؟ وش ما مشى؟ وكيف نحسن السبرنت القادم؟'},
  {term:'Daily Scrum',full:'Daily Scrum',cat:'Scrum',ar:'اجتماع يومي قصير للفريق لمراجعة التقدم والتنسيق تجاه Sprint Goal.',use:'يساعد الفريق يضبط خطته اليومية ويكشف العوائق مبكرًا.'},
  {term:'Self-Managing Team',full:'Self-Managing Team',cat:'Scrum',ar:'فريق ينظم داخليًا من يعمل على ماذا وكيف ينجز العمل.',use:'الفريق يدير طريقة التنفيذ وتوزيع العمل داخليًا بدل انتظار توزيع تفصيلي من مدير.'},
  {term:'Stakeholder',full:'Stakeholder',cat:'Analysis',ar:'أي شخص أو جهة تؤثر في المشروع أو تتأثر به.',use:'مثل العميل، المستخدم النهائي، الإدارة، المستشار، فريق التشغيل، أو جهة تكامل.'}
].map((x,i)=>({...x,id:`built-${i}`,builtIn:true}));

const style=document.createElement('style');
style.textContent=`
#terminology .termTop{display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap;margin:18px 0 16px}
#terminology .termSearch,#terminology .termInput,#terminology .termArea{border:1px solid var(--line);background:var(--surface);color:var(--text);border-radius:12px;padding:12px 14px;font:inherit;outline:none;width:100%;box-sizing:border-box}
#terminology .termSearch{flex:1;min-width:220px;max-width:520px}
#terminology .termSearch:focus,#terminology .termInput:focus,#terminology .termArea:focus{border-color:var(--brand);box-shadow:0 0 0 3px color-mix(in srgb,var(--brand) 12%,transparent)}
#terminology .termCount{font:700 12px var(--mono);color:var(--muted)}
#terminology .termAddBtn,#terminology .termSave,#terminology .termCancel,#terminology .termAction{border:1px solid var(--line);border-radius:10px;background:var(--surface);color:var(--text);padding:9px 12px;font:inherit;cursor:pointer}
#terminology .termAddBtn,#terminology .termSave{background:var(--brand);border-color:var(--brand);color:#fff;font-weight:800}
#terminology .termForm{background:var(--surface);border:1px solid var(--line);border-radius:15px;padding:16px;margin:0 0 16px;box-shadow:var(--shadow)}
#terminology .termForm[hidden]{display:none}.termFormGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.termFormGrid .wide{grid-column:1/-1}.termLabel{display:block;font-size:11px;color:var(--muted);margin:0 0 5px}.termArea{min-height:78px;resize:vertical}.termFormActions{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}.termFormMsg{font-size:12px;margin-top:9px;color:var(--muted)}
#terminology .termGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
#terminology .termCard{background:var(--surface);border:1px solid var(--line);border-radius:15px;padding:16px;box-shadow:var(--shadow)}
#terminology .termHead{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:9px}.termBadges{display:flex;gap:6px;align-items:center;flex-wrap:wrap}
#terminology .termName{direction:ltr;text-align:left;font:800 18px var(--mono);color:var(--brand)}#terminology .termFull{direction:ltr;text-align:left;font-size:11px;color:var(--muted);margin-top:3px}
#terminology .termCat,#terminology .termOwn{white-space:nowrap;background:var(--brandSoft);color:var(--brand);border-radius:999px;padding:5px 8px;font-size:10px;font-weight:800}.termOwn{opacity:.8}
#terminology .termMeaning{margin:8px 0 10px;line-height:1.8}#terminology .termUse{border-top:1px dashed var(--line);padding-top:9px;color:var(--muted);font-size:12px;line-height:1.8}#terminology .termUse b{color:var(--text)}
#terminology .termActions{display:flex;gap:7px;margin-top:12px}.termAction{padding:6px 9px;font-size:11px}.termDelete{color:#d95050}.termEmpty{grid-column:1/-1;text-align:center;padding:28px;color:var(--muted)}
@media(max-width:760px){#terminology .termGrid,.termFormGrid{grid-template-columns:1fr}.termFormGrid .wide{grid-column:auto}}
`;
document.head.append(style);

section.innerHTML=`<div class="container"><div class="pageIntro"><span class="eyebrow">ANALYST TERMINOLOGY</span><h2>قاموس المصطلحات</h2><p>مصطلحات المسار الأساسية موجودة، وأنت تقدر تضيف مصطلحاتك الخاصة وتعدلها أو تحذفها من أي جهاز.</p></div><div class="termTop"><input id="termSearch" class="termSearch" type="search" placeholder="ابحث: Sprint, UAT, SaaS..." autocomplete="off"><button id="termAddBtn" class="termAddBtn" type="button">＋ إضافة مصطلح</button><span id="termCount" class="termCount"></span></div><form id="termForm" class="termForm" hidden><div class="termFormGrid"><div><label class="termLabel">المصطلح *</label><input id="fTerm" class="termInput" required placeholder="مثال: API"></div><div><label class="termLabel">الاسم الكامل</label><input id="fFull" class="termInput" placeholder="Application Programming Interface"></div><div><label class="termLabel">التصنيف</label><input id="fCat" class="termInput" placeholder="Analysis / Scrum / Testing..."></div><div class="wide"><label class="termLabel">المعنى *</label><textarea id="fMeaning" class="termArea" required placeholder="اشرحه بطريقتك"></textarea></div><div class="wide"><label class="termLabel">متى أسمعه أو أستخدمه؟</label><textarea id="fUse" class="termArea" placeholder="مثال عملي من الشغل"></textarea></div></div><div class="termFormActions"><button class="termSave" type="submit">حفظ</button><button id="termCancel" class="termCancel" type="button">إلغاء</button></div><div id="termFormMsg" class="termFormMsg"></div></form><div id="termGrid" class="termGrid"></div></div>`;

const {createClient}=await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
const sb=createClient('https://ymbktbnswlpfjshayude.supabase.co','sb_publishable_YdaalUm7Na2geEyCtIMf0w_3-Y_vWPG');
const {data:{session}}=await sb.auth.getSession();
if(!session){location.replace('login.html');return;}
const user=session.user;
let custom=[],editing=null;
const $=id=>document.getElementById(id),grid=$('termGrid'),search=$('termSearch'),count=$('termCount'),form=$('termForm'),msg=$('termFormMsg');
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function openForm(item=null){
  editing=item?.id||null;form.hidden=false;msg.textContent='';
  $('fTerm').value=item?.term||'';$('fFull').value=item?.full||'';$('fCat').value=item?.cat||'';$('fMeaning').value=item?.ar||'';$('fUse').value=item?.use||'';
  form.querySelector('.termSave').textContent=editing?'حفظ التعديل':'حفظ';
  $('fTerm').focus();
}
function closeForm(){editing=null;form.hidden=true;form.reset();msg.textContent='';form.querySelector('.termSave').textContent='حفظ';}
function allTerms(){return [...builtIn,...custom];}
function render(q=''){
  const s=q.trim().toLowerCase();
  const filtered=allTerms().filter(t=>[t.term,t.full,t.cat,t.ar,t.use].join(' ').toLowerCase().includes(s));
  count.textContent=`${filtered.length} / ${allTerms().length} مصطلح`;
  grid.innerHTML=filtered.length?filtered.map(t=>`<article class="termCard"><div class="termHead"><div><div class="termName">${esc(t.term)}</div><div class="termFull">${esc(t.full)}</div></div><div class="termBadges"><span class="termCat">${esc(t.cat||'General')}</span>${t.builtIn?'':'<span class="termOwn">خاص</span>'}</div></div><div class="termMeaning">${esc(t.ar)}</div>${t.use?`<div class="termUse"><b>متى أسمعه/أستخدمه؟</b> ${esc(t.use)}</div>`:''}${t.builtIn?'':`<div class="termActions"><button class="termAction" data-edit="${t.id}" type="button">تعديل</button><button class="termAction termDelete" data-delete="${t.id}" type="button">حذف</button></div>`}</article>`).join(''):'<div class="termEmpty">ما لقيت مصطلح مطابق.</div>';
}
async function load(){
  const {data,error}=await sb.from('user_terminology').select('id,term,full_name,category,meaning,usage_note,created_at').eq('user_id',user.id).order('created_at',{ascending:false});
  if(error){console.error(error);msg.textContent='تعذر تحميل مصطلحاتك الخاصة.';return;}
  custom=(data||[]).map(x=>({id:x.id,term:x.term,full:x.full_name||'',cat:x.category||'General',ar:x.meaning,use:x.usage_note||'',builtIn:false}));
  render(search.value);
}
$('termAddBtn').onclick=()=>openForm();$('termCancel').onclick=closeForm;search.oninput=e=>render(e.target.value);
form.onsubmit=async e=>{
  e.preventDefault();
  const row={user_id:user.id,term:$('fTerm').value.trim(),full_name:$('fFull').value.trim()||null,category:$('fCat').value.trim()||'General',meaning:$('fMeaning').value.trim(),usage_note:$('fUse').value.trim()||null,updated_at:new Date().toISOString()};
  if(!row.term||!row.meaning)return;
  msg.textContent='جاري الحفظ...';
  const result=editing?await sb.from('user_terminology').update(row).eq('id',editing).eq('user_id',user.id):await sb.from('user_terminology').insert(row);
  if(result.error){console.error(result.error);msg.textContent='ما انحفظ المصطلح، حاول مرة ثانية.';return;}
  closeForm();await load();
};
grid.onclick=async e=>{
  const edit=e.target.closest('[data-edit]'),del=e.target.closest('[data-delete]');
  if(edit){const item=custom.find(x=>x.id===edit.dataset.edit);if(item)openForm(item);return;}
  if(del){const item=custom.find(x=>x.id===del.dataset.delete);if(!item||!confirm(`حذف ${item.term}؟`))return;const {error}=await sb.from('user_terminology').delete().eq('id',item.id).eq('user_id',user.id);if(error){alert('تعذر الحذف');return;}await load();}
};
render();await load();
})();