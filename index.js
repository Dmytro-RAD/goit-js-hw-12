import{a as L,S as b,i as n}from"./assets/vendor-frHSA4Lh.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();const q=L.create({baseURL:"https://pixabay.com/api/",params:{key:"50331031-463f70f86d851a00b481c2fad",q:"",image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15}});async function h(r,e=1){try{return(await q.get("",{params:{q:r,page:e}})).data}catch(i){throw new Error("Failed to fetch images: "+i.message)}}const y=document.querySelector(".gallery"),g=document.querySelector(".loader"),p=document.querySelector(".loadbtn");function S({webformatURL:r,largeImageURL:e,tags:i,likes:l,views:t,comments:o,downloads:s}){return`<li class="gallery-item">
    <a class="gallery-link" href="${e}">
      <img
        class="gallery-image"
        src="${r}"
        alt="${i}"
        width="360"
        height="200"
      />
    </a>
    <div class="info">
  <div class="info-item">
    <p class="text-info">Likes</p>
    <p class="value-info">${l}</p>
  </div>
  <div class="info-item">
    <p class="text-info">Views</p>
    <p class="value-info">${t}</p>
  </div>
  <div class="info-item">
    <p class="text-info">Comments</p>
    <p class="value-info">${o}</p>
  </div>
  <div class="info-item">
    <p class="text-info">Downloads</p>
    <p class="value-info">${s}</p>
  </div>
</div>

  </li>`}function E(r){return r.map(S).join("")}function v(r){f();try{const e=E(r);y.insertAdjacentHTML("beforeend",e),$()}finally{m()}}let d;function x(){d=new b(".gallery a",{captionsData:"alt",captionDelay:250})}function $(){d&&d.refresh()}function B(){y.innerHTML=""}function f(){g.hidden=!1}function m(){g.hidden=!0}function O(){p.hidden=!1}function w(){p.hidden=!0}let c="",a=1,u=0;const P=document.querySelector(".form"),D=document.querySelector(".input-form"),H=document.querySelector(".loadbtn");x();P.addEventListener("submit",async r=>{if(r.preventDefault(),c=D.value.trim(),!c){n.show({message:"Please enter a search query!",color:"yellow"});return}a=1,B(),w(),f();try{const e=await h(c,a);if(u=e.totalHits,e.hits.length===0){n.show({message:"Sorry, there are no images matching your search query. Please try again!",color:"red",imageWidth:24});return}v(e.hits),u>a*15&&O()}catch(e){n.show({message:`Error fetching images: ${e.message}`,color:"red"})}finally{m()}});H.addEventListener("click",async r=>{r.preventDefault(),a+=1,f();try{const e=await h(c,a);v(e.hits),M(),a*15>=u&&(w(),n.show({message:"We're sorry, but you've reached the end of search results.",color:"blue"}))}catch(e){n.show({message:`Error fetching images: ${e.message}`,color:"red"})}finally{m()}});function M(){const{height:r}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
