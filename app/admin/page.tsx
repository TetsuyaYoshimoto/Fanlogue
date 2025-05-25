"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Calendar,
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  Filter,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// モックデータ
const mockStats = {
  totalUsers: 50234,
  totalArtists: 1247,
  totalEvents: 8956,
  monthlyActiveUsers: 32145,
  pendingApprovals: 23,
  recentRegistrations: 156,
}

const mockRecentActivities = [
  {
    id: 1,
    type: "user_registration",
    user: "田中太郎",
    action: "新規ユーザー登録",
    timestamp: "2024-01-15T10:30:00Z",
    status: "completed",
  },
  {
    id: 2,
    type: "event_submission",
    user: "BAND A",
    action: "新しいイベント申請",
    timestamp: "2024-01-15T09:15:00Z",
    status: "pending",
  },
  {
    id: 3,
    type: "artist_verification",
    user: "Singer B",
    action: "アーティスト認証申請",
    timestamp: "2024-01-15T08:45:00Z",
    status: "approved",
  },
]

const mockPendingApprovals = [
  {
    id: 1,
    type: "event",
    title: "BAND A 夏フェス2024",
    submitter: "BAND A",
    submittedAt: "2024-01-14T15:30:00Z",
    priority: "high",
  },
  {
    id: 2,
    type: "artist",
    title: "新人アーティスト DJ NOVA",
    submitter: "DJ NOVA",
    submittedAt: "2024-01-14T12:20:00Z",
    priority: "medium",
  },
  {
    id: 3,
    type: "user_report",
    title: "不適切なコンテンツ報告",
    submitter: "ユーザー123",
    submittedAt: "2024-01-14T11:10:00Z",
    priority: "high",
  },
]

export default function AdminDashboard() {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-red-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
      case "medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* サイドバー */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl">
        <AdminSidebar onLogout={handleLogout} />
      </div>

      {/* メインコンテンツ */}
      <div className="ml-64">
        {/* ヘッダー */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">管理者ダッシュボード</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="ghost" size="sm">
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* メインコンテンツエリア */}
        <main className="p-6 space-y-6">
          {/* 統計カード */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">総ユーザー数</p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                      {mockStats.totalUsers.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400">+{mockStats.recentRegistrations} 今月</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">登録アーティスト</p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                      {mockStats.totalArtists.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400">+12 今月</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">総イベント数</p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                      {mockStats.totalEvents.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400">+89 今月</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">月間アクティブ</p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                      {mockStats.monthlyActiveUsers.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400">+8.2%</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 承認待ち項目 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  承認待ち項目
                  <Badge className="ml-2 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                    {mockStats.pendingApprovals}
                  </Badge>
                </CardTitle>
                <Button variant="ghost" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  フィルター
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPendingApprovals.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">{item.title}</h3>
                        <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        申請者: {item.submitter} • {new Date(item.submittedAt).toLocaleDateString("ja-JP")}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                        却下
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        承認
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 最近のアクティビティ */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  最近のアクティビティ
                </CardTitle>
                <Link href="/admin/activities">
                  <Button variant="ghost" size="sm">
                    すべて見る
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    {getStatusIcon(activity.status)}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{activity.action}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {activity.user} • {new Date(activity.timestamp).toLocaleString("ja-JP")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

function AdminSidebar({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* ロゴ */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Fanlogue
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">管理者パネル</p>
      </div>

      {/* ナビゲーション */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/admin"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
            >
              <BarChart3 className="w-5 h-5" />
              <span>ダッシュボード</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/users"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Users className="w-5 h-5" />
              <span>一般ユーザー管理</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/business-users"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Users className="w-5 h-5" />
              <span>ビジネスユーザー管理</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/artists"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              <span>アーティスト管理</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/events"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              <span>イベント管理</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/settings"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>システム設定</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* ログアウト */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
          onClick={onLogout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          ログアウト
        </Button>
      </div>
    </div>
  )
}
