// app/reset-password/page.tsx
'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // ログイン中のユーザーのパスワードを上書きする
    const { error } = await supabase.auth.updateUser({
      password: password
    })

    if (error) {
      alert('エラー: ' + error.message)
    } else {
      alert('パスワードを変更しました！トップページへ移動します。')
      router.replace('/')
    }
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">新しいパスワードを設定</h1>
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <input 
            type="password" 
            placeholder="新しいパスワード" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            className="w-full p-3 border rounded-lg"
            required 
          />
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold">
            {loading ? '変更中...' : 'パスワードを変更する'}
          </button>
        </form>
      </div>
    </div>
  )
}