// Function to update the displayed slider value
function updateSliderValue() {
  const sliderValue = document.getElementById("targetPercentage").value;
  document.getElementById("sliderValue").textContent = sliderValue;
}

function calculateAttendance() {
  const totalHours = parseFloat(document.getElementById("totalHours").value);
  const attendedHours = parseFloat(document.getElementById("attendedHours").value);
  const targetPercentage = parseFloat(document.getElementById("targetPercentage").value);

  if (totalHours < 1){
    document.getElementById("result").innerHTML = "Total hours must be greater than zero.";
    return;
  }
  if (attendedHours > totalHours) {
    document.getElementById("result").innerHTML = "Attended hours cannot be greater than total hours.";
    return;
  }

  if (isNaN(totalHours) || isNaN(attendedHours) || isNaN(targetPercentage)) {
    document.getElementById("result").innerHTML = "Please enter valid numbers.";
    return;
  }

  const targetPercentageDecimal = targetPercentage / 100;
  const attendancePercentage = Math.trunc(((100/totalHours)*attendedHours) * 10) / 10;
  const requiredAttendedHours = (attendedHours - (targetPercentageDecimal * totalHours)) / (targetPercentageDecimal -1) ;
  const futureHoursToAttend = Math.ceil(requiredAttendedHours);
  const bunkableHours = Math.floor((attendedHours*100)/(targetPercentage)-totalHours);
  let bunk = ``;

  if (bunkableHours > 0){
    bunk = `<p>You can bunk ${bunkableHours} upcoming hours without losing ${targetPercentage}% attendance</p>`;
  }

    let result = `<p>Current Attendance Percentage: ${attendancePercentage}%</p>`;
  if (futureHoursToAttend > 0) {
    result += `<p>To reach ${targetPercentage}% attendance, you need to attend ${futureHoursToAttend} of the upcoming hours.</p>`;
  } else {
    result = `<p>Congratulations! You are having ${attendancePercentage}% attendance.</p> ` + bunk;
  }
  
  document.getElementById("result").innerHTML = result;
}
