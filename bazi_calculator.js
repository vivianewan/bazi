/**
 * BaZi helpers — pillars are computed by lunar-javascript in the browser.
 * See index.html CDN: https://cdn.jsdelivr.net/npm/lunar-javascript
 * Docs: https://github.com/6tail/lunar-javascript
 *
 * Example (browser, after lunar.js loads):
 *   const solar = Solar.fromYmdHms(1998, 8, 8, 8, 28, 0);
 *   const bazi = solar.getLunar().getEightChar();
 *   // 戊寅 庚申 丁亥 甲辰
 */
function calculateBaZiWithLunar(birthdate) {
  if (typeof Solar === 'undefined') {
    throw new Error('lunar-javascript (Solar) is not loaded');
  }
  const solar = Solar.fromYmdHms(
    birthdate.getFullYear(),
    birthdate.getMonth() + 1,
    birthdate.getDate(),
    birthdate.getHours(),
    birthdate.getMinutes(),
    birthdate.getSeconds() || 0
  );
  const eightChar = solar.getLunar().getEightChar();
  return {
    year: eightChar.getYear(),
    month: eightChar.getMonth(),
    day: eightChar.getDay(),
    hour: eightChar.getTime()
  };
}
