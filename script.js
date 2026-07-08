// ===== script.js =====
(function() {
  // ==============================================================
  // DATA PERTANDINGAN – GRADE A (16 tim) & GRADE B (8 tim)
  // Setiap tim terdiri dari 2 orang (double/ganda)
  // ==============================================================
  const allMatches = [
    // ===== GRADE A (16 tim / 8 pertandingan) =====
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

  // ==============================================================
  // STATE & DOM
  // ==============================================================
  let currentFilter = 'all';
  const container = document.getElementById('bracketContainer');
  const gradeBtns = document.querySelectorAll('.grade-btn');

  // ==============================================================
  // RENDER FUNGSI
  // ==============================================================
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
      const uniqueId = `match-${m.grade}-${idx}-${Date.now()}-${Math.random().toString(36).substr(2,6)}`;

      html += `
        <div class="match-card" data-match-id="${uniqueId}">
          <span class="grade-badge ${gradeClass}">GRADE ${m.grade}</span>
          
          <div class="match-teams">
            <!-- TEAM A -->
            <div class="team-block team-a">
              <span class="team-label">TEAM A</span>
              <div class="team-players">
                <span class="player-name">${teamA1}</span>
                <span class="player-name">${teamA2}</span>
              </div>
            </div>
            
            <div class="vs-divider">⚡ VS ⚡</div>
            
            <!-- TEAM B -->
            <div class="team-block team-b">
              <span class="team-label">TEAM B</span>
              <div class="team-players">
                <span class="player-name">${teamB1}</span>
                <span class="player-name">${teamB2}</span>
              </div>
            </div>
          </div>

          <!-- ============================================= -->
          <!-- INPUT SKOR – DISEMBUNYIKAN (display: none)    -->
          <!-- Tetap di DOM untuk diedit nanti oleh developer -->
          <!-- ============================================= -->
          <div class="score-input-hidden">
            <label>SKOR TEAM A: <input type="text" id="scoreA_${uniqueId}" value="0" /></label>
            <label>SKOR TEAM B: <input type="text" id="scoreB_${uniqueId}" value="0" /></label>
            <button class="save-score-btn" data-id="${uniqueId}">Simpan Skor</button>
          </div>

          <!-- META (hari, tanggal, waktu) -->
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

    // ==============================================================
    // EVENT LISTENER UNTUK SIMPAN SKOR (tetap berfungsi di backend)
    // ==============================================================
    document.querySelectorAll('.save-score-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const id = this.dataset.id;
        const card = this.closest('.match-card');
        const inputA = card.querySelector(`input[id^="scoreA_${id}"]`);
        const inputB = card.querySelector(`input[id^="scoreB_${id}"]`);
        const valA = inputA?.value?.trim() || '0';
        const valB = inputB?.value?.trim() || '0';
        
        // Simulasi penyimpanan (bisa diganti dengan localStorage / AJAX)
        console.log(`✅ Skor disimpan untuk match ${id}:`, { teamA: valA, teamB: valB });
        alert(`✅ Skor tersimpan!\nTEAM A: ${valA}\nTEAM B: ${valB}`);
      });
    });
  }

  // ==============================================================
  // FILTER HANDLER
  // ==============================================================
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

  // ==============================================================
  // INIT
  // ==============================================================
  renderBracket('all');

})();
