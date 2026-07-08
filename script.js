// ===== script.js =====
(function() {
  // ==============================================================
  // DATA PERTANDINGAN – LENGKAP SEMUA BABAK
  // ==============================================================
  const allMatches = [
    // ===== GRADE A - 16 BESAR (8 pertandingan) =====
    { 
      grade: 'A', round: '16', 
      teamA: ['KARMIN', 'AZIS'], 
      teamB: ['IDRIS', 'BINTANG'], 
      day: 'SENIN', date: '13-JULI', time: '17:30',
      result: '0:0'
    },
    { 
      grade: 'A', round: '16',
      teamA: ['GILANG', 'PAK AEP'], 
      teamB: ['ZAELANI', 'HANDI'], 
      day: 'SENIN', date: '13-JULI', time: '18:00',
      result: '0:0'
    },
    { 
      grade: 'A', round: '16',
      teamA: ['MAKMUR', 'NUNUS'], 
      teamB: ['ESTHU', 'TEGAR'], 
      day: 'SENIN', date: '13-JULI', time: '18:30',
      result: '0:0'
    },
    { 
      grade: 'A', round: '16',
      teamA: ['ADI', 'AGIYAN'], 
      teamB: ['HARJANTO', 'DEDI'], 
      day: 'SENIN', date: '20-JULI', time: '17:30',
      result: '0:0'
    },
    { 
      grade: 'A', round: '16',
      teamA: ['BERTUS', 'ENGKI'], 
      teamB: ['AFIF', 'RAKA'], 
      day: 'SENIN', date: '20-JULI', time: '18:00',
      result: '0:0'
    },
    { 
      grade: 'A', round: '16',
      teamA: ['DANI', 'SYAHRI'], 
      teamB: ['ONO .T', 'NOVAL'], 
      day: 'SENIN', date: '20-JULI', time: '18:30',
      result: '0:0'
    },
    { 
      grade: 'A', round: '16',
      teamA: ['TATA', 'SODIG'], 
      teamB: ['BAREND', 'UJANG'], 
      day: 'SENIN', date: '27-JULI', time: '17:30',
      result: '0:0'
    },
    { 
      grade: 'A', round: '16',
      teamA: ['ROMLI', 'AGUS'], 
      teamB: ['ENTIS', 'PAK YADI'], 
      day: 'SENIN', date: '27-JULI', time: '18:00',
      result: '0:0'
    },

    // ===== GRADE A - 8 BESAR (4 pertandingan) =====
    { 
      grade: 'A', round: '8',
      teamA: ['PEMENANG M1', 'PEMENANG M1'], 
      teamB: ['PEMENANG M2', 'PEMENANG M2'], 
      day: 'SENIN', date: '3-AUG', time: '17:30',
      result: '0:0'
    },
    { 
      grade: 'A', round: '8',
      teamA: ['PEMENANG M3', 'PEMENANG M3'], 
      teamB: ['PEMENANG M4', 'PEMENANG M4'], 
      day: 'SENIN', date: '3-AUG', time: '18:00',
      result: '0:0'
    },
    { 
      grade: 'A', round: '8',
      teamA: ['PEMENANG M5', 'PEMENANG M5'], 
      teamB: ['PEMENANG M6', 'PEMENANG M6'], 
      day: 'SENIN', date: '3-AUG', time: '18:30',
      result: '0:0'
    },
    { 
      grade: 'A', round: '8',
      teamA: ['PEMENANG M7', 'PEMENANG M7'], 
      teamB: ['PEMENANG M8', 'PEMENANG M8'], 
      day: 'SENIN', date: '3-AUG', time: '19:00',
      result: '0:0'
    },

    // ===== GRADE A - SEMIFINAL (2 pertandingan) =====
    { 
      grade: 'A', round: 'semifinal',
      teamA: ['PEMENANG Q1', 'PEMENANG Q1'], 
      teamB: ['PEMENANG Q2', 'PEMENANG Q2'], 
      day: 'SENIN', date: '10-AUG', time: '17:30',
      result: '0:0'
    },
    { 
      grade: 'A', round: 'semifinal',
      teamA: ['PEMENANG Q3', 'PEMENANG Q3'], 
      teamB: ['PEMENANG Q4', 'PEMENANG Q4'], 
      day: 'SENIN', date: '10-AUG', time: '18:30',
      result: '0:0'
    },

    // ===== GRADE A - FINAL =====
    { 
      grade: 'A', round: 'final',
      teamA: ['PEMENANG SF1', 'PEMENANG SF1'], 
      teamB: ['PEMENANG SF2', 'PEMENANG SF2'], 
      day: 'SENIN', date: '17-AUG', time: '19:00',
      result: '0:0'
    },

    // ===== GRADE B - 8 BESAR (4 pertandingan) =====
    { 
      grade: 'B', round: '8',
      teamA: ['DENI', 'WILDAN'], 
      teamB: ['JAENAL', 'ALDI'], 
      day: 'SENIN', date: '13-JULI', time: '17:30',
      result: '0:0'
    },
    { 
      grade: 'B', round: '8',
      teamA: ['ARIF S', 'TRI W'], 
      teamB: ['DADANG', 'KARTO'], 
      day: 'SENIN', date: '20-JULI', time: '18:00',
      result: '0:0'
    },
    { 
      grade: 'B', round: '8',
      teamA: ['ARIF ELC', 'MEGGY'], 
      teamB: ['BILLY', 'NABIL'], 
      day: 'SENIN', date: '28-JULI', time: '17:45',
      result: '0:0'
    },
    { 
      grade: 'B', round: '8',
      teamA: ['YONA', 'LULUK'], 
      teamB: ['AWAY', 'FAISAL'], 
      day: 'SENIN', date: '4-AUG', time: '18:15',
      result: '0:0'
    },

    // ===== GRADE B - SEMIFINAL =====
    { 
      grade: 'B', round: 'semifinal',
      teamA: ['PEMENANG M1', 'PEMENANG M1'], 
      teamB: ['PEMENANG M2', 'PEMENANG M2'], 
      day: 'SENIN', date: '11-AUG', time: '17:30',
      result: '0:0'
    },
    { 
      grade: 'B', round: 'semifinal',
      teamA: ['PEMENANG M3', 'PEMENANG M3'], 
      teamB: ['PEMENANG M4', 'PEMENANG M4'], 
      day: 'SENIN', date: '11-AUG', time: '18:30',
      result: '0:0'
    },

    // ===== GRADE B - FINAL =====
    { 
      grade: 'B', round: 'final',
      teamA: ['PEMENANG SF1', 'PEMENANG SF1'], 
      teamB: ['PEMENANG SF2', 'PEMENANG SF2'], 
      day: 'SENIN', date: '18-AUG', time: '19:00',
      result: '0:0'
    }
  ];

  // ==============================================================
  // STATE
  // ==============================================================
  let currentFilter = 'all';
  let currentRound = 'all';
  let countdownIntervals = {};

  // ==============================================================
  // ROUND LABELS
  // ==============================================================
  const roundLabels = {
    '16': '16 BESAR',
    '8': '8 BESAR',
    'semifinal': 'SEMIFINAL',
    'final': 'FINAL'
  };

  const roundBadgeClass = {
    '16': 'r16',
    '8': 'r8',
    'semifinal': 'sf',
    'final': 'final'
  };

  // ==============================================================
  // PARSE TANGGAL
  // ==============================================================
  function parseMatchDate(dateStr, timeStr) {
    const months = {
      'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MEI': 4, 'JUN': 5,
      'JULI': 6, 'AGU': 7, 'SEP': 8, 'OKT': 9, 'NOV': 10, 'DES': 11,
      'JUL': 6, 'AUG': 7
    };
    
    try {
      const parts = dateStr.split('-');
      const day = parseInt(parts[0]);
      const monthStr = parts[1].toUpperCase();
      const month = months[monthStr] !== undefined ? months[monthStr] : 6;
      
      const timeParts = timeStr.split(':');
      const hours = parseInt(timeParts[0]);
      const minutes = parseInt(timeParts[1]);
      
      const now = new Date();
      let year = now.getFullYear();
      let matchDate = new Date(year, month, day, hours, minutes);
      
      if (matchDate < now) {
        matchDate = new Date(year + 1, month, day, hours, minutes);
      }
      
      return matchDate;
    } catch(e) {
      return null;
    }
  }

  // ==============================================================
  // GET MATCH STATUS
  // ==============================================================
  function getMatchStatus(match) {
    if (match.result && match.result !== '0:0') {
      return 'finished';
    }
    
    const matchDate = parseMatchDate(match.date, match.time);
    if (!matchDate) return 'upcoming';
    
    const now = new Date();
    const diff = matchDate - now;
    
    if (diff < 0) {
      return 'finished';
    } else if (diff < 3600000) {
      return 'live';
    } else {
      return 'upcoming';
    }
  }

  // ==============================================================
  // RENDER BRACKET ILLUSTRATION
  // ==============================================================
  function renderBracketIllustration() {
    ['A', 'B'].forEach(grade => {
      const matches = allMatches.filter(m => m.grade === grade);
      const tree = document.getElementById(`bracketTree${grade}`);
      if (!tree) return;

      const roundOrder = ['16', '8', 'semifinal', 'final'];
      const sorted = [...matches].sort((a, b) => {
        return roundOrder.indexOf(a.round) - roundOrder.indexOf(b.round);
      });

      let html = '';
      sorted.forEach((m) => {
        const status = getMatchStatus(m);
        const roundTag = roundLabels[m.round] || m.round;
        const tagClass = m.round === 'semifinal' ? 'sf' : m.round === 'final' ? 'final' : '';
        const result = m.result && m.result !== '0:0' ? m.result : '';

        html += `
          <div class="bracket-match-row">
            <span class="round-tag ${tagClass}">${roundTag}</span>
            <div class="match-teams-mini">
              <span class="team">${m.teamA[0]}&${m.teamA[1]}</span>
              <span class="vs-mini">VS</span>
              <span class="team team-b">${m.teamB[0]}&${m.teamB[1]}</span>
            </div>
            ${result ? `<span class="match-result-mini">${result}</span>` : ''}
            <span class="match-status ${status}">${status}</span>
          </div>
        `;
      });
      tree.innerHTML = html;
    });
  }

  // ==============================================================
  // RENDER BRACKET CARDS
  // ==============================================================
  function renderBracket(filter, round) {
    let filtered = filter === 'all' 
      ? allMatches 
      : allMatches.filter(m => m.grade === filter);

    if (round !== 'all') {
      filtered = filtered.filter(m => m.round === round);
    }

    const roundOrder = ['16', '8', 'semifinal', 'final'];
    filtered.sort((a, b) => {
      return roundOrder.indexOf(a.round) - roundOrder.indexOf(b.round);
    });

    if (!filtered.length) {
      container.innerHTML = `<div class="empty-note">🏸 Tidak ada pertandingan</div>`;
      return;
    }

    let html = '';
    filtered.forEach((m) => {
      const teamA1 = m.teamA[0] || '—';
      const teamA2 = m.teamA[1] || '—';
      const teamB1 = m.teamB[0] || '—';
      const teamB2 = m.teamB[1] || '—';
      const gradeClass = m.grade === 'A' ? 'grade-a' : 'grade-b';
      const roundLabel = roundLabels[m.round] || m.round;
      const roundClass = roundBadgeClass[m.round] || '';
      const uniqueId = `match-${m.grade}-${m.round}-${Date.now()}-${Math.random().toString(36).substr(2,4)}`;

      html += `
        <div class="match-card" data-match-id="${uniqueId}" data-grade="${m.grade}" data-round="${m.round}">
          <span class="round-badge ${roundClass}">${roundLabel}</span>
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
          
          <div class="click-hint">👆 Klik untuk detail</div>
        </div>
      `;
    });

    container.innerHTML = html;

    // Attach click event
    document.querySelectorAll('.match-card').forEach(card => {
      card.addEventListener('click', function() {
        const grade = this.dataset.grade;
        const round = this.dataset.round;
        const matchData = allMatches.find(m => m.grade === grade && m.round === round);
        if (matchData) {
          openModal(matchData);
        }
      });
    });

    renderBracketIllustration();
  }

  // ==============================================================
  // COUNTDOWN REAL-TIME
  // ==============================================================
  function startRealTimeCountdown(matchDate, displayId) {
    if (countdownIntervals[displayId]) {
      clearInterval(countdownIntervals[displayId]);
      delete countdownIntervals[displayId];
    }

    const display = document.getElementById(displayId);
    if (!display) return;

    function updateCountdown() {
      const now = new Date();
      const diff = matchDate - now;

      if (diff <= 0) {
        display.textContent = '⏰ PERTANDINGAN DIMULAI!';
        display.className = 'countdown-display ended';
        if (countdownIntervals[displayId]) {
          clearInterval(countdownIntervals[displayId]);
          delete countdownIntervals[displayId];
        }
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      let text = '';
      if (days > 0) text += `${days}d `;
      if (hours > 0 || days > 0) text += `${String(hours).padStart(2, '0')}h `;
      text += `${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
      
      display.textContent = text;
      display.className = 'countdown-display';
    }

    updateCountdown();
    countdownIntervals[displayId] = setInterval(updateCountdown, 1000);
  }

  // ==============================================================
  // MODAL
  // ==============================================================
  function openModal(match) {
    const teamAStr = match.teamA.join(' & ');
    const teamBStr = match.teamB.join(' & ');
    const roundLabel = roundLabels[match.round] || match.round;

    const resultParts = match.result ? match.result.split(':') : ['0', '0'];
    const scoreA = resultParts[0] || '0';
    const scoreB = resultParts[1] || '0';

    const matchDate = parseMatchDate(match.date, match.time);
    const dateStr = matchDate ? matchDate.toLocaleString('id-ID', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) : 'Tanggal tidak valid';

    modalBody.innerHTML = `
      <div class="modal-match-title">🏸 ${roundLabel} · Grade ${match.grade}</div>
      
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

      <div class="match-meta" style="margin-bottom:0.8rem;">
        <span class="day">${match.day || 'SENIN'}</span>
        <span class="datetime">
          <span>${match.date || '—'}</span>
          <span>${match.time || '—'}</span>
        </span>
      </div>

      <!-- COUNTDOWN -->
      <div class="countdown-section">
        <div class="label">⏱️ COUNTDOWN MENUJU PERTANDINGAN</div>
        <div class="countdown-display" id="countdownModal">--</div>
        <div class="countdown-info">🗓️ ${dateStr}</div>
      </div>

      <!-- HASIL PERTANDINGAN -->
      <div class="result-section">
        <div class="label">🏆 HASIL PERTANDINGAN</div>
        <div class="result-display">
          <span class="team-a-score">${scoreA}</span>
          <span style="color:#8aa0b8; font-weight:300;"> : </span>
          <span class="team-b-score">${scoreB}</span>
        </div>
        <div class="result-edit-note">✏️ Edit di file script.js (field "result")</div>
      </div>
    `;

    // Start countdown
    if (matchDate) {
      startRealTimeCountdown(matchDate, 'countdownModal');
    } else {
      const display = document.getElementById('countdownModal');
      if (display) {
        display.textContent = '⏳ Tanggal tidak valid';
        display.className = 'countdown-display ended';
      }
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  // ==============================================================
  // MODAL CLOSE
  // ==============================================================
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    Object.keys(countdownIntervals).forEach(key => {
      clearInterval(countdownIntervals[key]);
      delete countdownIntervals[key];
    });
  }

  const modal = document.getElementById('matchModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.querySelector('.modal-close');

  modalClose.addEventListener('click', closeModal);
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // ==============================================================
  // FILTER HANDLER
  // ==============================================================
  const container = document.getElementById('bracketContainer');
  const gradeBtns = document.querySelectorAll('.grade-btn');
  const roundBtns = document.querySelectorAll('.round-btn');

  function setFilter(grade, round) {
    currentFilter = grade;
    currentRound = round || 'all';
    
    gradeBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.grade === grade) btn.classList.add('active');
    });
    
    roundBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.round === round) btn.classList.add('active');
    });
    
    renderBracket(grade, round);
  }

  gradeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      setFilter(this.dataset.grade, currentRound);
    });
  });

  roundBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      setFilter(currentFilter, this.dataset.round);
    });
  });

  // ==============================================================
  // INIT
  // ==============================================================
  renderBracket('all', 'all');

  console.log('✅ Website siap dengan semua fitur!');
  console.log('📌 Klik kartu pertandingan untuk melihat detail');
  console.log('📌 Countdown berjalan otomatis berdasarkan tanggal pertandingan');
  console.log('📌 Hasil pertandingan bisa diedit di field "result"');
})();
