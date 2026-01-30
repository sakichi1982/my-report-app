import ReportForm from '@/components/ReportForm'
import CsvExport from '@/components/CsvExport'

export default function Home() {
  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-6">日報アプリ</h1>
      <ReportForm />
      <CsvExport />
    </main>
  )
}