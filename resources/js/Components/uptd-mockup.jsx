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

// Struktur grup field K3 — dipakai bersama oleh form input & panel detail
const k3FieldGroups = [
  {
    title: '2. Objek Pengawasan K3',
    color: 'sky',
    fields: [
      ['pesawat_uap', 'Pesawat Uap'],
      ['bejana_tekan', 'Bejana Bertekanan'],
      ['pesawat_angkat_angkut', 'Pesawat Angkat Angkut'],
      ['pesawat_tenaga_produksi', 'Pesawat Tenaga dan Produksi'],
      ['kelistrikan', 'Kelistrikan'],
      ['eskalator_elevator', 'Eskalator/Elevator'],
      ['pencegahan_kebakaran', 'Pencegahan Kebakaran'],
      ['kesehatan_kerja_catering', 'Kesehatan Kerja/Catering'],
      ['konstruksi_bangunan', 'Konstruksi Bangunan'],
    ],
  },
  {
    title: '3. Lingkungan Kerja',
    color: 'amber',
    fields: [
      ['lingkungan_fisika', 'Fisika'],
      ['lingkungan_kimia', 'Kimia'],
      ['lingkungan_biologi', 'Biologi'],
      ['lingkungan_ergonomi', 'Ergonomi'],
      ['lingkungan_psikologi', 'Psikologi'],
    ],
  },
  {
    title: '4. Bahan Berbahaya & Ruang Terbatas',
    color: 'red',
    fields: [
      ['bahan_kimia_berbahaya', 'Bahan Kimia Berbahaya'],
      ['ruang_terbatas', 'Ruang Terbatas'],
    ],
  },
  {
    title: '5. Sarana K3',
    color: 'green',
    fields: [
      ['sarana_apd', 'APD'],
      ['sarana_penyalur_petir', 'Penyalur Petir'],
      ['sarana_evakuasi', 'Sarana Evakuasi'],
      ['sarana_p3k', 'Fasilitas P3K'],
      ['sarana_hygiene_sanitasi', 'Sarana Hygiene Sanitasi'],
      ['sarana_kantin', 'Sarana Penyelenggara Makan (Kantin)'],
    ],
  },
  {
    title: '6. Personil K3',
    color: 'purple',
    fields: [
      ['personil_ahli_k3', 'Ahli K3'],
      ['personil_ahli_k3_spesialis', 'Ahli K3 Spesialis'],
      ['personil_k3_lainnya', 'Personil K3 Lainnya'],
    ],
  },
  {
    title: '7. Kelembagaan & Perancah',
    color: 'slate',
    fields: [
      ['p2k3', 'P2K3'],
      ['perancah_bangun', 'Perancah Bangun'],
    ],
  },
];

const k3ColorClasses = {
  sky: { box: 'bg-sky-50/30 border-sky-100', dot: 'bg-sky-600', text: 'text-sky-700' },
  amber: { box: 'bg-amber-50/30 border-amber-100', dot: 'bg-amber-500', text: 'text-amber-700' },
  red: { box: 'bg-red-50/30 border-red-100', dot: 'bg-red-500', text: 'text-red-700' },
  green: { box: 'bg-green-50/30 border-green-100', dot: 'bg-green-500', text: 'text-green-700' },
  purple: { box: 'bg-purple-50/30 border-purple-100', dot: 'bg-purple-500', text: 'text-purple-700' },
  slate: { box: 'bg-slate-50 border-slate-200', dot: 'bg-slate-500', text: 'text-slate-700' },
};

// Struktur grup field K4 — mengikuti persis pola K3 untuk form input & panel detail
const k4FieldGroups = [
  {
    title: '2. Perusahaan Terdaftar BPJS Kesehatan',
    color: 'sky',
    fields: [
      ['jml_perusahaan_bpjs', 'Jumlah Perusahaan Terdaftar BPJS Kesehatan'],
    ],
  },
  {
    title: '3. Jumlah Tenaga Kerja BPJS Kesehatan',
    color: 'amber',
    fields: [
      ['tk_wni_bpjs', 'Warga Negara Indonesia (WNI)'],
      ['tk_wna_bpjs', 'Warga Negara Asing (WNA)'],
    ],
  },
  {
    title: '4. Program Terdaftar',
    color: 'green',
    fields: [
      ['prog_jkn', 'JKN'],
      ['prog_jkk_jkm', 'JKK & JKM'],
      ['prog_jht', 'JHT'],
      ['prog_jp', 'JP'],
      ['prog_jkp', 'JKP'],
    ],
  },
];

const k5JabatanOptions = ['Pertama', 'Muda', 'Madya'];
const k5NumberFields = [
  ['jml_pengawas', 'Jumlah'],
  ['keg_pertama', 'Pertama'],
  ['keg_berkala', 'Berkala'],
  ['keg_ulang', 'Ulang'],
  ['keg_khusus', 'Khusus'],
  ['uji_norma_kerja', 'Norma Kerja'],
  ['uji_norma_k3', 'Norma K3'],
  ['hukum_nota_1', 'NP. I'],
  ['hukum_nota_2', 'NP. II'],
  ['hukum_lk', 'LK'],
];

const k5FieldGroups = [
  {
    title: 'Kegiatan Pemeriksaan',
    color: 'sky',
    fields: [
      ['keg_pertama', 'Pertama'],
      ['keg_berkala', 'Berkala'],
      ['keg_ulang', 'Ulang'],
      ['keg_khusus', 'Khusus'],
    ],
  },
  {
    title: 'Kegiatan Pengujian',
    color: 'amber',
    fields: [
      ['uji_norma_kerja', 'Norma Kerja'],
      ['uji_norma_k3', 'Norma K3'],
    ],
  },
  {
    title: 'Pembinaan/Penegakan Hukum',
    color: 'green',
    fields: [
      ['hukum_nota_1', 'NP. I'],
      ['hukum_nota_2', 'NP. II'],
      ['hukum_lk', 'LK'],
    ],
  },
];

const createK5JabatanValues = () => k5NumberFields.reduce((values, [key]) => ({
  ...values,
  [key]: 0,
}), {});

const createK5JabatanData = () => k5JabatanOptions.reduce((values, jabatan) => ({
  ...values,
  [jabatan]: createK5JabatanValues(),
}), {});


const App = () => {
  const { auth } = usePage().props;
  const user = auth?.user ?? {
    name: 'Admin Pengawas',
    email: 'admin@uptd.local',
  };

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
  const profilePhoto = user.profile_photo_url || '';
  const [isUploadingProfilePhoto, setIsUploadingProfilePhoto] = useState(false);
  const [profileName, setProfileName] = useState(() => localStorage.getItem('profile_name') || user.name || 'Admin Pengawas');
  const [profileNameInput, setProfileNameInput] = useState(() => localStorage.getItem('profile_name') || user.name || 'Admin Pengawas');
  const [isEditingProfileName, setIsEditingProfileName] = useState(false);
  const userInitial = (profileName || 'A').trim().charAt(0).toUpperCase();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [editData, setEditData] = useState(null);
  const [editForm, setEditForm] = useState({});

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
    // 2. Objek Pengawasan K3
    pesawat_uap: 0,
    bejana_tekan: 0,
    pesawat_angkat_angkut: 0,
    pesawat_tenaga_produksi: 0,
    kelistrikan: 0,
    eskalator_elevator: 0,
    pencegahan_kebakaran: 0,
    kesehatan_kerja_catering: 0,
    konstruksi_bangunan: 0,
    // 3. Lingkungan Kerja
    lingkungan_fisika: 0,
    lingkungan_kimia: 0,
    lingkungan_biologi: 0,
    lingkungan_ergonomi: 0,
    lingkungan_psikologi: 0,
    // 4. Bahan Berbahaya & Ruang Terbatas
    bahan_kimia_berbahaya: 0,
    ruang_terbatas: 0,
    // 5. Sarana K3
    sarana_apd: 0,
    sarana_penyalur_petir: 0,
    sarana_evakuasi: 0,
    sarana_p3k: 0,
    sarana_hygiene_sanitasi: 0,
    sarana_kantin: 0,
    // 6. Personil K3
    personil_ahli_k3: 0,
    personil_ahli_k3_spesialis: 0,
    personil_k3_lainnya: 0,
    // 7. Kelembagaan & Perancah
    p2k3: 0,
    perancah_bangun: 0,
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
    jabatan: createK5JabatanData(),
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
    if (activeMenu === 'EDIT') return 'Edit Data';

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

  const getDeleteName = (item) => (
    item?.jabatan || item?.jabatan_pengawas || item?.no_laporan || getKotaName(item)
  );

  const del = async (id, api, cb, name) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus ${name}?`)) {
      const r = await fetch(`http://127.0.0.1:8000/api/${api}/${id}`, { method: 'DELETE' });
      if (r.ok) cb();
    }
  };

  const openEditPage = (item, api, cb, name) => {
    if (activeMenu !== 'EDIT') {
      setLastReportMenu(activeMenu);
    }

    setEditData({ id: item.id, api, cb, name });
    setEditForm(Object.entries(item).reduce((values, [key, value]) => {
      if (['id', 'created_at', 'updated_at', 'kota', 'master_kab_kota', 'kbli'].includes(key)) {
        return values;
      }

      if (value === null || typeof value !== 'object') {
        values[key] = value ?? '';
      }

      return values;
    }, {}));
    setActiveMenu('EDIT');
  };

  const openK1GroupEditPage = (group) => {
    if (activeMenu !== 'EDIT') setLastReportMenu(activeMenu);

    setEditData({
      type: 'k1-group',
      api: 'k1-pengawas',
      name: `${group.bulan} ${group.tahun}`,
      groupItems: Object.values(group.jabatan).filter(Boolean),
    });

    setEditForm({
      bulan: group.bulan ?? '',
      tahun: group.tahun ?? '',
      jabatan: k1JabatanOptions.reduce((values, jabatan) => ({
        ...values,
        [jabatan]: k1NumberFields.reduce((fields, field) => ({
          ...fields,
          [field.key]: Number(group.jabatan[jabatan]?.[field.key] ?? 0),
        }), createK1JabatanValues()),
      }), {}),
    });
    setActiveMenu('EDIT');
  };

  const handleEditK1JabatanChange = (jabatan, field, value) => {
    setEditForm((prev) => ({
      ...prev,
      jabatan: {
        ...prev.jabatan,
        [jabatan]: {
          ...prev.jabatan?.[jabatan],
          [field]: numericValue(value),
        },
      },
    }));
  };

  const openK5GroupEditPage = (group) => {
    if (activeMenu !== 'EDIT') {
      setLastReportMenu(activeMenu);
    }

    setEditData({
      type: 'k5-group',
      api: 'k5-pemeriksaan',
      name: `${group.bulan} ${group.tahun}`,
      groupItems: Object.values(group.jabatan).filter(Boolean),
    });

    setEditForm({
      bulan: group.bulan ?? '',
      tahun: group.tahun ?? '',
      jabatan: k5JabatanOptions.reduce((values, jabatan) => ({
        ...values,
        [jabatan]: k5NumberFields.reduce((values, [field]) => ({
          ...values,
          [field]: Number(group.jabatan[jabatan]?.[field] ?? 0),
        }), createK5JabatanValues()),
      }), {}),
    });
    setActiveMenu('EDIT');
  };

  const handleEditK5JabatanChange = (jabatan, field, value) => {
    setEditForm((prev) => ({
      ...prev,
      jabatan: {
        ...prev.jabatan,
        [jabatan]: {
          ...prev.jabatan?.[jabatan],
          [field]: numericValue(value),
        },
      },
    }));
  };

  const handleEditChange = (event) => {
    const { name, value, type } = event.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: (type === 'number' || name === 'id_kota') ? numericValue(value) : value,
    }));
  };

  const saveEdit = async (event) => {
    event.preventDefault();

    if (!editData) return;

    if (editData.type === 'k1-group') {
      try {
        const responses = await Promise.all(editData.groupItems.map((item) => {
          const jabatan = item.jabatan;
          const values = editForm.jabatan?.[jabatan] ?? {};
          return fetch(`http://127.0.0.1:8000/api/k1-pengawas/${item.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
              bulan: editForm.bulan,
              tahun: editForm.tahun,
              jabatan,
              ...values,
            }),
          });
        }));

        if (responses.some((response) => !response.ok)) {
          alert('Gagal menyimpan perubahan data K1');
          return;
        }

        alert('Perubahan data K1 berhasil disimpan');
        fetchK1();
        setEditData(null);
        setEditForm({});
        setActiveMenu(lastReportMenu || 'K1');
      } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat menyimpan perubahan data K1');
      }
      return;
    }

    if (editData.type === 'k5-group') {
      try {
        const responses = await Promise.all(editData.groupItems.map((item) => {
          const jabatan = item.jabatan_pengawas;
          const values = editForm.jabatan?.[jabatan] ?? {};
          return fetch(`http://127.0.0.1:8000/api/k5-pemeriksaan/${item.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
              bulan: editForm.bulan,
              tahun: editForm.tahun,
              jabatan_pengawas: jabatan,
              ...values,
            }),
          });
        }));

        if (responses.some((response) => !response.ok)) {
          alert('Gagal menyimpan perubahan data K5');
          return;
        }

        alert('Perubahan data K5 berhasil disimpan');
        fetchK5();
        setEditData(null);
        setEditForm({});
        setActiveMenu(lastReportMenu || 'K5');
      } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat menyimpan perubahan data K5');
      }
      return;
    }

    const response = await fetch(`http://127.0.0.1:8000/api/${editData.api}/${editData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(editForm),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => null);
      console.error(result);
      alert('Gagal menyimpan perubahan');
      return;
    }

    alert('Perubahan berhasil disimpan');
    editData.cb();
    setEditData(null);
    setEditForm({});
    setActiveMenu(lastReportMenu || 'K1');
  };

  const renderRowActions = (item, api, cb, name = getDeleteName(item)) => (
    <div className="flex items-center justify-center gap-2">
      <button onClick={() => openEditPage(item, api, cb, name)} className="p-1.5 bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition shadow-sm" title="Edit Data"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button>
      <button onClick={() => del(item.id, api, cb, name)} className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition shadow-sm" title="Hapus Data"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
    </div>
  );

  const renderDetailButton = (rowId) => {
    const isExpanded = expandedRow === rowId;
    return (
      <button
        onClick={() => toggleRow(rowId)}
        className={`text-xs font-medium flex items-center justify-center gap-1 px-3 py-1.5 rounded transition ${isExpanded ? 'bg-[#071A2F] text-white' : 'bg-slate-100 text-[#071A2F] hover:bg-[#071A2F]/5'}`}
        title={isExpanded ? 'Tutup Detail' : 'Lihat Detail'}
      >
        {isExpanded ? 'Tutup' : 'Detail'}
        <svg className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>
    );
  };

  const renderDetailPanel = (colSpan, title, fields) => (
    <tr>
      <td colSpan={colSpan} className="p-0 border-b border-slate-300">
        <div className="bg-slate-100 p-6 shadow-inner">
          <h4 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-300">{title}</h4>
          <div className="bg-white p-4 rounded-md shadow-sm border border-slate-200">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3 text-sm">
              {fields.map(([label, value]) => (
                <div key={label} className="flex justify-between items-center border-b border-dashed border-slate-100 pb-1.5">
                  <span className="text-slate-500">{label}</span>
                  <span className="font-medium text-slate-800">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </td>
    </tr>
  );

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

    const formData = new FormData();
    formData.append('profile_photo', file);

    setIsUploadingProfilePhoto(true);

    router.post('/profile/photo', formData, {
      forceFormData: true,
      preserveScroll: true,
      onError: (errors) => {
        const message = errors?.profile_photo || errors?.message || 'Gagal mengubah foto profil. Pastikan file berupa JPG, PNG, atau WebP maksimal 2MB.';
        alert(Array.isArray(message) ? message[0] : message);
      },
      onSuccess: () => {
        router.reload({ only: ['auth'], preserveScroll: true });
      },
      onFinish: () => {
        setIsUploadingProfilePhoto(false);
        event.target.value = '';
      },
    });
  };

  const saveProfileName = () => {
    const nextName = profileNameInput.trim();

    if (!nextName) {
      alert('Nama tidak boleh kosong');
      return;
    }

    setProfileName(nextName);
    localStorage.setItem('profile_name', nextName);
    setIsEditingProfileName(false);
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
    <aside className="w-72 bg-gradient-to-b from-[#071A2F] via-[#0A2540] to-[#071A2F] text-white flex flex-col h-screen fixed border-r border-white/5">
      {/* Brand */}
      <div className="px-5 py-5 flex items-center gap-3 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-yellow-400/20 shrink-0 overflow-hidden">
          <img src="/image/logo_dnk.jpg" alt="Logo Disnakertrans" className="w-8 h-8 object-contain" />
        </div>
        <div className="min-w-0">
          <h1 className="text-base font-bold tracking-tight leading-tight truncate">
            Inspecto <span className="text-yellow-400 font-bold">UPTD</span>
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
                    <svg className={`w-[18px] h-[18px] shrink-0 transition-colors ${isParentActive(menu) ? 'text-yellow-400' : 'text-slate-500 group-hover:text-slate-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
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
                                ? 'bg-yellow-400 text-[#071A2F] font-semibold shadow-sm'
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
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#071A2F] font-semibold shadow-md shadow-yellow-500/25'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
                  }`}
                >
                  <svg className={`w-[18px] h-[18px] shrink-0 ${activeMenu === menu.id ? 'text-[#071A2F]' : 'text-slate-500 group-hover:text-slate-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                    <path strokeLinecap="round" strokeLinejoin="round" d={menu.icon} />
                  </svg>
                  <span className="truncate">{menu.short} <span className={`font-normal text-[13px] ${activeMenu === menu.id ? 'opacity-90 text-[#071A2F]' : 'opacity-90'}`}>- {menu.label}</span></span>
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

  const renderEditTextInput = (name, label, type = 'number', extraClass = '') => (
    <div className={extraClass}>
      <label className="block text-sm font-medium text-slate-600 mb-1.5">{label}</label>
      <input
        name={name}
        type={type}
        min={type === 'number' ? '0' : undefined}
        value={editForm[name] ?? ''}
        onChange={handleEditChange}
        placeholder={type === 'number' ? '0' : undefined}
        className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
    </div>
  );

  const renderEditMonthSelect = () => (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-1.5">Bulan</label>
      <select name="bulan" value={editForm.bulan ?? ''} onChange={handleEditChange} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-400">
        <option value="Januari">Januari</option><option value="Februari">Februari</option><option value="Maret">Maret</option>
        <option value="April">April</option><option value="Mei">Mei</option><option value="Juni">Juni</option>
        <option value="Juli">Juli</option><option value="Agustus">Agustus</option><option value="September">September</option>
        <option value="Oktober">Oktober</option><option value="November">November</option><option value="Desember">Desember</option>
      </select>
    </div>
  );

  const renderEditKotaSelect = () => (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-1.5">Kabupaten/Kota</label>
      <select name="id_kota" value={editForm.id_kota ?? ''} onChange={handleEditChange} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-400">
        {renderKabKotaOptions()}
      </select>
    </div>
  );

  const closeEditPage = () => {
    setEditData(null);
    setEditForm({});
    setActiveMenu(lastReportMenu || 'K1');
  };

  const renderEditActions = (submitLabel = 'Simpan Perubahan') => (
    <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
      <button type="button" onClick={closeEditPage} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">Kembali</button>
      <button type="submit" className="px-6 py-2.5 bg-[#071A2F] text-white text-sm font-semibold rounded-lg hover:bg-[#0A2540] shadow-sm hover:shadow-md transition-all active:scale-[0.98]">{submitLabel}</button>
    </div>
  );

  const renderStructuredEditPage = () => {
    if (!editData) return null;

    if (editData.type === 'k1-group') {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70">
          <div className="p-5 border-b border-slate-100 bg-slate-50/60">
            <h3 className="font-semibold text-slate-800">Edit Data K1</h3>
            <p className="text-xs text-slate-500 mt-1">Pengawas Ketenagakerjaan &mdash; {editForm.bulan} {editForm.tahun}</p>
          </div>

          <form className="p-6 space-y-8" onSubmit={saveEdit}>
            <section>
              <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">1. Informasi Umum</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {renderEditMonthSelect()}
                {renderEditTextInput('tahun', 'Tahun')}
              </div>
            </section>

            <section>
              <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">2. Data Pengawas Ketenagakerjaan</h4>
              <div className="space-y-6">
                {k1JabatanOptions.map((jabatan) => (
                  <div key={jabatan} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                    <p className="font-semibold text-[#071A2F] mb-3 text-sm">Pengawas {jabatan}</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {k1NumberFields.map((field) => (
                        <div key={`${jabatan}-${field.key}`}>
                          <label className="block text-xs font-medium text-slate-500 mb-1.5">{field.label}</label>
                          <input type="number" min="0"
                            value={editForm.jabatan?.[jabatan]?.[field.key] ?? 0}
                            onChange={(e) => handleEditK1JabatanChange(jabatan, field.key, e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-center transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {renderEditActions('Simpan Perubahan')}
          </form>
        </div>
      );
    }

    if (editData.api === 'k2-objek-pengawasan') {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70">
          <div className="p-5 border-b border-slate-100 bg-slate-50/60">
            <h3 className="font-semibold text-slate-800">Form Edit Data K2</h3>
            <p className="text-xs text-slate-500 mt-1">Pastikan data yang diedit sesuai dengan format berkas laporan / excel uptd.xlsx</p>
          </div>
          <form className="p-6 space-y-8" onSubmit={saveEdit}>
            <section>
              <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">1. Informasi Umum</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {renderEditMonthSelect()}
                {renderEditTextInput('tahun', 'Tahun')}
                {renderEditKotaSelect()}
                {renderEditTextInput('jml_perusahaan', 'Total Jumlah Perusahaan')}
              </div>
            </section>

            <section>
              <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">2. Jumlah Tenaga Kerja</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#071A2F]/5 p-4 rounded-lg border border-[#071A2F]/10">
                  <p className="font-semibold text-[#071A2F] mb-3 text-sm">Warga Negara Indonesia (WNI)</p>
                  <div className="grid grid-cols-2 gap-4">
                    {renderEditTextInput('tk_wni_l', 'Laki-Laki (L)')}
                    {renderEditTextInput('tk_wni_p', 'Perempuan (P)')}
                  </div>
                </div>
                <div className="bg-[#071A2F]/5 p-4 rounded-lg border border-[#071A2F]/10">
                  <p className="font-semibold text-[#071A2F] mb-3 text-sm">Warga Negara Asing (WNA)</p>
                  <div className="grid grid-cols-2 gap-4">
                    {renderEditTextInput('tk_wna_l', 'Laki-Laki (L)')}
                    {renderEditTextInput('tk_wna_p', 'Perempuan (P)')}
                  </div>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <section>
                <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">3. Kategori Perusahaan</h4>
                <div className="grid grid-cols-2 gap-4 bg-yellow-50/30 p-4 border border-yellow-100 rounded-lg">
                  {renderEditTextInput('kat_mikro', 'Mikro')}
                  {renderEditTextInput('kat_kecil', 'Kecil')}
                  {renderEditTextInput('kat_menengah', 'Menengah')}
                  {renderEditTextInput('kat_besar', 'Besar')}
                </div>
              </section>

              <section>
                <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">4. Kelembagaan & Hub. Industrial</h4>
                <div className="grid grid-cols-2 gap-4 bg-green-50/30 p-4 border border-green-100 rounded-lg">
                  {renderEditTextInput('hi_pp', 'PP')}
                  {renderEditTextInput('hi_pkb', 'PKB')}
                  {renderEditTextInput('hi_sp_sb', 'SP/SB')}
                  {renderEditTextInput('hi_tripartit', 'Tripartit')}
                </div>
              </section>
            </div>

            <section>
              <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">5. Status Perusahaan & Penghargaan</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-4 border border-slate-200 rounded-lg">
                {renderEditTextInput('stat_swasta', 'Swasta')}
                {renderEditTextInput('stat_persero', 'Persero')}
                {renderEditTextInput('stat_perum', 'Perum')}
                {renderEditTextInput('stat_bumd', 'BUMD')}
                {renderEditTextInput('stat_yayasan', 'Yayasan')}
                {renderEditTextInput('stat_koperasi', 'Koperasi')}
                {renderEditTextInput('stat_perseorangan', 'Perseorangan')}
                {renderEditTextInput('stat_joint', 'Joint')}
                <div className="md:col-span-2 lg:col-span-4">
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">Penghargaan K3</label>
                  <textarea name="penghargaan_k3" value={editForm.penghargaan_k3 ?? ''} onChange={handleEditChange} rows="3" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                </div>
              </div>
            </section>

            {renderEditActions()}
          </form>
        </div>
      );
    }

    if (editData.api === 'k3-objek-k3') {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70">
          <div className="p-5 border-b border-slate-100 bg-slate-50/60">
            <h3 className="font-semibold text-slate-800">Form Edit Data K3</h3>
            <p className="text-xs text-slate-500 mt-1">Objek K3 / Kelembagaan K3</p>
          </div>
          <form className="p-6 space-y-8" onSubmit={saveEdit}>
            <section>
              <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">1. Informasi Umum</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {renderEditMonthSelect()}
                {renderEditTextInput('tahun', 'Tahun')}
                {renderEditKotaSelect()}
              </div>
            </section>

            {k3FieldGroups.map((group) => {
              const colors = k3ColorClasses[group.color];
              return (
                <section key={group.title}>
                  <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">{group.title}</h4>
                  <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 border rounded-lg ${colors.box}`}>
                    {group.fields.map(([key, label]) => renderEditTextInput(key, label))}
                  </div>
                </section>
              );
            })}

            {renderEditActions()}
          </form>
        </div>
      );
    }

    if (editData.api === 'k4-jamsostek') {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70">
          <div className="p-5 border-b border-slate-100 bg-slate-50/60">
            <h3 className="font-semibold text-slate-800">Form Edit Data K4</h3>
            <p className="text-xs text-slate-500 mt-1">Jamsostek / BPJS Ketenagakerjaan</p>
          </div>
          <form className="p-6 space-y-8" onSubmit={saveEdit}>
            <section>
              <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">1. Informasi Umum</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {renderEditMonthSelect()}
                {renderEditTextInput('tahun', 'Tahun')}
                {renderEditKotaSelect()}
              </div>
            </section>

            {k4FieldGroups.map((group) => {
              const colors = k3ColorClasses[group.color];
              return (
                <section key={group.title}>
                  <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">{group.title}</h4>
                  <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 border rounded-lg ${colors.box}`}>
                    {group.fields.map(([key, label]) => renderEditTextInput(key, label))}
                  </div>
                </section>
              );
            })}

            {renderEditActions()}
          </form>
        </div>
      );
    }


    if (editData.type === 'k5-group') {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70">
          <div className="p-5 border-b border-slate-100 bg-slate-50/60">
            <h3 className="font-semibold text-slate-800">Edit Data</h3>
            <p className="text-xs text-slate-500 mt-1">Pengawas Ketenagakerjaan &mdash; {editForm.bulan} {editForm.tahun}</p>
          </div>
          <form className="p-6 space-y-8" onSubmit={saveEdit}>
            <section>
              <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">1. Informasi Umum</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {renderEditMonthSelect()}
                {renderEditTextInput('tahun', 'Tahun')}
              </div>
            </section>

            <section>
              <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">2. Data Pengawas Ketenagakerjaan</h4>
              <div className="space-y-6">
                {k5JabatanOptions.map((jabatan) => (
                  <div key={jabatan} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                    <p className="font-semibold text-[#071A2F] mb-3 text-sm">Pengawas {jabatan}</p>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1.5">Jumlah</label>
                        <input
                          type="number"
                          min="0"
                          value={editForm.jabatan?.[jabatan]?.jml_pengawas ?? 0}
                          onChange={(e) => handleEditK5JabatanChange(jabatan, 'jml_pengawas', e.target.value)}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                        />
                      </div>

                      {k5FieldGroups.map((group) => {
                        const colors = k3ColorClasses[group.color];
                        return (
                          <div key={`${jabatan}-${group.title}`} className={`border rounded-lg p-4 ${colors.box}`}>
                            <h6 className={`text-xs font-bold uppercase mb-3 flex items-center gap-2 ${colors.text}`}>
                              <div className={`w-2 h-2 rounded-full ${colors.dot}`}></div>
                              {group.title}
                            </h6>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                              {group.fields.map(([key, label]) => (
                                <div key={`${jabatan}-${key}`}>
                                  <label className="block text-xs font-medium text-slate-500 mb-1.5">{label}</label>
                                  <input
                                    type="number"
                                    min="0"
                                    value={editForm.jabatan?.[jabatan]?.[key] ?? 0}
                                    onChange={(e) => handleEditK5JabatanChange(jabatan, key, e.target.value)}
                                    className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {renderEditActions('Simpan Perubahan')}
          </form>
        </div>
      );
    }

    return null;
  };

  const renderEditPage = () => {
    const structuredEditPage = renderStructuredEditPage();

    if (structuredEditPage) return structuredEditPage;

    return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/60">
        <h3 className="text-lg font-bold text-slate-800">Edit Data</h3>
        <p className="text-sm text-slate-500 mt-1">Ubah data {editData?.name ?? ''}, lalu simpan perubahan.</p>
      </div>

      <form onSubmit={saveEdit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(editForm).map(([key, value]) => {
            const isLongText = String(value ?? '').length > 80 || ['keterangan', 'dugaan_pelanggaran', 'proses'].includes(key);
            const isKota = key === 'id_kota';
            const isNumber = !isKota && (typeof value === 'number' || ['tahun', 'nilai'].includes(key) || key.startsWith('spesialis_') || /^(jml_|tk_|kat_|stat_|hi_|prog_|keg_|uji_|hukum_|pesawat_|bejana_|sumber_|akibat_|santunan_|pelanggaran_|putusan_|korban_|tipe_|dokter_|paramedis_|riksa_|lainnya|ppns|paa|ptp|listrik|elevator|petir|kebakaran|konstruksi|klinik|lingkungan|kimia|makan|p2k3|keracunan|meninggal|pak|ahli_k3|pjk3|pmi|thr|pesangon)/.test(key));

            return (
              <div key={key} className={isLongText ? 'md:col-span-2 lg:col-span-3' : ''}>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
                  {isKota ? 'Kabupaten/Kota' : key.replace(/_/g, ' ')}
                </label>

                {isKota ? (
                  <select
                    name="id_kota"
                    value={value ?? ''}
                    onChange={handleEditChange}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow"
                  >
                    {renderKabKotaOptions()}
                  </select>
                ) : isLongText ? (
                  <textarea
                    name={key}
                    value={value}
                    onChange={handleEditChange}
                    rows="3"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow"
                  />
                ) : (
                  <input
                    name={key}
                    type={isNumber ? 'number' : 'text'}
                    value={value}
                    onChange={handleEditChange}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow"
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={closeEditPage}
            className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition"
          >
            Kembali
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#071A2F] text-white text-sm font-semibold rounded-lg hover:bg-[#0A2540] shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
    );
  };

  const renderProfilePage = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/60">
          <h3 className="text-lg font-bold text-slate-800">Profil Saya</h3>
          <p className="text-sm text-slate-500 mt-1">Kelola informasi akun dan keamanan login Anda.</p>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#0A2540] to-[#071A2F] text-white flex items-center justify-center overflow-hidden text-5xl font-bold shadow-lg shadow-[#071A2F]/20 ring-4 ring-yellow-100">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Foto profil" className="w-full h-full object-cover" />
              ) : (
                userInitial
              )}
            </div>

            <label className={`mt-5 inline-flex items-center gap-2 px-4 py-2.5 bg-[#071A2F] text-white text-sm font-semibold rounded-lg transition-all shadow-sm cursor-pointer active:scale-[0.98] ${isUploadingProfilePhoto ? 'opacity-70 pointer-events-none' : 'hover:bg-[#0A2540] hover:shadow-md'}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16 7l-4-4m0 0L8 7m4-4v14" />
              </svg>
              {isUploadingProfilePhoto ? 'Mengunggah...' : 'Ubah Foto'}
              <input type="file" accept="image/*" onChange={handleProfilePhotoChange} disabled={isUploadingProfilePhoto} className="hidden" />
            </label>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">Nama</label>
                {isEditingProfileName ? (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={profileNameInput}
                      onChange={(event) => setProfileNameInput(event.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm font-semibold"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={saveProfileName}
                      className="px-4 py-2.5 bg-[#071A2F] text-white text-sm font-semibold rounded-lg hover:bg-[#0A2540] transition-all shadow-sm"
                    >
                      Simpan
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileNameInput(profileName);
                        setIsEditingProfileName(false);
                      }}
                      className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-50 transition-all shadow-sm"
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-full border border-slate-200 bg-slate-50 text-slate-800 rounded-lg px-4 py-3 text-sm font-semibold">
                      {profileName}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileNameInput(profileName);
                        setIsEditingProfileName(true);
                      }}
                      className="px-4 py-2.5 bg-amber-100 text-amber-700 text-sm font-semibold rounded-lg hover:bg-amber-200 transition-all shadow-sm"
                    >
                      Ubah
                    </button>
                  </div>
                )}
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
              className="px-4 py-2.5 bg-[#071A2F] text-white text-sm font-semibold rounded-lg hover:bg-[#0A2540] transition-all shadow-sm"
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
                  <tr className={`border-b transition-colors ${isExpanded ? 'bg-[#071A2F]/5' : 'bg-white hover:bg-slate-50'}`}>
                    <td className="px-5 py-3">{item.bulan}</td>
                    <td className="px-5 py-3">{item.tahun}</td>
                    <td className="px-5 py-3 font-medium text-slate-800">{getKotaName(item)}</td>
                    <td className="px-5 py-3 text-center font-semibold text-[#071A2F]">{Number(item.jml_perusahaan ?? 0).toLocaleString()}</td>
                    <td className="px-5 py-3 text-center font-semibold text-[#071A2F]">{totalTK.toLocaleString()}</td>
                    <td className="px-5 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => toggleRow(item.id)}
                          className={`text-xs font-medium flex items-center justify-center gap-1 px-3 py-1.5 rounded transition ${isExpanded ? 'bg-[#071A2F] text-white' : 'bg-slate-100 text-[#071A2F] hover:bg-[#071A2F]/5'}`}
                          title={isExpanded ? 'Tutup Detail' : 'Lihat Detail'}
                        >
                          {isExpanded ? 'Tutup' : 'Detail'}
                          <svg className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        {renderRowActions(item, 'k2-objek-pengawasan', fetchK2, getKotaName(item))}
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
                              <h5 className="text-xs font-bold text-[#071A2F] uppercase mb-3 flex items-center gap-2"><div className="w-2 h-2 bg-[#071A2F] rounded-full"></div> Tenaga Kerja</h5>
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
          <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">1. Informasi Umum</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Bulan</label>
              <select name="bulan" value={formData.bulan} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-400">
                <option value="Januari">Januari</option><option value="Februari">Februari</option><option value="Maret">Maret</option>
                <option value="April">April</option><option value="Mei">Mei</option><option value="Juni">Juni</option>
                <option value="Juli">Juli</option><option value="Agustus">Agustus</option><option value="September">September</option>
                <option value="Oktober">Oktober</option><option value="November">November</option><option value="Desember">Desember</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Tahun</label>
              <input name="tahun" type="number" value={formData.tahun} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Kabupaten/Kota</label>
              <select name="id_kota" value={formData.id_kota} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-400">{renderKabKotaOptions()}</select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Total Jumlah Perusahaan</label>
              <input name="jml_perusahaan" type="number" value={formData.jml_perusahaan} onChange={handleChange} placeholder="0" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-slate-50" />
            </div>
          </div>
        </section>

        <section>
          <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">2. Jumlah Tenaga Kerja</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#071A2F]/5 p-4 rounded-lg border border-[#071A2F]/10">
              <p className="font-semibold text-[#071A2F] mb-3 text-sm">Warga Negara Indonesia (WNI)</p>
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
            <div className="bg-[#071A2F]/5 p-4 rounded-lg border border-[#071A2F]/10">
              <p className="font-semibold text-[#071A2F] mb-3 text-sm">Warga Negara Asing (WNA)</p>
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
            <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">3. Kategori Perusahaan</h4>
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
            <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">4. Kelembagaan & Hub. Industrial</h4>
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
          <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">5. Status Kepemilikan Perusahaan</h4>
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
          <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">6. Keterangan / Penghargaan K3</h4>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Penghargaan K3 yang dimiliki perusahaan</label>
            <textarea
              name="penghargaan_k3"
              rows="3"
              value={formData.penghargaan_k3}
              onChange={handleChange}
              placeholder="Contoh: 15 Perusahaan mendapat Zero Accident, 5 Perusahaan mendapat Sertifikat SMK3..."
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-400"
            ></textarea>
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button type="button" onClick={() => setActiveTab('lihat')} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">
            Batal
          </button>
          <button type="submit" className="px-6 py-2.5 bg-[#071A2F] text-white text-sm font-semibold rounded-lg hover:bg-[#0A2540] shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
            Simpan Data
          </button>
        </div>
      </form>
    </div>
  );

  const renderViewDataK1 = () => {
    // 1. Kelompokkan dataK1 berdasarkan bulan & tahun yang sama
    const groupedK1 = dataK1.reduce((groups, item) => {
      const key = `${item.bulan}-${item.tahun}`;

      if (!groups[key]) {
        groups[key] = {
          key,
          bulan: item.bulan,
          tahun: item.tahun,
          jabatan: {}, // { Pertama: item, Muda: item, Madya: item }
        };
      }

      groups[key].jabatan[item.jabatan] = item;

      return groups;
    }, {});

    const groupedK1List = Object.values(groupedK1);

    // Helper untuk menjumlahkan sebuah field numerik dari ke-3 jabatan dalam satu grup
    const sumJabatanField = (group, field) => k1JabatanOptions.reduce(
      (total, jabatan) => total + Number(group.jabatan[jabatan]?.[field] ?? 0),
      0
    );

    const deleteK1Group = async (group) => {
      const name = `${group.bulan} ${group.tahun}`;
      const items = Object.values(group.jabatan).filter(Boolean);

      if (!items.length) return;

      if (window.confirm(`Apakah Anda yakin ingin menghapus ${name}?`)) {
        const responses = await Promise.all(items.map((item) => (
          fetch(`http://127.0.0.1:8000/api/k1-pengawas/${item.id}`, { method: 'DELETE' })
        )));

        if (responses.every((response) => response.ok)) {
          fetchK1();
        }
      }
    };

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-slate-800">Tabel Rekapitulasi Data K1</h3>
            <p className="text-xs text-slate-500 mt-1">Rekap per Bulan &mdash; Gabungan Jabatan Pertama, Muda &amp; Madya</p>
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
                <th className="px-5 py-4 text-center">Total Pengawas Umum</th>
                <th className="px-5 py-4 text-center">Total PPNS</th>
                <th className="px-5 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {groupedK1List.map((group) => {
                const isExpanded = expandedRow === `k1-${group.key}`;
                const totalPengawasUmum = sumJabatanField(group, 'pengawas_umum');
                const totalPpns = sumJabatanField(group, 'ppns');

                return (
                  <React.Fragment key={`k1-${group.key}`}>
                    <tr className={`border-b transition-colors ${isExpanded ? 'bg-[#071A2F]/5' : 'bg-white hover:bg-slate-50'}`}>
                      <td className="px-5 py-3 font-medium text-slate-800">{group.bulan}</td>
                      <td className="px-5 py-3">{group.tahun}</td>
                      <td className="px-5 py-3 text-center font-semibold text-[#071A2F]">{totalPengawasUmum.toLocaleString()}</td>
                      <td className="px-5 py-3 text-center font-semibold text-[#071A2F]">{totalPpns.toLocaleString()}</td>
                      <td className="px-5 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {renderDetailButton(`k1-${group.key}`)}
                          <button onClick={() => openK1GroupEditPage(group)} className="p-1.5 bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition shadow-sm" title="Edit Data">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                          </button>
                          <button onClick={() => deleteK1Group(group)} className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition shadow-sm" title="Hapus Data"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr>
                        <td colSpan="5" className="p-0 border-b border-slate-300">
                          <div className="bg-slate-100 p-6 shadow-inner">
                            <h4 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-300">
                              Rincian per Jabatan &mdash; {group.bulan} {group.tahun}
                            </h4>
                            <div className="overflow-x-auto bg-white rounded-lg border border-slate-200 shadow-sm">
                              <table className="w-full text-sm text-left">
                                <thead className="text-[11px] text-slate-500 uppercase tracking-wide bg-slate-50 border-b border-slate-200 font-semibold">
                                  <tr>
                                    <th className="px-4 py-3 sticky left-0 bg-slate-50">Rincian</th>
                                    {k1JabatanOptions.map((jabatan) => {
                                      const jabatanItem = group.jabatan[jabatan];
                                      return (
                                        <th key={jabatan} className="px-4 py-3 text-center min-w-[150px]">
                                          <span>{jabatan}</span>
                                        </th>
                                      );
                                    })}
                                  </tr>
                                </thead>
                                <tbody>
                                  {k1NumberFields.map((field, idx) => (
                                    <tr key={field.key} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                                      <td className="px-4 py-2.5 sticky left-0 font-medium text-slate-600 bg-inherit">{field.label}</td>
                                      {k1JabatanOptions.map((jabatan) => {
                                        const jabatanItem = group.jabatan[jabatan];
                                        return (
                                          <td key={jabatan} className="px-4 py-2.5 text-center font-semibold text-slate-800">
                                            {jabatanItem ? Number(jabatanItem[field.key] ?? 0).toLocaleString() : '-'}
                                          </td>
                                        );
                                      })}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
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
  };

  const renderViewDataK3 = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-slate-800">Tabel Rekapitulasi Data K3</h3>
          <p className="text-xs text-slate-500 mt-1">Klik "Detail" untuk melihat rincian Objek K3 per Kabupaten/Kota</p>
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
              <th className="px-5 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataK3.map((item) => {
              const isExpanded = expandedRow === `k3-${item.id}`;

              return (
                <React.Fragment key={item.id}>
                  <tr className={`border-b transition-colors ${isExpanded ? 'bg-[#071A2F]/5' : 'bg-white hover:bg-slate-50'}`}>
                    <td className="px-5 py-3">{item.bulan}</td>
                    <td className="px-5 py-3">{item.tahun}</td>
                    <td className="px-5 py-3 font-medium text-slate-800">{getKotaName(item)}</td>
                    <td className="px-5 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {renderDetailButton(`k3-${item.id}`)}
                        {renderRowActions(item, 'k3-objek-k3', fetchK3, getKotaName(item))}
                      </div>
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr>
                      <td colSpan="4" className="p-0 border-b border-slate-300">
                        <div className="bg-slate-100 p-6 shadow-inner">
                          <h4 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-300">Rincian Data: {getKotaName(item)} ({item.bulan} {item.tahun})</h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {k3FieldGroups.map((group) => {
                              const colors = k3ColorClasses[group.color];
                              return (
                                <div key={group.title} className="bg-white p-4 rounded-md shadow-sm border border-slate-200">
                                  <h5 className={`text-xs font-bold uppercase mb-3 flex items-center gap-2 ${colors.text}`}>
                                    <div className={`w-2 h-2 rounded-full ${colors.dot}`}></div>
                                    {group.title.replace(/^\d+\.\s*/, '')}
                                  </h5>
                                  <div className="space-y-2 text-sm">
                                    {group.fields.map(([key, label]) => (
                                      <div key={key} className="flex justify-between items-center">
                                        <span className="text-slate-500">{label}</span>
                                        <span className="font-medium">{Number(item[key] ?? 0).toLocaleString()}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
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
              <th className="px-5 py-4 text-center">JMLH TK BPJS</th>
              <th className="px-5 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataK4.map((item) => {
              const isExpanded = expandedRow === `k4-${item.id}`;
              const totalTkBpjs = Number(item.tk_wni_bpjs ?? 0) + Number(item.tk_wna_bpjs ?? 0);

              return (
                <React.Fragment key={item.id}>
                  <tr className={`border-b transition-colors ${isExpanded ? 'bg-[#071A2F]/5' : 'bg-white hover:bg-slate-50'}`}>
                    <td className="px-5 py-3">{item.bulan}</td>
                    <td className="px-5 py-3">{item.tahun}</td>
                    <td className="px-5 py-3 font-medium text-slate-800">{getKotaName(item)}</td>
                    <td className="px-5 py-3 text-center font-semibold text-[#071A2F]">{Number(item.jml_perusahaan_bpjs ?? 0).toLocaleString()}</td>
                    <td className="px-5 py-3 text-center font-semibold text-[#071A2F]">{totalTkBpjs.toLocaleString()}</td>
                    <td className="px-5 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {renderDetailButton(`k4-${item.id}`)}
                        {renderRowActions(item, 'k4-jamsostek', fetchK4, getKotaName(item))}
                      </div>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr>
                      <td colSpan="6" className="p-0 border-b border-slate-300">
                        <div className="bg-slate-100 p-6 shadow-inner">
                          <h4 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-300">Rincian Data: {getKotaName(item)} ({item.bulan} {item.tahun})</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {k4FieldGroups.map((group) => {
                              const colors = k3ColorClasses[group.color];
                              return (
                                <div key={group.title} className="bg-white p-4 rounded-md shadow-sm border border-slate-200">
                                  <h5 className={`text-xs font-bold uppercase mb-3 flex items-center gap-2 ${colors.text}`}>
                                    <div className={`w-2 h-2 rounded-full ${colors.dot}`}></div>
                                    {group.title.replace(/^\d+\.\s*/, '')}
                                  </h5>
                                  <div className="space-y-2 text-sm">
                                    {group.fields.map(([key, label]) => (
                                      <div key={key} className="flex justify-between items-center">
                                        <span className="text-slate-500">{label}</span>
                                        <span className="font-medium">{Number(item[key] ?? 0).toLocaleString()}</span>
                                      </div>
                                    ))}
                                    {group.title.startsWith('3.') && (
                                      <>
                                        <div className="border-t border-dashed border-slate-200 my-1"></div>
                                        <div className="flex justify-between items-center">
                                          <span className="text-slate-700 font-semibold">JMLH TK BPJS</span>
                                          <span className="font-bold text-[#071A2F]">{totalTkBpjs.toLocaleString()}</span>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
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

  const renderViewDataK5 = () => {
    // Gabungkan data K5 berdasarkan Bulan + Tahun, sehingga Pertama, Muda,
    // dan Madya tampil dalam satu baris rekap.
    const groupedK5 = dataK5.reduce((groups, item) => {
      const key = `${item.bulan}-${item.tahun}`;
      if (!groups[key]) {
        groups[key] = {
          key,
          bulan: item.bulan,
          tahun: item.tahun,
          jabatan: {},
        };
      }
      groups[key].jabatan[item.jabatan_pengawas] = item;
      return groups;
    }, {});

    const groupedK5List = Object.values(groupedK5);

    const sumK5Field = (group, field) => k5JabatanOptions.reduce(
      (total, jabatan) => total + Number(group.jabatan[jabatan]?.[field] ?? 0),
      0
    );

    const deleteK5Group = async (group) => {
      const name = `${group.bulan} ${group.tahun}`;
      const items = Object.values(group.jabatan).filter(Boolean);
      if (!items.length) return;

      if (window.confirm(`Apakah Anda yakin ingin menghapus data K5 ${name}?`)) {
        const responses = await Promise.all(items.map((item) => (
          fetch(`http://127.0.0.1:8000/api/k5-pemeriksaan/${item.id}`, { method: 'DELETE' })
        )));
        if (responses.every((response) => response.ok)) fetchK5();
      }
    };

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70 overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-slate-800">Tabel Rekapitulasi Data K5</h3>
            <p className="text-xs text-slate-500 mt-1">Rekap per Bulan &mdash; Gabungan Pengawas Pertama, Muda &amp; Madya</p>
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
                <th className="px-5 py-4 text-center">Total Pengawas</th>
                <th className="px-5 py-4 text-center">Total Kegiatan Pemeriksaan</th>
                <th className="px-5 py-4 text-center">Uji Norma Kerja</th>
                <th className="px-5 py-4 text-center">Uji Norma K3</th>
                <th className="px-5 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {groupedK5List.map((group) => {
                const rowId = `k5-${group.key}`;
                const isExpanded = expandedRow === rowId;
                const totalPengawas = sumK5Field(group, 'jml_pengawas');
                const totalKegiatanPemeriksaan =
                  sumK5Field(group, 'keg_pertama') +
                  sumK5Field(group, 'keg_berkala') +
                  sumK5Field(group, 'keg_ulang') +
                  sumK5Field(group, 'keg_khusus');
                const totalNormaKerja = sumK5Field(group, 'uji_norma_kerja');
                const totalNormaK3 = sumK5Field(group, 'uji_norma_k3');

                return (
                  <React.Fragment key={rowId}>
                    <tr className={`border-b transition-colors ${isExpanded ? 'bg-[#071A2F]/5' : 'bg-white hover:bg-slate-50'}`}>
                      <td className="px-5 py-3 font-medium text-slate-800">{group.bulan}</td>
                      <td className="px-5 py-3">{group.tahun}</td>
                      <td className="px-5 py-3 text-center font-semibold text-[#071A2F]">{totalPengawas.toLocaleString()}</td>
                      <td className="px-5 py-3 text-center font-semibold text-[#071A2F]">{totalKegiatanPemeriksaan.toLocaleString()}</td>
                      <td className="px-5 py-3 text-center font-semibold text-[#071A2F]">{totalNormaKerja.toLocaleString()}</td>
                      <td className="px-5 py-3 text-center font-semibold text-[#071A2F]">{totalNormaK3.toLocaleString()}</td>
                      <td className="px-5 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {renderDetailButton(rowId)}
                          <button onClick={() => openK5GroupEditPage(group)} className="p-1.5 bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition shadow-sm" title="Edit Data">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                          </button>
                          <button onClick={() => deleteK5Group(group)} className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition shadow-sm" title="Hapus Data">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
                        </div>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr>
                        <td colSpan="7" className="p-0 border-b border-slate-300">
                          <div className="bg-slate-100 p-6 shadow-inner">
                            <h4 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-300">
                              Rincian Data Pengawas &mdash; {group.bulan} {group.tahun}
                            </h4>
                            <div className="overflow-x-auto bg-white rounded-lg border border-slate-200 shadow-sm">
                              <table className="w-full text-sm text-left">
                                <thead className="text-[11px] text-slate-500 uppercase tracking-wide bg-slate-50 border-b border-slate-200 font-semibold">
                                  <tr>
                                    <th className="px-4 py-3 sticky left-0 bg-slate-50">Rincian</th>
                                    {k5JabatanOptions.map((jabatan) => (
                                      <th key={jabatan} className="px-4 py-3 text-center min-w-[170px]">Pengawas {jabatan}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {[
                                    ['jml_pengawas', 'Jumlah'],
                                    ['keg_pertama', 'Pemeriksaan - Pertama'],
                                    ['keg_berkala', 'Pemeriksaan - Berkala'],
                                    ['keg_ulang', 'Pemeriksaan - Ulang'],
                                    ['keg_khusus', 'Pemeriksaan - Khusus'],
                                    ['uji_norma_kerja', 'Pengujian - Norma Kerja'],
                                    ['uji_norma_k3', 'Pengujian - Norma K3'],
                                    ['hukum_nota_1', 'Pembinaan/Penegakan Hukum - NP. I'],
                                    ['hukum_nota_2', 'Pembinaan/Penegakan Hukum - NP. II'],
                                    ['hukum_lk', 'Pembinaan/Penegakan Hukum - LK'],
                                  ].map(([field, label], idx) => (
                                    <tr key={field} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                                      <td className="px-4 py-2.5 sticky left-0 font-medium text-slate-600 bg-inherit">{label}</td>
                                      {k5JabatanOptions.map((jabatan) => {
                                        const item = group.jabatan[jabatan];
                                        return (
                                          <td key={jabatan} className="px-4 py-2.5 text-center font-semibold text-slate-800">
                                            {item ? Number(item[field] ?? 0).toLocaleString() : '-'}
                                          </td>
                                        );
                                      })}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
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
  };

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
                <th className="px-5 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredDataK6.map((item) => {
                const isExpanded = expandedRow === `k6-${item.id}`;
                const kodeKbli = item.kode_kbli ?? item.kbli?.kode_kbli;
                const keteranganKbli = kbliOptions.find((k) => k.kode === kodeKbli)?.keterangan ?? '-';
                const k6Fields = [
                  ['Kode KBLI', kodeKbli ?? '-'],
                  ['Keterangan KBLI', keteranganKbli],
                  ['Jenis Kegiatan', item.jenis_kegiatan ?? '-'],
                  ['Jml Pelaksanaan', Number(item.jml_pelaksanaan ?? 0).toLocaleString()],
                  ['Keterangan', item.keterangan ?? '-'],
                ];

                return (
                  <React.Fragment key={item.id}>
                    <tr className={`border-b transition-colors ${isExpanded ? 'bg-[#071A2F]/5' : 'bg-white hover:bg-slate-50'}`}>
                      <td className="px-5 py-3">{item.bulan}</td>
                      <td className="px-5 py-3">{item.tahun}</td>
                      <td className="px-5 py-3 font-medium text-slate-800">{getKotaName(item)}</td>
                      <td className="px-5 py-3 font-medium text-slate-700">{kodeKbli}</td>
                      <td className="px-5 py-3">{item.jenis_kegiatan}</td>
                      <td className="px-5 py-3 text-center font-semibold text-[#071A2F]">{Number(item.jml_pelaksanaan ?? 0)}</td>
                      <td className="px-5 py-3">{item.keterangan ?? '-'}</td>
                      <td className="px-5 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {renderDetailButton(`k6-${item.id}`)}
                          {renderRowActions(item, 'k6-kegiatan-kbli', fetchK6, getKotaName(item))}
                        </div>
                      </td>
                    </tr>
                    {isExpanded && renderDetailPanel(8, `Rincian Data ${getActiveTitle()}: ${getKotaName(item)} (${item.bulan} ${item.tahun})`, k6Fields)}
                  </React.Fragment>
                );
              })}
              {filteredDataK6.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-5 py-8 text-center text-slate-500">Belum ada data untuk {getActiveTitle()}.</td>
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
              <th className="px-4 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataK7.map((item) => {
              const isExpanded = expandedRow === `k7-${item.id}`;
              const k7Fields = [
                ['pesawat_uap', 'Pesawat Uap'],
                ['bejana_tekan', 'Bejana Tekan'],
                ['paa', 'PAA (Pesawat Angkat Angkut)'],
                ['ptp', 'PTP (Pesawat Tenaga Produksi)'],
                ['listrik', 'Instalasi Listrik'],
                ['elevator', 'Elevator/Eskalator'],
                ['petir', 'Penyalur Petir'],
                ['kebakaran', 'Proteksi Kebakaran'],
                ['konstruksi', 'Konstruksi Bangunan'],
                ['klinik', 'Klinik Perusahaan'],
                ['lingkungan', 'Lingkungan Kerja'],
                ['kimia', 'Bahan Kimia'],
                ['makan', 'Pengelolaan Makanan'],
                ['p2k3', 'P2K3'],
              ].map(([key, label]) => [label, Number(item[key] ?? 0).toLocaleString()]);

              return (
                <React.Fragment key={item.id}>
                  <tr className={`border-b transition-colors ${isExpanded ? 'bg-[#071A2F]/5' : 'bg-white hover:bg-slate-50'}`}>
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
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {renderDetailButton(`k7-${item.id}`)}
                        {renderRowActions(item, 'k7-perizinan', fetchK7, getKotaName(item))}
                      </div>
                    </td>
                  </tr>
                  {isExpanded && renderDetailPanel(17, `Rincian Data K7: ${getKotaName(item)} (${item.bulan} ${item.tahun})`, k7Fields)}
                </React.Fragment>
              );
            })}
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

      <form className="p-6 space-y-8" onSubmit={handleSubmitK1}>
        <section>
          <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">
            1. Informasi Umum
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Bulan</label>
              <select name="bulan" value={formDataK1.bulan} onChange={handleChangeK1}
                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-400">
                {['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'].map((bulan) => (
                  <option key={bulan} value={bulan}>{bulan}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Tahun</label>
              <input name="tahun" type="number" min="2000" value={formDataK1.tahun} onChange={handleChangeK1}
                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            </div>
          </div>
        </section>

        <section>
          <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">
            2. Data Pengawas Ketenagakerjaan
          </h4>
          <div className="space-y-6">
            {k1JabatanOptions.map((jabatan) => (
              <div key={jabatan} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <p className="font-semibold text-[#071A2F] mb-3 text-sm">Pengawas {jabatan}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {k1NumberFields.map((field) => (
                    <div key={`${jabatan}-${field.key}`}>
                      <label className="block text-xs font-medium text-slate-500 mb-1.5">{field.label}</label>
                      <input type="number" min="0"
                        value={formDataK1.jabatan[jabatan][field.key]}
                        onChange={(e) => handleChangeK1Jabatan(jabatan, field.key, e.target.value)}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-center transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-400" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button type="button" onClick={() => setActiveTab('lihat')} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">Batal</button>
          <button type="submit" className="px-6 py-2.5 bg-[#071A2F] text-white text-sm font-semibold rounded-lg hover:bg-[#0A2540] shadow-sm hover:shadow-md transition-all active:scale-[0.98]">Simpan Semua Data K1</button>
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
        <section>
          <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">1. Informasi Umum</h4>
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
        </section>

        {k3FieldGroups.map((group) => {
          const colors = k3ColorClasses[group.color];
          return (
            <section key={group.title}>
              <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">{group.title}</h4>
              <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 border rounded-lg ${colors.box}`}>
                {group.fields.map(([key, label]) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">{label}</label>
                    <input name={key} type="number" min="0" value={formDataK3[key]} onChange={handleChangeK3} placeholder="0" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button type="button" onClick={() => setActiveTab('lihat')} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">Batal</button>
          <button type="submit" className="px-6 py-2.5 bg-[#071A2F] text-white text-sm font-semibold rounded-lg hover:bg-[#0A2540] shadow-sm hover:shadow-md transition-all active:scale-[0.98]">Simpan Data</button>
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
        <section>
          <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">1. Informasi Umum</h4>
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
          </div>
        </section>

        {k4FieldGroups.map((group) => {
          const colors = k3ColorClasses[group.color];
          return (
            <section key={group.title}>
              <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">{group.title}</h4>
              <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 border rounded-lg ${colors.box}`}>
                {group.fields.map(([key, label]) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">{label}</label>
                    <input name={key} type="number" min="0" value={formDataK4[key]} onChange={handleChangeK4} placeholder="0" className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow" />
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button type="button" onClick={() => setActiveTab('lihat')} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">Batal</button>
          <button type="submit" className="px-6 py-2.5 bg-[#071A2F] text-white text-sm font-semibold rounded-lg hover:bg-[#0A2540] shadow-sm hover:shadow-md transition-all active:scale-[0.98]">Simpan Data</button>
        </div>
      </form>
    </div>
  );

  const renderInputFormK5 = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/70">
      <div className="p-5 border-b border-slate-100 bg-slate-50/60">
        <h3 className="font-semibold text-slate-800">Form Input Data K5 Baru</h3>
        <p className="text-xs text-slate-500 mt-1">Pastikan data yang diinput sesuai dengan format berkas laporan / excel uptd.xlsx</p>
      </div>
      <form className="p-6 space-y-8" onSubmit={handleSubmitK5}>
        <section>
          <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">1. Informasi Umum</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Bulan</label>
              <select name="bulan" value={formDataK5.bulan} onChange={handleChangeK5} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-400">
                <option value="Januari">Januari</option><option value="Februari">Februari</option><option value="Maret">Maret</option>
                <option value="April">April</option><option value="Mei">Mei</option><option value="Juni">Juni</option>
                <option value="Juli">Juli</option><option value="Agustus">Agustus</option><option value="September">September</option>
                <option value="Oktober">Oktober</option><option value="November">November</option><option value="Desember">Desember</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">Tahun</label>
              <input name="tahun" type="number" value={formDataK5.tahun} onChange={handleChangeK5} className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            </div>
          </div>
        </section>

        <section>
          <h4 className="text-sm font-bold text-[#071A2F] mb-4 pb-2 border-b-2 border-yellow-400 uppercase tracking-wide">2. Data Pengawas Ketenagakerjaan</h4>
          <div className="space-y-6">
            {k5JabatanOptions.map((jabatan) => (
              <div key={jabatan} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                <p className="font-semibold text-[#071A2F] mb-3 text-sm">Pengawas {jabatan}</p>
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1.5">Jumlah</label>
                    <input
                      type="number"
                      min="0"
                      value={formDataK5.jabatan[jabatan].jml_pengawas}
                      onChange={(e) => handleChangeK5Jabatan(jabatan, 'jml_pengawas', e.target.value)}
                      placeholder="0"
                      className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                    />
                  </div>

                  {k5FieldGroups.map((group) => {
                    const colors = k3ColorClasses[group.color];
                    return (
                      <div key={`${jabatan}-${group.title}`} className={`border rounded-lg p-4 ${colors.box}`}>
                        <h6 className={`text-xs font-bold uppercase mb-3 flex items-center gap-2 ${colors.text}`}>
                          <div className={`w-2 h-2 rounded-full ${colors.dot}`}></div>
                          {group.title}
                        </h6>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {group.fields.map(([key, label]) => (
                            <div key={`${jabatan}-${key}`}>
                              <label className="block text-xs font-medium text-slate-500 mb-1.5">{label}</label>
                              <input
                                type="number"
                                min="0"
                                value={formDataK5.jabatan[jabatan][key]}
                                onChange={(e) => handleChangeK5Jabatan(jabatan, key, e.target.value)}
                                placeholder="0"
                                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button type="button" onClick={() => setActiveTab('lihat')} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">Batal</button>
          <button type="submit" className="px-6 py-2.5 bg-[#071A2F] text-white text-sm font-semibold rounded-lg hover:bg-[#0A2540] shadow-sm hover:shadow-md transition-all active:scale-[0.98]">Simpan Data</button>
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
                          className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow text-center focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Keterangan Laporan</label>
            <textarea
              name="keterangan_global"
              rows="3"
              value={formDataK6.keterangan_global}
              onChange={handleChangeK6}
              className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button type="button" onClick={() => setActiveTab('lihat')} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">Batal</button>
          <button type="submit" className="px-6 py-2.5 bg-[#071A2F] text-white text-sm font-semibold rounded-lg hover:bg-[#0A2540] shadow-sm hover:shadow-md transition-all active:scale-[0.98]">Simpan Semua Data K6</button>
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
          <button type="submit" className="px-6 py-2.5 bg-[#071A2F] text-white text-sm font-semibold rounded-lg hover:bg-[#0A2540] shadow-sm hover:shadow-md transition-all active:scale-[0.98]">Simpan Data</button>
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
              <th className="px-4 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataK8A.map((item) => {
              const isExpanded = expandedRow === `k8a-${item.id}`;
              const k8aFields = [
                ['jml_kasus', 'Jml Kasus'], ['keracunan', 'Keracunan'], ['meninggal', 'Meninggal'],
                ['dugaan_pak', 'Dugaan PAK'], ['pak', 'PAK'], ['korban_total', 'Korban Total'],
                ['tipe_a', 'Tipe A'], ['tipe_b', 'Tipe B'], ['tipe_c', 'Tipe C'], ['tipe_d', 'Tipe D'],
                ['tipe_e', 'Tipe E'], ['tipe_f', 'Tipe F'], ['tipe_g', 'Tipe G'], ['tipe_h', 'Tipe H'],
                ['tipe_i', 'Tipe I'], ['tipe_j', 'Tipe J'], ['tipe_k', 'Tipe K'],
              ].map(([key, label]) => [label, Number(item[key] ?? 0).toLocaleString()]);

              return (
                <React.Fragment key={item.id}>
                  <tr className={`border-b transition-colors ${isExpanded ? 'bg-[#071A2F]/5' : 'bg-white hover:bg-slate-50'}`}>
                    <td className="px-4 py-3">{item.bulan}</td><td className="px-4 py-3">{item.tahun}</td><td className="px-4 py-3 font-medium text-slate-800">{getKotaName(item)}</td>
                    <td className="px-4 py-3 text-center">{Number(item.jml_kasus ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.keracunan ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.meninggal ?? 0)}</td>
                    <td className="px-4 py-3 text-center">{Number(item.dugaan_pak ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.pak ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.korban_total ?? 0)}</td>
                    <td className="px-4 py-3 text-center">{Number(item.tipe_a ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.tipe_b ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.tipe_c ?? 0)}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {renderDetailButton(`k8a-${item.id}`)}
                        {renderRowActions(item, 'k8a-kasus-kecelakaan', fetchK8A, getKotaName(item))}
                      </div>
                    </td>
                  </tr>
                  {isExpanded && renderDetailPanel(13, `Rincian Data K8A: ${getKotaName(item)} (${item.bulan} ${item.tahun})`, k8aFields)}
                </React.Fragment>
              );
            })}
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
              <th className="px-4 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataK8B.map((item) => {
              const isExpanded = expandedRow === `k8b-${item.id}`;
              const k8bFields = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u']
                .map((suffix) => [`sumber_${suffix}`, `Sumber ${suffix.toUpperCase()}`])
                .map(([key, label]) => [label, Number(item[key] ?? 0).toLocaleString()]);

              return (
                <React.Fragment key={item.id}>
                  <tr className={`border-b transition-colors ${isExpanded ? 'bg-[#071A2F]/5' : 'bg-white hover:bg-slate-50'}`}>
                    <td className="px-4 py-3">{item.bulan}</td><td className="px-4 py-3">{item.tahun}</td><td className="px-4 py-3 font-medium text-slate-800">{getKotaName(item)}</td>
                    <td className="px-4 py-3 text-center">{Number(item.sumber_a ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.sumber_b ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.sumber_c ?? 0)}</td>
                    <td className="px-4 py-3 text-center">{Number(item.sumber_d ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.sumber_e ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.sumber_f ?? 0)}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {renderDetailButton(`k8b-${item.id}`)}
                        {renderRowActions(item, 'k8b-sumber-bahaya', fetchK8B, getKotaName(item))}
                      </div>
                    </td>
                  </tr>
                  {isExpanded && renderDetailPanel(10, `Rincian Data K8B: ${getKotaName(item)} (${item.bulan} ${item.tahun})`, k8bFields)}
                </React.Fragment>
              );
            })}
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
              <th className="px-4 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataK8C.map((item) => {
              const isExpanded = expandedRow === `k8c-${item.id}`;
              const k8cFields = [
                ['akibat_sembuh', 'Akibat Sembuh'], ['akibat_stmb', 'Akibat STMB'], ['akibat_cacat', 'Akibat Cacat'],
                ['akibat_meninggal', 'Akibat Meninggal'], ['santunan_berkala', 'Santunan Berkala'], ['santunan_sekaligus', 'Santunan Sekaligus'],
                ['santunan_pendidikan', 'Santunan Pendidikan'], ['santunan_kembali_kerja', 'Santunan Kembali Kerja'],
                ['kerugian_ekonomi', 'Kerugian Ekonomi'], ['jam_kerja_hilang', 'Jam Kerja Hilang'],
              ].map(([key, label]) => [label, Number(item[key] ?? 0).toLocaleString()]);

              return (
                <React.Fragment key={item.id}>
                  <tr className={`border-b transition-colors ${isExpanded ? 'bg-[#071A2F]/5' : 'bg-white hover:bg-slate-50'}`}>
                    <td className="px-4 py-3">{item.bulan}</td><td className="px-4 py-3">{item.tahun}</td><td className="px-4 py-3 font-medium text-slate-800">{getKotaName(item)}</td>
                    <td className="px-4 py-3 text-center">{Number(item.akibat_sembuh ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.akibat_stmb ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.akibat_cacat ?? 0)}</td>
                    <td className="px-4 py-3 text-center">{Number(item.akibat_meninggal ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.santunan_berkala ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.santunan_sekaligus ?? 0)}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {renderDetailButton(`k8c-${item.id}`)}
                        {renderRowActions(item, 'k8c-akibat-santunan', fetchK8C, getKotaName(item))}
                      </div>
                    </td>
                  </tr>
                  {isExpanded && renderDetailPanel(10, `Rincian Data K8C: ${getKotaName(item)} (${item.bulan} ${item.tahun})`, k8cFields)}
                </React.Fragment>
              );
            })}
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
              <th className="px-4 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataK9A.map((item) => {
              const isExpanded = expandedRow === `k9a-${item.id}`;
              const k9aFields = [
                ['jml_perusahaan_melanggar', 'Jml Perusahaan Melanggar'], ['jml_di_nota', 'Jml di Nota'],
                ['pelanggaran_wlkp', 'Pelanggaran WLKP'], ['pelanggaran_wkwi', 'Pelanggaran WKWI'],
                ['penggunaan_tka', 'Penggunaan TKA'], ['pmi', 'PMI'],
                ['upah_minimum', 'Upah Minimum'], ['upah_tidak_dibayar', 'Upah Tidak Dibayar'], ['upah_lembur', 'Upah Lembur'],
                ['kompensasi_pkwt', 'Kompensasi PKWT'], ['pesangon', 'Pesangon'], ['thr', 'THR'],
                ['pekerja_anak', 'Pekerja Anak'], ['cuti_tahunan', 'Cuti Tahunan'], ['cuti_haid', 'Cuti Haid'],
                ['pp_kb', 'PP/KB'], ['pwbd_bpjs_kes', 'PWBD BPJS Kesehatan'], ['pwbd_bpjs_tk', 'PWBD BPJS TK'],
                ['pds_tk', 'PDS TK'], ['pds_upah', 'PDS Upah'], ['pds_prog', 'PDS Program'],
                ['prshn_mnggk', 'Perusahaan Mangkir'], ['lain_lain', 'Lain-lain'],
              ].map(([key, label]) => [label, Number(item[key] ?? 0).toLocaleString()]);

              return (
                <React.Fragment key={item.id}>
                  <tr className={`border-b transition-colors ${isExpanded ? 'bg-[#071A2F]/5' : 'bg-white hover:bg-slate-50'}`}>
                    <td className="px-4 py-3">{item.bulan}</td><td className="px-4 py-3">{item.tahun}</td><td className="px-4 py-3 font-medium text-slate-800">{getKotaName(item)}</td>
                    <td className="px-4 py-3 text-center">{Number(item.jml_perusahaan_melanggar ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.jml_di_nota ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.pelanggaran_wlkp ?? 0)}</td>
                    <td className="px-4 py-3 text-center">{Number(item.pelanggaran_wkwi ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.penggunaan_tka ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.pmi ?? 0)}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {renderDetailButton(`k9a-${item.id}`)}
                        {renderRowActions(item, 'k9a-pelanggaran-kerja', fetchK9A, getKotaName(item))}
                      </div>
                    </td>
                  </tr>
                  {isExpanded && renderDetailPanel(10, `Rincian Data K9A: ${getKotaName(item)} (${item.bulan} ${item.tahun})`, k9aFields)}
                </React.Fragment>
              );
            })}
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
              <th className="px-4 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataK9B.map((item) => {
              const isExpanded = expandedRow === `k9b-${item.id}`;
              const k9bFields = [
                ['pelanggaran_p2k3', 'Pelanggaran P2K3'], ['ahli_k3', 'Ahli K3'], ['personil_k3_lainnya', 'Personil K3 Lainnya'],
                ['pjk3', 'PJK3'], ['unit_p3k', 'Unit P3K'], ['sarana_makan', 'Sarana Makan'],
                ['pengendalian_b3', 'Pengendalian B3'], ['dokter_perusahaan', 'Dokter Perusahaan'], ['paramedis_perusahaan', 'Paramedis Perusahaan'],
                ['dokter_pktk', 'Dokter PKTK'], ['riksa_awal', 'Pemeriksaan Awal'], ['riksa_berkala', 'Pemeriksaan Berkala'],
                ['riksa_khusus', 'Pemeriksaan Khusus'], ['lainnya', 'Lainnya'],
              ].map(([key, label]) => [label, Number(item[key] ?? 0).toLocaleString()]);

              return (
                <React.Fragment key={item.id}>
                  <tr className={`border-b transition-colors ${isExpanded ? 'bg-[#071A2F]/5' : 'bg-white hover:bg-slate-50'}`}>
                    <td className="px-4 py-3">{item.bulan}</td><td className="px-4 py-3">{item.tahun}</td><td className="px-4 py-3 font-medium text-slate-800">{getKotaName(item)}</td>
                    <td className="px-4 py-3 text-center">{Number(item.pelanggaran_p2k3 ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.ahli_k3 ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.personil_k3_lainnya ?? 0)}</td>
                    <td className="px-4 py-3 text-center">{Number(item.pjk3 ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.unit_p3k ?? 0)}</td><td className="px-4 py-3 text-center">{Number(item.sarana_makan ?? 0)}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {renderDetailButton(`k9b-${item.id}`)}
                        {renderRowActions(item, 'k9b-pelanggaran-k3', fetchK9B, getKotaName(item))}
                      </div>
                    </td>
                  </tr>
                  {isExpanded && renderDetailPanel(10, `Rincian Data K9B: ${getKotaName(item)} (${item.bulan} ${item.tahun})`, k9bFields)}
                </React.Fragment>
              );
            })}
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
              <th className="px-4 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataK10.map((item) => {
              const isExpanded = expandedRow === `k10-${item.id}`;
              const k10Fields = [
                ['Kabupaten/Kota', getKotaName(item)],
                ['No Laporan', item.no_laporan ?? '-'],
                ['Dugaan Pelanggaran', item.dugaan_pelanggaran ?? '-'],
                ['No SPT', item.no_spt ?? '-'],
                ['Status', item.status_selesai ?? '-'],
                ['Proses', item.proses ?? '-'],
                ['Putusan Denda', Number(item.putusan_denda ?? 0).toLocaleString()],
                ['Putusan Kurungan', item.putusan_kurungan ?? '-'],
              ];

              return (
                <React.Fragment key={item.id}>
                  <tr className={`border-b transition-colors ${isExpanded ? 'bg-[#071A2F]/5' : 'bg-white hover:bg-slate-50'}`}>
                    <td className="px-4 py-3">{item.bulan}</td><td className="px-4 py-3">{item.tahun}</td><td className="px-4 py-3 font-medium text-slate-800">{getKotaName(item)}</td>
                    <td className="px-4 py-3 font-medium">{item.no_laporan}</td><td className="px-4 py-3">{item.dugaan_pelanggaran}</td><td className="px-4 py-3 text-center">{item.status_selesai ?? '-'}</td>
                    <td className="px-4 py-3 text-center">{item.proses ?? '-'}</td><td className="px-4 py-3 text-center">{Number(item.putusan_denda ?? 0)}</td><td className="px-4 py-3 text-center">{item.putusan_kurungan ?? '-'}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {renderDetailButton(`k10-${item.id}`)}
                        {renderRowActions(item, 'k10-penyidikan', fetchK10, item.no_laporan)}
                      </div>
                    </td>
                  </tr>
                  {isExpanded && renderDetailPanel(10, `Rincian Data K10: ${item.no_laporan ?? getKotaName(item)} (${item.bulan} ${item.tahun})`, k10Fields)}
                </React.Fragment>
              );
            })}
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
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200"><button type="button" onClick={() => setActiveTab('lihat')} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">Batal</button><button type="submit" className="px-6 py-2.5 bg-[#071A2F] text-white text-sm font-semibold rounded-lg hover:bg-[#0A2540] shadow-sm hover:shadow-md transition-all active:scale-[0.98]">Simpan Data</button></div>
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
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200"><button type="button" onClick={() => setActiveTab('lihat')} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">Batal</button><button type="submit" className="px-6 py-2.5 bg-[#071A2F] text-white text-sm font-semibold rounded-lg hover:bg-[#0A2540] shadow-sm hover:shadow-md transition-all active:scale-[0.98]">Simpan Data</button></div>
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
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200"><button type="button" onClick={() => setActiveTab('lihat')} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">Batal</button><button type="submit" className="px-6 py-2.5 bg-[#071A2F] text-white text-sm font-semibold rounded-lg hover:bg-[#0A2540] shadow-sm hover:shadow-md transition-all active:scale-[0.98]">Simpan Data</button></div>
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
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200"><button type="button" onClick={() => setActiveTab('lihat')} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">Batal</button><button type="submit" className="px-6 py-2.5 bg-[#071A2F] text-white text-sm font-semibold rounded-lg hover:bg-[#0A2540] shadow-sm hover:shadow-md transition-all active:scale-[0.98]">Simpan Data</button></div>
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
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200"><button type="button" onClick={() => setActiveTab('lihat')} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">Batal</button><button type="submit" className="px-6 py-2.5 bg-[#071A2F] text-white text-sm font-semibold rounded-lg hover:bg-[#0A2540] shadow-sm hover:shadow-md transition-all active:scale-[0.98]">Simpan Data</button></div>
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
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200"><button type="button" onClick={() => setActiveTab('lihat')} className="px-5 py-2 text-slate-600 border border-slate-300 rounded-md hover:bg-slate-50 transition">Batal</button><button type="submit" className="px-6 py-2.5 bg-[#071A2F] text-white text-sm font-semibold rounded-lg hover:bg-[#0A2540] shadow-sm hover:shadow-md transition-all active:scale-[0.98]">Simpan Data</button></div>
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
    const numericFields = ['tahun', 'id_kota', ...k3FieldGroups.flatMap((group) => group.fields.map(([key]) => key))];
    setFormDataK3(prev => ({
      ...prev,
      [name]: numericFields.includes(name) ? numericValue(value) : value,
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
      [name]: name === 'tahun' ? numericValue(value) : value,
    }));
  };

  const handleChangeK5Jabatan = (jabatan, field, value) => {
    setFormDataK5((prev) => ({
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
    const payload = k5JabatanOptions.map((jabatan) => ({
      bulan: formDataK5.bulan,
      tahun: formDataK5.tahun,
      jabatan_pengawas: jabatan,
      ...formDataK5.jabatan[jabatan],
    }));

    try {
      const responses = await Promise.all(payload.map((record) => (
        fetch('http://127.0.0.1:8000/api/k5-pemeriksaan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(record),
        })
      )));
      const results = await Promise.all(responses.map((response) => response.json()));
      if (responses.some((response) => !response.ok)) {
        alert('Gagal menyimpan data K5');
        console.error(results);
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
            <button className="p-1.5 bg-[#071A2F]/10 text-[#071A2F] rounded"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></button>
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
          border-color: #facc15;
          box-shadow: 0 0 0 3px rgba(250, 204, 21, 0.2);
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
                  ? 'bg-yellow-50 text-[#071A2F] ring-1 ring-yellow-300'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
              }`}
            >
              <span className="text-sm hidden sm:inline">
                Welcome, <strong className="font-semibold">{profileName}</strong>
              </span>
              <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0A2540] to-[#071A2F] text-white flex items-center justify-center font-bold text-sm shadow-md shadow-[#071A2F]/20 ring-2 ring-white overflow-hidden">
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
            {activeMenu === 'EDIT' ? (
              renderEditPage()
            ) : activeMenu === 'PROFILE' ? (
              renderProfilePage()
            ) : activeMenu === 'K1' || activeMenu === 'K2' || activeMenu === 'K3' || activeMenu === 'K4' || activeMenu === 'K5' || k6MenuIds.includes(activeMenu) || activeMenu === 'K7' || activeMenu === '8A' || activeMenu === '8B' || activeMenu === '8C' || activeMenu === '9A' || activeMenu === '9B' || activeMenu === 'K10' ? (
              <div>
                {/* Tab Navigation */}
                <div className="inline-flex items-center gap-1 mb-6 p-1 bg-slate-200/60 rounded-xl">
                  <button
                    onClick={() => setActiveTab('lihat')}
                    className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-150 ${
                      activeTab === 'lihat'
                        ? 'bg-white text-[#071A2F] shadow-sm'
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
                        ? 'bg-white text-[#071A2F] shadow-sm'
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
