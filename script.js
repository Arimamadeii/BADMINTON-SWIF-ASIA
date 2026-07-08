// ===== script.js =====
(function() {
  // --------------------------------------------------------------
  // DATA – GRADE A (16 teams) berdasarkan screenshot terbaru
  // Setiap tim terdiri dari 2 orang (double)
  // --------------------------------------------------------------
  const allMatches = [
    // ===== GRADE A (16 tim) dari data screenshot =====
    { grade: 'A', player1: 'KARMIN', player2: 'AZIS', day: 'SENIN', date: '13-JULI', time: '17:30' },
    { grade: 'A', player1: 'IDRIS', player2: 'BINTANG', day: 'SENIN', date: '27-JULI', time: '18:30' },
    { grade: 'A', player1: 'GILANG', player2: 'PAK AEP', day: 'SENIN', date: '13-JULI', time: '18:00' },
    { grade: 'A', player1: 'ZAELANI', player2: 'HANDI', day: 'SENIN', date: '3-AUG', time: '18:00' },
    { grade: 'A', player1: 'MAKMUR', player2: 'NUNUS', day: 'SENIN', date: '13-JULI', time: '18:30' },
    { grade: 'A', player1: 'ESTHU', player2: 'TEGAR', day: 'SENIN', date: '27-JULI', time: '19:00' },
    { grade: 'A', player1: 'ADI', player2: 'AGIYAN', day: 'SENIN', date: '20-JULI', time: '17:30' },
    { grade: 'A', player1: 'HARJANTO', player2: 'DEDI', day: 'SENIN', date: '10-AUG', time: '17:30' },
    { grade: 'A', player1: 'BERTUS', player2: 'ENGKI', day: 'SENIN', date: '20-JULI', time: '18:00' },
    { grade: 'A', player1: 'AFIF', player2: 'RAKA', day: 'SENIN', date: '27-JULI', time: '19:30' },
    { grade: 'A', player1: 'DANI', player2: 'SYAHRI', day: 'SENIN', date: '20-JULI', time: '18:30' },
    { grade: 'A', player1: 'ONI .T', player2: 'NDIVAL', day: 'SENIN', date: '3-AUG', time: '19:30' },
    { grade: 'A', player1: 'TATA', player2: 'SIDIG', day: 'SENIN', date: '27-JULI', time: '17:30' },
    { grade: 'A', player1: 'BAREND', player2: 'UJANG', day: 'SENIN', date: '3-AUG', time: '17:30' },
    { grade: 'A', player1: 'RIDUL', player2: 'AGUS', day: 'SENIN', date: '27-JULI', time: '18:00' },
    { grade: 'A', player1: 'ENTIS', player2: 'PAK YADI', day: 'SENIN', date: '3-AUG', time: '17:30' },

    // ===== GRADE B (8 tim) – tetap dari data sebelumnya =====
    { grade: 'B', player1: 'RUDI', player2: 'SUSANTO', day: 'SENIN', date: '14-JULI', time: '17:30' },
    { grade: 'B', player1: 'TEGUH', player2: 'JOKO', day: 'SENIN', date: '21-JULI', time: '18:00' },
    { grade: 'B', player1: 'BAMBANG', player2: 'PUTRI', day: 'SENIN', date: '4-AUG', time: '17:45' },
    { grade: 'B', player1: 'DIMAS', player2: 'RINA', day: 'SENIN', date: '11-AUG', time: '18:15' },
    { grade: 'B', player1: 'AGUS', player2: 'SARI', day: 'SENIN', date: '18-JULI', time: '19:10' },
    { grade: 'B', player1: 'INDAH', player2: 'BAYU', day: 'SENIN', date: '25-JULI', time: '18:45' },
    { grade: 'B', player1: 'HENDRA', player2: 'NOVA', day: 'SENIN', date: '8-AUG', time: '16:50' },
    { grade: 'B', player1: 'FIKRI', player2: 'ANISA', day: 'SENIN', date: '1-AUG', time: '17:20' }
  ];

  // state
  let currentFilter = 'all';

  // DOM refs
  const container = document.getElementById('bracketContainer');
  const gradeBtns = document.querySelectorAll('.grade-btn');

  // --------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------
  function renderBracket(filter) {
    const filtered = filter === 'all' 
      ? allMatches 
      : allMatches.filter(m => m.grade === filter);

    if (!filtered.length) {
      container.innerHTML = `<div class="empty-note">🏸 Tidak ada pertandingan untuk GRADE ${filter}</div>`;
      return;
    }

    let html = '';
    filtered.forEach((m, idx) => {
      const p1 = m.player1?.trim() || '—';
      const p2 = m.player2?.trim() || '—';
      const gradeClass = m.grade === 'A' ? 'grade-a' : 'grade-b';
      const uniqueId = `match-${m.grade}-${idx}-${Date.now()}-${Math.random().toString(36).substr(2,4)}`;

      html += `
        <div class="match-card" data-match-id="${uniqueId}">
          <span class="grade-badge ${gradeClass}">GRADE ${m.grade}</span>
          <div class="player-pair">
            <div class="pair-line">
              <span class="player-name">${p1}</span>
              <span class="vs-badge">VS</span>
              <span class="player-name">${p2}</span>
            </div>
          </div>

          <!-- RESULT INPUT (hanya simpan skor, tanpa eliminasi) -->
          <div class="result-area">
            <div class="result-input-group">
              <label>SKOR</label>
              <input type="text" id="score1_${uniqueId}" placeholder="0" maxlength="3" value="">
              <span style="font-weight:300; color:#7b93af;">:</span>
              <input type="text" id="score2_${uniqueId}" placeholder="0" maxlength="3" value="">
            </div>
            <button class="action-btn save-score-btn" data-id="${uniqueId}">SIMPAN</button>
          </div>

          <!-- META (day/date/time) -->
          <div class="match-meta">
            <span class="day">${m.day || 'SENIN'}</span>
            <span class="datetime">
              <span>${m.date || '—'}</span>
              <span>${m.time || '—'}</span>
            </span>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    // ----- ATTACH EVENT LISTENER untuk SIMPAN SKOR -----
    document.querySelectorAll('.save-score-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const id = this.dataset.id;
        const card = this.closest('.match-card');
        const input1 = card.querySelector(`input[id^="score1_${id}"]`);
        const input2 = card.querySelector(`input[id^="score2_${id}"]`);
        const val1 = input1?.value?.trim() || '0';
        const val2 = input2?.value?.trim() || '0';
        alert(`✅ Skor disimpan: ${val1} : ${val2}`);
      });
    });
  }

  // --------------------------------------------------------------
  // FILTER
  // --------------------------------------------------------------
  function setFilter(grade) {
    currentFilter = grade;
    gradeBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.grade === grade) btn.classList.add('active');
    });
    renderBracket(grade);
  }

  gradeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      setFilter(this.dataset.grade);
    });
  });

  // --------------------------------------------------------------
  // INIT
  // --------------------------------------------------------------
  renderBracket('all');
})();
