import type { Question } from '../types'

export const defaultQuestions: Question[] = [
  // 노래 기억 퀴즈 20문제 — 긴 가사 대신 짧은 기억 단서만 사용합니다.
  { id:'s01', category:'song', type:'blank', difficulty:'쉬움', question:'노래 첫머리에서 나라를 세운 할아버지의 이름은?  □□□', options:[], answer:'단군', explanation:'노래의 첫 인물은 단군이에요.', hint:'ㄷㄱ', image:'mountain' },
  { id:'s02', category:'song', type:'blank', difficulty:'쉬움', question:'노래 초반, 고구려를 세운 왕의 이름은?  □□□', options:[], answer:'동명왕', explanation:'동명왕은 노래 초반에 등장해요.', hint:'동○왕', image:'crown' },
  { id:'s03', category:'song', type:'blank', difficulty:'보통', question:'노래에서 백제 온조왕 다음, 알에서 나왔다고 소개되는 인물은?  □□□□', options:[], answer:'박혁거세', explanation:'노래에서는 온조왕 다음에 박혁거세가 나와요.', hint:'ㅂㅎㄱㅅ', image:'egg' },
  { id:'s04', category:'song', type:'blank', difficulty:'보통', question:'노래에서 “번쩍번쩍” 떠올리게 하는 이름은?  □□□', options:[], answer:'홍길동', explanation:'짧은 기억 단서 “번쩍번쩍”과 함께 홍길동을 떠올릴 수 있어요.', hint:'ㅎㄱㄷ', image:'sparkles' },
  { id:'s05', category:'song', type:'blank', difficulty:'보통', question:'노래에서 지도와 함께 떠올리는 이름은?  □□□', options:[], answer:'김정호', explanation:'노래 속 김정호는 지도와 함께 기억할 수 있어요.', hint:'김○호', image:'map' },
  { id:'s06', category:'song', type:'blank', difficulty:'쉬움', question:'노래 후반, 어린이와 함께 떠올리는 이름은?  □□□', options:[], answer:'방정환', explanation:'노래 후반에는 방정환의 이름이 등장해요.', hint:'ㅂㅈㅎ', image:'children' },

  { id:'s07', category:'song', type:'initial', difficulty:'쉬움', question:'노래 속 위인의 초성을 보고 이름을 말해 보세요.  ㅅㅈㄷㅇ', options:[], answer:'세종대왕', explanation:'ㅅㅈㄷㅇ은 세종대왕의 초성이에요.', hint:'우리 글자를 만든 왕', image:'king' },
  { id:'s08', category:'song', type:'initial', difficulty:'쉬움', question:'노래 속 위인의 초성을 보고 이름을 말해 보세요.  ㅇㅅㅅ', options:[], answer:'이순신', explanation:'ㅇㅅㅅ은 이순신의 초성이에요.', hint:'거북선과 함께 떠올려요.', image:'turtle-ship', final:true },
  { id:'s09', category:'song', type:'initial', difficulty:'쉬움', question:'노래 속 위인의 초성을 보고 이름을 말해 보세요.  ㅇㄱㅅ', options:[], answer:'유관순', explanation:'ㅇㄱㅅ은 유관순의 초성이에요.', hint:'태극기를 들고 만세를 외쳤어요.', image:'flag' },
  { id:'s10', category:'song', type:'initial', difficulty:'보통', question:'노래 속 위인의 초성을 보고 이름을 말해 보세요.  ㅈㅇㅅ', options:[], answer:'장영실', explanation:'ㅈㅇㅅ은 장영실의 초성이에요.', hint:'과학 기구를 만든 과학 기술자', image:'sundial' },
  { id:'s11', category:'song', type:'initial', difficulty:'보통', question:'노래 속 위인의 초성을 보고 이름을 말해 보세요.  ㅁㅇㅈ', options:[], answer:'문익점', explanation:'ㅁㅇㅈ은 문익점의 초성이에요.', hint:'목화씨와 함께 기억해요.', image:'cotton' },
  { id:'s12', category:'song', type:'initial', difficulty:'보통', question:'노래 속 위인의 초성을 보고 이름을 말해 보세요.  ㄱㄱㅌㄷㅇ', options:[], answer:'광개토대왕', explanation:'ㄱㄱㅌㄷㅇ은 광개토대왕의 초성이에요.', hint:'고구려의 큰 왕', image:'crown' },

  { id:'s13', category:'song', type:'missing', difficulty:'쉬움', question:'노래 속 사라진 글자를 찾아 이름을 완성하세요.  김 □ 호', options:[], answer:'김정호', explanation:'가운데 ‘정’을 넣으면 김정호가 돼요.', hint:'정', image:'map' },
  { id:'s14', category:'song', type:'missing', difficulty:'보통', question:'노래 속 사라진 글자를 찾아 이름을 완성하세요.  신 □ 임 □', options:[], answer:'신사임당', explanation:'‘사’와 ‘당’을 넣으면 신사임당이 돼요.', hint:'첫 글자는 사', image:'painting', final:true },
  { id:'s15', category:'song', type:'missing', difficulty:'쉬움', question:'노래 속 사라진 글자를 찾아 이름을 완성하세요.  방 □ 환', options:[], answer:'방정환', explanation:'가운데 ‘정’을 넣으면 방정환이 돼요.', hint:'정', image:'children' },
  { id:'s16', category:'song', type:'missing', difficulty:'쉬움', question:'노래 속 사라진 글자를 찾아 이름을 완성하세요.  문 □ 점', options:[], answer:'문익점', explanation:'가운데 ‘익’을 넣으면 문익점이 돼요.', hint:'익', image:'cotton' },

  { id:'s17', category:'song', type:'sequence', difficulty:'보통', question:'노래에 나온 순서대로 인물 카드를 눌러 보세요.', options:['박혁거세','동명왕','온조왕'], answer:'동명왕 → 온조왕 → 박혁거세', explanation:'노래에서는 동명왕, 온조왕, 박혁거세 순서로 나와요.', hint:'고구려를 세운 왕이 먼저예요.', image:'cards', sequence:['동명왕','온조왕','박혁거세'] },
  { id:'s18', category:'song', type:'sequence', difficulty:'보통', question:'노래에 나온 순서대로 인물 카드를 눌러 보세요.', options:['강감찬','장보고','혜초'], answer:'혜초 → 장보고 → 강감찬', explanation:'노래에서는 혜초, 장보고, 강감찬 순서로 나와요.', hint:'혜초가 가장 먼저예요.', image:'cards', sequence:['혜초','장보고','강감찬'] },
  { id:'s19', category:'song', type:'sequence', difficulty:'도전', question:'노래에 나온 순서대로 인물 카드를 눌러 보세요.', options:['장영실','세종대왕','맹사성'], answer:'세종대왕 → 맹사성 → 장영실', explanation:'노래에서는 세종대왕, 맹사성, 장영실 순서로 나와요.', hint:'세종대왕이 가장 먼저예요.', image:'cards', sequence:['세종대왕','맹사성','장영실'] },
  { id:'s20', category:'song', type:'sequence', difficulty:'도전', question:'노래에 나온 순서대로 인물 카드를 눌러 보세요.', options:['김정호','한석봉','김홍도'], answer:'한석봉 → 김홍도 → 김정호', explanation:'노래에서는 한석봉, 김홍도, 김정호 순서로 나와요.', hint:'글씨로 유명한 한석봉이 먼저예요.', image:'cards', sequence:['한석봉','김홍도','김정호'] },

  // 8명 × 3문제 = 24문제
  { id:'p01', category:'person', type:'choice', difficulty:'쉬움', question:'세종대왕은 어떤 일을 한 사람일까요?', options:['왕','화가','장군'], answer:'왕', explanation:'세종대왕은 조선의 왕이에요.', hint:'나라와 백성을 다스렸어요.', image:'king', person:'세종대왕' },
  { id:'p02', category:'person', type:'choice', difficulty:'쉬움', question:'세종대왕이 학자들과 함께 만든 것은 무엇일까요?', options:['훈민정음','대동여지도','거북선'], answer:'훈민정음', explanation:'세종대왕은 백성이 쉽게 배우도록 훈민정음을 만들었어요.', hint:'우리 글자와 관계있어요.', image:'hunmin', person:'세종대왕' },
  { id:'p03', category:'person', type:'choice', difficulty:'보통', question:'세종대왕은 왜 백성을 위한 글자를 만들었을까요?', options:['뜻을 쉽게 표현하도록','그림을 잘 그리도록','배를 빠르게 만들도록'], answer:'뜻을 쉽게 표현하도록', explanation:'백성이 자신의 뜻을 쉽게 말과 글로 표현하게 하려고 새 글자를 만들었어요.', hint:'마음을 글로 나타낼 수 있어요.', image:'letters', person:'세종대왕' },

  { id:'p04', category:'person', type:'choice', difficulty:'쉬움', question:'이순신은 어떤 일을 한 사람일까요?', options:['장군','작가','지도 제작자'], answer:'장군', explanation:'이순신은 바다에서 나라를 지킨 장군이에요.', hint:'군사를 이끌었어요.', image:'turtle-ship', person:'이순신' },
  { id:'p05', category:'person', type:'choice', difficulty:'쉬움', question:'이순신과 가장 관련 깊은 배는 무엇일까요?', options:['거북선','비행기','수레'], answer:'거북선', explanation:'이순신은 거북선과 판옥선을 활용해 바다에서 싸웠어요.', hint:'등이 단단한 동물 모양이에요.', image:'turtle-ship', person:'이순신' },
  { id:'p06', category:'person', type:'ox', difficulty:'보통', question:'이순신은 학익진 같은 전술로 나라를 지킨 해전에서 활약했어요.', options:['O','X'], answer:'O', explanation:'이순신은 여러 해전에서 지혜로운 전술로 나라를 지켰어요.', hint:'참말일까요?', image:'waves', person:'이순신' },

  { id:'p07', category:'person', type:'choice', difficulty:'쉬움', question:'유관순은 학생이면서 어떤 활동을 했을까요?', options:['독립운동','지도 만들기','과학 기구 만들기'], answer:'독립운동', explanation:'유관순은 학생이자 독립운동가로 3·1운동에 참여했어요.', hint:'나라의 자유를 바랐어요.', image:'flag', person:'유관순' },
  { id:'p08', category:'person', type:'choice', difficulty:'보통', question:'유관순이 참여한 독립운동은 무엇일까요?', options:['3·1운동','훈민정음 만들기','대동여지도 만들기'], answer:'3·1운동', explanation:'유관순은 3·1운동에 참여해 독립 만세를 외쳤어요.', hint:'3월 1일과 관련 있어요.', image:'flag', person:'유관순' },
  { id:'p09', category:'person', type:'choice', difficulty:'쉬움', question:'유관순의 독립 만세 운동과 관련 깊은 물건은?', options:['태극기','해시계','붓'], answer:'태극기', explanation:'유관순은 사람들과 태극기를 들고 독립 만세를 외쳤어요.', hint:'우리나라 국기예요.', image:'flag', person:'유관순' },

  { id:'p10', category:'person', type:'choice', difficulty:'쉬움', question:'김정호는 어떤 일을 한 사람일까요?', options:['지도 만드는 일','노래 만드는 일','배 만드는 일'], answer:'지도 만드는 일', explanation:'김정호는 우리 땅을 자세히 살펴 지도를 만든 지도 제작자예요.', hint:'길을 찾을 때 사용하는 것을 만들었어요.', image:'map', person:'김정호' },
  { id:'p11', category:'person', type:'choice', difficulty:'쉬움', question:'김정호가 만든 큰 지도는 무엇일까요?', options:['대동여지도','초충도','훈민정음'], answer:'대동여지도', explanation:'김정호는 우리나라의 모습을 담은 대동여지도를 만들었어요.', hint:'‘지도’라는 말이 들어가요.', image:'map', person:'김정호' },
  { id:'p12', category:'person', type:'choice', difficulty:'쉬움', question:'지도는 우리에게 어떤 도움을 줄까요?', options:['길과 장소를 찾게 해요','시간을 알려줘요','솜을 만들어요'], answer:'길과 장소를 찾게 해요', explanation:'지도는 길, 산, 강, 마을의 위치를 찾는 데 도움을 줘요.', hint:'어디로 갈지 알려줘요.', image:'map', person:'김정호' },

  { id:'p13', category:'person', type:'choice', difficulty:'쉬움', question:'방정환은 어떤 일을 한 사람일까요?', options:['화가','작가','장군'], answer:'작가', explanation:'방정환은 어린이를 위한 글과 이야기를 쓴 작가예요. 어린이날을 만드는 데에도 힘썼어요.', hint:'글과 이야기를 썼어요.', image:'book', person:'방정환' },
  { id:'p14', category:'person', type:'choice', difficulty:'쉬움', question:'어린이날을 만드는 데 힘쓴 사람은 누구일까요?', options:['방정환','이순신','장영실'], answer:'방정환', explanation:'방정환은 어린이를 소중히 여기고 어린이날을 만드는 데 힘썼어요.', hint:'어린이를 위한 글을 쓴 작가예요.', image:'children', person:'방정환' },
  { id:'p15', category:'person', type:'ox', difficulty:'쉬움', question:'방정환은 어린이들을 소중하게 여겼을까요?', options:['O','X'], answer:'O', explanation:'방정환은 어린이를 위한 글과 이야기를 쓴 작가예요. 어린이날을 만드는 데에도 힘썼어요.', hint:'어린이날을 생각해 보세요.', image:'children', person:'방정환' },

  { id:'p16', category:'person', type:'choice', difficulty:'쉬움', question:'신사임당은 어떤 예술 활동을 했을까요?', options:['그림 그리기','노래 부르기','춤추기'], answer:'그림 그리기', explanation:'신사임당은 그림을 잘 그린 화가예요.', hint:'붓과 물감을 사용해요.', image:'painting', person:'신사임당' },
  { id:'p17', category:'person', type:'choice', difficulty:'보통', question:'신사임당의 그림으로 알려진 것은 무엇일까요?', options:['초충도','대동여지도','훈민정음'], answer:'초충도', explanation:'초충도에는 풀, 꽃, 곤충 등이 섬세하게 표현되어 있어요.', hint:'풀과 벌레를 그린 그림이에요.', image:'painting', person:'신사임당' },
  { id:'p18', category:'person', type:'choice', difficulty:'쉬움', question:'신사임당은 무엇을 자세히 관찰해 그림으로 표현했을까요?', options:['풀·꽃·곤충','기차·자동차','별·우주선'], answer:'풀·꽃·곤충', explanation:'신사임당은 주변의 풀, 꽃, 곤충을 자세히 보고 그렸어요.', hint:'자연에서 볼 수 있어요.', image:'flower', person:'신사임당' },

  { id:'p19', category:'person', type:'choice', difficulty:'쉬움', question:'장영실은 어떤 일을 한 사람일까요?', options:['과학 기술자','화가','작가'], answer:'과학 기술자', explanation:'장영실은 생활에 도움을 주는 과학 기구 제작에 참여한 과학 기술자예요.', hint:'관찰하고 기구를 만들었어요.', image:'sundial', person:'장영실' },
  { id:'p20', category:'person', type:'choice', difficulty:'보통', question:'해의 그림자로 시간을 알아보는 기구는 무엇일까요?', options:['앙부일구','자격루','거북선'], answer:'앙부일구', explanation:'앙부일구는 해의 그림자를 살펴 시간을 알아보는 해시계예요.', hint:'해시계예요.', image:'sundial', person:'장영실' },
  { id:'p21', category:'person', type:'choice', difficulty:'보통', question:'물이 흐르는 힘으로 스스로 시간을 알린 시계는 무엇일까요?', options:['자격루','대동여지도','초충도'], answer:'자격루', explanation:'자격루는 여러 사람의 협력으로 만든 자동 물시계이며 장영실이 제작에 참여했어요.', hint:'자동 물시계예요.', image:'water-clock', person:'장영실', final:true },

  { id:'p22', category:'person', type:'choice', difficulty:'보통', question:'문익점은 고려 시대의 관리이자 무엇을 공부한 사람일까요?', options:['학자','장군','화가'], answer:'학자', explanation:'문익점은 고려 시대의 관리이자 학자였어요.', hint:'책을 읽고 학문을 익혔어요.', image:'book', person:'문익점' },
  { id:'p23', category:'person', type:'choice', difficulty:'쉬움', question:'문익점과 가장 관련 깊은 것은 무엇일까요?', options:['목화씨','태극기','거북선'], answer:'목화씨', explanation:'문익점은 목화씨를 가져와 우리나라에 목화 재배가 퍼지는 데 기여했어요.', hint:'하얀 솜이 열리는 식물이에요.', image:'cotton', person:'문익점' },
  { id:'p24', category:'person', type:'choice', difficulty:'쉬움', question:'목화로 만들 수 있는 것은 무엇일까요?', options:['솜과 무명옷','돌과 쇠','유리와 거울'], answer:'솜과 무명옷', explanation:'목화에서 얻은 솜과 실로 따뜻한 무명옷을 만들 수 있어요.', hint:'포근하고 따뜻해요.', image:'cotton', person:'문익점' },

  // 한글·훈민정음 심화 4문제
  { id:'h01', category:'hangul', type:'choice', difficulty:'보통', question:'세종대왕 시대에 학자들이 모여 연구하던 곳은?', options:['집현전','궁궐 놀이터','시장'], answer:'집현전', explanation:'집현전은 조선 시대에 학자들이 학문을 연구하던 곳이에요.', hint:'‘집’으로 시작해요.', image:'hall' },
  { id:'h02', category:'hangul', type:'choice', difficulty:'보통', question:'훈민정음 서문에서 세종대왕이 새 글자를 만든 중요한 이유는?', options:['사람들이 뜻을 쉽게 표현하도록','왕만 글을 쓰도록','그림을 꾸미도록'], answer:'사람들이 뜻을 쉽게 표현하도록', explanation:'사람들이 자신의 뜻을 쉽게 표현하도록 새 글자를 만들었어요.', hint:'누구나 마음과 생각을 나타내도록 했어요.', image:'letters' },
  { id:'h03', category:'hangul', type:'choice', difficulty:'도전', question:'훈민정음 해례본의 옛 국보 번호는 무엇일까요?', options:['제70호','제1호','제100호'], answer:'제70호', explanation:'훈민정음 해례본은 과거에 국보 제70호로 불렸어요. 지금은 국보에 번호를 붙이지 않아요.', hint:'7 뒤에 0이 있어요.', image:'hunmin' },
  { id:'h04', category:'hangul', type:'choice', difficulty:'도전', question:'훈민정음 해례본이 1997년에 등재된 유네스코 유산은?', options:['세계기록유산','세계문화유산','세계자연유산'], answer:'세계기록유산', explanation:'훈민정음 해례본은 1997년 유네스코 세계기록유산에 등재되었어요.', hint:'소중한 기록을 지키는 유산이에요.', image:'hunmin' },
]

export const categoryNames = { song:'노래 기억', person:'우리나라 위인', hangul:'한글 심화' } as const
export const typeNames = { blank:'빈칸 맞히기', initial:'초성 퀴즈', missing:'사라진 이름', sequence:'순서 맞히기', choice:'3지선다', ox:'OX 퀴즈' } as const
