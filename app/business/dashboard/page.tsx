"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building2,
  Calendar,
  Users,
  TrendingUp,
  Plus,
  Edit,
  Eye,
  BarChart3,
  MapPin,
  Clock,
  Star,
  Award,
  LogOut,
  Settings,
  Bell,
  Search,
} from "lucide-react"
import { useRouter } from "next/navigation"

// モックデータ
const mockCompany = {
  id: 1,
  name: "株式会社イベントプロ",
  email: "info@event-pro.com",
  avatar: "/placeholder.svg?height=60&width=60",
  plan: "プロフェッショナル",
  verified: true,
  totalEvents: 45,
  totalAttendees: 12500,
  rating: 4.8,
  joinDate: "2023-06-15",
}

const mockEvents = [
  {
    id: 1,
    title: "テックカンファレンス2024",
    description: "最新技術トレンドを学ぶカンファレンス",
    date: "2024-03-15",
    time: "10:00",
    venue: "東京国際フォーラム",
    category: "テクノロジー",
    capacity: 500,
    registered: 387,
    status: "published",
    isOfficial: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    title: "スタートアップピッチイベント",
    description: "新進気鋭のスタートアップが集結",
    date: "2024-04-20",
    time: "14:00",
    venue: "渋谷ヒカリエ",
    category: "ビジネス",
    capacity: 200,
    registered: 156,
    status: "draft",
    isOfficial: false,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    title: "デザイン思考ワークショップ",
    description: "実践的なデザイン思考を学ぶ",
    date: "2024-05-10",
    time: "13:00",
    venue: "六本木アカデミーヒルズ",
    category: "デザイン",
    capacity: 50,
    registered: 42,
    status: "published",
    isOfficial: true,
    image: "/placeholder.svg?height=100&width=100",
  },
]

const mockAnalytics = {
  totalViews: 15420,
  totalRegistrations: 1250,
  conversionRate: 8.1,
  averageRating: 4.6,
  monthlyGrowth: 12.5,
}

export default function BusinessDashboard() {
  const [selectedTab, setSelectedTab] = useState("dashboard")
  const [events, setEvents] = useState(mockEvents)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      case "draft":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* サイドバー */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl">
        <BusinessSidebar onLogout={handleLogout} />
      </div>

      {/* メインコンテンツ */}
      <div className="ml-64">
        {/* ヘッダー */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">ビジネスダッシュボード</h1>
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
          {/* 企業情報カード */}
          <Card className="border-0 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16 border-2 border-white/20">
                    <AvatarImage src={mockCompany.avatar || "/placeholder.svg"} alt={mockCompany.name} />
                    <AvatarFallback className="bg-white/20 text-white">{mockCompany.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-2xl font-bold">{mockCompany.name}</h2>
                      {mockCompany.verified && (
                        <Badge className="bg-white/20 text-white border-white/30">
                          <Award className="w-3 h-3 mr-1" />
                          認証済み
                        </Badge>
                      )}
                    </div>
                    <p className="text-blue-100">{mockCompany.email}</p>
                    <p className="text-blue-100 text-sm">
                      プラン: {mockCompany.plan} | 登録日: {new Date(mockCompany.joinDate).toLocaleDateString("ja-JP")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="w-4 h-4 text-yellow-300" />
                    <span className="font-semibold">{mockCompany.rating}</span>
                  </div>
                  <p className="text-sm text-blue-100">評価</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 統計カード */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">総イベント数</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{mockCompany.totalEvents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">総参加者数</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      {mockCompany.totalAttendees.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">月間成長率</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      +{mockAnalytics.monthlyGrowth}%
                    </p>
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">コンバージョン率</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      {mockAnalytics.conversionRate}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* タブコンテンツ */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dashboard">ダッシュボード</TabsTrigger>
              <TabsTrigger value="events">イベント管理</TabsTrigger>
              <TabsTrigger value="analytics">分析</TabsTrigger>
            </TabsList>

            {/* ダッシュボード */}
            <TabsContent value="dashboard">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 最近のイベント */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">最近のイベント</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {events.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200">{event.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date(event.date).toLocaleDateString("ja-JP")} {event.time}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge className={getStatusColor(event.status)}>
                                {event.status === "published" ? "公開中" : "下書き"}
                              </Badge>
                              {event.isOfficial && (
                                <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                  公式
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                              {event.registered}/{event.capacity}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">参加者</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* クイックアクション */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
                      クイックアクション
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                        <DialogTrigger asChild>
                          <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            新しいイベントを作成
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>新しいイベントを作成</DialogTitle>
                            <DialogDescription>イベントの基本情報を入力してください。</DialogDescription>
                          </DialogHeader>
                          <EventCreateForm />
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" className="w-full justify-start">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        分析レポートを表示
                      </Button>

                      <Button variant="outline" className="w-full justify-start">
                        <Users className="w-4 h-4 mr-2" />
                        参加者リストをエクスポート
                      </Button>

                      <Button variant="outline" className="w-full justify-start">
                        <Award className="w-4 h-4 mr-2" />
                        公式認証を申請
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* イベント管理 */}
            <TabsContent value="events">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
                      イベント一覧 ({events.length}件)
                    </CardTitle>
                    <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white">
                          <Plus className="w-4 h-4 mr-2" />
                          新規作成
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>新しいイベントを作成</DialogTitle>
                          <DialogDescription>イベントの基本情報を入力してください。</DialogDescription>
                        </DialogHeader>
                        <EventCreateForm />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                            <Calendar className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-gray-800 dark:text-gray-200">{event.title}</h3>
                              {event.isOfficial && (
                                <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                  公式
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{event.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
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
                              <div className="flex items-center space-x-1">
                                <Users className="w-3 h-3" />
                                <span>
                                  {event.registered}/{event.capacity}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(event.status)}>
                            {event.status === "published" ? "公開中" : "下書き"}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 分析 */}
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
                      パフォーマンス指標
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">総ビュー数</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          {mockAnalytics.totalViews.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">総登録数</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          {mockAnalytics.totalRegistrations.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">コンバージョン率</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          {mockAnalytics.conversionRate}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">平均評価</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          {mockAnalytics.averageRating}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">月間トレンド</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                      <div className="text-center">
                        <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>グラフデータを読み込み中...</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

function BusinessSidebar({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* ロゴ */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Fanlogue Business
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">ビジネスダッシュボード</p>
      </div>

      {/* ナビゲーション */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <a
              href="/business/dashboard"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
            >
              <BarChart3 className="w-5 h-5" />
              <span>ダッシュボード</span>
            </a>
          </li>
          <li>
            <a
              href="/business/events"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              <span>イベント管理</span>
            </a>
          </li>
          <li>
            <a
              href="/business/analytics"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <BarChart3 className="w-5 h-5" />
              <span>分析・レポート</span>
            </a>
          </li>
          <li>
            <a
              href="/business/settings"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>設定</span>
            </a>
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

function EventCreateForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    category: "",
    capacity: "",
    isOfficial: false,
  })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">イベントタイトル</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="イベントのタイトルを入力"
          />
        </div>
        <div>
          <Label htmlFor="category">カテゴリー</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="カテゴリーを選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">テクノロジー</SelectItem>
              <SelectItem value="business">ビジネス</SelectItem>
              <SelectItem value="design">デザイン</SelectItem>
              <SelectItem value="marketing">マーケティング</SelectItem>
              <SelectItem value="education">教育</SelectItem>
              <SelectItem value="entertainment">エンターテイメント</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">イベント説明</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="イベントの詳細説明を入力"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="date">開催日</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="time">開始時間</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="capacity">定員</Label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            placeholder="定員数"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="venue">開催場所</Label>
        <Input
          id="venue"
          value={formData.venue}
          onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
          placeholder="開催場所を入力"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isOfficial"
          checked={formData.isOfficial}
          onChange={(e) => setFormData({ ...formData, isOfficial: e.target.checked })}
          className="rounded border-gray-300"
        />
        <Label htmlFor="isOfficial">公式イベントとして申請する</Label>
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="outline">下書き保存</Button>
        <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white">
          イベントを作成
        </Button>
      </div>
    </div>
  )
}
