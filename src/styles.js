export const injectCSS = () => {
  if (document.getElementById("pg-css")) return;
  const el = document.createElement("style");
  el.id = "pg-css";
  el.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{background:#070707;color:#f4efe6;font-family:'Jost',sans-serif;overflow-x:hidden}
    img{display:block;max-width:100%}
    a{text-decoration:none;color:inherit}
    button{cursor:pointer;font-family:'Jost',sans-serif}
    input,select,textarea{-webkit-appearance:none;appearance:none;font-family:'Jost',sans-serif}
    input::placeholder,textarea::placeholder{color:#3a3530}
    select option{background:#1a1a1a;color:#f4efe6}
    ::-webkit-scrollbar{width:3px}
    ::-webkit-scrollbar-track{background:#070707}
    ::-webkit-scrollbar-thumb{background:#c9a86c55;border-radius:2px}
    @keyframes rise{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes pulseLine{0%,100%{opacity:1}50%{opacity:.18}}
    @keyframes menuIn{from{opacity:0;transform:translateX(100%)}to{opacity:1;transform:translateX(0)}}
    .page-enter{animation:rise .5s ease both}
    .scroll-pulse{animation:pulseLine 2.2s infinite}
    .menu-enter{animation:menuIn .35s ease both}
    .img-card img{transition:transform .65s ease,filter .45s}
    .img-card:hover img{transform:scale(1.07);filter:brightness(1) sepia(0) !important}
    .img-card .ov{opacity:0;transition:opacity .4s}
    .img-card:hover .ov{opacity:1}
  `;
  document.head.appendChild(el);
};
