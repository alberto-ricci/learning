//setting the refresh interval
setInterval(() => {
  // getting the references from the html code
  let hours = document.getElementById("hours");
  let minutes = document.getElementById("minutes");
  let seconds = document.getElementById("seconds");
  let day = document.getElementById("day");
  let month = document.getElementById("month");
  let year = document.getElementById("year");

  // retrieving the stroke-dashoffset attribute values of specific elements in the HTML
  let hh = parseInt(
    document.getElementById("hh").getAttribute("stroke-dashoffset")
  );
  let mimi = parseInt(
    document.getElementById("mimi").getAttribute("stroke-dashoffset")
  );
  let ss = parseInt(
    document.getElementById("ss").getAttribute("stroke-dashoffset")
  );
  let dd = parseInt(
    document.getElementById("dd").getAttribute("stroke-dashoffset")
  );
  let momo = parseInt(
    document.getElementById("momo").getAttribute("stroke-dashoffset")
  );
  let yy = parseInt(
    document.getElementById("yy").getAttribute("stroke-dashoffset")
  );

  // selecting the dot elements and assigning them to variables
  let hou_dot = document.querySelector(".hou_dot");
  let min_dot = document.querySelector(".min_dot");
  let sec_dot = document.querySelector(".sec_dot");
  let day_dot = document.querySelector(".day_dot");
  let mon_dot = document.querySelector(".mon_dot");
  let yea_dot = document.querySelector(".yea_dot");

  // creating variables to store the current hour, minute, second, day, month, and year
  let h = new Date().getHours();
  let mi = new Date().getMinutes();
  let s = new Date().getSeconds();
  let d = new Date().getDate();
  let mo = new Date().getMonth() + 1;
  let y = new Date().getFullYear();

  //add zero before single digit number
  h = h < 10 ? "0" + h.toString() : h.toString();
  mi = mi < 10 ? "0" + mi.toString() : mi.toString();
  s = s < 10 ? "0" + s.toString() : s.toString();
  d = d < 10 ? "0" + d.toString() : d.toString();
  mo = mo < 10 ? "0" + mo.toString() : mo.toString();

  // set the arrays for days and mont
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Set the innerHTML of the day and month spans
  const currentDay = days[new Date().getDay()];
  const currentMonth = months[mo - 1];

  hours.innerHTML = h + "<br><span>Hours</span>";
  minutes.innerHTML = mi + "<br><span>Minutes</span>";
  seconds.innerHTML = s + "<br><span>Seconds</span>";
  day.innerHTML = d + "<br><span>" + currentDay + "</span>";
  month.innerHTML = mo + "<br><span>" + currentMonth + "</span>";
  year.innerHTML = y + "<br><span>Year</span>";

  // returning the number of days per given month
  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  // calculating the position of elements based on current time and date
  hh = 440 - (440 * h) / 24;
  mimi = 440 - (440 * mi) / 60;
  ss = 440 - (440 * s) / 60;
  dd = 440 - (440 * d) / daysInMonth(mo, y);
  momo = 440 - (440 * mo) / 12;
  yy = 440 - (440 * (y % 100)) / 100;

  //updating the stroke-dashoffset property of the SVG elements using the values of corresponding variables
  document.getElementById("hh").style.strokeDashoffset = hh;
  document.getElementById("mimi").style.strokeDashoffset = mimi;
  document.getElementById("ss").style.strokeDashoffset = ss;
  document.getElementById("dd").style.strokeDashoffset = dd;
  document.getElementById("momo").style.strokeDashoffset = momo;
  document.getElementById("yy").style.strokeDashoffset = yy;

  //managing the dot rotation
  //hou_dot.style.transform = `rotate(${(h / 24) * 360}deg)`;
  //min_dot.style.transform = `rotate(${(mi / 60) * 360}deg)`;
  //sec_dot.style.transform = `rotate(${(s / 60) * 360}deg)`;
  //day_dot.style.transform = `rotate(${(d / daysInMonth(mo, y)) * 360}deg)`;
  //mon_dot.style.transform = `rotate(${(mo / 12) * 360}deg)`;
  //yea_dot.style.transform = `rotate(${(y / 100) * 360}deg)`;
});