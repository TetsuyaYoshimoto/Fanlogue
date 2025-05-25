"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Filter, Eye, CheckCircle, XCircle, Building, Sparkles } from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"

// モックデータ
const mockBusinessUsers = [
  {
    id: "biz001",
    companyName: "株式会社イベントプロ",
    contactName: "山田太郎",
    email: "yamada@eventpro.co.jp",
    phone: "03-1234-5678",
    website: "https://eventpro.co.jp",
    address: "東京都渋谷区渋谷1-1-1",
    businessType: "イベント企画",
    registrationDate: "2024-01-15",
    status: "承認済み",
    eventsCreated: 15,
    totalParticipants: 2500,
    lastLogin: "2024-01-20T10:30:00Z",
    isVerified: true,
  },
  {
    id: "biz002",
    companyName: "ミュージックフェス株式会社",
    contactName: "佐藤花子",
    email: "sato@musicfes.com",
    phone: "06-5678-9012",
    website: "https://musicfes.com",
    address: "大阪府大阪市北区梅田2-2-2",
    businessType: "音楽イベント",
    registrationDate: "2024-01-18",
    status: "審査中",
    eventsCreated: 0,
    totalParticipants: 0,
    lastLogin: "2024-01-19T15:45:00Z",
    isVerified: false,
  },
  {
    id: "biz003",
    companyName: "アートギャラリー協会",
    contactName: "田中次郎",
    email: "tanaka@artgallery.org",
    phone: "03-9876-5432",
    website: "https://artgallery.org",
    address: "東京都港区六本木3-3-3",
    businessType: "アート・文化",
    registrationDate: "2024-01-10",
    status: "承認済み",
    eventsCreated: 8,
    totalParticipants: 1200,
    lastLogin: "2024-01-21T09:15:00Z",
    isVerified: true,
  },
]

export default function AdminBusinessUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [businessUsers, setBusinessUsers] = useState(mockBusinessUsers)
  const [selectedUser, setSelectedUser] = useState(null)

  const handleApprove = (userId: string) => {
    setBusinessUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, status: "承認済み", isVerified: true } : user)),
    )
  }

  const handleReject = (userId: string) => {
    setBusinessUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, status: "却下" } : user)))
  }

  const handleDelete = (userId: string) => {
    setBusinessUsers((prev) => prev.filter((user) => user.id !== userId))
  }

  const filteredUsers = businessUsers.filter(
    (user) =>
      user.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "承認済み":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      case "審査中":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "却下":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* サイドバー */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl">
        <AdminSidebar />
      </div>

      {/* メインコンテンツ */}
      <div className="ml-64">
        {/* ヘッダー */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">ビジネスユーザー管理</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                フィルター
              </Button>
            </div>
          </div>
        </header>

        {/* メインコンテンツエリア */}
        <main className="p-6 space-y-6">
          {/* 統計カード */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">総ビジネスユーザー</p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{businessUsers.length}</p>
                  </div>
                  <Building className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">承認済み</p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                      {businessUsers.filter((u) => u.status === "承認済み").length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">審査中</p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                      {businessUsers.filter((u) => u.status === "審査中").length}
                    </p>
                  </div>
                  <XCircle className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">総イベント数</p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                      {businessUsers.reduce((sum, user) => sum + user.eventsCreated, 0)}
                    </p>
                  </div>
                  <Sparkles className="w-8 h-8 text-purple-500" />
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
                    placeholder="企業名、担当者名、メールアドレスで検索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ビジネスユーザー一覧 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
                ビジネスユーザー一覧 ({filteredUsers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>企業情報</TableHead>
                    <TableHead>担当者</TableHead>
                    <TableHead>業種</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead>イベント数</TableHead>
                    <TableHead>登録日</TableHead>
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
                            <AvatarFallback>
                              <Building className="w-4 h-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-medium text-gray-800 dark:text-gray-200">{user.companyName}</p>
                              {user.isVerified && (
                                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                                  <Sparkles className="w-2 h-2 mr-1" />
                                  公式
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-gray-800 dark:text-gray-200">{user.contactName}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.phone}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{user.businessType}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <p className="font-medium text-gray-800 dark:text-gray-200">{user.eventsCreated}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {user.totalParticipants.toLocaleString()}人参加
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(user.registrationDate).toLocaleDateString("ja-JP")}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(user.lastLogin).toLocaleDateString("ja-JP")}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {user.status === "審査中" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleApprove(user.id)}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                承認
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReject(user.id)}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                却下
                              </Button>
                            </>
                          )}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => setSelectedUser(user)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                              <DialogHeader>
                                <DialogTitle>ビジネスユーザー詳細</DialogTitle>
                                <DialogDescription>{selectedUser?.companyName}の詳細情報</DialogDescription>
                              </DialogHeader>
                              {selectedUser && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">企業名</p>
                                      <p className="text-gray-800 dark:text-gray-200">{selectedUser.companyName}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">担当者名</p>
                                      <p className="text-gray-800 dark:text-gray-200">{selectedUser.contactName}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        メールアドレス
                                      </p>
                                      <p className="text-gray-800 dark:text-gray-200">{selectedUser.email}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">電話番号</p>
                                      <p className="text-gray-800 dark:text-gray-200">{selectedUser.phone}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        ウェブサイト
                                      </p>
                                      <p className="text-gray-800 dark:text-gray-200">{selectedUser.website}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">業種</p>
                                      <p className="text-gray-800 dark:text-gray-200">{selectedUser.businessType}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">住所</p>
                                    <p className="text-gray-800 dark:text-gray-200">{selectedUser.address}</p>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
