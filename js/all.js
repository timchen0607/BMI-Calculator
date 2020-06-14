(function () {
  var calculator = document.getElementById("calculator");
  var bmiList = JSON.parse(localStorage.getItem("bmiList")) || [];

  function addNewItem(newItem) {
    bmiList.unshift(newItem);
    localStorage.setItem("bmiList", JSON.stringify(bmiList));
  }
  function refreshList() {}

  calculator.addEventListener("click", function () {
    var weight = document.getElementById("weight").value;
    var height = document.getElementById("height").value;
    var bmi = 0;

    if (height.length > 0 && weight.length > 0) {
      bmi = (weight * 10000) / (height * height) + Number.EPSILON;
      bmi = Math.round(bmi * 100) / 100;
      var newItem = {
        bmi: bmi,
        weight: parseInt(weight),
        height: parseInt(height),
        CreatAt: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`,
      };
      console.log(bmiList);
      // addNewItem(newItem);
    } else {
      var flag = true;
      document.querySelectorAll(".header input").forEach(function (item) {
        if (flag) {
          item.reportValidity();
          flag = item.reportValidity();
        }
      });
    }
  });
})();
