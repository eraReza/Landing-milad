import { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  useNavigate,
  Link
} from 'react-router-dom';
import { 
  Instagram, 
  MessageCircle, 
  Clock, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  Heart, 
  Star,
  Settings,
  X,
  Save,
  Wifi,
  WifiOff,
  Loader2,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import Countdown from 'react-countdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getSupabase, STORAGE_BUCKET } from './lib/supabase';
import { CMSContent, DEFAULT_CMS_CONTENT } from './types';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Navbar = ({ content }: { content: CMSContent }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-honey-100">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        {content.logo_url ? (
          <img src={content.logo_url} alt="Logo" className="h-10 w-auto object-contain" />
        ) : (
          <div className="w-10 h-10 bg-honey-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            D
          </div>
        )}
      </Link>
      <div className="flex items-center gap-4">
        <a 
          href="#promo" 
          className="bg-honey-500 text-white px-4 py-2 rounded-full font-medium text-sm hover:bg-honey-600 transition-all shadow-lg shadow-honey-200"
        >
          Cek Promo
        </a>
      </div>
    </div>
  </nav>
);

const Hero = ({ content }: { content: CMSContent }) => {
  const [isConnecting, setIsConnecting] = useState(true);
  const [showSurprise, setShowSurprise] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnecting(false);
      setTimeout(() => setShowSurprise(true), 500);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden bg-honey-50">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-honey-100/50 -skew-x-12 translate-x-1/4 z-0" />
      
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        <div className="min-h-[400px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {isConnecting ? (
              <motion.div 
                key="connecting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 text-honey-600">
                  <Loader2 className="animate-spin" size={28} />
                  <span className="text-xl sm:text-2xl font-display font-bold">Menghubungkan ke WiFi...</span>
                </div>
                <div className="w-full max-w-md h-1.5 bg-honey-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                    className="h-full bg-honey-500"
                  />
                </div>
                <p className="text-honey-500 text-sm sm:text-base italic">Mohon tunggu sebentar...</p>
              </motion.div>
            ) : showSurprise ? (
              <motion.div 
                key="surprise"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 sm:space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-honey-100 text-honey-700 rounded-full text-xs sm:text-sm font-semibold mb-2">
                  <WifiOff size={14} />
                  <span>WiFi Tidak Ditemukan</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-honey-900 leading-[1.1]">
                  {content.hero_headline}
                </h1>
                <p className="text-lg sm:text-xl text-honey-700 max-w-lg">
                  {content.hero_subheadline}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                  <a 
                    href={content.instagram_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:scale-105 transition-all shadow-xl shadow-pink-200"
                  >
                    <Instagram size={20} />
                    Info Promo di Instagram
                  </a>
                  <a 
                    href={content.whatsapp_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:scale-105 transition-all shadow-xl shadow-green-200"
                  >
                    <MessageCircle size={20} />
                    Tanya via WhatsApp
                  </a>
                </div>
                <p className="text-xs sm:text-sm text-honey-400 font-medium">Ini bukan WiFi, tapi sepertinya lebih menarik.</p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 1, type: "spring" }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src={content.hero_image} 
              alt="Donat Madu Cihanjuang" 
              className="w-full aspect-square object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-honey-400 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-honey-600 rounded-full blur-3xl opacity-20 animate-pulse delay-700" />
        </motion.div>
      </div>
    </section>
  );
};

const PromoPopup = ({ content, onClose }: { content: CMSContent, onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
  >
    <motion.div 
      initial={{ scale: 0.8, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.8, y: 50 }}
      className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden relative"
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full text-honey-900 hover:bg-honey-100 transition-colors"
      >
        <X size={20} />
      </button>
      
      <div className="relative aspect-[4/5]">
        <img 
          src={content.popup_image} 
          alt="Promo Popup" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-honey-900/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white text-center">
          <h3 className="text-xl sm:text-2xl font-display font-bold mb-2">Kejutan Spesial Untukmu</h3>
          <p className="text-honey-100 mb-4 sm:mb-6 font-medium text-sm sm:text-base">Ambil promo terbatas ini sekarang</p>
          <div className="space-y-2 sm:space-y-3">
            <a 
              href={content.popup_link}
              onClick={onClose}
              className="block w-full bg-honey-500 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg hover:bg-honey-600 transition-all shadow-xl"
            >
              {content.popup_cta_text}
            </a>
            <button 
              onClick={onClose}
              className="block w-full bg-white/20 backdrop-blur-md text-white py-2 sm:py-3 rounded-xl sm:rounded-2xl font-bold hover:bg-white/30 transition-all text-sm sm:text-base"
            >
              Lihat Detail
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const PromoSection = ({ content }: { content: CMSContent }) => (
  <section id="promo" className="py-16 sm:py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4">{content.promo_title}</h2>
        <div className="w-16 sm:w-24 h-1 sm:h-1.5 bg-honey-500 mx-auto rounded-full" />
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center bg-honey-50 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 md:p-16 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 sm:p-8">
          <div className="bg-honey-500 text-white w-16 h-16 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center rotate-12 shadow-lg">
            <span className="text-lg sm:text-2xl font-black">16%</span>
            <span className="text-[10px] sm:text-xs font-bold uppercase">OFF</span>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6 sm:space-y-8"
        >
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-2xl sm:text-3xl text-honey-800">{content.promo_discount}</h3>
            <p className="text-base sm:text-lg text-honey-700 leading-relaxed">
              {content.promo_description}
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-sm">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-honey-100 rounded-lg sm:rounded-xl flex items-center justify-center text-honey-600 shrink-0">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-honey-500 font-bold uppercase">Periode</p>
                <p className="text-sm sm:text-base font-bold text-honey-800">{content.promo_period}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-sm">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-honey-100 rounded-lg sm:rounded-xl flex items-center justify-center text-honey-600 shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-honey-500 font-bold uppercase">Lokasi</p>
                <p className="text-sm sm:text-base font-bold text-honey-800">Outlet Tertentu</p>
              </div>
            </div>
          </div>
          
          <p className="text-xs sm:text-sm text-honey-500 italic">
            * Cek Instagram untuk daftar outlet & info terbaru
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="rounded-3xl overflow-hidden shadow-xl group-hover:scale-[1.02] transition-transform duration-500">
            <img 
              src={content.promo_image} 
              alt="Promo Donat Isi 6" 
              className="w-full h-auto"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const StorySection = ({ content }: { content: CMSContent }) => (
  <section className="py-16 sm:py-24 bg-honey-900 text-white relative overflow-hidden">
    {/* Decorative honey drips or patterns could go here */}
    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
      <div className="absolute top-20 left-10 w-48 sm:w-64 h-48 sm:h-64 border-4 border-honey-500 rounded-full" />
      <div className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 border-4 border-honey-500 rounded-full" />
    </div>

    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Heart className="mx-auto mb-6 sm:mb-8 text-honey-500 w-10 h-10 sm:w-12 sm:h-12" fill="currentColor" />
        <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 sm:mb-8 font-display">{content.story_title}</h2>
        <div className="space-y-4 sm:space-y-6 text-lg sm:text-xl text-honey-100 leading-relaxed font-light">
          {content.story_content.split('\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

const CountdownSection = ({ content }: { content: CMSContent }) => {
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <span className="text-honey-500 font-black text-xl sm:text-2xl">PROMO SEDANG BERLANGSUNG</span>;
    }
    return (
      <div className="flex gap-3 sm:gap-6 md:gap-8 justify-center">
        {[
          { label: 'Hari', value: days },
          { label: 'Jam', value: hours },
          { label: 'Menit', value: minutes },
          { label: 'Detik', value: seconds },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-3xl md:text-4xl font-black shadow-xl border-b-4 border-honey-200 text-honey-900">
              {String(item.value).padStart(2, '0')}
            </div>
            <span className="mt-2 text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest text-honey-600">{item.label}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 sm:py-24 bg-honey-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 text-honey-600 font-bold uppercase tracking-widest text-[10px] sm:text-xs">
          <Clock size={14} />
          <span>Penawaran Terbatas</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4">Promo Segera Dimulai</h2>
        <p className="text-base sm:text-lg md:text-xl text-honey-700 mb-8 sm:mb-12 max-w-2xl mx-auto">
          Jangan sampai ketinggalan momen spesial ini. Karena yang manis tidak datang dua kali.
        </p>
        
        <div className="bg-honey-100/50 p-6 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[3rem] inline-block">
          <Countdown date={new Date(content.countdown_date)} renderer={renderer} />
        </div>
      </div>
    </section>
  );
};

const FinalCTA = ({ content }: { content: CMSContent }) => (
  <section className="py-16 sm:py-24 bg-white">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        className="bg-honey-500 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-20 text-white shadow-2xl relative overflow-hidden"
      >
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-48 sm:w-64 h-48 sm:h-64 bg-white/10 rounded-full" />
        <div className="absolute -bottom-20 -right-20 w-48 sm:w-64 h-48 sm:h-64 bg-white/10 rounded-full" />
        
        <h2 className="text-3xl sm:text-4xl md:text-6xl mb-4 sm:mb-6 font-display">Rayakan Sweet 16 Bersama Kami</h2>
        <p className="text-lg sm:text-xl mb-8 sm:mb-12 opacity-90">
          Klik sekarang, cek outlet terdekat dan jangan sampai kehabisan.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center relative z-10">
          <a 
            href={content.instagram_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-white text-honey-600 px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl hover:bg-honey-50 transition-all shadow-xl"
          >
            <Instagram size={24} />
            Info Lengkap
          </a>
          <a 
            href={content.whatsapp_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-honey-900 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl hover:bg-black transition-all shadow-xl"
          >
            <MessageCircle size={24} />
            Tanya via WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const Footer = ({ content }: { content: CMSContent }) => (
  <footer className="bg-honey-50 py-16 border-t border-honey-100">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          {content.logo_url ? (
            <img src={content.logo_url} alt="Logo" className="h-12 w-auto object-contain" />
          ) : (
            <>
              <div className="w-12 h-12 bg-honey-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                D
              </div>
              <span className="font-display font-bold text-2xl text-honey-900">DMC</span>
            </>
          )}
        </div>
        <p className="text-honey-600 leading-relaxed">
          {content.footer_description}
        </p>
      </div>
      
      <div>
        <h4 className="font-bold text-honey-900 mb-6 uppercase tracking-widest text-sm">Quick Links</h4>
        <ul className="space-y-4 text-honey-600">
          <li><a href="#" className="hover:text-honey-500 transition-colors">Home</a></li>
          <li><a href="#promo" className="hover:text-honey-500 transition-colors">Promo Spesial</a></li>
          <li><a href={content.instagram_link} className="hover:text-honey-500 transition-colors">Instagram</a></li>
          <li><a href={content.whatsapp_link} className="hover:text-honey-500 transition-colors">WhatsApp</a></li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold text-honey-900 mb-6 uppercase tracking-widest text-sm">Ikuti Kami</h4>
        <div className="flex gap-4">
          <a href={content.instagram_link} className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-honey-600 hover:bg-honey-500 hover:text-white transition-all shadow-sm">
            <Instagram size={24} />
          </a>
          <a href={content.whatsapp_link} className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-honey-600 hover:bg-honey-500 hover:text-white transition-all shadow-sm">
            <MessageCircle size={24} />
          </a>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-honey-200 text-center text-honey-400 text-sm">
      &copy; {new Date().getFullYear()} Donat Madu Cihanjuang. All rights reserved.
    </div>
  </footer>
);

const StickyWA = ({ link }: { link: string }) => (
  <a 
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-40 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all group"
  >
    <MessageCircle size={32} />
    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-honey-900 px-4 py-2 rounded-xl font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
      Tanya Promo Sekarang
    </span>
  </a>
);

// --- Admin Panel ---

const AdminPanel = ({ 
  content, 
  onSave, 
  onClose 
}: { 
  content: CMSContent, 
  onSave: (newContent: CMSContent) => void,
  onClose: () => void
}) => {
  const [formData, setFormData] = useState<CMSContent>(content);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>, fieldName: keyof CMSContent) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const supabase = getSupabase();
    if (!supabase) {
      alert('Supabase not configured for uploads');
      return;
    }

    setUploadingField(fieldName);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, [fieldName]: publicUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Gagal mengupload gambar. Pastikan bucket "images" sudah dibuat di Supabase Storage.');
    } finally {
      setUploadingField(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await onSave(formData);
    setIsSaving(false);
    onClose();
    navigate('/');
  };

  const ImageUploadField = ({ label, name, value }: { label: string, name: keyof CMSContent, value: string }) => (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-honey-600">{label}</label>
      <div className="flex flex-col gap-3">
        {value && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-honey-200">
            <img src={value} alt={label} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex gap-2">
          <input 
            name={name} 
            value={value} 
            onChange={handleChange}
            placeholder="URL Gambar..."
            className="flex-1 p-3 bg-honey-50 border border-honey-200 rounded-xl focus:ring-2 focus:ring-honey-500 outline-none text-sm"
          />
          <label className="cursor-pointer bg-honey-100 hover:bg-honey-200 text-honey-600 p-3 rounded-xl transition-colors flex items-center justify-center shrink-0">
            {uploadingField === name ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Upload size={20} />
            )}
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={(e) => handleFileUpload(e, name)}
              disabled={!!uploadingField}
            />
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-honey-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b flex items-center justify-between bg-honey-50">
          <h2 className="text-2xl font-display text-honey-900 flex items-center gap-2">
            <Settings className="text-honey-500" />
            CMS Admin Panel
          </h2>
          <button onClick={() => { onClose(); navigate('/'); }} className="p-2 hover:bg-honey-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 md:col-span-2">
              <h3 className="font-bold text-honey-800 border-b pb-2">Brand Settings</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <ImageUploadField 
                  label="Logo Brand (Rekomendasi: 200x80px atau aspek rasio 5:2)" 
                  name="logo_url" 
                  value={formData.logo_url} 
                />
                <div>
                  <label className="block text-sm font-bold text-honey-600 mb-1">Footer Description</label>
                  <textarea 
                    name="footer_description" 
                    value={formData.footer_description} 
                    onChange={handleChange}
                    rows={3}
                    className="w-full p-3 bg-honey-50 border border-honey-200 rounded-xl focus:ring-2 focus:ring-honey-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-honey-800 border-b pb-2">Hero Section</h3>
              <div>
                <label className="block text-sm font-bold text-honey-600 mb-1">Headline</label>
                <input 
                  name="hero_headline" 
                  value={formData.hero_headline} 
                  onChange={handleChange}
                  className="w-full p-3 bg-honey-50 border border-honey-200 rounded-xl focus:ring-2 focus:ring-honey-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-honey-600 mb-1">Subheadline</label>
                <textarea 
                  name="hero_subheadline" 
                  value={formData.hero_subheadline} 
                  onChange={handleChange}
                  rows={2}
                  className="w-full p-3 bg-honey-50 border border-honey-200 rounded-xl focus:ring-2 focus:ring-honey-500 outline-none"
                />
              </div>
              <ImageUploadField label="Hero Image" name="hero_image" value={formData.hero_image} />
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-honey-800 border-b pb-2">Promo Section</h3>
              <div>
                <label className="block text-sm font-bold text-honey-600 mb-1">Promo Title</label>
                <input 
                  name="promo_title" 
                  value={formData.promo_title} 
                  onChange={handleChange}
                  className="w-full p-3 bg-honey-50 border border-honey-200 rounded-xl focus:ring-2 focus:ring-honey-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-honey-600 mb-1">Discount Text</label>
                <input 
                  name="promo_discount" 
                  value={formData.promo_discount} 
                  onChange={handleChange}
                  className="w-full p-3 bg-honey-50 border border-honey-200 rounded-xl focus:ring-2 focus:ring-honey-500 outline-none"
                />
              </div>
              <ImageUploadField label="Promo Image" name="promo_image" value={formData.promo_image} />
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-honey-800 border-b pb-2">Links & Countdown</h3>
              <div>
                <label className="block text-sm font-bold text-honey-600 mb-1">WhatsApp Link</label>
                <input 
                  name="whatsapp_link" 
                  value={formData.whatsapp_link} 
                  onChange={handleChange}
                  className="w-full p-3 bg-honey-50 border border-honey-200 rounded-xl focus:ring-2 focus:ring-honey-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-honey-600 mb-1">Instagram Link</label>
                <input 
                  name="instagram_link" 
                  value={formData.instagram_link} 
                  onChange={handleChange}
                  className="w-full p-3 bg-honey-50 border border-honey-200 rounded-xl focus:ring-2 focus:ring-honey-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-honey-600 mb-1">Countdown Date (ISO)</label>
                <input 
                  type="datetime-local"
                  name="countdown_date" 
                  value={formData.countdown_date.slice(0, 16)} 
                  onChange={handleChange}
                  className="w-full p-3 bg-honey-50 border border-honey-200 rounded-xl focus:ring-2 focus:ring-honey-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-honey-800 border-b pb-2">Story Section</h3>
              <div>
                <label className="block text-sm font-bold text-honey-600 mb-1">Story Title</label>
                <input 
                  name="story_title" 
                  value={formData.story_title} 
                  onChange={handleChange}
                  className="w-full p-3 bg-honey-50 border border-honey-200 rounded-xl focus:ring-2 focus:ring-honey-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-honey-600 mb-1">Story Content</label>
                <textarea 
                  name="story_content" 
                  value={formData.story_content} 
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 bg-honey-50 border border-honey-200 rounded-xl focus:ring-2 focus:ring-honey-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-4 md:col-span-2">
              <h3 className="font-bold text-honey-800 border-b pb-2">Popup Settings</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 bg-honey-50 rounded-xl border border-honey-100">
                  <input 
                    type="checkbox"
                    id="popup_active"
                    name="popup_active"
                    checked={formData.popup_active}
                    onChange={(e) => setFormData(prev => ({ ...prev, popup_active: e.target.checked }))}
                    className="w-6 h-6 rounded accent-honey-500"
                  />
                  <label htmlFor="popup_active" className="font-bold text-honey-700">Aktifkan Popup Otomatis</label>
                </div>
                <div>
                  <label className="block text-sm font-bold text-honey-600 mb-1">Popup Delay (ms)</label>
                  <input 
                    type="number"
                    name="popup_delay" 
                    value={formData.popup_delay} 
                    onChange={handleChange}
                    className="w-full p-3 bg-honey-50 border border-honey-200 rounded-xl focus:ring-2 focus:ring-honey-500 outline-none"
                  />
                </div>
                <ImageUploadField label="Popup Image" name="popup_image" value={formData.popup_image} />
                <div>
                  <label className="block text-sm font-bold text-honey-600 mb-1">Popup CTA Text</label>
                  <input 
                    name="popup_cta_text" 
                    value={formData.popup_cta_text} 
                    onChange={handleChange}
                    className="w-full p-3 bg-honey-50 border border-honey-200 rounded-xl focus:ring-2 focus:ring-honey-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="p-6 border-t bg-honey-50 flex justify-end gap-4">
          <button 
            onClick={() => { onClose(); navigate('/'); }}
            className="px-6 py-3 rounded-xl font-bold text-honey-600 hover:bg-honey-100 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isSaving || !!uploadingField}
            className="flex items-center gap-2 bg-honey-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-honey-600 transition-all shadow-lg disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : <><Save size={20} /> Save Changes</>}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [content, setContent] = useState<CMSContent>(DEFAULT_CMS_CONTENT);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      const supabase = getSupabase();
      if (!supabase) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('cms_settings')
          .select('*');

        if (error) throw error;

        if (data && data.length > 0) {
          const newContent = { ...DEFAULT_CMS_CONTENT };
          data.forEach((item: any) => {
            if (item.key in newContent) {
              const value = item.value;
              // Handle boolean and number conversions
              if (item.key === 'popup_active') {
                // @ts-ignore
                newContent[item.key] = value === 'true';
              } else if (item.key === 'popup_delay') {
                // @ts-ignore
                newContent[item.key] = parseInt(value, 10);
              } else {
                // @ts-ignore
                newContent[item.key] = value;
              }
            }
          });
          setContent(newContent);
        }
      } catch (err) {
        console.error('Error fetching CMS content:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Handle Popup trigger
  useEffect(() => {
    if (!isLoading && content.popup_active) {
      const timer = setTimeout(() => {
        setIsPopupOpen(true);
      }, content.popup_delay);
      return () => clearTimeout(timer);
    }
  }, [isLoading, content.popup_active, content.popup_delay]);

  const handleSave = async (newContent: CMSContent) => {
    const supabase = getSupabase();
    if (!supabase) {
      // Local update only if no Supabase
      setContent(newContent);
      return;
    }

    try {
      const updates = Object.entries(newContent).map(([key, value]) => ({
        key,
        value: String(value)
      }));

      const { error } = await supabase
        .from('cms_settings')
        .upsert(updates, { onConflict: 'key' });

      if (error) throw error;
      setContent(newContent);
    } catch (err) {
      console.error('Error saving CMS content:', err);
      alert('Failed to save to Supabase. Check console for details.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-honey-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-honey-500 border-t-transparent rounded-full animate-spin" />
          <p className="font-display font-bold text-honey-600">Menyiapkan Momen Manis...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-honey-900 selection:bg-honey-200 selection:text-honey-900">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar content={content} />
              <Hero content={content} />
              <PromoSection content={content} />
              <StorySection content={content} />
              <CountdownSection content={content} />
              <FinalCTA content={content} />
              <Footer content={content} />
              <StickyWA link={content.whatsapp_link} />
              <AnimatePresence>
                {isPopupOpen && (
                  <PromoPopup 
                    content={content} 
                    onClose={() => setIsPopupOpen(false)} 
                  />
                )}
              </AnimatePresence>
            </>
          } />
          <Route path="/rezaedit" element={
            <AdminPanel 
              content={content} 
              onSave={handleSave} 
              onClose={() => setIsAdminOpen(false)} 
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}
