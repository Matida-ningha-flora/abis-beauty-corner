'use client'
import { useEffect, useState } from 'react'

export default function Admin() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchReservations = () => {
    fetch('/api/reservations')
      .then(r => r.json())
      .then(data => { setReservations(data); setLoading(false) })
  }

  useEffect(() => { fetchReservations() }, [])

  const updateStatut = async (id, statut) => {
    await fetch(`/api/reservations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statut })
    })
    fetchReservations()
  }

  const deleteReservation = async (id) => {
    if (!confirm('Supprimer cette réservation ?')) return
    await fetch(`/api/reservations/${id}`, { method: 'DELETE' })
    fetchReservations()
  }

  const total = reservations.length
  const enAttente = reservations.filter(r => r.statut === 'en_attente').length
  const confirmes = reservations.filter(r => r.statut === 'confirmé').length
  const annules = reservations.filter(r => r.statut === 'annulé').length

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', padding: '3rem 2rem', color: '#fff' }}>
      <h1 style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: '3rem', marginBottom: '2rem',
        background: 'linear-gradient(135deg, #fff, #a0c4ff)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>
        Dashboard — Réservations
      </h1>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total', value: total, color: '#a0c4ff' },
          { label: 'En attente', value: enAttente, color: '#ffa500' },
          { label: 'Confirmés', value: confirmes, color: '#00c864' },
          { label: 'Annulés', value: annules, color: '#ff4444' },
        ].map(s => (
          <div key={s.label} style={{
            background: '#0D1B2A', border: `1px solid ${s.color}33`,
            borderRadius: '8px', padding: '1.2rem', textAlign: 'center'
          }}>
            <p style={{ fontSize: '2rem', fontWeight: '700', color: s.color }}>{s.value}</p>
            <p style={{ color: '#B0B0B0', fontSize: '0.8rem', letterSpacing: '0.1em' }}>{s.label.toUpperCase()}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <p style={{ color: '#B0B0B0' }}>Chargement...</p>
      ) : reservations.length === 0 ? (
        <p style={{ color: '#B0B0B0' }}>Aucune réservation pour le moment.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {reservations.map((r) => (
            <div key={r.id} style={{
              background: '#0D1B2A',
              border: `1px solid ${r.statut === 'confirmé' ? 'rgba(0,200,100,0.3)' : r.statut === 'annulé' ? 'rgba(255,68,68,0.3)' : 'rgba(26,109,255,0.2)'}`,
              borderRadius: '8px', padding: '1.5rem',
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem', marginBottom: '1rem'
              }}>
                <div>
                  <p style={{ color: '#B0B0B0', fontSize: '0.7rem', letterSpacing: '0.1em' }}>CLIENT</p>
                  <p style={{ fontWeight: '600' }}>{r.nom}</p>
                </div>
                <div>
                  <p style={{ color: '#B0B0B0', fontSize: '0.7rem', letterSpacing: '0.1em' }}>TÉLÉPHONE</p>
                  <p>{r.telephone}</p>
                </div>
                <div>
                  <p style={{ color: '#B0B0B0', fontSize: '0.7rem', letterSpacing: '0.1em' }}>SERVICE</p>
                  <p style={{ color: '#1A6DFF' }}>{r.service}</p>
                </div>
                <div>
                  <p style={{ color: '#B0B0B0', fontSize: '0.7rem', letterSpacing: '0.1em' }}>DATE</p>
                  <p>{r.date} à {r.heure}</p>
                </div>
                <div>
                  <p style={{ color: '#B0B0B0', fontSize: '0.7rem', letterSpacing: '0.1em' }}>STATUT</p>
                  <span style={{
                    background: r.statut === 'confirmé' ? 'rgba(0,200,100,0.2)' : r.statut === 'annulé' ? 'rgba(255,68,68,0.2)' : 'rgba(255,165,0,0.2)',
                    color: r.statut === 'confirmé' ? '#00c864' : r.statut === 'annulé' ? '#ff4444' : '#ffa500',
                    padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem',
                  }}>
                    {r.statut}
                  </span>
                </div>
              </div>

              {r.message && (
                <p style={{ color: '#B0B0B0', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  💬 {r.message}
                </p>
              )}

              {/* Boutons actions */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {r.statut !== 'confirmé' && (
                  <button onClick={() => updateStatut(r.id, 'confirmé')} style={{
                    background: 'rgba(0,200,100,0.15)', color: '#00c864',
                    border: '1px solid rgba(0,200,100,0.4)',
                    padding: '0.4rem 1rem', borderRadius: '4px',
                    cursor: 'pointer', fontSize: '0.8rem',
                  }}>
                    ✓ Confirmer
                  </button>
                )}
                {r.statut !== 'annulé' && (
                  <button onClick={() => updateStatut(r.id, 'annulé')} style={{
                    background: 'rgba(255,165,0,0.15)', color: '#ffa500',
                    border: '1px solid rgba(255,165,0,0.4)',
                    padding: '0.4rem 1rem', borderRadius: '4px',
                    cursor: 'pointer', fontSize: '0.8rem',
                  }}>
                    ✗ Annuler
                  </button>
                )}
                {r.statut === 'en_attente' && (
                  <button onClick={() => updateStatut(r.id, 'en_attente')} style={{ display: 'none' }} />
                )}
                <button onClick={() => deleteReservation(r.id)} style={{
                  background: 'rgba(255,68,68,0.15)', color: '#ff4444',
                  border: '1px solid rgba(255,68,68,0.4)',
                  padding: '0.4rem 1rem', borderRadius: '4px',
                  cursor: 'pointer', fontSize: '0.8rem',
                  marginLeft: 'auto',
                }}>
                  🗑 Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}