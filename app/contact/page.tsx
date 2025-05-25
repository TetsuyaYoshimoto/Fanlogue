"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // フォーム送信のシミュレーション
    setTimeout(() => {
      setIsSubmitting(false)
      alert("お問い合わせを送信しました。ありがとうございます。")
      setFormData({
        name: "",
        email: "",
        category: "",
        subject: "",
        message: "",
      })
    }, 2000)
  }

  const contactMethods = [
    {
      icon: Mail,
      title: "メール",
      description: "support@fanlogue.com",
      detail: "24時間以内に返信いたします",
    },
    {
      icon: Phone,
      title: "電話",
      description: "03-1234-5678",
      detail: "平日 9:00-18:00",
    },
    {
      icon: MessageCircle,
      title: "チャット",
      description: "リアルタイムサポート",
      detail: "平日 9:00-18:00",
    },
  ]

  const faqItems = [
    {
      question: "アカウントを作成できません",
      answer: "メールアドレスの確認やパスワードの要件をご確認ください。",
    },
    {
      question: "ポイントが反映されません",
      answer: "イベントチェックイン後、数分で反映されます。時間をおいてご確認ください。",
    },
    {
      question: "イベントが見つかりません",
      answer: "検索フィルターを調整するか、カテゴリを変更してお試しください。",
    },
  ]

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
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">お問い合わせ</h1>
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
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">お気軽にお問い合わせください</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            ご質問やご要望がございましたら、以下のフォームからお送りください
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* お問い合わせフォーム */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  お問い合わせフォーム
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">お名前 *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="山田太郎"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">メールアドレス *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category">お問い合わせ種別 *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="お問い合わせの種別を選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">技術的な問題</SelectItem>
                        <SelectItem value="account">アカウントについて</SelectItem>
                        <SelectItem value="events">イベントについて</SelectItem>
                        <SelectItem value="points">ポイント・スタンプについて</SelectItem>
                        <SelectItem value="billing">料金について</SelectItem>
                        <SelectItem value="feature">機能要望</SelectItem>
                        <SelectItem value="other">その他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject">件名 *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      placeholder="お問い合わせの件名を入力してください"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">お問い合わせ内容 *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      placeholder="詳細な内容をご記入ください。問題が発生している場合は、具体的な状況や手順もお教えください。"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white h-12"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>送信中...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="w-4 h-4" />
                        <span>送信する</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* サイドバー */}
          <div className="space-y-6">
            {/* 連絡先情報 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">その他の連絡方法</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                      <method.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">{method.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{method.description}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">{method.detail}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 営業時間 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  サポート時間
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>平日</span>
                    <span className="font-medium">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>土日祝日</span>
                    <span className="font-medium">休業</span>
                  </div>
                  <div className="flex justify-between">
                    <span>メール</span>
                    <span className="font-medium">24時間受付</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    緊急の技術的問題については、メールでお問い合わせください。優先的に対応いたします。
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* よくある質問 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2" />
                  よくある質問
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">{item.question}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.answer}</p>
                    </div>
                  ))}
                </div>
                <Link href="/faq" className="block mt-4">
                  <Button variant="outline" className="w-full">
                    すべてのFAQを見る
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 所在地 */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  所在地
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p>〒150-0001</p>
                  <p>東京都渋谷区神宮前1-1-1</p>
                  <p>Fanlogueビル 5F</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
