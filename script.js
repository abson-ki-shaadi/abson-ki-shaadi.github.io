/* #ABSON WEDDING WEBSITE — BROWSER JAVASCRIPT */

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

