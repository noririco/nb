// All rights reserved to Elyasaf Movshovitz and Amos Shapir.
// Code may be used freely with keeping copitight messages.

// General functions
// =================
var minDate = new Date(0); // epoch time!
minDate.setFullYear(0);

function divide(a, b) {
  return Math.floor(a / b);
}

function Gimatria(n) {
  var p = "";
  var quf = "קרש";
  var yud = "יכלמנסעפצ";
  var alef = "אבגדהוזחט";

  if (n > 1000) {
    p += Gimatria(divide(n, 1000));
    n %= 1000;
  }

  while (n >= 400) {
    p += "ת";
    n -= 400;
  }

  if (n >= 100) {
    p += quf.charAt(divide(n, 100) - 1);
    n %= 100;
  }

  if (n >= 10) {
    switch (n) {
      case 15:
        p += "טו";
        n = 0;
        break;

      case 16:
        p += "טז";
        n = 0;
        break;

      default:
        p += yud.charAt(divide(n, 10) - 1);
        break;
    }
    n %= 10;
  }

  if (n > 0) p += alef.charAt(n - 1);

  if (p.length == 1) p += "'";
  else p = p.slice(0, p.length - 1) + '"' + p.charAt(p.length - 1);

  return p;
}

// Holidays functions
// ==================

function HolidayToString() {
  return this.description;
}

// Holiday object Constructor

function Holiday(day, month, condition, description, type) {
  this.day = day;
  this.month = month;
  this.condition = condition;
  this.description = description;
  this.holiday_type = type ? type : "holiday";
  this.toString = HolidayToString;
}

function CheckHanuka(gg) {
  var g = new Date(gg);
  g.setDate(g.getDate() - 3);
  var h = new HebrewDate();
  h.convertGregorian(g);
  return h.hd_day == 28;
}

// Day, Month, Condition, Description, Style
var Holidays = Array(
  // תשרי
  new Holiday(1, 1, 1, "ראש השנה", "yomtov"),
  new Holiday(2, 1, 1, "ראש השנה", "yomtov"),
  new Holiday(3, 1, "dow!=7", "צום גדליה", "sadday"),
  new Holiday(4, 1, "dow==1", "צום גדליה (נדחה)", "sadday"),
  new Holiday(10, 1, 1, "יום כיפור", "yomtov"),
  new Holiday(15, 1, 1, "סוכות", "yomtov"),
  new Holiday(16, 1, 1, 'א דחוה"מ'),
  new Holiday(17, 1, 1, 'ב דחוה"מ'),
  new Holiday(18, 1, 1, 'ג דחוה"מ'),
  new Holiday(19, 1, 1, 'ד דחוה"מ'),
  new Holiday(20, 1, 1, 'ה דחוה"מ'),
  new Holiday(21, 1, 1, "הושענא רבה"),
  new Holiday(22, 1, 1, "שמחת תורה", "yomtov"),
  // כסליו
  new Holiday(25, 3, 1, "חנוכה"),
  new Holiday(26, 3, 1, "חנוכה"),
  new Holiday(27, 3, 1, "חנוכה"),
  new Holiday(28, 3, 1, "חנוכה"),
  new Holiday(29, 3, 1, "חנוכה"),
  new Holiday(30, 3, 1, "חנוכה"),
  // טבת
  new Holiday(1, 4, 1, "חנוכה"),
  new Holiday(2, 4, 1, "חנוכה"),
  new Holiday(3, 4, "CheckHanuka(g)", "חנוכה"),
  new Holiday(10, 4, 1, "צום עשרה בטבת", "sadday"),
  // שבט
  new Holiday(15, 5, 1, "ראש השנה לאילנות"),
  // אדר
  new Holiday(11, 6, "dow==5", "תענית אסתר (מוקדם)", "sadday"),
  new Holiday(13, 6, "dow!=7", "תענית אסתר", "sadday"),
  new Holiday(14, 6, 1, "פורים"),
  new Holiday(15, 6, 1, "שושן פורים"),
  new Holiday(16, 6, "dow==1", "שושן פורים (משולש)"),
  // ניסן
  new Holiday(15, 7, 1, "פסח", "yomtov"),
  new Holiday(16, 7, 1, 'א דחוה"מ'),
  new Holiday(17, 7, 1, 'ב דחוה"מ'),
  new Holiday(18, 7, 1, 'ג דחוה"מ'),
  new Holiday(19, 7, 1, 'ד דחוה"מ'),
  new Holiday(20, 7, 1, 'ה דחוה"מ'),
  new Holiday(21, 7, 1, "שביעי של פסח", "yomtov"),
  new Holiday(26, 7, "(year>1958)&&(dow==5)", "יום השואה (מוקדם)", "sadday"),
  new Holiday(27, 7, "(year>1958)&&(dow<6)&&(dow>1)", "יום השואה", "sadday"),
  new Holiday(28, 7, "(year>1958)&&(dow==2)", "יום השואה (נדחה)", "sadday"),
  // אייר
  new Holiday(2, 8, "(year>1948)&&(dow==4)", "יום הזכרון (מוקדם)", "sadday"),
  new Holiday(3, 8, "(year>1948)&&(dow==4)", "יום הזכרון (מוקדם)", "sadday"),
  new Holiday(3, 8, "(year>1948)&&(dow==5)", "יום העצמאות (מוקדם)"),
  new Holiday(
    4,
    8,
    "((year>1948)&&(year<2004)&&(dow<5))||((year>2003)&&(dow==3))",
    "יום הזכרון",
    "sadday"
  ),
  new Holiday(4, 8, "year>1948&&dow==5", "יום העצמאות (מוקדם)"),
  new Holiday(
    5,
    8,
    "(year>1948&&year<2004&&dow<6)||(year>2003&&dow==4)",
    "יום העצמאות"
  ),
  new Holiday(5, 8, "year>2003&&dow==2", "יום הזכרון (נדחה)", "sadday"),
  new Holiday(6, 8, "year>2003&&dow==3", "יום העצמאות (נדחה)"),
  new Holiday(18, 8, 1, 'ל"ג בעומר'),
  new Holiday(28, 8, "year>1966", "יום שחרור ירושלים"),
  // סיוון
  new Holiday(6, 9, 1, "שבועות", "yomtov"),
  // תמוז
  new Holiday(17, 10, "dow!=7", 'צום י"ז בתמוז', "sadday"),

  new Holiday(18, 10, "dow==1", 'צום י"ז בתמוז (נדחה)', "sadday"),
  // אב
  new Holiday(9, 11, "dow!=7", "תשעה באב", "sadday"),
  new Holiday(10, 11, "dow==1", "תשעה באב (נדחה)", "sadday"),
  // אדר א
  new Holiday(14, 13, 1, "פורים קטן"),
  new Holiday(15, 13, 1, "שושן פורים קטן"),
  // אדר ב
  new Holiday(11, 14, "dow==5", "תענית אסתר (מוקדם)", "sadday"),
  new Holiday(13, 14, "dow!=7", "תענית אסתר", "sadday"),
  new Holiday(14, 14, 1, "פורים"),
  new Holiday(15, 14, 1, "שושן פורים"),
  new Holiday(16, 14, "dow==1", "שושן פורים (משולש)")
);

var HOUR = 1080;
var DAY = 24 * HOUR;
var WEEK = 7 * DAY;
function M(h, p) {
  return h * HOUR + p;
}

var MONTH = DAY + M(12, 793);

function dysiz(y) {
  var m, nm, dw, s, l;
  l = y * 7 + 1;
  m = y * 12 + divide(l, 19);
  l %= 19;
  nm = m * MONTH + M(1 + 6, 779);
  s = m * 28 + divide(nm, DAY) - 2;
  nm %= WEEK;
  dw = divide(nm, DAY);
  nm %= DAY;
  if (
    (l < 12 && dw == 3 && nm >= M(9 + 6, 204)) ||
    (l < 7 && dw == 2 && nm >= M(15 + 6, 589))
  )
    s++, dw++;
  if (dw == 1 || dw == 4 || dw == 6) s++;
  return s;
}

function hdate(d, m, y) {
  var h = new HebrewDate();
  var s;
  if ((m -= 2) <= 0) {
    m += 12;
    y--;
  }
  d += 365 * y + divide(y, 4) + divide(367 * m, 12) + 5968;
  d -= divide(y, 100) - divide(y, 400) - 2;
  h.hd_dw = (d + 1) % 7;
  y += 16;
  s = dysiz(y);
  m = dysiz(y + 1);
  while (d >= m) {
    s = m;
    y++;
    m = dysiz(y + 1);
  }
  d -= s;
  s = m - s;
  y += 3744;
  h.hd_flg = (s % 10) - 4;
  if (d >= s - 236) {
    d -= s - 236;
    m = divide(d * 2, 59);
    d -= divide(m * 59 + 1, 2);
    m += 4;
    if (s > 365 && m <= 5) m += 8;
  } else {
    s = 114 + (s % 10);
    m = divide(d * 4, s);
    d -= divide(m * s + 3, 4);
  }
  h.hd_day = d;
  h.hd_mon = m;
  h.hd_year = y;
  h.hd_leap = s > 365;
  return h;
}

function HDHoliday() {
  var dow = this.hd_dw + 1;
  var year = this.gregorian.getFullYear();
  var g = this.gregorian;
  var i;
  for (i = 0; i < Holidays.length; i++) {
    if (
      Holidays[i].month == this.hd_mon + 1 &&
      Holidays[i].day == this.hd_day + 1 &&
      eval(Holidays[i].condition)
    )
      return Holidays[i];
  }
  return null;
}

function HDToString() {
  var months = new Array(
    "תשרי",
    "חשון",
    "כסליו",
    "טבת",
    "שבט",
    "אדר",
    "ניסן",
    "אייר",
    "סיון",
    "תמוז",
    "אב",
    "אלול",
    "אדר א'",
    "אדר ב'"
  );
  var s = this.format;
  s = s.replace("DD", Gimatria(this.hd_day + 1));
  s = s.replace("MM", months[this.hd_mon]);
  s = s.replace("YYYY", Gimatria(this.hd_year));
  return s;
}

function HDGtoH(d) {
  if (d == minDate) {
    this.hd_day = 0;
    this.hd_mon = 0;
    this.hd_year = 0;
    this.hd_leap = 0;
    this.hd_dw = 0;
  } else {
    var h = hdate(d.getDate(), d.getMonth() + 1, d.getFullYear());
    this.hd_day = h.hd_day;
    this.hd_mon = h.hd_mon;
    this.hd_year = h.hd_year;
    this.hd_leap = h.hd_leap;
    this.hd_dw = h.hd_dw;
    this.hd_flg = h.hd_flg;
  }
  this.gregorian = d;
}

function ToGregorian() {
  var y = this.hd_year;
  var m = this.hd_mon + 1;
  var d = this.hd_day + 1;
  var s;

  if (!y) return minDate;

  y -= 3744;
  s = dysiz(y);
  d += s;
  s = dysiz(y + 1) - s; /* length of year */
  this.Leap = s > 365;
  if (this.Leap && m > 12) {
    if (m > 13) d += 30;
    m = 6;
  }
  d += divide(59 * (m - 1) + 1, 2); /* regular months */

  /* special cases */
  if (s % 10 > 4 && m > 2) /* long Heshvan */ d++;
  if (s % 10 < 4 && m > 3) /* short Kislev */ d--;
  if (s > 365 && m > 6) {
    /* leap year */ d += 30;
  }
  d -= 6002;
  // century
  y = divide((d + 36525) * 4, 146097) - 1;

  d -= divide(y, 4) * 146097 + (y % 4) * 36524;
  y *= 100;

  /* compute year */
  s = divide((d + 366) * 4, 1461) - 1;
  d -= divide(s, 4) * 1461 + (s % 4) * 365;
  y += s;
  /* compute month */
  m = divide((d + 245) * 12, 367) - 7;
  d -= divide(m * 367, 12) - 30;
  if (++m >= 12) {
    m -= 12;
    y++;
  }

  return new Date(y, m, d + 1);
}

function HDSetDate(n) {
  this.gregorian.setDate(n + (this.gregorian.getDate() - this.hd_day));
  this.convertGregorian(this.gregorian);
}

function AddMonths(delta) {
  if (delta > 12) {
    this.AddYears(delta / 12);
    delta = delta % 12;
  }
  var d = this.ToGregorian();
  // חודש פברואר זה המקרה היחיד שחודש לועזי הוא פחות מעברי, מצד שני לא בעיה לחשב את החודש הבא
  if (d.getMonth() === 2 && delta === 1) {
    hd_month++;
    return;
  }
  d.setMonth(d.getMonth() + delta);
  var d1 = new HebrewDate();
  d1.convertGregorian(d);
  while (d1.hd_day > this.hd_day) {
    d.setDate(d.getDate() - 1);
    d1.convertGregorian(d);
  }
  this.hd_mon = d1.hd_mon;
  this.hd_year = d1.hd_year;
  this.hd_day = d1.hd_day;
}

// HebrewDate constructor
function HebrewDate() {
  this.hd_day = 0;
  this.hd_mon = 0;
  this.hd_year = 0;
  this.hd_leap = 0;
  this.hd_dw = 0;
  this.hd_flg = 0;
  this.format = "DD MM YYYY";
  this.toString = HDToString;
  this.convertGregorian = HDGtoH;
  this.ToGregorian = ToGregorian;
  this.getHoliday = HDHoliday;
  this.gregorian = new Date();
  this.setDate = HDSetDate;
  this.AddMonths = AddMonths;
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// End of hdate.js
////////////////////////////////////////////////////////////////////////////////////////////////////

function today(d) {
  if (!d) d = new Date();
  var months = new Array(
    "ינואר",
    "פברואר",
    "מרץ",
    "אפריל",
    "מאי",
    "יוני",
    "יולי",
    "אוגוסט",
    "ספטמבר",
    "אוקטובר",
    "נובמבר",
    "דצמבר"
  );
  var days = "אבגדהו";
  var h = new HebrewDate();
  h.convertGregorian(d);
  //   var s = "<a href='todaytimes.aspx'>";
  var s = "";
  s += d.getDay() == 6 ? "שבת" : "יום " + days.charAt(d.getDay()) + "'";
  s +=
    ", " +
    d.getDate() +
    " " +
    "ב" +
    months[d.getMonth()] +
    " " +
    d.getFullYear() +
    ", " +
    h;
  var holiday = h.getHoliday();
  if (holiday) s += ", " + holiday;
  //   s += "</a>";
  return s;
}

function test(s) {
  if (!s) return today();
  console.log(s);
  var arr = s.split("-");
  var d = new Date(arr[0], Number(arr[1]) - 1, arr[2]);
  console.log(today(d));
  // document.getElementById("result").innerHTML = today(d);
}

// test();
// console.log(today());
module.exports = {
  today,
};
