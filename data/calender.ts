/*
general (black)
celebration (green)
activity (blue)
competition (yellow)
awareness (purple)
exam (orange)
pti (pink)
internal (red)
holiday (red)
*/
const academicCalendar = [
  {
    month: "Baisakh",
    events: [
      {
        date: "9th",
        event: "World Earth Day",
        category: "general",
        color: "black",
      },
      {
        date: "14th",
        event: "Mother's Day (Pre-video making)",
        category: "celebration",
        color: "green",
      },
      {
        date: "19th",
        event: "Election of Head and Deputy Head Boy and Girl",
        category: "activity",
        color: "blue",
      },
      {
        date: "22nd",
        event: "Oath taking and badge distribution",
        category: "activity",
        color: "blue",
      },
      {
        date: "30th",
        event: "House Division (Internal)",
        category: "internal",
        color: "red",
      },
    ],
    workingDays: 22,
    holidays: [
      {
        date: "1st ",
        event: "Labour Day",
        category: "holiday",
        color: "red",
      },
      { date: "28th", event: "Last Sunday", category: "holiday", color: "red" },
      {
        date: "29th",
        event: "Buddha Jayanti",
        category: "holiday",
        color: "red",
      },
    ],
  },
  {
    month: "Jestha",
    events: [
      {
        date: "8th",
        event: "Debate (Sr. and M.S.) House-wise",
        category: "competition",
        color: "yellow",
      },
      {
        date: "12th & 13th",
        event: "Forest School (Jr. & M.S.)",
        category: "activity",
        color: "blue",
      },
      {
        date: "13th",
        event: "Speech Jr.",
        category: "competition",
        color: "yellow",
      },
    ],
    workingDays: 24,
    holidays: [
      {
        date: "15th",
        event: "Republic Day",
        category: "holiday",
        color: "red",
      },
      { date: "25th", event: "Last Sunday", category: "holiday", color: "red" },
    ],
  },
  {
    month: "Asadh",
    events: [
      {
        date: "6th",
        event: "World Yoga Day (Pre-celebration)",
        category: "celebration",
        color: "green",
      },
      {
        date: "12th",
        event: "World Drug Day (Studio program by Sr.)",
        category: "awareness",
        color: "purple",
      },
      {
        date: "15th",
        event: "Dahi chiura & Ropain",
        category: "celebration",
        color: "green",
      },
      {
        date: "22nd",
        event: "Tulsi plantation and puja",
        category: "activity",
        color: "blue",
      },
      {
        date: "25th",
        event: "Bhanu Jayanti Song (Bhanu timilai pranam)",
        category: "celebration",
        color: "green",
      },
      {
        date: "26th",
        event: "Poem recitation Sr. M.S. & Jr(housewise)",
        category: "competition",
        color: "yellow",
      },
      {
        date: "27th",
        event: "Role play ghasi and bhanu",
        category: "activity",
        color: "blue",
      },
    ],
    workingDays: 27,
    holidays: [
      { date: "29th", event: "Last Sunday", category: "holiday", color: "red" },
    ],
  },
  {
    month: "Shrawan",
    events: [
      { date: "1-8", event: "1st Term", category: "exam", color: "orange" },
      { date: "17th", event: "1st PTI", category: "pti", color: "pink" },
      {
        date: "18th",
        event: "Kheer khane Din",
        category: "celebration",
        color: "green",
      },
      {
        date: "19th",
        event: "Int’l Friendship Day",
        category: "celebration",
        color: "green",
      },
      {
        date: "23rd",
        event: "Pre Rakshya-bandhan celeb Jr.",
        category: "celebration",
        color: "green",
      },
      {
        date: "30th",
        event: "Pre-Krishna Janmasthami celebration at school",
        category: "celebration",
        color: "green",
      },
    ],
    workingDays: 25,
    holidays: [
      { date: "25th", event: "Last Sunday", category: "holiday", color: "red" },
    ],
  },
  {
    month: "Bhadra",
    events: [
      {
        date: "6th",
        event: "Pre-video making, card",
        category: "activity",
        color: "blue",
      },
      {
        date: "16th",
        event: "Quiz (Jr. M.S., Sr) House-wise",
        category: "competition",
        color: "yellow",
      },
      {
        date: "20th",
        event: "Long Term Pro (STEAM) Cart making, Pre-Indra jatra",
        category: "activity",
        color: "blue",
      },
      {
        date: "29th",
        event: "Children’s Day celebration( Cake-cutting)",
        category: "celebration",
        color: "green",
      },
      {
        date: "30th",
        event: "Teej Competition",
        category: "competition",
        color: "yellow",
      },
    ],
    workingDays: 26,
    holidays: [
      { date: "10th", event: "Teej", category: "holiday", color: "red" },
    ],
  },
  {
    month: "Ashwin",
    events: [
      { date: "1-9", event: "2nd Term", category: "exam", color: "orange" },
      {
        date: "12th",
        event: "Pre Dashain & Tihar Celebration",
        category: "celebration",
        color: "green",
      },
    ],
    workingDays: 10,
    holidays: [
      {
        date: "13th-31st",
        event: "Dashain and Tihar",
        category: "holiday",
        color: "red",
      },
    ],
  },
  {
    month: "Kartik",
    events: [
      {
        date: "11th",
        event: "School Resumes",
        category: "general",
        color: "black",
      },
    ],
    workingDays: 15,
    holidays: [
      { date: "1st-10th", event: "Tihar", category: "holiday", color: "red" },
    ],
  },
  {
    month: "Mangsir",
    events: [
      { date: "22nd", event: "2nd PTI", category: "pti", color: "pink" },
      {
        date: "25th",
        event: "Handwriting Competition house-wise",
        category: "competition",
        color: "yellow",
      },
      {
        date: "14th",
        event: "Spelling Bee( Sr. Jr.and M.S) Housewise",
        category: "competition",
        color: "yellow",
      },
      {
        date: "17th",
        event: "Yomari Making (STEAM)",
        category: "activity",
        color: "blue",
      },
      {
        date: "22nd",
        event: "Inter-house Art Competition",
        category: "competition",
        color: "yellow",
      },
      {
        date: "29th",
        event: "Forest School Jr. and M.S.",
        category: "activity",
        color: "blue",
      },
    ],
    workingDays: 23,
    holidays: [
      {
        date: "18th",
        event: "Guru Nanak Jayanti",
        category: "holiday",
        color: "red",
      },
      { date: "28th", event: "Last Sunday", category: "holiday", color: "red" },
    ],
  },
  {
    month: "Poush",
    events: [
      {
        date: "5th",
        event: "Haati bazaar",
        category: "activity",
        color: "blue",
      },
      {
        date: "9th",
        event: "Pre-Christmas Celebration",
        category: "celebration",
        color: "green",
      },
      {
        date: "11th",
        event: "1st Term Exam",
        category: "exam",
        color: "orange",
      },
      { date: "26th", event: "3rd PTI", category: "pti", color: "pink" },
      {
        date: "22-24",
        event: "Sports Meet",
        category: "activity",
        color: "blue",
      },
      {
        date: "22-24",
        event: "Winter break",
        category: "holiday",
        color: "red",
      },
    ],
    workingDays: 21,
    holidays: [
      { date: "10th", event: "Christmas", category: "holiday", color: "red" },
      { date: "27th", event: "Last Sunday", category: "holiday", color: "red" },
    ],
  },
  {
    month: "Magh",
    events: [
      { date: "1-2", event: "Winter break", category: "holiday", color: "red" },
      {
        date: "9th",
        event: "Saraswati puja",
        category: "celebration",
        color: "green",
      },
      {
        date: "17th",
        event: "Inter-house- Dance competition (Jr. MS, Sr.)",
        category: "competition",
        color: "yellow",
      },
      {
        date: "17th",
        event: "Annual Exhibition",
        category: "activity",
        color: "blue",
      },
    ],
    workingDays: 20,
    holidays: [
      {
        date: "18th",
        event: "Maghe Sankranti",
        category: "holiday",
        color: "red",
      },
      { date: "25th", event: "Last Sunday", category: "holiday", color: "red" },
    ],
  },
  {
    month: "Falgun",
    events: [
      {
        date: "2nd",
        event: "Literature & Sahitya Mozaid",
        category: "celebration",
        color: "green",
      },
      {
        date: "6th",
        event: "Research Presentation on the impact of Democracy",
        category: "activity",
        color: "blue",
      },
      {
        date: "16th",
        event: "Annual Function",
        category: "celebration",
        color: "green",
      },
      {
        date: "22-24",
        event: "Night out (MS and Sr.)",
        category: "activity",
        color: "blue",
      },
    ],
    workingDays: 19,
    holidays: [
      { date: "3rd, 7th", event: "Holi", category: "holiday", color: "red" },
    ],
  },
  {
    month: "Chaitra",
    events: [
      {
        date: "4th",
        event: "History of Ghode Jatra",
        category: "awareness",
        color: "purple",
      },
      { date: "19-22", event: "Final Exam", category: "exam", color: "orange" },
      { date: "26th", event: "Final PTI", category: "pti", color: "pink" },
    ],
    workingDays: 18,
    holidays: [
      { date: "13th", event: "Ghode Jatra", category: "holiday", color: "red" },
    ],
  },
];

export default academicCalendar;
