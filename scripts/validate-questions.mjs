import { defaultQuestions } from '../src/data/questions80.ts'

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

expect(defaultQuestions.length===80,`전체 문제 수: ${defaultQuestions.length} (예상 80)`)
expect(new Set(defaultQuestions.map(q=>q.id)).size===80,'문제 ID가 중복되었습니다.')
expect(count(defaultQuestions,'category','song')===50,'노래 문제는 50개여야 합니다.')
expect(count(defaultQuestions,'category','person')===24,'개별 위인 문제는 24개여야 합니다.')
expect(count(defaultQuestions,'category','hangul')===6,'한글 심화 문제는 6개여야 합니다.')

const song=defaultQuestions.filter(q=>q.category==='song')
const expectedSongTypes={blank:15,initial:15,missing:10,sequence:10}
for(const [type,total] of Object.entries(expectedSongTypes)) expect(count(song,'type',type)===total,`노래 ${type} 문제는 ${total}개여야 합니다.`)
expect(song.every(q=>Object.hasOwn(expectedSongTypes,q.type)),'노래 문제에 허용되지 않은 유형이 있습니다.')

for(const q of defaultQuestions){
  expect(Boolean(q.answer.trim()),`${q.id}: 정답이 비어 있습니다.`)
  if(q.type==='blank') expect((q.question.match(/□/g)||[]).length===Array.from(q.answer.replace(/\s/g,'')).length,`${q.id}: 빈칸 수와 정답 글자 수가 다릅니다.`)
  if(q.type==='initial') expect(q.question===initialsOf(q.answer),`${q.id}: 초성이 정답과 일치하지 않습니다. (${q.question} / ${initialsOf(q.answer)})`)
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
const requiredPeople=['세종대왕','이순신','유관순','김정호','방정환','신사임당','장영실','문익점']
for(const person of requiredPeople) expect(people.filter(q=>q.person===person).length===3,`${person} 문제는 3개여야 합니다.`)
expect(!people.some(q=>q.person==='정약용'),'정약용은 개별 위인 문제에 포함할 수 없습니다.')
const bang=people.filter(q=>q.person==='방정환')
expect(bang.every(q=>q.difficulty==='쉬움'),'방정환 문제는 모두 쉬움이어야 합니다.')
expect(bang.some(q=>q.answer==='작가'),'방정환 직업 정답은 작가여야 합니다.')
expect(people.every(q=>q.type==='choice'||q.type==='ox'),'개별 위인 문제는 3지선다 또는 OX만 허용합니다.')
const oxAnswers=people.filter(q=>q.type==='ox').map(q=>q.answer)
expect(oxAnswers.filter(answer=>answer==='O').length===4&&oxAnswers.filter(answer=>answer==='X').length===4,'OX 정답은 O 4개, X 4개여야 합니다.')

if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log('검증 완료: 80문제 · 노래 50(15/15/10/10) · 위인 24 · 한글 6 · 정답/초성/빈칸/순서 정상')
