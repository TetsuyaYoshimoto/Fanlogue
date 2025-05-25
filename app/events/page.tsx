"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Calendar, MapPin, Clock, Users, Sparkles, Menu, Share2, CheckCircle, Star } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"

// モックデータ
const mockEvents = [
  {
    id: 1,
    name: "秋のグルメフェスティバル",
    organizer: "フードフェス実行委員会",
    organizerImage: "/placeholder.svg?height=40&width=40",
    date: "2024-08-15",
    time: "11:00",
    venue: "代々木公園",
    location: "東京",
    price: "入場無料",
    image: "/placeholder.svg?height=200&width=300",
    description: "秋の味覚を楽しめる大規模なグルメフェスティバル！全国の美味しいグルメが集結",
    tags: ["フード", "グルメ", "屋外"],
    attendees: 5000,
    isBookmarked: true,
    status: "開催中",
    category: "フード",
    checkedIn: false,
    isOfficial: true, // 公式イベント
  },
  {
    id: 2,
    name: "AI開発入門ワークショップ",
    organizer: "テックワークショップ",
    organizerImage: "/placeholder.svg?height=40&width=40",
    date: "2024-07-20",
    time: "14:00",
    venue: "渋谷コワーキングスペース",
    location: "東京",
    price: "¥3,000",
    image: "/placeholder.svg?height=200&width=300",
    description: "初心者向けのAI開発ワークショップ。実際にコードを書きながら学べます",
    tags: ["ワークショップ", "AI", "プログラミング"],
    attendees: 30,
    isBookmarked: false,
    status: "募集中",
    category: "ワークショップ",
    checkedIn: false,
    isOfficial: false, // 一般イベント
  },
  {
    id: 3,
    name: "現代アート展示会",
    organizer: "アートギャラリー協会",
    organizerImage: "/placeholder.svg?height=40&width=40",
    date: "2024-09-01",
    time: "10:00",
    venue: "六本木ギャラリー",
    location: "東京",
    price: "¥1,500",
    image: "/placeholder.svg?height=200&width=300",
    description: "新進気鋭のアーティストによる現代アート作品を展示",
    tags: ["アート", "展示", "現代美術"],
    attendees: 200,
    isBookmarked: true,
    status: "開催予定",
    category: "アート",
    checkedIn: false,
    isOfficial: true, // 公式イベント
  },
  {
    id: 4,
    name: "ヨガ体験ワークショップ",
    organizer: "ウェルネススタジオ",
    organizerImage: "/placeholder.svg?height=40&width=40",
    date: "2024-07-25",
    time: "09:00",
    venue: "恵比寿スタジオ",
    location: "東京",
    price: "¥2,000",
    image: "/placeholder.svg?height=200&width=300",
    description: "初心者歓迎！心と体をリフレッシュするヨガ体験",
    tags: ["ヨガ", "健康", "ワークショップ"],
    attendees: 20,
    isBookmarked: false,
    status: "募集中",
    category: "健康",
    checkedIn: true,
    isOfficial: false, // 一般イベント
  },
]

const eventTypes = ["すべて", "フード", "ワークショップ", "アート", "健康", "音楽", "スポーツ"]
const locations = ["すべて", "東京", "大阪", "名古屋", "横浜", "京都"]

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("すべて")
  const [selectedLocation, setSelectedLocation] = useState("すべて")
  const [events, setEvents] = useState(mockEvents)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleBookmark = (eventId: number) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === eventId ? { ...event, isBookmarked: !event.isBookmarked } : event)),
    )
  }

  const handleCheckIn = (eventId: number) => {
    setEvents((prev) => prev.map((event) => (event.id === eventId ? { ...event, checkedIn: true } : event)))
    // チェックイン成功のアニメーションやポイント付与の処理をここに追加
    console.log(`Event ${eventId} checked in! Points and stamps awarded.`)
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "すべて" || event.tags.some((tag) => tag.includes(selectedType))
    const matchesLocation = selectedLocation === "すべて" || event.location === selectedLocation
    return matchesSearch && matchesType && matchesLocation
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "開催中":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      case "募集中":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
      case "開催予定":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "終了":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* モバイルサイドバー */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl">
            <Sidebar />
          </div>
        </div>
      )}

      {/* デスクトップサイドバー */}
      <div className="hidden lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 lg:block">
        <div className="h-full bg-white dark:bg-gray-800 shadow-xl">
          <Sidebar />
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                イベント
              </h1>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Fanlogue
              </span>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* 検索・フィルター */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="イベント名、主催者名、会場名で検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 border-0 bg-white dark:bg-gray-800 shadow-lg"
                />
              </div>
              <Button variant="outline" className="h-12 px-6">
                <Filter className="w-4 h-4 mr-2" />
                詳細フィルター
              </Button>
            </div>

            {/* フィルター */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">種類:</span>
                {eventTypes.map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                    className={selectedType === type ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white" : ""}
                  >
                    {type}
                  </Button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">地域:</span>
                {locations.map((location) => (
                  <Button
                    key={location}
                    variant={selectedLocation === location ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLocation(location)}
                    className={
                      selectedLocation === location ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white" : ""
                    }
                  >
                    {location}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* 結果表示 */}
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400">{filteredEvents.length}件のイベントが見つかりました</p>
          </div>

          {/* イベント一覧 */}
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <Card
                key={event.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800 overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* イベント画像エリア */}
                  <div className="relative h-48 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 text-center text-white">
                      <Calendar className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm opacity-90">
                        {new Date(event.date).toLocaleDateString("ja-JP", {
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    {/* ステータスバッジ */}
                    <Badge className={`absolute top-4 left-4 ${getStatusColor(event.status)}`}>{event.status}</Badge>

                    {/* 公式バッジ */}
                    {event.isOfficial && (
                      <Badge className="absolute top-12 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                        <Sparkles className="w-3 h-3 mr-1" />
                        公式
                      </Badge>
                    )}

                    {/* チェックイン済みバッジ */}
                    {event.checkedIn && (
                      <Badge className="absolute top-4 right-4 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        チェックイン済み
                      </Badge>
                    )}
                  </div>

                  {/* イベント情報 */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{event.name}</h3>

                      {/* 主催者情報 */}
                      <div className="flex items-center space-x-2 mb-3">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={event.organizerImage || "/placeholder.svg"} alt={event.organizer} />
                          <AvatarFallback className="text-xs">{event.organizer[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{event.organizer}</span>
                        {event.isOfficial && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                            <Sparkles className="w-2 h-2 mr-1" />
                            公式
                          </Badge>
                        )}
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">{event.description}</p>
                    </div>

                    {/* イベント詳細 */}
                    <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          {new Date(event.date).toLocaleDateString("ja-JP")} {event.time}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {event.venue}, {event.location}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees.toLocaleString()}人が参加予定</span>
                      </div>
                    </div>

                    {/* タグ */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {event.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* アクションボタン */}
                    <div className="flex space-x-2">
                      <Link href={`/events/${event.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          詳細を見る
                        </Button>
                      </Link>

                      {!event.checkedIn ? (
                        <Button
                          onClick={() => handleCheckIn(event.id)}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 relative overflow-hidden group"
                        >
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4" />
                            <span>チェックイン</span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </Button>
                      ) : (
                        <Button disabled className="bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 px-6">
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4" />
                            <span>完了</span>
                          </div>
                        </Button>
                      )}

                      <Button size="sm" variant="ghost">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 検索結果が空の場合 */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                イベントが見つかりませんでした
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">検索条件を変更してもう一度お試しください</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedType("すべて")
                  setSelectedLocation("すべて")
                }}
              >
                フィルターをリセット
              </Button>
            </div>
          )}

          {/* ページネーション */}
          {filteredEvents.length > 0 && (
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <Button variant="outline" disabled>
                  前へ
                </Button>
                <Button variant="default" className="bg-gradient-to-r from-indigo-500 to-purple-600">
                  1
                </Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">次へ</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
