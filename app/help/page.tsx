"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Search, ChevronDown, ChevronRight, Sparkles, HelpCircle, Book, MessageCircle, Mail } from "lucide-react"
import Link from "next/link"

// モックデータ
const helpCategories = [
  {
    id: "getting-started",
    title: "はじめに",
    icon: "🚀",
    articles: [
      {
        id: 1,
        title: "Fanlogueとは？",
        summary: "Fanlogueの基本的な概要と機能について",
        content: "Fanlogueは、様々なイベントに参加してポイントやスタンプを獲得できるプラットフォームです。",
      },
      {
        id: 2,
        title: "アカウントの作成方法",
        summary: "新規アカウントの作成手順",
        content: "メールアドレスとパスワードを入力して、簡単にアカウントを作成できます。",
      },
      {
        id: 3,
        title: "プロフィールの設定",
        summary: "プロフィール情報の編集方法",
        content: "プロフィール画面から、表示名や自己紹介などの情報を編集できます。",
      },
    ],
  },
  {
    id: "events",
    title: "イベント",
    icon: "📅",
    articles: [
      {
        id: 4,
        title: "イベントの探し方",
        summary: "興味のあるイベントを見つける方法",
        content: "検索機能やカテゴリフィルターを使って、お好みのイベントを見つけることができます。",
      },
      {
        id: 5,
        title: "イベントへの参加方法",
        summary: "イベントに参加する手順",
        content: "イベント詳細ページから「チェックイン」ボタンを押すことで参加できます。",
      },
      {
        id: 6,
        title: "イベントの作成方法",
        summary: "自分でイベントを作成する方法",
        content: "「イベント作成」ページから、必要な情報を入力してイベントを作成できます。",
      },
    ],
  },
  {
    id: "points-stamps",
    title: "ポイント・スタンプ",
    icon: "⭐",
    articles: [
      {
        id: 7,
        title: "ポイントシステムについて",
        summary: "ポイントの獲得方法と使い道",
        content: "イベントに参加することでポイントを獲得でき、ランキングで競うことができます。",
      },
      {
        id: 8,
        title: "スタンプコレクション",
        summary: "スタンプの種類と獲得方法",
        content: "特別なイベントに参加すると、記念スタンプを獲得できます。",
      },
      {
        id: 9,
        title: "ランキングシステム",
        summary: "ポイントランキングの仕組み",
        content: "獲得ポイントに応じてランキングが決まり、上位者には特別なバッジが付与されます。",
      },
    ],
  },
  {
    id: "friends",
    title: "フレンド機能",
    icon: "👥",
    articles: [
      {
        id: 10,
        title: "フレンドの追加方法",
        summary: "他のユーザーをフォローする方法",
        content: "ユーザー検索からフレンドを見つけて、フォローボタンを押すことでフレンドになれます。",
      },
      {
        id: 11,
        title: "フレンドの活動確認",
        summary: "フレンドの参加イベントを見る方法",
        content: "フレンドページから、フォロー中のユーザーの最近の活動を確認できます。",
      },
    ],
  },
  {
    id: "account",
    title: "アカウント設定",
    icon: "⚙️",
    articles: [
      {
        id: 12,
        title: "パスワードの変更",
        summary: "アカウントのパスワードを変更する方法",
        content: "プロフィール設定から、セキュリティ設定でパスワードを変更できます。",
      },
      {
        id: 13,
        title: "通知設定",
        summary: "通知の種類と設定方法",
        content: "設定ページから、受け取りたい通知の種類を選択できます。",
      },
      {
        id: 14,
        title: "プライバシー設定",
        summary: "個人情報の公開範囲設定",
        content: "プロフィールの公開範囲や活動履歴の表示設定を変更できます。",
      },
    ],
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [openCategories, setOpenCategories] = useState<string[]>(["getting-started"])
  const [selectedArticle, setSelectedArticle] = useState<any>(null)

  const toggleCategory = (categoryId: string) => {
    setOpenCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const filteredCategories = helpCategories.map((category) => ({
    ...category,
    articles: category.articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* ヘッダー */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Fanlogue
                  </span>
                </div>
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">ヘルプセンター</h1>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">ダッシュボードに戻る</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* ヒーローセクション */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">お困りですか？</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            よくある質問や使い方ガイドで、すぐに解決策を見つけましょう
          </p>

          {/* 検索バー */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="質問やキーワードで検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg border-0 bg-white dark:bg-gray-800 shadow-lg"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* サイドバー */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">カテゴリ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredCategories.map((category) => (
                    <Collapsible
                      key={category.id}
                      open={openCategories.includes(category.id)}
                      onOpenChange={() => toggleCategory(category.id)}
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between p-3 h-auto text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{category.icon}</span>
                            <span className="font-medium">{category.title}</span>
                            <Badge variant="secondary" className="ml-auto">
                              {category.articles.length}
                            </Badge>
                          </div>
                          {openCategories.includes(category.id) ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-1 ml-6">
                        {category.articles.map((article) => (
                          <Button
                            key={article.id}
                            variant="ghost"
                            className="w-full justify-start text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                            onClick={() => setSelectedArticle(article)}
                          >
                            {article.title}
                          </Button>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* クイックリンク */}
            <Card className="border-0 shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">その他のサポート</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/faq">
                  <Button variant="outline" className="w-full justify-start">
                    <Book className="w-4 h-4 mr-2" />
                    よくある質問
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    お問い合わせ
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  チャットサポート
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* メインコンテンツ */}
          <div className="lg:col-span-2">
            {selectedArticle ? (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {selectedArticle.title}
                    </CardTitle>
                    <Button variant="ghost" onClick={() => setSelectedArticle(null)}>
                      ✕
                    </Button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{selectedArticle.summary}</p>
                </CardHeader>
                <CardContent>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{selectedArticle.content}</p>
                    <p>
                      この記事では、{selectedArticle.title.toLowerCase()}について詳しく説明します。
                      具体的な手順や注意点について、以下で詳しく見ていきましょう。
                    </p>
                    <h3>手順</h3>
                    <ol>
                      <li>まず、該当する画面にアクセスします</li>
                      <li>必要な情報を入力または選択します</li>
                      <li>設定を保存または実行します</li>
                    </ol>
                    <h3>注意点</h3>
                    <ul>
                      <li>設定変更は即座に反映されます</li>
                      <li>一部の機能は管理者権限が必要な場合があります</li>
                      <li>問題が発生した場合は、サポートまでお問い合わせください</li>
                    </ul>
                  </div>
                  <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      💡 この記事は役に立ちましたか？さらに詳しい情報が必要な場合は、
                      <Link href="/contact" className="underline">
                        お問い合わせ
                      </Link>
                      からご連絡ください。
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredCategories.map((category) => (
                  <Card key={category.id} className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center space-x-2">
                        <span className="text-2xl">{category.icon}</span>
                        <span>{category.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {category.articles.map((article) => (
                          <div
                            key={article.id}
                            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => setSelectedArticle(article)}
                          >
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{article.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{article.summary}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
