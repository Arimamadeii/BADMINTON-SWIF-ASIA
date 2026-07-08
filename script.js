// ===== script.js =====
(function() {
  // ==============================================================
  // DATA PERTANDINGAN – GRADE A (16 tim) & GRADE B (8 tim)
  // ==============================================================
  const allMatches = [
    // ===== GRADE A (16 tim / 8 pertandingan) =====
    { 
      grade: 'A', 
      teamA: ['KARMIN', 'AZIS'], 
      teamB: ['IDRIS', 'BINTANG'], 
      day: 'SENIN', date: '13-JULI', time: '17:30',
      result: '0:0' // Hasil pertandingan (akan diedit manual di code)
    },
    { 
      grade: 'A', 
      teamA: ['GILANG', 'PAK AEP'], 
      teamB: ['ZAELANI', 'HANDI'], 
      day: 'SENIN', date: '13-JULI', time: '18:00',
      result: '0:0'
    },
    { 
      grade: 'A', 
      teamA: ['MAKMUR', 'NUNUS'], 
      teamB: ['ESTHU', 'TEGAR'], 
      day: 'SENIN', date: '13-JULI', time: '18:30',
      result: '0:0'
    },
    { 
      grade: 'A', 
      teamA: ['ADI', 'AGIYAN'], 
      teamB: ['HARJANTO', 'DEDI'], 
      day: 'SENIN', date: '20-JULI', time: '17:30',
      result: '0:0'
    },
    { 
      grade: 'A', 
      teamA: ['BERTUS', 'ENGKI'], 
      teamB: ['AFIF', 'RAKA'], 
      day: 'SENIN', date: '20-JULI', time: '18:00',
      result: '0:0'
    },
    { 
      grade: 'A', 
      teamA: ['DANI', 'SYAHRI'], 
      teamB: ['ONI .T', 'NDIVAL'], 
      day: 'SENIN', date: '20-JULI', time: '18:30',
      result: '0:0'
    },
    { 
      grade: 'A', 
      teamA: ['TATA', 'SIDIG'], 
      teamB: ['BAREND', 'UJANG'], 
      day: 'SENIN', date: '27-JULI', time: '17:30',
      result: '0:0'
    },
    { 
      grade: 'A', 
      teamA: ['RIDUL', 'AGUS'], 
      teamB: ['ENTIS', 'PAK YADI'], 
      day: 'SENIN', date: '27-JULI', time: '18:00',
      result: '0:0'
    },

    // ===== GRADE B (8 tim / 4 pertandingan) =====
    { 
      grade: 'B', 
      teamA: ['RUDI', 'SUSANTO'], 
      teamB: ['TEGUH', 'JOKO'], 
      day: 'SENIN', date: '14-JULI', time: '17:30',
      result: '0:0'
    },
    { 
      grade: 'B', 
      teamA: ['BAMBANG', 'PUTRI'], 
      teamB: ['DIMAS', 'RINA'], 
      day: 'SENIN', date: '21-JULI', time: '18:00',
      result: '0:0'
    },
    { 
      grade: 'B', 
      teamA: ['AGUS', 'SARI'], 
      teamB: ['INDAH', 'BAYU'], 
      day: 'SENIN', date: '28-JULI', time: '17:45',
      result: '0:0'
    },
    { 
      grade: 'B', 
      teamA: ['HENDRA', 'NOVA'], 
      teamB: ['FIKRI', 'ANISA'], 
      day: 'SENIN', date: '4-AUG', time: '18:15',
      result: '0:0'
    }
  ];

  // ==============================================================
  // STATE
  // ==============================================================
  let currentFilter = 'all';
  let activeCountdown = null;
  let countdownInterval = null;

  // Polling data (disimpan di localStorage agar persist)
  function getPollData(matchId) {
    const key = `poll_${matchId}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
    return { teamA: 0, teamB: 0 };
  }

  function savePollData(matchId, data) {
    const key = `poll_${matchId}`;
    localStorage.setItem(key, JSON.stringify(data));
  }

  // ==============================================================
  // DOM REFS
  // ==============================================================
  const container = document.getElementById('bracketContainer');
  const gradeBtns = document.querySelectorAll('.grade-btn');
  const modal = document.getElementById('matchModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.querySelector('.modal-close');

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
        <div class="match-card" data-match-id="${uniqueId}" data-match-index="${idx}" data-grade="${m.grade}">
          <span class="grade-badge ${gradeClass}">GRADE ${m.grade}</span>
          
          <div class="match-teams">
            <div class="team-block team-a">
              <span class="team-label">TEAM A</span>
              <div class="team-players">
                <span class="player-name">${teamA1}</span>
                <span class="player-name">${teamA2}</span>
              </div>
            </div>
            
            <div class="vs-divider">⚡ VS ⚡</div>
            
            <div class="team-block team-b">
              <span class="team-label">TEAM B</span>
              <div class="team-players">
                <span class="player-name">${teamB1}</span>
                <span class="player-name">${teamB2}</span>
              </div>
            </div>
          </div>

          <div class="match-meta">
            <span class="day">${m.day || 'SENIN'}</span>
            <span class="datetime">
              <span>${m.date || '—'}</span>
              <span>${m.time || '—'}</span>
            </span>
          </div>
          
          <div class="click-hint">👆 Klik untuk detail pertandingan</div>
        </div>
      `;
    });

    container.innerHTML = html;

    // Attach click event ke setiap match card
    document.querySelectorAll('.match-card').forEach(card => {
      card.addEventListener('click', function() {
        const idx = parseInt(this.dataset.matchIndex);
        const grade = this.dataset.grade;
        // Cari data match
        const matchData = allMatches.find((m, i) => i === idx && m.grade === grade);
        if (matchData) {
          openModal(matchData, idx, grade);
        }
      });
    });
  }

  // ==============================================================
  // MODAL FUNGSI
  // ==============================================================
  function openModal(match, idx, grade) {
    const matchId = `${grade}-${idx}`;
    const teamAStr = match.teamA.join(' & ');
    const teamBStr = match.teamB.join(' & ');
    const pollData = getPollData(matchId);
    const totalVotes = pollData.teamA + pollData.teamB;
    const pctA = totalVotes > 0 ? Math.round((pollData.teamA / totalVotes) * 100) : 0;
    const pctB = totalVotes > 0 ? Math.round((pollData.teamB / totalVotes) * 100) : 0;

    // Parse result
    const resultParts = match.result ? match.result.split(':') : ['0', '0'];
    const scoreA = resultParts[0] || '0';
    const scoreB = resultParts[1] || '0';

    modalBody.innerHTML = `
      <div class="modal-match-title">🏸 Pertandingan Grade ${match.grade}</div>
      
      <div class="modal-teams">
        <div class="modal-team">
          <div class="team-label">TEAM A</div>
          <div class="team-names">${teamAStr}</div>
        </div>
        <div class="modal-vs">⚡ VS ⚡</div>
        <div class="modal-team">
          <div class="team-label">TEAM B</div>
          <div class="team-names">${teamBStr}</div>
        </div>
      </div>

      <div class="match-meta" style="margin-bottom:1rem;">
        <span class="day">${match.day || 'SENIN'}</span>
        <span class="datetime">
          <span>${match.date || '—'}</span>
          <span>${match.time || '—'}</span>
        </span>
      </div>

      <!-- COUNTDOWN -->
      <div class="countdown-section">
        <div class="label">⏱️ COUNTDOWN</div>
        <div class="countdown-display" id="countdownDisplay">00:00</div>
        <div class="countdown-controls">
          <button class="countdown-btn" onclick="window.startCountdown(5)">⏳ 5 Menit</button>
          <button class="countdown-btn" onclick="window.startCountdown(10)">⏳ 10 Menit</button>
          <button class="countdown-btn" onclick="window.startCountdown(15)">⏳ 15 Menit</button>
          <button class="countdown-btn danger" onclick="window.stopCountdown()">⏹ Stop</button>
        </div>
      </div>

      <!-- HASIL PERTANDINGAN (STATIS) -->
      <div class="result-section">
        <div class="label">🏆 HASIL PERTANDINGAN</div>
        <div class="result-display">
          <span class="team-a-score">${scoreA}</span>
          <span style="color:#8aa0b8; font-weight:300;"> : </span>
          <span class="team-b-score">${scoreB}</span>
        </div>
        <div style="font-size:0.6rem; color:#8aa0b8; margin-top:0.3rem;">
          * Edit langsung di file script.js (field "result")
        </div>
      </div>

      <!-- POLLING PEMENANG -->
      <div class="poll-section">
        <span class="label">📊 POLLING PEMENANG</span>
        <div class="poll-options">
          <div class="poll-option ${pollData.teamA > pollData.teamB ? 'selected' : ''}" 
               onclick="window.votePoll('${matchId}', 'teamA')">
            <div class="poll-team">🏸 ${match.teamA[0]} & ${match.teamA[1]}</div>
            <div class="poll-votes">${pollData.teamA} suara (${pctA}%)</div>
            <div class="poll-bar"><div class="fill" style="width:${pctA}%"></div></div>
          </div>
          <div class="poll-option ${pollData.teamB > pollData.teamA ? 'selected' : ''}" 
               onclick="window.votePoll('${matchId}', 'teamB')">
            <div class="poll-team">🏸 ${match.teamB[0]} & ${match.teamB[1]}</div>
            <div class="poll-votes">${pollData.teamB} suara (${pctB}%)</div>
            <div class="poll-bar"><div class="fill" style="width:${pctB}%"></div></div>
          </div>
        </div>
        <div class="poll-total">Total suara: ${totalVotes}</div>
      </div>
    `;

    // Tampilkan modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  // ==============================================================
  // COUNTDOWN FUNGSI (di-expose ke window)
  // ==============================================================
  window.startCountdown = function(minutes) {
    stopCountdown();
    let totalSeconds = minutes * 60;
    const display = document.getElementById('countdownDisplay');
    if (!display) return;

    activeCountdown = totalSeconds;
    updateCountdownDisplay(display, totalSeconds);

    countdownInterval = setInterval(() => {
      totalSeconds--;
      activeCountdown = totalSeconds;
      updateCountdownDisplay(display, totalSeconds);
      if (totalSeconds <= 0) {
        stopCountdown();
        display.textContent = '⏰ WAKTU HABIS!';
        display.style.color = '#c0392b';
      }
    }, 1000);
  };

  window.stopCountdown = function() {
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
    const display = document.getElementById('countdownDisplay');
    if (display) {
      display.textContent = '00:00';
      display.style.color = '#1a3a5f';
    }
    activeCountdown = null;
  };

  function updateCountdownDisplay(display, seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    display.style.color = seconds < 60 ? '#c0392b' : '#1a3a5f';
  }

  // ==============================================================
  // POLLING FUNGSI (di-expose ke window)
  // ==============================================================
  window.votePoll = function(matchId, team) {
    const data = getPollData(matchId);
    if (team === 'teamA') {
      data.teamA += 1;
    } else if (team === 'teamB') {
      data.teamB += 1;
    }
    savePollData(matchId, data);
    
    // Refresh modal dengan data terbaru
    const matchGrade = matchId.split('-')[0];
    const matchIdx = parseInt(matchId.split('-')[1]);
    const matchData = allMatches.find((m, i) => i === matchIdx && m.grade === matchGrade);
    if (matchData) {
      openModal(matchData, matchIdx, matchGrade);
    }
  };

  // ==============================================================
  // MODAL CLOSE
  // ==============================================================
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    stopCountdown();
  }

  modalClose.addEventListener('click', closeModal);
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

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

  // ==============================================================
  // CARA MENAMPILKAN GAMBAR (contoh)
  // ==============================================================
  /*
    Untuk menampilkan gambar di website, Anda bisa:
    
    1. Taruh file gambar di folder yang sama dengan file HTML
    2. Tambahkan tag <img> di HTML atau di dalam modal
    
    Contoh:
    <img src="logo-swif.png" alt="Logo SWIF ASIA" style="max-width:200px;" />
    
    atau di dalam modal:
    <div style="text-align:center; margin:1rem 0;">
      <img src="banner-turnamen.jpg" alt="Banner Turnamen" style="max-width:100%; border-radius:12px;" />
    </div>
    
    Anda juga bisa menggunakan gambar dari URL:
    <img src="https://example.com/gambar.jpg" alt="Gambar" />
  */
  console.log('✅ Website siap! Untuk menampilkan gambar, tambahkan tag <img> di HTML atau di modalBody.');
})();
