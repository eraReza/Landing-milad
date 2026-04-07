export interface CMSContent {
  hero_headline: string;
  hero_subheadline: string;
  hero_image: string;
  promo_title: string;
  promo_description: string;
  promo_period: string;
  promo_discount: string;
  promo_image: string;
  story_title: string;
  story_content: string;
  countdown_date: string;
  whatsapp_link: string;
  instagram_link: string;
  footer_description: string;
  // New Popup Fields
  popup_active: boolean;
  popup_image: string;
  popup_cta_text: string;
  popup_link: string;
  popup_delay: number;
}

export const DEFAULT_CMS_CONTENT: CMSContent = {
  hero_headline: "Eh… sebentar. Kamu lagi nyari WiFi… atau malah nemu promo?",
  hero_subheadline: "Tenang, ini bukan salah scan. Tapi sepertinya kamu lagi beruntung hari ini. Diskon 16% Donat Isi 6 sudah menunggu kamu.",
  hero_image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1000&auto=format&fit=crop",
  promo_title: "Ya, kamu memang lagi beruntung",
  promo_description: "Tidak semua yang scan bakal dapat ini. Tapi kamu? Dapat. Nikmati Diskon 16% untuk Donat Isi 6. Pas banget buat nemenin momen manis kamu hari ini.",
  promo_period: "7 – 8 Mei",
  promo_discount: "Diskon 16% Donat Isi 6",
  promo_image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1000&auto=format&fit=crop",
  story_title: "Dari Dulu, Selalu Ada di Momen Manismu",
  story_content: "16 tahun lalu, semuanya dimulai dari yang sederhana. Sekarang, sudah jadi bagian dari banyak cerita manis. Dan hari ini, kamu juga jadi bagian dari cerita itu.",
  countdown_date: "2026-05-07T00:00:00",
  whatsapp_link: "https://wa.me/yournumber",
  instagram_link: "https://instagram.com/donatmaducihanjuang",
  footer_description: "Donat Madu Cihanjuang - Manisnya Madu, Lembutnya Donat. Menemani setiap momen bahagiamu sejak 2010.",
  // New Popup Defaults
  popup_active: true,
  popup_image: "https://images.unsplash.com/photo-1612240498936-65f5101365d2?q=80&w=800&auto=format&fit=crop",
  popup_cta_text: "Ambil Promonya",
  popup_link: "#promo",
  popup_delay: 3000,
};
