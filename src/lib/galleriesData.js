// lib/galleriesData.js
// ─────────────────────────────────────────────────────────────
// Fichier central de gestion des galeries photos.
// Pour ajouter des photos : dépose le fichier dans le bon dossier
// /public/gallery/<slug>/ puis ajoute son chemin dans photos[].
// ─────────────────────────────────────────────────────────────

export const galleries = [
  {
    slug: 'coiffure',
    cover: '/coiffure 1.jpg',       // image affichée sur l'accueil
    photos: [
      '/gallery/coiffure/1.jpg',
      '/gallery/coiffure/2.jpg',
      '/gallery/coiffure/3.jpg',
      '/gallery/coiffure/4.jpg',
      '/gallery/coiffure/5.jpg',
      '/gallery/coiffure/6.jpg',
    ],
  },
  {
    slug: 'soin-capillaire',
    cover: '/soin-capillaire 2.jpg',
    photos: [
      '/gallery/soin-capillaire/1.jpg',
      '/gallery/soin-capillaire/2.jpg',
      '/gallery/soin-capillaire/3.jpg',
      '/gallery/soin-capillaire/4.jpg',
    ],
  },
  {
    slug: 'soin-visage',
    cover: '/soin de visage.webp',
    photos: [
      '/gallery/soin-visage/1.jpg',
      '/gallery/soin-visage/2.jpg',
      '/gallery/soin-visage/3.jpg',
      '/gallery/soin-visage/4.jpg',
    ],
  },
  {
    slug: 'massage',
    cover: '/massage.jpg',
    photos: [
      '/gallery/massage/1.jpg',
      '/gallery/massage/2.jpg',
      '/gallery/massage/3.jpg',
      '/gallery/massage/4.jpg',
    ],
  },
  {
    slug: 'epilation',
    cover: '/epilation.png',
    photos: [
      '/gallery/epilation/1.jpg',
      '/gallery/epilation/2.jpg',
      '/gallery/epilation/3.jpg',
    ],
  },
  {
    slug: 'salon',
    cover: '/forfait-premium.jpg',
    photos: [
      '/gallery/forfait-premium/1.png',
      '/gallery/forfait-premium/2.png',
      '/gallery/forfait-premium/3.png',
      '/gallery/forfait-premium/4.png',
      '/gallery/forfait-premium/5.png',
      '/gallery/forfait-premium/6.png',
      '/gallery/forfait-premium/7.png',
    ],
  },
]