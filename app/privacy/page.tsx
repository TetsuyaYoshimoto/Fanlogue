"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Shield, Eye, Lock, Database, Users, FileText, Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* ヘッダー */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  ホームに戻る
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">プライバシーポリシー</h1>
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
        </div>
      </header>

      {/* メインコンテンツエリア */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* ヘッダーセクション */}
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">プライバシーポリシー</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Fanlogue（以下「当社」）は、お客様の個人情報の保護を重要視し、
            個人情報保護法及び関連法令を遵守して適切に取り扱います。
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">最終更新日: 2024年1月20日</p>
        </div>

        {/* 概要カード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardContent className="p-4 text-center">
              <Eye className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">透明性</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">収集する情報と使用目的を明確にお伝えします</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardContent className="p-4 text-center">
              <Lock className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">セキュリティ</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">最新の技術で個人情報を安全に保護します</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">お客様の権利</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">個人情報の管理と削除の権利を保障します</p>
            </CardContent>
          </Card>
        </div>

        {/* 詳細内容 */}
        <div className="space-y-6">
          {/* 1. 個人情報の収集 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-indigo-600" />
                <span>1. 個人情報の収集</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">収集する情報</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  <li>氏名、メールアドレス、電話番号</li>
                  <li>生年月日、性別、居住地域</li>
                  <li>プロフィール画像、自己紹介文</li>
                  <li>イベント参加履歴、評価・レビュー</li>
                  <li>サービス利用状況、アクセスログ</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">収集方法</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  <li>アカウント登録時の入力情報</li>
                  <li>サービス利用時の自動収集</li>
                  <li>お客様からのお問い合わせ</li>
                  <li>SNS連携による取得</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 2. 利用目的 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <span>2. 利用目的</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>サービスの提供・運営・改善</li>
                <li>お客様への連絡・サポート</li>
                <li>イベント情報の配信・推奨</li>
                <li>利用状況の分析・統計作成</li>
                <li>不正利用の防止・セキュリティ確保</li>
                <li>マーケティング・プロモーション活動</li>
                <li>法令に基づく対応</li>
              </ul>
            </CardContent>
          </Card>

          {/* 3. 第三者提供 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <span>3. 第三者への提供</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                当社は、以下の場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                <li>法令に基づく場合</li>
                <li>人の生命、身体または財産の保護のために必要がある場合</li>
                <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
                <li>
                  国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* 4. セキュリティ */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-indigo-600" />
                <span>4. セキュリティ対策</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>SSL/TLS暗号化による通信の保護</li>
                <li>アクセス制御による不正アクセスの防止</li>
                <li>定期的なセキュリティ監査の実施</li>
                <li>従業員への個人情報保護教育の徹底</li>
                <li>システムの脆弱性対策とアップデート</li>
              </ul>
            </CardContent>
          </Card>

          {/* 5. お客様の権利 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-indigo-600" />
                <span>5. お客様の権利</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                お客様は、ご自身の個人情報について以下の権利を有します。
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>個人情報の開示請求</li>
                <li>個人情報の訂正・追加・削除請求</li>
                <li>個人情報の利用停止・消去請求</li>
                <li>個人情報の第三者提供の停止請求</li>
              </ul>
            </CardContent>
          </Card>

          {/* 6. Cookie等の利用 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-indigo-600" />
                <span>6. Cookie等の利用</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                当社では、サービスの利便性向上のためCookieを使用しています。
                Cookieの設定は、ブラウザの設定で変更可能です。
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                <li>ログイン状態の維持</li>
                <li>ユーザー設定の保存</li>
                <li>サービス利用状況の分析</li>
                <li>広告の最適化</li>
              </ul>
            </CardContent>
          </Card>

          {/* 7. お問い合わせ */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-indigo-600" />
                <span>7. お問い合わせ</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください。
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="font-semibold text-gray-800 dark:text-gray-200">Fanlogue 個人情報保護窓口</p>
                <p className="text-gray-600 dark:text-gray-400">メール: privacy@fanlogue.com</p>
                <p className="text-gray-600 dark:text-gray-400">受付時間: 平日 9:00-18:00</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* フッター */}
        <Card className="border-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white mt-8">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2">プライバシーに関するご質問</h3>
            <p className="text-indigo-100 mb-4">
              個人情報の取り扱いについてご不明な点がございましたら、 お気軽にお問い合わせください。
            </p>
            <Button variant="secondary" className="bg-white text-indigo-600 hover:bg-gray-100">
              お問い合わせ
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
