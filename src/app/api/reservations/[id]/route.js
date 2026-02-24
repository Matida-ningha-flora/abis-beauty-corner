import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function PATCH(request, { params }) {
  try {
    const { statut } = await request.json()
    const reservation = await prisma.reservation.update({
      where: { id: parseInt(params.id) },
      data: { statut }
    })
    return NextResponse.json({ success: true, reservation })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.reservation.delete({
      where: { id: parseInt(params.id) }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}