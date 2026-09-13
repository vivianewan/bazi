// 天干地支与五行（与 script.js 排盘算法保持一致）
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const ELEMENT_MAP = {
  甲: 'Wood', 乙: 'Wood', 寅: 'Wood', 卯: 'Wood',
  丙: 'Fire', 丁: 'Fire', 巳: 'Fire', 午: 'Fire',
  戊: 'Earth', 己: 'Earth', 丑: 'Earth', 辰: 'Earth', 未: 'Earth', 戌: 'Earth',
  庚: 'Metal', 辛: 'Metal', 申: 'Metal', 酉: 'Metal',
  壬: 'Water', 癸: 'Water', 子: 'Water', 亥: 'Water'
};

// 公历月内“节”交节日近似：小寒、立春、惊蛰、清明、立夏、芒种、小暑、立秋、白露、寒露、立冬、大雪
const JIE_APPROX_DAY = [6, 4, 6, 5, 6, 6, 7, 8, 8, 8, 7, 7];

function getBaziYearAndMonthIndex(date) {
  let year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  let jieMonth = month;
  if (day < JIE_APPROX_DAY[month]) jieMonth -= 1;
  if (jieMonth < 1) year -= 1;
  const monthIndex = (jieMonth - 1 + 12) % 12;
  return { baziYear: year, monthIndex };
}

function getYearPillar(baziYear) {
  const stem = HEAVENLY_STEMS[((baziYear - 4) % 10 + 10) % 10];
  const branch = EARTHLY_BRANCHES[((baziYear - 4) % 12 + 12) % 12];
  return [stem, branch];
}

/** 五虎遁 */
function getMonthPillar(yearStem, monthIndex) {
  const yearStemIndex = HEAVENLY_STEMS.indexOf(yearStem);
  const monthStemIndex = ((yearStemIndex % 5 + 1) * 2 + monthIndex) % 10;
  const monthBranch = EARTHLY_BRANCHES[(monthIndex + 2) % 12];
  return [HEAVENLY_STEMS[monthStemIndex], monthBranch];
}

/** 日柱：1900-01-01 = 甲戌 */
function getDayPillar(date) {
  const base = Date.UTC(1900, 0, 1);
  const target = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const days = Math.floor((target - base) / 86400000);
  return [
    HEAVENLY_STEMS[((days % 10) + 10) % 10],
    EARTHLY_BRANCHES[((days + 10) % 12 + 12) % 12]
  ];
}

/** 五鼠遁 */
function getHourPillar(dayStem, hour) {
  const dayStemIndex = HEAVENLY_STEMS.indexOf(dayStem);
  const branchIndex = Math.floor(((hour + 1) % 24) / 2) % 12;
  const stemIndex = ((dayStemIndex % 5) * 2 + branchIndex) % 10;
  return [HEAVENLY_STEMS[stemIndex], EARTHLY_BRANCHES[branchIndex]];
}

function calculateBaZi(birthdate) {
  const hour = birthdate.getHours();
  const dateForDay = new Date(birthdate);
  if (hour >= 23) dateForDay.setDate(dateForDay.getDate() + 1);

  const { baziYear, monthIndex } = getBaziYearAndMonthIndex(dateForDay);
  const [yearStem, yearBranch] = getYearPillar(baziYear);
  const [monthStem, monthBranch] = getMonthPillar(yearStem, monthIndex);
  const [dayStem, dayBranch] = getDayPillar(dateForDay);
  const [hourStem, hourBranch] = getHourPillar(dayStem, hour);

  return {
    year: yearStem + yearBranch,
    month: monthStem + monthBranch,
    day: dayStem + dayBranch,
    hour: hourStem + hourBranch,
    elements: {
      yearStem: ELEMENT_MAP[yearStem],
      yearBranch: ELEMENT_MAP[yearBranch],
      monthStem: ELEMENT_MAP[monthStem],
      monthBranch: ELEMENT_MAP[monthBranch],
      dayStem: ELEMENT_MAP[dayStem],
      dayBranch: ELEMENT_MAP[dayBranch],
      hourStem: ELEMENT_MAP[hourStem],
      hourBranch: ELEMENT_MAP[hourBranch]
    }
  };
}
