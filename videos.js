(()=>{
  const videos=[
    {match:'AWS — SDLC',url:'https://www.youtube.com/watch?v=r1vbihnae9w',label:'▶ شاهد شرح SDLC'},
    {match:'Scrum Guide',url:'https://www.youtube.com/watch?v=gy1c4_YixCo',label:'▶ شاهد Scrum Framework'},
    {match:'BPMN',url:'https://www.youtube.com/watch?v=0n8MiEmNg1Y',label:'▶ شاهد تطبيق BPMN'},
    {match:'UML',url:'https://www.youtube.com/watch?v=DEY0mbyq5YQ',label:'▶ شاهد شرح UML'},
    {match:'SQLBolt',url:'https://www.youtube.com/watch?v=uPrC2IpUXWs',label:'▶ شاهد تطبيق SQLBolt'},
    {match:'Postman',url:'https://www.youtube.com/watch?v=VywxIQ2ZXw4',label:'▶ شاهد كورس Postman'},
    {match:'BrowserStack — Software Testing Guide',url:'https://www.youtube.com/watch?v=OuN12bH-SLc',label:'▶ شاهد Manual Testing'}
  ];
  const style=document.createElement('style');
  style.textContent=`.sourceVideo{margin-inline-start:6px!important;background:#ff0033!important;color:#fff!important;border-color:#ff0033!important}.sourceVideo:hover{filter:brightness(.94)}`;
  document.head.append(style);
  const sources=[...document.querySelectorAll('.source')];
  for(const v of videos){
    const source=sources.find(s=>(s.querySelector('strong')?.textContent||'').includes(v.match));
    if(!source||source.querySelector('.sourceVideo'))continue;
    const a=document.createElement('a');
    a.className='sourceVideo';a.href=v.url;a.target='_blank';a.rel='noopener';a.textContent=v.label;
    const existing=source.querySelector('a');
    if(existing)existing.insertAdjacentElement('afterend',a);else source.append(a);
  }
})();