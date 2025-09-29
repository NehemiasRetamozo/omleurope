// ===== Config =====
const qrTarget = "https://linktr.ee/OmlEurope";

const socials = [
  { icon:"fa-brands fa-instagram", label:"Instagram", url:"" },
  { icon:"fa-brands fa-whatsapp",  label:"WhatsApp",  url:"" },
  { icon:"fa-brands fa-tiktok",    label:"TikTok",    url:"" },
  { icon:"fa-brands fa-facebook-f",label:"Facebook",  url:"" },
];

const linksData = [
  { title:"WhatsApp Ventas",           url:"",           icon:"fa-brands fa-whatsapp" },
  { title:"omleurope.com",             url:"",           icon:"fa-solid fa-globe" },
  { title:"Instagram",                 url:"",           icon:"fa-brands fa-instagram" },
  { title:"Instagram Perú",            url:"",           icon:"fa-brands fa-instagram" },
  { title:"Servicio Técnico Yarphone", url:"#",          icon:"fa-solid fa-gear" },
  { title:"TikTok Oml Europe",         url:"",           icon:"fa-brands fa-tiktok" },
  { title:"Facebook Oficial",          url:"",           icon:"fa-brands fa-facebook-f" },
  { title:"X (Anteriormente Twitter)", url:"u",          icon:"fa-brands fa-x-twitter" }
];

const shopItems = [
  { title:"Producto - Jengibre",  price:"", img:"https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/media/0d/migrated/jengibre.jpg.webp", url:""},
  { title:"Yarphone - Curcuma",   price:"", img:"https://villanatura.cr/cdn/shop/products/image_82bb6a0c-85b2-4bd4-aa71-35802fd016c2.jpg?v=1663287346&width=1946", url:"#"},
  { title:"Producto - Esparrago", price:"", img:"https://walmartgt.vtexassets.com/arquivos/ids/482172-800-450?v=638423989734570000&width=800&height=450&aspect=true", url:"#"},
  { title:"Producto - Arandano",  price:"", img:"https://www.organiclife.ec/wp-content/uploads/2022/05/organic-blueberry-f.jpeg", url:"#"},
  { title:"Producto - Palta",     price:"", img:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Avocado_Hass_-_single_and_halved.jpg/330px-Avocado_Hass_-_single_and_halved.jpg", url:"#"},
  { title:"Producto - Granda",    price:"", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjbompPeCfdBpdeW6Ni7zk33wEiXDz5-I0zQ&s", url:"#"},
  { title:"Producto - Mango",     price:"", img:"https://www.camposol.com/wp-content/uploads/2019/01/mangos.jpg", url:"#"},
];

// ===== Render redes =====
const socialsWrap = document.querySelector(".socials");
socials.forEach(s=>{
  const a=document.createElement("a");
  a.href=s.url; a.target="_blank"; a.rel="noopener";
  a.setAttribute('aria-label', s.label);
  a.innerHTML=`<i class="${s.icon}" aria-hidden="true"></i>`;
  socialsWrap.appendChild(a);
});

// ===== Render links =====
const list = document.getElementById("links");
linksData.forEach(item=>{
  const el=document.createElement("div");
  el.className="item";
  el.innerHTML=`
    <span class="logo"><i class="${item.icon}" aria-hidden="true"></i></span>
    <div class="txt"><div class="title">${item.title}</div></div>
    <div class="dots" title="Opciones"><i class="fa-solid fa-ellipsis-vertical"></i></div>
    <a class="link" href="${item.url}" target="_blank" rel="noopener" aria-label="${item.title}"></a>
  `;
  list.appendChild(el);
});

// ===== Render tienda =====
const grid = document.getElementById('shopGrid');
shopItems.forEach(p=>{
  const card=document.createElement('div');
  card.className='product-card';
  card.innerHTML=`
    <img class="product-img" src="${p.img}" alt="${p.title}">
    <div class="product-title">${p.title}</div>
    ${p.price ? `<div class="product-price">${p.price}</div>` : ''}
    <i class="fa-solid fa-ellipsis-vertical product-dots"></i>
    <a class="product-link" href="${p.url}" target="_blank" rel="noopener" aria-label="${p.title}"></a>`;
  grid.appendChild(card);
});

// ===== Tabs (Links / Shop) =====
const segBtns = document.querySelectorAll('.seg-btn');
const indicator = document.querySelector('.seg-indicator');

function setActive(tab){
  segBtns.forEach(b=>b.setAttribute('aria-selected', b===tab ? 'true' : 'false'));
  const idx=[...segBtns].indexOf(tab);
  indicator.style.transform=`translateX(${idx*100}%)`;
  const isShop=tab.dataset.tab==='shop';
  document.getElementById('links').style.display=isShop?'none':'block';
  document.getElementById('shop').style.display=isShop?'block':'none';
}
segBtns.forEach(btn=>{
  btn.addEventListener('click',()=>setActive(btn));
  btn.addEventListener('keydown',e=>{
    if(e.key!=='ArrowLeft'&&e.key!=='ArrowRight') return;
    e.preventDefault();
    const arr=[...segBtns], i=arr.indexOf(btn);
    const next=e.key==='ArrowRight'?arr[(i+1)%arr.length]:arr[(i-1+arr.length)%arr.length];
    next.focus(); setActive(next);
  });
});
setActive(segBtns[0]);

// ===== QR =====
(function makeQR(){
  const el=document.getElementById("qrcode");
  el.innerHTML="";
  const light=getComputedStyle(document.documentElement).getPropertyValue('--page-bg').trim()||"#d9d9d9";
  /* global QRCode */
  new QRCode(el,{text:qrTarget,width:120,height:120,colorDark:"#000000",colorLight:light,correctLevel:QRCode.CorrectLevel.H});
})();

// ===== Piso blanco dinámico =====
function updateWhiteFloor(){
  const floor=document.getElementById('whiteFloor');
  const card=document.querySelector('.card');
  const styles=getComputedStyle(document.documentElement);
  const promoBottom=parseInt(styles.getPropertyValue('--promo-bottom'))||0;
  const promoGradH=parseInt(styles.getPropertyValue('--promo-grad-h'))||180;
  const captionBottom=parseInt(styles.getPropertyValue('--caption-bottom'))||0;
  const cardBottom=card.getBoundingClientRect().bottom;
  const needDynamic=Math.max(0,window.innerHeight-cardBottom)+promoBottom;
  const needMinimum=promoGradH+140+captionBottom+promoBottom;
  floor.style.height=Math.max(needMinimum,needDynamic)+'px';
}
addEventListener('resize',updateWhiteFloor);
addEventListener('scroll',updateWhiteFloor);
document.addEventListener('DOMContentLoaded',updateWhiteFloor);

// ===== Promo bar =====
(function promoInit(){
  const bar=document.getElementById("promoBar");
  const link=document.getElementById("promoLink");
  const close=document.getElementById("promoClose");
  const cap=document.getElementById("promoCaption");
  link.href=qrTarget;
  try{
    const u=new URL(qrTarget);
    link.textContent=(u.host+u.pathname).replace(/\/$/,"");
    cap.textContent="Únete a "+(u.pathname.replace(/\//g,"")||"Yarphoneperu")+" hoy en Linktree";
  }catch{ link.textContent="linktr.ee/you"; }

  function showBar(show){
    document.documentElement.style.setProperty("--promo-bottom", show ? "120px" : "0px");
    bar.classList.toggle("hidden",!show);
    updateWhiteFloor();
  }

  const closed=sessionStorage.getItem("promoClosed")==="1";
  showBar(!closed);
  close.addEventListener("click",()=>{
    sessionStorage.setItem("promoClosed","1");
    showBar(false);
  });
})();
