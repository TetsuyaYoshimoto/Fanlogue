export default function AdminArtistsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="lg:ml-64">
        <div className="container mx-auto px-6 py-8">
          <div className="animate-pulse space-y-6">
            {/* ヘッダー */}
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>

            {/* 検索・フィルター */}
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>

            {/* テーブル */}
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
