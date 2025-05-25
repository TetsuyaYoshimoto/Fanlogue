"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Bell,
  Shield,
  Globe,
  Mail,
  MessageSquare,
  Users,
  Calendar,
  Star,
  Download,
  Trash2,
  Sparkles,
  Menu,
} from "lucide-react"
import { Sidebar } from "@/components/sidebar"

// モックデータ
const mockSettings = {
  notifications: {
    push: true,
    email: true,
    sms: false,
    eventReminders: true,
    artistUpdates: true,
    pointsRewards: true,
    systemUpdates: false,
    marketing: false,
  },
  privacy: {
    profileVisibility: "public",
    activityVisibility: "friends",
    pointsVisibility: "private",
    locationSharing: false,
    dataCollection: true,
    analytics: true,
  },
  preferences: {
    language: "ja",
    timezone: "Asia/Tokyo",
    theme: "system",
    emailFrequency: "daily",
    autoFollow: false,
    showRecommendations: true,
  },
}

export default function SettingsPage() {
  const [settings, setSettings] = useState(mockSettings)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const updateNotificationSetting = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }))
  }

  const updatePrivacySetting = (key: string, value: boolean | string) => {
    setSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value,
      },
    }))
  }

  const updatePreferenceSetting = (key: string, value: boolean | string) => {
    setSettings((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value,
      },
    }))
  }

  const handleSaveSettings = () => {
    console.log("Settings saved:", settings)
    // 実際の保存処理
  }

  const handleExportData = () => {
    console.log("Data export requested")
    // データエクスポート処理
  }

  const handleDeleteAccount = () => {
    console.log("Account deletion requested")
    // アカウント削除処理
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
                設定
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
          <div className="space-y-6">
            {/* 通知設定 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  通知設定
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">プッシュ通知</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">アプリからの通知を受け取る</p>
                    </div>
                    <Switch
                      checked={settings.notifications.push}
                      onCheckedChange={(checked) => updateNotificationSetting("push", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">メール通知</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">重要な情報をメールで受け取る</p>
                    </div>
                    <Switch
                      checked={settings.notifications.email}
                      onCheckedChange={(checked) => updateNotificationSetting("email", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">SMS通知</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">緊急時にSMSで通知</p>
                    </div>
                    <Switch
                      checked={settings.notifications.sms}
                      onCheckedChange={(checked) => updateNotificationSetting("sms", checked)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">通知の種類</h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <div>
                        <Label className="text-base font-medium">イベントリマインダー</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">参加予定イベントの開始前に通知</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.eventReminders}
                      onCheckedChange={(checked) => updateNotificationSetting("eventReminders", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <div>
                        <Label className="text-base font-medium">アーティスト更新</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">フォロー中アーティストの新着情報</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.artistUpdates}
                      onCheckedChange={(checked) => updateNotificationSetting("artistUpdates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-gray-500" />
                      <div>
                        <Label className="text-base font-medium">ポイント・スタンプ</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">ポイント獲得やスタンプ取得時の通知</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.pointsRewards}
                      onCheckedChange={(checked) => updateNotificationSetting("pointsRewards", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4 text-gray-500" />
                      <div>
                        <Label className="text-base font-medium">システム更新</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">アプリの更新やメンテナンス情報</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.systemUpdates}
                      onCheckedChange={(checked) => updateNotificationSetting("systemUpdates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <div>
                        <Label className="text-base font-medium">マーケティング</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">おすすめイベントやキャンペーン情報</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.marketing}
                      onCheckedChange={(checked) => updateNotificationSetting("marketing", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* プライバシー設定 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  プライバシー設定
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">プロフィールの公開範囲</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        他のユーザーがあなたのプロフィールを見ることができる範囲
                      </p>
                    </div>
                    <Select
                      value={settings.privacy.profileVisibility}
                      onValueChange={(value) => updatePrivacySetting("profileVisibility", value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">公開</SelectItem>
                        <SelectItem value="friends">友達のみ</SelectItem>
                        <SelectItem value="private">非公開</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">アクティビティの公開範囲</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">イベント参加履歴などの活動情報</p>
                    </div>
                    <Select
                      value={settings.privacy.activityVisibility}
                      onValueChange={(value) => updatePrivacySetting("activityVisibility", value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">公開</SelectItem>
                        <SelectItem value="friends">友達のみ</SelectItem>
                        <SelectItem value="private">非公開</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">ポイント・ランキングの公開</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">ポイント数やランキング順位の表示</p>
                    </div>
                    <Select
                      value={settings.privacy.pointsVisibility}
                      onValueChange={(value) => updatePrivacySetting("pointsVisibility", value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">公開</SelectItem>
                        <SelectItem value="friends">友達のみ</SelectItem>
                        <SelectItem value="private">非公開</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">位置情報の共有</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">イベント参加時の位置情報を共有</p>
                    </div>
                    <Switch
                      checked={settings.privacy.locationSharing}
                      onCheckedChange={(checked) => updatePrivacySetting("locationSharing", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">データ収集の許可</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">サービス改善のためのデータ収集</p>
                    </div>
                    <Switch
                      checked={settings.privacy.dataCollection}
                      onCheckedChange={(checked) => updatePrivacySetting("dataCollection", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">分析データの利用</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">パーソナライズされた体験のための分析</p>
                    </div>
                    <Switch
                      checked={settings.privacy.analytics}
                      onCheckedChange={(checked) => updatePrivacySetting("analytics", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 一般設定 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  一般設定
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-base font-medium">言語</Label>
                    <Select
                      value={settings.preferences.language}
                      onValueChange={(value) => updatePreferenceSetting("language", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ja">日本語</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-medium">タイムゾーン</Label>
                    <Select
                      value={settings.preferences.timezone}
                      onValueChange={(value) => updatePreferenceSetting("timezone", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Tokyo">東京 (JST)</SelectItem>
                        <SelectItem value="Asia/Seoul">ソウル (KST)</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-medium">テーマ</Label>
                    <Select
                      value={settings.preferences.theme}
                      onValueChange={(value) => updatePreferenceSetting("theme", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">ライト</SelectItem>
                        <SelectItem value="dark">ダーク</SelectItem>
                        <SelectItem value="system">システム設定に従う</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-base font-medium">メール配信頻度</Label>
                    <Select
                      value={settings.preferences.emailFrequency}
                      onValueChange={(value) => updatePreferenceSetting("emailFrequency", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">リアルタイム</SelectItem>
                        <SelectItem value="daily">1日1回</SelectItem>
                        <SelectItem value="weekly">週1回</SelectItem>
                        <SelectItem value="never">配信しない</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">自動フォロー</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        参加したイベントのアーティストを自動でフォロー
                      </p>
                    </div>
                    <Switch
                      checked={settings.preferences.autoFollow}
                      onCheckedChange={(checked) => updatePreferenceSetting("autoFollow", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">おすすめ表示</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        パーソナライズされたおすすめコンテンツを表示
                      </p>
                    </div>
                    <Switch
                      checked={settings.preferences.showRecommendations}
                      onCheckedChange={(checked) => updatePreferenceSetting("showRecommendations", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* データ管理 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center">
                  <Download className="w-5 h-5 mr-2" />
                  データ管理
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">データのエクスポート</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">あなたのデータをダウンロード</p>
                  </div>
                  <Button variant="outline" onClick={handleExportData}>
                    <Download className="w-4 h-4 mr-2" />
                    エクスポート
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20">
                  <div>
                    <h3 className="font-medium text-red-800 dark:text-red-200">アカウントの削除</h3>
                    <p className="text-sm text-red-600 dark:text-red-400">この操作は取り消せません</p>
                  </div>
                  <Button variant="destructive" onClick={handleDeleteAccount}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    削除
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 保存ボタン */}
            <div className="flex justify-end">
              <Button
                onClick={handleSaveSettings}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8"
              >
                設定を保存
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
