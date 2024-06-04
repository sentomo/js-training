const data = [
  { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
  { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
  { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
  { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
  { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
  { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
  { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
  { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
  { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

// mathの全員の合計点
const mathTotal = data.reduce((total, student) => total + student.math, 0);
console.log("mathの全員の合計点:", mathTotal);

// クラスAのchemistryの平均点
const classAChemistryAverage = data
  .filter(student => student.class === "A")
  .reduce((total, student, _, arr) => total + student.chemistry / arr.length, 0);
console.log("クラスAのchemistryの平均点:", classAChemistryAverage);

// 3科目合計点のクラスC内での平均点
const classCOverallAverage = data
  .filter(student => student.class === "C")
  .reduce((total, student, _, arr) => total + (student.math + student.chemistry + student.geography) / arr.length, 0);
console.log("3科目合計点のクラスC内での平均点:", classCOverallAverage);

// 3科目合計点が最も高い人のname
const topScorer = data.reduce((top, student) => {
  const totalScore = student.math + student.chemistry + student.geography;
  return totalScore > top.score ? { name: student.name, score: totalScore } : top;
}, { name: "", score: -Infinity }).name;
console.log("3科目合計点が最も高い人のname:", topScorer);

// 全体のgeographyの標準偏差
const geographyScores = data.map(student => student.geography);
const avg = geographyScores.reduce((total, score) => total + score, 0) / geographyScores.length;
const variance = geographyScores.reduce((total, score) => total + Math.pow(score - avg, 2), 0) / geographyScores.length;
const standardDeviation = Math.sqrt(variance);
console.log("全体のgeographyの標準偏差:", standardDeviation);
