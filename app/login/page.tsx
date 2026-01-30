// app/login/page.tsx (修正版)
'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSignUpMode, setIsSignUpMode] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return alert('入力してください')
    setLoading(true)

    if (isSignUpMode) {
      // 新規登録
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) alert(error.message)
      else { alert('登録成功！'); router.replace('/') }
    } else {
      // ログイン
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) alert(error.message)
      else router.replace('/')
    }
    setLoading(false)
  }

  // ★ パスワードリセットメール送信関数
  const handleResetPassword = async () => {
    if (!email) return alert('メールアドレスを入力してから押してください')
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/reset-password',
    })
    
    if (error) alert(error.message)
    else alert('パスワード再設定メールを送信しました！メールを確認してください。')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          {isSignUpMode ? '新規登録' : 'Daily Report'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="メールアドレス" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 border rounded-lg" required />
          <input type="password" placeholder="パスワード" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border rounded-lg" required />
          
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold">
            {loading ? '処理中...' : isSignUpMode ? '登録する' : 'ログイン'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          {/* ★ パスワード忘れボタン */}
          {!isSignUpMode && (
            <button onClick={handleResetPassword} className="block w-full text-xs text-gray-400 hover:text-gray-600">
              パスワードを忘れた場合
            </button>
          )}

          <button onClick={() => setIsSignUpMode(!isSignUpMode)} className="text-sm text-blue-500 font-bold hover:underline">
            {isSignUpMode ? 'ログインに戻る' : '新規アカウント作成'}
          </button>
        </div>
      </div>
    </div>
  )
}