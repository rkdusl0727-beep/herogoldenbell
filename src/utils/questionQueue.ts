import type { Category, Question } from '../types'

export function shuffle<T>(items:T[]) {
  const mixed=[...items]
  for(let i=mixed.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1)); [mixed[i],mixed[j]]=[mixed[j],mixed[i]]
  }
  return mixed
}

const isVerbal=(question:Question)=>['blank','initial','missing'].includes(question.type)

function shuffleBalanced(items:Question[]) {
  const buckets = new Map<Question['type'],Question[]>()
  shuffle(items).forEach(question => {
    const bucket=buckets.get(question.type) || []
    bucket.push(question); buckets.set(question.type,bucket)
  })
  const result:Question[]=[]
  let lastType:Question['type']|undefined
  let lastCategory:Category|undefined
  let lastPerson:string|undefined
  let lastVerse:Question['verse']|undefined
  let verbalStreak=0
  const verbalCount=items.filter(isVerbal).length
  const selectableCount=items.length-verbalCount
  const maxVerbalStreak=selectableCount ? Math.max(1,Math.ceil(verbalCount/(selectableCount+1))) : verbalCount
  while(result.length<items.length){
    const available=[...buckets.entries()].filter(([,bucket])=>bucket.length)
    const hasSelectable=available.some(([,bucket])=>!isVerbal(bucket[0]))
    const answerBalanced=verbalStreak>=maxVerbalStreak && hasSelectable
      ? available.filter(([,bucket])=>!isVerbal(bucket[0]))
      : available
    const differentType=answerBalanced.filter(([type])=>type!==lastType)
    const candidates=differentType.length?differentType:answerBalanced
    const largest=Math.max(...candidates.map(([,bucket])=>bucket.length))
    const typeChoices=shuffle(candidates.filter(([,bucket])=>bucket.length===largest))
    const [type,bucket]=typeChoices[0]
    const differentVerse=bucket.filter(question=>!question.verse||question.verse!==lastVerse)
    const varied=differentVerse.filter(question=>question.category!==lastCategory && (!question.person || question.person!==lastPerson))
    const categoryVaried=differentVerse.filter(question=>question.category!==lastCategory)
    const pickFrom=varied.length?varied:categoryVaried.length?categoryVaried:differentVerse.length?differentVerse:bucket
    const picked=pickFrom[Math.floor(Math.random()*pickFrom.length)]
    bucket.splice(bucket.indexOf(picked),1)
    result.push(picked); lastType=type; lastCategory=picked.category; lastPerson=picked.person
    lastVerse=picked.category==='song'?picked.verse:undefined
    verbalStreak=isVerbal(picked)?verbalStreak+1:0
  }
  return result
}

function selectBalancedSongVerses(pool:Question[],count:number) {
  const buckets=new Map<number,Question[]>([1,2,3,4,5].map(verse=>[verse,shuffle(pool.filter(question=>question.verse===verse))]))
  const selected:Question[]=[]
  let verseOrder=shuffle([1,2,3,4,5])
  let lastVerse:number|undefined
  let lastType:Question['type']|undefined
  while(selected.length<count){
    let added=false
    if(verseOrder.length>1&&verseOrder[0]===lastVerse) verseOrder.push(verseOrder.shift()!)
    for(const verse of verseOrder){
      const bucket=buckets.get(verse) || []
      if(bucket.length&&selected.length<count){
        const varied=bucket.filter(question=>question.type!==lastType)
        const choices=varied.length?varied:bucket
        const picked=choices[Math.floor(Math.random()*choices.length)]
        bucket.splice(bucket.indexOf(picked),1)
        selected.push(picked); lastVerse=verse; lastType=picked.type; added=true
      }
    }
    if(!added) break
    verseOrder=shuffle(verseOrder.filter(verse=>(buckets.get(verse)?.length||0)>0))
  }
  return selected
}

export function prepareQueue(pool:Question[],count:number) {
  const limit=Math.min(count,pool.length)
  const baseline=shuffleBalanced(pool).slice(0,limit)
  const typedSongPool=pool.filter(question=>question.category==='song'&&question.verse)
  const typedSongCount=baseline.filter(question=>question.category==='song'&&question.verse).length
  if(!typedSongCount) return baseline
  const balancedSongs=selectBalancedSongVerses(typedSongPool,typedSongCount)
  const otherQuestions=baseline.filter(question=>question.category!=='song'||!question.verse)
  let songIndex=0
  return shuffleBalanced([...otherQuestions,...balancedSongs]).map(question=>
    question.category==='song'&&question.verse ? balancedSongs[songIndex++] : question
  )
}
