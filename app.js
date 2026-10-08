export const HABITS=[['skincare','Skincare','Cleanse + moisturize','ph-sparkle'],['exercise','Exercise','Move for at least 20 minutes','ph-person-simple-run'],['sleep','Sleep','Get 7+ hours tonight','ph-moon'],['grooming','Grooming','One intentional grooming ritual','ph-scissors'],['hydration','Hydration','Drink 2L of water','ph-drop']];
export const KEY='looksmaxxing-reset-v1';
export function blankState(){return {startDate:dateKey(new Date()),days:{}}}
export function dateKey(d){return new Date(d.getFullYear(),d.getMonth(),d.getDate()).toISOString().slice(0,10)}
export function loadState(storage=localStorage){try{const raw=storage.getItem(KEY);return raw?JSON.parse(raw):blankState()}catch{return blankState()}}
export function saveState(state,storage=localStorage){try{storage.setItem(KEY,JSON.stringify(state));return true}catch{return false}}
export function dayOffset(start,day){return Math.floor((new Date(day+'T00:00:00')-new Date(start+'T00:00:00'))/86400000)}
export function percent(values){return Math.round(values.filter(Boolean).length/HABITS.length*100)}
const state=loadState(); const today=dateKey(new Date());
if(typeof document==='undefined') {
  // Exported pure helpers remain testable in Node without a DOM.
} else {
const $=id=>document.getElementById(id); const todayData=()=>state.days[today]||[];
function render(){const vals=todayData();const p=percent(vals);$('todayPercent').textContent=p+'%';$('todayBar').style.width=p+'%';$('todayRing').style.background=`conic-gradient(var(--accent) ${p*3.6}deg,#2a313b 0deg)`;$('todayDate').textContent=new Date().toLocaleDateString(undefined,{month:'short',day:'numeric'});$('habits').innerHTML=HABITS.map(([id,name,tip,icon],i)=>`<label class="habit ${vals[i]?'checked':''}"><input aria-label="${name}" type="checkbox" ${vals[i]?'checked':''} data-index="${i}"><i class="ph ${icon} habit-icon" aria-hidden="true"></i><span class="habit-copy"><span class="habit-name">${name}</span><span class="habit-tip">${tip}</span></span></label>`).join('');document.querySelectorAll('.habit input').forEach(x=>x.onchange=()=>{const a=[...(state.days[today]||[])];a[x.dataset.index]=x.checked;state.days[today]=a;saveState(state);render()});renderOverview()}
function renderOverview(){let total=0,complete=0,streak=0,run=0;const start=new Date(state.startDate+'T00:00:00');$('days').innerHTML=Array.from({length:30},(_,i)=>{const d=new Date(start);d.setDate(d.getDate()+i);const key=dateKey(d), vals=state.days[key]||[], p=percent(vals), future=dayOffset(state.startDate,today)<i;total+=vals.filter(Boolean).length;if(p===100)complete++;if(!future&&p===100)run++;else if(!future)run=0;streak=Math.max(streak,run);return `<div class="day ${p===100?'complete':p?'partial':''} ${key===today?'current':''}" title="Day ${i+1}: ${p}%">${i+1}</div>`}).join('');$('totalPercent').textContent=Math.round(total/(30*HABITS.length)*100)+'%';$('habitsDone').textContent=total;$('bestStreak').textContent=streak;$('daysCount').textContent=`${complete} / 30 days`}
$('resetButton').onclick=()=>{if(confirm('Reset all 30 days of progress? This cannot be undone.')){Object.keys(state.days).forEach(k=>delete state.days[k]);saveState(state);render();$('saveNote').textContent='Progress reset. Your next check-in starts now.'}};render();
}
