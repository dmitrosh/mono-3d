export type SquareType =
  | 'go'
  | 'property'
  | 'railroad'
  | 'utility'
  | 'tax'
  | 'chance'
  | 'community-chest'
  | 'go-to-jail'
  | 'jail'
  | 'free-parking';

export interface Square {
  type: SquareType;
  name: string;
  groupColor?: string;
  price?: number;
  rent?: number;
  tax?: number;
}

export const SQUARES: Square[] = [
  /* 0  */ { type: 'go', name: 'СТАРТ' },
  /* 1  */ {
    type: 'property',
    name: 'Суми',
    groupColor: '#955436',
    price: 60,
    rent: 2,
  },
  /* 2  */ { type: 'community-chest', name: 'Суспільна скарбниця' },
  /* 3  */ {
    type: 'property',
    name: 'Полтава',
    groupColor: '#955436',
    price: 60,
    rent: 4,
  },
  /* 4  */ { type: 'tax', name: 'Прибутковий податок', tax: 200 },
  /* 5  */ {
    type: 'railroad',
    name: 'Придніпровська залізниця',
    price: 200,
    rent: 25,
  },
  /* 6  */ {
    type: 'property',
    name: 'Чернігів',
    groupColor: '#aae0fa',
    price: 100,
    rent: 6,
  },
  /* 7  */ { type: 'chance', name: 'Шанс' },
  /* 8  */ {
    type: 'property',
    name: 'Житомир',
    groupColor: '#aae0fa',
    price: 100,
    rent: 6,
  },
  /* 9  */ {
    type: 'property',
    name: 'Кропивницький',
    groupColor: '#aae0fa',
    price: 120,
    rent: 8,
  },
  /* 10 */ { type: 'jail', name: "В'язниця" },
  /* 11 */ {
    type: 'property',
    name: 'Вінниця',
    groupColor: '#d93a96',
    price: 140,
    rent: 10,
  },
  /* 12 */ { type: 'utility', name: 'Електростанція', price: 150, rent: 28 },
  /* 13 */ {
    type: 'property',
    name: 'Черкаси',
    groupColor: '#d93a96',
    price: 140,
    rent: 10,
  },
  /* 14 */ {
    type: 'property',
    name: 'Херсон',
    groupColor: '#d93a96',
    price: 160,
    rent: 12,
  },
  /* 15 */ {
    type: 'railroad',
    name: 'Південно-Західна залізниця',
    price: 200,
    rent: 25,
  },
  /* 16 */ {
    type: 'property',
    name: 'Миколаїв',
    groupColor: '#f7941d',
    price: 180,
    rent: 14,
  },
  /* 17 */ { type: 'community-chest', name: 'Суспільна скарбниця' },
  /* 18 */ {
    type: 'property',
    name: 'Запоріжжя',
    groupColor: '#f7941d',
    price: 180,
    rent: 14,
  },
  /* 19 */ {
    type: 'property',
    name: 'Луцьк',
    groupColor: '#f7941d',
    price: 200,
    rent: 16,
  },
  /* 20 */ { type: 'free-parking', name: 'Безкоштовна стоянка' },
  /* 21 */ {
    type: 'property',
    name: 'Рівне',
    groupColor: '#ed1b24',
    price: 220,
    rent: 18,
  },
  /* 22 */ { type: 'chance', name: 'Шанс' },
  /* 23 */ {
    type: 'property',
    name: 'Тернопіль',
    groupColor: '#ed1b24',
    price: 220,
    rent: 18,
  },
  /* 24 */ {
    type: 'property',
    name: 'Хмельницький',
    groupColor: '#ed1b24',
    price: 240,
    rent: 20,
  },
  /* 25 */ {
    type: 'railroad',
    name: 'Одеська залізниця',
    price: 200,
    rent: 25,
  },
  /* 26 */ {
    type: 'property',
    name: 'Дніпро',
    groupColor: '#fef200',
    price: 260,
    rent: 22,
  },
  /* 27 */ {
    type: 'property',
    name: 'Харків',
    groupColor: '#fef200',
    price: 260,
    rent: 22,
  },
  /* 28 */ { type: 'utility', name: 'Водоканал', price: 150, rent: 28 },
  /* 29 */ {
    type: 'property',
    name: 'Кривий Ріг',
    groupColor: '#fef200',
    price: 280,
    rent: 24,
  },
  /* 30 */ { type: 'go-to-jail', name: "До в'язниці" },
  /* 31 */ {
    type: 'property',
    name: 'Ужгород',
    groupColor: '#1fb25a',
    price: 300,
    rent: 26,
  },
  /* 32 */ {
    type: 'property',
    name: 'Одеса',
    groupColor: '#1fb25a',
    price: 300,
    rent: 26,
  },
  /* 33 */ { type: 'community-chest', name: 'Суспільна скарбниця' },
  /* 34 */ {
    type: 'property',
    name: 'Івано-Франківськ',
    groupColor: '#1fb25a',
    price: 320,
    rent: 28,
  },
  /* 35 */ {
    type: 'railroad',
    name: 'Львівська залізниця',
    price: 200,
    rent: 25,
  },
  /* 36 */ { type: 'chance', name: 'Шанс' },
  /* 37 */ {
    type: 'property',
    name: 'Львів',
    groupColor: '#0072bb',
    price: 350,
    rent: 35,
  },
  /* 38 */ { type: 'tax', name: 'Податок на розкіш', tax: 100 },
  /* 39 */ {
    type: 'property',
    name: 'Київ',
    groupColor: '#0072bb',
    price: 400,
    rent: 50,
  },
];

/** Which edge of the square the property color band sits on (facing the board center). */
export function getBandEdge(
  index: number,
): 'top' | 'right' | 'bottom' | 'left' {
  if (index >= 0 && index <= 10) {
    return 'top';
  }
  if (index >= 11 && index <= 20) {
    return 'right';
  }
  if (index >= 21 && index <= 30) {
    return 'bottom';
  }

  return 'left';
}
