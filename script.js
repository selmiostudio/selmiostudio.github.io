const intro=document.getElementById("intro"), env=document.getElementById("envelope"), openBtn=document.getElementById("openBtn");
function openInvitation(){env.classList.add("is-open");setTimeout(()=>intro.classList.add("opened"),1450)}
openBtn.addEventListener("click",e=>{e.stopPropagation();openInvitation()});env.addEventListener("click",openInvitation);env.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" ")openInvitation()});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.15});document.querySelectorAll(".reveal").forEach(x=>io.observe(x));
const wedding=new Date("2027-07-18T16:00:00");
function tick(){let d=Math.max(0,wedding-new Date()),s=Math.floor(d/1000);days.textContent=String(Math.floor(s/86400)).padStart(3,"0");s%=86400;hours.textContent=String(Math.floor(s/3600)).padStart(2,"0");s%=3600;mins.textContent=String(Math.floor(s/60)).padStart(2,"0");secs.textContent=String(s%60).padStart(2,"0")}tick();setInterval(tick,1000);
document.getElementById("rsvpForm").addEventListener("submit",e=>{e.preventDefault();e.currentTarget.style.display="none";document.getElementById("success").style.display="block"});
document.getElementById("musicBtn").addEventListener("click",()=>alert("Demo music button — we can add the couple's licensed audio later."));