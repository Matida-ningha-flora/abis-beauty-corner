import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const body = await request.json()
    const { nom, telephone, service, date, heure, message } = body

    if (!nom || !telephone || !service || !date || !heure) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      )
    }

    const reservation = await prisma.reservation.create({
      data: { nom, telephone, service, date, heure, message: message || '' }
    })

    return NextResponse.json({ success: true, reservation }, { status: 201 })
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(reservations)
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}