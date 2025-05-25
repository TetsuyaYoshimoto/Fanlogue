"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building2,
  Calendar,
  Users,
  TrendingUp,
  TrendingDown,
  Eye,
  Award,
  LogOut,
  Settings,
  Bell,
  BarChart3,
  Download,
  Filter,
  RefreshCw,
} from "lucide-react"
import { useRouter } from "next/navigation"

// モックデータ
const mockAnalytics = {
  overview: {
    totalEvents: 45,
    totalAttendees: 12500,
    totalViews: 85420,
    averageRating: 4.6,
    conversionRate: 8.2,
    monthlyGrowth: 15.3,
  },
  eventPerformance: [
    {
      id: 1,
      title: "テックカンファレンス2024",
      views: 2450,
      registrations: 387,
      conversionRate: 15.8,
      rating: 4.8,
      revenue: 1935000,
      trend: "up",
    },
    {
      id: 2,
      title: "スタートアップピッチイベント",
      views: 890,
      registrations: 156,
      conversionRate: 17.5,
      rating: 4.5,
      revenue: 468000,
      trend: "up",
    },
    {
      id: 3,
      title: "デザイン思考ワークショップ",
      views: 1250,
      registrations: 42,
      conversionRate: 3.4,
      rating: 4.9,
      revenue: 336000,
      trend: "down",
    },
  ],
  demographics: {
    ageGroups: [
      { range: "18-24", percentage: 25 },
      { range: "25-34", percentage: 40 },
      { range: "35-44", percentage: 20 },
      { range: "45-54", percentage: 10 },
      { range: "55+", percentage: 5 },
    ],
    locations: [
      { city: "東京", percentage: 45 },
      { city: "大阪", percentage: 20 },
      { city: "名古屋", percentage: 15 },
      { city: "福岡", percentage: 10 },
      { city: "その他", percentage: 10 },
    ],
  },
  monthlyData: [
    { month: "1月", events: 3, attendees: 850, revenue: 425000 },
    { month: "2月", events: 4, attendees: 1200, revenue: 720000 },
    { month: "3月", events: 5, attendees: 1450, revenue: 870000 },
    { month: "4月", events: 6, attendees: 1800, revenue: 1080000 },
    { month: "5月", events: 4, attendees: 1350, revenue: 810000 },
    { month: "6月", events: 7, attendees: 2100, revenue: 1260000 },
  ],
}

export default function BusinessAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [selectedMetric, setSelectedMetric] = useState("all")
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
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
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">分析・レポート</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                更新
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                エクスポート
              </Button>
            </div>
          </div>
        </header>

        {/* メインコンテンツエリア */}
        <main className="p-6 space-y-6">
          {/* フィルター */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">期間:</span>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1month">過去1ヶ月</SelectItem>
                      <SelectItem value="3months">過去3ヶ月</SelectItem>
                      <SelectItem value="6months">過去6ヶ月</SelectItem>
                      <SelectItem value="1year">過去1年</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">指標:</span>
                  <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="views">ビュー数</SelectItem>
                      <SelectItem value="registrations">登録数</SelectItem>
                      <SelectItem value="revenue">売上</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 概要統計 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">総イベント数</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {mockAnalytics.overview.totalEvents}
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">+{mockAnalytics.overview.monthlyGrowth}%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">総参加者数</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {mockAnalytics.overview.totalAttendees.toLocaleString()}
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">+18.2%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">総ビュー数</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {mockAnalytics.overview.totalViews.toLocaleString()}
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">+22.5%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">コンバージョン率</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {mockAnalytics.overview.conversionRate}%
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">+2.1%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* タブコンテンツ */}
          <Tabs defaultValue="performance" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="performance">イベント別パフォーマンス</TabsTrigger>
              <TabsTrigger value="trends">トレンド分析</TabsTrigger>
              <TabsTrigger value="demographics">参加者属性</TabsTrigger>
              <TabsTrigger value="revenue">売上分析</TabsTrigger>
            </TabsList>

            {/* イベント別パフォーマンス */}
            <TabsContent value="performance">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    イベント別パフォーマンス
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.eventPerformance.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{event.title}</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">ビュー数</p>
                              <p className="font-medium text-gray-800 dark:text-gray-200">
                                {event.views.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">登録数</p>
                              <p className="font-medium text-gray-800 dark:text-gray-200">
                                {event.registrations.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">コンバージョン率</p>
                              <p className="font-medium text-gray-800 dark:text-gray-200">{event.conversionRate}%</p>
                            </div>
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">売上</p>
                              <p className="font-medium text-gray-800 dark:text-gray-200">
                                ¥{event.revenue.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{event.rating}</span>
                            <Award className="w-4 h-4 text-yellow-500" />
                          </div>
                          {event.trend === "up" ? (
                            <TrendingUp className="w-5 h-5 text-green-500" />
                          ) : (
                            <TrendingDown className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* トレンド分析 */}
            <TabsContent value="trends">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">月別トレンド</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockAnalytics.monthlyData.map((data, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{data.month}</span>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="text-center">
                              <p className="text-gray-500 dark:text-gray-400">イベント</p>
                              <p className="font-medium text-gray-800 dark:text-gray-200">{data.events}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-gray-500 dark:text-gray-400">参加者</p>
                              <p className="font-medium text-gray-800 dark:text-gray-200">
                                {data.attendees.toLocaleString()}
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="text-gray-500 dark:text-gray-400">売上</p>
                              <p className="font-medium text-gray-800 dark:text-gray-200">
                                ¥{(data.revenue / 1000).toFixed(0)}K
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">成長指標</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">月間成長率</span>
                          <span className="text-sm font-bold text-green-600">
                            +{mockAnalytics.overview.monthlyGrowth}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${mockAnalytics.overview.monthlyGrowth * 2}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">平均評価</span>
                          <span className="text-sm font-bold text-blue-600">
                            {mockAnalytics.overview.averageRating}/5.0
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(mockAnalytics.overview.averageRating / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">コンバージョン率</span>
                          <span className="text-sm font-bold text-purple-600">
                            {mockAnalytics.overview.conversionRate}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${mockAnalytics.overview.conversionRate * 5}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* 参加者属性 */}
            <TabsContent value="demographics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">年齢層分布</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockAnalytics.demographics.ageGroups.map((group, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{group.range}歳</span>
                          <div className="flex items-center space-x-3">
                            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${group.percentage * 2}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 w-8">
                              {group.percentage}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">地域分布</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockAnalytics.demographics.locations.map((location, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{location.city}</span>
                          <div className="flex items-center space-x-3">
                            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${location.percentage * 2}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-bold text-gray-800 dark:text-gray-200 w-8">
                              {location.percentage}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* 売上分析 */}
            <TabsContent value="revenue">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="border-0 shadow-lg lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">月別売上推移</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-end justify-between space-x-2">
                      {mockAnalytics.monthlyData.map((data, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div
                            className="w-full bg-gradient-to-t from-blue-500 to-indigo-600 rounded-t"
                            style={{
                              height: `${(data.revenue / Math.max(...mockAnalytics.monthlyData.map((d) => d.revenue))) * 200}px`,
                            }}
                          ></div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{data.month}</span>
                          <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                            ¥{(data.revenue / 1000).toFixed(0)}K
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">売上サマリー</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">総売上</p>
                        <p className="text-2xl font-bold text-green-600">
                          ¥{mockAnalytics.monthlyData.reduce((sum, data) => sum + data.revenue, 0).toLocaleString()}
                        </p>
                      </div>

                      <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">平均売上/イベント</p>
                        <p className="text-2xl font-bold text-blue-600">
                          ¥
                          {Math.round(
                            mockAnalytics.monthlyData.reduce((sum, data) => sum + data.revenue, 0) /
                              mockAnalytics.monthlyData.reduce((sum, data) => sum + data.events, 0),
                          ).toLocaleString()}
                        </p>
                      </div>

                      <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">平均売上/参加者</p>
                        <p className="text-2xl font-bold text-purple-600">
                          ¥
                          {Math.round(
                            mockAnalytics.monthlyData.reduce((sum, data) => sum + data.revenue, 0) /
                              mockAnalytics.monthlyData.reduce((sum, data) => sum + data.attendees, 0),
                          ).toLocaleString()}
                        </p>
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
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
              className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
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
