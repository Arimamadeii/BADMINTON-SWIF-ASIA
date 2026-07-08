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
      result: '0:0'
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
  let countdownIntervals = {};

  // Polling data (disimpan di localStorage)
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
  // FUNGSI PARSE TANGGAL
  // ==============================================================
  function parseMatchDate(dateStr, timeStr) {
    // Format: "13-JULI" dan "17:30"
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
      
      // Jika tanggal sudah lewat di tahun ini, tambahkan 1 tahun
      if (matchDate < now) {
        matchDate = new Date(year + 1, month, day, hours, minutes);
      }
      
      return matchDate;
    } catch(e) {
      return null;
    }
  }

  // ==============================================================
  // RENDER BRACKET ILLUSTRATION
  // ==============================================================
  function renderBracketIllustration() {
    // GRADE A
    const gradeAMatches = allMatches.filter(m => m.grade === 'A');
    const treeA = document.getElementById('bracketTreeA');
    if (treeA) {
      let html = '';
      gradeAMatches.forEach((m, idx) => {
        const status = getMatchStatus(m);
        html += `
          <div class="bracket-match-row">
            <span class="match-number">M${idx+1}</span>
            <div class="match-teams-mini">
              <span class="team">${m.teamA[0]}&${m.teamA[1]}</span>
              <span class="vs-mini">VS</span>
              <span class="team team-b">${m.teamB[0]}&${m.teamB[1]}</span>
            </div>
            <span class="match-status ${status}">${status}</span>
          </div>
        `;
      });
      treeA.innerHTML = html;
    }

    // GRADE B
    const gradeBMatches = allMatches.filter(m => m.grade === 'B');
    const treeB = document.getElementById('bracketTreeB');
    if (treeB) {
      let html = '';
      gradeBMatches.forEach((m, idx) => {
        const status = getMatchStatus(m);
        html += `
          <div class="bracket-match-row">
            <span class="match-number">M${idx+1}</span>
            <div class="match-teams-mini">
              <span class="team">${m.teamA[0]}&${m.teamA[1]}</span>
              <span class="vs-mini">VS</span>
              <span class="team team-b">${m.teamB[0]}&${m.teamB[1]}</span>
            </div>
            <span class="match-status ${status}">${status}</span>
          </div>
        `;
      });
      treeB.innerHTML = html;
    }
  }

  // ==============================================================
  // GET MATCH STATUS (untuk bracket illustration)
  // ==============================================================
  function getMatchStatus(match) {
    const matchDate = parseMatchDate(match.date, match.time);
    if (!matchDate) return 'upcoming';
    
    const now = new Date();
    const diff = matchDate - now;
    
    // Cek hasil pertandingan
    if (match.result && match.result !== '0:0') {
      return 'finished';
    }
    
    if (diff < 0) {
      return 'finished';
    } else if (diff < 3600000) { // kurang dari 1 jam
      return 'live';
    } else {
      return 'upcoming';
    }
  }

  // ==============================================================
  // RENDER CARD MATCH
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
        const matchData = allMatches.find((m, i) => i === idx && m.grade === grade);
        if (matchData) {
          openModal(matchData, idx, grade);
        }
      });
    });

    // Render bracket illustration setelah card
    renderBracketIllustration();
  }

  // ==============================================================
  // COUNTDOWN REAL-TIME
  // ==============================================================
  function startRealTimeCountdown(matchDate, displayId) {
    // Stop existing interval untuk display ini
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

    // Parse tanggal untuk countdown
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

      <!-- COUNTDOWN REAL-TIME -->
      <div class="countdown-section">
        <div class="label">⏱️ COUNTDOWN MENUJU PERTANDINGAN</div>
        <div class="countdown-display" id="countdownModal">--</div>
        <div class="countdown-info">🗓️ ${dateStr}</div>
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
        <div class="poll-note">💡 Polling tersimpan di browser Anda (localStorage)</div>
      </div>
    `;

    // Start countdown real-time
    if (matchDate) {
      startRealTimeCountdown(matchDate, 'countdownModal');
    } else {
      const display = document.getElementById('countdownModal');
      if (display) {
        display.textContent = '⏳ Tanggal tidak valid';
        display.className = 'countdown-display ended';
      }
    }

    // Tampilkan modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
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
    // Hentikan semua countdown interval
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
  // TENTANG POLLING UNTUK PENGGUNA LAIN
  // ==============================================================
  /*
    POLLING UNTUK PENGGUNA LAIN:
    
    Saat ini polling menggunakan localStorage yang hanya tersimpan di browser 
    masing-masing pengguna. Untuk bisa terintegrasi dengan pengguna lain, 
    Anda memerlukan server backend.

    CARA INTEGRASI DENGAN PENGGUNA LAIN:
    
    1. Gunakan database (misal: Firebase, Supabase, atau MySQL)
    2. Buat API endpoint untuk menyimpan dan mengambil data polling
    3. Ganti fungsi getPollData() dan savePollData() dengan panggilan API
    
    Contoh dengan Firebase (Realtime Database):
    
    // Simpan polling
    function savePollData(matchId, data) {
      firebase.database().ref('polls/' + matchId).set(data);
    }
    
    // Ambil polling
    function getPollData(matchId) {
      return firebase.database().ref('polls/' + matchId).once('value')
        .then(snapshot => snapshot.val() || { teamA: 0, teamB: 0 });
    }
    
    Dengan backend, semua pengguna akan melihat polling yang sama secara real-time!
    
    Untuk polling real-time antar pengguna, gunakan WebSocket atau Firebase 
    Realtime Database yang bisa sinkron secara otomatis.
  */
  console.log('✅ Website siap!');
  console.log('📊 Polling menggunakan localStorage (hanya untuk satu browser)');
  console.log('💡 Untuk polling multi-user, gunakan backend seperti Firebase atau Supabase');
})();
