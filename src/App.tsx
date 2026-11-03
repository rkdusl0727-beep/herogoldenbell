import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft, ArrowRight, BookOpen, Check, ChevronLeft, Download, Edit3, Expand,
  FileUp, HelpCircle, Home, Medal, Pause, Play, Plus, RotateCcw, Settings as SettingsIcon,
  Sparkles, Trash2, Upload, Volume2, VolumeX, X,
} from 'lucide-react'
import { categoryNames, defaultQuestions, typeNames } from './data/questions80'
import type { Category, GameMode, Question, QuestionType, Settings } from './types'
import { prepareFreshQueue, prepareQueue, shuffle } from './utils/questionQueue'

type Screen = 'home' | 'settings' | 'game' | 'editor' | 'finish'
type SavedSession = { queueIds:string[]; index:number; scores:[number,number]; correct:number; settings:Settings }

const DEFAULT_SETTINGS: Settings = {
  mode:'practice', categories:['song','person','hangul'], questionTypes:['blank','initial','missing','choice','ox','short'], excludedQuestionIds:[], count:20, random:true,
  hints:true, voice:true, voiceRate:.9, sound:true, scoreboard:true, autoReveal:false,
  finals:true, teamNames:['햇살팀','별빛팀'],
}

const iconCells: Record<string,number> = {
  mountain:0, crown:1, egg:2, sparkles:3, map:4, children:5, king:6,
  'turtle-ship':7, flag:8, sundial:9, cotton:10, painting:11, cards:12,
  hunmin:13, letters:14, waves:15, book:16, flower:17, 'water-clock':18, hall:19,
}
const portraitById: Record<string,string> = {
  p01:'./assets/people/sejong.png', p04:'./assets/people/yi-sun-sin.png',
  p07:'./assets/people/yu-gwan-sun.png', p10:'./assets/people/kim-jeong-ho.png',
  p13:'./assets/people/bang-jeong-hwan.png', p16:'./assets/people/shin-saimdang.png',
  p19:'./assets/people/jang-yeong-sil.png', p22:'./assets/people/mun-ik-jeom.png',
}
const balancedChoiceIds = [
  'p01','p02','p04','p05','p07','p08','p10','p11','p13','p14','p16','p17','p19','p20','p22','p23','p25','p26','p27','p28','p29',
  'h01','h02','h03','h04','h05','h06',
]
const QUESTION_COPY_VERSION = '2026-11-03-fresh-all-random-v17'
const LAST_ALL_ORDER_KEY = 'goldenbell-last-all-order'
function modeName(mode:GameMode) { return ({practice:'연습 골든벨',challenge:'도전 골든벨',team:'팀 대항전',cooperate:'협동 골든벨'} as const)[mode] }
function isVerbal(q:Question) { return ['blank','initial','missing','short'].includes(q.type) }
function displayQuestion(q:Question, revealed:boolean) {
  if (q.type === 'blank') {
    const blanks = Array.from(q.answer.replace(/\s/g,'')).map(()=>'□').join(' ')
    return q.question.replace(/□(?:\s*□)*/g, revealed ? q.answer : blanks)
  }
  if (q.type === 'missing' && revealed) {
    const answerLength=Array.from(q.answer.replace(/\s/g,'')).length
    const parts=q.question.trim().split(/\s+/)
    return `${parts.slice(0,-answerLength).join(' ')} ${q.answer}`.trim()
  }
  if(q.type==='initial'&&/^[ㄱ-ㅎ\s]+$/.test(q.question.trim())) {
    return defaultQuestions.find(item=>item.type==='initial'&&item.answer===q.answer)?.question || q.question
  }
  return q.question
}
function questionClue(q:Question) {
  if(q.type==='initial') return ''
  return q.clue?.trim() || ''
}
function distributeAnswerPosition(q:Question) {
  if(q.type==='sequence') return {...q,options:shuffle(q.options)}
  if(q.type!=='choice' || q.options.length<3 || !q.options.includes(q.answer)) return q
  const knownIndex=balancedChoiceIds.indexOf(q.id)
  const number=Number(q.id.replace(/\D/g,'')) || 1
  const target=(knownIndex>=0?knownIndex:number-1)%q.options.length
  const distractors=q.options.filter(option=>option!==q.answer)
  const options=[...distractors]
  options.splice(target,0,q.answer)
  return {...q,options}
}
function hintLimit(q:Question) {
  if(q.type==='initial') return Math.max(1,Array.from(q.answer.replace(/\s/g,'')).length)
  if(q.type==='missing') return Math.max(1,Array.from(q.hint).length)
  if(q.type==='short') return 1
  return 2
}
function hintText(q:Question,step:number) {
  if(q.type==='initial') return Array.from(q.answer).map((char,index)=>char===' '?' ':index<step?char:'○').join('')
  if(q.type==='missing') return `숨은 글자: ${Array.from(q.hint).slice(0,step).join(' · ')}`
  return q.hint
}
function AnimatedAnswer({answer}:{answer:string}) {
  return <b className="answer-letters">{Array.from(answer).map((letter,index)=><i key={`${letter}-${index}`} style={{animationDelay:`${index*.07}s`}}>{letter===' '?'\u00a0':letter}</i>)}</b>
}

function Bell({small=false, ringing=false}:{small?:boolean;ringing?:boolean}) {
  return <div className={`bell ${small?'bell-small':''} ${ringing?'ringing':''}`} aria-label="황금 골든벨">
    <div className="bell-handle"/><div className="bell-body"><span>★</span></div><div className="bell-lip"/><div className="bell-clapper"/>
  </div>
}

function Art({name, label}:{name:string;label?:string}) {
  if (name.startsWith('data:image') || name.endsWith('.png')) return <img className={`question-image ${name.endsWith('.png')?'person-portrait':''}`} src={name} alt={`${label || '위인'} 그림`} />
  const cell = iconCells[name] ?? 3
  const col = cell % 5, row = Math.floor(cell / 5)
  return <span className={`symbol-art png-art art-${name}`} role="img" aria-label={`${label || '위인'} 그림`} style={{backgroundImage:"url('./assets/quiz-icons-v2.png')",backgroundSize:'500% 400%',backgroundPosition:`${col*25}% ${row*(100/3)}%`}} />
}

function App() {
  const [screen,setScreen] = useState<Screen>('home')
  const [bank,setBank] = useState<Question[]>(() => {
    try {
      let saved:Question[] = JSON.parse(localStorage.getItem('goldenbell-bank') || '') || defaultQuestions
      if(localStorage.getItem('goldenbell-copy-version')!==QUESTION_COPY_VERSION){
        saved=defaultQuestions
        localStorage.setItem('goldenbell-copy-version',QUESTION_COPY_VERSION)
      }
      return saved.map(q => portraitById[q.id] ? {...q,image:portraitById[q.id]} : q)
    } catch {
      localStorage.setItem('goldenbell-copy-version',QUESTION_COPY_VERSION)
      return defaultQuestions
    }
  })
  const [settings,setSettings] = useState<Settings>(() => {
    try { return {...DEFAULT_SETTINGS,...JSON.parse(localStorage.getItem('goldenbell-settings') || '{}'),random:true} } catch { return DEFAULT_SETTINGS }
  })
  const [queue,setQueue] = useState<Question[]>([])
  const [index,setIndex] = useState(0)
  const [selected,setSelected] = useState<string[]>([])
  const [revealed,setRevealed] = useState(false)
  const [hintStep,setHintStep] = useState(0)
  const [teacherCorrect,setTeacherCorrect] = useState<boolean|null>(null)
  const [scores,setScores] = useState<[number,number]>([0,0])
  const [correct,setCorrect] = useState(0)
  const [awarded,setAwarded] = useState<Record<string,boolean>>({})
  const [ringing,setRinging] = useState(false)
  const [toast,setToast] = useState('')
  const fileInput = useRef<HTMLInputElement>(null)

  const filteredBank = useMemo(() => bank.filter(question =>
    settings.categories.includes(question.category) &&
    settings.questionTypes.includes(question.type) &&
    !settings.excludedQuestionIds.includes(question.id)
  ),[bank,settings.categories,settings.questionTypes,settings.excludedQuestionIds])
  const filteredCount = filteredBank.length
  const q = queue[index]
  const sequenceAnswer = q?.sequence?.join(' → ') || ''
  const pickedAnswer = q?.type === 'sequence' ? selected.join(' → ') : selected[0]
  const currentCorrect = isVerbal(q || {} as Question) ? teacherCorrect === true : pickedAnswer === (q?.answer || sequenceAnswer)

  useEffect(() => { localStorage.setItem('goldenbell-bank',JSON.stringify(bank)) },[bank])
  useEffect(() => { localStorage.setItem('goldenbell-settings',JSON.stringify(settings)) },[settings])
  useEffect(() => {
    if (screen !== 'game' || !queue.length) return
    const saved:SavedSession = {queueIds:queue.map(v=>v.id),index,scores,correct,settings}
    localStorage.setItem('goldenbell-session',JSON.stringify(saved))
  },[screen,queue,index,scores,correct,settings])
  useEffect(() => () => window.speechSynthesis?.cancel(),[])
  useEffect(() => { if(screen==='game') window.speechSynthesis?.cancel() },[index,screen])

  function notify(message:string) { setToast(message); window.setTimeout(()=>setToast(''),2200) }
  function beep(kind:'correct'|'reveal'|'bell'='reveal') {
    if (!settings.sound) return
    try {
      const AudioCtx = window.AudioContext || (window as typeof window & {webkitAudioContext:typeof AudioContext}).webkitAudioContext
      const ctx = new AudioCtx(); const now = ctx.currentTime
      const notes = kind==='bell' ? [392,523,659,784] : kind==='correct' ? [523,659,784] : [440,554]
      notes.forEach((freq,i)=>{ const o=ctx.createOscillator(), g=ctx.createGain(); o.type=kind==='bell'?'sine':'triangle'; o.frequency.value=freq; g.gain.setValueAtTime(.0001,now+i*.12); g.gain.exponentialRampToValueAtTime(.16,now+i*.12+.02); g.gain.exponentialRampToValueAtTime(.0001,now+i*.12+.55); o.connect(g).connect(ctx.destination); o.start(now+i*.12); o.stop(now+i*.12+.6) })
    } catch { /* 음향 미지원 환경에서도 계속 진행 */ }
  }
  function speak() {
    if (!q || !settings.voice || !('speechSynthesis' in window)) { notify('이 기기에서는 음성 읽기를 사용할 수 없어요.'); return }
    window.speechSynthesis.cancel()
    const spoken=q.type==='initial'?`${displayQuestion(q,false)}. 초성을 보고 생각해 보세요.`:q.question.replace(/□(?:\s*□)*/g,'빈칸')
    const u = new SpeechSynthesisUtterance(spoken)
    u.lang='ko-KR'; u.rate=settings.voiceRate
    const voices=window.speechSynthesis.getVoices(); u.voice=voices.find(v=>v.lang.toLowerCase().startsWith('ko')) || null
    window.speechSynthesis.speak(u)
  }
  function stopSpeak(){ window.speechSynthesis?.cancel() }

  function startPreset(kind:'song'|'person'|'all') {
    const cats:Category[]=kind==='song'?['song']:kind==='person'?['person']:['song','person','hangul']
    const types:QuestionType[]=kind==='song'?['blank','initial','missing']:kind==='person'?['choice','ox','short']:['blank','initial','missing','choice','ox','short']
    const max=bank.filter(v=>cats.includes(v.category)&&types.includes(v.type)&&!settings.excludedQuestionIds.includes(v.id)).length
    const next={...settings,categories:cats,questionTypes:types,count:kind==='all'?max:Math.min(settings.count,max),random:true}
    setSettings(next); startGame(next)
  }
  function startGame(next=settings) {
    const pool=bank.filter(v=>next.categories.includes(v.category)&&next.questionTypes.includes(v.type)&&!next.excludedQuestionIds.includes(v.id)).map(distributeAnswerPosition); const n=Math.min(next.count,pool.length)
    const allCategories=(['song','person','hangul'] as Category[]).every(category=>next.categories.includes(category))
    const allBankTypes=[...new Set(bank.map(question=>question.type))].every(type=>next.questionTypes.includes(type))
    const isFullGoldenBell=allCategories&&allBankTypes&&n===pool.length
    let previousIds:string[]=[]
    if(isFullGoldenBell){try{previousIds=JSON.parse(localStorage.getItem(LAST_ALL_ORDER_KEY)||'[]')}catch{previousIds=[]}}
    const result=isFullGoldenBell?prepareFreshQueue(pool,n,previousIds):prepareQueue(pool,n)
    if(!result.length){notify('출제할 문제를 하나 이상 선택해 주세요.');return}
    if(isFullGoldenBell) localStorage.setItem(LAST_ALL_ORDER_KEY,JSON.stringify(result.map(question=>question.id)))
    setSettings({...next,count:n,random:true}); setQueue(result); setIndex(0); setScores([0,0]); setCorrect(0); setAwarded({}); resetQuestion(); setScreen('game')
  }
  function continueGame(){
    try { const s:SavedSession=JSON.parse(localStorage.getItem('goldenbell-session')||''); const restored=s.queueIds.map(id=>bank.find(q=>q.id===id)).filter(Boolean) as Question[]; if(!restored.length) throw 0; setQueue(restored);setIndex(Math.min(s.index,restored.length-1));setScores(s.scores);setCorrect(s.correct);setSettings(s.settings);resetQuestion();setScreen('game') } catch { notify('이어할 게임이 없어요.') }
  }
  function resetQuestion(){ setSelected([]);setRevealed(false);setHintStep(0);setTeacherCorrect(null) }
  function choose(value:string){
    if(revealed)return
    if(q.type==='sequence'){ if(selected.includes(value)) setSelected(selected.filter(v=>v!==value)); else if(selected.length<(q.sequence?.length||3)) setSelected([...selected,value]) }
    else setSelected([value])
    if(settings.autoReveal && q.type!=='sequence') window.setTimeout(()=>reveal(value),180)
  }
  function reveal(forced?:string){
    if(revealed)return
    const answer=forced || (q.type==='sequence'?selected.join(' → '):selected[0])
    const right=isVerbal(q)?teacherCorrect===true:answer===(q.answer||sequenceAnswer)
    setRevealed(true); beep(right?'correct':'reveal')
    if(right && settings.mode!=='team' && !awarded[q.id]){ setCorrect(v=>v+1);setAwarded(v=>({...v,[q.id]:true})) }
  }
  function next(){ if(index>=queue.length-1){localStorage.removeItem('goldenbell-session');setScreen('finish');return} setIndex(v=>v+1);resetQuestion() }
  function prev(){ if(index>0){setIndex(v=>v-1);resetQuestion()} }
  function awardTeam(team:0|1,delta=10){ const key=`${q.id}-${team}`; if(delta>0&&awarded[key]){notify('이 문제 점수는 이미 받았어요.');return} setScores(v=>{const n:[number,number]=[...v] as [number,number];n[team]=Math.max(0,n[team]+delta);return n}); if(delta>0)setAwarded(v=>({...v,[key]:true})) }
  function ringBell(){ setRinging(true);beep('bell');window.setTimeout(()=>setRinging(false),1100) }
  function fullScreen(){ document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.() }

  const hasSession=!!localStorage.getItem('goldenbell-session')

  if(screen==='home') return <div className="app home-screen">
    <header className="brand-line"><button className="icon-btn" onClick={()=>setScreen('settings')} aria-label="교사 설정"><SettingsIcon/></button></header>
    <main className="hero">
      <div className="hero-copy"><div className="eyebrow"><Sparkles/> 함께 기억하고, 함께 도전해요</div><h1>우리나라<br/><em>위인 골든벨</em></h1><p>위인들의 이야기를 기억하고 골든벨을 울려요!</p></div>
      <div className="hero-bell"><div className="sunburst"/><img className="hero-quiz-image" src="./assets/goldenbell-quiz-hero.png" alt="황금 골든벨을 울리는 어린이들" /></div>
    </main>
    <section className="start-grid" aria-label="게임 시작">
      <button className="start-card song" onClick={()=>startPreset('song')}><span className="card-icon">♪</span><b>노래 골든벨</b><small>3가지 유형 · 50문제</small><ArrowRight/></button>
      <button className="start-card person" onClick={()=>startPreset('person')}><span className="card-icon">♛</span><b>위인 골든벨</b><small>10명의 이야기 · 39문제</small><ArrowRight/></button>
      <button className="start-card all" onClick={()=>startPreset('all')}><span className="card-icon">★</span><b>전체 골든벨</b><small>노래 · 위인 · 한글 · 95문제</small><ArrowRight/></button>
    </section>
    <div className="home-actions">{hasSession&&<button className="soft-btn" onClick={continueGame}><Play/> 이어서 하기</button>}<button className="soft-btn" onClick={()=>setScreen('settings')}><SettingsIcon/> 교사 설정</button><button className="soft-btn" onClick={()=>setScreen('editor')}><Edit3/> 문제 편집</button></div>
    <footer><span>총 95문제</span><i/> <span>음성 지원</span><i/> <span>오프라인 문제은행</span></footer>
    {toast&&<div className="toast">{toast}</div>}
  </div>

  if(screen==='settings') return <SettingsPanel settings={settings} setSettings={setSettings} bank={bank} available={filteredCount} onBack={()=>setScreen('home')} onEditor={()=>setScreen('editor')} onStart={()=>startGame()} />
  if(screen==='editor') return <Editor bank={bank} setBank={setBank} onBack={()=>setScreen('settings')} notify={notify} fileInput={fileInput}/>
  if(screen==='finish') return <Finish mode={settings.mode} scores={scores} correct={correct} total={queue.length} teamNames={settings.teamNames} ringing={ringing} onRing={ringBell} onHome={()=>setScreen('home')} onAgain={()=>startGame()} />

  return <div className="app game-screen">
    <header className="game-header">
      <button className="round-btn" onClick={()=>setScreen('home')} aria-label="홈"><Home/></button>
      <div className="progress-wrap"><div><b>{modeName(settings.mode)}</b><span>{index+1} / {queue.length}</span></div><div className="progress"><i style={{width:`${((index+1)/queue.length)*100}%`}}/></div></div>
      <div className="header-tools"><button className="round-btn" onClick={speak} aria-label="문제 읽기"><Volume2/></button><button className="round-btn" onClick={stopSpeak} aria-label="음성 중지"><Pause/></button><button className="round-btn" onClick={fullScreen} aria-label="전체 화면"><Expand/></button></div>
    </header>
    {settings.scoreboard&&<Scoreboard mode={settings.mode} correct={correct} scores={scores} teamNames={settings.teamNames} />}
    <main className="question-stage">
      <div className="question-meta"><span className={`cat cat-${q.category}`}>{categoryNames[q.category]}</span><span>{typeNames[q.type]}</span><span>{q.difficulty}</span>{q.verse&&<span>{q.verse}절</span>}{settings.finals&&index>=queue.length-3&&<strong><Medal/> 결승 문제</strong>}</div>
      <section className="question-card">
        <Art name={q.image} label={q.person || q.answer}/>
        <div className={`question-content type-${q.type}`}><p className="question-number">문제 {index+1}</p>{questionClue(q)&&<p className="question-clue">{questionClue(q)}</p>}{q.type==='initial'&&<span className="initial-label">초성 힌트</span>}<h2>{displayQuestion(q,revealed)}</h2>
          {hintStep>0&&!revealed&&<div className="hint-box"><HelpCircle/> 힌트 {hintStep}: {hintText(q,hintStep)}</div>}
          {q.type==='sequence'&&<div className="sequence-picked">{selected.length?selected.map((v,i)=><span key={v}>{i+1}. {v}</span>):<small>아래 카드를 순서대로 눌러 주세요</small>}</div>}
          {!isVerbal(q)&&<div className={`options ${q.type==='ox'?'ox-options':''}`}>{q.options.map((o,i)=><button key={o} onClick={()=>choose(o)} className={`${selected.includes(o)?'selected':''} ${revealed&&o===q.answer?'answer':''} ${revealed&&selected.includes(o)&&o!==q.answer?'wrong':''}`}><span>{q.type==='ox'?o:String.fromCharCode(65+i)}</span>{q.type==='ox'?'':o}</button>)}</div>}
          {isVerbal(q)&&!revealed&&<div className="teacher-judge"><span>아이들이 말한 답을 표시해 주세요</span><button className={teacherCorrect===true?'active':''} onClick={()=>setTeacherCorrect(true)}><Check/> 맞았어요</button><button className={teacherCorrect===false?'active no':''} onClick={()=>setTeacherCorrect(false)}><X/> 다시 생각해요</button></div>}
          {revealed&&<div className="answer-panel"><div className="answer-title"><Sparkles/><span>정답</span><AnimatedAnswer answer={q.answer}/></div><p>{q.explanation}</p></div>}
        </div>
      </section>
      {settings.mode==='team'&&settings.scoreboard&&<div className="team-controls">{settings.teamNames.map((name,i)=><div key={name}><b>{name}</b><button onClick={()=>awardTeam(i as 0|1,10)}>+10</button><button onClick={()=>awardTeam(i as 0|1,-10)}>−10</button></div>)}</div>}
    </main>
    <nav className="game-nav">
      <button onClick={prev} disabled={index===0}><ChevronLeft/> 이전</button>
      <div>{settings.hints&&<button className="hint-btn" onClick={()=>setHintStep(v=>Math.min(hintLimit(q),v+1))} disabled={revealed||hintStep>=hintLimit(q)}><HelpCircle/> 힌트</button>}<button className="reveal-btn" onClick={()=>reveal()} disabled={revealed||(!isVerbal(q)&&!selected.length)}><Sparkles/> 정답 공개</button></div>
      <button className="next-btn" onClick={next} disabled={!revealed}>{index===queue.length-1?'결과 보기':'다음'} <ArrowRight/></button>
    </nav>
    {toast&&<div className="toast">{toast}</div>}
  </div>
}

function Scoreboard({mode,correct,scores,teamNames}:{mode:GameMode;correct:number;scores:[number,number];teamNames:[string,string]}){
  if(mode==='team')return <aside className="score-strip teams"><span>{teamNames[0]} <b>{scores[0]}</b></span><span>VS</span><span>{teamNames[1]} <b>{scores[1]}</b></span></aside>
  return <aside className="score-strip"><span>{mode==='challenge'?'도전 점수':'함께 맞힌 문제'}</span><b>{mode==='challenge'?correct*10:correct}{mode==='challenge'?'점':'개'}</b></aside>
}

function SettingsPanel({settings,setSettings,bank,available,onBack,onEditor,onStart}:{settings:Settings;setSettings:(s:Settings)=>void;bank:Question[];available:number;onBack:()=>void;onEditor:()=>void;onStart:()=>void}){
  const modes:[GameMode,string,string][]=[['practice','연습 골든벨','힌트와 자유로운 이동'],['challenge','도전 골든벨','문제당 10점'],['team','팀 대항전','두 팀 점수판'],['cooperate','협동 골든벨','탈락 없이 모두 함께']]
  const allTypes=(Object.keys(typeNames) as QuestionType[]).filter(type=>bank.some(question=>question.type===type))
  const quickCounts=[5,10,15,20,25,30,40,50,60,70,80,85,90]
  const matching=bank.filter(q=>settings.categories.includes(q.category)&&settings.questionTypes.includes(q.type))
  const countValue=Math.min(settings.count,Math.max(1,available))
  const apply=(next:Settings)=>{
    const usable=bank.filter(q=>next.categories.includes(q.category)&&next.questionTypes.includes(q.type)&&!next.excludedQuestionIds.includes(q.id)).length
    setSettings({...next,count:Math.min(Math.max(1,next.count),Math.max(1,usable))})
  }
  const toggleCat=(cat:Category)=>{
    const cats=settings.categories.includes(cat)?settings.categories.filter(v=>v!==cat):[...settings.categories,cat]
    if(cats.length)apply({...settings,categories:cats})
  }
  const toggleType=(type:QuestionType)=>{
    const types=settings.questionTypes.includes(type)?settings.questionTypes.filter(v=>v!==type):[...settings.questionTypes,type]
    if(types.length)apply({...settings,questionTypes:types})
  }
  const toggleQuestion=(id:string)=>{
    const excluded=settings.excludedQuestionIds.includes(id)?settings.excludedQuestionIds.filter(v=>v!==id):[...settings.excludedQuestionIds,id]
    apply({...settings,excludedQuestionIds:excluded})
  }
  const setMatching=(checked:boolean)=>{
    const ids=new Set(matching.map(q=>q.id))
    const excluded=checked?settings.excludedQuestionIds.filter(id=>!ids.has(id)):[...new Set([...settings.excludedQuestionIds,...ids])]
    apply({...settings,excludedQuestionIds:excluded})
  }
  return <div className="panel-page"><header><button className="round-btn" onClick={onBack}><ArrowLeft/></button><div><small>우리나라 위인 골든벨</small><h1>교사 설정</h1></div><button className="soft-btn" onClick={onEditor}><Edit3/> 문제 편집</button></header>
    <main className="settings-layout">
      <section className="setting-card"><h2>1. 진행 모드</h2><div className="mode-grid">{modes.map(([id,name,desc])=><button className={settings.mode===id?'active':''} onClick={()=>setSettings({...settings,mode:id})} key={id}><b>{name}</b><small>{desc}</small></button>)}</div>{settings.mode==='team'&&<div className="team-inputs"><input value={settings.teamNames[0]} onChange={e=>setSettings({...settings,teamNames:[e.target.value,settings.teamNames[1]]})}/><input value={settings.teamNames[1]} onChange={e=>setSettings({...settings,teamNames:[settings.teamNames[0],e.target.value]})}/></div>}</section>

      <section className="setting-card"><h2>2. 주제와 유형 고르기</h2>
        <div className="check-grid">{(['song','person','hangul'] as Category[]).map(c=><label key={c}><input type="checkbox" checked={settings.categories.includes(c)} onChange={()=>toggleCat(c)}/><span>{categoryNames[c]}<small>{c==='song'?'50문제':c==='person'?'39문제':'6문제'}</small></span></label>)}</div>
        <div className="type-check-grid">{allTypes.map(type=><label key={type}><input type="checkbox" checked={settings.questionTypes.includes(type)} onChange={()=>toggleType(type)}/><span>{typeNames[type]}<small>{bank.filter(q=>q.type===type).length}문제</small></span></label>)}</div>
      </section>

      <section className="setting-card"><h2>3. 출제할 문제 수</h2>
        <div className="quick-counts">{quickCounts.filter(n=>n<available).map(n=><button key={n} className={countValue===n?'active':''} onClick={()=>setSettings({...settings,count:n})}>{n}</button>)}<button className={countValue===available?'active':''} onClick={()=>setSettings({...settings,count:Math.max(1,available)})}>전체 {available}</button></div>
        <div className="range-row"><label>문제 수 <b>{Math.min(countValue,available)}문제</b></label><input type="range" min="1" max={Math.max(1,available)} value={countValue} onChange={e=>setSettings({...settings,count:Number(e.target.value)})}/><input className="count-input" type="number" min="1" max={Math.max(1,available)} value={countValue} onChange={e=>setSettings({...settings,count:Math.min(Math.max(1,Number(e.target.value)||1),Math.max(1,available))})}/></div>
        <p className="setting-note">필터와 직접 선택에 따라 최대 문제 수가 자동으로 조정됩니다. 같은 문제는 한 회차에 한 번만 나옵니다.</p>
      </section>

      <section className="setting-card manual-picker"><details><summary><span><b>4. 출제할 문제 직접 체크</b><small>현재 조건 {matching.length}개 중 {available}개 선택</small></span><ArrowRight/></summary>
        <div className="manual-actions"><button onClick={()=>setMatching(true)}>현재 조건 모두 선택</button><button onClick={()=>setMatching(false)}>현재 조건 모두 해제</button></div>
        <div className="manual-list">{matching.map((question,index)=><label key={question.id}><input type="checkbox" checked={!settings.excludedQuestionIds.includes(question.id)} onChange={()=>toggleQuestion(question.id)}/><span><b>{String(index+1).padStart(2,'0')}</b><em>{typeNames[question.type]}</em>{question.clue?`${question.clue} · ${question.question}`:question.question}</span></label>)}</div>
      </details></section>

      <section className="setting-card"><h2>5. 수업 도구</h2><div className="switch-list">
        <div className="random-status"><span>문제 순서</span><b>항상 무작위</b></div><Switch label="힌트 사용" value={settings.hints} onChange={v=>setSettings({...settings,hints:v})}/><Switch label="한국어 음성" value={settings.voice} onChange={v=>setSettings({...settings,voice:v})}/><Switch label="효과음" value={settings.sound} onChange={v=>setSettings({...settings,sound:v})}/><Switch label="점수판 표시" value={settings.scoreboard} onChange={v=>setSettings({...settings,scoreboard:v})}/><Switch label="선택 후 자동 공개" value={settings.autoReveal} onChange={v=>setSettings({...settings,autoReveal:v})}/><Switch label="마지막 3문제 결승" value={settings.finals} onChange={v=>setSettings({...settings,finals:v})}/>
      </div><div className="rate-row"><label>읽기 속도 <b>{settings.voiceRate.toFixed(1)}×</b></label><input type="range" min="0.6" max="1.2" step="0.1" value={settings.voiceRate} onChange={e=>setSettings({...settings,voiceRate:Number(e.target.value)})}/></div></section>
    </main><div className="panel-footer"><button className="reset-btn" onClick={()=>setSettings(DEFAULT_SETTINGS)}><RotateCcw/> 기본값</button><div><span>출제 가능 {available}문제</span><button className="primary-btn" onClick={onStart} disabled={!available}>이 설정으로 시작 <ArrowRight/></button></div></div>
  </div>
}

function Switch({label,value,onChange}:{label:string;value:boolean;onChange:(v:boolean)=>void}){return <label className="switch-row"><span>{label}</span><input type="checkbox" checked={value} onChange={e=>onChange(e.target.checked)}/><i/></label>}

function Editor({bank,setBank,onBack,notify,fileInput}:{bank:Question[];setBank:(q:Question[])=>void;onBack:()=>void;notify:(s:string)=>void;fileInput:React.RefObject<HTMLInputElement|null>}){
  const [filter,setFilter]=useState<'all'|Category>('all'); const [editing,setEditing]=useState<Question|null>(null)
  const visible=filter==='all'?bank:bank.filter(v=>v.category===filter)
  function save(q:Question){ if(!q.id.trim()||!q.question.trim()||!q.answer.trim()){notify('ID, 질문, 정답은 꼭 입력해 주세요.');return} if(bank.some(v=>v.id===q.id&&v!==editing)){notify('같은 ID가 이미 있어요.');return} setBank(editing?bank.map(v=>v.id===editing.id?q:v):[...bank,q]);setEditing(null);notify('문제를 저장했어요.') }
  function exportJson(){const blob=new Blob([JSON.stringify(bank,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='어진반-위인골든벨-문제은행.json';a.click();URL.revokeObjectURL(a.href)}
  function importJson(file?:File){if(!file)return;const reader=new FileReader();reader.onload=()=>{try{const data=JSON.parse(String(reader.result));if(!Array.isArray(data)||data.some(q=>!q.id||!q.question||!q.answer||!q.category||!q.type))throw 0;setBank(data);notify(`${data.length}문제를 가져왔어요.`)}catch{notify('올바른 문제 JSON 파일이 아니에요.')}};reader.readAsText(file)}
  return <div className="panel-page editor-page"><header><button className="round-btn" onClick={onBack}><ArrowLeft/></button><div><small>오프라인 문제은행</small><h1>문제 편집</h1></div><div className="editor-actions"><input ref={fileInput} hidden type="file" accept="application/json" onChange={e=>importJson(e.target.files?.[0])}/><button className="soft-btn" onClick={()=>fileInput.current?.click()}><Upload/> JSON 가져오기</button><button className="soft-btn" onClick={exportJson}><Download/> 내보내기</button><button className="soft-btn" onClick={()=>{if(confirm('기본 95문제로 복원할까요?'))setBank(defaultQuestions)}}><RotateCcw/> 기본 복원</button></div></header>
    <div className="editor-toolbar"><div>{(['all','song','person','hangul'] as const).map(c=><button className={filter===c?'active':''} onClick={()=>setFilter(c)} key={c}>{c==='all'?`전체 ${bank.length}`:`${categoryNames[c]} ${bank.filter(v=>v.category===c).length}`}</button>)}</div><button className="primary-btn" onClick={()=>setEditing({id:`custom-${Date.now()}`,category:'person',type:'choice',difficulty:'쉬움',question:'',options:['','',''],answer:'',explanation:'',hint:'',image:'sparkles'})}><Plus/> 문제 추가</button></div>
    <main className="question-table">{visible.map((q,i)=><article key={q.id}><span>{String(i+1).padStart(2,'0')}</span><div><div><b>{categoryNames[q.category]}</b><small>{typeNames[q.type]} · {q.difficulty}{q.verse?` · ${q.verse}절`:''}</small></div><h3>{q.clue?`${q.clue} · ${q.question}`:q.question}</h3><p>정답: <strong>{q.answer}</strong></p></div><button onClick={()=>setEditing(q)}><Edit3/></button><button className="danger" onClick={()=>{if(confirm('이 문제를 삭제할까요?'))setBank(bank.filter(v=>v.id!==q.id))}}><Trash2/></button></article>)}</main>
    {editing&&<QuestionForm value={editing} onCancel={()=>setEditing(null)} onSave={save}/>} 
  </div>
}

function QuestionForm({value,onCancel,onSave}:{value:Question;onCancel:()=>void;onSave:(q:Question)=>void}){
  const [q,setQ]=useState(value); const imageRef=useRef<HTMLInputElement>(null)
  function image(file?:File){if(!file)return; if(file.size>700000){alert('이미지는 700KB보다 작게 준비해 주세요.');return}const r=new FileReader();r.onload=()=>setQ({...q,image:String(r.result)});r.readAsDataURL(file)}
  return <div className="modal-backdrop"><form className="question-form" onSubmit={e=>{e.preventDefault();onSave(q)}}><header><div><small>{value.question?'문제 수정':'새 문제'}</small><h2>문제 정보</h2></div><button type="button" onClick={onCancel}><X/></button></header><div className="form-grid">
    <label>ID<input value={q.id} onChange={e=>setQ({...q,id:e.target.value})}/></label><label>주제<select value={q.category} onChange={e=>setQ({...q,category:e.target.value as Category})}><option value="song">노래 기억</option><option value="person">우리나라 위인</option><option value="hangul">한글 심화</option></select></label><label>유형<select value={q.type} onChange={e=>setQ({...q,type:e.target.value as Question['type']})}>{Object.entries(typeNames).map(([k,v])=><option value={k} key={k}>{v}</option>)}</select></label><label>난이도<select value={q.difficulty} onChange={e=>setQ({...q,difficulty:e.target.value as Question['difficulty']})}><option>쉬움</option><option>보통</option><option>도전</option></select></label>
    <label className="wide">질문<textarea value={q.question} onChange={e=>setQ({...q,question:e.target.value})}/></label><label className="wide">추가 단서 문장<input value={q.clue||''} onChange={e=>setQ({...q,clue:e.target.value})}/></label><label className="wide">보기 (쉼표로 구분)<input value={q.options.join(', ')} onChange={e=>setQ({...q,options:e.target.value.split(',').map(v=>v.trim())})}/></label><label>정답<input value={q.answer} onChange={e=>setQ({...q,answer:e.target.value})}/></label><label>위인 이름<input value={q.person||''} onChange={e=>setQ({...q,person:e.target.value})}/></label><label className="wide">힌트<input value={q.hint} onChange={e=>setQ({...q,hint:e.target.value})}/></label><label className="wide">해설<textarea value={q.explanation} onChange={e=>setQ({...q,explanation:e.target.value})}/></label><label className="wide">이미지<input ref={imageRef} type="file" accept="image/*" onChange={e=>image(e.target.files?.[0])}/><small>또는 기본 상징 이름: {q.image}</small></label>
  </div><footer><button type="button" className="soft-btn" onClick={onCancel}>취소</button><button className="primary-btn"><Check/> 저장</button></footer></form></div>
}

function Finish({mode,scores,correct,total,teamNames,ringing,onRing,onHome,onAgain}:{mode:GameMode;scores:[number,number];correct:number;total:number;teamNames:[string,string];ringing:boolean;onRing:()=>void;onHome:()=>void;onAgain:()=>void}){
  const winner=scores[0]===scores[1]?'두 팀 모두':scores[0]>scores[1]?teamNames[0]:teamNames[1]
  return <div className="finish-screen"><div className="confetti" aria-hidden>{Array.from({length:24},(_,i)=><i key={i}/>)}</div><div className="finish-copy"><span>어진반 친구들의 멋진 도전!</span><h1>우리나라 위인<br/><em>골든벨!</em></h1><p>우리가 함께 골든벨을 울렸어요!</p>{mode==='team'?<div className="result-score">🏆 {winner} 골든벨! <small>{teamNames[0]} {scores[0]}점 · {teamNames[1]} {scores[1]}점</small></div>:<div className="result-score">⭐ {correct}문제를 함께 맞혔어요! <small>전체 {total}문제</small></div>}</div><button className="big-bell" onClick={onRing}><Bell ringing={ringing}/><b>종을 눌러 보세요!</b></button><div className="finish-actions"><button className="soft-btn" onClick={onHome}><Home/> 처음으로</button><button className="primary-btn" onClick={onAgain}><RotateCcw/> 다시 도전</button></div></div>
}

export default App
