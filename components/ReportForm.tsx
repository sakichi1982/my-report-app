'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ReportForm() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [location, setLocation] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  // components/ReportForm.tsx の一部修正
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // 現在ログインしているユーザーを取得
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      alert('ログインが必要です')
      return
    }

    const { error } = await supabase.from('reports').insert({
      report_date: date,
      location: location,
      content: content,
      user_id: user.id // ここでユーザーIDを紐付け
    })
    // ...以下、以前と同じ
    setLoading(false)
    if (error) alert('エラー: ' + error.message)
    else {
      alert('保存しました！')
      setLocation(''); setContent('');
    }
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
        日報を記録する
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">日付</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} 
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">場所</label>
            <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="例: 会議室A、客先"
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">内容</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="今日おこなった業務内容を記入してください"
            className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none" required />
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-200 disabled:bg-gray-400">
          {loading ? '保存中...' : 'この内容で登録する'}
        </button>
      </form>
    </div>
  )
}