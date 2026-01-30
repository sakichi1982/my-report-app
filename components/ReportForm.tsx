'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ReportForm() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [location, setLocation] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.from('reports').insert({
      report_date: date,
      location: location,
      content: content,
    })

    if (error) alert('エラー: ' + error.message)
    else {
      alert('保存しました！')
      setLocation(''); setContent('');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow-sm bg-white">
      <div><label className="block text-sm">日付</label>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full border p-2" required /></div>
      <div><label className="block text-sm">場所</label>
      <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="w-full border p-2" required /></div>
      <div><label className="block text-sm">内容</label>
      <textarea value={content} onChange={e => setContent(e.target.value)} className="w-full border p-2 h-24" required /></div>
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">登録</button>
    </form>
  )
}