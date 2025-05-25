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
import { Search, Filter, Edit, Ban, Calendar, Menu, Users, Award } from "lucide-react"
import { AdminSidebar } from "@/components/admin-sidebar"

// モックデータ
const mockArtists = [
  {
    id: 1,
    name: "BAND A",
    email: "contact@banda.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "verified",
    type: "band",
    followers: 15420,
    totalEvents: 28,
    joinDate: "2023-08-15",
    lastActivity: "2024-01-20T10:30:00Z",
    genre: "ロック",
    description: "エネルギッシュなロックバンド",
    isOfficial: true,
  },
  {
    id: 2,
    name: "Singer B",
    email: "info@singerb.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "verified",
    type: "solo",
    followers: 8950,
    totalEvents: 15,
    joinDate: "2023-09-10",
    lastActivity: "2024-01-19T15:45:00Z",
    genre: "ポップス",
    description: "心に響く歌声のシンガー",
    isOfficial: true,
  },
  {
    id: 3,
    name: "DJ COSMIC",
    email: "dj@cosmic.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "pending",
    type: "dj",
    followers: 5230,
    totalEvents: 8,
    joinDate: "2024-01-05",
    lastActivity: "2024-01-18T09:20:00Z",
    genre: "エレクトロニック",
    description: "宇宙的なサウンドを奏でるDJ",
    isOfficial: false,
  },
  {
    id: 4,
    name: "アコースティック・デュオ",
    email: "duo@acoustic.com",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "suspended",
    type: "duo",
    followers: 3450,
    totalEvents: 12,
    joinDate: "2023-11-20",
    lastActivity: "2024-01-15T14:20:00Z",
    genre: "フォーク",
    description: "心温まるアコースティックサウンド",
    isOfficial: false,
  },
]

export default function AdminArtistsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [artists, setArtists] = useState(mockArtists)
  const [selectedArtist, setSelectedArtist] = useState<(typeof mockArtists)[0] | null>(null)

  const filteredArtists = artists.filter((artist) => {
    const matchesSearch =
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.genre.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || artist.status === selectedStatus
    const matchesType = selectedType === "all" || artist.type === selectedType
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "suspended":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "band":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
      case "solo":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
      case "dj":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
      case "duo":
        return "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const handleStatusChange = (artistId: number, newStatus: string) => {
    setArtists((prev) => prev.map((artist) => (artist.id === artistId ? { ...artist, status: newStatus } : artist)))
  }

  const handleOfficialToggle = (artistId: number) => {
    setArtists((prev) =>
      prev.map((artist) => (artist.id === artistId ? { ...artist, isOfficial: !artist.isOfficial } : artist)),
    )
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
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="w-4 h-4 mr-2" />
                </Button>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">アーティスト管理</h1>
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
                    placeholder="アーティスト名、メール、ジャンルで検索..."
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
                    <SelectItem value="pending">承認待ち</SelectItem>
                    <SelectItem value="suspended">停止中</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="タイプで絞り込み" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべて</SelectItem>
                    <SelectItem value="band">バンド</SelectItem>
                    <SelectItem value="solo">ソロ</SelectItem>
                    <SelectItem value="dj">DJ</SelectItem>
                    <SelectItem value="duo">デュオ</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  詳細フィルター
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* アーティスト一覧テーブル */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
                アーティスト一覧 ({filteredArtists.length}件)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>アーティスト</TableHead>
                    <TableHead>タイプ</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead>フォロワー</TableHead>
                    <TableHead>イベント数</TableHead>
                    <TableHead>最終活動</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredArtists.map((artist) => (
                    <TableRow key={artist.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={artist.avatar || "/placeholder.svg"} alt={artist.name} />
                            <AvatarFallback>{artist.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-medium text-gray-800 dark:text-gray-200">{artist.name}</p>
                              {artist.isOfficial && (
                                <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                  <Award className="w-3 h-3 mr-1" />
                                  公式
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{artist.email}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">{artist.genre}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(artist.type)}>
                          {artist.type === "band"
                            ? "バンド"
                            : artist.type === "solo"
                              ? "ソロ"
                              : artist.type === "dj"
                                ? "DJ"
                                : "デュオ"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(artist.status)}>
                          {artist.status === "verified"
                            ? "認証済み"
                            : artist.status === "pending"
                              ? "承認待ち"
                              : "停止中"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{artist.followers.toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{artist.totalEvents}件</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(artist.lastActivity).toLocaleDateString("ja-JP")}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => setSelectedArtist(artist)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>アーティスト詳細・編集</DialogTitle>
                                <DialogDescription>
                                  アーティスト情報の詳細を確認し、必要に応じて編集できます。
                                </DialogDescription>
                              </DialogHeader>
                              {selectedArtist && (
                                <ArtistEditForm
                                  artist={selectedArtist}
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
                              handleStatusChange(artist.id, artist.status === "verified" ? "suspended" : "verified")
                            }
                          >
                            {artist.status === "verified" ? <Ban className="w-4 h-4" /> : "復活"}
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

function ArtistEditForm({
  artist,
  onStatusChange,
  onOfficialToggle,
}: {
  artist: any
  onStatusChange: (id: number, status: string) => void
  onOfficialToggle: (id: number) => void
}) {
  const [formData, setFormData] = useState({
    name: artist.name,
    email: artist.email,
    status: artist.status,
    type: artist.type,
    genre: artist.genre,
    description: artist.description,
    isOfficial: artist.isOfficial,
    notes: "",
  })

  return (
    <div className="space-y-6">
      {/* アーティスト基本情報 */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">アーティスト名</Label>
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
            <Label htmlFor="genre">ジャンル</Label>
            <Input
              id="genre"
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
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
                <SelectItem value="pending">承認待ち</SelectItem>
                <SelectItem value="suspended">停止中</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {/* アーティスト統計 */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold mb-3">アーティスト統計</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>フォロワー数:</span>
                <span className="font-medium">{artist.followers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>開催イベント:</span>
                <span className="font-medium">{artist.totalEvents}件</span>
              </div>
              <div className="flex justify-between">
                <span>登録日:</span>
                <span className="font-medium">{new Date(artist.joinDate).toLocaleDateString("ja-JP")}</span>
              </div>
              <div className="flex justify-between">
                <span>最終活動:</span>
                <span className="font-medium">{new Date(artist.lastActivity).toLocaleDateString("ja-JP")}</span>
              </div>
            </div>
          </div>

          {/* 公式認証 */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Award className="w-4 h-4 mr-2" />
              公式認証
            </h3>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isOfficial"
                checked={formData.isOfficial}
                onChange={(e) => setFormData({ ...formData, isOfficial: e.target.checked })}
                className="rounded border-gray-300"
              />
              <Label htmlFor="isOfficial">公式アーティストとして認証</Label>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              公式認証されたアーティストのイベントには特別なリワードが付与されます
            </p>
          </div>
        </div>
      </div>

      {/* 説明 */}
      <div>
        <Label htmlFor="description">アーティスト説明</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      {/* 管理者メモ */}
      <div>
        <Label htmlFor="notes">管理者メモ</Label>
        <Textarea
          id="notes"
          placeholder="このアーティストに関する管理者メモを入力..."
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
            onStatusChange(artist.id, formData.status)
            if (formData.isOfficial !== artist.isOfficial) {
              onOfficialToggle(artist.id)
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
