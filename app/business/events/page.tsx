"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building2,
  Calendar,
  Users,
  Plus,
  Edit,
  Eye,
  MapPin,
  Clock,
  Award,
  LogOut,
  Settings,
  Bell,
  Search,
  Filter,
  Copy,
  Share2,
  BarChart3,
} from "lucide-react"
import { useRouter } from "next/navigation"

// モックデータ
const mockEvents = [
  {
    id: 1,
    title: "テックカンファレンス2024",
    description: "最新技術トレンドを学ぶカンファレンス",
    date: "2024-03-15",
    time: "10:00",
    venue: "東京国際フォーラム",
    address: "東京都千代田区丸の内3-5-1",
    category: "テクノロジー",
    capacity: 500,
    registered: 387,
    status: "published",
    isOfficial: true,
    image: "/placeholder.svg?height=100&width=100",
    price: "¥5,000",
    createdAt: "2024-01-10",
    views: 2450,
    registrationRate: 77.4,
  },
  {
    id: 2,
    title: "スタートアップピッチイベント",
    description: "新進気鋭のスタートアップが集結",
    date: "2024-04-20",
    time: "14:00",
    venue: "渋谷ヒカリエ",
    address: "東京都渋谷区渋谷2-21-1",
    category: "ビジネス",
    capacity: 200,
    registered: 156,
    status: "draft",
    isOfficial: true,
    image: "/placeholder.svg?height=100&width=100",
    price: "¥3,000",
    createdAt: "2024-01-15",
    views: 890,
    registrationRate: 78.0,
  },
  {
    id: 3,
    title: "デザイン思考ワークショップ",
    description: "実践的なデザイン思考を学ぶ",
    date: "2024-05-10",
    time: "13:00",
    venue: "六本木アカデミーヒルズ",
    address: "東京都港区六本木6-10-1",
    category: "デザイン",
    capacity: 50,
    registered: 42,
    status: "published",
    isOfficial: true,
    image: "/placeholder.svg?height=100&width=100",
    price: "¥8,000",
    createdAt: "2024-01-20",
    views: 1250,
    registrationRate: 84.0,
  },
]

export default function BusinessEventsPage() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [events, setEvents] = useState(mockEvents)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || event.status === selectedStatus
    return matchesSearch && matchesStatus
  })

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

  const handleCreateEvent = (eventData: any) => {
    const newEvent = {
      id: events.length + 1,
      ...eventData,
      isOfficial: true, // ビジネスユーザーのイベントは自動的に公式
      registered: 0,
      views: 0,
      registrationRate: 0,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setEvents([...events, newEvent])
    setShowCreateDialog(false)
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
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">イベント管理</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>
              <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    新規イベント作成
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>新しいイベントを作成</DialogTitle>
                    <DialogDescription>
                      公式イベントとして作成されます。参加者には特別なリワードが付与されます。
                    </DialogDescription>
                  </DialogHeader>
                  <EventCreateForm onSubmit={handleCreateEvent} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        {/* メインコンテンツエリア */}
        <main className="p-6 space-y-6">
          {/* 統計カード */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">総イベント数</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{events.length}</p>
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
                      {events.reduce((sum, event) => sum + event.registered, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">総ビュー数</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      {events.reduce((sum, event) => sum + event.views, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">平均登録率</p>
                    <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      {(events.reduce((sum, event) => sum + event.registrationRate, 0) / events.length).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 検索・フィルター */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="イベント名で検索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="ステータスで絞り込み" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべて</SelectItem>
                    <SelectItem value="published">公開中</SelectItem>
                    <SelectItem value="draft">下書き</SelectItem>
                    <SelectItem value="cancelled">キャンセル</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  詳細フィルター
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* イベント一覧 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
                イベント一覧 ({filteredEvents.length}件)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                        <Calendar className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">{event.title}</h3>
                          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            <Award className="w-3 h-3 mr-1" />
                            公式
                          </Badge>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status === "published"
                              ? "公開中"
                              : event.status === "draft"
                                ? "下書き"
                                : "キャンセル"}
                          </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{event.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 dark:text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>
                              {new Date(event.date).toLocaleDateString("ja-JP")} {event.time}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{event.venue}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>
                              {event.registered}/{event.capacity} ({event.registrationRate.toFixed(1)}%)
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{event.views.toLocaleString()} ビュー</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {filteredEvents.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      イベントが見つかりませんでした
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      検索条件を変更するか、新しいイベントを作成してください
                    </p>
                    <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white">
                          <Plus className="w-4 h-4 mr-2" />
                          最初のイベントを作成
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
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
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <BarChart3 className="w-5 h-5" />
              <span>ダッシュボード</span>
            </a>
          </li>
          <li>
            <a
              href="/business/events"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
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

function EventCreateForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    address: "",
    category: "",
    capacity: "",
    price: "",
    tags: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      capacity: Number.parseInt(formData.capacity),
      status: "draft",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">イベントタイトル *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="イベントのタイトルを入力"
            required
          />
        </div>
        <div>
          <Label htmlFor="category">カテゴリー *</Label>
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
              <SelectItem value="health">健康・ウェルネス</SelectItem>
              <SelectItem value="food">フード・グルメ</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">イベント説明 *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="イベントの詳細説明を入力"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="date">開催日 *</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="time">開始時間 *</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="capacity">定員 *</Label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            placeholder="定員数"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="venue">開催場所 *</Label>
          <Input
            id="venue"
            value={formData.venue}
            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
            placeholder="会場名を入力"
            required
          />
        </div>
        <div>
          <Label htmlFor="price">参加費</Label>
          <Input
            id="price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="例: ¥3,000 または 無料"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="address">住所</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="詳細な住所を入力"
        />
      </div>

      <div>
        <Label htmlFor="tags">タグ</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="カンマ区切りでタグを入力（例: AI, 機械学習, ワークショップ）"
        />
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Award className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-blue-800 dark:text-blue-200">公式イベント特典</h3>
        </div>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>• 参加者に特別なポイント・スタンプが付与されます</li>
          <li>• イベント一覧で優先表示されます</li>
          <li>• 公式バッジが表示されます</li>
          <li>• 専用のプロモーション支援を受けられます</li>
        </ul>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline">
          下書き保存
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
        >
          イベントを作成
        </Button>
      </div>
    </form>
  )
}
