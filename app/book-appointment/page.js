'use client'

import { Suspense } from 'react'
import BookAppointment from './_AppointmentForm'

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading appointment form...</div>}>
      <BookAppointment />
    </Suspense>
  )
}
