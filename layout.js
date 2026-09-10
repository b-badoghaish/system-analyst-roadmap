(()=>{
'use strict';
const page=document.body.dataset.page||'';
const sidebar=document.getElementById('sidebar');
if(!sidebar) return;

const navItems=[
  ['dashboard','index.html','01','لوحة التقدم'],
  ['roadmap','index.html#roadmap','02','خطة 10 أسابيع'],
  ['project','index.html#project','03','المشروع التطبيقي'],
  ['reference','index.html#reference','04','مرجع المحلل'],
  ['terminology','terminology.html','T','قاموس المصطلحات'],
  ['artifacts','index.html#artifacts','05','مخرجات Portfolio'],
  ['mindset','index.html#mindset','06','قواعد المحترف']
];

sidebar.innerHTML=`<div class="brand"><div class="brandrow"><div class="logo">SA</div><div><h1>System Analyst Growth Track</h1><small>Seasonal Recruitment Project</small></div></div></div><nav class="nav"><div class="navlabel">المحتوى</div>${navItems.map(([key,href,no,label])=>`<a href="${href}"${page===key?' class="active" aria-current="page"':''}><span class="n">${no}</span>${label}</a>`).join('')}</nav><div class="sideactions"><button class="sidebtn" id="themeBtn">◐ تبديل الوضع</button></div>`;

const style=document.createElement('style');
style.textContent=`.nav a.active{background:var(--brandSoft);color:var(--brand);border-color:color-mix(in srgb,var(--brand) 32%,var(--line))}.pageIntro{padding:54px 0 18px}.pageIntro h2{margin:.35rem 0 .65rem}.pageIntro p{max-width:760px;color:var(--muted);line-height:1.9}`;
document.head.append(style);

const root=document.documentElement;
const savedTheme=localStorage.getItem('sa-roadmap-theme');
if(savedTheme) root.dataset.theme=savedTheme;
document.getElementById('themeBtn')?.addEventListener('click',()=>{
  const next=root.dataset.theme==='dark'?'light':'dark';
  root.dataset.theme=next;
  localStorage.setItem('sa-roadmap-theme',next);
});

const overlay=document.getElementById('overlay');
document.getElementById('menuBtn')?.addEventListener('click',()=>{
  sidebar.classList.toggle('open');
  overlay?.classList.toggle('show');
});
overlay?.addEventListener('click',()=>{
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
});
sidebar.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{
  sidebar.classList.remove('open');
  overlay?.classList.remove('show');
}));
})();