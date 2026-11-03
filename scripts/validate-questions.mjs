import { defaultQuestions } from '../src/data/questions80.ts'
import { prepareQueue } from '../src/utils/questionQueue.ts'

const errors=[]
const expect=(condition,message)=>{if(!condition)errors.push(message)}
const count=(items,key,value)=>items.filter(item=>item[key]===value).length
const initialsOf=(name)=>{
  const choseong='ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'
  return Array.from(name.replace(/\s/g,'')).map(char=>{
    const code=char.charCodeAt(0)-0xac00
    return code>=0&&code<11172?choseong[Math.floor(code/588)]:char
  }).join('')
}

expect(defaultQuestions.length===90,`전체 문제 수: ${defaultQuestions.length} (예상 90)`)
expect(new Set(defaultQuestions.map(q=>q.id)).size===90,'문제 ID가 중복되었습니다.')
expect(count(defaultQuestions,'category','song')===50,'노래 문제는 50개여야 합니다.')
expect(count(defaultQuestions,'category','person')===34,'개별 위인 문제는 34개여야 합니다.')
expect(count(defaultQuestions,'category','hangul')===6,'한글 심화 문제는 6개여야 합니다.')

const song=defaultQuestions.filter(q=>q.category==='song')
const expectedSongTypes={blank:25,initial:15,missing:10}
for(const [type,total] of Object.entries(expectedSongTypes)) expect(count(song,'type',type)===total,`노래 ${type} 문제는 ${total}개여야 합니다.`)
expect(song.every(q=>Object.hasOwn(expectedSongTypes,q.type)),'노래 문제에 허용되지 않은 유형이 있습니다.')
const initialCues={s16:'신라 장군',s17:'떡방아',s18:'황산벌의',s19:'말 목 자른',s20:'천축국',s21:'화포',s22:'황희 정승',s23:'오죽헌',s24:'몸 바쳐서',s25:'번쩍번쩍',s26:'단원 풍속도',s27:'지도',s28:'삼십삼인',s29:'장군의 아들',s30:'황소 그림'}
for(const q of song.filter(q=>q.type==='initial')) expect(q.question===`${initialCues[q.id]} ${initialsOf(q.answer)}`&& !q.clue,`${q.id}: 가사 핵심어와 초성이 한 줄에 정확히 있어야 합니다.`)
expect(song.every(q=>[1,2,3,4,5].includes(q.verse)), '모든 노래 문제에 1~5절 정보가 있어야 합니다.')
for(const verse of [1,2,3,4,5]){
  const verseQuestions=song.filter(q=>q.verse===verse)
  expect(verseQuestions.length===10,`${verse}절 문제는 10개여야 합니다.`)
  expect(count(verseQuestions,'type','blank')===5,`${verse}절 빈칸 문제는 5개여야 합니다.`)
  expect(count(verseQuestions,'type','initial')===3,`${verse}절 초성 문제는 3개여야 합니다.`)
  expect(count(verseQuestions,'type','missing')===2,`${verse}절 이름 완성 문제는 2개여야 합니다.`)
}
for(const type of [undefined,'blank','initial','missing']){
  const pool=type?song.filter(q=>q.type===type):song
  const counts=[1,2,3,4,5,7,10,15,20,Math.min(30,pool.length),pool.length]
  for(const requested of new Set(counts)) for(let attempt=0;attempt<8;attempt++){
    const queue=prepareQueue(pool,requested)
    const verseCounts=[1,2,3,4,5].map(verse=>queue.filter(q=>q.verse===verse).length)
    expect(queue.length===Math.min(requested,pool.length),`${type||'전체'} ${requested}문제 대기열 길이가 맞지 않습니다.`)
    expect(new Set(queue.map(q=>q.id)).size===queue.length,`${type||'전체'} ${requested}문제 대기열에 중복 문제가 있습니다.`)
    expect(Math.max(...verseCounts)-Math.min(...verseCounts)<=1,`${type||'전체'} ${requested}문제의 절별 분배가 고르지 않습니다. (${verseCounts.join('/')})`)
    for(let end=1;end<=queue.length;end++){
      const prefix=queue.slice(0,end)
      const prefixCounts=[1,2,3,4,5].map(verse=>prefix.filter(q=>q.verse===verse).length)
      expect(Math.max(...prefixCounts)-Math.min(...prefixCounts)<=1,`${type||'전체'} ${requested}문제의 ${end}번째까지 절 순환이 고르지 않습니다. (${prefixCounts.join('/')})`)
    }
  }
}
const bannedSongPhrases=['노래의','노래에서','이어지는','함께 나오는','다음 인물','이름 완성']
expect(!song.some(q=>[q.question,q.clue].filter(Boolean).some(text=>bannedSongPhrases.some(phrase=>text.includes(phrase)))),'노래 문제에 설명형 메타 표현이 남아 있습니다.')
expect(!song.some(q=>/[?？]|누구일까요|무엇일까요/.test(q.question)),'노래 문제는 질문문이 아니라 가사 핵심어와 빈칸·초성으로 표시해야 합니다.')
expect(!song.some(q=>q.question.includes('어려운 사람을 돕는 이야기')),'가사에 없는 홍길동 이야기 문제는 삭제해야 합니다.')
expect(song.some(q=>q.answer==='정약용'&&q.question.startsWith('목민심서 ')),'정약용과 목민심서를 연결한 노래 문제가 필요합니다.')
expect(!song.some(q=>[q.question,q.clue,q.explanation].filter(Boolean).some(text=>text.includes('노래 속')||text.includes('노래에서는'))),'노래 문제에 반복적인 “노래 속” 표현이 남아 있습니다.')

for(const q of defaultQuestions){
  expect(Boolean(q.answer.trim()),`${q.id}: 정답이 비어 있습니다.`)
  if(q.type==='blank') expect((q.question.match(/□/g)||[]).length===Array.from(q.answer.replace(/\s/g,'')).length,`${q.id}: 빈칸 수와 정답 글자 수가 다릅니다.`)
  if(q.type==='initial') {
    const shownInitials=q.question.trim().split(/\s+/).at(-1)
    expect(shownInitials===initialsOf(q.answer),`${q.id}: 초성이 정답과 일치하지 않습니다. (${shownInitials} / ${initialsOf(q.answer)})`)
  }
  if(q.type==='missing') expect((q.question.match(/□/g)||[]).length===Array.from(q.hint).length,`${q.id}: 숨긴 글자 수와 힌트 글자 수가 다릅니다.`)
  if(q.type==='sequence'){
    expect(q.sequence?.length===3,`${q.id}: 순서 카드는 3개여야 합니다.`)
    expect(q.answer===q.sequence?.join(' → '),`${q.id}: 순서 정답 문자열이 일치하지 않습니다.`)
    expect(new Set(q.options).size===3&&q.sequence?.every(name=>q.options.includes(name)),`${q.id}: 순서 보기와 정답 카드가 다릅니다.`)
  }
  if(q.type==='choice') expect(q.options.length===3&&q.options.includes(q.answer),`${q.id}: 3지선다 보기 또는 정답이 올바르지 않습니다.`)
  if(q.type==='ox') expect(q.options.join('')==='OX'&&q.options.includes(q.answer),`${q.id}: OX 정답이 올바르지 않습니다.`)
}

const songOrder=['단군','동명왕','온조왕','박혁거세','광개토대왕','이사부','백결선생','의자왕','계백','관창','김유신','문무왕','원효대사','혜초','장보고','대조영','강감찬','서희','정중부','최무선','김부식','지눌','의천','이종무','정몽주','문익점','최충','일연','최영','황희','맹사성','장영실','신숙주','한명회','이율곡','이퇴계','신사임당','곽재우','조헌','김시민','이순신','논개','권율','홍길동','임꺽정','박문수','한석봉','김홍도','김삿갓','김정호','영조','정조','정약용','전봉준','김대건','황진이','홍경래','김옥균','안중근','윤동주','지석영','손병희','유관순','안창호','방정환','김두한','이상','이중섭']
for(const q of song.filter(q=>q.type==='sequence')){
  const positions=q.sequence.map(name=>songOrder.indexOf(name))
  expect(positions.every(index=>index>=0)&&positions.every((index,i)=>i===0||index>positions[i-1]),`${q.id}: 노래 속 인물 순서가 기준 순서와 다릅니다.`)
}

const people=defaultQuestions.filter(q=>q.category==='person')
const requiredPeople={세종대왕:4,허준:1,이순신:4,유관순:5,김정호:4,방정환:4,신사임당:4,장영실:4,문익점:3,안중근:1}
for(const [person,total] of Object.entries(requiredPeople)) expect(people.filter(q=>q.person===person).length===total,`${person} 문제는 ${total}개여야 합니다.`)
for(const answer of ['초충도','대동여지도','동의보감','유묵','아우내장터']) expect(people.some(q=>q.answer===answer),`위인 골든벨에 정답 ‘${answer}’ 문제가 있어야 합니다.`)
expect(!people.some(q=>q.person==='정약용'),'정약용은 개별 위인 문제에 포함할 수 없습니다.')
const bang=people.filter(q=>q.person==='방정환')
expect(bang.every(q=>q.difficulty==='쉬움'),'방정환 문제는 모두 쉬움이어야 합니다.')
expect(bang.some(q=>q.answer==='작가'),'방정환 직업 정답은 작가여야 합니다.')
expect(people.every(q=>q.type==='choice'||q.type==='ox'||q.type==='short'),'개별 위인 문제는 3지선다, OX 또는 주관식만 허용합니다.')
const shortAnswers=people.filter(q=>q.type==='short')
expect(shortAnswers.length===5,'위인 주관식 문제는 5개여야 합니다.')
expect(shortAnswers.every(q=>q.options.length===0),'주관식 문제에는 정답 보기를 제시하지 않아야 합니다.')
const oxAnswers=people.filter(q=>q.type==='ox').map(q=>q.answer)
expect(oxAnswers.filter(answer=>answer==='O').length===4&&oxAnswers.filter(answer=>answer==='X').length===4,'OX 정답은 O 4개, X 4개여야 합니다.')

if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('검증 완료: 90문제 · 노래 50(빈칸 25/초성 15/이름 완성 10) · 순서 문제 0 · 위인 34(주관식 5) · 한글 6')
