"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Users, Calendar, MapPin, Clock, Sparkles, Menu } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"

// モックデータ
const mockFriends = [
  {
    id: 1,
    username: "佐藤花子",
    displayName: "佐藤花子",
    avatar: "/placeholder.svg?height=60&width=60",
    location: "東京",
    mutualFriends: 5,
    recentEvents: [
      {
        id: 1,
        name: "フードフェスティバル2024",
        date: "2024-01-20",
        type: "フード",
      },
      {
        id: 2,
        name: "プログラミングワークショップ",
        date: "2024-01-18",
        type: "ワークショップ",
      },
    ],
    isFollowing: true,
  },
  {
    id: 2,
    username: "山田次郎",
    displayName: "山田次郎",
    avatar: "/placeholder.svg?height=60&width=60",
    location: "大阪",
    mutualFriends: 3,
    recentEvents: [
      {
        id: 3,
        name: "アートギャラリー展示会",
        date: "2024-01-19",
        type: "アート",
      },
    ],
    isFollowing: true,
  },
]

const mockSearchableUsers = [
  {
    id: 3,
    username: "music_lover_123",
    displayName: "音楽太郎",
    avatar: "/placeholder.svg?height=60&width=60",
    location: "大阪",
    mutualFriends: 2,
    isFollowing: false,
    isOfficial: false,
  },
  {
    id: 4,
    username: "official_band_a",
    displayName: "BAND A",
    avatar: "/placeholder.svg?height=60&width=60",
    location: "東京",
    mutualFriends: 0,
    isFollowing: false,
    isOfficial: true,
  },
  {
    id: 5,
    username: "event_creator",
    displayName: "イベント企画者",
    avatar: "/placeholder.svg?height=60&width=60",
    location: "名古屋",
    mutualFriends: 1,
    isFollowing: false,
    isOfficial: false,
  },
]

export default function FriendsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [friends, setFriends] = useState(mockFriends)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query.trim()) {
      setIsSearching(true)
      // 実際の検索処理をシミュレート
      setTimeout(() => {
        const results = mockSearchableUsers.filter(
          (user) =>
            user.username.toLowerCase().includes(query.toLowerCase()) ||
            user.displayName.toLowerCase().includes(query.toLowerCase()) ||
            user.id.toString().includes(query),
        )
        setSearchResults(results)
        setIsSearching(false)
      }, 500)
    } else {
      setSearchResults([])
      setIsSearching(false)
    }
  }

  const handleFollow = (userId, isCurrentlyFollowing) => {
    if (isCurrentlyFollowing) {
      setFriends((prev) => prev.filter((friend) => friend.id !== userId))
    } else {
      // 検索結果からフォロー
      const userToFollow = searchResults.find((user) => user.id === userId)
      if (userToFollow) {
        setFriends((prev) => [...prev, { ...userToFollow, isFollowing: true, recentEvents: [] }])
        setSearchResults((prev) => prev.map((user) => (user.id === userId ? { ...user, isFollowing: true } : user)))
      }
    }
  }

  const filteredFriends = friends.filter((friend) =>
    friend.displayName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
                フレンド
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
          {/* 検索バー */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="ユーザー名、表示名、IDで検索..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 h-12 border-0 bg-white dark:bg-gray-800 shadow-lg"
              />
            </div>
          </div>

          {/* タブコンテンツ */}
          <Tabs defaultValue="friends" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="friends">フレンド ({friends.length})</TabsTrigger>
              <TabsTrigger value="search">検索</TabsTrigger>
            </TabsList>

            {/* フレンド一覧 */}
            <TabsContent value="friends">
              <div className="space-y-6">
                {filteredFriends.map((friend) => (
                  <Card key={friend.id} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.displayName} />
                            <AvatarFallback>{friend.displayName[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{friend.displayName}</h3>
                            <p className="text-gray-600 dark:text-gray-400">@{friend.username}</p>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-500">
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-3 h-3" />
                                <span>{friend.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-3 h-3" />
                                <span>{friend.mutualFriends}人の共通フレンド</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFollow(friend.id, true)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            フォロー解除
                          </Button>
                          <Link href={`/profile/${friend.id}`}>
                            <Button variant="outline" size="sm">
                              プロフィール
                            </Button>
                          </Link>
                        </div>
                      </div>

                      {/* 最近のイベント */}
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">最近参加したイベント</h4>
                        <div className="space-y-2">
                          {friend.recentEvents.map((event) => (
                            <div
                              key={event.id}
                              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
                                  <Calendar className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-800 dark:text-gray-200">{event.name}</p>
                                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-500">
                                    <Clock className="w-3 h-3" />
                                    <span>{new Date(event.date).toLocaleDateString("ja-JP")}</span>
                                  </div>
                                </div>
                              </div>
                              <Badge variant="secondary">{event.type}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredFriends.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      フレンドが見つかりませんでした
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">検索条件を変更してもう一度お試しください</p>
                  </div>
                )}
              </div>
            </TabsContent>
            {/* 検索結果 */}
            {searchQuery && (
              <TabsContent value="search">
                <div className="space-y-6">
                  {isSearching ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                      <p className="mt-2 text-gray-600 dark:text-gray-400">検索中...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((user) => (
                      <Card key={user.id} className="border-0 shadow-lg">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <Avatar className="w-16 h-16">
                                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.displayName} />
                                <AvatarFallback>{user.displayName[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                                    {user.displayName}
                                  </h3>
                                  {user.isOfficial && (
                                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                                      <Sparkles className="w-2 h-2 mr-1" />
                                      公式
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-gray-600 dark:text-gray-400">@{user.username}</p>
                                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>{user.location}</span>
                                  </div>
                                  {user.mutualFriends > 0 && (
                                    <div className="flex items-center space-x-1">
                                      <Users className="w-3 h-3" />
                                      <span>{user.mutualFriends}人の共通フレンド</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant={user.isFollowing ? "outline" : "default"}
                                size="sm"
                                onClick={() => handleFollow(user.id, user.isFollowing)}
                                className={
                                  !user.isFollowing
                                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                                    : "text-red-600 border-red-200 hover:bg-red-50"
                                }
                              >
                                {user.isFollowing ? "フォロー解除" : "フォロー"}
                              </Button>
                              <Link href={`/profile/${user.id}`}>
                                <Button variant="outline" size="sm">
                                  プロフィール
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-12 h-12 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        ユーザーが見つかりませんでした
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">別のキーワードで検索してみてください</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  )
}
