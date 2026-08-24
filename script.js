/* #ABSON CAMERA ROLL RUNTIME FIX */
(function(){
  var ORIGINAL='script-core.js';
  var started=false;
  function runFix(){
    if(started)return;
    started=true;
    var style=document.createElement('style');
    style.textContent='@media(max-width:700px){#guest-wall .guest-wall-grid{width:100%!important;max-width:100%!important}#guest-wall .guest-wall-card{width:100%!important;min-width:100%!important;box-sizing:border-box!important}#guest-wall .guest-wall-open{display:block!important;width:100%!important;min-width:100%!important;box-sizing:border-box!important;padding:0!important;margin:0!important}#guest-wall .guest-wall-media img{display:block!important;width:100%!important;height:auto!important;max-width:100%!important}}';
    document.head.appendChild(style);
    var cache={};
    function eager(img){
      if(!img||!img.src)return;
      img.loading='eager';
      img.removeAttribute('loading');
      img.decoding='async';
      var url=img.currentSrc||img.src;
      if(cache[url])return;
      cache[url]=true;
      var p=new Image();
      p.decoding='async';
      p.src=url;
    }
    function scan(){
      var grid=document.getElementById('guestWallGrid');
      if(!grid)return;
      grid.querySelectorAll('img.guest-wall-media, .guest-wall-media img').forEach(eager);
      grid.querySelectorAll('.guest-wall-card img').forEach(eager);
    }
    var obs=new MutationObserver(function(){scan()});
    function start(){
      var grid=document.getElementById('guestWallGrid');
      if(grid){obs.observe(grid,{childList:true,subtree:true,attributes:true,attributeFilter:['src','loading']});scan();return true}
      return false;
    }
    if(!start()){
      var bodyObs=new MutationObserver(function(){if(start())bodyObs.disconnect()});
      bodyObs.observe(document.body,{childList:true,subtree:true});
    }
    setTimeout(scan,100);
    setTimeout(scan,500);
    setTimeout(scan,1500);
  }
  function loadOriginal(){
    var s=document.createElement('script');
    s.src=ORIGINAL;
    s.onload=runFix;
    s.onerror=function(){console.error('#ABSON: unable to load core script')};
    document.head.appendChild(s);
  }
  if(document.readyState==='loading'){
    loadOriginal();
  }else{
    var originalAdd=document.addEventListener.bind(document);
    document.addEventListener=function(type,listener,options){
      if(type==='DOMContentLoaded'&&typeof listener==='function'){
        queueMicrotask(function(){listener(new Event('DOMContentLoaded'))});
        return;
      }
      return originalAdd(type,listener,options);
    };
    loadOriginal();
  }
})();

/* #ABSON CAMERA BUTTON FORCE STYLE */
(function(){
  const css = `
  @media (max-width:700px){
    .guest-wall-toolbar .camera-mobile-nav{display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:10px!important;flex-shrink:0!important}
    .guest-wall-toolbar .camera-mobile-arrow,
    .guest-wall-toolbar button.camera-mobile-arrow,
    #guest-wall .camera-mobile-arrow{appearance:none!important;-webkit-appearance:none!important;border:2px solid #171717!important;background:#171717!important;background-image:none!important;color:#fff!important;width:52px!important;height:52px!important;min-width:52px!important;min-height:52px!important;padding:0!important;margin:0!important;border-radius:0!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;font-family:'DM Sans',Arial,sans-serif!important;font-size:24px!important;font-weight:900!important;line-height:1!important;box-shadow:4px 4px 0 #171717!important;outline:none!important;text-align:center!important}
    .guest-wall-toolbar .camera-mobile-arrow:active{background:#ffd447!important;color:#171717!important;transform:translate(2px,2px)!important;box-shadow:2px 2px 0 #171717!important}
    .guest-wall-toolbar .camera-mobile-count{display:inline-block!important;min-width:58px!important;color:#171717!important;text-align:center!important;font-family:'DM Sans',Arial,sans-serif!important;font-size:12px!important;font-weight:900!important;line-height:1!important;letter-spacing:.08em!important}
  }`;
  const style=document.createElement('style');
  style.id='abson-camera-button-force-style';
  style.textContent=css;
  (document.head||document.documentElement).appendChild(style);
})();

