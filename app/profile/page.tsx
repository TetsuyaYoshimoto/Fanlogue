"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Camera, Edit, Save, X, Sparkles, Calendar, Mail, User, Shield, Menu } from "lucide-react"
import { Sidebar } from "@/components/sidebar"

// モックデータ
const mockUser = {
  id: "user123",
  username: "田中太郎",
  displayName: "田中太郎",
  email: "tanaka@example.com",
  bio: "音楽が大好きです！特にロックとポップスを聞きます。ライブに行くのが趣味で、週末はよくイベントに参加しています。",
  avatar: "/placeholder.svg?height=120&width=120",
  location: "東京都",
  birthDate: "1995-05-15",
  joinDate: "2024-01-15",
  website: "https://example.com",
  socialLinks: {
    twitter: "@tanaka_taro",
    instagram: "tanaka.taro",
  },
  privacy: {
    profileVisibility: "public",
    emailVisibility: "private",
    locationVisibility: "friends",
    birthDateVisibility: "private",
  },
  stats: {
    points: 1250,
    stamps: 15,
    followedArtists: 12,
    attendedEvents: 28,
  },
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [formData, setFormData] = useState({
    username: mockUser.username,
    displayName: mockUser.displayName,
    email: mockUser.email,
    bio: mockUser.bio,
    location: mockUser.location,
    birthDate: mockUser.birthDate,
    website: mockUser.website,
    socialLinks: mockUser.socialLinks,
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [visibilitySettings, setVisibilitySettings] = useState({
    locationVisibility: mockUser.privacy.locationVisibility,
    birthDateVisibility: mockUser.privacy.birthDateVisibility,
  })

  const handleSave = () => {
    // 保存処理
    setIsEditing(false)
    console.log("Profile updated:", formData)
    console.log("Visibility settings:", visibilitySettings)
  }

  const handlePasswordChange = () => {
    // パスワード変更処理
    setShowPasswordDialog(false)
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    console.log("Password changed")
  }

  const handleAvatarChange = () => {
    // アバター変更処理
    console.log("Avatar change requested")
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
                プロフィール設定
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

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* プロフィール概要 */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <Avatar className="w-32 h-32 mx-auto">
                      <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.displayName} />
                      <AvatarFallback className="text-2xl">{mockUser.displayName[0]}</AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-2"
                      onClick={handleAvatarChange}
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>

                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{mockUser.displayName}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">@{mockUser.username}</p>
                  <div className="flex items-center justify-center space-x-1 text-sm text-gray-500 dark:text-gray-500 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(mockUser.joinDate).toLocaleDateString("ja-JP")}から参加</span>
                  </div>

                  {/* 統計 */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{mockUser.stats.points}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">ポイント</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{mockUser.stats.stamps}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">スタンプ</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {mockUser.stats.followedArtists}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">フォロー中</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {mockUser.stats.attendedEvents}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">参加イベント</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant={isEditing ? "outline" : "default"}
                      className={
                        !isEditing
                          ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                          : ""
                      }
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                      {isEditing ? "キャンセル" : "編集"}
                    </Button>
                    {isEditing && (
                      <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
                        <Save className="w-4 h-4 mr-2" />
                        保存
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* プロフィール詳細 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 基本情報 */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    基本情報
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="username">ユーザー名</Label>
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50 dark:bg-gray-800" : ""}
                      />
                    </div>
                    <div>
                      <Label htmlFor="displayName">表示名</Label>
                      <Input
                        id="displayName"
                        value={formData.displayName}
                        onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50 dark:bg-gray-800" : ""}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">メールアドレス</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50 dark:bg-gray-800" : ""}
                      />
                      <Badge variant="secondary" className="flex items-center">
                        <Mail className="w-3 h-3 mr-1" />
                        認証済み
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">自己紹介</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50 dark:bg-gray-800" : ""}
                      rows={3}
                      placeholder="あなたについて教えてください..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">居住地</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50 dark:bg-gray-800" : ""}
                      />
                      {isEditing && (
                        <select
                          value={visibilitySettings.locationVisibility}
                          onChange={(e) =>
                            setVisibilitySettings({ ...visibilitySettings, locationVisibility: e.target.value })
                          }
                          className="mt-2 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        >
                          <option value="public">公開</option>
                          <option value="friends">友達のみ</option>
                          <option value="private">非公開</option>
                        </select>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="birthDate">生年月日</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50 dark:bg-gray-800" : ""}
                      />
                      {isEditing && (
                        <select
                          value={visibilitySettings.birthDateVisibility}
                          onChange={(e) =>
                            setVisibilitySettings({ ...visibilitySettings, birthDateVisibility: e.target.value })
                          }
                          className="mt-2 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        >
                          <option value="public">公開</option>
                          <option value="friends">友達のみ</option>
                          <option value="private">非公開</option>
                        </select>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="website">ウェブサイト</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50 dark:bg-gray-800" : ""}
                      placeholder="https://example.com"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* ソーシャルリンク */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">ソーシャルリンク</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="twitter">X (Twitter)</Label>
                    <Input
                      id="twitter"
                      value={formData.socialLinks.twitter}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialLinks: { ...formData.socialLinks, twitter: e.target.value },
                        })
                      }
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50 dark:bg-gray-800" : ""}
                      placeholder="@username"
                    />
                  </div>
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={formData.socialLinks.instagram}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialLinks: { ...formData.socialLinks, instagram: e.target.value },
                        })
                      }
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50 dark:bg-gray-800" : ""}
                      placeholder="username"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* セキュリティ設定 */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    セキュリティ設定
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">パスワード</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">最終更新: 2024年1月15日</p>
                    </div>
                    <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline">変更</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>パスワード変更</DialogTitle>
                          <DialogDescription>
                            セキュリティのため、現在のパスワードを入力してから新しいパスワードを設定してください。
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="currentPassword">現在のパスワード</Label>
                            <Input
                              id="currentPassword"
                              type="password"
                              value={passwordData.currentPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="newPassword">新しいパスワード</Label>
                            <Input
                              id="newPassword"
                              type="password"
                              value={passwordData.newPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="confirmPassword">新しいパスワード（確認）</Label>
                            <Input
                              id="confirmPassword"
                              type="password"
                              value={passwordData.confirmPassword}
                              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
                              キャンセル
                            </Button>
                            <Button
                              onClick={handlePasswordChange}
                              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                            >
                              変更
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">二段階認証</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">アカウントのセキュリティを強化</p>
                    </div>
                    <Badge variant="outline" className="text-gray-600">
                      未設定
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
