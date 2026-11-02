export type Category = 'song' | 'person' | 'hangul'
export type QuestionType = 'blank' | 'initial' | 'missing' | 'sequence' | 'choice' | 'ox'
export type Difficulty = '쉬움' | '보통' | '도전'

export interface Question {
  id: string
  category: Category
  type: QuestionType
  difficulty: Difficulty
  question: string
  options: string[]
  answer: string
  explanation: string
  hint: string
  image: string
  sequence?: string[]
  person?: string
  final?: boolean
}

export type GameMode = 'practice' | 'challenge' | 'team' | 'cooperate'

export interface Settings {
  mode: GameMode
  categories: Category[]
  questionTypes: QuestionType[]
  excludedQuestionIds: string[]
  count: number
  random: boolean
  hints: boolean
  voice: boolean
  voiceRate: number
  sound: boolean
  scoreboard: boolean
  autoReveal: boolean
  finals: boolean
  teamNames: [string, string]
}
