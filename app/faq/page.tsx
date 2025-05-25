"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Sparkles,
  Search,
  HelpCircle,
  Users,
  Calendar,
  Star,
  Settings,
  Shield,
  CreditCard,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

const faqCategories = [
  { id: "general", name: "一般", icon: HelpCircle, color: "bg-blue-500" },
  { id: "account", name: "アカウント", icon: Users, color: "bg-green-500" },
  { id: "events", name: "イベント", icon: Calendar, color: "bg-purple-500" },
  { id: "points", name: "ポイント・スタンプ", icon: Star, color: "bg-yellow-500" },
  { id: "settings", name: "設定", icon: Settings, color: "bg-gray-500" },
  { id: "privacy", name: "プライバシー", icon: Shield, color: "bg-red-500" },
  { id: "billing", name: "料金・支払い", icon: CreditCard, color: "bg-indigo-500" },
]

const faqData = [
  {
    id: 1,
    category: "general",
    question: "Fanlogueとは何ですか？",
    answer:
      "Fanlogueは、イベント参加者と主催者をつなぐプラットフォームです。イベントの発見、参加、体験の共有を通じて、コミュニティの形成をサポートします。",
  },
  {
    id: 2,
    category: "general",
    question: "利用料金はかかりますか？",
    answer:
      "基本的な機能は無料でご利用いただけます。一部のプレミアム機能や主催者向けの高度な機能については、有料プランをご用意しています。",
  },
  {
    id: 3,
    category: "account",
    question: "アカウントの作成方法を教えてください",
    answer:
      "トップページの「新規登録」ボタンから、メールアドレスとパスワードを入力してアカウントを作成できます。SNSアカウントでの登録も可能です。",
  },
  {
    id: 4,
    category: "account",
    question: "パスワードを忘れてしまいました",
    answer:
      "ログイン画面の「パスワードを忘れた方」リンクから、登録済みのメールアドレスを入力してください。パスワードリセット用のメールをお送りします。",
  },
  {
    id: 5,
    category: "events",
    question: "イベントに参加するにはどうすればよいですか？",
    answer:
      "イベント詳細ページで「参加する」ボタンをクリックし、必要な情報を入力してください。QRコードでのチェックインも可能です。",
  },
  {
    id: 6,
    category: "events",
    question: "イベントをキャンセルしたい場合は？",
    answer:
      "マイページの「参加予定イベント」から該当イベントを選択し、「キャンセル」ボタンをクリックしてください。キャンセルポリシーは主催者によって異なります。",
  },
  {
    id: 7,
    category: "points",
    question: "ポイントはどのように獲得できますか？",
    answer:
      "イベントへの参加、レビューの投稿、友達の招待などでポイントを獲得できます。獲得したポイントは特典との交換に使用できます。",
  },
  {
    id: 8,
    category: "points",
    question: "スタンプの種類について教えてください",
    answer:
      "スタンプには「コモン」「レア」「エピック」の3種類があります。イベントの規模や特別性によってレアリティが決まります。",
  },
  {
    id: 9,
    category: "settings",
    question: "通知設定を変更したい",
    answer:
      "設定ページの「通知設定」から、受け取りたい通知の種類を選択できます。メール、プッシュ通知それぞれで設定可能です。",
  },
  {
    id: 10,
    category: "privacy",
    question: "個人情報の取り扱いについて",
    answer:
      "お客様の個人情報は、プライバシーポリシーに従って適切に管理されます。第三者への提供は、お客様の同意なしには行いません。",
  },
]

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

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
              <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">よくある質問</h1>
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
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">よくある質問</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Fanlogueの使い方や機能について、よくお寄せいただく質問をまとめました。
            お探しの情報が見つからない場合は、お気軽にお問い合わせください。
          </p>
        </div>

        {/* 検索バー */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="質問を検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* カテゴリー選択 */}
        <Card className="border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">カテゴリー</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className="mb-2"
              >
                すべて
              </Button>
              {faqCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="mb-2"
                >
                  <div className={`w-4 h-4 ${category.color} rounded mr-2`}></div>
                  {category.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ一覧 */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">
              質問一覧 ({filteredFAQs.length}件)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredFAQs.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-2">
                {filteredFAQs.map((faq) => {
                  const category = faqCategories.find((cat) => cat.id === faq.category)
                  return (
                    <AccordionItem key={faq.id} value={faq.id.toString()} className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left hover:no-underline">
                        <div className="flex items-center space-x-3">
                          {category && <div className={`w-3 h-3 ${category.color} rounded-full flex-shrink-0`}></div>}
                          <span className="font-medium text-gray-800 dark:text-gray-200">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-400 pt-2 pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            ) : (
              <div className="text-center py-8">
                <HelpCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">該当する質問が見つかりませんでした。</p>
                <p className="text-gray-500 dark:text-gray-400">検索条件を変更してお試しください。</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* お問い合わせセクション */}
        <Card className="border-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white mt-6">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2">お探しの情報が見つかりませんか？</h3>
            <p className="text-indigo-100 mb-4">
              お困りのことがございましたら、お気軽にお問い合わせください。 サポートチームが迅速にお答えいたします。
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
