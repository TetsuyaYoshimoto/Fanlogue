"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Star,
  Users,
  TrendingUp,
  Menu,
  ArrowRight,
  MapPin,
  Clock,
  Plus,
  UserPlus,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"

// モックデータ
const mockUser = {
  name: "田中 太郎",
  email: "tanaka@example.com",
  points: 1250,
  avatar: "/placeholder.svg?height=40&width=40",
}

const mockFollowedOrganizers = [
  {
    id: 1,
    name: "フードフェス実行委員会",
    image: "/placeholder.svg?height=60&width=60",
    newEvent: "秋のグルメフェスティバル",
    eventDate: "2024-08-15",
  },
  {
    id: 2,
    name: "テックワークショップ",
    image: "/placeholder.svg?height=60&width=60",
    newEvent: "AI開発入門セミナー",
    eventDate: "2024-07-20",
  },
]

const mockUpcomingEvents = [
  {
    id: 1,
    name: "秋のグルメフェスティバル",
    organizer: "フードフェス実行委員会",
    date: "2024-08-15",
    time: "11:00",
    venue: "代々木公園",
    image: "/placeholder.svg?height=80&width=80",
    status: "参加予定",
    category: "フード",
  },
  {
    id: 2,
    name: "AI開発入門セミナー",
    organizer: "テックワークショップ",
    date: "2024-07-20",
    time: "14:00",
    venue: "渋谷コワーキングスペース",
    image: "/placeholder.svg?height=80&width=80",
    status: "チェックイン済み",
    category: "ワークショップ",
  },
]

const mockRecommendedEvents = [
  {
    id: 3,
    name: "アートギャラリー展示会",
    organizer: "現代アート協会",
    date: "2024-09-01",
    venue: "六本木ギャラリー",
    image: "/placeholder.svg?height=80&width=80",
    tags: ["アート", "展示"],
    category: "アート",
  },
  {
    id: 4,
    name: "ヨガ体験ワークショップ",
    organizer: "ウェルネススタジオ",
    date: "2024-07-25",
    venue: "恵比寿スタジオ",
    image: "/placeholder.svg?height=80&width=80",
    tags: ["健康", "ワークショップ"],
    category: "健康",
  },
]

const mockFriends = [
  {
    id: 1,
    name: "佐藤花子",
    avatar: "/placeholder.svg?height=40&width=40",
    recentEvent: "プログラミング勉強会",
    eventDate: "2024-01-18",
  },
  {
    id: 2,
    name: "山田次郎",
    avatar: "/placeholder.svg?height=40&width=40",
    recentEvent: "料理教室",
    eventDate: "2024-01-17",
  },
]

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* モバイルサイドバー */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl">
            <Sidebar onLogout={handleLogout} />
          </div>
        </div>
      )}

      {/* デスクトップサイドバー */}
      <div className="hidden lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 lg:block">
        <div className="h-full bg-white dark:bg-gray-800 shadow-xl">
          <Sidebar onLogout={handleLogout} />
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="lg:ml-64">
        {/* ヘッダー */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">ダッシュボード</h1>
            </div>

            <div className="flex items-center space-x-4"></div>
          </div>
        </header>

        {/* メインコンテンツエリア */}
        <main className="p-4 space-y-6">
          {/* ウェルカムセクション */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">おかえりなさい、{mockUser.name}さん！</h2>
                <p className="text-indigo-100 mb-4">今日も素敵なイベント体験を楽しみましょう</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-300" />
                    <span className="font-semibold">{mockUser.points.toLocaleString()} ポイント</span>
                  </div>
                  <Link href="/rewards">
                    <Button variant="secondary" size="sm">
                      ポイント履歴
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* クイックアクション */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/create-event">
              <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">イベント作成</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/friends">
              <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <UserPlus className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">フレンド</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/events">
              <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">イベント検索</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/rewards">
              <Card className="border-0 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">リワード</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* 統計カード */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">フォロー中</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">参加イベント</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200">28</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">スタンプ</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200">15</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">今月の参加</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* フレンドの最近の活動 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  フレンドの最近の活動
                </CardTitle>
                <Link href="/friends">
                  <Button variant="ghost" size="sm">
                    すべて見る
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFriends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                      <AvatarFallback>{friend.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">{friend.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">参加: {friend.recentEvent}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {new Date(friend.eventDate).toLocaleDateString("ja-JP")}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                    >
                      新着
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* フォロー中の主催者新着情報 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  フォロー中の主催者新着情報
                </CardTitle>
                <Link href="/organizers">
                  <Button variant="ghost" size="sm">
                    すべて見る
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFollowedOrganizers.map((organizer) => (
                  <div
                    key={organizer.id}
                    className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={organizer.image || "/placeholder.svg"} alt={organizer.name} />
                      <AvatarFallback>{organizer.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">{organizer.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">新しいイベント: {organizer.newEvent}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {new Date(organizer.eventDate).toLocaleDateString("ja-JP")}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                    >
                      新着
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 参加予定イベント */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">参加予定イベント</CardTitle>
                <Link href="/events">
                  <Button variant="ghost" size="sm">
                    すべて見る
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUpcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">{event.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{event.organizer}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>
                            {new Date(event.date).toLocaleDateString("ja-JP")} {event.time}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{event.venue}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="outline"
                        className={
                          event.status === "チェックイン済み"
                            ? "border-green-200 text-green-700 dark:border-green-800 dark:text-green-300"
                            : "border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300"
                        }
                      >
                        {event.status}
                      </Badge>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{event.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* おすすめイベント */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">おすすめイベント</CardTitle>
                <Link href="/events">
                  <Button variant="ghost" size="sm">
                    すべて見る
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {mockRecommendedEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-red-500 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">{event.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{event.organizer}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500 mb-2">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(event.date).toLocaleDateString("ja-JP")}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{event.venue}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {event.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
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
