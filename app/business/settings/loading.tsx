export default function BusinessSettingsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="ml-64">
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            {/* ヘッダー */}
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>

            {/* タブ */}
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>

            {/* フォームエリア */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
