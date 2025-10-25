const params = new URLSearchParams(window.location.search);
const chapter = params.get('chapter');
const quizContainer = document.getElementById('quiz-container');
const results = document.getElementById('results');
const submitBtn = document.getElementById('submit-btn');

document.getElementById('chapter-title').innerText = `Κεφάλαιο ${chapter}`;

let questions = [];
fetch(`data/chapter_${chapter}_questions.json`)
  .then(r => r.json())
  .then(d => {
    questions = d;
    displayQuestions();
  })
  .catch(err => {
    quizContainer.innerHTML = '<p style="color:red;">Σφάλμα φόρτωσης ερωτήσεων. Ελέγξτε ότι το αρχείο JSON υπάρχει!</p>';
  });

function displayQuestions() {
  quizContainer.innerHTML = '';
  questions.forEach((q, i) => {
    quizContainer.innerHTML += `
      <div class="question">
        <p><strong>${i + 1}.</strong> ${q.question}</p>
        <label><input type="radio" name="q${i}" value="true"> Σωστό</label>
        <label><input type="radio" name="q${i}" value="false"> Λάθος</label>
      </div>`;
  });
}

submitBtn.onclick = () => {
  let score = 0;
  let html = '<h2>Αποτελέσματα</h2><table><tr><th>#</th><th>Ερώτηση</th><th>Η Απάντησή σας</th><th>Σωστή Απάντηση</th></tr>';

  questions.forEach((q, i) => {
    const selected = document.querySelector(`input[name='q${i}']:checked`);

    // Μετατροπή string σε boolean
    const userAnswer = selected ? (selected.value === 'true' ? true : false ) : null;
    const correctAnswer = q.answer;

    // Έλεγχος σωστότητας
    const isCorrect = (userAnswer === correctAnswer);
    if (isCorrect && userAnswer !== null) score++;

    const userAnswerText = userAnswer === null ? 'Δεν απαντήθηκε' : (isCorrect ? 'Σωστό' : 'Λάθος');
    const correctAnswerText = correctAnswer ? 'Σωστό' : 'Λάθος';
    const resultClass = isCorrect ? 'correct' : 'incorrect';

    let correctInfo = '';
    if (userAnswerText === 'Λάθος') {
      !q.answer ? correctInfo = q.right_answer : correctInfo ='Η απάντηση είναι σωστή' ;
    } else if (userAnswerText === 'Σωστό'){
      correctInfo = '✓';
    }
   else {
      correctInfo = '' ;
    }

    html += `<tr>
      <td>${i + 1}</td>
      <td>${q.question}</td>
      <td class="${resultClass}">${userAnswerText}</td>
      <td>${correctInfo}</td>
    </tr>`;
  });

  const percentage = Math.round((score / questions.length) * 100);
  html += `</table><p><strong>Συνολικό Σκορ: ${score}/${questions.length} (${percentage}%)</strong></p>`;

  localStorage.setItem(`chapter${chapter}_score`, `${percentage}%`);
  const historyKey = `chapter${chapter}_history`;
  const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
  history.push({ date: new Date().toLocaleString('el-GR'), score: percentage });
  localStorage.setItem(historyKey, JSON.stringify(history));

  html += '<h3>Ιστορικό:</h3><ul>';
  history.forEach(h => html += `<li>${h.date} — ${h.score}%</li>`);
  html += '</ul>';

  results.innerHTML = html;
  results.classList.remove('hidden');
  submitBtn.disabled = true;
};
