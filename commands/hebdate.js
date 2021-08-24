const moment = require("moment");
const { today } = require("../hebcal/cal");

module.exports = {
  name: "hebdate",
  description: "prints the hebrew date",
  execute(client, message, args) {
    let _dateFixed = null;
    let _date = null;
    if (isToday(args[0])) _dateFixed = moment().format("YYYY-MM-DD");
    else if (yearMonthDate(args[0])) {
      _dateFixed = args[0];
    }
    if (!_dateFixed) return;
    const [y, m, d] = _dateFixed.split("-");
    _date = new Date(y, m - 1, d);
    if (!_date) return;
    message.channel.send(today(_date));
  },
};

const isToday = (arg) => arg === "today";
const yearMonthDate = (arg) => /\d{4}-\d{2}-\d{2}/.test(arg);
