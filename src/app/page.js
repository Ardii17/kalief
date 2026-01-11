/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/static-components */
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  PauseCircle,
  Music2,
  ScanLine,
  Send,
  MessageSquare,
  User,
  CheckCircle,
  XCircle,
} from "lucide-react";

// --- DATA UNDANGAN ---
const DATA = {
  namaLengkap: "Muhamad Kalief",
  namaPanggilan: "Kalief",
  namaAyah: "Bapak Ahmad Saemi",
  namaIbu: "Ibu Rima Widiasari",
  tanggal: "Minggu, 1 Februari 2026",
  waktu: "08.00 WIB - Selesai",
  alamat:
    "Kp. Girihieum RT 03 RW 09, Desa Pangauban, Kec. Pacet, Kab. Bandung 40385",
  targetDate: "2026-02-01T08:00:00",
  turutMengundang: [
    "Keluarga Besar Alm. Awih & Almh. Aroh",
    "Keluarga Besar Iman & Eti",
  ],
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=Kp.+Girihieum+RT+03+RW+09+Desa+Pangauban+Kec.+Pacet+Kab.+Bandung?q=Kp.+Girihieum+RT+03+RW+09,+Desa+Pangauban,+Kec.+Pacet,+Kab.+Bandung+40385",
  // Placeholder image untuk ornamen background cover
  coverOrnamentImg:
    "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=1000&auto=format&fit=crop",
};

const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
  DATA.mapLink
)}&bgcolor=ffffff&color=064e3b`;

// --- COMPONENT ORNAMEN ---
const CornerOrnament = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    className={`w-24 h-24 md:w-32 md:h-32 absolute fill-current ${className}`}
  >
    <path
      d="M0 0 L40 0 C60 0 60 20 80 20 C90 20 100 30 100 50 L100 0 Z"
      opacity="0.9"
    />
    <path
      d="M0 0 L0 40 C0 60 20 60 20 80 C20 90 30 100 50 100 L0 100 Z"
      opacity="0.9"
    />
    <circle cx="25" cy="25" r="6" opacity="0.8" />
    <circle cx="45" cy="15" r="3" />
    <circle cx="15" cy="45" r="3" />
    <path
      d="M10 10 Q 30 30 50 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.5"
    />
  </svg>
);

const DividerOrnament = ({ className }) => (
  <svg
    viewBox="0 0 120 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-32 h-auto mx-auto mb-3 ${className}`}
  >
    <path
      d="M60 12C45 12 35 2 15 2H0V4H15C40 4 50 17 60 17C70 17 80 4 105 4H120V2H105C85 2 75 12 60 12Z"
      fill="currentColor"
    />
    <circle cx="60" cy="7" r="3.5" fill="currentColor" />
    <circle cx="30" cy="8" r="2" fill="currentColor" opacity="0.6" />
    <circle cx="90" cy="8" r="2" fill="currentColor" opacity="0.6" />
  </svg>
);

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      if (distance < 0) clearInterval(interval);
      else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const TimeBox = ({ val, label }) => (
    <div className="flex flex-col items-center bg-emerald-800/80 p-2 md:p-3 rounded-lg border border-amber-400/40 w-16 md:w-20 backdrop-blur-sm shadow-lg">
      <span
        className={`text-xl md:text-2xl font-bold text-amber-300 `}
      >
        {val}
      </span>
      <span className="text-[10px] md:text-xs text-amber-100 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex gap-2 md:gap-3 justify-center my-6">
      <TimeBox val={timeLeft.days} label="Hari" />
      <TimeBox val={timeLeft.hours} label="Jam" />
      <TimeBox val={timeLeft.minutes} label="Menit" />
      <TimeBox val={timeLeft.seconds} label="Detik" />
    </div>
  );
};

export default function Invitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const contentRef = useRef(null);
  const audioRef = useRef(null);

  // State untuk Ucapan & Doa
  const [wishes, setWishes] = useState([
    {
      name: "Hamba Allah",
      message: "Semoga menjadi anak yang sholeh, aamiin.",
      status: "hadir",
    },
    {
      name: "Teman Bapak",
      message: "Selamat ya, semoga lancar acaranya!",
      status: "hadir",
    },
  ]);
  const [inputName, setInputName] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [attendance, setAttendance] = useState("hadir");

  const musicUrl =
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  const handleOpen = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const toggleMusic = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleSubmitWish = (e) => {
    e.preventDefault();
    if (!inputName || !inputMessage) return;
    const newWish = {
      name: inputName,
      message: inputMessage,
      status: attendance,
    };
    setWishes([newWish, ...wishes]);
    setInputName("");
    setInputMessage("");
    alert("Terima kasih atas ucapan dan doanya!");
  };

  return (
    // FIX: Menggunakan h-dvh agar pas di browser mobile dengan address bar
    <div
      className={`bg-emerald-950 text-amber-50 font-sans min-h-dvh selection:bg-amber-500 selection:text-emerald-950 ${
        !isOpen ? "h-dvh overflow-hidden" : ""
      }`}
    >
      <audio ref={audioRef} src={musicUrl} loop />

      {isOpen && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-50 bg-amber-500/80 backdrop-blur-md text-emerald-950 p-3 rounded-full shadow-xl border-2 border-amber-300 hover:bg-amber-400 transition-all duration-300 hover:scale-105"
        >
          {isPlaying ? (
            <Music2 size={24} className="animate-spin-slow" />
          ) : (
            <PauseCircle size={24} />
          )}
        </button>
      )}

      {/* --- HALAMAN 1: COVER (FIX HEIGHT) --- */}
      {/* Menggunakan h-dvh agar tinggi menyesuaikan layar visible area HP */}
      <section className="relative h-dvh w-full flex flex-col items-center justify-center p-6 overflow-hidden z-20">
        <div className="absolute inset-0 bg-linear-to-b from-emerald-900 via-emerald-950 to-emerald-950 z-[-2]"></div>

        <div className="absolute z-[-1] w-112.5 h-112.5 md:w-162.5 md:h-162.5 rounded-full flex items-center justify-center overflow-hidden opacity-30 border-[3px] border-amber-400/20">
          <Image
            src={DATA.coverOrnamentImg}
            alt="Background Ornament"
            fill
            className="object-cover grayscale contrast-125"
            priority
          />
          <div className="absolute inset-0 bg-emerald-950 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-amber-500 mix-blend-overlay opacity-40"></div>
        </div>

        <CornerOrnament className="top-0 left-0 text-amber-500" />
        <CornerOrnament className="top-0 right-0 text-amber-500 transform scale-x-[-1]" />
        <CornerOrnament className="bottom-0 left-0 text-amber-500 transform scale-y-[-1]" />
        <CornerOrnament className="bottom-0 right-0 text-amber-500 transform scale-[-1]" />

        <div className="text-center z-10 space-y-5 animate-fade-in-up relative">
          <DividerOrnament className="text-amber-400 opacity-90" />

          <div className="mb-6">
            <span
              className={`inline-block px-5 py-1.5 rounded-full bg-emerald-900/60 border border-amber-400/40 text-amber-200 tracking-[0.2em] text-sm md:text-base uppercase backdrop-blur-md `}
            >
              {DATA.tanggal}
            </span>
          </div>

          <p className="text-lg md:text-xl text-emerald-200 font-light tracking-[0.3em] uppercase">
            Walimatul Khitan
          </p>

          <h1
            className={` text-6xl md:text-8xl text-transparent bg-clip-text bg-linear-to-b from-amber-300 to-amber-500 font-bold leading-tight drop-shadow-2xl py-2`}
          >
            {DATA.namaPanggilan}
          </h1>

          <div className="mt-12 pb-10">
            {" "}
            {/* Added pb-10 safe area for mobile bottom */}
            <button
              onClick={handleOpen}
              className="group relative px-8 py-3 bg-linear-to-r from-emerald-800 to-emerald-700 text-amber-300 rounded-full border border-amber-400/70 hover:from-amber-500 hover:to-amber-600 hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(251,191,36,0.2)] overflow-hidden hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-3 font-semibold tracking-wider uppercase text-sm">
                <ScanLine size={18} />
                Buka Undangan
              </span>
              <div className="absolute top-0 -left-full w-[50%] h-full bg-linear-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 transition-all duration-1000 group-hover:left-[150%]"></div>
            </button>
          </div>
        </div>
      </section>

      {/* --- HALAMAN 2: KONTEN --- */}
      <div
        ref={contentRef}
        className={`relative z-10 bg-emerald-950/90 backdrop-blur-lg transition-opacity duration-1000 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* PROFIL */}
        <section className="py-16 px-6 text-center max-w-3xl mx-auto">
          <div className="relative w-40 h-12 mx-auto mb-10 opacity-70 invert">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/2/27/Basmala.svg"
              alt="Bismillah"
              fill
              className="object-contain"
            />
          </div>

          <p
            className={`text-emerald-100 leading-relaxed mb-8 font-light text-lg `}
          >
            Assalamu’alaikum Warahmatullahi Wabarakatuh.
            <br />
            Dengan memohon Rahmat dan Ridho Allah SWT, kami bermaksud
            menyelenggarakan syukuran khitan putra kami:
          </p>

          <div className="my-10 p-1.5 border-[3px] border-amber-400/50 rounded-full w-52 h-52 mx-auto relative animate-pulse-slow shadow-[0_0_30px_rgba(251,191,36,0.2)]">
            <div className="w-full h-full rounded-full bg-linear-to-br from-emerald-800 to-emerald-900 overflow-hidden flex items-center justify-center relative border border-emerald-700">
              <Image
                src="/images/2.jpeg"
                alt="Ornamen Anak"
                fill
                className="object-cover absolute inset-0"
              />
            </div>
          </div>

          <h2
            className={` text-4xl md:text-5xl text-amber-400 font-bold mb-4 drop-shadow-md`}
          >
            {DATA.namaLengkap}
          </h2>
          <div className="text-emerald-200 mb-10 space-y-2">
            <p className="text-sm uppercase tracking-widest opacity-80">
              Putra tercinta dari:
            </p>
            <p
              className={` text-xl text-amber-200 font-medium`}
            >
              {DATA.namaAyah} & {DATA.namaIbu}
            </p>
          </div>

          <div className="bg-emerald-900/40 p-8 rounded-2xl border border-amber-500/30 backdrop-blur-md shadow-inner mx-auto max-w-xl">
            <h3 className="text-amber-300 font-bold mb-2 uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-amber-500/50"></span>
              Menuju Hari Bahagia
              <span className="h-px w-8 bg-amber-500/50"></span>
            </h3>
            <Countdown targetDate={DATA.targetDate} />
          </div>
        </section>

        {/* DETAIL ACARA */}
        <section className="py-16 px-6 bg-emerald-900/30 text-center relative overflow-hidden border-y border-amber-500/20">
          <CornerOrnament className="top-0 left-0 text-amber-600 w-20 h-20 opacity-20" />
          <CornerOrnament className="bottom-0 right-0 text-amber-600 w-20 h-20 opacity-20 transform scale-[-1]" />

          <DividerOrnament className="text-amber-500/50 w-24 mb-4" />
          <h2
            className={` text-4xl text-amber-400 mb-12 drop-shadow inline-block relative`}
          >
            Detail Acara
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto relative z-10">
            <div className="bg-emerald-950/80 p-8 rounded-2xl border border-amber-500/30 shadow-[0_5px_15px_rgba(0,0,0,0.2)] hover:border-amber-400 transition-colors group">
              <div className="w-16 h-16 bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/50 group-hover:bg-amber-500/10 transition-colors">
                <Calendar className="w-8 h-8 text-amber-400" />
              </div>
              <h3
                className={` text-2xl font-bold text-amber-200 mb-3`}
              >
                Waktu & Tanggal
              </h3>
              <p className="text-emerald-100 font-medium text-lg">
                {DATA.tanggal}
              </p>
              <p className="text-emerald-300 mt-1">{DATA.waktu}</p>
            </div>

            <div className="bg-emerald-950/80 p-8 rounded-2xl border border-amber-500/30 shadow-[0_5px_15px_rgba(0,0,0,0.2)] hover:border-amber-400 transition-colors group">
              <div className="w-16 h-16 bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/50 group-hover:bg-amber-500/10 transition-colors">
                <MapPin className="w-8 h-8 text-amber-400" />
              </div>
              <h3
                className={` text-2xl font-bold text-amber-200 mb-3`}
              >
                Lokasi
              </h3>
              <p className="text-emerald-100 text-sm leading-relaxed px-4 mb-6">
                {DATA.alamat}
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white p-4 inline-block rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.2)] max-w-xs border-4 border-amber-400/30 relative group">
            <div className="absolute -inset-1 bg-linear-to-tr from-amber-400 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative bg-white rounded-xl p-2">
              <h3 className="text-emerald-800 font-bold mb-3 text-sm uppercase tracking-widest">
                Scan Lokasi
              </h3>
              <div className="relative w-36 h-36 mx-auto">
                <Image
                  src={qrCodeUrl}
                  alt="QR Code Lokasi"
                  fill
                  className="object-contain"
                  unoptimized={true}
                />
              </div>
              <p className="text-xs text-emerald-700 mt-3 font-medium">
                Arahkan kamera ke QR Code
              </p>
            </div>
          </div>
        </section>

        {/* --- BAGIAN BARU: UCAPAN & DOA (GUEST BOOK) --- */}
        <section className="py-16 px-6 text-center max-w-3xl mx-auto">
          <DividerOrnament className="text-amber-500/50 w-24 mb-4" />
          <h2
            className={` text-3xl md:text-4xl text-amber-400 mb-8 font-bold`}
          >
            Ucapan & Doa
          </h2>

          <div className="bg-emerald-900/40 p-6 md:p-8 rounded-2xl border border-amber-500/30 shadow-lg backdrop-blur-sm">
            {/* FORM INPUT */}
            <form
              onSubmit={handleSubmitWish}
              className="text-left space-y-4 mb-10"
            >
              <div>
                <label className="block text-amber-200 text-sm mb-1 ml-1">
                  Nama
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-emerald-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Nama Anda"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="w-full bg-emerald-950/80 border border-emerald-700 rounded-lg py-2.5 pl-10 pr-4 text-emerald-100 placeholder-emerald-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-amber-200 text-sm mb-1 ml-1">
                  Ucapan
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-emerald-500 w-5 h-5" />
                  <textarea
                    placeholder="Tuliskan ucapan dan doa..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    rows="3"
                    className="w-full bg-emerald-950/80 border border-emerald-700 rounded-lg py-2.5 pl-10 pr-4 text-emerald-100 placeholder-emerald-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition resize-none"
                    required
                  ></textarea>
                </div>
              </div>

              <div>
                <label className="block text-amber-200 text-sm mb-1 ml-1">
                  Konfirmasi Kehadiran
                </label>
                <select
                  value={attendance}
                  onChange={(e) => setAttendance(e.target.value)}
                  className="w-full bg-emerald-950/80 border border-emerald-700 rounded-lg py-2.5 px-4 text-emerald-100 focus:outline-none focus:border-amber-500 transition appearance-none"
                >
                  <option value="hadir">Hadir</option>
                  <option value="tidak">Tidak Bisa Hadir</option>
                  <option value="ragu">Masih Ragu</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-linear-to-r from-amber-600 to-amber-500 font-bold rounded-lg shadow-lg hover:shadow-amber-500/20 hover:scale-[1.02] transition-all flex text-white items-center justify-center gap-2"
              >
                <Send size={18} />
                Kirim Ucapan
              </button>
            </form>

            {/* LIST UCAPAN (SCROLLABLE) */}
            <div className="max-h-100 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {wishes.length === 0 && (
                <p className="text-emerald-500 italic">Belum ada ucapan.</p>
              )}
              {wishes.map((item, index) => (
                <div
                  key={index}
                  className="bg-emerald-950/50 p-4 rounded-xl border border-emerald-800/50 text-left relative group hover:border-amber-500/30 transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-amber-200 text-sm md:text-base flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center text-xs text-amber-400 border border-amber-500/20">
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      {item.name}
                    </h4>
                    <span
                      className={`text-[10px] px-2 py-1 rounded-full border ${
                        item.status === "hadir"
                          ? "bg-emerald-900 text-emerald-300 border-emerald-700"
                          : "bg-red-900/50 text-red-300 border-red-800"
                      }`}
                    >
                      {item.status === "hadir" ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle size={10} /> Hadir
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <XCircle size={10} /> Absen
                        </span>
                      )}
                    </span>
                  </div>
                  <p className="text-emerald-100/80 text-sm leading-relaxed pl-10">
                    "{item.message}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TURUT MENGUNDANG */}
        <section className="py-16 px-6 text-center max-w-2xl mx-auto">
          <h3
            className={` text-amber-300 text-2xl mb-8 italic border-b border-amber-500/30 pb-4 inline-block px-12`}
          >
            Turut Mengundang
          </h3>
          <div className="space-y-4 text-emerald-100">
            {DATA.turutMengundang.map((item, index) => (
              <p key={index} className={` text-lg`}>
                {item}
              </p>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-10 text-center bg-emerald-950 text-emerald-400 text-sm border-t border-emerald-900 relative overflow-hidden">
          <CornerOrnament className="bottom-0 left-0 text-amber-700 w-16 h-16 opacity-10 transform scale-y-[-1]" />
          <CornerOrnament className="bottom-0 right-0 text-amber-700 w-16 h-16 opacity-10 transform scale-[-1]" />
          <p className="mb-3 leading-relaxed max-w-md mx-auto opacity-80">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir.
          </p>
          <p className={` text-xl text-amber-500 my-6`}>
            Wassalamu’alaikum Warahmatullahi Wabarakatuh.
          </p>

          <div className="mt-8 pt-4 border-t border-emerald-900/50 inline-block px-8">
            <p className="opacity-50 text-xs tracking-widest">
              Created with ❤️ for {DATA.namaPanggilan}'s Special Day
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
