(function(){
var $=function(id){return document.getElementById(id)};
var PEOPLE=new Map(),P={},INC_SUB=[],IL=[],ELLE=[],EXTRA=[],FEM_EUSE=new Set(),AMB={},ADJ=new Map(),SUF=[],HUMAN_SUFFIX=[],NO=new Set(),EPICENE=new Set(),VERBS_NO=new Set();
var FROZEN=[];

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
  if($("incStatus"))$("incStatus").textContent="Dictionnaires chargés.";
  generate();
}).catch(function(){
  if($("incStatus"))$("incStatus").textContent="Erreur : un fichier de données ne charge pas.";
  updateOptionDesc();
});

function resolve(v){return v.replace(/\{([^}]+)\}/g,function(m,k){return P[k]||m})}
function esc(s){return s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}
function keepCase(s,v){if(s===s.toUpperCase())return v.toUpperCase();return s.charAt(0)===s.charAt(0).toUpperCase()?v.charAt(0).toUpperCase()+v.slice(1):v}

function flags(){
  var all=$("incAllPronouns")&&$("incAllPronouns").checked;
  var neutral=$("incNeutral")&&$("incNeutral").checked;
  return{
    il:all||neutral||($("incIl")&&$("incIl").checked),
    elle:all||neutral||($("incElle")&&$("incElle").checked),
    all:all||neutral,
    neutral:neutral
  }
}

function freezeMatch(match){
  var key="⟦"+FROZEN.length+"⟧";
  FROZEN.push(match);
  return key
}

function protectFixedExpressions(text){
  FROZEN=[];

  var patterns=[
    /\bil\s+ne\s+faut(?:\s+pas|\s+plus|\s+jamais)?\b/gi,
    /\bil\s+faut\b/gi,
    /\bil\s+faudra\b/gi,
    /\bil\s+faudrait\b/gi,
    /\bil\s+fallait\b/gi,
    /\bil\s+a\s+fallu\b/gi,
    /\bil\s+avait\s+fallu\b/gi,
    /\bil\s+aurait\s+fallu\b/gi,
    /\bil\s+va\s+falloir\b/gi,

    /\bil\s+n['’]y\s+a(?:\s+pas|\s+plus|\s+jamais)?\b/gi,
    /\bil\s+y\s+a\b/gi,
    /\bil\s+y\s+avait\b/gi,
    /\bil\s+y\s+aura\b/gi,
    /\bil\s+y\s+aurait\b/gi,
    /\bil\s+y\s+eut\b/gi,
    /\bil\s+y\s+en\s+a\b/gi,
    /\bil\s+n['’]y\s+en\s+a(?:\s+pas|\s+plus|\s+jamais)?\b/gi,

    /\bil\s+ne\s+s['’]agit(?:\s+pas|\s+plus|\s+jamais)?\b/gi,
    /\bil\s+s['’]agit\b/gi,
    /\bil\s+s['’]agissait\b/gi,
    /\bil\s+s['’]agira\b/gi,
    /\bil\s+s['’]agirait\b/gi,
    /\bil\s+s['’]est\s+agi\b/gi,

    /\bil\s+n['’]existe(?:\s+pas|\s+plus|\s+jamais)?\b/gi,
    /\bil\s+existe\b/gi,
    /\bil\s+existait\b/gi,
    /\bil\s+existera\b/gi,
    /\bil\s+existerait\b/gi,

    /\bil\s+ne\s+reste(?:\s+pas|\s+plus|\s+jamais)?\b/gi,
    /\bil\s+reste\b/gi,
    /\bil\s+restait\b/gi,
    /\bil\s+restera\b/gi,
    /\bil\s+resterait\b/gi,
    /\bil\s+manque\b/gi,
    /\bil\s+manquait\b/gi,
    /\bil\s+manquera\b/gi,
    /\bil\s+suffit\b/gi,
    /\bil\s+suffisait\b/gi,
    /\bil\s+suffira\b/gi,
    /\bil\s+suffirait\b/gi,

    /\bil\s+semble\b/gi,
    /\bil\s+semblait\b/gi,
    /\bil\s+semblera\b/gi,
    /\bil\s+semblerait\b/gi,
    /\bil\s+para[iî]t\b/gi,
    /\bil\s+paraissait\b/gi,
    /\bil\s+para[iî]tra\b/gi,
    /\bil\s+para[iî]trait\b/gi,
    /\bil\s+convient\s+(?:de|d['’]|que|qu['’])/gi,
    /\bil\s+conviendrait\s+(?:de|d['’]|que|qu['’])/gi,
    /\bil\s+importe\s+(?:de|d['’]|que|qu['’])/gi,
    /\bil\s+importait\s+(?:de|d['’]|que|qu['’])/gi,

    /\bil\s+arrive\s+que\b/gi,
    /\bil\s+arrivait\s+que\b/gi,
    /\bil\s+arrivera\s+que\b/gi,
    /\bil\s+arriverait\s+que\b/gi,
    /\bil\s+se\s+peut\s+que\b/gi,
    /\bil\s+se\s+pourrait\s+que\b/gi,
    /\bil\s+vaut\s+mieux\b/gi,
    /\bil\s+vaudrait\s+mieux\b/gi,

    /\bil\s+fait\s+(?:beau|bon|mauvais|froid|chaud|doux|lourd|humide|sec|nuit|jour|sombre|clair)\b/gi,
    /\bil\s+(?:pleut|pleuvait|pleuvra|pleuvrait)\b/gi,
    /\bil\s+(?:neige|neigeait|neigera|neigerait)\b/gi,
    /\bil\s+(?:grêle|grêlait|grêlera|grêlerait)\b/gi,
    /\bil\s+(?:vente|ventait|ventera|venterait)\b/gi,
    /\bil\s+(?:gèle|gelait|gèlera|gèlerait)\b/gi,
    /\bil\s+(?:bruine|bruinait|bruinera|bruinerait)\b/gi,
    /\bil\s+va\s+(?:pleuvoir|neiger|grêler|venter|geler|bruiner)\b/gi,

    /\bil\s+est\s+(?:midi|minuit|tard|tôt|tot|temps)\b/gi,
    /\bil\s+était\s+(?:midi|minuit|tard|tôt|tot|temps)\b/gi,
    /\bil\s+sera\s+(?:midi|minuit|tard|tôt|tot|temps)\b/gi,
    /\bil\s+est\s+\d+\s*h(?:eures?)?\b/gi,
    /\bil\s+était\s+\d+\s*h(?:eures?)?\b/gi,
    /\bil\s+sera\s+\d+\s*h(?:eures?)?\b/gi,
    /\bil\s+était\s+une\s+fois\b/gi,

    /\bil\s+est\s+(?:possible|impossible|nécessaire|utile|préférable|probable|recommandé|conseillé|interdit|permis|important|essentiel|indispensable|normal|logique|rare|évident|clair|certain|vrai|faux|dommage|regrettable|étrange|curieux|difficile|facile|simple|compliqué|bon|mauvais|temps)\s+(?:de|d['’]|que|qu['’])/gi,
    /\bil\s+était\s+(?:possible|impossible|nécessaire|utile|préférable|probable|recommandé|conseillé|interdit|permis|important|essentiel|indispensable|normal|logique|rare|évident|clair|certain|vrai|faux|dommage|regrettable|étrange|curieux|difficile|facile|simple|compliqué|bon|mauvais|temps)\s+(?:de|d['’]|que|qu['’])/gi,
    /\bil\s+serait\s+(?:possible|impossible|nécessaire|utile|préférable|probable|recommandé|conseillé|interdit|permis|important|essentiel|indispensable|normal|logique|rare|évident|clair|certain|vrai|faux|dommage|regrettable|étrange|curieux|difficile|facile|simple|compliqué|bon|mauvais|temps)\s+(?:de|d['’]|que|qu['’])/gi,
    /\bil\s+sera\s+(?:possible|impossible|nécessaire|utile|préférable|probable|recommandé|conseillé|interdit|permis|important|essentiel|indispensable|normal|logique|rare|évident|clair|certain|vrai|faux|dommage|regrettable|étrange|curieux|difficile|facile|simple|compliqué|bon|mauvais|temps)\s+(?:de|d['’]|que|qu['’])/gi,

    /\btous\s+les\s+(?:jours|matins|midis|soirs|mois|ans|étés|hivers|printemps|automnes)\b/gi,
    /\btoutes\s+les\s+(?:nuits|semaines|fois|années|saisons)\b/gi,
    /\btous\s+les\s+(?:lundis|mardis|mercredis|jeudis|vendredis|samedis|dimanches)\b/gi,
    /\btous\s+les\s+(?:deux|trois|quatre|cinq|six|sept|huit|neuf|dix|\d+)\s+(?:jours|matins|midis|soirs|mois|ans)\b/gi,
    /\btoutes\s+les\s+(?:deux|trois|quatre|cinq|six|sept|huit|neuf|dix|\d+)\s+(?:nuits|semaines|fois|années|saisons)\b/gi
  ];

  patterns.forEach(function(pattern){
    text=text.replace(pattern,freezeMatch)
  });

  return text
}

function restoreFixedExpressions(text){
  return text.replace(/⟦(\d+)⟧/g,function(match,n){
    return FROZEN[Number(n)]||match
  })
}

function replaceExact(text,from,to){
  var r=new RegExp("(^|[^A-Za-zÀ-ÖØ-öø-ÿ0-9_·.\\-])("+esc(from)+")(?![A-Za-zÀ-ÖØ-öø-ÿ0-9_·\\-])","gi");
  return text.replace(r,function(m,p,w){return p+keepCase(w,resolve(to))})
}

function rules(){
  var f=flags(),a=[];
  if(f.il)a=a.concat(IL);
  if(f.elle)a=a.concat(ELLE);
  if(f.all){
    a=a.concat(EXTRA.filter(function(r){
      return !/^(tous|toutes)$/i.test(r[0]);
    }));
  }
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
  var m=text.slice(off,off+170).toLowerCase().match(/[a-zà-öø-ÿ'’\-]+/g)||[];
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
  var a=afterWords(text,off+w.length,4);
  var skip=new Set(["et","ou","de","d","du","des","la","le","les","un","une","li","à"]);
  for(var i=0;i<a.length;i++){
    if(skip.has(a[i]))continue;
    return humanWord(a[i])
  }
  return false
}

function nextHumanAfter(text,off){
  var a=afterWords(text,off,7);
  var skip=new Set([
    "et","ou","de","d","du","des","la","le","les","li","un","une",
    "jeune","ancien","ancienne","anciens","anciennes",
    "nouveau","nouvelle","nouvel","nouveaux","nouvelles",
    "vieux","vieil","vieille","petit","petite","grand","grande",
    "bon","bonne","mauvais","mauvaise","premier","première",
    "dernier","dernière","simple","calme","célèbre","futur","future"
  ]);

  for(var i=0;i<a.length;i++){
    if(skip.has(a[i]))continue;
    return humanWord(a[i])
  }

  return false
}

function detBeforeHuman(text,off,w){
  var l=w.toLowerCase();
  if(l!=="un"&&l!=="une"&&l!=="tous"&&l!=="toutes")return false;
  return nextHumanAfter(text,off+w.length)
}

function replaceNeutralDet(text,pattern,replacement){
  return text.replace(pattern,function(match){
    var off=arguments[arguments.length-2];
    var full=arguments[arguments.length-1];

    if(nextHumanAfter(full,off+match.length)){
      return keepCase(match,replacement)
    }

    return match
  })
}

function applyNeutralDeterminers(text){
  if(!flags().neutral)return text;

  text=replaceNeutralDet(text,/\bde\s+l['’]/gi,"de li ");
  text=replaceNeutralDet(text,/\bde\s+la\s+/gi,"de li ");
  text=replaceNeutralDet(text,/\bdu\s+/gi,"de li ");

  text=replaceNeutralDet(text,/\bà\s+l['’]/gi,"à li ");
  text=replaceNeutralDet(text,/\bà\s+la\s+/gi,"à li ");
  text=replaceNeutralDet(text,/\bau\s+/gi,"à li ");

  text=replaceNeutralDet(text,/\bl['’]/gi,"li ");
  text=replaceNeutralDet(text,/\ble\s+/gi,"li ");
  text=replaceNeutralDet(text,/\bla\s+/gi,"li ");

  text=replaceNeutralDet(text,/\bun\s+/gi,"un·e ");
  text=replaceNeutralDet(text,/\bune\s+/gi,"un·e ");

  text=replaceNeutralDet(text,/\bce\s+/gi,"ce·tte ");
  text=replaceNeutralDet(text,/\bcet\s+/gi,"ce·tte ");
  text=replaceNeutralDet(text,/\bcette\s+/gi,"ce·tte ");

  return text
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
  if((l==="tous"||l==="toutes")&&(ctx||detBeforeHuman(text,off,w)||(neutral&&nextHumanAfter(text,off+w.length))))return keepCase(w,"toustes");

  if(w.length<3||noSuffix(w)||inclusiveAlready(text,off,w))return w;

  if(PEOPLE.has(l))return keepCase(w,PEOPLE.get(l));

  if(hctx){
    var hs=humanSuffix(w);
    if(hs&&!NO.has(l)&&!VERBS_NO.has(l))return hs
  }

  if((ctx||adjHuman)&&ADJ.has(l))return keepCase(w,ADJ.get(l));

  if((ctx||adjHuman)&&l.endsWith("euses")){
    var sing=l.slice(0,-1);
    if(FEM_EUSE.has(sing))return keepCase(w,sing.slice(0,-4)+"eux·se·s")
  }

  if((ctx||adjHuman)&&l.endsWith("euse")&&FEM_EUSE.has(l)){
    return keepCase(w,l.slice(0,-4)+"eux·se")
  }

  if((ctx||adjHuman)&&AMB[l]){
    return keepCase(w,AMB[l]+(pl?"·s":""))
  }

  if((ctx||adjHuman)&&l.endsWith("eux")&&l.length>3){
    return keepCase(w,l.slice(0,-3)+(pl?"eux·se·s":"eux·se"))
  }

  if(ctx){
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
    .replace(/\bli\s+/g,"li ")
    .replace(/\bLi\s+/g,"Li ")
}

function updateOptionDesc(){
  var desc=$("incOptionDesc");
  if(!desc)return;

  var il=$("incIl")&&$("incIl").checked;
  var elle=$("incElle")&&$("incElle").checked;
  var all=$("incAllPronouns")&&$("incAllPronouns").checked;
  var neutral=$("incNeutral")&&$("incNeutral").checked;

  if(neutral){
    desc.innerHTML="<strong>Neutralité active :</strong> pronoms, accords, métiers, noms de personnes et déterminants humains sont neutralisés.";
    return
  }

  if(all){
    desc.innerHTML="<strong>Conversion étendue :</strong> pronoms, possessifs, indéfinis et formes générales sont inclusivisés.";
    return
  }

  if(il&&elle){
    desc.innerHTML="<strong>Conversion ciblée :</strong> les formes liées à il et elle seront inclusivisées.";
    return
  }

  if(il&&!elle){
    desc.innerHTML="<strong>Conversion ciblée :</strong> seules les formes liées à il seront inclusivisées.";
    return
  }

  if(!il&&elle){
    desc.innerHTML="<strong>Conversion ciblée :</strong> seules les formes liées à elle seront inclusivisées.";
    return
  }

  desc.innerHTML="<strong>Aucune conversion active :</strong> le texte sera recopié sans transformation majeure."
}

function generate(){
  updateOptionDesc();

  var i=$("incInput"),o=$("incOutput");
  if(!i||!o)return;

  var im=i.scrollHeight-i.clientHeight,ratio=im>0?i.scrollTop/im:0,text=i.value;

  text=protectFixedExpressions(text);
  text=applyCompound(text);
  text=applyPronouns(text);
  text=applyNeutralDeterminers(text);
  text=applySuffixes(text);
  text=clean(text);
  text=restoreFixedExpressions(text);

  o.value=text;

  requestAnimationFrame(function(){
    var om=o.scrollHeight-o.clientHeight;
    o.scrollTop=om*ratio
  });

  if($("incStatus"))$("incStatus").textContent="Texte généré."
}

function copyOutput(){
  var o=$("incOutput");
  if(!o)return;

  o.focus();
  o.select();

  if(navigator.clipboard){
    navigator.clipboard.writeText(o.value).then(function(){
      if($("incStatus"))$("incStatus").textContent="Texte copié."
    })
  }else{
    document.execCommand("copy");
    if($("incStatus"))$("incStatus").textContent="Texte copié."
  }
}

function clearAll(){
  if($("incInput"))$("incInput").value="";
  if($("incOutput"))$("incOutput").value="";
  if($("incStatus"))$("incStatus").textContent="Texte vidé.";
  updateOptionDesc()
}

var syncing=false;

function syncScroll(a,b){
  if(syncing||!a||!b)return;
  syncing=true;

  var am=a.scrollHeight-a.clientHeight,bm=b.scrollHeight-b.clientHeight,ratio=am>0?a.scrollTop/am:0;

  b.scrollTop=bm*ratio;
  b.scrollLeft=a.scrollLeft;

  requestAnimationFrame(function(){syncing=false})
}

function optionChange(){
  updateOptionDesc();
  generate()
}

function bind(id,event,fn){
  var el=$(id);
  if(el)el.addEventListener(event,fn)
}

bind("incGenerate","click",generate);
bind("incCopy","click",copyOutput);
bind("incClear","click",clearAll);
bind("incInput","input",generate);
bind("incIl","change",optionChange);
bind("incElle","change",optionChange);
bind("incAllPronouns","change",optionChange);
bind("incNeutral","change",optionChange);
bind("incInput","scroll",function(){syncScroll($("incInput"),$("incOutput"))});
bind("incOutput","scroll",function(){syncScroll($("incOutput"),$("incInput"))});

updateOptionDesc();
})();
