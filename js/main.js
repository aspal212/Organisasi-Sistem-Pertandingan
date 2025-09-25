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
    "Sistem Gugur Tunggal": "Sistem Gugur Tunggal: Peserta kalah langsung keluar dari turnamen.",
    "Sistem Gugur Ganda": "Sistem Gugur Ganda: Peserta harus kalah dua kali sebelum keluar.",
    "Sistem Gugur Swiss": "Sistem Gugur Swiss: Peserta bertanding dengan lawan yang memiliki skor sama, hingga jumlah ronde tercapai.",
    "Sistem Setengah Kompetisi": "Setengah Kompetisi: Setiap peserta bertanding melawan setengah peserta lain.",
    "Sistem Kompetisi Penuh": "Kompetisi Penuh: Setiap peserta bertanding dengan semua peserta lain."
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
        case "Sistem Gugur Tunggal":
          targetURL = "sistem/sistem_gugur.html";
          break;
        case "Sistem Gugur Ganda":
          targetURL = "sistem/sistem_gugur_ganda.html";
          break;
        case "Sistem Gugur Swiss":
          targetURL = "sistem/sistem_gugur_swiss.html";
          break;
        case "Sistem Setengah Kompetisi":
          targetURL = "sistem/sistem_setengah_kompetisi.html";
          break;
        case "Sistem Kompetisi Penuh":
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

// js/main.js
document.addEventListener('DOMContentLoaded', function () {
  const openModal = document.getElementById('openModal');
  const tournamentModal = document.getElementById('tournamentModal');
  const cancelBtn = document.getElementById('cancelBtn');
  const okBtn = document.getElementById('okBtn');
  const tournamentName = document.getElementById('tournamentName');
  const tournamentFormat = document.getElementById('tournamentFormat');
  const descriptionText = document.getElementById('descriptionText');
  const descriptionBox = document.getElementById('descriptionBox');

  // Tampilkan modal
  openModal.addEventListener('click', function () {
    tournamentModal.style.display = 'block';
    descriptionText.textContent = '';
    descriptionBox.style.display = 'none';
  });

  // Tutup modal
  cancelBtn.addEventListener('click', function () {
    tournamentModal.style.display = 'none';
  });

  // Update deskripsi saat pilihan berubah
  tournamentFormat.addEventListener('change', function () {
    const val = tournamentFormat.value;
    if (!val) {
      descriptionBox.style.display = 'none';
      descriptionText.textContent = '';
      return;
    }
    descriptionBox.style.display = 'block';
    switch (val) {
      case 'Sistem Gugur Tunggal':
        descriptionText.textContent = 'Peserta yang kalah langsung gugur sampai tersisa pemenang.';
        break;
      case 'Sistem Gugur Ganda':
        descriptionText.textContent = 'Peserta mendapat kesempatan kedua sebelum benar-benar gugur.';
        break;
      case 'Sistem Gugur Swiss':
        descriptionText.textContent = 'Peserta bertanding beberapa ronde melawan lawan dengan skor serupa.';
        break;
      case 'Sistem Setengah Kompetisi':
        descriptionText.textContent = 'Peserta dibagi grup, lalu peringkat teratas melaju ke babak gugur.';
        break;
      case 'Sistem Kompetisi Penuh':
        descriptionText.textContent = 'Setiap peserta bertemu semua peserta lain; peringkat ditentukan dari total poin.';
        break;
      default:
        descriptionText.textContent = '';
    }
  });

  // Tombol OK: arahkan ke halaman sistem_setengah_kompetisi.html
  okBtn.addEventListener('click', function () {
    const name = tournamentName.value.trim();
    const format = tournamentFormat.value;

    if (!name) {
      alert('Masukkan nama turnamen terlebih dahulu.');
      return;
    }
    if (!format) {
      alert('Pilih format turnamen terlebih dahulu.');
      return;
    }

    // Jika pengguna memilih "Sistem Setengah Kompetisi" arahkan ke halaman khusus,
    // jika memilih format lain arahkan juga ke halaman yang sama tapi sertakan format.
    // Di sini diminta: "arahkan tombol Oke ke sistem_setengah_kompetisi.html".
    // Kita kirim nama dan format lewat query string.
    const params = new URLSearchParams({
      name: name,
      format: format
    });

    // Tutup modal lalu pindah halaman
    tournamentModal.style.display = 'none';
    window.location.href = 'sistem_setengah_kompetisi.html?' + params.toString();
  });

  // Tutup modal bila klik di luar konten modal
  window.addEventListener('click', function (e) {
    if (e.target === tournamentModal) {
      tournamentModal.style.display = 'none';
    }
  });

  // --- Menampilkan hasil saat kembali ke halaman utama (jika ada query) ---
  const showTournamentResultFromQuery = function () {
    const qs = new URLSearchParams(window.location.search);
    const name = qs.get('name');
    const format = qs.get('format');
    if (name && format) {
      const resultBox = document.getElementById('tournamentResult');
      const resultName = document.getElementById('resultName');
      const resultFormat = document.getElementById('resultFormat');

      resultName.textContent = name;
      resultFormat.textContent = format;
      resultBox.style.display = 'block';
    }
  };

  showTournamentResultFromQuery();
});
