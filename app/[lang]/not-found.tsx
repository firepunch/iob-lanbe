import { redirect } from 'next/navigation'

export default async function NotFound() {
  redirect('/')
  return null
}