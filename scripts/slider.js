var tabs = [
  'Location Preference',
  "Acute Myocardial Infarction (AMI) 30-Day Mortality Rate",
  "Heart Failure (HF) 30-Day Mortality Rate",
  "Pneumonia 30-Day Mortality Rate",
  "Complication/patient safety for selected indicators (composite)",
  "Influenza Immunization",
  "Initial Antibiotic Selection for CAP in Immunocompetent Patient",
  "Surgery Patients on Beta-Blocker Therapy Prior to Arrival Who Received a Beta-Blocker During the Perioperative Period",
  "Prophylactic Antibiotic Selection for Surgical Patients",
  "Prophylactic Antibiotics Discontinued Within 24 hours After Surgery End Time",
  "Urinary  Catheter Removed on Postoperative Day 1 (POD 1) or Postoperative Day 2 (POD 2) with Day of Surgery being Day Zero",
  "Surgery Patients Who Received Appropriate Venous Thromboembolism Prophylaxis Within 24 Hours Prior to Surgery to 24 Hours After Surgery",
  "Fibrinolytic Therapy Received within 30 Minutes of Hospital Arrival",
  "Central Line Associated Bloodstream Infection",
  "Catheter Associated Urinary Tract Infections",
  "SSI - Colon Surgery",
  "SSI - Abdominal Hysterectomy",
  'Patients who reported that their room and bathroom were "Always" clean',
  'Patients who reported that their nurses "Always" communicated well',
  'Patients who reported that their doctors "Always" communicated well',
  'Patients who reported that they "Always" received help as soon as they wanted',
  'Patients who reported that their pain was "Always" well controlled',
  'Patients who reported that staff "Always" explained about medicines before giving it to them',
  'Patients who "Agree" they understood their care when they left the hospital',
  'Patients who "Strongly Agree" they understood their care when they left the hospital',
  'Patients who gave their hospital a rating of 9 or 10 on a scale from 0 (lowest) to 10 (highest)',
  'Patients who reported that the area around their room was "Always" quiet at night',
  'Spending per Hospital Patient with Medicare (Medicare Spending per Beneficiary)',
]

window.addEventListener('load', function () {
  var out = tabs.map(function (tab) {
    return '<h3>' + tab + '</h3><input type="range" min="0" max="4" value="0">'
  });

  $('#sliders').html(out.join(''));

  $('#submit').click(function (e) {
    var sliders = $('#sliders').children('input');
    var toServer = '';
    for (var i = 0;  i < 26; i++) {
      toServer += sliders[i].value + ' ';
    }

    sendToServer(toServer);
  });
});
