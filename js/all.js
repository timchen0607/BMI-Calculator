(function () {
  var calculator = document.getElementById("calculator");
  var history = document.querySelector(".history .content");
  var clearHistory = document.getElementById("clearHistory");
  var bmiList = JSON.parse(localStorage.getItem("bmiList")) || [];

  function addNewItem(weight, height) {
    var bmi = (weight * 10000) / (height * height) + Number.EPSILON;
    bmi = Math.round(bmi * 100) / 100;
    var newItem = {
      bmi: bmi,
      weight: parseInt(weight),
      height: parseInt(height),
      creatAt: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`,
    };
    bmiList.unshift(newItem);
    localStorage.setItem("bmiList", JSON.stringify(bmiList));
  }

  function refreshList() {
    var string = "";
    bmiList.forEach(function (item) {
      var temp = "";
      var classStr = "";
      if (item.bmi < 18.5) {
        temp = "體重過輕";
        classStr = "skinny";
      } else if (item.bmi < 24) {
        temp = "健康體位";
        classStr = "fit";
      } else if (item.bmi < 27) {
        temp = "體重過重";
        classStr = "plump";
      } else if (item.bmi < 30) {
        temp = "輕度肥胖";
        classStr = "chubby";
      } else if (item.bmi < 35) {
        temp = "中度肥胖";
        classStr = "overweight";
      } else {
        temp = "重度肥胖";
        classStr = "obese";
      }
      string += `<li class="item ${classStr}">
                <div>${temp}</div>
                <div><span class="text-sm">BMI </span>${item.bmi}</div>
                <div class="d-sm-none"><span class="text-sm">weight </span>${item.weight}kg</div>
                <div class="d-sm-none"><span class="text-sm">height </span>${item.height}cm</div>
                <div class="text-sm">${item.creatAt}</div>
                </li>`;
    });
    history.innerHTML = string;
  }
  refreshList();

  calculator.addEventListener("click", function () {
    var weight = document.getElementById("weight").value;
    var height = document.getElementById("height").value;

    var flag = true;
    document.querySelectorAll(".header input").forEach(function (item) {
      if (flag) {
        item.reportValidity();
        flag = item.reportValidity();
      }
    });
    if (flag) {
      addNewItem(weight, height);
      refreshList();
    }
  });
  clearHistory.addEventListener("click", function () {
    bmiList = [];
    localStorage.removeItem("bmiList");
    refreshList();
  });
})();
