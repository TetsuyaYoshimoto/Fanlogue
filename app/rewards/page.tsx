"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Star, TrendingUp, Clock, Award, Gift, Trophy, Sparkles, Menu } from "lucide-react"
import { Sidebar } from "@/components/sidebar"

// モックデータ
const mockUser = {
  name: "田中 太郎",
  currentPoints: 1250,
  totalStamps: 15,
  rank: 3,
}

const mockPointHistory = [
  {
    id: 1,
    type: "earned",
    amount: 50,
    reason: "イベント参加",
    event: "BAND A 夏フェス2024",
    artist: "BAND A",
    date: "2024-01-20T19:00:00Z",
    currentTotal: 1250,
  },
  {
    id: 2,
    type: "earned",
    amount: 30,
    reason: "イベント情報登録",
    event: "Singer B ファンミーティング",
    artist: "Singer B",
    date: "2024-01-18T14:00:00Z",
    currentTotal: 1200,
  },
  {
    id: 3,
    type: "spent",
    amount: -100,
    reason: "限定グッズ交換",
    event: "BAND A オリジナルTシャツ",
    artist: "BAND A",
    date: "2024-01-15T10:30:00Z",
    currentTotal: 1170,
  },
  {
    id: 4,
    type: "earned",
    amount: 75,
    reason: "イベント参加",
    event: "DJ COSMIC エレクトロナイト",
    artist: "DJ COSMIC",
    date: "2024-01-12T22:00:00Z",
    currentTotal: 1270,
  },
]

const mockStamps = [
  {
    id: 1,
    name: "BAND A 夏フェス参加",
    image: "/placeholder.svg?height=80&width=80",
    artist: "BAND A",
    event: "BAND A 夏フェス2024",
    acquiredAt: "2024-01-20T19:00:00Z",
    rarity: "rare",
    description: "2024年夏フェスに参加した証",
  },
  {
    id: 2,
    name: "Singer B ファンミ参加",
    image: "/placeholder.svg?height=80&width=80",
    artist: "Singer B",
    event: "Singer B ファンミーティング",
    acquiredAt: "2024-01-18T14:00:00Z",
    rarity: "common",
    description: "ファンミーティングに参加した証",
  },
  {
    id: 3,
    name: "DJ COSMIC 初参加",
    image: "/placeholder.svg?height=80&width=80",
    artist: "DJ COSMIC",
    event: "DJ COSMIC エレクトロナイト",
    acquiredAt: "2024-01-12T22:00:00Z",
    rarity: "epic",
    description: "DJ COSMICのイベント初参加記念",
  },
]

const mockLeaderboard = [
  {
    rank: 1,
    username: "音楽ファン123",
    points: 2850,
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "プラチナ",
  },
  {
    rank: 2,
    username: "ライブ大好き",
    points: 2340,
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "ゴールド",
  },
  {
    rank: 3,
    username: "田中 太郎",
    points: 1250,
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "シルバー",
    isCurrentUser: true,
  },
  {
    rank: 4,
    username: "推し活マスター",
    points: 1180,
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "シルバー",
  },
  {
    rank: 5,
    username: "イベント通",
    points: 980,
    avatar: "/placeholder.svg?height=40&width=40",
    badge: "ブロンズ",
  },
]

export default function RewardsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("all")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "epic":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
      case "rare":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
      case "common":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "プラチナ":
        return "bg-gradient-to-r from-gray-400 to-gray-600 text-white"
      case "ゴールド":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
      case "シルバー":
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white"
      case "ブロンズ":
        return "bg-gradient-to-r from-orange-400 to-orange-600 text-white"
      default:
        return "bg-gray-100 text-gray-700"
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
                ポイント・スタンプ
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
          {/* ユーザー統計サマリー */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">
                  {mockUser.currentPoints.toLocaleString()}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">現在のポイント</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">{mockUser.totalStamps}</h3>
                <p className="text-gray-600 dark:text-gray-400">獲得スタンプ</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">#{mockUser.rank}</h3>
                <p className="text-gray-600 dark:text-gray-400">ランキング</p>
              </CardContent>
            </Card>
          </div>

          {/* タブコンテンツ */}
          <Tabs defaultValue="history" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="history">ポイント履歴</TabsTrigger>
              <TabsTrigger value="stamps">スタンプコレクション</TabsTrigger>
              <TabsTrigger value="leaderboard">リーダーボード</TabsTrigger>
            </TabsList>

            {/* ポイント履歴 */}
            <TabsContent value="history">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">ポイント履歴</CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        variant={selectedPeriod === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedPeriod("all")}
                      >
                        すべて
                      </Button>
                      <Button
                        variant={selectedPeriod === "month" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedPeriod("month")}
                      >
                        今月
                      </Button>
                      <Button
                        variant={selectedPeriod === "week" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedPeriod("week")}
                      >
                        今週
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockPointHistory.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              item.type === "earned"
                                ? "bg-green-100 dark:bg-green-900/30"
                                : "bg-red-100 dark:bg-red-900/30"
                            }`}
                          >
                            {item.type === "earned" ? (
                              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                            ) : (
                              <Gift className="w-6 h-6 text-red-600 dark:text-red-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200">{item.reason}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.event}</p>
                            <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500 dark:text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Sparkles className="w-3 h-3" />
                                <span>{item.artist}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{new Date(item.date).toLocaleDateString("ja-JP")}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-lg font-bold ${
                              item.type === "earned"
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                            }`}
                          >
                            {item.type === "earned" ? "+" : ""}
                            {item.amount}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-500">
                            残高: {item.currentTotal.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* スタンプコレクション */}
            <TabsContent value="stamps">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    スタンプコレクション ({mockStamps.length}個)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockStamps.map((stamp) => (
                      <Card
                        key={stamp.id}
                        className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
                      >
                        <CardContent className="p-6 text-center">
                          <div className="relative mb-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                              <Award className="w-10 h-10 text-white" />
                            </div>
                            <Badge className={`absolute -top-2 -right-2 ${getRarityColor(stamp.rarity)}`}>
                              {stamp.rarity === "epic" ? "エピック" : stamp.rarity === "rare" ? "レア" : "コモン"}
                            </Badge>
                          </div>
                          <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">{stamp.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{stamp.description}</p>
                          <div className="space-y-1 text-xs text-gray-500 dark:text-gray-500">
                            <div className="flex items-center justify-center space-x-1">
                              <Sparkles className="w-3 h-3" />
                              <span>{stamp.artist}</span>
                            </div>
                            <div className="flex items-center justify-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(stamp.acquiredAt).toLocaleDateString("ja-JP")}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* リーダーボード */}
            <TabsContent value="leaderboard">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    ポイントランキング
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockLeaderboard.map((user) => (
                      <div
                        key={user.rank}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 ${
                          user.isCurrentUser
                            ? "border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                              user.rank === 1
                                ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                                : user.rank === 2
                                  ? "bg-gradient-to-r from-gray-400 to-gray-600"
                                  : user.rank === 3
                                    ? "bg-gradient-to-r from-orange-400 to-orange-600"
                                    : "bg-gradient-to-r from-gray-300 to-gray-500"
                            }`}
                          >
                            {user.rank === 1 ? (
                              <Trophy className="w-6 h-6" />
                            ) : user.rank === 2 ? (
                              <Award className="w-6 h-6" />
                            ) : user.rank === 3 ? (
                              <Star className="w-6 h-6" />
                            ) : (
                              user.rank
                            )}
                          </div>
                          <Avatar>
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                            <AvatarFallback>{user.username[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p
                              className={`font-semibold ${user.isCurrentUser ? "text-indigo-700 dark:text-indigo-300" : "text-gray-800 dark:text-gray-200"}`}
                            >
                              {user.username}
                              {user.isCurrentUser && <span className="ml-2 text-sm">(あなた)</span>}
                            </p>
                            <Badge className={getBadgeColor(user.badge)} size="sm">
                              {user.badge}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                            {user.points.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-500">ポイント</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
