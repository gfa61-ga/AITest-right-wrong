const chapters = [
  {num:1, title:"Εισαγωγή στην ΤΝ", questions:35}, {num:2, title:"Τεχνολογίες 4ης Βιομηχανικής", questions:40},
  {num:3, title:"Δεδομένα και ΤΝ", questions:35}, {num:4, title:"Θεωρητικά Θεμέλια ΤΝ", questions:30},
  {num:5, title:"Μηχανική Μάθηση", questions:40}, {num:6, title:"Βαθιά Μάθηση", questions:40},
  {num:7, title:"Φυσική Γλώσσα", questions:30}, {num:8, title:"Ενισχυτική Μάθηση", questions:35},
  {num:9, title:"Ρομποτική", questions:25}, {num:10, title:"Ηθική και Ευθύνη", questions:30},
  {num:11, title:"Big Data", questions:30}, {num:12, title:"Υπολογιστική Όραση", questions:25},
  {num:13, title:"Διαλογική ΤΝ", questions:25}, {num:14, title:"Μέλλον ΤΝ", questions:30},
  {num:15, title:"Υλοποίηση Συστημάτων ΤΝ", questions:50}
];

window.onload = () => {
  const tbody = document.querySelector("tbody");
  chapters.forEach(ch => {
    const lastScore = localStorage.getItem(`chapter${ch.num}_score`) || "—";
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${ch.num}. ${ch.title}</td><td>${ch.questions}</td><td>${lastScore}</td><td><button onclick='startQuiz(${ch.num})'>Ξεκίνα</button></td>`;
    tbody.appendChild(tr);
  });
};

function startQuiz(num){window.location=`quiz.html?chapter=${num}`;}
