(function() {
  // Ambil elemen
  const openModalBtn = document.getElementById('openModal');
  const modal = document.getElementById('tournamentModal');
  const cancelBtn = document.getElementById('cancelBtn');
  const okBtn = document.getElementById('okBtn');
  const formatSelect = document.getElementById('tournamentFormat');
  const descriptionBox = document.getElementById('descriptionBox');
  const descriptionText = document.getElementById('descriptionText');

  const resultCard = document.getElementById('tournamentResult');
  const resultName = document.getElementById('resultName');
  const resultFormat = document.getElementById('resultFormat');

  // Deskripsi untuk setiap sistem
  const descriptions = {
    "Sistem Gugur": "Sistem Gugur: Peserta kalah langsung keluar dari turnamen.",
    "Gugur Ganda": "Gugur Ganda: Peserta harus kalah dua kali sebelum keluar.",
    "Setengah Kompetisi": "Setengah Kompetisi: Setiap peserta bertanding melawan setengah peserta lain.",
    "Kompetisi Penuh": "Kompetisi Penuh: Setiap peserta bertanding dengan semua peserta lain."
  };

  // Buka modal
  openModalBtn.addEventListener('click', function() {
    modal.style.display = 'flex';
  });

  // Tutup modal
  cancelBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    formatSelect.value = "";
    descriptionBox.style.display = 'none';
    document.getElementById('tournamentName').value = "";
  });

  // Tombol Oke → tutup modal dulu, lalu redirect
  okBtn.addEventListener('click', function() {
    const name = document.getElementById('tournamentName').value;
    const format = formatSelect.value;

    if (!name || !format) {
      alert("Harap isi nama turnamen dan pilih sistem.");
      return;
    }

    // Tampilkan sementara di bawah card
    resultName.textContent = name;
    resultFormat.textContent = format;
    resultCard.style.display = 'block';

    // Simpan nama turnamen di localStorage
    localStorage.setItem('tournamentName', name);

    // Tutup modal dan reset input
    modal.style.display = 'none';
    formatSelect.value = "";
    descriptionBox.style.display = 'none';
    document.getElementById('tournamentName').value = "";

    // Redirect dengan delay kecil agar modal hilang terlihat
    setTimeout(function() {
      let targetURL = "";
      switch(format) {
        case "Sistem Gugur":
          targetURL = "sistem/sistem_gugur.html";
          break;
        case "Gugur Ganda":
          targetURL = "sistem/sistem_gugur_ganda.html";
          break;
        case "Setengah Kompetisi":
          targetURL = "sistem/sistem_setengah_kompetisi.html";
          break;
        case "Kompetisi Penuh":
          targetURL = "sistem/sistem_kompetisi_penuh.html";
          break;
        default:
          targetURL = "#";
      }
      window.location.href = targetURL;
    }, 100); // delay 100ms
  });

  // Update deskripsi saat sistem dipilih
  formatSelect.addEventListener('change', function() {
    const selected = formatSelect.value;
    if (selected) {
      descriptionText.textContent = descriptions[selected];
      descriptionBox.style.display = 'block';
    } else {
      descriptionBox.style.display = 'none';
    }
  });

})();
