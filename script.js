// ===== script.js =====
(function() {
  // --------------------------------------------------------------
  // DATA – GRADE A (16 teams) & GRADE B (8 teams)
  // Setiap tim terdiri dari 2 orang (double)
  // --------------------------------------------------------------
  const allMatches = [
    // ===== GRADE A (16 tim) =====
    { grade: 'A', player1: 'DENI', player2: 'WILDAN', day: 'SENIN', date: '13-JULI', time: '19:00' },
    { grade: 'A', player1: 'JAENAL', player2: 'ALDI', day: 'SENIN', date: '3-AUG', time: '18:30' },
    { grade: 'A', player1: 'ARIF_S', player2: 'TRI_W', day: 'SENIN', date: '20-JULI', time: '19:00' },
    { grade: 'A', player1: 'DADANG', player2: 'KARTID', day: 'SENIN', date: '10-AUG', time: '18:00' },
    { grade: 'A', player1: 'ARIF_ELC', player2: 'MEGGY', day: 'SENIN', date: '13-JULI', time: '19:30' },
    { grade: 'A', player1: 'BILLY', player2: 'NABIL', day: 'SENIN', date: '3-AUG', time: '19:00' },
    { grade: 'A', player1: 'YINA', player2: 'LULUK', day: 'SENIN', date: '20-JULI', time: '19:30' },
    { grade: 'A', player1: 'AWAY', player2: 'FAISAL', day: 'SENIN', date: '10-AUG', time: '18:30' },
    { grade: 'A', player1: 'RIAN', player2: 'FARAH', day: 'SENIN', date: '14-JULI', time: '17:00' },
    { grade: 'A', player1: 'GUNTUR', player2: 'DEWI', day: 'SENIN', date: '4-AUG', time: '18:45' },
    { grade: 'A', player1: 'HENDRA', player2: 'SARI', day: 'SENIN', date: '21-JULI', time: '19:15' },
    { grade: 'A', player1: 'BAGAS', player2: 'RINA', day: 'SENIN', date: '11-AUG', time: '17:30' },
    { grade: 'A', player1: 'DIMAS', player2: 'PUTRI', day: 'SENIN', date: '18-JULI', time: '18:00' },
    { grade: 'A', player1: 'RANGGA', player2: 'NINA', day: 'SENIN', date: '25-JULI', time: '19:00' },
    { grade: 'A', player1: 'ADIT', player2: 'SUSI', day: 'SENIN', date: '8-AUG', time: '16:45' },
    { grade: 'A', player1: 'TONI', player2: 'MIRA', day: 'SENIN', date: '15-JULI', time: '18:15' },

    // ===== GRADE B (8 tim) =====
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
  // simpan status eliminasi per match (index -> boolean)
  // key: "matchIndex" => true jika tereliminasi
  const eliminatedMap = new Map();

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
    // gunakan index global untuk mapping eliminasi
    filtered.forEach((m, idx) => {
      // cari index asli di allMatches agar konsisten
      const globalIdx = allMatches.indexOf(m);
      const isEliminated = eliminatedMap.get(globalIdx) || false;

      const p1 = m.player1?.trim() || '—';
      const p2 = m.player2?.trim() || '—';
      const gradeClass = m.grade === 'A' ? 'grade-a' : 'grade-b';
      const uniqueId = `match-${m.grade}-${idx}-${Date.now()}-${Math.random().toString(36).substr(2,4)}`;

      // class untuk eliminated
      const elimClass1 = isEliminated ? 'eliminated' : '';
      const elimClass2 = isEliminated ? 'eliminated' : '';

      html += `
        <div class="match-card" data-match-id="${uniqueId}" data-global-index="${globalIdx}">
          <span class="grade-badge ${gradeClass}">GRADE ${m.grade}</span>
          <div class="player-pair">
            <div class="pair-line ${elimClass1}">
              <span class="player-name">${p1}</span>
              <span class="vs-badge">VS</span>
              <span class="player-name">${p2}</span>
            </div>
          </div>

          <!-- RESULT INPUT + TOMBOL ELIMINASI -->
          <div class="result-area">
            <div class="result-input-group">
              <label>SKOR</label>
              <input type="text" id="score1_${uniqueId}" placeholder="0" maxlength="3" value="">
              <span style="font-weight:300; color:#7b93af;">:</span>
              <input type="text" id="score2_${uniqueId}" placeholder="0" maxlength="3" value="">
            </div>
            <button class="action-btn save-score-btn" data-id="${uniqueId}">SIMPAN</button>
          </div>

          <!-- TOMBOL ELIMINASI / PULIHKAN -->
          <div style="display:flex; gap:0.5rem; margin-top:0.3rem;">
            <button class="action-btn eliminate-btn" data-id="${uniqueId}" data-action="eliminate" ${isEliminated ? 'disabled style="opacity:0.5;"' : ''}>
              ⚫ ELIMINASI
            </button>
            <button class="action-btn restore-btn" data-id="${uniqueId}" data-action="restore" ${!isEliminated ? 'disabled style="opacity:0.5;"' : ''}>
              🔄 PULIHKAN
            </button>
          </div>

          <!-- META -->
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

    // ----- ATTACH EVENT LISTENERS -----
    // 1. Simpan skor
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

    // 2. Eliminasi / Pulihkan
    document.querySelectorAll('.eliminate-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const card = this.closest('.match-card');
        const globalIdx = parseInt(card.dataset.globalIndex, 10);
        if (!isNaN(globalIdx)) {
          eliminatedMap.set(globalIdx, true);
          renderBracket(currentFilter); // re-render
        }
      });
    });

    document.querySelectorAll('.restore-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const card = this.closest('.match-card');
        const globalIdx = parseInt(card.dataset.globalIndex, 10);
        if (!isNaN(globalIdx)) {
          eliminatedMap.delete(globalIdx);
          renderBracket(currentFilter);
        }
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
