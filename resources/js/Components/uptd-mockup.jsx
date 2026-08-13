import React, { useEffect, useState } from 'react';
import { router, usePage } from '@inertiajs/react';

const kabKotaOptions = [
  { value: '1', label: 'Kab. Bekasi' },
  { value: '2', label: 'Kab. Karawang' },
  { value: '3', label: 'Kab. Purwakarta' },
  { value: '4', label: 'Kab. Subang' },
  { value: '5', label: 'Kota Bekasi' },
];

const numericValue = (value) => value === '' ? '' : Number(value);

const k1JabatanOptions = ['Pertama', 'Muda', 'Madya'];
const k1NumberFields = [
  { key: 'pengawas_umum', label: 'Pengawas Umum' },
  ...Array.from({ length: 11 }, (_, index) => ({
    key: `spesialis_${index + 1}`,
    label: `Spesialis ${index + 1}`,
  })),
  { key: 'ppns', label: 'PPNS' },
];

const createK1JabatanValues = () => k1NumberFields.reduce((values, field) => ({
  ...values,
  [field.key]: 0,
}), {});

const createK1JabatanData = () => k1JabatanOptions.reduce((values, jabatan) => ({
  ...values,
  [jabatan]: createK1JabatanValues(),
}), {});

const kbliOptions = [
  { kode: 'A', keterangan: 'Mesin dan Tanur (mesin pons, mesin pres, gergaji, mesin bor, mesin tenun, dll)' },
  { kode: 'B', keterangan: 'Penggerak mula dan pompa (motor bakar, pompa angin/ kompresor, pompa air, kipas angin, dll)' },
  { kode: 'C', keterangan: 'Lift' },
  { kode: 'D', keterangan: 'Pesawat Angkat' },
  { kode: 'E', keterangan: 'Conveyor' },
  { kode: 'F', keterangan: 'Pesawat Angkut' },
  { kode: 'G', keterangan: 'Alat Transmisi mekanik (rantai, pulley dll)' },
  { kode: 'H', keterangan: 'Perkakas kerja tangan' },
  { kode: 'I', keterangan: 'Pesawat Uap dan bejana tekan' },
  { kode: 'J', keterangan: 'Listrik dan Petir' },
  { kode: 'K', keterangan: 'Bahan Kimia' },
  { kode: 'L', keterangan: 'Debu Berbahaya' },
  { kode: 'M', keterangan: 'Cahaya Radiasi dan bahan radio aktif' },
  { kode: 'N', keterangan: 'Iklim Kerja (temperatur dan kelembaban udara dll)' },
  { kode: 'O', keterangan: 'Bahan mudah terbakar dan benda panas (lak. Film, minyak, kertas, kapuk, uap dll)' },
  { kode: 'P', keterangan: 'Binatang' },
  { kode: 'Q', keterangan: 'Permukaan Lantai kerja' },
  { kode: 'R', keterangan: 'Kecelakaan Lalu lintas dalam hubungan kerja' },
  { kode: 'S', keterangan: 'Getaran dan Bising' },
  { kode: 'T', keterangan: 'Tekanan Udara' },
  { kode: 'U', keterangan: 'Lain-lain' },
];

const k6MenuIds = ['K6', '6A', '6B', '6C', '6D'];
const k6JenisKegiatanMap = {
  K6: '6A - Kelembagaan',
  '6A': '6A - Kelembagaan',
  '6B': '6B - Personil K3',
  '6C': '6C - Penghargaan',
  '6D': '6D - Kasus Kecelakaan',
};

const createK6KbliData = () => kbliOptions.reduce((values, item) => ({
  ...values,
  [item.kode]: 0,
}), {});

const App = () => {
  const { auth } = usePage().props;
  const user = auth?.user ?? {
    name: 'Admin Pengawas',
    email: 'admin@uptd.local',
  };
  const userInitial = (user.name || 'A').trim().charAt(0).toUpperCase();

  // State untuk navigasi sidebar
  const [activeMenu, setActiveMenu] = useState('K1');
  const [lastReportMenu, setLastReportMenu] = useState('K1');
  const [expandedMenus, setExpandedMenus] = useState({
    K6: false,
    K8: false,
    K9: false,
  });

  // State untuk tab konten di K2 (Lihat Data vs Input Data)
  const [activeTab, setActiveTab] = useState('lihat');

  // State untuk baris tabel yang di-expand (dilebarkan)
  const [expandedRow, setExpandedRow] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(() => localStorage.getItem('profile_photo') || '');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });
  const [passwordError, setPasswordError] = useState('');

  const [dataK1, setDataK1] = useState([]);
  const [dataK2, setDataK2] = useState([]);
  const [dataK3, setDataK3] = useState([]);
  const [dataK4, setDataK4] = useState([]);
  const [dataK5, setDataK5] = useState([]);
  const [dataK6, setDataK6] = useState([]);
  const [dataK7, setDataK7] = useState([]);
  const [dataK8A, setDataK8A] = useState([]);
  const [dataK8B, setDataK8B] = useState([]);
  const [dataK8C, setDataK8C] = useState([]);
  const [dataK9A, setDataK9A] = useState([]);
  const [dataK9B, setDataK9B] = useState([]);
  const [dataK10, setDataK10] = useState([]);

  const [formDataK1, setFormDataK1] = useState({
    bulan: 'Agustus',
    tahun: 2026,
    jabatan: createK1JabatanData(),
  });

  const [formDataK3, setFormDataK3] = useState({
    bulan: 'Agustus',
    tahun: 2026,
    id_kota: '',
    pesawat_uap: 0,
    bejana_tekan: 0,
    pesawat_angkat: 0,
    pesawat_tenaga: 0,
    listrik: 0,
    eskalator: 0,
    cegah_kebakaran: 0,
    kesehatan_kerja: 0,
    konstruksi: 0,
    lingkungan_kerja: 0,
    bahan_kimia: 0,
    ruang_terbatas: 0,
    sarana_k3: 0,
    personil_k3: 0,
    p2k3: 0,
    perancah: 0,
  });

  const [formDataK4, setFormDataK4] = useState({
    bulan: 'Agustus',
    tahun: 2026,
    id_kota: '',
    jml_perusahaan_bpjs: 0,
    tk_wni_bpjs: 0,
    tk_wna_bpjs: 0,
    prog_jkn: 0,
    prog_jkk_jkm: 0,
    prog_jht: 0,
    prog_jp: 0,
    prog_jkp: 0,
  });

  const [formDataK5, setFormDataK5] = useState({
    bulan: 'Agustus',
    tahun: 2026,
    jabatan_pengawas: 'Pertama',
    jml_pengawas: 0,
    keg_pertama: 0,
    keg_berkala: 0,
    keg_ulang: 0,
    keg_khusus: 0,
    uji_norma_kerja: 0,
    uji_norma_k3: 0,
    hukum_nota_1: 0,
    hukum_nota_2: 0,
    hukum_lk: 0,
  });

  const [formDataK6, setFormDataK6] = useState({
    bulan: 'Agustus',
    tahun: 2026,
    id_kota: '',
    jml_pelaksanaan_global: 0,
    keterangan_global: '',
    data_kbli: createK6KbliData(),
  });

  const [formDataK7, setFormDataK7] = useState({
    bulan: 'Agustus',
    tahun: 2026,
    id_kota: '',
    pesawat_uap: 0,
    bejana_tekan: 0,
    paa: 0,
    ptp: 0,
    listrik: 0,
    elevator: 0,
    petir: 0,
    kebakaran: 0,
    konstruksi: 0,
    klinik: 0,
    lingkungan: 0,
    kimia: 0,
    makan: 0,
    p2k3: 0,
  });

  const [formDataK8A, setFormDataK8A] = useState({
    bulan: 'Agustus',
    tahun: 2026,
    id_kota: '',
    jml_kasus: 0,
    keracunan: 0,
    meninggal: 0,
    dugaan_pak: 0,
    pak: 0,
    korban_total: 0,
    tipe_a: 0,
    tipe_b: 0,
    tipe_c: 0,
    tipe_d: 0,
    tipe_e: 0,
    tipe_f: 0,
    tipe_g: 0,
    tipe_h: 0,
    tipe_i: 0,
    tipe_j: 0,
    tipe_k: 0,
  });

  const [formDataK8B, setFormDataK8B] = useState({
    bulan: 'Agustus',
    tahun: 2026,
    id_kota: '',
    sumber_a: 0,
    sumber_b: 0,
    sumber_c: 0,
    sumber_d: 0,
    sumber_e: 0,
    sumber_f: 0,
    sumber_g: 0,
    sumber_h: 0,
    sumber_i: 0,
    sumber_j: 0,
    sumber_k: 0,
    sumber_l: 0,
    sumber_m: 0,
    sumber_n: 0,
    sumber_o: 0,
    sumber_p: 0,
    sumber_q: 0,
    sumber_r: 0,
    sumber_s: 0,
    sumber_t: 0,
    sumber_u: 0,
  });

  const [formDataK8C, setFormDataK8C] = useState({
    bulan: 'Agustus',
    tahun: 2026,
    id_kota: '',
    akibat_sembuh: 0,
    akibat_stmb: 0,
    akibat_cacat: 0,
    akibat_meninggal: 0,
    santunan_berkala: 0,
    santunan_sekaligus: 0,
    santunan_pendidikan: 0,
    santunan_kembali_kerja: 0,
    kerugian_ekonomi: 0,
    jam_kerja_hilang: 0,
  });

  const [formDataK9A, setFormDataK9A] = useState({
    bulan: 'Agustus',
    tahun: 2026,
    id_kota: '',
    jml_perusahaan_melanggar: 0,
    jml_di_nota: 0,
    pelanggaran_wlkp: 0,
    pelanggaran_wkwi: 0,
    penggunaan_tka: 0,
    pmi: 0,
    upah_minimum: 0,
    upah_tidak_dibayar: 0,
    upah_lembur: 0,
    kompensasi_pkwt: 0,
    pesangon: 0,
    thr: 0,
    pekerja_anak: 0,
    cuti_tahunan: 0,
    cuti_haid: 0,
    pp_kb: 0,
    pwbd_bpjs_kes: 0,
    pwbd_bpjs_tk: 0,
    pds_tk: 0,
    pds_upah: 0,
    pds_prog: 0,
    prshn_mnggk: 0,
    lain_lain: 0,
  });

  const [formDataK9B, setFormDataK9B] = useState({
    bulan: 'Agustus',
    tahun: 2026,
    id_kota: '',
    pelanggaran_p2k3: 0,
    ahli_k3: 0,
    personil_k3_lainnya: 0,
    pjk3: 0,
    unit_p3k: 0,
    sarana_makan: 0,
    pengendalian_b3: 0,
    dokter_perusahaan: 0,
    paramedis_perusahaan: 0,
    dokter_pktk: 0,
    riksa_awal: 0,
    riksa_berkala: 0,
    riksa_khusus: 0,
    lainnya: 0,
  });

  const [formDataK10, setFormDataK10] = useState({
    bulan: 'Agustus',
    tahun: 2026,
    id_kota: '',
    no_laporan: '',
    dugaan_pelanggaran: '',
    no_spt: '',
    status_selesai: 'P21',
    proses: '',
    putusan_denda: 0,
    putusan_kurungan: '',
  });

  const [formData, setFormData] = useState({
    bulan: 'Agustus',
    tahun: 2026,
    id_kota: '',
    jml_perusahaan: 0,
    tk_wni_l: 0,
    tk_wni_p: 0,
    tk_wna_l: 0,
    tk_wna_p: 0,
    kat_mikro: 0,
    kat_kecil: 0,
    kat_menengah: 0,
    kat_besar: 0,
    stat_swasta: 0,
    stat_persero: 0,
    stat_perum: 0,
    stat_bumd: 0,
    stat_yayasan: 0,
    stat_koperasi: 0,
    stat_perseorangan: 0,
    stat_joint: 0,
    hi_pp: 0,
    hi_pkb: 0,
    hi_sp_sb: 0,
    hi_tripartit: 0,
    penghargaan_k3: '',
  });

  const fetchK1 = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/k1-pengawas');
      const result = await response.json();

      if (result && result.data) {
        setDataK1(result.data);
      }
    } catch (error) {
      console.error('Gagal mengambil data K1:', error);
    }
  };

  const fetchK2 = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/k2-objek-pengawasan');
      const result = await response.json();

      if (result && result.data) {
        setDataK2(result.data);
      }
    } catch (error) {
      console.error('Gagal mengambil data K2:', error);
    }
  };

  const fetchK3 = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/k3-objek-k3');
      const result = await response.json();

      if (result && result.data) {
        setDataK3(result.data);
      }
    } catch (error) {
      console.error('Gagal mengambil data K3:', error);
    }
  };

  const fetchK4 = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/k4-jamsostek');
      const result = await response.json();

      if (result && result.data) {
        setDataK4(result.data);
      }
    } catch (error) {
      console.error('Gagal mengambil data K4:', error);
    }
  };

  const fetchK5 = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/k5-pemeriksaan');
      const result = await response.json();

      if (result && result.data) {
        setDataK5(result.data);
      }
    } catch (error) {
      console.error('Gagal mengambil data K5:', error);
    }
  };

  const fetchK6 = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/k6-kegiatan-kbli');
      const result = await response.json();

      if (result && result.data) {
        setDataK6(result.data);
      }
    } catch (error) {
      console.error('Gagal mengambil data K6:', error);
    }
  };

  const fetchK7 = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/k7-perizinan');
      const result = await response.json();

      if (result && result.data) {
        setDataK7(result.data);
      }
    } catch (error) {
      console.error('Gagal mengambil data K7:', error);
    }
  };

  const fetchK8A = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/k8a-kasus-kecelakaan');
      const result = await response.json();

      if (result && result.data) {
        setDataK8A(result.data);
      }
    } catch (error) {
      console.error('Gagal mengambil data K8A:', error);
    }
  };

  const fetchK8B = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/k8b-sumber-bahaya');
      const result = await response.json();

      if (result && result.data) {
        setDataK8B(result.data);
      }
    } catch (error) {
      console.error('Gagal mengambil data K8B:', error);
    }
  };

  const fetchK8C = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/k8c-akibat-santunan');
      const result = await response.json();

      if (result && result.data) {
        setDataK8C(result.data);
      }
    } catch (error) {
      console.error('Gagal mengambil data K8C:', error);
    }
  };

  const fetchK9A = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/k9a-pelanggaran-kerja');
      const result = await response.json();

      if (result && result.data) {
        setDataK9A(result.data);
      }
    } catch (error) {
      console.error('Gagal mengambil data K9A:', error);
    }
  };

  const fetchK9B = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/k9b-pelanggaran-k3');
      const result = await response.json();

      if (result && result.data) {
        setDataK9B(result.data);
      }
    } catch (error) {
      console.error('Gagal mengambil data K9B:', error);
    }
  };

  const fetchK10 = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/k10-penyidikan');
      const result = await response.json();

      if (result && result.data) {
        setDataK10(result.data);
      }
    } catch (error) {
      console.error('Gagal mengambil data K10:', error);
    }
  };

  useEffect(() => {
    fetchK1();
    fetchK2();
    fetchK3();
    fetchK4();
    fetchK5();
    fetchK6();
    fetchK7();
    fetchK8A();
    fetchK8B();
    fetchK8C();
    fetchK9A();
    fetchK9B();
    fetchK10();
  }, []);

  const mockDataK1 = [
    {
      id: 1, bulan: 'Agustus', tahun: 2026, jabatan: 'Pengawas Ahli Madya', 
      pengawasUmum: 15, ppns: 5,
      spesialis: {
        s1: 2, s2: 1, s3: 3, s4: 2, s5: 1, s6: 2, s7: 1, s8: 2, s9: 1, s10: 1, s11: 0
      }
    }
  ];

  const toggleRow = (id) => {
    if (expandedRow === id) {
      setExpandedRow(null); // Tutup jika di-klik lagi
    } else {
      setExpandedRow(id); // Buka detail baris
    }
  };

  const toggleSubMenu = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const menuItems = [
    { id: 'K1', short: 'K1', label: 'Pengawas & Ketenagakerjaan', icon: 'M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.964 0a9 9 0 10-11.964 0m11.964 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z' },
    { id: 'K2', short: 'K2', label: 'Profil Perusahaan & TK', icon: 'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21' },
    { id: 'K3', short: 'K3', label: 'Wajib Lapor Ketenagakerjaan', icon: 'M9 12h6m-6 3h6m-7.5 6.75h9A2.25 2.25 0 0018.75 19.5V6.31a2.25 2.25 0 00-.659-1.591L14.29 1.09A2.25 2.25 0 0012.7.75H7.5A2.25 2.25 0 005.25 3v16.5A2.25 2.25 0 007.5 21z' },
    { id: 'K4', short: 'K4', label: 'Jaminan Sosial (BPJS)', icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z' },
    { id: 'K5', short: 'K5', label: 'Penggunaan TKA', icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M11.5 3a17 17 0 000 18M12.5 3a17 17 0 010 18' },
    { id: 'K6', short: 'K6', label: 'Norma K3', subMenus: [
      { id: '6A', label: '6A - Kelembagaan' },
      { id: '6B', label: '6B - Personil K3' },
      { id: '6C', label: '6C - Penghargaan' },
      { id: '6D', label: '6D - Kasus Kecelakaan' }
    ], icon: 'M12 9v3.75m0 3.75h.008v.008H12v-.008zM10.29 3.86L1.82 18a1.5 1.5 0 001.3 2.25h17.76a1.5 1.5 0 001.3-2.25L13.71 3.86a1.5 1.5 0 00-2.42 0z' },
    { id: 'K7', short: 'K7', label: 'Pes. Uap & Bejana Tekan', icon: 'M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-2.386l1.591-1.591M3 12h2.25m.386-6.364L7.227 7.227M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z' },
    { id: 'K8', short: 'K8', label: 'Mekanik & Listrik', subMenus: [
      { id: '8A', label: '8A - Pes. Tenaga Produksi' },
      { id: '8B', label: '8B - Pes. Angkat Angkut' },
      { id: '8C', label: '8C - Instalasi Listrik' }
    ], icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z' },
    { id: 'K9', short: 'K9', label: 'Kesehatan Kerja', subMenus: [
      { id: '9A', label: '9A - Fasilitas Yankes' },
      { id: '9B', label: '9B - Lingkungan Kerja' }
    ], icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' },
    { id: 'K10', short: 'K10', label: 'Nota Pemeriksaan', icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  const getActiveTitle = () => {
    if (activeMenu === 'PROFILE') return 'Profil Saya';

    for (const menu of menuItems) {
      if (menu.id === activeMenu) return menu.label;
      if (menu.subMenus) {
        const sub = menu.subMenus.find(s => s.id === activeMenu);
        if (sub) return `${menu.id} / ${sub.label}`;
      }
    }
    return `Halaman ${activeMenu}`;
  };

  const getKotaName = (item) => {
    if (item?.kota?.nama_kota) return item.kota.nama_kota;
    if (item?.master_kab_kota?.nama_kota) return item.master_kab_kota.nama_kota;
    return item?.id_kota ?? '-';
  };

  const goToMenu = (menuId) => {
    setActiveMenu(menuId);
    setLastReportMenu(menuId);
  };

  const openProfile = () => {
    if (activeMenu !== 'PROFILE') {
      setLastReportMenu(activeMenu);
    }
    setActiveMenu('PROFILE');
    setShowPasswordForm(false);
    setPasswordError('');
  };

  const backToLastMenu = () => {
    setActiveMenu(lastReportMenu || 'K1');
    setShowPasswordForm(false);
    setPasswordError('');
  };

  const handleProfilePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const photo = String(reader.result || '');
      setProfilePhoto(photo);
      localStorage.setItem('profile_photo', photo);
    };
    reader.readAsDataURL(file);
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPasswordError('');
  };

  const submitPasswordChange = (event) => {
    event.preventDefault();

    if (passwordForm.password !== passwordForm.password_confirmation) {
      setPasswordError('Password baru dan konfirmasi password harus sama.');
      return;
    }

    router.put('/password', passwordForm, {
      preserveScroll: true,
      onSuccess: () => {
        setPasswordForm({
          current_password: '',
          password: '',
          password_confirmation: '',
        });
        setPasswordError('');
        setShowPasswordForm(false);
        alert('Password berhasil diubah.');
      },
      onError: () => {
        setPasswordError('Password gagal diubah. Periksa password lama dan isian baru.');
      },
    });
  };

  const handleLogout = () => {
    if (!window.confirm('Yakin ingin logout dari aplikasi?')) return;

    localStorage.removeItem('token');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('profile_photo');
    sessionStorage.clear();

    router.post('/logout', {}, {
      onFinish: () => {
        window.location.href = '/login';
      },
    });
  };

  const renderKabKotaOptions = () => (
    <>
      <option value="">Pilih Kabupaten/Kota</option>
      {kabKotaOptions.map((kota) => (
        <option key={kota.value} value={kota.value}>{kota.label}</option>
      ))}
    </>
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'tahun' || name === 'id_kota' || name === 'jml_perusahaan' || name === 'tk_wni_l' || name === 'tk_wni_p' || name === 'tk_wna_l' || name === 'tk_wna_p' || name === 'kat_mikro' || name === 'kat_kecil' || name === 'kat_menengah' || name === 'kat_besar' || name === 'stat_swasta' || name === 'stat_persero' || name === 'stat_perum' || name === 'stat_bumd' || name === 'stat_yayasan' || name === 'stat_koperasi' || name === 'stat_perseorangan' || name === 'stat_joint' || name === 'hi_pp' || name === 'hi_pkb' || name === 'hi_sp_sb' || name === 'hi_tripartit'
        ? numericValue(value)
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/k2-objek-pengawasan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        alert('Gagal menyimpan data K2');
        console.error(result);
        return;
      }

      alert('Data K2 berhasil disimpan');
      setActiveTab('lihat');
      fetchK2();
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan pada request POST K2');
    }
  };

  const isParentActive = (menu) => menu.id === activeMenu || (menu.subMenus && menu.subMenus.some((s) => s.id === activeMenu));

  const renderSidebar = () => (
    <aside className="w-72 bg-gradient-to-b from-slate-900 to-slate-950 text-white flex flex-col h-screen fixed border-r border-white/5">
      {/* Brand */}
      <div className="px-5 py-5 flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-lg shadow-sky-500/20 shrink-0">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008v.008H12v-.008zM10.29 3.86L1.82 18a1.5 1.5 0 001.3 2.25h17.76a1.5 1.5 0 001.3-2.25L13.71 3.86a1.5 1.5 0 00-2.42 0z" />
          </svg>
        </div>
        <div className="min-w-0">
          <h1 className="text-base font-bold tracking-tight leading-tight truncate">
            Sistem <span className="text-sky-400">UPTD</span>
          </h1>
          <p className="text-[11px] text-slate-400 leading-tight truncate">Dinas Ketenagakerjaan</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
        <p className="px-3 mb-2 text-[10px] font-semibold tracking-widest text-slate-500 uppercase">Menu Laporan</p>
        <ul className="space-y-0.5">
          {menuItems.map((menu) => (
            <li key={menu.id}>
              {menu.subMenus ? (
                // Menu with sub-menus (Dropdown)
                <div>
                  <button
                    onClick={() => toggleSubMenu(menu.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group ${
                      isParentActive(menu)
                        ? 'bg-white/10 text-white'
                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
                    }`}
                  >
                    <svg className={`w-[18px] h-[18px] shrink-0 transition-colors ${isParentActive(menu) ? 'text-sky-400' : 'text-slate-500 group-hover:text-slate-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d={menu.icon} />
                    </svg>
                    <span className="flex-1 text-left font-medium truncate">{menu.short} <span className="font-normal text-[13px] opacity-90">- {menu.label}</span></span>
                    <svg
                      className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${expandedMenus[menu.id] ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`grid transition-all duration-200 ease-in-out ${expandedMenus[menu.id] ? 'grid-rows-[1fr] opacity-100 mt-0.5' : 'grid-rows-[0fr] opacity-0'}`}>
                    <ul className="overflow-hidden ml-[27px] space-y-0.5 border-l border-white/10 pl-3">
                      {menu.subMenus.map((subMenu) => (
                        <li key={subMenu.id}>
                          <button
                            onClick={() => goToMenu(subMenu.id)}
                            className={`w-full text-left px-3 py-2 text-[13px] rounded-lg transition-all duration-150 ${
                              activeMenu === subMenu.id
                                ? 'bg-sky-500 text-white font-semibold shadow-sm'
                                : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
                            }`}
                          >
                            {subMenu.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                // Regular menu item
                <button
                  onClick={() => goToMenu(menu.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group ${
                    activeMenu === menu.id
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold shadow-md shadow-sky-500/25'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
                  }`}
                >
                  <svg className={`w-[18px] h-[18px] shrink-0 ${activeMenu === menu.id ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                    <path strokeLinecap="round" strokeLinejoin="round" d={menu.icon} />
                  </svg>
                  <span className="truncate">{menu.short} <span className={`font-normal text-[13px] ${activeMenu === menu.id ? 'opacity-90 text-white' : 'opacity-90'}`}>- {menu.label}</span></span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/10 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-[11px] text-slate-500 leading-tight">&copy; 2026 Admin UPTD<br />Semua hak dilindungi</p>
      </div>
    </aside>
  );

  const renderProfilePage = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/60">
          <h3 className="text-lg font-bold text-slate-800">Profil Saya</h3>
          <p className="text-sm text-slate-500 mt-1">Kelola informasi akun dan keamanan login Anda.</p>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-sky-500 to-blue-700 text-white flex items-center justify-center overflow-hidden text-5xl font-bold shadow-lg shadow-sky-500/20 ring-4 ring-sky-50">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Foto profil" className="w-full h-full object-cover" />
              ) : (
                userInitial
              )}
            </div>

            <label className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-[0.98]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16 7l-4-4m0 0L8 7m4-4v14" />
              </svg>
              Ubah Foto
              <input type="file" accept="image/*" onChange={handleProfilePhotoChange} className="hidden" />
            </label>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Nama</label>
                <div className="w-full border border-slate-200 bg-slate-50 text-slate-800 rounded-lg px-4 py-3 text-sm font-semibold">
                  {user.name || 'Admin Pengawas'}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Email</label>
                <div className="w-full border border-slate-200 bg-slate-50 text-slate-800 rounded-lg px-4 py-3 text-sm">
                  {user.email || 'admin@uptd.local'}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setShowPasswordForm((prev) => !prev)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 text-white text-sm font-semibold rounded-lg hover:bg-slate-900 transition-all shadow-sm active:scale-[0.98]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 00-9 0v3.75m-.75 10.5h10.5A2.25 2.25 0 0019.5 18.75v-6A2.25 2.25 0 0017.25 10.5H6.75A2.25 2.25 0 004.5 12.75v6A2.25 2.25 0 006.75 21z" />
                </svg>
                Ubah Password
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-all shadow-sm active:scale-[0.98]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPasswordForm && (
        <form onSubmit={submitPasswordChange} className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/60">
            <h3 className="font-semibold text-slate-800">Ubah Password</h3>
            <p className="text-xs text-slate-500 mt-1">Masukkan password lama dan password baru untuk memperbarui akses akun.</p>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Password Lama</label>
              <input
                type="password"
                name="current_password"
                value={passwordForm.current_password}
                onChange={handlePasswordChange}
                required
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Password Baru</label>
              <input
                type="password"
                name="password"
                value={passwordForm.password}
                onChange={handlePasswordChange}
                required
                minLength="8"
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Konfirmasi Password</label>
              <input
                type="password"
                name="password_confirmation"
                value={passwordForm.password_confirmation}
                onChange={handlePasswordChange}
                required
                minLength="8"
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm"
              />
            </div>
          </div>

          {passwordError && (
            <div className="mx-6 mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {passwordError}
            </div>
          )}

          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setShowPasswordForm(false);
                setPasswordError('');
              }}
              className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 transition-all shadow-sm"
            >
              Simpan Password
            </button>
          </div>
        </form>
      )}
    </div>
  );

  const renderViewData = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-slate-800">Tabel Rekapitulasi Data K2</h3>
          <p className="text-xs text-slate-500 mt-1">Klik "Lihat Detail" untuk melihat rincian data per Kabupaten/Kota</p>
        </div>
        <button className="px-4 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md flex items-center gap-2 active:scale-[0.98]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Export Excel
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[11px] text-slate-500 uppercase tracking-wide bg-slate-50 border-b-2 border-slate-100 font-semibold">
            <tr>
              <th className="px-5 py-4">Bulan</th>
              <th className="px-5 py-4">Tahun</th>
              <th className="px-5 py-4">Kabupaten/Kota</th>
              <th className="px-5 py-4 text-center">Jml Perusahaan</th>
              <th className="px-5 py-4 text-center">Total Tenaga Kerja</th>
              <th className="px-5 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataK2.map((item) => {
              const totalTK = Number(item.tk_wni_l ?? 0) + Number(item.tk_wni_p ?? 0) + Number(item.tk_wna_l ?? 0) + Number(item.tk_wna_p ?? 0);
              const isExpanded = expandedRow === item.id;

              return (
                <React.Fragment key={item.id}>
                  <tr className={`border-b transition-colors ${isExpanded ? 'bg-sky-50/40' : 'bg-white hover:bg-slate-50'}`}>
                    <td className="px-5 py-3">{item.bulan}</td>
                    <td className="px-5 py-3">{item.tahun}</td>
                    <td className="px-5 py-3 font-medium text-slate-800">{getKotaName(item)}</td>
                    <td className="px-5 py-3 text-center font-semibold text-sky-600">{Number(item.jml_perusahaan ?? 0).toLocaleString()}</td>
                    <td className="px-5 py-3 text-center text-slate-700">{totalTK.toLocaleString()}</td>
                    <td className="px-5 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => toggleRow(item.id)}
                          className={`text-xs font-medium flex items-center justify-center gap-1 px-3 py-1.5 rounded transition ${isExpanded ? 'bg-sky-600 text-white' : 'bg-slate-100 text-sky-600 hover:bg-sky-50'}`}
                          title={isExpanded ? 'Tutup Detail' : 'Lihat Detail'}
                        >
                          {isExpanded ? 'Tutup' : 'Detail'}
                          <svg className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <button className="p-1.5 bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition shadow-sm" title="Edit Data">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </button>
                        <button className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition shadow-sm" title="Hapus Data">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </div>
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr>
                      <td colSpan="6" className="p-0 border-b border-slate-300">
                        <div className="bg-slate-100 p-6 shadow-inner">
                          <h4 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-300">Rincian Data: {getKotaName(item)} ({item.bulan} {item.tahun})</h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-white p-4 rounded-md shadow-sm border border-slate-200">
                              <h5 className="text-xs font-bold text-sky-600 uppercase mb-3 flex items-center gap-2"><div className="w-2 h-2 bg-sky-600 rounded-full"></div> Tenaga Kerja</h5>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between items-center"><span className="text-slate-500">WNI (Laki-laki)</span> <span className="font-medium">{Number(item.tk_wni_l ?? 0).toLocaleString()}</span></div>
                                <div className="flex justify-between items-center"><span className="text-slate-500">WNI (Perempuan)</span> <span className="font-medium">{Number(item.tk_wni_p ?? 0).toLocaleString()}</span></div>
                                <div className="border-t border-dashed border-slate-200 my-1"></div>
                                <div className="flex justify-between items-center"><span className="text-slate-500">WNA (Laki-laki)</span> <span className="font-medium">{Number(item.tk_wna_l ?? 0).toLocaleString()}</span></div>
                                <div className="flex justify-between items-center"><span className="text-slate-500">WNA (Perempuan)</span> <span className="font-medium">{Number(item.tk_wna_p ?? 0).toLocaleString()}</span></div>
                              </div>
                            </div>

                            <div className="bg-white p-4 rounded-md shadow-sm border border-slate-200">
                              <h5 className="text-xs font-bold text-yellow-600 uppercase mb-3 flex items-center gap-2"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div> Kategori Perusahaan</h5>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between items-center"><span className="text-slate-500">Mikro</span> <span className="font-medium">{Number(item.kat_mikro ?? 0).toLocaleString()}</span></div>
                                <div className="flex justify-between items-center"><span className="text-slate-500">Kecil</span> <span className="font-medium">{Number(item.kat_kecil ?? 0).toLocaleString()}</span></div>
                                <div className="flex justify-between items-center"><span className="text-slate-500">Menengah</span> <span className="font-medium">{Number(item.kat_menengah ?? 0).toLocaleString()}</span></div>
                                <div className="flex justify-between items-center"><span className="text-slate-500">Besar</span> <span className="font-medium">{Number(item.kat_besar ?? 0).toLocaleString()}</span></div>
                              </div>
                            </div>

                            <div className="bg-white p-4 rounded-md shadow-sm border border-slate-200">
                              <h5 className="text-xs font-bold text-green-600 uppercase mb-3 flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Status Perusahaan</h5>
                              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                                <div className="flex justify-between"><span className="text-slate-500">Swasta:</span> <span className="font-medium">{item.stat_swasta ?? 0}</span></div>
                                <div className="flex justify-between"><span className="text-slate-500">Yayasan:</span> <span className="font-medium">{item.stat_yayasan ?? 0}</span></div>
                                <div className="flex justify-between"><span className="text-slate-500">Persero:</span> <span className="font-medium">{item.stat_persero ?? 0}</span></div>
                                <div className="flex justify-between"><span className="text-slate-500">Koperasi:</span> <span className="font-medium">{item.stat_koperasi ?? 0}</span></div>
                                <div className="flex justify-between"><span className="text-slate-500">Perum:</span> <span className="font-medium">{item.stat_perum ?? 0}</span></div>
                                <div className="flex justify-between"><span className="text-slate-500">Persgn:</span> <span className="font-medium">{item.stat_perseorangan ?? 0}</span></div>
                                <div className="flex justify-between"><span className="text-slate-500">BUMD:</span> <span className="font-medium">{item.stat_bumd ?? 0}</span></div>
                                <div className="flex justify-between"><span className="text-slate-500">Joint:</span> <span className="font-medium">{item.stat_joint ?? 0}</span></div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="bg-white p-4 rounded-md shadow-sm border border-slate-200">
                                <h5 className="text-xs font-bold text-purple-600 uppercase mb-3 flex items-center gap-2"><div className="w-2 h-2 bg-purple-500 rounded-full"></div> Hubungan Industrial</h5>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                                  <div className="flex justify-between"><span className="text-slate-500">PP:</span> <span className="font-medium">{Number(item.hi_pp ?? 0).toLocaleString()}</span></div>
                                  <div className="flex justify-between"><span className="text-slate-500">SP/B:</span> <span className="font-medium">{Number(item.hi_sp_sb ?? 0).toLocaleString()}</span></div>
                                  <div className="flex justify-between"><span className="text-slate-500">PKB:</span> <span className="font-medium">{Number(item.hi_pkb ?? 0).toLocaleString()}</span></div>
                                  <div className="flex justify-between"><span className="text-slate-500">Tripartit:</span> <span className="font-medium">{Number(item.hi_tripartit ?? 0).toLocaleString()}</span></div>
                                </div>
                              </div>
                              <div className="bg-orange-50 p-3 rounded-md border border-orange-100">
                                <h5 className="text-[10px] font-bold text-orange-600 uppercase mb-1">Penghargaan K3</h5>
                                <p className="text-xs text-slate-700">{item.penghargaan_k3 ?? ''}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderInputForm = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60">
        <h3 className="font-semibold text-slate-800">Form Input Data K2 Baru</h3>
        <p className="text-xs text-slate-500 mt-1">Pastikan data yang diinput sesuai dengan format berkas laporan / excel uptd.xlsx</p>
      </div>
      
      <form className="p-6 space-y-8" onSubmit={handleSubmit}>
        <section>
          <h4 className="text-sm font-bold text-sky-700 mb-4 pb-2 border-b-2 border-sky-100 uppercase tracking-wide">1. Informasi Umum</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Bulan</label>
              <select name="bulan" value={formData.bulan} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-sky-500">
                <option value="Januari">Januari</option><option value="Februari">Februari</option><option value="Maret">Maret</option>
                <option value="April">April</option><option value="Mei">Mei</option><option value="Juni">Juni</option>
                <option value="Juli">Juli</option><option value="Agustus">Agustus</option><option value="September">September</option>
                <option value="Oktober">Oktober</option><option value="November">November</option><option value="Desember">Desember</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Tahun</label>
              <input name="tahun" type="number" value={formData.tahun} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-sky-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Kabupaten/Kota</label>
              <select name="id_kota" value={formData.id_kota} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-sky-500">{renderKabKotaOptions()}</select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Total Jumlah Perusahaan</label>
              <input name="jml_perusahaan" type="number" value={formData.jml_perusahaan} onChange={handleChange} placeholder="0" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-sky-500 bg-slate-50" />
            </div>
          </div>
        </section>

        <section>
          <h4 className="text-sm font-bold text-sky-700 mb-4 pb-2 border-b-2 border-sky-100 uppercase tracking-wide">2. Jumlah Tenaga Kerja</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-sky-50/50 p-4 rounded-lg border border-sky-100">
              <p className="font-semibold text-sky-800 mb-3 text-sm">Warga Negara Indonesia (WNI)</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Laki-Laki (L)</label>
                  <input name="tk_wni_l" type="number" value={formData.tk_wni_l} onChange={handleChange} placeholder="0" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Perempuan (P)</label>
                  <input name="tk_wni_p" type="number" value={formData.tk_wni_p} onChange={handleChange} placeholder="0" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
                </div>
              </div>
            </div>
            <div className="bg-sky-50/50 p-4 rounded-lg border border-sky-100">
              <p className="font-semibold text-sky-800 mb-3 text-sm">Warga Negara Asing (WNA)</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Laki-Laki (L)</label>
                  <input name="tk_wna_l" type="number" value={formData.tk_wna_l} onChange={handleChange} placeholder="0" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">Perempuan (P)</label>
                  <input name="tk_wna_p" type="number" value={formData.tk_wna_p} onChange={handleChange} placeholder="0" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section>
            <h4 className="text-sm font-bold text-sky-700 mb-4 pb-2 border-b-2 border-sky-100 uppercase tracking-wide">3. Kategori Perusahaan</h4>
            <div className="grid grid-cols-2 gap-4 bg-yellow-50/30 p-4 border border-yellow-100 rounded-lg">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Mikro</label>
                <input name="kat_mikro" type="number" value={formData.kat_mikro} onChange={handleChange} placeholder="0" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Kecil</label>
                <input name="kat_kecil" type="number" value={formData.kat_kecil} onChange={handleChange} placeholder="0" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Menengah</label>
                <input name="kat_menengah" type="number" value={formData.kat_menengah} onChange={handleChange} placeholder="0" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Besar</label>
                <input name="kat_besar" type="number" value={formData.kat_besar} onChange={handleChange} placeholder="0" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
              </div>
            </div>
          </section>

          <section>
            <h4 className="text-sm font-bold text-sky-700 mb-4 pb-2 border-b-2 border-sky-100 uppercase tracking-wide">4. Kelembagaan & Hub. Industrial</h4>
            <div className="grid grid-cols-2 gap-4 bg-purple-50/30 p-4 border border-purple-100 rounded-lg">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">PP</label>
                <input name="hi_pp" type="number" value={formData.hi_pp} onChange={handleChange} placeholder="0" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">PKB</label>
                <input name="hi_pkb" type="number" value={formData.hi_pkb} onChange={handleChange} placeholder="0" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">SP/B</label>
                <input name="hi_sp_sb" type="number" value={formData.hi_sp_sb} onChange={handleChange} placeholder="0" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Lemb. Tripartit</label>
                <input name="hi_tripartit" type="number" value={formData.hi_tripartit} onChange={handleChange} placeholder="0" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
              </div>
            </div>
          </section>
        </div>

        <section>
          <h4 className="text-sm font-bold text-sky-700 mb-4 pb-2 border-b-2 border-sky-100 uppercase tracking-wide">5. Status Kepemilikan Perusahaan</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-green-50/30 p-4 border border-green-100 rounded-lg">
            {[
              ['stat_swasta', 'Swasta'],
              ['stat_persero', 'Persero'],
              ['stat_perum', 'Perusahaan Umum (Perum)'],
              ['stat_bumd', 'BUMD'],
              ['stat_yayasan', 'Yayasan'],
              ['stat_koperasi', 'Koperasi'],
              ['stat_perseorangan', 'Perseorangan'],
              ['stat_joint', 'Joint Vent']
            ].map(([key, label]) => (
               <div key={label}>
                 <label className="block text-xs font-medium text-slate-500 mb-1.5">{label}</label>
                 <input name={key} type="number" value={formData[key]} onChange={handleChange} placeholder="0" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
               </div>
            ))}
          </div>
        </section>

        <section>
          <h4 className="text-sm font-bold text-sky-700 mb-4 pb-2 border-b-2 border-sky-100 uppercase tracking-wide">6. Keterangan / Penghargaan K3</h4>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Penghargaan K3 yang dimiliki perusahaan</label>
            <textarea
              name="penghargaan_k3"
              rows="3"
              value={formData.penghargaan_k3}
              onChange={handleChange}
              placeholder="Contoh: 15 Perusahaan mendapat Zero Accident, 5 Perusahaan mendapat Sertifikat SMK3..."
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-sky-500"
            ></textarea>
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button type="button" onClick={() => setActiveTab('lihat')} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">
            Batal
          </button>
          <button type="submit" className="px-6 py-2.5 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
            Simpan Data
          </button>
        </div>
      </form>
    </div>
  );

  const renderViewDataK1 = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-slate-800">Tabel Rekapitulasi Data K1</h3>
          <p className="text-xs text-slate-500 mt-1">Data Jabatan, Pengawas Umum, Spesialis K3 & PPNS</p>
        </div>
        <button className="px-4 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md flex items-center gap-2 active:scale-[0.98]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Export Excel
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[11px] text-slate-500 uppercase tracking-wide bg-slate-50 border-b-2 border-slate-100 font-semibold">
            <tr>
              <th className="px-5 py-4">Bulan</th>
              <th className="px-5 py-4">Tahun</th>
              <th className="px-5 py-4">Jabatan</th>
              <th className="px-5 py-4 text-center">Pengawas Umum</th>
              <th className="px-5 py-4 text-center">PPNS</th>
              <th className="px-5 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataK1.map((item) => {
              const isExpanded = expandedRow === `k1-${item.id}`;
              return (
                <React.Fragment key={`k1-${item.id}`}>
                  <tr className={`border-b transition-colors ${isExpanded ? 'bg-sky-50/40' : 'bg-white hover:bg-slate-50'}`}>
                    <td className="px-5 py-3">{item.bulan}</td>
                    <td className="px-5 py-3">{item.tahun}</td>
                    <td className="px-5 py-3 font-medium text-slate-800">{item.jabatan}</td>
                    <td className="px-5 py-3 text-center font-semibold text-sky-600">{Number(item.pengawas_umum ?? 0).toLocaleString()}</td>
                    <td className="px-5 py-3 text-center font-semibold text-purple-600">{Number(item.ppns ?? 0).toLocaleString()}</td>
                    <td className="px-5 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => toggleRow(`k1-${item.id}`)} className={`text-xs font-medium flex items-center justify-center gap-1 px-3 py-1.5 rounded transition ${isExpanded ? 'bg-sky-600 text-white' : 'bg-slate-100 text-sky-600 hover:bg-sky-50'}`}>
                          {isExpanded ? 'Tutup' : 'Detail'}
                        </button>
                        <button className="p-1.5 bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition shadow-sm" title="Edit Data"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button>
                        <button className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition shadow-sm" title="Hapus Data"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                      </div>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr>
                      <td colSpan="6" className="p-0 border-b border-slate-300">
                        <div className="bg-slate-100 p-6 shadow-inner">
                          <h4 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-300">Rincian Spesialis K3 (1 sampai 11)</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {[
                              'spesialis_1', 'spesialis_2', 'spesialis_3', 'spesialis_4', 'spesialis_5', 'spesialis_6',
                              'spesialis_7', 'spesialis_8', 'spesialis_9', 'spesialis_10', 'spesialis_11'
                            ].map((key, idx) => (
                              <div key={key} className="bg-white p-3 rounded-md shadow-sm border border-slate-200 flex justify-between items-center">
                                <span className="text-xs text-slate-500 uppercase">Spesialis {idx + 1}</span>
                                <span className="font-bold text-slate-800">{Number(item[key] ?? 0)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderViewDataK3 = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-slate-800">Tabel Rekapitulasi Data K3</h3>
          <p className="text-xs text-slate-500 mt-1">Objek K3 / Kelembagaan K3</p>
        </div>
        <button className="px-4 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md flex items-center gap-2 active:scale-[0.98]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Export Excel
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[11px] text-slate-500 uppercase tracking-wide bg-slate-50 border-b-2 border-slate-100 font-semibold">
            <tr>
              <th className="px-5 py-4">Bulan</th>
              <th className="px-5 py-4">Tahun</th>
              <th className="px-5 py-4">Kabupaten/Kota</th>
              <th className="px-5 py-4 text-center">Pesawat Uap</th>
              <th className="px-5 py-4 text-center">Bejana Tekan</th>
              <th className="px-5 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataK3.map((item) => (
              <tr key={item.id} className="border-b bg-white hover:bg-slate-50">
                <td className="px-5 py-3">{item.bulan}</td>
                <td className="px-5 py-3">{item.tahun}</td>
                <td className="px-5 py-3 font-medium text-slate-800">{getKotaName(item)}</td>
                <td className="px-5 py-3 text-center font-semibold text-sky-600">{Number(item.pesawat_uap ?? 0)}</td>
                <td className="px-5 py-3 text-center font-semibold text-purple-600">{Number(item.bejana_tekan ?? 0)}</td>
                <td className="px-5 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-1.5 bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition shadow-sm" title="Edit Data"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button>
                    <button className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition shadow-sm" title="Hapus Data"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderViewDataK4 = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-slate-800">Tabel Rekapitulasi Data K4</h3>
          <p className="text-xs text-slate-500 mt-1">Jamsostek / BPJS Ketenagakerjaan</p>
        </div>
        <button className="px-4 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md flex items-center gap-2 active:scale-[0.98]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Export Excel
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[11px] text-slate-500 uppercase tracking-wide bg-slate-50 border-b-2 border-slate-100 font-semibold">
            <tr>
              <th className="px-5 py-4">Bulan</th>
              <th className="px-5 py-4">Tahun</th>
              <th className="px-5 py-4">Kabupaten/Kota</th>
              <th className="px-5 py-4 text-center">Jml Perusahaan BPJS</th>
              <th className="px-5 py-4 text-center">TK WNI BPJS</th>
              <th className="px-5 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataK4.map((item) => (
              <tr key={item.id} className="border-b bg-white hover:bg-slate-50">
                <td className="px-5 py-3">{item.bulan}</td>
                <td className="px-5 py-3">{item.tahun}</td>
                <td className="px-5 py-3 font-medium text-slate-800">{getKotaName(item)}</td>
                <td className="px-5 py-3 text-center font-semibold text-sky-600">{Number(item.jml_perusahaan_bpjs ?? 0)}</td>
                <td className="px-5 py-3 text-center font-semibold text-purple-600">{Number(item.tk_wni_bpjs ?? 0)}</td>
                <td className="px-5 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-1.5 bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition shadow-sm" title="Edit Data"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button>
                    <button className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition shadow-sm" title="Hapus Data"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderViewDataK5 = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-slate-800">Tabel Rekapitulasi Data K5</h3>
          <p className="text-xs text-slate-500 mt-1">Pemeriksaan / Uji Norma</p>
        </div>
        <button className="px-4 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md flex items-center gap-2 active:scale-[0.98]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Export Excel
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[11px] text-slate-500 uppercase tracking-wide bg-slate-50 border-b-2 border-slate-100 font-semibold">
            <tr>
              <th className="px-4 py-4">Bulan</th>
              <th className="px-4 py-4">Tahun</th>
              <th className="px-4 py-4">Jabatan Pengawas</th>
              <th className="px-4 py-4 text-center">Jml Pengawas</th>
              <th className="px-4 py-4 text-center">Keg Pertama</th>
              <th className="px-4 py-4 text-center">Keg Berkala</th>
              <th className="px-4 py-4 text-center">Keg Ulang</th>
              <th className="px-4 py-4 text-center">Keg Khusus</th>
              <th className="px-4 py-4 text-center">Uji Norma Kerja</th>
              <th className="px-4 py-4 text-center">Uji Norma K3</th>
              <th className="px-4 py-4 text-center">Hukum Nota 1</th>
              <th className="px-4 py-4 text-center">Hukum Nota 2</th>
              <th className="px-4 py-4 text-center">Hukum LK</th>
            </tr>
          </thead>
          <tbody>
            {dataK5.map((item) => (
              <tr key={item.id} className="border-b bg-white hover:bg-slate-50">
                <td className="px-4 py-3">{item.bulan}</td>
                <td className="px-4 py-3">{item.tahun}</td>
                <td className="px-4 py-3 font-medium text-slate-800">{item.jabatan_pengawas}</td>
                <td className="px-4 py-3 text-center">{Number(item.jml_pengawas ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.keg_pertama ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.keg_berkala ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.keg_ulang ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.keg_khusus ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.uji_norma_kerja ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.uji_norma_k3 ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.hukum_nota_1 ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.hukum_nota_2 ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.hukum_lk ?? 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderViewDataK6 = () => {
    const filteredDataK6 = dataK6.filter((item) => (
      activeMenu === 'K6' || String(item.jenis_kegiatan ?? '').includes(activeMenu)
    ));

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-slate-800">Tabel Rekapitulasi Data {getActiveTitle()}</h3>
            <p className="text-xs text-slate-500 mt-1">Kegiatan KBLI / Pemetaan Program</p>
          </div>
          <button className="px-4 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md flex items-center gap-2 active:scale-[0.98]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Export Excel
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-[11px] text-slate-500 uppercase tracking-wide bg-slate-50 border-b-2 border-slate-100 font-semibold">
              <tr>
                <th className="px-5 py-4">Bulan</th>
                <th className="px-5 py-4">Tahun</th>
                <th className="px-5 py-4">Kabupaten/Kota</th>
                <th className="px-5 py-4">KBLI</th>
                <th className="px-5 py-4">Jenis Kegiatan</th>
                <th className="px-5 py-4 text-center">Jml Pelaksanaan</th>
                <th className="px-5 py-4">Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {filteredDataK6.map((item) => (
                <tr key={item.id} className="border-b bg-white hover:bg-slate-50">
                  <td className="px-5 py-3">{item.bulan}</td>
                  <td className="px-5 py-3">{item.tahun}</td>
                  <td className="px-5 py-3 font-medium text-slate-800">{getKotaName(item)}</td>
                  <td className="px-5 py-3 font-medium text-slate-700">{item.kode_kbli ?? item.kbli?.kode_kbli}</td>
                  <td className="px-5 py-3">{item.jenis_kegiatan}</td>
                  <td className="px-5 py-3 text-center font-semibold text-sky-600">{Number(item.jml_pelaksanaan ?? 0)}</td>
                  <td className="px-5 py-3">{item.keterangan ?? '-'}</td>
                </tr>
              ))}
              {filteredDataK6.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-5 py-8 text-center text-slate-500">Belum ada data untuk {getActiveTitle()}.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderViewDataK7 = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-slate-800">Tabel Rekapitulasi Data K7</h3>
          <p className="text-xs text-slate-500 mt-1">Perizinan / Pemeriksaan & Pelayanan</p>
        </div>
        <button className="px-4 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md flex items-center gap-2 active:scale-[0.98]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Export Excel
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[11px] text-slate-500 uppercase tracking-wide bg-slate-50 border-b-2 border-slate-100 font-semibold">
            <tr>
              <th className="px-4 py-4">Bulan</th>
              <th className="px-4 py-4">Tahun</th>
              <th className="px-4 py-4">Kabupaten/Kota</th>
              <th className="px-4 py-4 text-center">Pesawat Uap</th>
              <th className="px-4 py-4 text-center">Bejana Tekan</th>
              <th className="px-4 py-4 text-center">PAA</th>
              <th className="px-4 py-4 text-center">PTP</th>
              <th className="px-4 py-4 text-center">Listrik</th>
              <th className="px-4 py-4 text-center">Elevator</th>
              <th className="px-4 py-4 text-center">Petir</th>
              <th className="px-4 py-4 text-center">Kebakaran</th>
              <th className="px-4 py-4 text-center">Konstruksi</th>
              <th className="px-4 py-4 text-center">Klinik</th>
              <th className="px-4 py-4 text-center">Lingkungan</th>
              <th className="px-4 py-4 text-center">Kimia</th>
              <th className="px-4 py-4 text-center">Makan</th>
              <th className="px-4 py-4 text-center">P2K3</th>
            </tr>
          </thead>
          <tbody>
            {dataK7.map((item) => (
              <tr key={item.id} className="border-b bg-white hover:bg-slate-50">
                <td className="px-4 py-3">{item.bulan}</td>
                <td className="px-4 py-3">{item.tahun}</td>
                <td className="px-4 py-3 font-medium text-slate-800">{getKotaName(item)}</td>
                <td className="px-4 py-3 text-center">{Number(item.pesawat_uap ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.bejana_tekan ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.paa ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.ptp ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.listrik ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.elevator ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.petir ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.kebakaran ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.konstruksi ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.klinik ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.lingkungan ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.kimia ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.makan ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.p2k3 ?? 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderInputFormK1 = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60">
        <h3 className="font-semibold text-slate-800">Form Input Data K1 Baru</h3>
        <p className="text-xs text-slate-500 mt-1">Pengawas & Ketenagakerjaan</p>
      </div>
      <form className="p-6 space-y-6" onSubmit={handleSubmitK1}>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Bulan</label>
            <select name="bulan" value={formDataK1.bulan} onChange={handleChangeK1} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow">
              <option value="Januari">Januari</option><option value="Februari">Februari</option><option value="Maret">Maret</option>
              <option value="April">April</option><option value="Mei">Mei</option><option value="Juni">Juni</option>
              <option value="Juli">Juli</option><option value="Agustus">Agustus</option><option value="September">September</option>
              <option value="Oktober">Oktober</option><option value="November">November</option><option value="Desember">Desember</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Tahun</label>
            <input name="tahun" type="number" value={formDataK1.tahun} onChange={handleChangeK1} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
          </div>
        </section>

        <section>
          <div className="overflow-x-auto w-full pb-4">
            <div className="border border-slate-200 rounded-lg">
              <table className="min-w-[1180px] w-full text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="sticky left-0 z-10 bg-slate-50 px-4 py-3 text-left font-semibold border-r border-slate-200">Jabatan</th>
                    {k1NumberFields.map((field) => (
                      <th key={field.key} className="px-3 py-3 text-center font-semibold whitespace-nowrap">{field.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {k1JabatanOptions.map((jabatan) => (
                    <tr key={jabatan} className="hover:bg-slate-50">
                      <td className="sticky left-0 z-10 bg-white px-4 py-3 font-semibold text-slate-800 border-r border-slate-200">{jabatan}</td>
                      {k1NumberFields.map((field) => (
                        <td key={`${jabatan}-${field.key}`} className="px-2 py-3">
                          <input
                            type="number"
                            min="0"
                            value={formDataK1.jabatan[jabatan][field.key]}
                            onChange={(e) => handleChangeK1Jabatan(jabatan, field.key, e.target.value)}
                            className="w-20 border border-slate-300 rounded-md px-2 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button type="button" onClick={() => setActiveTab('lihat')} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">Batal</button>
          <button type="submit" className="px-6 py-2.5 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">Simpan Semua Data K1</button>
        </div>
      </form>
    </div>
  );

  const renderInputFormK3 = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60">
        <h3 className="font-semibold text-slate-800">Form Input Data K3 Baru</h3>
        <p className="text-xs text-slate-500 mt-1">Objek K3 / Kelembagaan K3</p>
      </div>
      <form className="p-6 space-y-8" onSubmit={handleSubmitK3}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Bulan</label>
            <select name="bulan" value={formDataK3.bulan} onChange={handleChangeK3} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow">
              <option value="Januari">Januari</option><option value="Februari">Februari</option><option value="Maret">Maret</option>
              <option value="April">April</option><option value="Mei">Mei</option><option value="Juni">Juni</option>
              <option value="Juli">Juli</option><option value="Agustus">Agustus</option><option value="September">September</option>
              <option value="Oktober">Oktober</option><option value="November">November</option><option value="Desember">Desember</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Tahun</label>
            <input name="tahun" type="number" value={formDataK3.tahun} onChange={handleChangeK3} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Kabupaten/Kota</label>
            <select name="id_kota" value={formDataK3.id_kota} onChange={handleChangeK3} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow">{renderKabKotaOptions()}</select>
          </div>
        </div>

        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['pesawat_uap','bejana_tekan','pesawat_angkat','pesawat_tenaga','listrik','eskalator','cegah_kebakaran','kesehatan_kerja','konstruksi','lingkungan_kerja','bahan_kimia','ruang_terbatas','sarana_k3','personil_k3','p2k3','perancah'].map((key) => (
              <div key={key}>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">{key.replace(/_/g, ' ')}</label>
                <input name={key} type="number" value={formDataK3[key]} onChange={handleChangeK3} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button type="button" onClick={() => setActiveTab('lihat')} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">Batal</button>
          <button type="submit" className="px-6 py-2.5 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">Simpan Data</button>
        </div>
      </form>
    </div>
  );

  const renderInputFormK4 = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60">
        <h3 className="font-semibold text-slate-800">Form Input Data K4 Baru</h3>
        <p className="text-xs text-slate-500 mt-1">Jamsostek / BPJS Ketenagakerjaan</p>
      </div>
      <form className="p-6 space-y-8" onSubmit={handleSubmitK4}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Bulan</label>
            <select name="bulan" value={formDataK4.bulan} onChange={handleChangeK4} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow">
              <option value="Januari">Januari</option><option value="Februari">Februari</option><option value="Maret">Maret</option>
              <option value="April">April</option><option value="Mei">Mei</option><option value="Juni">Juni</option>
              <option value="Juli">Juli</option><option value="Agustus">Agustus</option><option value="September">September</option>
              <option value="Oktober">Oktober</option><option value="November">November</option><option value="Desember">Desember</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Tahun</label>
            <input name="tahun" type="number" value={formDataK4.tahun} onChange={handleChangeK4} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Kabupaten/Kota</label>
            <select name="id_kota" value={formDataK4.id_kota} onChange={handleChangeK4} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow">{renderKabKotaOptions()}</select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Jml Perusahaan BPJS</label>
            <input name="jml_perusahaan_bpjs" type="number" value={formDataK4.jml_perusahaan_bpjs} onChange={handleChangeK4} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
          </div>
        </div>

        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['tk_wni_bpjs','tk_wna_bpjs','prog_jkn','prog_jkk_jkm','prog_jht','prog_jp','prog_jkp'].map((key) => (
              <div key={key}>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">{key.replace(/_/g, ' ')}</label>
                <input name={key} type="number" value={formDataK4[key]} onChange={handleChangeK4} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button type="button" onClick={() => setActiveTab('lihat')} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">Batal</button>
          <button type="submit" className="px-6 py-2.5 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">Simpan Data</button>
        </div>
      </form>
    </div>
  );

  const renderInputFormK5 = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60">
        <h3 className="font-semibold text-slate-800">Form Input Data K5 Baru</h3>
        <p className="text-xs text-slate-500 mt-1">Pemeriksaan & Uji Norma</p>
      </div>
      <form className="p-6 space-y-8" onSubmit={handleSubmitK5}>
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Bulan</label>
              <select name="bulan" value={formDataK5.bulan} onChange={handleChangeK5} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow">
                <option value="Januari">Januari</option><option value="Februari">Februari</option><option value="Maret">Maret</option>
                <option value="April">April</option><option value="Mei">Mei</option><option value="Juni">Juni</option>
                <option value="Juli">Juli</option><option value="Agustus">Agustus</option><option value="September">September</option>
                <option value="Oktober">Oktober</option><option value="November">November</option><option value="Desember">Desember</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Tahun</label>
              <input name="tahun" type="number" value={formDataK5.tahun} onChange={handleChangeK5} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Jabatan Pengawas</label>
              <select name="jabatan_pengawas" value={formDataK5.jabatan_pengawas} onChange={handleChangeK5} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow">
                <option value="Pertama">Pertama</option>
                <option value="Muda">Muda</option>
                <option value="Madya">Madya</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Jml Pengawas</label>
              <input name="jml_pengawas" type="number" value={formDataK5.jml_pengawas} onChange={handleChangeK5} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
            </div>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['keg_pertama','keg_berkala','keg_ulang','keg_khusus','uji_norma_kerja','uji_norma_k3','hukum_nota_1','hukum_nota_2','hukum_lk'].map((key) => (
              <div key={key}>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">{key.replace(/_/g, ' ')}</label>
                <input name={key} type="number" value={formDataK5[key]} onChange={handleChangeK5} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button type="button" onClick={() => setActiveTab('lihat')} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">Batal</button>
          <button type="submit" className="px-6 py-2.5 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">Simpan Data</button>
        </div>
      </form>
    </div>
  );

  const renderInputFormK6 = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60">
        <h3 className="font-semibold text-slate-800">Form Input Data {getActiveTitle()} Baru</h3>
        <p className="text-xs text-slate-500 mt-1">Kegiatan KBLI</p>
      </div>
      <form className="p-6 space-y-6" onSubmit={handleSubmitK6}>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Bulan</label>
            <select name="bulan" value={formDataK6.bulan} onChange={handleChangeK6} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow">
              <option value="Januari">Januari</option><option value="Februari">Februari</option><option value="Maret">Maret</option>
              <option value="April">April</option><option value="Mei">Mei</option><option value="Juni">Juni</option>
              <option value="Juli">Juli</option><option value="Agustus">Agustus</option><option value="September">September</option>
              <option value="Oktober">Oktober</option><option value="November">November</option><option value="Desember">Desember</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Tahun</label>
            <input name="tahun" type="number" value={formDataK6.tahun} onChange={handleChangeK6} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Kabupaten/Kota</label>
            <select name="id_kota" value={formDataK6.id_kota} onChange={handleChangeK6} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow">{renderKabKotaOptions()}</select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Jenis Kegiatan</label>
            <input type="text" value={k6JenisKegiatanMap[activeMenu] ?? k6JenisKegiatanMap.K6} disabled className="w-full border border-slate-200 bg-slate-100 text-slate-600 rounded-md px-3 py-2 text-sm" />
          </div>
        </section>

        <section>
          <div className="overflow-x-auto w-full pb-4">
            <div className="border border-slate-200 rounded-lg">
              <table className="min-w-[720px] w-full text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold w-24">Kode KBLI</th>
                    <th className="px-4 py-3 text-left font-semibold">Keterangan KBLI</th>
                    <th className="px-4 py-3 text-center font-semibold w-40">Nilai</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {kbliOptions.map((item) => (
                    <tr key={item.kode} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-800">{item.kode}</td>
                      <td className="px-4 py-3 text-slate-700">{item.keterangan}</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          value={formDataK6.data_kbli[item.kode]}
                          onChange={(e) => handleChangeK6Kbli(item.kode, e.target.value)}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow text-center focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Jumlah Pelaksanaan Total</label>
            <input
              name="jml_pelaksanaan_global"
              type="number"
              min="0"
              value={formDataK6.jml_pelaksanaan_global}
              onChange={handleChangeK6}
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Keterangan Laporan</label>
            <textarea
              name="keterangan_global"
              rows="3"
              value={formDataK6.keterangan_global}
              onChange={handleChangeK6}
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button type="button" onClick={() => setActiveTab('lihat')} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">Batal</button>
          <button type="submit" className="px-6 py-2.5 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">Simpan Semua Data K6</button>
        </div>
      </form>
    </div>
  );

  const renderInputFormK7 = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60">
        <h3 className="font-semibold text-slate-800">Form Input Data K7 Baru</h3>
        <p className="text-xs text-slate-500 mt-1">Perizinan</p>
      </div>
      <form className="p-6 space-y-8" onSubmit={handleSubmitK7}>
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Bulan</label>
              <select name="bulan" value={formDataK7.bulan} onChange={handleChangeK7} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow">
                <option value="Januari">Januari</option><option value="Februari">Februari</option><option value="Maret">Maret</option>
                <option value="April">April</option><option value="Mei">Mei</option><option value="Juni">Juni</option>
                <option value="Juli">Juli</option><option value="Agustus">Agustus</option><option value="September">September</option>
                <option value="Oktober">Oktober</option><option value="November">November</option><option value="Desember">Desember</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Tahun</label>
              <input name="tahun" type="number" value={formDataK7.tahun} onChange={handleChangeK7} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Kabupaten/Kota</label>
              <select name="id_kota" value={formDataK7.id_kota} onChange={handleChangeK7} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow">{renderKabKotaOptions()}</select>
            </div>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['pesawat_uap','bejana_tekan','paa','ptp','listrik','elevator','petir','kebakaran','konstruksi','klinik','lingkungan','kimia','makan','p2k3'].map((key) => (
              <div key={key}>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">{key.replace(/_/g, ' ')}</label>
                <input name={key} type="number" value={formDataK7[key]} onChange={handleChangeK7} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button type="button" onClick={() => setActiveTab('lihat')} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">Batal</button>
          <button type="submit" className="px-6 py-2.5 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">Simpan Data</button>
        </div>
      </form>
    </div>
  );

  const renderViewDataK8A = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-slate-800">Tabel Rekapitulasi Data K8A</h3>
          <p className="text-xs text-slate-500 mt-1">Kasus Kecelakaan</p>
        </div>
        <button className="px-4 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md flex items-center gap-2 active:scale-[0.98]">Export Excel</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[11px] text-slate-500 uppercase tracking-wide bg-slate-50 border-b-2 border-slate-100 font-semibold">
            <tr>
              <th className="px-4 py-4">Bulan</th><th className="px-4 py-4">Tahun</th><th className="px-4 py-4">Kabupaten/Kota</th>
              <th className="px-4 py-4 text-center">Jml Kasus</th><th className="px-4 py-4 text-center">Keracunan</th><th className="px-4 py-4 text-center">Meninggal</th>
              <th className="px-4 py-4 text-center">Dugaan PAK</th><th className="px-4 py-4 text-center">PAK</th><th className="px-4 py-4 text-center">Korban Total</th>
              <th className="px-4 py-4 text-center">Tipe A</th><th className="px-4 py-4 text-center">Tipe B</th><th className="px-4 py-4 text-center">Tipe C</th>
            </tr>
          </thead>
          <tbody>
            {dataK8A.map((item) => (
              <tr key={item.id} className="border-b bg-white hover:bg-slate-50">
                <td className="px-4 py-3">{item.bulan}</td><td className="px-4 py-3">{item.tahun}</td><td className="px-4 py-3 font-medium text-slate-800">{getKotaName(item)}</td>
                <td className="px-4 py-3 text-center">{Number(item.jml_kasus ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.keracunan ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.meninggal ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.dugaan_pak ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.pak ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.korban_total ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.tipe_a ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.tipe_b ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.tipe_c ?? 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderViewDataK8B = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex justify-between items-center">
        <div><h3 className="font-semibold text-slate-800">Tabel Rekapitulasi Data K8B</h3><p className="text-xs text-slate-500 mt-1">Sumber Bahaya</p></div>
        <button className="px-4 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md flex items-center gap-2 active:scale-[0.98]">Export Excel</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[11px] text-slate-500 uppercase tracking-wide bg-slate-50 border-b-2 border-slate-100 font-semibold">
            <tr>
              <th className="px-4 py-4">Bulan</th><th className="px-4 py-4">Tahun</th><th className="px-4 py-4">Kabupaten/Kota</th>
              <th className="px-4 py-4 text-center">Sumber A</th><th className="px-4 py-4 text-center">Sumber B</th><th className="px-4 py-4 text-center">Sumber C</th>
              <th className="px-4 py-4 text-center">Sumber D</th><th className="px-4 py-4 text-center">Sumber E</th><th className="px-4 py-4 text-center">Sumber F</th>
            </tr>
          </thead>
          <tbody>
            {dataK8B.map((item) => (
              <tr key={item.id} className="border-b bg-white hover:bg-slate-50">
                <td className="px-4 py-3">{item.bulan}</td><td className="px-4 py-3">{item.tahun}</td><td className="px-4 py-3 font-medium text-slate-800">{getKotaName(item)}</td>
                <td className="px-4 py-3 text-center">{Number(item.sumber_a ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.sumber_b ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.sumber_c ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.sumber_d ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.sumber_e ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.sumber_f ?? 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderViewDataK8C = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex justify-between items-center">
        <div><h3 className="font-semibold text-slate-800">Tabel Rekapitulasi Data K8C</h3><p className="text-xs text-slate-500 mt-1">Akibat Santunan</p></div>
        <button className="px-4 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md flex items-center gap-2 active:scale-[0.98]">Export Excel</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[11px] text-slate-500 uppercase tracking-wide bg-slate-50 border-b-2 border-slate-100 font-semibold">
            <tr>
              <th className="px-4 py-4">Bulan</th><th className="px-4 py-4">Tahun</th><th className="px-4 py-4">Kabupaten/Kota</th>
              <th className="px-4 py-4 text-center">Sembuh</th><th className="px-4 py-4 text-center">STMB</th><th className="px-4 py-4 text-center">Cacat</th>
              <th className="px-4 py-4 text-center">Meninggal</th><th className="px-4 py-4 text-center">Santunan Berkala</th><th className="px-4 py-4 text-center">Santunan Sekaligus</th>
            </tr>
          </thead>
          <tbody>
            {dataK8C.map((item) => (
              <tr key={item.id} className="border-b bg-white hover:bg-slate-50">
                <td className="px-4 py-3">{item.bulan}</td><td className="px-4 py-3">{item.tahun}</td><td className="px-4 py-3 font-medium text-slate-800">{getKotaName(item)}</td>
                <td className="px-4 py-3 text-center">{Number(item.akibat_sembuh ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.akibat_stmb ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.akibat_cacat ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.akibat_meninggal ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.santunan_berkala ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.santunan_sekaligus ?? 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderViewDataK9A = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex justify-between items-center">
        <div><h3 className="font-semibold text-slate-800">Tabel Rekapitulasi Data K9A</h3><p className="text-xs text-slate-500 mt-1">Pelanggaran Kerja</p></div>
        <button className="px-4 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md flex items-center gap-2 active:scale-[0.98]">Export Excel</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[11px] text-slate-500 uppercase tracking-wide bg-slate-50 border-b-2 border-slate-100 font-semibold">
            <tr>
              <th className="px-4 py-4">Bulan</th><th className="px-4 py-4">Tahun</th><th className="px-4 py-4">Kabupaten/Kota</th>
              <th className="px-4 py-4 text-center">Jml Pelanggar</th><th className="px-4 py-4 text-center">Jml di Nota</th><th className="px-4 py-4 text-center">Wlkp</th>
              <th className="px-4 py-4 text-center">Wkwi</th><th className="px-4 py-4 text-center">Penggunaan TKA</th><th className="px-4 py-4 text-center">PMI</th>
            </tr>
          </thead>
          <tbody>
            {dataK9A.map((item) => (
              <tr key={item.id} className="border-b bg-white hover:bg-slate-50">
                <td className="px-4 py-3">{item.bulan}</td><td className="px-4 py-3">{item.tahun}</td><td className="px-4 py-3 font-medium text-slate-800">{getKotaName(item)}</td>
                <td className="px-4 py-3 text-center">{Number(item.jml_perusahaan_melanggar ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.jml_di_nota ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.pelanggaran_wlkp ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.pelanggaran_wkwi ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.penggunaan_tka ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.pmi ?? 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderViewDataK9B = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex justify-between items-center">
        <div><h3 className="font-semibold text-slate-800">Tabel Rekapitulasi Data K9B</h3><p className="text-xs text-slate-500 mt-1">Pelanggaran K3</p></div>
        <button className="px-4 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md flex items-center gap-2 active:scale-[0.98]">Export Excel</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[11px] text-slate-500 uppercase tracking-wide bg-slate-50 border-b-2 border-slate-100 font-semibold">
            <tr>
              <th className="px-4 py-4">Bulan</th><th className="px-4 py-4">Tahun</th><th className="px-4 py-4">Kabupaten/Kota</th>
              <th className="px-4 py-4 text-center">Pelanggaran P2K3</th><th className="px-4 py-4 text-center">Ahli K3</th><th className="px-4 py-4 text-center">Personil K3 Lainnya</th>
              <th className="px-4 py-4 text-center">PJK3</th><th className="px-4 py-4 text-center">Unit P3K</th><th className="px-4 py-4 text-center">Sarana Makan</th>
            </tr>
          </thead>
          <tbody>
            {dataK9B.map((item) => (
              <tr key={item.id} className="border-b bg-white hover:bg-slate-50">
                <td className="px-4 py-3">{item.bulan}</td><td className="px-4 py-3">{item.tahun}</td><td className="px-4 py-3 font-medium text-slate-800">{getKotaName(item)}</td>
                <td className="px-4 py-3 text-center">{Number(item.pelanggaran_p2k3 ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.ahli_k3 ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.personil_k3_lainnya ?? 0)}</td>
                <td className="px-4 py-3 text-center">{Number(item.pjk3 ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.unit_p3k ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.sarana_makan ?? 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderViewDataK10 = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex justify-between items-center">
        <div><h3 className="font-semibold text-slate-800">Tabel Rekapitulasi Data K10</h3><p className="text-xs text-slate-500 mt-1">Penyidikan</p></div>
        <button className="px-4 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md flex items-center gap-2 active:scale-[0.98]">Export Excel</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[11px] text-slate-500 uppercase tracking-wide bg-slate-50 border-b-2 border-slate-100 font-semibold">
            <tr>
              <th className="px-4 py-4">Bulan</th><th className="px-4 py-4">Tahun</th><th className="px-4 py-4">Kabupaten/Kota</th>
              <th className="px-4 py-4">Nomor Laporan</th><th className="px-4 py-4">Dugaan Pelanggaran</th><th className="px-4 py-4 text-center">Status</th>
              <th className="px-4 py-4 text-center">Proses</th><th className="px-4 py-4 text-center">Denda</th><th className="px-4 py-4 text-center">Kurungan</th>
            </tr>
          </thead>
          <tbody>
            {dataK10.map((item) => (
              <tr key={item.id} className="border-b bg-white hover:bg-slate-50">
                <td className="px-4 py-3">{item.bulan}</td><td className="px-4 py-3">{item.tahun}</td><td className="px-4 py-3 font-medium text-slate-800">{getKotaName(item)}</td>
                <td className="px-4 py-3 font-medium">{item.no_laporan}</td><td className="px-4 py-3">{item.dugaan_pelanggaran}</td><td className="px-4 py-3 text-center">{item.status_selesai ?? '-'}</td>
                <td className="px-4 py-3 text-center">{item.proses ?? '-'}</td><td className="px-4 py-3 text-center">{Number(item.putusan_denda ?? 0)}</td><td className="px-4 py-3 text-center">{item.putusan_kurungan ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderInputFormK8A = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60"><h3 className="font-semibold text-slate-800">Form Input Data K8A Baru</h3><p className="text-xs text-slate-500 mt-1">Kasus Kecelakaan</p></div>
      <form className="p-6 space-y-8" onSubmit={handleSubmitK8A}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div><label className="block text-sm font-medium text-slate-600 mb-1.5">Bulan</label><select name="bulan" value={formDataK8A.bulan} onChange={handleChangeK8A} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow"><option value="Januari">Januari</option><option value="Februari">Februari</option><option value="Maret">Maret</option><option value="April">April</option><option value="Mei">Mei</option><option value="Juni">Juni</option><option value="Juli">Juli</option><option value="Agustus">Agustus</option><option value="September">September</option><option value="Oktober">Oktober</option><option value="November">November</option><option value="Desember">Desember</option></select></div>
          <div><label className="block text-sm font-medium text-slate-600 mb-1.5">Tahun</label><input name="tahun" type="number" value={formDataK8A.tahun} onChange={handleChangeK8A} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" /></div>
          <div><label className="block text-sm font-medium text-slate-600 mb-1.5">Kabupaten/Kota</label><select name="id_kota" value={formDataK8A.id_kota} onChange={handleChangeK8A} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow">{renderKabKotaOptions()}</select></div>
        </div>
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['jml_kasus','keracunan','meninggal','dugaan_pak','pak','korban_total','tipe_a','tipe_b','tipe_c','tipe_d','tipe_e','tipe_f','tipe_g','tipe_h','tipe_i','tipe_j','tipe_k'].map((key) => (
              <div key={key}><label className="block text-xs font-medium text-slate-500 mb-1.5">{key.replace(/_/g, ' ')}</label><input name={key} type="number" value={formDataK8A[key]} onChange={handleChangeK8A} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" /></div>
            ))}
          </div>
        </section>
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200"><button type="button" onClick={() => setActiveTab('lihat')} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">Batal</button><button type="submit" className="px-6 py-2.5 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">Simpan Data</button></div>
      </form>
    </div>
  );

  const renderInputFormK8B = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60"><h3 className="font-semibold text-slate-800">Form Input Data K8B Baru</h3><p className="text-xs text-slate-500 mt-1">Sumber Bahaya</p></div>
      <form className="p-6 space-y-8" onSubmit={handleSubmitK8B}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div><label className="block text-sm font-medium text-slate-600 mb-1.5">Bulan</label><select name="bulan" value={formDataK8B.bulan} onChange={handleChangeK8B} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow"><option value="Januari">Januari</option><option value="Februari">Februari</option><option value="Maret">Maret</option><option value="April">April</option><option value="Mei">Mei</option><option value="Juni">Juni</option><option value="Juli">Juli</option><option value="Agustus">Agustus</option><option value="September">September</option><option value="Oktober">Oktober</option><option value="November">November</option><option value="Desember">Desember</option></select></div>
          <div><label className="block text-sm font-medium text-slate-600 mb-1.5">Tahun</label><input name="tahun" type="number" value={formDataK8B.tahun} onChange={handleChangeK8B} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" /></div>
          <div><label className="block text-sm font-medium text-slate-600 mb-1.5">Kabupaten/Kota</label><select name="id_kota" value={formDataK8B.id_kota} onChange={handleChangeK8B} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow">{renderKabKotaOptions()}</select></div>
        </div>
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['sumber_a','sumber_b','sumber_c','sumber_d','sumber_e','sumber_f','sumber_g','sumber_h','sumber_i','sumber_j','sumber_k','sumber_l','sumber_m','sumber_n','sumber_o','sumber_p','sumber_q','sumber_r','sumber_s','sumber_t','sumber_u'].map((key) => (
              <div key={key}><label className="block text-xs font-medium text-slate-500 mb-1.5">{key.replace(/_/g, ' ')}</label><input name={key} type="number" value={formDataK8B[key]} onChange={handleChangeK8B} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" /></div>
            ))}
          </div>
        </section>
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200"><button type="button" onClick={() => setActiveTab('lihat')} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">Batal</button><button type="submit" className="px-6 py-2.5 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">Simpan Data</button></div>
      </form>
    </div>
  );

  const renderInputFormK8C = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60"><h3 className="font-semibold text-slate-800">Form Input Data K8C Baru</h3><p className="text-xs text-slate-500 mt-1">Akibat Santunan</p></div>
      <form className="p-6 space-y-8" onSubmit={handleSubmitK8C}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div><label className="block text-sm font-medium text-slate-600 mb-1.5">Bulan</label><select name="bulan" value={formDataK8C.bulan} onChange={handleChangeK8C} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow"><option value="Januari">Januari</option><option value="Februari">Februari</option><option value="Maret">Maret</option><option value="April">April</option><option value="Mei">Mei</option><option value="Juni">Juni</option><option value="Juli">Juli</option><option value="Agustus">Agustus</option><option value="September">September</option><option value="Oktober">Oktober</option><option value="November">November</option><option value="Desember">Desember</option></select></div>
          <div><label className="block text-sm font-medium text-slate-600 mb-1.5">Tahun</label><input name="tahun" type="number" value={formDataK8C.tahun} onChange={handleChangeK8C} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" /></div>
          <div><label className="block text-sm font-medium text-slate-600 mb-1.5">Kabupaten/Kota</label><select name="id_kota" value={formDataK8C.id_kota} onChange={handleChangeK8C} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow">{renderKabKotaOptions()}</select></div>
        </div>
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['akibat_sembuh','akibat_stmb','akibat_cacat','akibat_meninggal','santunan_berkala','santunan_sekaligus','santunan_pendidikan','santunan_kembali_kerja','kerugian_ekonomi','jam_kerja_hilang'].map((key) => (
              <div key={key}><label className="block text-xs font-medium text-slate-500 mb-1.5">{key.replace(/_/g, ' ')}</label><input name={key} type="number" value={formDataK8C[key]} onChange={handleChangeK8C} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" /></div>
            ))}
          </div>
        </section>
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200"><button type="button" onClick={() => setActiveTab('lihat')} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">Batal</button><button type="submit" className="px-6 py-2.5 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">Simpan Data</button></div>
      </form>
    </div>
  );

  const renderInputFormK9A = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60"><h3 className="font-semibold text-slate-800">Form Input Data K9A Baru</h3><p className="text-xs text-slate-500 mt-1">Pelanggaran Kerja</p></div>
      <form className="p-6 space-y-8" onSubmit={handleSubmitK9A}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div><label className="block text-sm font-medium text-slate-600 mb-1.5">Bulan</label><select name="bulan" value={formDataK9A.bulan} onChange={handleChangeK9A} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow"><option value="Januari">Januari</option><option value="Februari">Februari</option><option value="Maret">Maret</option><option value="April">April</option><option value="Mei">Mei</option><option value="Juni">Juni</option><option value="Juli">Juli</option><option value="Agustus">Agustus</option><option value="September">September</option><option value="Oktober">Oktober</option><option value="November">November</option><option value="Desember">Desember</option></select></div>
          <div><label className="block text-sm font-medium text-slate-600 mb-1.5">Tahun</label><input name="tahun" type="number" value={formDataK9A.tahun} onChange={handleChangeK9A} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" /></div>
          <div><label className="block text-sm font-medium text-slate-600 mb-1.5">Kabupaten/Kota</label><select name="id_kota" value={formDataK9A.id_kota} onChange={handleChangeK9A} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow">{renderKabKotaOptions()}</select></div>
        </div>
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['jml_perusahaan_melanggar','jml_di_nota','pelanggaran_wlkp','pelanggaran_wkwi','penggunaan_tka','pmi','upah_minimum','upah_tidak_dibayar','upah_lembur','kompensasi_pkwt','pesangon','thr','pekerja_anak','cuti_tahunan','cuti_haid','pp_kb','pwbd_bpjs_kes','pwbd_bpjs_tk','pds_tk','pds_upah','pds_prog','prshn_mnggk','lain_lain'].map((key) => (
              <div key={key}><label className="block text-xs font-medium text-slate-500 mb-1.5">{key.replace(/_/g, ' ')}</label><input name={key} type="number" value={formDataK9A[key]} onChange={handleChangeK9A} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" /></div>
            ))}
          </div>
        </section>
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200"><button type="button" onClick={() => setActiveTab('lihat')} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">Batal</button><button type="submit" className="px-6 py-2.5 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">Simpan Data</button></div>
      </form>
    </div>
  );

  const renderInputFormK9B = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60"><h3 className="font-semibold text-slate-800">Form Input Data K9B Baru</h3><p className="text-xs text-slate-500 mt-1">Pelanggaran K3</p></div>
      <form className="p-6 space-y-8" onSubmit={handleSubmitK9B}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div><label className="block text-sm font-medium text-slate-600 mb-1.5">Bulan</label><select name="bulan" value={formDataK9B.bulan} onChange={handleChangeK9B} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow"><option value="Januari">Januari</option><option value="Februari">Februari</option><option value="Maret">Maret</option><option value="April">April</option><option value="Mei">Mei</option><option value="Juni">Juni</option><option value="Juli">Juli</option><option value="Agustus">Agustus</option><option value="September">September</option><option value="Oktober">Oktober</option><option value="November">November</option><option value="Desember">Desember</option></select></div>
          <div><label className="block text-sm font-medium text-slate-600 mb-1.5">Tahun</label><input name="tahun" type="number" value={formDataK9B.tahun} onChange={handleChangeK9B} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" /></div>
          <div><label className="block text-sm font-medium text-slate-600 mb-1.5">Kabupaten/Kota</label><select name="id_kota" value={formDataK9B.id_kota} onChange={handleChangeK9B} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow">{renderKabKotaOptions()}</select></div>
        </div>
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['pelanggaran_p2k3','ahli_k3','personil_k3_lainnya','pjk3','unit_p3k','sarana_makan','pengendalian_b3','dokter_perusahaan','paramedis_perusahaan','dokter_pktk','riksa_awal','riksa_berkala','riksa_khusus','lainnya'].map((key) => (
              <div key={key}><label className="block text-xs font-medium text-slate-500 mb-1.5">{key.replace(/_/g, ' ')}</label><input name={key} type="number" value={formDataK9B[key]} onChange={handleChangeK9B} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" /></div>
            ))}
          </div>
        </section>
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200"><button type="button" onClick={() => setActiveTab('lihat')} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">Batal</button><button type="submit" className="px-6 py-2.5 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">Simpan Data</button></div>
      </form>
    </div>
  );

  const renderInputFormK10 = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60"><h3 className="font-semibold text-slate-800">Form Input Data K10 Baru</h3><p className="text-xs text-slate-500 mt-1">Penyidikan</p></div>
      <form className="p-6 space-y-8" onSubmit={handleSubmitK10}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div><label className="block text-sm font-medium text-slate-600 mb-1.5">Bulan</label><select name="bulan" value={formDataK10.bulan} onChange={handleChangeK10} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow"><option value="Januari">Januari</option><option value="Februari">Februari</option><option value="Maret">Maret</option><option value="April">April</option><option value="Mei">Mei</option><option value="Juni">Juni</option><option value="Juli">Juli</option><option value="Agustus">Agustus</option><option value="September">September</option><option value="Oktober">Oktober</option><option value="November">November</option><option value="Desember">Desember</option></select></div>
          <div><label className="block text-sm font-medium text-slate-600 mb-1.5">Tahun</label><input name="tahun" type="number" value={formDataK10.tahun} onChange={handleChangeK10} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" /></div>
          <div><label className="block text-sm font-medium text-slate-600 mb-1.5">Kabupaten/Kota</label><select name="id_kota" value={formDataK10.id_kota} onChange={handleChangeK10} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow">{renderKabKotaOptions()}</select></div>
          <div><label className="block text-sm font-medium text-slate-600 mb-1.5">No Laporan</label><input name="no_laporan" type="text" value={formDataK10.no_laporan} onChange={handleChangeK10} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" /></div>
        </div>
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-slate-600 mb-1.5">Dugaan Pelanggaran</label><textarea name="dugaan_pelanggaran" value={formDataK10.dugaan_pelanggaran} onChange={handleChangeK10} rows="3" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-slate-600 mb-1.5">Nomor SPT</label><input name="no_spt" type="text" value={formDataK10.no_spt} onChange={handleChangeK10} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" /></div>
              <div><label className="block text-sm font-medium text-slate-600 mb-1.5">Status Selesai</label><select name="status_selesai" value={formDataK10.status_selesai} onChange={handleChangeK10} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow"><option value="P21">P21</option><option value="SP3">SP3</option><option value="Limpah POLSRI">Limpah POLSRI</option></select></div>
              <div><label className="block text-sm font-medium text-slate-600 mb-1.5">Proses</label><input name="proses" type="text" value={formDataK10.proses} onChange={handleChangeK10} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" /></div>
              <div><label className="block text-sm font-medium text-slate-600 mb-1.5">Putusan Denda</label><input name="putusan_denda" type="number" value={formDataK10.putusan_denda} onChange={handleChangeK10} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" /></div>
              <div className="md:col-span-2"><label className="block text-sm font-medium text-slate-600 mb-1.5">Putusan Kurungan</label><input name="putusan_kurungan" type="text" value={formDataK10.putusan_kurungan} onChange={handleChangeK10} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" /></div>
            </div>
          </div>
        </section>
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200"><button type="button" onClick={() => setActiveTab('lihat')} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">Batal</button><button type="submit" className="px-6 py-2.5 bg-sky-600 text-white text-sm font-semibold rounded-lg hover:bg-sky-700 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">Simpan Data</button></div>
      </form>
    </div>
  );

  const handleChangeK1 = (e) => {
    const { name, value } = e.target;
    setFormDataK1(prev => ({
      ...prev,
      [name]: name === 'tahun' ? numericValue(value) : value,
    }));
  };

  const handleChangeK1Jabatan = (jabatan, field, value) => {
    setFormDataK1((prev) => ({
      ...prev,
      jabatan: {
        ...prev.jabatan,
        [jabatan]: {
          ...prev.jabatan[jabatan],
          [field]: numericValue(value),
        },
      },
    }));
  };

  const handleChangeK3 = (e) => {
    const { name, value } = e.target;
    setFormDataK3(prev => ({
      ...prev,
      [name]: ['tahun', 'id_kota', 'pesawat_uap', 'bejana_tekan', 'pesawat_angkat', 'pesawat_tenaga', 'listrik', 'eskalator', 'cegah_kebakaran', 'kesehatan_kerja', 'konstruksi', 'lingkungan_kerja', 'bahan_kimia', 'ruang_terbatas', 'sarana_k3', 'personil_k3', 'p2k3', 'perancah'].includes(name) ? numericValue(value) : value,
    }));
  };

  const handleChangeK4 = (e) => {
    const { name, value } = e.target;
    setFormDataK4(prev => ({
      ...prev,
      [name]: ['tahun', 'id_kota', 'jml_perusahaan_bpjs', 'tk_wni_bpjs', 'tk_wna_bpjs', 'prog_jkn', 'prog_jkk_jkm', 'prog_jht', 'prog_jp', 'prog_jkp'].includes(name) ? numericValue(value) : value,
    }));
  };

  const handleChangeK5 = (e) => {
    const { name, value } = e.target;
    setFormDataK5((prev) => ({
      ...prev,
      [name]: ['tahun', 'jml_pengawas', 'keg_pertama', 'keg_berkala', 'keg_ulang', 'keg_khusus', 'uji_norma_kerja', 'uji_norma_k3', 'hukum_nota_1', 'hukum_nota_2', 'hukum_lk'].includes(name) ? numericValue(value) : value,
    }));
  };

  const handleChangeK6 = (e) => {
    const { name, value } = e.target;
    setFormDataK6((prev) => ({
      ...prev,
      [name]: ['tahun', 'id_kota', 'jml_pelaksanaan_global'].includes(name) ? numericValue(value) : value,
    }));
  };

  const handleChangeK6Kbli = (kode, value) => {
    setFormDataK6((prev) => ({
      ...prev,
      data_kbli: {
        ...prev.data_kbli,
        [kode]: numericValue(value),
      },
    }));
  };

  const handleChangeK7 = (e) => {
    const { name, value } = e.target;
    setFormDataK7((prev) => ({
      ...prev,
      [name]: ['tahun', 'id_kota', 'pesawat_uap', 'bejana_tekan', 'paa', 'ptp', 'listrik', 'elevator', 'petir', 'kebakaran', 'konstruksi', 'klinik', 'lingkungan', 'kimia', 'makan', 'p2k3'].includes(name) ? numericValue(value) : value,
    }));
  };

  const handleSubmitK1 = async (e) => {
    e.preventDefault();
    const payload = k1JabatanOptions.map((jabatan) => ({
      bulan: formDataK1.bulan,
      tahun: formDataK1.tahun,
      jabatan,
      ...formDataK1.jabatan[jabatan],
    }));

    try {
      const response = await fetch('http://127.0.0.1:8000/api/k1-pengawas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) {
        alert('Gagal menyimpan data K1');
        console.error(result);
        return;
      }
      alert('Data K1 berhasil disimpan');
      setActiveTab('lihat');
      fetchK1();
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan pada request POST K1');
    }
  };

  const handleSubmitK3 = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/k3-objek-k3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formDataK3),
      });
      const result = await response.json();
      if (!response.ok) {
        alert('Gagal menyimpan data K3');
        console.error(result);
        return;
      }
      alert('Data K3 berhasil disimpan');
      setActiveTab('lihat');
      fetchK3();
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan pada request POST K3');
    }
  };

  const handleSubmitK4 = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/k4-jamsostek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formDataK4),
      });
      const result = await response.json();
      if (!response.ok) {
        alert('Gagal menyimpan data K4');
        console.error(result);
        return;
      }
      alert('Data K4 berhasil disimpan');
      setActiveTab('lihat');
      fetchK4();
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan pada request POST K4');
    }
  };

  const handleSubmitK5 = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/k5-pemeriksaan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formDataK5),
      });
      const result = await response.json();
      if (!response.ok) {
        alert('Gagal menyimpan data K5');
        console.error(result);
        return;
      }
      alert('Data K5 berhasil disimpan');
      setActiveTab('lihat');
      fetchK5();
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan pada request POST K5');
    }
  };

  const handleSubmitK6 = async (e) => {
    e.preventDefault();
    const jenisKegiatan = k6JenisKegiatanMap[activeMenu] ?? k6JenisKegiatanMap.K6;
    const payload = Object.entries(formDataK6.data_kbli)
      .filter(([, nilai]) => Number(nilai ?? 0) > 0)
      .map(([kodeKbli, nilai]) => ({
        bulan: formDataK6.bulan,
        tahun: formDataK6.tahun,
        id_kota: formDataK6.id_kota,
        kode_kbli: kodeKbli,
        jenis_kegiatan: jenisKegiatan,
        nilai: Number(nilai),
        jml_pelaksanaan: formDataK6.jml_pelaksanaan_global,
        keterangan: formDataK6.keterangan_global,
      }));

    try {
      const response = await fetch('http://127.0.0.1:8000/api/k6-kegiatan-kbli', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) {
        alert('Gagal menyimpan data K6');
        console.error(result);
        return;
      }
      alert('Data K6 berhasil disimpan');
      setActiveTab('lihat');
      fetchK6();
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan pada request POST K6');
    }
  };

  const handleSubmitK7 = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/k7-perizinan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formDataK7),
      });
      const result = await response.json();
      if (!response.ok) {
        alert('Gagal menyimpan data K7');
        console.error(result);
        return;
      }
      alert('Data K7 berhasil disimpan');
      setActiveTab('lihat');
      fetchK7();
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan pada request POST K7');
    }
  };

  const handleChangeK8A = (e) => {
    const { name, value } = e.target;
    setFormDataK8A((prev) => ({
      ...prev,
      [name]: ['tahun', 'id_kota', 'jml_kasus', 'keracunan', 'meninggal', 'dugaan_pak', 'pak', 'korban_total', 'tipe_a', 'tipe_b', 'tipe_c', 'tipe_d', 'tipe_e', 'tipe_f', 'tipe_g', 'tipe_h', 'tipe_i', 'tipe_j', 'tipe_k'].includes(name) ? numericValue(value) : value,
    }));
  };

  const handleChangeK8B = (e) => {
    const { name, value } = e.target;
    setFormDataK8B((prev) => ({
      ...prev,
      [name]: ['tahun', 'id_kota'].concat(['sumber_a','sumber_b','sumber_c','sumber_d','sumber_e','sumber_f','sumber_g','sumber_h','sumber_i','sumber_j','sumber_k','sumber_l','sumber_m','sumber_n','sumber_o','sumber_p','sumber_q','sumber_r','sumber_s','sumber_t','sumber_u']).includes(name) ? numericValue(value) : value,
    }));
  };

  const handleChangeK8C = (e) => {
    const { name, value } = e.target;
    setFormDataK8C((prev) => ({
      ...prev,
      [name]: ['tahun', 'id_kota', 'akibat_sembuh', 'akibat_stmb', 'akibat_cacat', 'akibat_meninggal', 'santunan_berkala', 'santunan_sekaligus', 'santunan_pendidikan', 'santunan_kembali_kerja', 'kerugian_ekonomi', 'jam_kerja_hilang'].includes(name) ? numericValue(value) : value,
    }));
  };

  const handleChangeK9A = (e) => {
    const { name, value } = e.target;
    setFormDataK9A((prev) => ({
      ...prev,
      [name]: ['tahun', 'id_kota', 'jml_perusahaan_melanggar', 'jml_di_nota', 'pelanggaran_wlkp', 'pelanggaran_wkwi', 'penggunaan_tka', 'pmi', 'upah_minimum', 'upah_tidak_dibayar', 'upah_lembur', 'kompensasi_pkwt', 'pesangon', 'thr', 'pekerja_anak', 'cuti_tahunan', 'cuti_haid', 'pp_kb', 'pwbd_bpjs_kes', 'pwbd_bpjs_tk', 'pds_tk', 'pds_upah', 'pds_prog', 'prshn_mnggk', 'lain_lain'].includes(name) ? numericValue(value) : value,
    }));
  };

  const handleChangeK9B = (e) => {
    const { name, value } = e.target;
    setFormDataK9B((prev) => ({
      ...prev,
      [name]: ['tahun', 'id_kota', 'pelanggaran_p2k3', 'ahli_k3', 'personil_k3_lainnya', 'pjk3', 'unit_p3k', 'sarana_makan', 'pengendalian_b3', 'dokter_perusahaan', 'paramedis_perusahaan', 'dokter_pktk', 'riksa_awal', 'riksa_berkala', 'riksa_khusus', 'lainnya'].includes(name) ? numericValue(value) : value,
    }));
  };

  const handleChangeK10 = (e) => {
    const { name, value } = e.target;
    setFormDataK10((prev) => ({
      ...prev,
      [name]: ['tahun', 'id_kota', 'putusan_denda'].includes(name) ? numericValue(value) : value,
    }));
  };

  const handleSubmitK8A = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/k8a-kasus-kecelakaan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formDataK8A),
      });
      const result = await response.json();
      if (!response.ok) {
        alert('Gagal menyimpan data K8A');
        console.error(result);
        return;
      }
      alert('Data K8A berhasil disimpan');
      setActiveTab('lihat');
      fetchK8A();
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan pada request POST K8A');
    }
  };

  const handleSubmitK8B = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/k8b-sumber-bahaya', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formDataK8B),
      });
      const result = await response.json();
      if (!response.ok) {
        alert('Gagal menyimpan data K8B');
        console.error(result);
        return;
      }
      alert('Data K8B berhasil disimpan');
      setActiveTab('lihat');
      fetchK8B();
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan pada request POST K8B');
    }
  };

  const handleSubmitK8C = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/k8c-akibat-santunan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formDataK8C),
      });
      const result = await response.json();
      if (!response.ok) {
        alert('Gagal menyimpan data K8C');
        console.error(result);
        return;
      }
      alert('Data K8C berhasil disimpan');
      setActiveTab('lihat');
      fetchK8C();
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan pada request POST K8C');
    }
  };

  const handleSubmitK9A = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/k9a-pelanggaran-kerja', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formDataK9A),
      });
      const result = await response.json();
      if (!response.ok) {
        alert('Gagal menyimpan data K9A');
        console.error(result);
        return;
      }
      alert('Data K9A berhasil disimpan');
      setActiveTab('lihat');
      fetchK9A();
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan pada request POST K9A');
    }
  };

  const handleSubmitK9B = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/k9b-pelanggaran-k3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formDataK9B),
      });
      const result = await response.json();
      if (!response.ok) {
        alert('Gagal menyimpan data K9B');
        console.error(result);
        return;
      }
      alert('Data K9B berhasil disimpan');
      setActiveTab('lihat');
      fetchK9B();
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan pada request POST K9B');
    }
  };

  const handleSubmitK10 = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/k10-penyidikan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formDataK10),
      });
      const result = await response.json();
      if (!response.ok) {
        alert('Gagal menyimpan data K10');
        console.error(result);
        return;
      }
      alert('Data K10 berhasil disimpan');
      setActiveTab('lihat');
      fetchK10();
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan pada request POST K10');
    }
  };

  const renderGenericViewData = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden flex flex-col h-96">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-slate-800">Data {getActiveTitle()}</h3>
          <p className="text-xs text-slate-500 mt-1">Tampilan tabel standar untuk form ini</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500 bg-slate-50/50">
         <svg className="w-12 h-12 mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
         <p>Tabel detail untuk <strong>{getActiveTitle()}</strong> akan ditampilkan di sini.</p>
         <p className="text-sm mt-1">Struktur tabel mengikuti template standar yang terpadu dengan Aksi (Detail, Edit, Hapus).</p>
         <div className="mt-6 flex items-center gap-3 px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-md">
            <span className="text-xs font-medium text-slate-600">Preview Aksi:</span>
            <button className="p-1.5 bg-sky-100 text-sky-700 rounded"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></button>
            <button className="p-1.5 bg-amber-100 text-amber-700 rounded"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button>
            <button className="p-1.5 bg-red-100 text-red-700 rounded"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
         </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <style>{`
        input, select, textarea { transition: box-shadow .15s ease, border-color .15s ease; }
        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: #0ea5e9;
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
        }
        input:hover:not(:focus), select:hover:not(:focus) { border-color: #94a3b8; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 9999px; }
      `}</style>
      {/* Sidebar */}
      {renderSidebar()}

      {/* Main Content (Offset by Sidebar width) */}
      <main className="ml-72 flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center px-8 justify-between z-10 sticky top-0">
          <div>
            <p className="text-[11px] font-medium text-slate-400 tracking-wide">Menu Laporan</p>
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">
              {getActiveTitle()}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={openProfile}
              className={`flex items-center gap-3 rounded-full pl-3 pr-1.5 py-1.5 transition-all ${
                activeMenu === 'PROFILE'
                  ? 'bg-sky-50 text-sky-700 ring-1 ring-sky-200'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
              }`}
            >
              <span className="text-sm hidden sm:inline">
                Welcome, <strong className="font-semibold">{user.name || 'Admin Pengawas'}</strong>
              </span>
              <span className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-500 to-sky-700 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-sky-500/20 ring-2 ring-white overflow-hidden">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Foto profil" className="w-full h-full object-cover" />
                ) : (
                  userInitial
                )}
              </span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            {activeMenu === 'PROFILE' ? (
              renderProfilePage()
            ) : activeMenu === 'K1' || activeMenu === 'K2' || activeMenu === 'K3' || activeMenu === 'K4' || activeMenu === 'K5' || k6MenuIds.includes(activeMenu) || activeMenu === 'K7' || activeMenu === '8A' || activeMenu === '8B' || activeMenu === '8C' || activeMenu === '9A' || activeMenu === '9B' || activeMenu === 'K10' ? (
              <div>
                {/* Tab Navigation */}
                <div className="inline-flex items-center gap-1 mb-6 p-1 bg-slate-200/60 rounded-xl">
                  <button
                    onClick={() => setActiveTab('lihat')}
                    className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-150 ${
                      activeTab === 'lihat'
                        ? 'bg-white text-sky-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      Lihat Data Tabel
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('input')}
                    className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-150 ${
                      activeTab === 'input'
                        ? 'bg-white text-sky-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                      Input Data Baru
                    </div>
                  </button>
                </div>

                {/* Render Tab Content */}
                {activeTab === 'lihat' ? (
                  activeMenu === 'K1' ? renderViewDataK1() :
                  activeMenu === 'K2' ? renderViewData() :
                  activeMenu === 'K3' ? renderViewDataK3() :
                  activeMenu === 'K4' ? renderViewDataK4() :
                  activeMenu === 'K5' ? renderViewDataK5() :
                  k6MenuIds.includes(activeMenu) ? renderViewDataK6() :
                  activeMenu === 'K7' ? renderViewDataK7() :
                  activeMenu === '8A' ? renderViewDataK8A() :
                  activeMenu === '8B' ? renderViewDataK8B() :
                  activeMenu === '8C' ? renderViewDataK8C() :
                  activeMenu === '9A' ? renderViewDataK9A() :
                  activeMenu === '9B' ? renderViewDataK9B() :
                  activeMenu === 'K10' ? renderViewDataK10() :
                  renderGenericViewData()
                ) : (
                  activeMenu === 'K1' ? renderInputFormK1() :
                  activeMenu === 'K2' ? renderInputForm() :
                  activeMenu === 'K3' ? renderInputFormK3() :
                  activeMenu === 'K4' ? renderInputFormK4() :
                  activeMenu === 'K5' ? renderInputFormK5() :
                  k6MenuIds.includes(activeMenu) ? renderInputFormK6() :
                  activeMenu === 'K7' ? renderInputFormK7() :
                  activeMenu === '8A' ? renderInputFormK8A() :
                  activeMenu === '8B' ? renderInputFormK8B() :
                  activeMenu === '8C' ? renderInputFormK8C() :
                  activeMenu === '9A' ? renderInputFormK9A() :
                  activeMenu === '9B' ? renderInputFormK9B() :
                  activeMenu === 'K10' ? renderInputFormK10() :
                  <div className="bg-white p-12 rounded-lg shadow-sm border border-slate-200 text-center text-slate-500">
                    <svg className="w-12 h-12 mx-auto mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    <h3 className="text-lg font-medium text-slate-700 mb-2">Form Input {getActiveTitle()}</h3>
                    <p>Halaman formulir untuk memasukkan data ini sedang disiapkan.</p>
                  </div>
                )}
              </div>
            ) : (
              renderGenericViewData()
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
