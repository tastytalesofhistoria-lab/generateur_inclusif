(function(){
var $=function(id){return document.getElementById(id)};
var PEOPLE=new Map(),P={},INC_SUB=[],IL=[],ELLE=[],EXTRA=[],FEM_EUSE=new Set(),AMB={},ADJ=new Map(),SUF=[],HUMAN_SUFFIX=[],NO=new Set(),EPICENE=new Set(),VERBS_NO=new Set();

function fetchJSON(url){return fetch(url).then(function(r){if(!r.ok)throw new Error(url);return r.json()})}
function autoSet(base){var s=new Set();base.forEach(function(w){s.add(w);if(!/[sxz]$/i.test(w))s.add(w+"s")});return s}

Promise.all([
  fetchJSON("data/metiers-inclusive.json"),
  fetchJSON("data/pronoms.json"),
  fetchJSON("data/adjectifs.json"),
  fetchJSON("data/epicenes.json"),
  fetchJSON("data/exclusions.json"),
  fetchJSON("data/verbes-exclus.json")
]).then(function(files){
  PEOPLE=new Map(Object.entries(files[0]||{}));
  P=files[1].profile||{};
  INC_SUB=files[1].inclusiveSubjects||[];
  IL=files[1].il||[];
  ELLE=files[1].elle||[];
  EXTRA=files[1].extra||[];
  FEM_EUSE=new Set(files[2].femEuse||[]);
  AMB=files[2].amb||{};
  ADJ=new Map(Object.entries(files[2].exact||{}));
  SUF=files[2].suffixes||[];
  HUMAN_SUFFIX=files[2].humanSuffixes||[];
  EPICENE=autoSet(files[3]||[]);
  NO=autoSet(files[4]||[]);
  VERBS_NO=new Set(files[5]||[]);
  $("incStatus").textContent="Dictionnaires chargés.";
  generate();
}).catch(function(){
  $("incStatus").textContent="Erreur : un fichier de données ne charge pas.";
});

function resolve(v){return v.replace(/\{([^}]+)\}/g,function(m,k){return P[k]||m})}
function esc(s){return s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}
function keepCase(s,v){if(s===s.toUpperCase())return v.toUpperCase();return s.charAt(0)===s.charAt(0).toUpperCase()?v.charAt(0).toUpperCase()+v.slice(1):v}

function flags(){
  var all=$("incAllPronouns").checked;
  var neutral=$("incNeutral")&&$("incNeutral").checked;

  return{
    il:all||neutral||$("incIl").checked,
    elle:all||neutral||$("incElle").checked,
    all:all||neutral,
    neutral:neutral
  }
}

function replaceExact(text,from,to){
  var r=new RegExp("(^|[^A-Za-zÀ-ÖØ-öø-ÿ0-9_·.\\-])("+esc(from)+")(?![A-Za-zÀ-ÖØ-öø-ÿ0-9_·\\-])","gi");
  return text.replace(r,function(m,p,w){return p+keepCase(w,resolve(to))})
}

function rules(){
  var f=flags(),a=[];
  if(f.il)a=a.concat(IL);
  if(f.elle)a=a.concat(ELLE);
  if(f.all)a=a.concat(EXTRA);
  return a.sort(function(x,y){return y[0].length-x[0].length})
}

function applyPronouns(text){
  rules().forEach(function(r){text=replaceExact(text,r[0],r[1])});
  return text
}

function applyCompound(text){
  var f=flags(),t=[];
  if(f.il)t.push("il","ils");
  if(f.elle)t.push("elle","elles");

  INC_SUB.forEach(function(inc){
    t.forEach(function(g){
      text=text.replace(new RegExp("\\b("+esc(inc)+")\\s+et\\s+"+esc(g)+"\\b","gi"),function(m,first){return keepCase(first,P.subjectPlural)});
      text=text.replace(new RegExp("\\b("+esc(g)+")\\s+et\\s+"+esc(inc)+"\\b","gi"),function(m,first){return keepCase(first,P.subjectPlural)})
    })
  });

  if(f.il&&f.elle){
    text=text.replace(/\bil\s+et\s+elle\b/gi,"iels")
      .replace(/\belle\s+et\s+il\b/gi,"iels")
      .replace(/\bils\s+et\s+elles\b/gi,"iels")
      .replace(/\belles\s+et\s+ils\b/gi,"iels")
  }

  return text
}

function before(text,off){
  return(text.slice(Math.max(0,off-280),off).toLowerCase().split(/[\n\r.!?;:]/).pop()||"")
}

function afterWords(text,off,n){
  var m=text.slice(off,off+160).toLowerCase().match(/[a-zà-öø-ÿ'’\-]+/g)||[];
  return m.slice(0,n||4)
}

function pluralCtx(text,off){
  var b=before(text,off);
  var pl=["iels","elleux","toustes","sont","étaient","etaient","seront","furent","soient","deviennent","devinrent","restent","semblent","paraissent"];
  var sg=["iel","ellui","est","était","etait","sera","fut","soit","devient","devint","reste","semble","paraît","parait"];
  var f=b.match(new RegExp("\\b("+pl.concat(sg).map(esc).join("|")+")\\b","gi"));
  return !!(f&&f.length&&pl.indexOf(f[f.length-1].toLowerCase())!==-1)
}

function incCtx(text,off){
  return /\b(iel|iels|ellui|elleux)\b|·e|·ne|·ère|·ice|·euse/.test(before(text,off))
}

function agreeCtx(text,off){
  var b=before(text,off);
  if(!incCtx(text,off))return false;
  if(/\b(un|une|des|le|la|les|ce|cet|cette|ces|mon|ma|mes|ton|ta|tes|son|sa|ses)\s+$/i.test(b))return false;
  if(/(?:^|\s)(en|de|dans|pour|par|avec|sans|sous|sur|chez|vers|à|a|au|aux)\s+$/i.test(b))return false;
  if(/(?:^|\s)d['’]\s*$/i.test(b))return false;

  var verbs="est|sont|était|etaient|étaient|sera|seront|fut|furent|soit|soient|devient|deviennent|devint|devinrent|reste|restent|semble|semblent|paraît|parait|paraissent";
  var re=new RegExp("\\b("+verbs+")\\b","gi"),m,last=null;

  while((m=re.exec(b))!==null)last={end:re.lastIndex};
  if(!last)return false;

  var tail=b.slice(last.end);
  if(/\b(lorsque|quand|pendant|puis|ensuite|car|mais|où|dont|qui|que)\b|qu['’]/i.test(tail))return false;

  return /(?:\s+[a-zà-öø-ÿ'’\-]+){0,10}\s*$/i.test(tail)
}

function noSuffix(w){
  var l=w.toLowerCase();
  return l.indexOf("'")!==-1||l.indexOf("’")!==-1||l.endsWith("ment")||VERBS_NO.has(l)||NO.has(l)||EPICENE.has(l)||(l.endsWith("s")&&(NO.has(l.slice(0,-1))||EPICENE.has(l.slice(0,-1))))
}

function inclusiveAlready(text,off,w){
  return text.charAt(off-1)==="·"||text.charAt(off+w.length)==="·"
}

function humanSuffix(w){
  var l=w.toLowerCase();
  for(var i=0;i<HUMAN_SUFFIX.length;i++){
    var from=HUMAN_SUFFIX[i][0],to=HUMAN_SUFFIX[i][1];
    if(l.endsWith(from)&&l.length>from.length+1)return keepCase(w,l.slice(0,l.length-from.length)+to)
  }
  return null
}

function humanWord(w){
  var l=w.toLowerCase();
  if(PEOPLE.has(l))return true;
  if(EPICENE.has(l)&&/[a-zà-öø-ÿ]+/.test(l))return true;
  return !!humanSuffix(w)&&!NO.has(l)&&!VERBS_NO.has(l)
}

function humanCtx(text,off,w){
  var b=before(text,off),l=w.toLowerCase();
  if(PEOPLE.has(l))return true;
  if(/\b(les|des|ces|mes|tes|ses|nos|vos|leurs|plusieurs|quelques|certains|certaines|tous|toutes|un|une|du|de la|de l’|de l')\s+$/i.test(b)&&humanWord(w))return true;
  return false
}

function adjBeforeHuman(text,off,w){
  var a=afterWords(text,off+w.length,3);
  var skip=new Set(["et","ou","de","d","du","des","la","le","les","un","une"]);
  for(var i=0;i<a.length;i++){
    if(skip.has(a[i]))continue;
    return humanWord(a[i])
  }
  return false
}

function detBeforeHuman(text,off,w){
  var l=w.toLowerCase();
  if(l!=="un"&&l!=="une"&&l!=="tous"&&l!=="toutes")return false;

  var a=afterWords(text,off+w.length,5);
  var skip=new Set(["et","ou","de","d","du","des","la","le","les","un","une","jeune","ancien","ancienne","nouveau","nouvelle","vieux","vieil","vieille","petit","petite","grand","grande"]);

  for(var i=0;i<a.length;i++){
    if(skip.has(a[i]))continue;
    return humanWord(a[i])
  }

  return false
}

function suffix(w,rules){
  var l=w.toLowerCase();
  for(var i=0;i<rules.length;i++){
    var from=rules[i][0],to=rules[i][1];
    if(l.endsWith(from)&&l.length>from.length)return keepCase(w,l.slice(0,l.length-from.length)+to)
  }
  return null
}

function transform(w,off,text){
  var l=w.toLowerCase();
  var f=flags();
  var neutral=f.neutral;
  var ctx=agreeCtx(text,off);
  var adjHuman=adjBeforeHuman(text,off,w);
  var hctx=humanCtx(text,off,w);
  var pl=pluralCtx(text,off);

  if((l==="un"||l==="une")&&detBeforeHuman(text,off,w))return keepCase(w,"un·e");
  if((l==="tous"||l==="toutes")&&(ctx||detBeforeHuman(text,off,w)||neutral))return keepCase(w,"toustes");

  if(w.length<3||noSuffix(w)||inclusiveAlready(text,off,w))return w;

  if(PEOPLE.has(l))return keepCase(w,PEOPLE.get(l));

  if(hctx){
    var hs=humanSuffix(w);
    if(hs&&!NO.has(l)&&!VERBS_NO.has(l))return hs
  }

  if((ctx||adjHuman||neutral)&&ADJ.has(l))return keepCase(w,ADJ.get(l));

  if((ctx||adjHuman||neutral)&&l.endsWith("euses")){
    var sing=l.slice(0,-1);
    if(FEM_EUSE.has(sing))return keepCase(w,sing.slice(0,-4)+"eux·se·s")
  }

  if((ctx||adjHuman||neutral)&&l.endsWith("euse")&&FEM_EUSE.has(l)){
    return keepCase(w,l.slice(0,-4)+"eux·se")
  }

  if((ctx||adjHuman||neutral)&&AMB[l]){
    return keepCase(w,AMB[l]+(pl?"·s":""))
  }

  if((ctx||adjHuman||neutral)&&l.endsWith("eux")&&l.length>3){
    return keepCase(w,l.slice(0,-3)+(pl?"eux·se·s":"eux·se"))
  }

  if(ctx||neutral){
    var s=suffix(w,SUF);
    return s||w
  }

  return w
}

function applySuffixes(text){
  return text.replace(/[A-Za-zÀ-ÖØ-öø-ÿ]+(?:['’\-][A-Za-zÀ-ÖØ-öø-ÿ]+)*/g,function(w,off,full){return transform(w,off,full)})
}

function clean(text){
  return text.replace(/\bde ellui\b/gi,"d’ellui")
    .replace(/\bde elleux\b/gi,"d’elleux")
    .replace(/\bd['’]ellui\b/gi,"d’ellui")
    .replace(/\bd['’]elleux\b/gi,"d’elleux")
    .replace(/\bque iels\b/gi,"qu’iels")
    .replace(/\bque iel\b/gi,"qu’iel")
    .replace(/\bsi iels\b/gi,"s’iels")
    .replace(/\bsi iel\b/gi,"s’iel")
}

function generate(){
  var i=$("incInput"),o=$("incOutput"),im=i.scrollHeight-i.clientHeight,ratio=im>0?i.scrollTop/im:0,text=i.value;

  text=applyCompound(text);
  text=applyPronouns(text);
  text=applySuffixes(text);
  text=clean(text);

  o.value=text;

  requestAnimationFrame(function(){
    var om=o.scrollHeight-o.clientHeight;
    o.scrollTop=om*ratio
  });

  $("incStatus").textContent="Texte généré."
}

function copyOutput(){
  var o=$("incOutput");
  o.focus();
  o.select();

  if(navigator.clipboard){
    navigator.clipboard.writeText(o.value).then(function(){$("incStatus").textContent="Texte copié."})
  }else{
    document.execCommand("copy");
    $("incStatus").textContent="Texte copié."
  }
}

function clearAll(){
  $("incInput").value="";
  $("incOutput").value="";
  $("incStatus").textContent="Texte vidé."
}

var syncing=false;

function syncScroll(a,b){
  if(syncing)return;
  syncing=true;

  var am=a.scrollHeight-a.clientHeight,bm=b.scrollHeight-b.clientHeight,ratio=am>0?a.scrollTop/am:0;

  b.scrollTop=bm*ratio;
  b.scrollLeft=a.scrollLeft;

  requestAnimationFrame(function(){syncing=false})
}

$("incGenerate").addEventListener("click",generate);
$("incCopy").addEventListener("click",copyOutput);
$("incClear").addEventListener("click",clearAll);
$("incInput").addEventListener("input",generate);
$("incIl").addEventListener("change",generate);
$("incElle").addEventListener("change",generate);
$("incAllPronouns").addEventListener("change",generate);
$("incNeutral").addEventListener("change",generate);
$("incInput").addEventListener("scroll",function(){syncScroll($("incInput"),$("incOutput"))});
$("incOutput").addEventListener("scroll",function(){syncScroll($("incOutput"),$("incInput"))});
})();
