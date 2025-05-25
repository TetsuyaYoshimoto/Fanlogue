"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Tag, ImageIcon, Save, Menu, Sparkles, X } from "lucide-react"
import { Sidebar } from "@/components/sidebar"

const eventCategories = [
  "音楽・ライブ",
  "フード・グルメ",
  "ワークショップ",
  "アート・展示",
  "スポーツ",
  "テクノロジー",
  "ビジネス",
  "教育・学習",
  "健康・ウェルネス",
  "その他",
]

const eventTags = [
  "初心者歓迎",
  "参加費無料",
  "要予約",
  "当日参加OK",
  "オンライン",
  "屋外",
  "屋内",
  "家族向け",
  "大人向け",
  "学生向け",
]

export default function CreateEventPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    address: "",
    capacity: "",
    price: "",
    website: "",
    contactEmail: "",
    tags: [] as string[],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // イベント作成処理のシミュレーション
    setTimeout(() => {
      setIsSubmitting(false)
      console.log("Event created:", formData)
      // 成功後の処理（リダイレクトなど）
    }, 2000)
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
                イベント作成
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
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 基本情報 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  基本情報
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title" className="text-base font-medium">
                    イベント名 *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="魅力的なイベント名を入力してください"
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-base font-medium">
                    イベント説明 *
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="イベントの詳細、参加者が知っておくべき情報を記載してください"
                    className="mt-2"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-base font-medium">
                    カテゴリ *
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="イベントのカテゴリを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* 日時・場所 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  日時・場所
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="date" className="text-base font-medium">
                      開催日 *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="startTime" className="text-base font-medium">
                      開始時間 *
                    </Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      className="mt-2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime" className="text-base font-medium">
                      終了時間
                    </Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location" className="text-base font-medium">
                    会場名 *
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="会場名を入力してください"
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-base font-medium">
                    住所 *
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="〒000-0000 都道府県市区町村..."
                    className="mt-2"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* 参加詳細 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  参加詳細
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="capacity" className="text-base font-medium">
                      定員
                    </Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      placeholder="定員数（任意）"
                      className="mt-2"
                      min="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price" className="text-base font-medium">
                      参加費
                    </Label>
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="無料 または 金額（例：1,000円）"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="website" className="text-base font-medium">
                      ウェブサイト
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://example.com"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactEmail" className="text-base font-medium">
                      連絡先メール
                    </Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      placeholder="contact@example.com"
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* タグ */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  タグ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label className="text-base font-medium mb-3 block">イベントの特徴を選択してください</Label>
                  <div className="flex flex-wrap gap-2">
                    {eventTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={formData.tags.includes(tag) ? "default" : "outline"}
                        className={`cursor-pointer transition-colors ${
                          formData.tags.includes(tag)
                            ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag}
                        {formData.tags.includes(tag) && <X className="w-3 h-3 ml-1" />}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* イベント画像 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2" />
                  イベント画像
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    イベントの魅力を伝える画像をアップロードしてください
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">JPG, PNG, GIF形式（最大5MB）</p>
                  <Button variant="outline" type="button">
                    画像を選択
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 送信ボタン */}
            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button">
                下書き保存
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>作成中...</span>
                  </div>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    イベントを作成
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
