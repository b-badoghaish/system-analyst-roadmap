import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
const SUPABASE_URL='https://ymbktbnswlpfjshayude.supabase.co';
const SUPABASE_KEY='sb_publishable_YdaalUm7Na2geEyCtIMf0w_3-Y_vWPG';
const sb=createClient(SUPABASE_URL,SUPABASE_KEY);
const {data:{session}}=await sb.auth.getSession();
if(!session){location.replace('login.html');}
else{
 const user=session.user;
 const tasks=[...document.querySelectorAll('[data-task]')];
 const {data}=await sb.from('user_progress').select('completed_tasks,theme').eq('user_id',user.id).maybeSingle();
 let progress=new Set(data?.completed_tasks||[]);
 if(data?.theme) document.documentElement.dataset.theme=data.theme;
 if(!data){
   let old={}; try{old=JSON.parse(localStorage.getItem('sa-roadmap-progress')||'{}')}catch{}
   progress=new Set(Object.entries(old).filter(([,v])=>v).map(([k])=>k));
   await sb.from('user_progress').upsert({user_id:user.id,completed_tasks:[...progress],theme:document.documentElement.dataset.theme||'light',current_week:1},{onConflict:'user_id'});
 }
 tasks.forEach(x=>x.checked=progress.has(x.dataset.task));
 const save=async()=>{
   progress=new Set(tasks.filter(x=>x.checked).map(x=>x.dataset.task));
   await sb.from('user_progress').upsert({user_id:user.id,completed_tasks:[...progress],theme:document.documentElement.dataset.theme||'light',updated_at:new Date().toISOString()},{onConflict:'user_id'});
 };
 tasks.forEach(x=>x.addEventListener('change',save));
 document.getElementById('themeBtn')?.addEventListener('click',save);
 const actions=document.querySelector('.sideactions');
 if(actions){
   const info=document.createElement('div'); info.className='sidebtn'; info.style.cursor='default'; info.textContent='👤 '+(user.user_metadata?.display_name||user.email||'مستخدم'); actions.prepend(info);
   const out=document.createElement('button'); out.className='sidebtn'; out.textContent='⇥ تسجيل الخروج'; out.onclick=async()=>{await sb.auth.signOut();location.replace('login.html')}; actions.append(out);
 }
}
