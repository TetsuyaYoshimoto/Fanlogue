"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Mail, Shield, Bell, Globe, Sparkles, Save, RefreshCw } from "lucide-react"

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    // 一般設定
    siteName: "Fanlogue",
    siteDescription: "イベント参加者と主催者をつなぐプラットフォーム",
    maintenanceMode: false,
    userRegistration: true,
    eventCreation: true,

    // メール設定
    smtpHost: "smtp.example.com",
    smtpPort: "587",
    smtpUser: "noreply@fanlogue.com",
    smtpPassword: "",
    emailFrom: "noreply@fanlogue.com",

    // セキュリティ設定
    passwordMinLength: 8,
    sessionTimeout: 30,
    twoFactorAuth: false,
    ipWhitelist: "",

    // 通知設定
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,

    // ポイント設定
    eventParticipationPoints: 50,
    reviewPoints: 10,
    referralPoints: 100,
    pointsExpiry: 365,
  })

  const handleSave = () => {
    console.log("Settings saved:", settings)
    // 実際の保存処理をここに実装
  }

  const handleReset = () => {
    // デフォルト設定にリセット
    console.log("Settings reset to default")
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
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">システム設定</h1>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handleReset}>
                <RefreshCw className="w-4 h-4 mr-2" />
                リセット
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                保存
              </Button>
            </div>
          </div>
        </header>

        {/* メインコンテンツエリア */}
        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="general">一般</TabsTrigger>
                <TabsTrigger value="email">メール</TabsTrigger>
                <TabsTrigger value="security">セキュリティ</TabsTrigger>
                <TabsTrigger value="notifications">通知</TabsTrigger>
                <TabsTrigger value="points">ポイント</TabsTrigger>
              </TabsList>

              {/* 一般設定 */}
              <TabsContent value="general">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      一般設定
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="siteName">サイト名</Label>
                        <Input
                          id="siteName"
                          value={settings.siteName}
                          onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="siteDescription">サイト説明</Label>
                        <Textarea
                          id="siteDescription"
                          value={settings.siteDescription}
                          onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                          rows={3}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>メンテナンスモード</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">サイトを一時的に停止します</p>
                        </div>
                        <Switch
                          checked={settings.maintenanceMode}
                          onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>ユーザー登録</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">新規ユーザーの登録を許可</p>
                        </div>
                        <Switch
                          checked={settings.userRegistration}
                          onCheckedChange={(checked) => setSettings({ ...settings, userRegistration: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>イベント作成</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">ユーザーによるイベント作成を許可</p>
                        </div>
                        <Switch
                          checked={settings.eventCreation}
                          onCheckedChange={(checked) => setSettings({ ...settings, eventCreation: checked })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* メール設定 */}
              <TabsContent value="email">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Mail className="w-5 h-5 mr-2" />
                      メール設定
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="smtpHost">SMTPホスト</Label>
                        <Input
                          id="smtpHost"
                          value={settings.smtpHost}
                          onChange={(e) => setSettings({ ...settings, smtpHost: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="smtpPort">SMTPポート</Label>
                        <Input
                          id="smtpPort"
                          value={settings.smtpPort}
                          onChange={(e) => setSettings({ ...settings, smtpPort: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="smtpUser">SMTPユーザー</Label>
                        <Input
                          id="smtpUser"
                          value={settings.smtpUser}
                          onChange={(e) => setSettings({ ...settings, smtpUser: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="smtpPassword">SMTPパスワード</Label>
                        <Input
                          id="smtpPassword"
                          type="password"
                          value={settings.smtpPassword}
                          onChange={(e) => setSettings({ ...settings, smtpPassword: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="emailFrom">送信者メールアドレス</Label>
                        <Input
                          id="emailFrom"
                          type="email"
                          value={settings.emailFrom}
                          onChange={(e) => setSettings({ ...settings, emailFrom: e.target.value })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* セキュリティ設定 */}
              <TabsContent value="security">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      セキュリティ設定
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="passwordMinLength">パスワード最小文字数</Label>
                        <Input
                          id="passwordMinLength"
                          type="number"
                          value={settings.passwordMinLength}
                          onChange={(e) =>
                            setSettings({ ...settings, passwordMinLength: Number.parseInt(e.target.value) })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="sessionTimeout">セッションタイムアウト（分）</Label>
                        <Input
                          id="sessionTimeout"
                          type="number"
                          value={settings.sessionTimeout}
                          onChange={(e) =>
                            setSettings({ ...settings, sessionTimeout: Number.parseInt(e.target.value) })
                          }
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>二段階認証を強制</Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">すべてのユーザーに二段階認証を要求</p>
                      </div>
                      <Switch
                        checked={settings.twoFactorAuth}
                        onCheckedChange={(checked) => setSettings({ ...settings, twoFactorAuth: checked })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="ipWhitelist">IPホワイトリスト</Label>
                      <Textarea
                        id="ipWhitelist"
                        value={settings.ipWhitelist}
                        onChange={(e) => setSettings({ ...settings, ipWhitelist: e.target.value })}
                        placeholder="192.168.1.1&#10;10.0.0.0/8"
                        rows={4}
                      />
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        管理画面へのアクセスを許可するIPアドレス（1行に1つ）
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* 通知設定 */}
              <TabsContent value="notifications">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="w-5 h-5 mr-2" />
                      通知設定
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>メール通知</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">システムからのメール通知を有効化</p>
                        </div>
                        <Switch
                          checked={settings.emailNotifications}
                          onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>プッシュ通知</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">ブラウザプッシュ通知を有効化</p>
                        </div>
                        <Switch
                          checked={settings.pushNotifications}
                          onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>SMS通知</Label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">SMS通知を有効化</p>
                        </div>
                        <Switch
                          checked={settings.smsNotifications}
                          onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ポイント設定 */}
              <TabsContent value="points">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sparkles className="w-5 h-5 mr-2" />
                      ポイント設定
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="eventParticipationPoints">イベント参加ポイント</Label>
                        <Input
                          id="eventParticipationPoints"
                          type="number"
                          value={settings.eventParticipationPoints}
                          onChange={(e) =>
                            setSettings({ ...settings, eventParticipationPoints: Number.parseInt(e.target.value) })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="reviewPoints">レビュー投稿ポイント</Label>
                        <Input
                          id="reviewPoints"
                          type="number"
                          value={settings.reviewPoints}
                          onChange={(e) => setSettings({ ...settings, reviewPoints: Number.parseInt(e.target.value) })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="referralPoints">紹介ポイント</Label>
                        <Input
                          id="referralPoints"
                          type="number"
                          value={settings.referralPoints}
                          onChange={(e) =>
                            setSettings({ ...settings, referralPoints: Number.parseInt(e.target.value) })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="pointsExpiry">ポイント有効期限（日）</Label>
                        <Input
                          id="pointsExpiry"
                          type="number"
                          value={settings.pointsExpiry}
                          onChange={(e) => setSettings({ ...settings, pointsExpiry: Number.parseInt(e.target.value) })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
