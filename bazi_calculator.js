// 天干
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
// 地支
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 五行映射
const ELEMENT_MAP = {
    '甲': 'Wood', '乙': 'Wood', '寅': 'Wood', '卯': 'Wood',
    '丙': 'Fire', '丁': 'Fire', '巳': 'Fire', '午': 'Fire',
    '戊': 'Earth', '己': 'Earth', '丑': 'Earth', '辰': 'Earth', '未': 'Earth', '戌': 'Earth',
    '庚': 'Metal', '辛': 'Metal', '申': 'Metal', '酉': 'Metal',
    '壬': 'Water', '癸': 'Water', '子': 'Water', '亥': 'Water'
};

// 近似二十四节气（每月交节时间，用来判断月柱和年柱的更替）
// 真实节气每年会有 1-2 天波动，精准排盘建议引入 lunar-javascript 等天文历法库
const SOLAR_TERMS_APPROX = [
    6,  // 1月 小寒 (通常在6日左右) - 属于上一年的丑月
    4,  // 2月 立春 (4日左右) - 新一年的开始，寅月
    6,  // 3月 惊蛰 (6日左右) - 卯月
    5,  // 4月 清明 (5日左右) - 辰月
    6,  // 5月 立夏 (6日左右) - 巳月
    6,  // 6月 芒种 (6日左右) - 午月
    7,  // 7月 小暑 (7日左右) - 未月
    8,  // 8月 立秋 (8日左右) - 申月
    8,  // 9月 白露 (8日左右) - 酉月
    8,  // 10月 寒露 (8日左右) - 戌月
    7,  // 11月 立冬 (7日左右) - 亥月
    7   // 12月 大雪 (7日左右) - 子月
];

/**
 * 获取干支历的年份和月份索引
 * @param {Date} date
 */
function getSolarYearAndMonth(date) {
    let year = date.getFullYear();
    const month = date.getMonth(); // 0-11
    const day = date.getDate();

    let baziMonthIndex = month; 
    
    // 如果当前日期早于本月的交近日，则属于干支历的上一个月
    if (day < SOLAR_TERMS_APPROX[month]) {
        baziMonthIndex -= 1;
    }

    // 跨年处理：立春（2月交节）之前，都属于干支历的上一"年"
    if (baziMonthIndex < 1) { // 1代表2月(立春)
        year -= 1;
    }
    
    // 调整月份索引 (0对应寅月, 1对应卯月... 11对应丑月)
    // 公历2月(立春后)为寅月。公式修正偏移量：
    let adjustedMonthIndex = (baziMonthIndex - 1 + 12) % 12;

    return { baziYear: year, baziMonth: adjustedMonthIndex };
}

/**
 * 计算年柱
 */
function getYearPillar(baziYear) {
    // 1984年是甲子年
    const stemIndex = ((baziYear - 4) % 10 + 10) % 10;
    const branchIndex = ((baziYear - 4) % 12 + 12) % 12;
    return [HEAVENLY_STEMS[stemIndex], EARTHLY_BRANCHES[branchIndex]];
}

/**
 * 计算月柱 (遵循“五虎遁”公式：甲己之年丙作首)
 */
function getMonthPillar(yearStem, baziMonthIndex) {
    const yearStemIndex = HEAVENLY_STEMS.indexOf(yearStem);
    // 五虎遁公式
    const monthStemIndex = ((yearStemIndex % 5 + 1) * 2 + baziMonthIndex) % 10;
    // 寅月是地支索引 2
    const monthBranchIndex = (baziMonthIndex + 2) % 12;
    return [HEAVENLY_STEMS[monthStemIndex], EARTHLY_BRANCHES[monthBranchIndex]];
}

/**
 * 计算日柱 (修正了基准日与夏令时差)
 */
function getDayPillar(date) {
    // 基准日：1900年1月1日，历史真实干支为【甲戌】日
    // 甲=0, 戌=10
    const baseDate = Date.UTC(1900, 0, 1);
    const targetDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    
    // 计算相差天数
    const diffDays = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
    
    const stemIndex = ((diffDays + 0) % 10 + 10) % 10;
    const branchIndex = ((diffDays + 10) % 12 + 12) % 12;
    
    return [HEAVENLY_STEMS[stemIndex], EARTHLY_BRANCHES[branchIndex]];
}

/**
 * 计算时柱 (遵循“五鼠遁”公式：甲己还加甲)
 */
function getHourPillar(dayStem, hour) {
    const dayStemIndex = HEAVENLY_STEMS.indexOf(dayStem);
    
    // 子时为 23:00-00:59
    let hourBranchIndex = Math.floor((hour + 1) / 2) % 12;
    
    // 五鼠遁公式
    const hourStemIndex = ((dayStemIndex % 5) * 2 + hourBranchIndex) % 10;
    
    return [HEAVENLY_STEMS[hourStemIndex], EARTHLY_BRANCHES[hourBranchIndex]];
}

/**
 * 完整八字计算入口
 */
function calculateBaZi(birthdate) {
    // 子时(23:00后)在八字中通常算作第二天的开始，需进位一天
    let adjustedDate = new Date(birthdate);
    const hour = adjustedDate.getHours();
    if (hour >= 23) {
        adjustedDate.setDate(adjustedDate.getDate() + 1);
    }

    const { baziYear, baziMonth } = getSolarYearAndMonth(adjustedDate);

    const [yearStem, yearBranch] = getYearPillar(baziYear);
    const [monthStem, monthBranch] = getMonthPillar(yearStem, baziMonth);
    const [dayStem, dayBranch] = getDayPillar(adjustedDate);
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
