'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function CsvExport() {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  const handleExport = async () => {
    if (!start || !end) return alert('期間を選択してください')
    const { data, error } = await supabase
      .from('reports').select('*')
      .gte('report_date', start).lte('report_date', end)
      .order('report_date', { ascending: true })

    if (error || !data) return alert('失敗しました')

    const headers = "日付,場所,内容\n"
    const csvContent = data.map(r => `${r.report_date},${r.location},${r.content}`).join("\n")
    const bom = "\uFEFF"
    const blob = new Blob([bom + headers + csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `report_${start}_to_${end}.csv`
    a.click()
  }

  return (
    <div className="mt-8 p-4 border-t">
      <h2 className="font-bold mb-2">CSV出力</h2>
      <div className="flex gap-2">
        <input type="date" onChange={e => setStart(e.target.value)} className="border p-2" />
        <input type="date" onChange={e => setEnd(e.target.value)} className="border p-2" />
        <button onClick={handleExport} className="bg-green-600 text-white px-4 rounded">出力</button>
      </div>
    </div>
  )
}