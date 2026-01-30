'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import ReportForm from '@/components/ReportForm'
import CsvExport from '@/components/CsvExport'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      // セッションを確認
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        // セッションがなければ即座にログイン画面へ
        router.replace('/login')
      } else {
        setUser(session.user)
      }
      setLoading(false)
    }
    checkUser()
  }, [router])

  // ★ 強力なログアウト関数
  const handleLogout = async () => {
    await supabase.auth.signOut() // Supabaseからサインアウト
    router.replace('/login')      // 履歴を残さずログイン画面へ移動
  }

  if (loading) return <div className="flex justify-center items-center min-h-screen font-bold">読み込み中...</div>
  if (!user) return null

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50 text-gray-900">
      <div className="max-w-2xl mx-auto">
        <header className="flex justify-between items-center mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-black text-blue-600">Daily Report</h1>
            <p className="text-gray-500 text-xs mt-1">{user.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-red-50 text-red-600 font-bold px-4 py-2 rounded-xl border border-red-100 hover:bg-red-600 hover:text-white transition-all"
          >
            ログアウト
          </button>
        </header>

        <ReportForm />
        <CsvExport />
      </div>
    </div>
  )
}