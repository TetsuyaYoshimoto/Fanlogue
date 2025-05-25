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
import { Search, Filter, Edit, Ban, Mail, Calendar, MapPin, Menu } from "lucide-react"
// インポートパスを修正
import { AdminSidebar } from "@/components/admin-sidebar"

// モックデータ
const mockUsers = [
  {
    id: 1,
    username: "田中太郎",
    email: "tanaka@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    role: "user",
    points: 1250,
    joinDate: "2024-01-15",
    lastLogin: "2024-01-20T10:30:00Z",
    location: "東京",
    followedArtists: 12,
    attendedEvents: 28,
  },
  {
    id: 2,
    username: "佐藤花子",
    email: "sato@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    role: "user",
    points: 890,
    joinDate: "2024-01-10",
    lastLogin: "2024-01-19T15:45:00Z",
    location: "大阪",
    followedArtists: 8,
    attendedEvents: 15,
  },
  {
    id: 3,
    username: "山田次郎",
    email: "yamada@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "suspended",
    role: "user",
    points: 450,
    joinDate: "2024-01-05",
    lastLogin: "2024-01-18T09:20:00Z",
    location: "名古屋",
    followedArtists: 5,
    attendedEvents: 8,
  },
]

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [users, setUsers] = useState(mockUsers)
  const [selectedUser, setSelectedUser] = useState<(typeof mockUsers)[0] | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      case "suspended":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const handleStatusChange = (userId: number, newStatus: string) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
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
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">ユーザー管理</h1>
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
                    placeholder="ユーザー名またはメールアドレスで検索..."
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
                    <SelectItem value="active">アクティブ</SelectItem>
                    <SelectItem value="suspended">停止中</SelectItem>
                    <SelectItem value="pending">承認待ち</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  詳細フィルター
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* ユーザー一覧テーブル */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
                ユーザー一覧 ({filteredUsers.length}件)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ユーザー</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead>ポイント</TableHead>
                    <TableHead>参加イベント</TableHead>
                    <TableHead>最終ログイン</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                            <AvatarFallback>{user.username[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-800 dark:text-gray-200">{user.username}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status === "active"
                            ? "アクティブ"
                            : user.status === "suspended"
                              ? "停止中"
                              : "承認待ち"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{user.points.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <span>{user.attendedEvents}件</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(user.lastLogin).toLocaleDateString("ja-JP")}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => setSelectedUser(user)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>ユーザー詳細・編集</DialogTitle>
                                <DialogDescription>
                                  ユーザー情報の詳細を確認し、必要に応じて編集できます。
                                </DialogDescription>
                              </DialogHeader>
                              {selectedUser && <UserEditForm user={selectedUser} onStatusChange={handleStatusChange} />}
                            </DialogContent>
                          </Dialog>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() =>
                              handleStatusChange(user.id, user.status === "active" ? "suspended" : "active")
                            }
                          >
                            {user.status === "active" ? <Ban className="w-4 h-4" /> : "復活"}
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

function UserEditForm({ user, onStatusChange }: { user: any; onStatusChange: (id: number, status: string) => void }) {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    status: user.status,
    role: user.role,
    notes: "",
  })

  return (
    <div className="space-y-6">
      {/* ユーザー基本情報 */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="username">ユーザー名</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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
                <SelectItem value="active">アクティブ</SelectItem>
                <SelectItem value="suspended">停止中</SelectItem>
                <SelectItem value="pending">承認待ち</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {/* ユーザー統計 */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold mb-3">ユーザー統計</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>現在のポイント:</span>
                <span className="font-medium">{user.points.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>フォロー中アーティスト:</span>
                <span className="font-medium">{user.followedArtists}件</span>
              </div>
              <div className="flex justify-between">
                <span>参加イベント:</span>
                <span className="font-medium">{user.attendedEvents}件</span>
              </div>
              <div className="flex justify-between">
                <span>登録日:</span>
                <span className="font-medium">{new Date(user.joinDate).toLocaleDateString("ja-JP")}</span>
              </div>
            </div>
          </div>

          {/* 連絡先情報 */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold mb-3">連絡先情報</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>最終ログイン: {new Date(user.lastLogin).toLocaleString("ja-JP")}</span>
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
          placeholder="このユーザーに関する管理者メモを入力..."
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
            onStatusChange(user.id, formData.status)
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
