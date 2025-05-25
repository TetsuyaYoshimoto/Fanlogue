"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Building2,
  LogOut,
  Settings,
  Bell,
  Save,
  Upload,
  Eye,
  EyeOff,
  Shield,
  CreditCard,
  User,
  Download,
  BarChart3,
  Calendar,
} from "lucide-react"
import { useRouter } from "next/navigation"

// モックデータ
const mockCompanyData = {
  companyName: "株式会社イベントプロ",
  contactName: "田中 太郎",
  email: "info@event-pro.com",
  phone: "03-1234-5678",
  website: "https://event-pro.com",
  address: "東京都渋谷区渋谷1-1-1",
  description:
    "革新的なイベント企画・運営を行う企業です。テクノロジーとクリエイティビティを融合させた独自のイベント体験を提供しています。",
  avatar: "/placeholder.svg?height=100&width=100",
  plan: "プロフェッショナル",
  verified: true,
}

export default function BusinessSettingsPage() {
  const [companyData, setCompanyData] = useState(mockCompanyData)
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    eventReminders: true,
    marketingEmails: false,
    securityAlerts: true,
  })
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    contactInfoVisible: false,
    eventHistoryVisible: true,
  })
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  const handleSave = () => {
    // 保存処理のシミュレーション
    console.log("Settings saved:", { companyData, notifications, privacy })
    alert("設定が保存されました")
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
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">設定</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                保存
              </Button>
            </div>
          </div>
        </header>

        {/* メインコンテンツエリア */}
        <main className="p-6 space-y-6">
          <Tabs defaultValue="company" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="company">企業情報</TabsTrigger>
              <TabsTrigger value="account">アカウント</TabsTrigger>
              <TabsTrigger value="notifications">通知設定</TabsTrigger>
              <TabsTrigger value="privacy">プライバシー</TabsTrigger>
            </TabsList>

            {/* 企業情報 */}
            <TabsContent value="company">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="border-0 shadow-lg lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">基本情報</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="companyName">会社・団体名 *</Label>
                        <Input
                          id="companyName"
                          value={companyData.companyName}
                          onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactName">担当者名 *</Label>
                        <Input
                          id="contactName"
                          value={companyData.contactName}
                          onChange={(e) => setCompanyData({ ...companyData, contactName: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">メールアドレス *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={companyData.email}
                          onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">電話番号 *</Label>
                        <Input
                          id="phone"
                          value={companyData.phone}
                          onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="website">ウェブサイト</Label>
                      <Input
                        id="website"
                        value={companyData.website}
                        onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                        placeholder="https://example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">住所</Label>
                      <Input
                        id="address"
                        value={companyData.address}
                        onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">企業・団体説明</Label>
                      <Textarea
                        id="description"
                        value={companyData.description}
                        onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })}
                        rows={4}
                        placeholder="企業・団体の説明を入力してください"
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  {/* プロフィール画像 */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
                        プロフィール画像
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <Avatar className="w-24 h-24 mx-auto">
                        <AvatarImage src={companyData.avatar || "/placeholder.svg"} alt={companyData.companyName} />
                        <AvatarFallback className="text-2xl">{companyData.companyName[0]}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" className="w-full">
                        <Upload className="w-4 h-4 mr-2" />
                        画像をアップロード
                      </Button>
                      <p className="text-xs text-gray-500 dark:text-gray-400">推奨サイズ: 400x400px、最大2MB</p>
                    </CardContent>
                  </Card>

                  {/* プラン情報 */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">プラン情報</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">現在のプラン</p>
                        <p className="text-xl font-bold text-blue-600">{companyData.plan}</p>
                        {companyData.verified && (
                          <div className="flex items-center justify-center space-x-1 mt-2">
                            <Shield className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-green-600">認証済み</span>
                          </div>
                        )}
                      </div>
                      <Button variant="outline" className="w-full">
                        <CreditCard className="w-4 h-4 mr-2" />
                        プランを変更
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* アカウント設定 */}
            <TabsContent value="account">
              <Card className="border-0 shadow-lg max-w-2xl">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">アカウント設定</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="current-password">現在のパスワード</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="現在のパスワードを入力"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="new-password">新しいパスワード</Label>
                    <Input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="新しいパスワードを入力"
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirm-password">パスワード確認</Label>
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="新しいパスワードを再入力"
                    />
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">セキュリティ設定</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">二段階認証</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            アカウントのセキュリティを強化します
                          </p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">ログイン通知</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            新しいデバイスからのログイン時に通知
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-red-600 mb-4">危険な操作</h3>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                        アカウントを削除
                      </Button>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        アカウントを削除すると、すべてのデータが永久に失われます。この操作は取り消せません。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 通知設定 */}
            <TabsContent value="notifications">
              <Card className="border-0 shadow-lg max-w-2xl">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">通知設定</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">メール通知</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">重要な更新情報をメールで受け取る</p>
                      </div>
                      <Switch
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emailNotifications: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">イベントリマインダー</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">イベント開催前の通知</p>
                      </div>
                      <Switch
                        checked={notifications.eventReminders}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, eventReminders: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">マーケティングメール</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">新機能やプロモーション情報</p>
                      </div>
                      <Switch
                        checked={notifications.marketingEmails}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">セキュリティアラート</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">不審なアクティビティの通知</p>
                      </div>
                      <Switch
                        checked={notifications.securityAlerts}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, securityAlerts: checked })}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">通知頻度</h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="frequency" value="immediate" defaultChecked className="rounded" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">即座に通知</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="frequency" value="daily" className="rounded" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">1日1回まとめて</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="frequency" value="weekly" className="rounded" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">週1回まとめて</span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* プライバシー設定 */}
            <TabsContent value="privacy">
              <Card className="border-0 shadow-lg max-w-2xl">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">プライバシー設定</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">プロフィール公開</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">他のユーザーがプロフィールを閲覧可能</p>
                      </div>
                      <Switch
                        checked={privacy.profileVisible}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, profileVisible: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">連絡先情報公開</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">メールアドレスや電話番号の公開</p>
                      </div>
                      <Switch
                        checked={privacy.contactInfoVisible}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, contactInfoVisible: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">イベント履歴公開</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">過去のイベント開催履歴の公開</p>
                      </div>
                      <Switch
                        checked={privacy.eventHistoryVisible}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, eventHistoryVisible: checked })}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">データ管理</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        データをダウンロード
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <User className="w-4 h-4 mr-2" />
                        データ利用状況を確認
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <BarChart3 className="w-5 h-5" />
              <span>分析・レポート</span>
            </a>
          </li>
          <li>
            <a
              href="/business/settings"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
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
