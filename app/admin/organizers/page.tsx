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
import { Search, Filter, Edit, Ban, Mail, Calendar, MapPin, Menu, Award } from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"

// モックデータ
const mockOrganizers = [
  {
    id: 1,
    name: "イベント企画株式会社",
    email: "info@event-planning.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "verified",
    plan: "premium",
    totalEvents: 45,
    totalAttendees: 12500,
    rating: 4.8,
    joinDate: "2023-06-15",
    lastLogin: "2024-01-20T10:30:00Z",
    location: "東京",
  },
  {
    id: 2,
    name: "コミュニティワークス",
    email: "contact@community-works.jp",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    plan: "standard",
    totalEvents: 23,
    totalAttendees: 3200,
    rating: 4.5,
    joinDate: "2023-08-20",
    lastLogin: "2024-01-19T15:45:00Z",
    location: "大阪",
  },
  {
    id: 3,
    name: "スタートアップハブ",
    email: "hello@startup-hub.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "pending",
    plan: "basic",
    totalEvents: 8,
    totalAttendees: 890,
    rating: 4.2,
    joinDate: "2024-01-05",
    lastLogin: "2024-01-18T09:20:00Z",
    location: "福岡",
  },
]

export default function AdminOrganizersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [organizers, setOrganizers] = useState(mockOrganizers)
  const [selectedOrganizer, setSelectedOrganizer] = useState<(typeof mockOrganizers)[0] | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const filteredOrganizers = organizers.filter((organizer) => {
    const matchesSearch =
      organizer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      organizer.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || organizer.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
      case "active":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "suspended":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "premium":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
      case "standard":
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
      case "basic":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const handleStatusChange = (organizerId: number, newStatus: string) => {
    setOrganizers((prev) =>
      prev.map((organizer) => (organizer.id === organizerId ? { ...organizer, status: newStatus } : organizer)),
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
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">主催者管理</h1>
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
                    placeholder="主催者名またはメールアドレスで検索..."
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
                    <SelectItem value="verified">認証済み</SelectItem>
                    <SelectItem value="active">アクティブ</SelectItem>
                    <SelectItem value="pending">承認待ち</SelectItem>
                    <SelectItem value="suspended">停止中</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  詳細フィルター
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 主催者一覧テーブル */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
                主催者一覧 ({filteredOrganizers.length}件)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>主催者</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead>プラン</TableHead>
                    <TableHead>イベント数</TableHead>
                    <TableHead>評価</TableHead>
                    <TableHead>最終ログイン</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrganizers.map((organizer) => (
                    <TableRow key={organizer.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={organizer.avatar || "/placeholder.svg"} alt={organizer.name} />
                            <AvatarFallback>{organizer.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-800 dark:text-gray-200">{organizer.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{organizer.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(organizer.status)}>
                            {organizer.status === "verified"
                              ? "認証済み"
                              : organizer.status === "active"
                                ? "アクティブ"
                                : organizer.status === "pending"
                                  ? "承認待ち"
                                  : "停止中"}
                          </Badge>
                          {organizer.status === "verified" && <Award className="w-4 h-4 text-blue-500" />}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPlanColor(organizer.plan)}>
                          {organizer.plan === "premium"
                            ? "プレミアム"
                            : organizer.plan === "standard"
                              ? "スタンダード"
                              : "ベーシック"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{organizer.totalEvents}件</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">{organizer.rating}</span>
                          <span className="text-yellow-500">★</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(organizer.lastLogin).toLocaleDateString("ja-JP")}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => setSelectedOrganizer(organizer)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>主催者詳細・編集</DialogTitle>
                                <DialogDescription>
                                  主催者情報の詳細を確認し、必要に応じて編集できます。
                                </DialogDescription>
                              </DialogHeader>
                              {selectedOrganizer && (
                                <OrganizerEditForm organizer={selectedOrganizer} onStatusChange={handleStatusChange} />
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() =>
                              handleStatusChange(
                                organizer.id,
                                organizer.status === "suspended" ? "active" : "suspended",
                              )
                            }
                          >
                            {organizer.status === "suspended" ? "復活" : <Ban className="w-4 h-4" />}
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

function OrganizerEditForm({
  organizer,
  onStatusChange,
}: {
  organizer: any
  onStatusChange: (id: number, status: string) => void
}) {
  const [formData, setFormData] = useState({
    name: organizer.name,
    email: organizer.email,
    status: organizer.status,
    plan: organizer.plan,
    notes: "",
  })

  return (
    <div className="space-y-6">
      {/* 主催者基本情報 */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">主催者名</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="status">ステータス</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="verified">認証済み</SelectItem>
                <SelectItem value="active">アクティブ</SelectItem>
                <SelectItem value="pending">承認待ち</SelectItem>
                <SelectItem value="suspended">停止中</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="plan">プラン</Label>
            <Select value={formData.plan} onValueChange={(value) => setFormData({ ...formData, plan: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="premium">プレミアム</SelectItem>
                <SelectItem value="standard">スタンダード</SelectItem>
                <SelectItem value="basic">ベーシック</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {/* 主催者統計 */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold mb-3">主催者統計</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>総イベント数:</span>
                <span className="font-medium">{organizer.totalEvents}件</span>
              </div>
              <div className="flex justify-between">
                <span>総参加者数:</span>
                <span className="font-medium">{organizer.totalAttendees.toLocaleString()}人</span>
              </div>
              <div className="flex justify-between">
                <span>平均評価:</span>
                <span className="font-medium">{organizer.rating} ★</span>
              </div>
              <div className="flex justify-between">
                <span>登録日:</span>
                <span className="font-medium">{new Date(organizer.joinDate).toLocaleDateString("ja-JP")}</span>
              </div>
            </div>
          </div>

          {/* 連絡先情報 */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold mb-3">連絡先情報</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>{organizer.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{organizer.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>最終ログイン: {new Date(organizer.lastLogin).toLocaleString("ja-JP")}</span>
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
          placeholder="この主催者に関する管理者メモを入力..."
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
            onStatusChange(organizer.id, formData.status)
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
