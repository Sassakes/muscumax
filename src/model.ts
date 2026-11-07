import {plans,type Exercise} from './program.ts';
export type SetLog={weight:string;reps:string;done:boolean};
export type Entry={exercise:Exercise;sets:SetLog[];rir:number;variation:string};
export type Session={id:string;planId:string;name:string;startedAt:number;finishedAt?:number;mode:'normal'|'light';entries:Entry[];note:string};
export type Data={version:1;history:Session[];draft:Session|null};
export const KEY='round.training.v1';
export const emptyData=():Data=>({version:1,history:[],draft:null});
export const num=(s:string)=>Number(s.replace(',','.'));
export const valid=(s:SetLog)=>s.weight.trim()!==''&&Number.isFinite(num(s.weight))&&num(s.weight)>=0&&num(s.weight)<=2000&&/^\d+$/.test(s.reps)&&+s.reps>0&&+s.reps<=100;
export const count=(s:Session)=>s.entries.reduce((n,e)=>n+e.sets.filter(s=>s.done).length,0);
export const total=(s:Session)=>s.entries.reduce((n,e)=>n+e.sets.length,0);
export const completed=(s:Session)=>count(s)===total(s);
export const canProgress=(e:Entry)=>e.variation===''&&e.sets.every(s=>s.done&&valid(s)&&+s.reps>=e.exercise.max)&&e.rir>=e.exercise.rir;
export function lastEntry(data:Data,id:string,excludeLight=false){for(const s of [...data.history].reverse()){if(excludeLight&&s.mode==='light')continue;const e=s.entries.find(e=>e.exercise.id===id&&!e.variation&&e.sets.some(x=>x.done));if(e)return e;}return undefined;}
export function createSession(data:Data,planId:string,light:boolean,startedAt=Date.now()):Session{
 const plan=plans.find(p=>p.id===planId);if(!plan)throw new Error('Séance inconnue');
 return{id:crypto.randomUUID(),planId,name:plan.name,startedAt,mode:light?'light':'normal',note:'',entries:plan.exercises.map(ex=>{const prev=lastEntry(data,ex.id,!light);const done=prev?.sets.filter(s=>s.done);return{exercise:{...ex},rir:light?4:ex.rir,variation:'',sets:Array.from({length:light?Math.max(1,ex.sets-1):ex.sets},(_,i)=>({weight:done?.[i]?.weight||done?.[0]?.weight||'',reps:String(ex.min),done:false}))}})};
}
// Treat backup files as untrusted. Rebuild metadata from the known program and
// validate every record before replacing the existing local notebook.
export function parseData(input:unknown):Data{
 const object=(x:unknown):Record<string,unknown>=>{if(!x||typeof x!=='object'||Array.isArray(x))throw Error('Format invalide');return x as Record<string,unknown>;};
 const text=(x:unknown,max:number)=>{if(typeof x!=='string'||x.length>max)throw Error('Texte invalide');return x;};
 const session=(raw:unknown,finished:boolean):Session=>{const s=object(raw),plan=plans.find(p=>p.id===s.planId);if(!plan)throw Error('Séance inconnue');
 if(!Number.isSafeInteger(s.startedAt)||Number(s.startedAt)<=0||!['normal','light'].includes(String(s.mode)))throw Error('Séance invalide');
 if(finished&&(!Number.isSafeInteger(s.finishedAt)||Number(s.finishedAt)<Number(s.startedAt)))throw Error('Date invalide');
 if(!finished&&s.finishedAt!==undefined)throw Error('Brouillon invalide');
 if(!Array.isArray(s.entries)||!s.entries.length||s.entries.length>20)throw Error('Exercices invalides');
 const seen=new Set<string>();
 const entries=s.entries.map(raw=>{const e=object(raw),meta=object(e.exercise),ex=plan.exercises.find(x=>x.id===meta.id);if(!ex||seen.has(ex.id)||!Array.isArray(e.sets)||!e.sets.length||e.sets.length>10||!Number.isInteger(e.rir)||Number(e.rir)<0||Number(e.rir)>5)throw Error('Exercice invalide');
 seen.add(ex.id);
 const sets=e.sets.map(raw=>{const s=object(raw);const row={weight:text(s.weight,10),reps:text(s.reps,3),done:s.done===true};if(typeof s.done!=='boolean'||!/^\d*[.,]?\d*$/.test(row.weight)||!/^\d*$/.test(row.reps)||(row.done&&!valid(row)))throw Error('Série invalide');return row;});
 return{exercise:{...ex},sets,rir:Number(e.rir),variation:e.variation===undefined?'':text(e.variation,120)};});
 const result:Session={id:text(s.id,100),planId:plan.id,name:plan.name,startedAt:Number(s.startedAt),mode:s.mode as Session['mode'],entries,note:text(s.note,1000)};
 if(!result.id)throw Error('Identifiant vide');if(finished){result.finishedAt=Number(s.finishedAt);if(!count(result))throw Error('Séance vide');}return result;
 };
 const data=object(input);if(data.version!==1||!Array.isArray(data.history)||data.history.length>10000)throw Error('Sauvegarde incompatible');
 const history=data.history.map(s=>session(s,true));if(new Set(history.map(s=>s.id)).size!==history.length)throw Error('Doublons');
 return{version:1,history,draft:data.draft===null?null:session(data.draft,false)};
}
export function loadData(storage:Pick<Storage,'getItem'>):{data:Data;error:string|null}{try{const raw=storage.getItem(KEY);return{data:raw?parseData(JSON.parse(raw)):emptyData(),error:null};}catch{return{data:emptyData(),error:'Le carnet est illisible ou le stockage est bloqué. Les données existantes ont été préservées.'};}}
export function saveData(data:Data,storage:Pick<Storage,'setItem'>){try{storage.setItem(KEY,JSON.stringify(data));return true;}catch{return false;}}
