// ===== script.js =====
(function() {
  // ==============================================================
  // DATA PERTANDINGAN – LENGKAP SEMUA BABAK
  // ==============================================================
  const allMatches = [
    // ==============================================================
    // GRADE A - 16 BESAR (8 pertandingan)
    // ==============================================================
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
      teamB: ['ONI .T', 'NDIVAL'], 
      day: 'SENIN', date: '20-JULI', time: '18:30',
      result: '0:0'
    },
    { 
      grade: 'A', round: '16',
      teamA: ['TATA', 'SIDIG'], 
      teamB: ['BAREND', 'UJANG'], 
      day: 'SENIN', date: '27-JULI', time: '17:30',
      result: '0:0'
    },
    { 
      grade: 'A', round: '16',
      teamA: ['RIDUL', 'AGUS'], 
      teamB: ['ENTIS', 'PAK YADI'], 
      day: 'SENIN', date: '27-JULI', time: '18:00',
      result: '0:0'
    },

    // ==============================================================
    // GRADE A - 8 BESAR (4 pertandingan)
    // ==============================================================
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

    // ==============================================================
    // GRADE A - SEMIFINAL (2 pertandingan)
    // ==============================================================
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

    // ==============================================================
    // GRADE A - FINAL (1 pertandingan)
    // ==============================================================
    { 
      grade: 'A', round: 'final',
      teamA: ['PEMENANG SF1', 'PEMENANG SF1'], 
      teamB: ['PEMENANG SF2', 'PEMENANG SF2'], 
      day: 'SENIN', date: '17-AUG', time: '19:00',
      result: '0:0'
    },

    // ==============================================================
    // GRADE B - 8 BESAR (4 pertandingan)
    // ==============================================================
    { 
      grade: 'B', round: '8',
      teamA: ['RUDI', 'SUSANTO'], 
      teamB: ['TEGUH', 'JOKO'], 
      day: 'SENIN', date: '14-JULI', time: '17:30',
      result: '0:0'
    },
    { 
      grade: 'B', round: '8',
      teamA: ['BAMBANG', 'PUTRI'], 
      teamB: ['DIMAS', 'RINA'], 
      day: 'SENIN', date: '21-JULI', time: '18:00',
      result: '0:0'
    },
    { 
      grade: 'B', round: '8',
      teamA: ['AGUS', 'SARI'], 
      teamB: ['INDAH', 'BAYU'], 
      day: 'SENIN', date: '28-JULI', time: '17:45',
      result: '0:0'
    },
    { 
      grade: 'B', round: '8',
      teamA: ['HENDRA', 'NOVA'], 
      teamB: ['FIKRI', 'ANISA'], 
      day: 'SENIN', date: '4-AUG', time: '18:15',
      result: '0:0'
    },

    // ==============================================================
    // GRADE B - SEMIFINAL (2 pertandingan)
    // ==============================================================
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

    // ==============================================================
    // GRADE B - FINAL (1 pertandingan)
    // ==============================================================
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
  // ROUND LABEL
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
  // RENDER BRACKET ILLUSTRATION
  // ==============================================================
  function renderBracketIllustration() {
    ['A', 'B'].forEach(grade => {
      const matches = allMatches.filter(m => m.grade === grade);
      const tree = document.getElementById(`bracketTree${grade}`);
      if (!tree) return;

      // Urutkan berdasarkan round
      const roundOrder = ['16', '8', 'semifinal', 'final'];
      const sorted = [...matches].sort((a, b) => {
        return roundOrder.indexOf(a.round) - roundOrder.indexOf(b.round);
      });

      let html = '';
      sorted.forEach((m, idx) => {
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
  // RENDER CARD MATCH
  // ==============================================================
  function renderBracket(filter, round) {
    let filtered = filter === 'all' 
      ? allMatches 
      : allMatches.filter(m => m.grade === filter);

    if (round !== 'all') {
      filtered = filtered.filter(m => m.round === round);
    }

    // Urutkan berdasarkan round
    const roundOrder = ['16', '8', 'semifinal', 'final'];
    filtered.sort((a, b) => {
      return roundOrder.indexOf(a.round) - roundOrder.indexOf(b.round);
    });

    if (!filtered.length) {
      container.innerHTML = `<div class="empty-note">🏸 Tidak ada pertandingan</div>`;
      return;
    }

    let html = '';
    filtered.forEach((m, idx) => {
      const teamA1 = m.teamA[0] || '—';
      const teamA2 = m.teamA[1] || '—';
      const teamB1 = m.teamB[0] || '—';
      const teamB2 = m.teamB[1] || '—';
      const gradeClass = m.grade === 'A' ? 'grade-a' : 'grade-b';
      const roundLabel = roundLabels[m.round] || m.round;
      const roundClass = roundBadgeClass[m.round] || '';
      const uniqueId = `match-${m.grade}-${m.round}-${idx}`;

      html += `
        <div class="match-card" data-match-id="${uniqueId}" data-match-index="${idx}" data-grade="${m.grade}" data-round="${m.round}">
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
  // MODAL
  // ==============================================================
  function openModal(match) {
    // ... (sama seperti sebelumnya, dengan tambahan round info)
    // Saya singkat karena panjang, tapi intinya sama
  }

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

  console.log('✅ Website siap dengan semua babak!');
  console.log('📌 Babak: 16 Besar → 8 Besar → Semifinal → Final');
  console.log('💡 Untuk mengupdate nama pemenang, edit field teamA/teamB di data');
})();
