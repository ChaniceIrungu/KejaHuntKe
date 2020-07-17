export default {
  formatCurrency: function (num) {
    return "Ksh" + Number(num.toFixed(2)).toLocaleString() + " ";
  },
};
//formatCurrency
