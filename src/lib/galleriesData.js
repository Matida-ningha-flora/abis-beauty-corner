// lib/galleriesData.js
// ─────────────────────────────────────────────────────────────
// Fichier central de gestion des galeries.
// Chaque média a un type : 'image' ou 'video'
// Pour les vidéos, 'poster' est l'image affichée avant lecture (optionnel)
//
// Pour ajouter un média :
//   1. Dépose le fichier dans /public/gallery/<slug>/
//   2. Ajoute une entrée dans le tableau medias[] ci-dessous
// ─────────────────────────────────────────────────────────────

export const galleries = [
  {
    slug: 'coiffure',
    cover: '/coiffure 1.jpg',
    medias: [
      { type: 'image', src: '/gallery/coiffure/1.jpg' },
      { type: 'image', src: '/gallery/coiffure/2.jpg' },
      { type: 'image', src: '/gallery/coiffure/3.jpg' },
      { type: 'video', src: '/gallery/coiffure/video1.mp4', poster: '/gallery/coiffure/video1-cover.jpg' },
      { type: 'image', src: '/gallery/coiffure/4.jpg' },
      { type: 'image', src: '/gallery/coiffure/5.jpg' },
      { type: 'video', src: '/gallery/coiffure/video2.mp4', poster: '/gallery/coiffure/video2-cover.jpg' },
    ],
  },
  {
    slug: 'tresses',
    cover: '/soin-capillaire 2.jpg',
    medias: [
      { type: 'image', src: '/gallery/tresses/1.jpg' },
      { type: 'image', src: '/gallery/tresses/2.jpg' },
      { type: 'video', src: '/gallery/tresses/video1.mp4', poster: '/gallery/tresses/video1-cover.jpg' },
      { type: 'image', src: '/gallery/tresses/3.jpeg' },
      { type: 'video', src: '/gallery/tresses/4.mp4', poster: '/gallery/tresses/4.mp4-cover.jpg' },
      { type: 'image', src: '/gallery/tresses/4.jpg' },
    ],
  },
  {
    slug: 'soin-visage',
    cover: '/soin de visage.webp',
    medias: [
      { type: 'image', src: '/gallery/soin-visage/1.jpg' },
      { type: 'image', src: '/gallery/soin-visage/2.jpg' },
      { type: 'video', src: '/gallery/soin-visage/video1.mp4', poster: '/gallery/soin-visage/video1-cover.jpg' },
      { type: 'image', src: '/gallery/soin-visage/3.jpg' },
      { type: 'image', src: '/gallery/soin-visage/4.jpg' },
    ],
  },
  {
    slug: 'massage',
    cover: '/massage.jpg',
    medias: [
      { type: 'image', src: '/gallery/massage/1.jpg' },
      { type: 'video', src: '/gallery/massage/video1.mp4', poster: '/gallery/massage/video1-cover.jpg' },
      { type: 'image', src: '/gallery/massage/2.jpg' },
      { type: 'image', src: '/gallery/massage/3.jpg' },
      { type: 'image', src: '/gallery/massage/4.jpg' },
    ],
  },
  {
    slug: 'epilation',
    cover: '/epilation.png',
    medias: [
      { type: 'image', src: '/gallery/epilation/1.jpg' },
      { type: 'image', src: '/gallery/epilation/2.jpg' },
      { type: 'video', src: '/gallery/epilation/video1.mp4', poster: '/gallery/epilation/video1-cover.jpg' },
      { type: 'image', src: '/gallery/epilation/3.jpg' },
    ],
  },
  {
    slug: 'salon',
    cover: '/forfait-premium.jpg',
    medias: [
      { type: 'image', src: '/gallery/salon/1.png' },
      { type: 'image', src: '/gallery/salon/2.png' },
      { type: 'video', src: '/gallery/salon/video1.mp4', poster: '/gallery/salon/video1-cover.jpg' },
      { type: 'image', src: '/gallery/salon/3.png' },
      { type: 'video', src: '/gallery/salon/video2.mp4', poster: '/gallery/salon/video2-cover.jpg' },
      { type: 'image', src: '/gallery/salon/4.png' },
      { type: 'image', src: '/gallery/salon/5.png' },
      { type: 'image', src: '/gallery/salon/6.png' },
      { type: 'image', src: '/gallery/salon/7.png' },
      { type: 'image', src: '/gallery/salon/8.png' },
    ],
  },
]