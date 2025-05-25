"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, FileText, Scale, AlertTriangle, Users, CreditCard, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
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
              <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">利用規約</h1>
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
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">利用規約</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Fanlogueサービスをご利用いただく前に、以下の利用規約をよくお読みください。
            サービスをご利用いただくことで、本規約に同意したものとみなされます。
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">最終更新日: 2024年1月20日</p>
        </div>

        {/* 重要事項 */}
        <Card className="border-0 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-l-4 border-l-orange-500 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">重要事項</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  <li>本規約は予告なく変更される場合があります</li>
                  <li>サービス利用により本規約への同意とみなされます</li>
                  <li>規約違反が確認された場合、アカウント停止等の措置を取る場合があります</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 詳細内容 */}
        <div className="space-y-6">
          {/* 1. サービス概要 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span>1. サービス概要</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Fanlogue（以下「本サービス」）は、イベントの発見・参加・体験共有を通じて、
                ユーザー同士のコミュニティ形成をサポートするプラットフォームサービスです。
              </p>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">主な機能</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  <li>イベント情報の検索・閲覧</li>
                  <li>イベントへの参加申込・管理</li>
                  <li>ユーザー間のコミュニケーション</li>
                  <li>ポイント・スタンプ機能</li>
                  <li>イベント主催者向け管理機能</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 2. アカウント登録 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <span>2. アカウント登録</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">登録条件</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  <li>13歳以上であること</li>
                  <li>正確な情報を提供すること</li>
                  <li>1人につき1つのアカウントのみ作成可能</li>
                  <li>法的能力を有すること</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">アカウント管理責任</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  <li>ログイン情報の適切な管理</li>
                  <li>第三者による不正利用の防止</li>
                  <li>アカウント情報の最新性維持</li>
                  <li>不正利用発見時の即座の報告</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 3. 利用ルール */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Scale className="w-5 h-5 text-indigo-600" />
                <span>3. 利用ルール</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">禁止行為</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  <li>法令に違反する行為</li>
                  <li>他のユーザーへの迷惑行為・嫌がらせ</li>
                  <li>虚偽情報の投稿・拡散</li>
                  <li>著作権・知的財産権の侵害</li>
                  <li>商業目的での無断利用</li>
                  <li>システムへの不正アクセス・攻撃</li>
                  <li>複数アカウントの作成・運用</li>
                  <li>未成年者に有害なコンテンツの投稿</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">コンテンツ投稿ルール</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  <li>適切で建設的なコンテンツの投稿</li>
                  <li>他者のプライバシーの尊重</li>
                  <li>事実に基づく正確な情報の提供</li>
                  <li>コミュニティガイドラインの遵守</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 4. 料金・支払い */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-indigo-600" />
                <span>4. 料金・支払い</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">基本サービス</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  基本的な機能は無料でご利用いただけます。一部のプレミアム機能については有料となります。
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">有料サービス</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  <li>料金は事前に明示されます</li>
                  <li>支払いは指定の決済方法で行います</li>
                  <li>返金は原則として行いません</li>
                  <li>料金改定は30日前に通知します</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 5. 知的財産権 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-indigo-600" />
                <span>5. 知的財産権</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">当社の権利</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  本サービスに関する著作権、商標権、その他の知的財産権は当社に帰属します。
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">ユーザーコンテンツ</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                  <li>投稿コンテンツの著作権はユーザーに帰属</li>
                  <li>当社はサービス運営に必要な範囲で利用可能</li>
                  <li>第三者の権利を侵害しないよう注意</li>
                  <li>権利侵害の申し立てがあった場合は適切に対応</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 6. 免責事項 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-indigo-600" />
                <span>6. 免責事項</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>サービスの中断・停止による損害</li>
                <li>ユーザー間のトラブル</li>
                <li>第三者によるサービスの不正利用</li>
                <li>システム障害・データ消失</li>
                <li>外部サービスとの連携に関する問題</li>
                <li>イベント主催者の都合による変更・中止</li>
              </ul>
            </CardContent>
          </Card>

          {/* 7. サービス変更・終了 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <span>7. サービス変更・終了</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                当社は、以下の場合にサービスの変更・終了を行うことがあります。
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                <li>技術的な理由による機能変更</li>
                <li>法令変更への対応</li>
                <li>事業戦略の変更</li>
                <li>経営上の判断</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                重要な変更については、事前に適切な方法で通知いたします。
              </p>
            </CardContent>
          </Card>

          {/* 8. 準拠法・管轄裁判所 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Scale className="w-5 h-5 text-indigo-600" />
                <span>8. 準拠法・管轄裁判所</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>本規約は日本法に準拠します</li>
                <li>本サービスに関する紛争は、東京地方裁判所を第一審の専属的合意管轄裁判所とします</li>
                <li>ユーザーと当社間の紛争解決は、まず誠意をもって協議により解決を図ります</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* お問い合わせセクション */}
        <Card className="border-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white mt-8">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2">利用規約に関するお問い合わせ</h3>
            <p className="text-indigo-100 mb-4">
              利用規約についてご不明な点がございましたら、 お気軽にお問い合わせください。
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
