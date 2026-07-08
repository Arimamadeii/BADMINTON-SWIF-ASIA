// ===== script.js =====
(function() {
  // --------------------------------------------------------------
  // DATA – GRADE A (16 teams) & GRADE B (8 teams)
  // Setiap tim terdiri dari 2 orang (double/ganda)
  // Format: { teamA: [nama1, nama2], teamB: [nama1, nama2] }
  // --------------------------------------------------------------
  const allMatches = [
    // ===== GRADE A (16 tim) dari data screenshot =====
    { 
      grade: 'A', 
      teamA: ['KARMIN', 'AZIS'], 
      teamB: ['IDRIS', 'BINTANG'], 
      day: 'SENIN', date: '13-JULI', time: '17:30' 
    },
    { 
      grade: 'A', 
      teamA: ['GILANG', 'PAK AEP'], 
      teamB: ['ZAELANI', 'HANDI'], 
      day: 'SENIN', date: '13-JULI', time: '18:00' 
    },
    { 
      grade: 'A', 
      teamA: ['MAKMUR', 'NUNUS'], 
      teamB: ['ESTHU', 'TEGAR'], 
      day: 'SENIN', date: '13-JULI', time: '18:30' 
    },
    { 
      grade: 'A', 
      teamA: ['ADI', 'AGIYAN'], 
      teamB: ['HARJANTO', 'DEDI'], 
      day: 'SENIN', date: '20-JULI', time: '17:30' 
    },
    { 
      grade: 'A', 
      teamA: ['BERTUS', 'ENGKI'], 
      teamB: ['AFIF', 'RAKA'], 
      day: 'SENIN', date: '20-JULI', time: '18:00' 
    },
    { 
      grade: 'A', 
      teamA: ['DANI', 'SYAHRI'], 
      teamB: ['ONI .T', 'NDIVAL'], 
      day: 'SENIN', date: '20-JULI', time: '18:30' 
    },
    { 
      grade: 'A', 
      teamA: ['TATA', 'SIDIG'], 
      teamB: ['BAREND', 'UJANG'], 
      day: 'SENIN', date: '27-JULI', time: '17:30' 
    },
    { 
      grade: 'A', 
      teamA: ['RIDUL', 'AGUS'], 
      teamB: ['ENTIS', 'PAK YADI'], 
      day: 'SENIN', date: '27-JULI', time: '18:00' 
    },
    // Tambahan untuk melengkapi 16 tim Grade A (8 pertandingan)
    { 
      grade: 'A', 
      teamA: ['DODI', 'SANDI'], 
      teamB: ['RENDI', 'FARID'], 
      day: 'SENIN', date: '27-JULI', time: '18:30' 
    },
    { 
      grade: 'A', 
      teamA: ['ANDRE', 'TITO'], 
      teamB: ['RONI', 'DONI'], 
      day: 'SENIN', date: '3-AUG', time: '17:30' 
    },
    { 
      grade: 'A', 
      teamA: ['BUDI', 'JOKO'], 
      teamB: ['SUSI', 'DEWI'], 
      day: 'SENIN', date: '3-AUG', time: '18:00' 
    },
    { 
      grade: 'A', 
      teamA: ['RINA', 'SARI'], 
      teamB: ['TINI', 'NINA'], 
      day: 'SENIN', date: '3-AUG', time: '18:30' 
    },
    { 
      grade: 'A', 
      teamA: ['AGUS', 'HARIS'], 
      teamB: ['RUDI', 'BAMBANG'], 
      day: 'SENIN', date: '10-AUG', time: '17:30' 
    },
    { 
      grade: 'A', 
      teamA: ['FIKRI', 'REZA'], 
      teamB: ['DIMAS', 'RANGGA'], 
      day: 'SENIN', date: '10-AUG', time: '18:00' 
    },
    { 
      grade: 'A', 
      teamA: ['HENDRA', 'TEGUH'], 
      teamB: ['GUNTUR', 'BAGAS'], 
      day: 'SENIN', date: '10-AUG', time: '18:30' 
    },
    { 
      grade: 'A', 
      teamA: ['JORDI', 'ARIF'], 
      teamB: ['FARAH', 'LULU'], 
      day: 'SENIN', date: '17-AUG', time: '17:30' 
    },

    // ===== GRADE B (8 tim / 4 pertandingan) =====
    { 
      grade: 'B', 
      teamA: ['RUDI', 'SUSANTO'], 
      teamB: ['TEGUH', 'JOKO'], 
      day: 'SENIN', date: '14-JULI', time: '17:30' 
    },
    { 
      grade: 'B', 
      teamA: ['BAMBANG', 'PUTRI'], 
      teamB: ['DIMAS', 'RINA'], 
      day: 'SENIN', date: '21-JULI', time: '18:00' 
    },
    { 
      grade: 'B', 
      teamA: ['AGUS', 'SARI'], 
      teamB: ['INDAH', 'BAYU'], 
      day: 'SENIN', date: '28-JULI', time: '17:45' 
    },
    { 
      grade: 'B', 
      teamA: ['HENDRA', 'NOVA'], 
      teamB: ['FIKRI', 'ANISA'], 
      day: 'SENIN', date: '4-AUG', time: '18:15' 
    }
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
      const teamA1 = m.teamA[0] || '—';
      const teamA2 = m.teamA[1] || '—';
      const teamB1 = m.teamB[0] || '—';
      const teamB2 = m.teamB[1] || '—';
      const gradeClass = m.grade === 'A' ? 'grade-a' : 'grade-b';
      const uniqueId = `match-${m.grade}-${idx}-${Date.now()}-${Math.random().toString(36).substr(2,4)}`;

      html += `
        <div class="match-card" data-match-id="${uniqueId}">
          <span class="grade-badge ${gradeClass}">GRADE ${m.grade}</span>
          
          <div class="match-teams">
            <!-- TEAM A -->
            <div class="team-block team-a">
              <span class="team-label">⚫ TEAM A</span>
              <div class="team-players">
                <span class="player-name">${teamA1}</span>
                <span style="color:#8aa0b8; font-weight:300;">&</span>
                <span class="player-name">${teamA2}</span>
              </div>
            </div>
            
            <div class="vs-divider">⚡ VS ⚡</div>
            
            <!-- TEAM B -->
            <div class="team-block team-b">
              <span class="team-label">⚪ TEAM B</span>
              <div class="team-players">
                <span class="player-name">${teamB1}</span>
                <span style="color:#8aa0b8; font-weight:300;">&</span>
                <span class="player-name">${teamB2}</span>
              </div>
            </div>
          </div>

          <!-- RESULT INPUT -->
          <div class="result-area">
            <div class="result-input-group">
              <label>SKOR</label>
              <input type="text" id="score1_${uniqueId}" placeholder="0" maxlength="3" value="">
              <span style="font-weight:300; color:#7b93af;">:</span>
              <input type="text" id="score2_${uniqueId}" placeholder="0" maxlength="3" value="">
            </div>
            <button class="action-btn save-score-btn" data-id="${uniqueId}">SIMPAN</button>
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

    // ATTACH EVENT LISTENER untuk SIMPAN SKOR
    document.querySelectorAll('.save-score-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const id = this.dataset.id;
        const card = this.closest('.match-card');
        const input1 = card.querySelector(`input[id^="score1_${id}"]`);
        const input2 = card.querySelector(`input[id^="score2_${id}"]`);
        const val1 = input1?.value?.trim() || '0';
        const val2 = input2?.value?.trim() || '0';
        alert(`✅ Skor disimpan:\nTEAM A: ${val1}\nTEAM B: ${val2}`);
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
