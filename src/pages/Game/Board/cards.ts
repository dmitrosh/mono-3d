export interface Card {
  description: string;
  amount: number;
  moveTo?: number;
  goToJail?: boolean;
}

export const CHANCE_CARDS: Card[] = [
  { description: 'Банк виплачує дивіденди', amount: 50 },
  {
    description: 'Вирушайте на Старт — отримайте 200₴',
    amount: 200,
    moveTo: 0,
  },
  { description: 'Штраф за перевищення швидкості', amount: -15 },
  { description: 'Гонорар лікаря', amount: -50 },
  { description: 'Ваш будівельний кредит погашено', amount: 150 },
  { description: 'Перемога у конкурсі кросвордів', amount: 100 },
  { description: 'Сплатіть податок для бідних', amount: -15 },
  { description: "До в'язниці", amount: 0, goToJail: true },
  { description: 'Банківська помилка на вашу користь', amount: 200 },
  { description: 'Дохід від продажу акцій', amount: 50 },
];

export const COMMUNITY_CHEST_CARDS: Card[] = [
  {
    description: 'Вирушайте на Старт — отримайте 200₴',
    amount: 200,
    moveTo: 0,
  },
  { description: 'Сплатіть послуги лікаря', amount: -50 },
  { description: 'Дохід від продажу цінних паперів', amount: 45 },
  { description: 'Відпускний фонд дозрів', amount: 100 },
  { description: 'Повернення прибуткового податку', amount: 20 },
  { description: 'Страховий поліс дозрів', amount: 100 },
  { description: 'Сплатіть лікарняні витрати', amount: -100 },
  { description: 'Сплатіть витрати на навчання', amount: -50 },
  { description: 'Отримайте винагороду за послуги', amount: 25 },
  { description: "До в'язниці", amount: 0, goToJail: true },
];
