function toggleSidebar() {
  const sidebar = document.getElementById('sidebarMenu');
  const content = document.getElementById('contentWrapper');
  sidebar.classList.toggle('show');
  content.classList.toggle('shift');
}

// Ambil elemen
const openModalBtn = document.getElementById('openModal');
const modal = document.getElementById('tournamentModal');
const cancelBtn = document.getElementById('cancelBtn');
const okBtn = document.getElementById('okBtn');
const formatSelect = document.getElementById('tournamentFormat');
const descriptionBox = document.getElementById('descriptionBox');
const descriptionText = document.getElementById('descriptionText');

// Deskripsi untuk setiap sistem
const descriptions = {
  gugur: "Sistem Gugur: Peserta kalah langsung keluar dari turnamen.",
  gugurGanda: "Gugur Ganda: Peserta harus kalah dua kali sebelum keluar.",
  setengah: "Setengah Kompetisi: Setiap peserta bertanding melawan setengah peserta lain.",
  penuh: "Kompetisi Penuh: Setiap peserta bertanding dengan semua peserta lain."
};

// Buka modal
openModalBtn.addEventListener('click', () => {
  modal.style.display = 'flex';
});

// Tutup modal
cancelBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  formatSelect.value = "";
  descriptionBox.style.display = 'none';
});

okBtn.addEventListener('click', () => {
  const name = document.getElementById('tournamentName').value;
  const format = formatSelect.value;

  if (!name || !format) {
    alert("Harap isi nama turnamen dan pilih sistem.");
    return;
  }

  alert(`Turnamen "${name}" dengan format "${format}" dibuat!`);
  modal.style.display = 'none';
  formatSelect.value = "";
  descriptionBox.style.display = 'none';
  document.getElementById('tournamentName').value = "";
});

// Update deskripsi saat sistem dipilih
formatSelect.addEventListener('change', () => {
  const selected = formatSelect.value;
  if (selected) {
    descriptionText.textContent = descriptions[selected];
    descriptionBox.style.display = 'block';
  } else {
    descriptionBox.style.display = 'none';
  }
});

// Tombol Oke → redirect ke folder sistem pertandingan
okBtn.addEventListener('click', () => {
  const name = document.getElementById('tournamentName').value;
  const format = formatSelect.value;

  if (!name || !format) {
    alert("Harap isi nama turnamen dan pilih sistem.");
    return;
  }

  // Optional: Simpan nama turnamen di localStorage supaya halaman sistem bisa membacanya
  localStorage.setItem('tournamentName', name);

  // Redirect berdasarkan pilihan sistem
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
});
