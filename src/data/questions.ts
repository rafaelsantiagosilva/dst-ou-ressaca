interface Answer {
  title: string
  value: number
  key: string
}

export interface Question {
  title: string
  answers: Answer[]
}

export const questions: Record<number, Question> = {
  1: {
    title: 'Em qual destes times você faria parte se tivese oportunidade?',
    answers: [
      {
        title: 'NOPElo FC',
        value: -1,
        key: 'a'
      },
      {
        title: 'Desidratation',
        value: +1,
        key: 'b'
      },
      {
        title: 'Caneleiras Forever',
        value: +1,
        key: 'c'
      },
      {
        title: 'Os b3ER - Os Bons 3 Esquiadores Rápidos',
        value: +1,
        key: 'd'
      }
    ]
  },
  2: {
    title: 'Ao dirigir uma moto, você usa capacete?',
    answers: [
      {
        title: 'Nunca dirigi moto',
        value: 0,
        key: 'a'
      },
      {
        title: 'Sempre. Proteção em primeiro lugar',
        value: +1,
        key: 'b'
      },
      {
        title: 'As vezes, mas sem é mais gostosinho',
        value: -1,
        key: 'c'
      },
      {
        title: 'Nunca, fé em Deus, tamo competindo, tamo competindo',
        value: -2,
        key: 'd'
      }
    ]
  },
  3: {
    title: 'Quanto de água você bebeu ontem?',
    answers: [
      {
        title: 'Um copo, pelo menos',
        value: +1,
        key: 'a'
      },
      {
        title: 'Mais de um litro',
        value: -1,
        key: 'b'
      },
      {
        title: 'Sou cearense',
        value: +2,
        key: 'c'
      },
      {
        title: 'Não',
        value: +1,
        key: 'd'
      }
    ]
  },
  4: {
    title: 'Quantas pessoas você "conheceu bem de perto" recentemente?',
    answers: [
      {
        title: 'Nenhuma :(',
        value: +2,
        key: 'a'
      },
      {
        title: '1 ou 2',
        value: +1,
        key: 'b'
      },
      {
        title: '3 ou 4',
        value: -1,
        key: 'c'
      },
      {
        title: '5 ou mais',
        value: -2,
        key: 'd'
      }
    ]
  },
  5: {
    title: 'Qual destes sintomas está mais proeminente?',
    answers: [
      {
        title: 'Dor de cabeça (na de cima)',
        value: +1,
        key: 'a'
      },
      {
        title: 'Dor de cabeça (na de baixo)',
        value: -1,
        key: 'b'
      },
      {
        title: 'Muita sede',
        value: +2,
        key: 'c'
      },
      {
        title: 'Coceira nas partes intimas',
        value: -2,
        key: 'd'
      }
    ]
  }
}