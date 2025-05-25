"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Search, Filter, Edit, Ban, Calendar, MapPin, Menu, Award, Users, Clock, Eye } from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"

// モックデータ
const mockEvents = [
  {
    id: 1,
    title: "テックカンファレンス2024",
    organizer: "イベント企画株式会社",
    organizerAvatar: "/placeholder.svg?height=40&width=40",
    date: "2024-03-15",
    time: "10:00",
    venue: "東京国際フォーラム",
    category: "テクノロジー",
    capacity: 500,
    registered: 387,
    status: "published",
    isOfficial: true,
    createdAt: "2024-01-10T09:00:00Z",
    description: "最新技術トレンドを学ぶカンファレンス",
  },
  {
    id: 2,
    title: "スタートアップピッチイベント",
    organizer: "コミュニティワークス",
    organizerAvatar: "/placeholder.svg?height=40&width=40",
    date: "2024-04-20",
    time: "14:00",
    venue: "渋谷ヒカリエ",
    category: "ビジネス",
    capacity: 200,
    registered: 156,
    status: "pending",
    isOfficial: false,
    createdAt: "2024-01-15T14:30:00Z",
    description: "新進気鋭のスタートアップが集結",
  },
  {
    id: 3,
    title: "デザイン思考ワークショップ",
    organizer: "スタートアップハブ",
    organizerAvatar: "/placeholder.svg?height=40&width=40",
    date: "2024-05-10",
    time: "13:00",
    venue: "六本木アカデミーヒルズ",
    category: "デザイン",
    capacity: 50,
    registered: 42,
    status: "draft",
    isOfficial: true,
    createdAt: "2024-01-18T11:15:00Z",
    description: "実践的なデザイン思考を学ぶ",
  },
]

export default function AdminEventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [events, setEvents] = useState(mockEvents)
  const [selectedEvent, setSelectedEvent] = useState<(typeof mockEvents)[0] | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || event.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "draft":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const handleStatusChange = (eventId: number, newStatus: string) => {
    setEvents((prev) => prev.map((event) => (event.id === eventId ? { ...event, status: newStatus } : event)))
  }

  const handleOfficialToggle = (eventId: number) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === eventId ? { ...event, isOfficial: !event.isOfficial } : event)),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* モバイルサイドバー */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl">
            <AdminSidebar />
          </div>
        </div>
      )}

      {/* デスクトップサイドバー */}
      <div className="hidden lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 lg:block">
        <div className="h-full bg-white dark:bg-gray-800 shadow-xl">
          <AdminSidebar />
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="lg:ml-64">
        {/* ヘッダー */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
                  <Menu className="w-4 h-4 mr-2" />
                </Button>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">イベント管理</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          {/* 検索・フィルター */}
          <Card className="mb-6 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="イベント名または主催者名で検索..."
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
                    <SelectItem value="pending">承認待ち</SelectItem>
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

          {/* イベント一覧テーブル */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
                イベント一覧 ({filteredEvents.length}件)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>イベント</TableHead>
                    <TableHead>主催者</TableHead>
                    <TableHead>開催日時</TableHead>
                    <TableHead>参加者</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-medium text-gray-800 dark:text-gray-200">{event.title}</p>
                              {event.isOfficial && (
                                <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                                  <Award className="w-3 h-3 mr-1" />
                                  公式
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{event.description}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">{event.category}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={event.organizerAvatar || "/placeholder.svg"} alt={event.organizer} />
                            <AvatarFallback>{event.organizer[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-800 dark:text-gray-200">{event.organizer}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1 text-sm">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span>{new Date(event.date).toLocaleDateString("ja-JP")}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{event.venue}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <p className="font-medium text-gray-800 dark:text-gray-200">
                            {event.registered}/{event.capacity}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            {Math.round((event.registered / event.capacity) * 100)}%
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status === "published"
                            ? "公開中"
                            : event.status === "pending"
                              ? "承認待ち"
                              : event.status === "draft"
                                ? "下書き"
                                : "キャンセル"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => setSelectedEvent(event)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>イベント詳細・編集</DialogTitle>
                                <DialogDescription>
                                  イベント情報の詳細を確認し、必要に応じて編集できます。
                                </DialogDescription>
                              </DialogHeader>
                              {selectedEvent && (
                                <EventEditForm
                                  event={selectedEvent}
                                  onStatusChange={handleStatusChange}
                                  onOfficialToggle={handleOfficialToggle}
                                />
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() =>
                              handleStatusChange(event.id, event.status === "cancelled" ? "published" : "cancelled")
                            }
                          >
                            {event.status === "cancelled" ? "復活" : <Ban className="w-4 h-4" />}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function EventEditForm({
  event,
  onStatusChange,
  onOfficialToggle,
}: {
  event: any
  onStatusChange: (id: number, status: string) => void
  onOfficialToggle: (id: number) => void
}) {
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    status: event.status,
    isOfficial: event.isOfficial,
    notes: "",
  })

  return (
    <div className="space-y-6">
      {/* イベント基本情報 */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">イベントタイトル</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="description">説明</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="status">ステータス</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="published">公開中</SelectItem>
                <SelectItem value="pending">承認待ち</SelectItem>
                <SelectItem value="draft">下書き</SelectItem>
                <SelectItem value="cancelled">キャンセル</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isOfficial"
              checked={formData.isOfficial}
              onChange={(e) => setFormData({ ...formData, isOfficial: e.target.checked })}
              className="rounded border-gray-300"
            />
            <Label htmlFor="isOfficial">公式イベント</Label>
          </div>
        </div>

        <div className="space-y-4">
          {/* イベント統計 */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold mb-3">イベント統計</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>参加者数:</span>
                <span className="font-medium">
                  {event.registered}/{event.capacity}人
                </span>
              </div>
              <div className="flex justify-between">
                <span>参加率:</span>
                <span className="font-medium">{Math.round((event.registered / event.capacity) * 100)}%</span>
              </div>
              <div className="flex justify-between">
                <span>カテゴリー:</span>
                <span className="font-medium">{event.category}</span>
              </div>
              <div className="flex justify-between">
                <span>作成日:</span>
                <span className="font-medium">{new Date(event.createdAt).toLocaleDateString("ja-JP")}</span>
              </div>
            </div>
          </div>

          {/* イベント詳細 */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold mb-3">イベント詳細</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>
                  {new Date(event.date).toLocaleDateString("ja-JP")} {event.time}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span>主催者: {event.organizer}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 管理者メモ */}
      <div>
        <Label htmlFor="notes">管理者メモ</Label>
        <Textarea
          id="notes"
          placeholder="このイベントに関する管理者メモを入力..."
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
        />
      </div>

      {/* アクションボタン */}
      <div className="flex justify-end space-x-3">
        <Button variant="outline">キャンセル</Button>
        <Button
          onClick={() => {
            onStatusChange(event.id, formData.status)
            if (formData.isOfficial !== event.isOfficial) {
              onOfficialToggle(event.id)
            }
            // 実際の保存処理をここに追加
          }}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
        >
          変更を保存
        </Button>
      </div>
    </div>
  )
}
