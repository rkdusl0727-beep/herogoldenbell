import type { Question } from '../types'

const songBlank: Question[] = [
  {id:'s01',category:'song',type:'blank',difficulty:'쉬움',question:'나라를 세운 □□',options:[],answer:'단군',explanation:'단군은 우리나라를 처음 세웠다고 전해지는 인물이에요.',hint:'우리나라를 처음 세웠다고 전해져요.',image:'mountain'},
  {id:'s02',category:'song',type:'blank',difficulty:'쉬움',question:'고구려 세운 □□□',options:[],answer:'동명왕',explanation:'동명왕은 고구려를 세운 왕이에요.',hint:'고구려와 관련된 왕이에요.',image:'crown'},
  {id:'s03',category:'song',type:'blank',difficulty:'쉬움',question:'백제의 왕 □□□',options:[],answer:'온조왕',explanation:'온조왕은 백제를 세운 왕이에요.',hint:'백제와 관련된 왕이에요.',image:'crown'},
  {id:'s04',category:'song',type:'blank',difficulty:'보통',question:'알에서 나온 □□□□',options:[],answer:'박혁거세',explanation:'박혁거세는 알에서 태어났다고 전해지며 신라를 세운 왕이에요.',hint:'신라를 세운 왕이에요.',image:'egg'},
  {id:'s05',category:'song',type:'blank',difficulty:'보통',question:'만주 벌판 달려라 □□□□□',options:[],answer:'광개토대왕',explanation:'광개토대왕은 고구려의 영토를 크게 넓힌 왕이에요.',hint:'이름에 ‘대왕’이 들어가요.',image:'crown'},
  {id:'s06',category:'song',type:'blank',difficulty:'보통',question:'신라 장군 □□□',options:[],answer:'이사부',explanation:'이사부는 우산국을 정복한 신라의 장군이에요.',hint:'세 글자 이름이에요.',image:'cards'},
  {id:'s07',category:'song',type:'blank',difficulty:'쉬움',question:'황산벌의 □□',options:[],answer:'계백',explanation:'계백은 황산벌에서 싸운 백제의 장군이에요.',hint:'두 글자 이름이에요.',image:'cards'},
  {id:'s08',category:'song',type:'blank',difficulty:'보통',question:'말 목 자른 □□□',options:[],answer:'김유신',explanation:'김유신은 신라의 삼국 통일에 힘쓴 장군이에요.',hint:'성을 포함해 세 글자예요.',image:'cards'},
  {id:'s09',category:'song',type:'blank',difficulty:'보통',question:'해골물 □□□□',options:[],answer:'원효대사',explanation:'원효대사는 해골에 고인 물 이야기로 잘 알려져 있어요.',hint:'불교를 널리 알린 인물이에요.',image:'book'},
  {id:'s10',category:'song',type:'blank',difficulty:'쉬움',question:'바다의 왕자 □□□',options:[],answer:'장보고',explanation:'장보고는 바다 무역과 청해진으로 기억되는 인물이에요.',hint:'바다와 관련 있어요.',image:'waves'},
  {id:'s11',category:'song',type:'blank',difficulty:'보통',question:'귀주대첩 □□□',options:[],answer:'강감찬',explanation:'강감찬은 귀주대첩을 승리로 이끈 장군이에요.',hint:'고려의 장군이에요.',image:'cards'},
  {id:'s12',category:'song',type:'blank',difficulty:'쉬움',question:'목화씨는 □□□',options:[],answer:'문익점',explanation:'문익점은 우리나라에 목화 재배가 퍼지는 데 기여했어요.',hint:'하얀 솜과 관련 있어요.',image:'cotton'},
  {id:'s13',category:'song',type:'blank',difficulty:'쉬움',question:'과학 □□□',options:[],answer:'장영실',explanation:'장영실은 여러 과학 기구 제작에 참여한 과학 기술자예요.',hint:'해시계와 물시계로 기억해요.',image:'sundial'},
  {id:'s14',category:'song',type:'blank',difficulty:'쉬움',question:'의적 □□□',options:[],answer:'임꺽정',explanation:'가사에서 ‘의적’이라는 말 다음에 임꺽정의 이름이 나와요.',hint:'‘임’으로 시작하는 세 글자 이름이에요.',image:'sparkles'},
  {id:'s15',category:'song',type:'blank',difficulty:'쉬움',question:'어린이날 □□□',options:[],answer:'방정환',explanation:'방정환은 어린이를 소중히 여기고 어린이날을 만드는 데 힘썼어요.',hint:'어린이를 위한 글을 썼어요.',image:'children'},
]

const initials: [string,string,string,string,string,string][] = [
  ['s16','ㅊㅁㅅ','최무선','sparkles','화포를 만든 위인은 누구일까요?','최무선은 화포를 만드는 기술을 발전시켜 나라를 지키는 데 힘썼어요.'],
  ['s17','ㄱㅂㅅ','김부식','book','죽림칠현 뒤에 나오는 위인은 누구일까요?','김부식은 고구려·백제·신라의 역사를 담은 《삼국사기》를 지었어요.'],
  ['s18','ㅈㅇㅇ','정약용','book','목민심서를 지은 위인은 누구일까요?','정약용은 백성을 생각하는 마음을 담아 《목민심서》를 지었어요.'],
  ['s19','ㅈㅁㅈ','정몽주','book','일편단심으로 알려진 위인은 누구일까요?','정몽주는 고려를 향한 충성스러운 마음을 「단심가」에 담았어요.'],
  ['s20','ㅊㅇ','최영','cards','황금을 보기를 돌같이 하라고 말한 장군은 누구일까요?','최영은 나라를 지킨 고려의 장군으로 알려져 있어요.'],
  ['s21','ㅎㅎ','황희','book','정승으로 불리는 위인은 누구일까요?','황희는 지혜로운 조선의 재상으로 오랫동안 나라의 일을 도왔어요.'],
  ['s22','ㅁㅅㅅ','맹사성','book','황희 정승 다음 인물은 누구일까요?','맹사성은 높은 벼슬을 하면서도 검소하게 생활한 재상으로 알려져 있어요.'],
  ['s23','ㅇㅇㄱ','이율곡','book','십만 양병을 주장한 학자는 누구일까요?','이율곡은 조선 시대의 학자로 학문과 나라의 일을 깊이 생각했어요.'],
  ['s24','ㅇㅌㄱ','이퇴계','book','주리와 관련된 학자는 누구일까요?','이퇴계는 도산서원에서 제자들을 가르친 조선의 학자예요.'],
  ['s25','ㅅㅅㅇㄷ','신사임당','painting','오죽헌과 관련된 인물은 누구일까요?','신사임당은 풀과 곤충을 자세히 관찰해 「초충도」를 그린 화가예요.'],
  ['s26','ㅇㅅㅅ','이순신','turtle-ship','나라를 구한 장군은 누구일까요?','이순신은 거북선과 뛰어난 전술로 바다에서 나라를 지킨 장군이에요.'],
  ['s27','ㅎㅅㅂ','한석봉','letters','삼 년 공부한 글씨 명인은 누구일까요?','한석봉은 꾸준히 연습해 뛰어난 글씨로 이름난 인물이에요.'],
  ['s28','ㄱㅈㅎ','김정호','map','지도를 만든 인물은 누구일까요?','김정호는 우리 땅을 자세히 담은 대동여지도를 만들었어요.'],
  ['s29','ㅇㄱㅅ','유관순','flag','만세 만세를 외친 인물은 누구일까요?','유관순은 태극기를 들고 독립 만세를 외친 독립운동가예요.'],
  ['s30','ㅈㅇㅅ','장영실','sundial','과학 기술로 이름난 위인은 누구일까요?','장영실은 시간을 알려 주는 앙부일구와 자격루 제작에 참여했어요.'],
]
const songInitial: Question[] = initials.map(([id,question,answer,image,clue,explanation])=>({
  id,category:'song',type:'initial',difficulty:question.length>4?'보통':'쉬움',question:`${clue}\n초성: ${question}`,options:[],answer,
  explanation,hint:answer,clue,image,final:id==='s26',
}))

const missing: [string,string,string,string,string][] = [
  ['s31','방 □ 환','방정환','정','children'],['s32','신 □ 임 □','신사임당','사당','painting'],
  ['s33','광 □ 토 대 □','광개토대왕','개왕','crown'],['s34','박 □ 거 □','박혁거세','혁세','egg'],
  ['s35','유 □ 순','유관순','관','flag'],['s36','이 □ 신','이순신','순','turtle-ship'],
  ['s37','문 □ 점','문익점','익','cotton'],['s38','김 □ 호','김정호','정','map'],
  ['s39','장 □ 실','장영실','영','sundial'],['s40','안 □ 근','안중근','중','flag'],
]
const missingClues: Record<string,string> = {
  s31:'어린이날과 관련된 위인은 누구일까요?',
  s32:'오죽헌과 관련된 인물은 누구일까요?',
  s33:'만주 벌판을 달린 왕은 누구일까요?',
  s34:'알에서 나온 왕은 누구일까요?',
  s35:'만세 만세를 외친 인물은 누구일까요?',
  s36:'나라를 구한 장군은 누구일까요?',
  s37:'목화씨를 가져온 인물은 누구일까요?',
  s38:'지도를 만든 인물은 누구일까요?',
  s39:'과학 기술로 이름난 위인은 누구일까요?',
  s40:'애국으로 기억되는 독립운동가는 누구일까요?',
}
const songMissing: Question[] = missing.map(([id,masked,answer,hint,image])=>({
  id,category:'song',type:'missing',difficulty:hint.length>1?'보통':'쉬움',
  question:`${missingClues[id]}\n이름 완성:  ${masked}`,options:[],answer,
  explanation:`숨은 글자 ‘${Array.from(hint).join('·')}’을 넣으면 ${answer}이(가) 돼요.`,hint,image,final:id==='s40',
}))

const songClues: Question[] = [
  {id:'s41',category:'song',type:'blank',difficulty:'보통',question:'떡방아 소리를 낸 □□□□',options:[],answer:'백결선생',explanation:'백결선생은 거문고로 방아 찧는 소리를 냈다는 이야기로 알려져 있어요.',hint:'이름에 ‘선생’이 들어가요.',image:'book'},
  {id:'s42',category:'song',type:'blank',difficulty:'쉬움',question:'맞서 싸운 화랑 □□',options:[],answer:'관창',explanation:'관창은 황산벌에서 용감하게 싸운 신라의 화랑이에요.',hint:'두 글자 이름이에요.',image:'cards'},
  {id:'s43',category:'song',type:'blank',difficulty:'보통',question:'천축국에 다녀온 승려 □□',options:[],answer:'혜초',explanation:'혜초는 여러 나라를 여행하고 《왕오천축국전》을 남겼어요.',hint:'두 글자 이름이에요.',image:'book'},
  {id:'s44',category:'song',type:'blank',difficulty:'쉬움',question:'발해를 세운 □□□',options:[],answer:'대조영',explanation:'대조영은 고구려를 계승한 나라 발해를 세웠어요.',hint:'세 글자 이름이에요.',image:'crown'},
  {id:'s45',category:'song',type:'blank',difficulty:'보통',question:'거란족과 담판한 □□',options:[],answer:'서희',explanation:'서희는 소손녕과 담판해 고려의 땅을 지키는 데 힘썼어요.',hint:'두 글자 이름이에요.',image:'book'},
  {id:'s46',category:'song',type:'blank',difficulty:'보통',question:'□□□와 한명회',options:[],answer:'신숙주',explanation:'신숙주는 집현전 학자로 훈민정음 연구에 참여했어요.',hint:'세 글자 이름이에요.',image:'letters'},
  {id:'s47',category:'song',type:'blank',difficulty:'쉬움',question:'단원 풍속도 □□□',options:[],answer:'김홍도',explanation:'김홍도는 사람들이 생활하는 모습을 생생한 그림으로 남겼어요.',hint:'성을 포함해 세 글자예요.',image:'painting'},
  {id:'s48',category:'song',type:'blank',difficulty:'쉬움',question:'도산 □□□',options:[],answer:'안창호',explanation:'안창호는 우리나라의 독립과 교육을 위해 힘쓴 독립운동가예요.',hint:'세 글자 이름이에요.',image:'flag'},
  {id:'s49',category:'song',type:'blank',difficulty:'보통',question:'몸 바쳐서 □□',options:[],answer:'논개',explanation:'논개는 진주성 싸움과 관련된 용기 있는 인물로 기억돼요.',hint:'두 글자 이름이에요.',image:'flower'},
  {id:'s50',category:'song',type:'blank',difficulty:'쉬움',question:'어사 □□□',options:[],answer:'박문수',explanation:'박문수는 백성을 살핀 암행어사 이야기로 널리 알려져 있어요.',hint:'세 글자 이름이에요.',image:'cards',final:true},
]

const people: Question[] = [
  {id:'p01',category:'person',type:'choice',difficulty:'쉬움',question:'세종대왕은 어떤 일을 한 사람일까요?',options:['왕','화가','장군'],answer:'왕',explanation:'세종대왕은 조선의 왕이에요.',hint:'나라와 백성을 다스렸어요.',image:'./assets/people/sejong.png',person:'세종대왕'},
  {id:'p02',category:'person',type:'choice',difficulty:'쉬움',question:'세종대왕이 만든 우리 글자의 처음 이름은 무엇일까요?',options:['훈민정음','대동여지도','거북선'],answer:'훈민정음',explanation:'세종대왕은 백성이 쉽게 배우도록 훈민정음을 만들었어요.',hint:'우리 글자와 관계있어요.',image:'hunmin',person:'세종대왕'},
  {id:'p03',category:'person',type:'ox',difficulty:'쉬움',question:'세종대왕은 왕만 글을 쓰게 하려고 새 글자를 만들었어요.',options:['O','X'],answer:'X',explanation:'세종대왕은 백성이 자신의 뜻을 쉽게 표현하도록 훈민정음을 만들었어요.',hint:'백성을 생각한 마음을 떠올려요.',image:'letters',person:'세종대왕'},
  {id:'p04',category:'person',type:'choice',difficulty:'쉬움',question:'이순신은 어떤 일을 한 사람일까요?',options:['장군','작가','지도 제작자'],answer:'장군',explanation:'이순신은 바다에서 나라를 지킨 장군이에요.',hint:'군사를 이끌었어요.',image:'./assets/people/yi-sun-sin.png',person:'이순신'},
  {id:'p05',category:'person',type:'choice',difficulty:'쉬움',question:'이순신과 가장 관련 깊은 배는 무엇일까요?',options:['거북선','비행기','수레'],answer:'거북선',explanation:'이순신은 거북선과 판옥선을 활용해 바다에서 싸웠어요.',hint:'등이 단단한 동물 모양이에요.',image:'turtle-ship',person:'이순신'},
  {id:'p06',category:'person',type:'ox',difficulty:'보통',question:'이순신은 학익진이라는 전술을 사용해 해전에서 활약했어요.',options:['O','X'],answer:'O',explanation:'이순신은 학익진을 비롯한 지혜로운 전술로 나라를 지켰어요.',hint:'학이 날개를 편 모양을 생각해요.',image:'waves',person:'이순신'},
  {id:'p07',category:'person',type:'choice',difficulty:'쉬움',question:'유관순은 어떤 활동을 한 사람일까요?',options:['독립운동가','화가','과학 기술자'],answer:'독립운동가',explanation:'유관순은 우리나라의 독립을 위해 힘쓴 독립운동가예요.',hint:'나라의 자유를 바랐어요.',image:'./assets/people/yu-gwan-sun.png',person:'유관순'},
  {id:'p08',category:'person',type:'choice',difficulty:'쉬움',question:'유관순이 참여한 독립운동은 무엇일까요?',options:['3·1운동','훈민정음 만들기','대동여지도 만들기'],answer:'3·1운동',explanation:'유관순은 3·1운동에 참여해 독립 만세를 외쳤어요.',hint:'3월 1일과 관련 있어요.',image:'flag',person:'유관순'},
  {id:'p09',category:'person',type:'ox',difficulty:'쉬움',question:'유관순은 사람들과 태극기를 들고 독립 만세를 외쳤어요.',options:['O','X'],answer:'O',explanation:'유관순은 태극기를 들고 우리나라의 독립을 외쳤어요.',hint:'우리나라 국기를 떠올려요.',image:'flag',person:'유관순'},
  {id:'p10',category:'person',type:'choice',difficulty:'쉬움',question:'김정호는 어떤 일을 한 사람일까요?',options:['지도 제작자','작가','장군'],answer:'지도 제작자',explanation:'김정호는 우리 땅의 모습을 지도에 담은 지도 제작자예요.',hint:'길과 장소를 찾는 것을 만들었어요.',image:'./assets/people/kim-jeong-ho.png',person:'김정호'},
  {id:'p11',category:'person',type:'choice',difficulty:'쉬움',question:'김정호가 만든 큰 지도는 무엇일까요?',options:['대동여지도','초충도','훈민정음'],answer:'대동여지도',explanation:'김정호는 우리나라의 모습을 자세히 담은 대동여지도를 만들었어요.',hint:'이름에 ‘지도’가 들어가요.',image:'map',person:'김정호'},
  {id:'p12',category:'person',type:'ox',difficulty:'쉬움',question:'지도는 시간을 알려 주는 물건이에요.',options:['O','X'],answer:'X',explanation:'지도는 길, 산, 강, 마을의 위치를 찾는 데 도움을 줘요.',hint:'어디로 갈지 알려 주는 것을 생각해요.',image:'map',person:'김정호'},
  {id:'p13',category:'person',type:'choice',difficulty:'쉬움',question:'방정환은 어떤 일을 한 사람일까요?',options:['작가','장군','과학 기술자'],answer:'작가',explanation:'방정환은 어린이를 위한 글과 이야기를 쓴 작가예요.',hint:'글과 이야기를 썼어요.',image:'./assets/people/bang-jeong-hwan.png',person:'방정환'},
  {id:'p14',category:'person',type:'choice',difficulty:'쉬움',question:'어린이날을 만드는 데 힘쓴 사람은 누구일까요?',options:['방정환','이순신','김정호'],answer:'방정환',explanation:'방정환은 어린이날을 만드는 데 힘썼어요.',hint:'어린이를 위한 글을 쓴 작가예요.',image:'children',person:'방정환'},
  {id:'p15',category:'person',type:'ox',difficulty:'쉬움',question:'방정환은 어린이를 소중하게 여겼어요.',options:['O','X'],answer:'O',explanation:'방정환은 어린이를 존중하고 소중히 여기는 마음을 널리 알렸어요.',hint:'어린이날을 떠올려요.',image:'children',person:'방정환'},
  {id:'p16',category:'person',type:'choice',difficulty:'쉬움',question:'신사임당은 어떤 일을 한 사람일까요?',options:['화가','장군','지도 제작자'],answer:'화가',explanation:'신사임당은 그림을 잘 그린 화가예요.',hint:'붓과 물감을 사용했어요.',image:'./assets/people/shin-saimdang.png',person:'신사임당'},
  {id:'p17',category:'person',type:'choice',difficulty:'쉬움',question:'신사임당의 그림으로 알려진 것은 무엇일까요?',options:['초충도','대동여지도','훈민정음'],answer:'초충도',explanation:'초충도에는 풀, 꽃, 곤충이 섬세하게 표현되어 있어요.',hint:'풀과 벌레를 그린 그림이에요.',image:'painting',person:'신사임당'},
  {id:'p18',category:'person',type:'ox',difficulty:'쉬움',question:'신사임당은 자동차와 비행기를 관찰해 초충도를 그렸어요.',options:['O','X'],answer:'X',explanation:'신사임당은 주변의 풀, 꽃, 곤충을 자세히 보고 그렸어요.',hint:'자연에서 볼 수 있는 것을 떠올려요.',image:'flower',person:'신사임당'},
  {id:'p19',category:'person',type:'choice',difficulty:'쉬움',question:'장영실은 어떤 일을 한 사람일까요?',options:['과학 기술자','화가','작가'],answer:'과학 기술자',explanation:'장영실은 생활에 도움을 주는 과학 기구 제작에 참여한 과학 기술자예요.',hint:'관찰하고 기구를 만들었어요.',image:'./assets/people/jang-yeong-sil.png',person:'장영실'},
  {id:'p20',category:'person',type:'choice',difficulty:'보통',question:'해의 그림자로 시간을 알아보는 기구는 무엇일까요?',options:['앙부일구','자격루','거북선'],answer:'앙부일구',explanation:'앙부일구는 해의 그림자로 시간을 알아보는 해시계예요.',hint:'해시계예요.',image:'sundial',person:'장영실'},
  {id:'p21',category:'person',type:'ox',difficulty:'쉬움',question:'자격루는 물의 흐름을 이용한 자동 물시계예요.',options:['O','X'],answer:'O',explanation:'자격루는 물의 흐름을 이용해 스스로 시간을 알린 시계예요.',hint:'물시계를 떠올려요.',image:'water-clock',person:'장영실',final:true},
  {id:'p22',category:'person',type:'choice',difficulty:'쉬움',question:'문익점은 어떤 일을 한 사람일까요?',options:['관리이자 학자','장군','화가'],answer:'관리이자 학자',explanation:'문익점은 고려 시대의 관리이자 학자였어요.',hint:'나라의 일을 하며 학문을 공부했어요.',image:'./assets/people/mun-ik-jeom.png',person:'문익점'},
  {id:'p23',category:'person',type:'choice',difficulty:'쉬움',question:'문익점과 가장 관련 깊은 것은 무엇일까요?',options:['목화씨','태극기','거북선'],answer:'목화씨',explanation:'문익점은 목화씨를 가져와 목화 재배가 퍼지는 데 기여했어요.',hint:'하얀 솜이 열리는 식물이에요.',image:'cotton',person:'문익점'},
  {id:'p24',category:'person',type:'ox',difficulty:'쉬움',question:'목화에서는 단단한 쇠를 얻을 수 있어요.',options:['O','X'],answer:'X',explanation:'목화에서 얻은 솜과 실로 따뜻한 무명옷을 만들 수 있어요.',hint:'따뜻한 이불을 떠올려요.',image:'cotton',person:'문익점'},
]

const hangul: Question[] = [
  {id:'h01',category:'hangul',type:'choice',difficulty:'보통',question:'세종대왕 시대에 학자들이 모여 연구하던 곳은 어디일까요?',options:['집현전','시장','훈련장'],answer:'집현전',explanation:'집현전은 조선 시대에 학자들이 학문을 연구하던 곳이에요.',hint:'‘집’으로 시작해요.',image:'hall'},
  {id:'h02',category:'hangul',type:'choice',difficulty:'보통',question:'훈민정음 서문의 쉬운 뜻으로 알맞은 것은 무엇일까요?',options:['사람들이 뜻을 쉽게 나타내도록','왕만 글을 쓰도록','그림을 꾸미도록'],answer:'사람들이 뜻을 쉽게 나타내도록',explanation:'세종은 사람들이 자신의 뜻을 쉽게 표현하도록 새 글자를 만들었어요.',hint:'누구나 마음과 생각을 나타낼 수 있게 했어요.',image:'letters'},
  {id:'h03',category:'hangul',type:'choice',difficulty:'보통',question:'훈민정음을 처음 만들었을 때 글자는 모두 몇 자였을까요?',options:['28자','24자','40자'],answer:'28자',explanation:'훈민정음은 처음 만들었을 때 자음과 모음을 합해 28자였어요.',hint:'스물여덟 자예요.',image:'letters'},
  {id:'h04',category:'hangul',type:'choice',difficulty:'보통',question:'훈민정음을 만든 원리와 사용법을 설명한 책은 무엇일까요?',options:['훈민정음 해례본','대동여지도','삼국유사'],answer:'훈민정음 해례본',explanation:'훈민정음 해례본에는 글자를 만든 원리와 사용법이 설명되어 있어요.',hint:'‘해례본’이라는 말이 들어가요.',image:'hunmin'},
  {id:'h05',category:'hangul',type:'choice',difficulty:'도전',question:'훈민정음 해례본의 옛 국보 번호는 무엇일까요?',options:['제70호','제1호','제100호'],answer:'제70호',explanation:'훈민정음 해례본은 과거에 국보 제70호로 지정되었어요.',hint:'7 뒤에 0이 있어요.',image:'hunmin'},
  {id:'h06',category:'hangul',type:'choice',difficulty:'도전',question:'훈민정음 해례본은 1997년 유네스코의 어떤 유산에 등재되었을까요?',options:['세계기록유산','세계자연유산','무형유산'],answer:'세계기록유산',explanation:'훈민정음 해례본은 1997년 유네스코 세계기록유산에 등재되었어요.',hint:'소중한 기록을 지키는 유산이에요.',image:'hunmin'},
]

export const defaultQuestions: Question[] = [...songBlank,...songInitial,...songMissing,...songClues,...people,...hangul]
export const categoryNames = {song:'노래 퀴즈',person:'개별 위인',hangul:'한글 심화'} as const
export const typeNames = {blank:'가사 빈칸',initial:'초성 퀴즈',missing:'사라진 이름',sequence:'인물 순서',choice:'그림 3지선다',ox:'OX 퀴즈'} as const
