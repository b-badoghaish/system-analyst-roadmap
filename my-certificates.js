import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
const SUPABASE_URL='https://ymbktbnswlpfjshayude.supabase.co';
const SUPABASE_KEY='sb_publishable_YdaalUm7Na2geEyCtIMf0w_3-Y_vWPG';
const sb=createClient(SUPABASE_URL,SUPABASE_KEY);
const {data:{session}}=await sb.auth.getSession();
if(!session) throw new Error('No active session');
const user=session.user;

const style=document.createElement('style');
style.textContent=`
.certsSection{padding:62px 0;background:var(--bg);border-block-start:1px solid var(--line)}
.certsToolbar{display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap;margin-top:20px;padding:16px;border:1px solid var(--line);background:var(--surface);border-radius:16px;box-shadow:var(--shadow)}
.certsUpload{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.certUploadBtn{display:inline-flex;align-items:center;gap:7px;padding:10px 14px;border-radius:10px;background:var(--brand);color:#fff;font-weight:800;font-size:12px;cursor:pointer}.certUploadBtn input{display:none}.certHint{color:var(--muted);font-size:11px}.certCount{font:800 12px var(--mono);color:var(--brand)}
.certsGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px}.myCertCard{padding:16px;border:1px solid var(--line);background:var(--surface);border-radius:16px;box-shadow:var(--shadow);display:grid;gap:12px}.myCertTop{display:flex;gap:10px;align-items:flex-start}.pdfIcon{width:42px;height:42px;border-radius:11px;display:grid;place-items:center;background:var(--brandSoft);font-size:20px;flex:none}.myCertCard h3{margin:0;font-size:14px;line-height:1.4;word-break:break-word}.myCertMeta{color:var(--muted);font-size:10.5px;margin-top:3px}.certBtns{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.certBtns button{border:1px solid var(--line);background:var(--surface2);border-radius:9px;padding:8px 6px;font-size:10.5px;font-weight:800;cursor:pointer}.certBtns .danger{color:#c0392b}.certEmpty{grid-column:1/-1;padding:34px;text-align:center;border:1px dashed var(--line);border-radius:16px;color:var(--muted);background:var(--surface)}.certBusy{opacity:.55;pointer-events:none}
@media(max-width:900px){.certsGrid{grid-template-columns:1fr 1fr}}@media(max-width:620px){.certsGrid{grid-template-columns:1fr}.certsToolbar{align-items:flex-start}.certBtns{grid-template-columns:1fr}}
`;
document.head.append(style);

const main=document.querySelector('.main');
const footer=document.querySelector('.footer');
const section=document.createElement('section');
section.className='certsSection';section.id='my-certificates';
section.innerHTML=`<div class="container"><span class="eyebrow">07 — MY CERTIFICATES</span><h2>شهاداتي</h2><p class="desc">مكتبتك الخاصة للشهادات. ارفع PDF، غيّر الاسم، حمّل الملف أو احذفه متى ما تبغى.</p><div class="certsToolbar"><div class="certsUpload"><label class="certUploadBtn">＋ رفع شهادة PDF<input id="certFile" type="file" accept="application/pdf,.pdf"></label><span class="certHint" id="certMsg">PDF فقط — حتى 10MB</span></div><span class="certCount" id="certCount">0 شهادة</span></div><div class="certsGrid" id="certsGrid"><div class="certEmpty">جاري تحميل شهاداتك...</div></div></div>`;
if(footer) footer.before(section); else main?.append(section);

const nav=document.querySelector('.nav');
if(nav&&!nav.querySelector('a[href="#my-certificates"]')){
  const a=document.createElement('a');a.href='#my-certificates';a.innerHTML='<span class="n">07</span>شهاداتي';nav.append(a);
  a.onclick=()=>{document.querySelector('#sidebar')?.classList.remove('open');document.querySelector('#overlay')?.classList.remove('show')};
}

const grid=document.querySelector('#certsGrid'),count=document.querySelector('#certCount'),msg=document.querySelector('#certMsg'),fileInput=document.querySelector('#certFile');
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const size=n=>!n?'':n<1024?`${n} B`:n<1048576?`${(n/1024).toFixed(1)} KB`:`${(n/1048576).toFixed(1)} MB`;
const date=v=>new Intl.DateTimeFormat('ar-SA',{dateStyle:'medium'}).format(new Date(v));
function setMsg(t,bad=false){msg.textContent=t;msg.style.color=bad?'#c0392b':''}

async function load(){
 const {data,error}=await sb.from('user_certificates').select('*').eq('user_id',user.id).order('created_at',{ascending:false});
 if(error){grid.innerHTML='<div class="certEmpty">تعذر تحميل الشهادات.</div>';setMsg(error.message,true);return}
 count.textContent=`${data.length} شهادة`;
 if(!data.length){grid.innerHTML='<div class="certEmpty">ما رفعت أي شهادة إلى الآن 🎓</div>';return}
 grid.innerHTML=data.map(c=>`<article class="myCertCard" data-id="${c.id}" data-path="${esc(c.file_path)}"><div class="myCertTop"><div class="pdfIcon">📄</div><div><h3>${esc(c.display_name)}</h3><div class="myCertMeta">${date(c.created_at)}${c.file_size?' · '+size(c.file_size):''}</div></div></div><div class="certBtns"><button data-act="download">⬇ تحميل PDF</button><button data-act="rename">✎ تغيير الاسم</button><button class="danger" data-act="delete">🗑 حذف</button></div></article>`).join('');
}

fileInput.addEventListener('change',async()=>{
 const file=fileInput.files?.[0];if(!file)return;
 if(file.type!=='application/pdf'&&!file.name.toLowerCase().endsWith('.pdf')){setMsg('اختر ملف PDF فقط.',true);fileInput.value='';return}
 if(file.size>10485760){setMsg('حجم الملف أكبر من 10MB.',true);fileInput.value='';return}
 setMsg('جاري رفع الشهادة...');fileInput.disabled=true;
 const id=crypto.randomUUID();const path=`${user.id}/${id}.pdf`;const displayName=file.name.replace(/\.pdf$/i,'');
 const {error:upErr}=await sb.storage.from('certificates').upload(path,file,{contentType:'application/pdf',upsert:false});
 if(upErr){setMsg('فشل الرفع: '+upErr.message,true);fileInput.disabled=false;fileInput.value='';return}
 const {error:dbErr}=await sb.from('user_certificates').insert({id,user_id:user.id,display_name:displayName,original_filename:file.name,file_path:path,file_size:file.size});
 if(dbErr){await sb.storage.from('certificates').remove([path]);setMsg('تعذر حفظ بيانات الشهادة: '+dbErr.message,true)}else{setMsg('تم رفع الشهادة ✅');await load()}
 fileInput.disabled=false;fileInput.value='';
});

grid.addEventListener('click',async e=>{
 const btn=e.target.closest('button[data-act]');if(!btn)return;const card=btn.closest('.myCertCard');const id=card.dataset.id,path=card.dataset.path;const act=btn.dataset.act;
 card.classList.add('certBusy');
 try{
   if(act==='download'){
     const {data,error}=await sb.storage.from('certificates').download(path);if(error)throw error;
     const name=card.querySelector('h3').textContent.trim()+'.pdf';const u=URL.createObjectURL(data);const a=document.createElement('a');a.href=u;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1000);
   }
   if(act==='rename'){
     const old=card.querySelector('h3').textContent.trim();const next=prompt('الاسم الجديد للشهادة:',old);if(!next||next.trim()===old)return;
     const {error}=await sb.from('user_certificates').update({display_name:next.trim(),updated_at:new Date().toISOString()}).eq('id',id).eq('user_id',user.id);if(error)throw error;await load();setMsg('تم تغيير الاسم ✅');
   }
   if(act==='delete'){
     if(!confirm('متأكد تبغى تحذف هذه الشهادة؟'))return;
     const {error:sErr}=await sb.storage.from('certificates').remove([path]);if(sErr)throw sErr;
     const {error:dErr}=await sb.from('user_certificates').delete().eq('id',id).eq('user_id',user.id);if(dErr)throw dErr;await load();setMsg('تم حذف الشهادة');
   }
 }catch(err){setMsg(err.message||'حدث خطأ',true)}finally{card.classList.remove('certBusy')}
});

await load();
