"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  Calendar,
  Users,
  BarChart3,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  Target,
  Megaphone,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Calendar,
    title: "イベント管理",
    description: "直感的なダッシュボードで複数のイベントを効率的に管理",
    color: "bg-blue-500",
  },
  {
    icon: Users,
    title: "参加者管理",
    description: "参加者の詳細情報、チェックイン状況をリアルタイムで把握",
    color: "bg-green-500",
  },
  {
    icon: BarChart3,
    title: "詳細分析",
    description: "参加者データ、エンゲージメント指標の詳細な分析レポート",
    color: "bg-purple-500",
  },
  {
    icon: Megaphone,
    title: "プロモーション支援",
    description: "効果的なマーケティングツールでイベントの認知度向上",
    color: "bg-orange-500",
  },
  {
    icon: Shield,
    title: "セキュリティ",
    description: "企業レベルのセキュリティで大切なデータを保護",
    color: "bg-red-500",
  },
  {
    icon: Zap,
    title: "自動化機能",
    description: "メール配信、リマインダー、レポート生成の自動化",
    color: "bg-yellow-500",
  },
]

const plans = [
  {
    name: "スタンダード",
    price: "¥9,800",
    period: "/月",
    description: "中小規模のイベント主催者向け",
    features: ["月間10イベントまで", "参加者数無制限", "基本分析レポート", "メールサポート", "QRコードチェックイン"],
    popular: false,
  },
  {
    name: "プロフェッショナル",
    price: "¥19,800",
    period: "/月",
    description: "大規模イベント・企業向け",
    features: [
      "月間50イベントまで",
      "参加者数無制限",
      "高度な分析・レポート",
      "優先サポート",
      "カスタムブランディング",
      "API連携",
      "専用アカウントマネージャー",
    ],
    popular: true,
  },
  {
    name: "エンタープライズ",
    price: "お問い合わせ",
    period: "",
    description: "大企業・団体向けカスタムソリューション",
    features: [
      "イベント数無制限",
      "参加者数無制限",
      "カスタム分析・レポート",
      "24/7サポート",
      "完全カスタマイズ",
      "オンプレミス対応",
      "SLA保証",
    ],
    popular: false,
  },
]

const testimonials = [
  {
    name: "田中 美咲",
    company: "株式会社イベントプロ",
    role: "イベント企画部長",
    content:
      "Fanlogueを導入してから、イベント管理の効率が格段に向上しました。参加者とのエンゲージメントも大幅に改善され、リピート率が30%向上しています。",
    rating: 5,
  },
  {
    name: "佐藤 健太",
    company: "NPO法人コミュニティサポート",
    role: "代表理事",
    content:
      "非営利団体でも使いやすい料金設定と、充実した機能に満足しています。特に参加者管理機能は、ボランティアスタッフでも簡単に使えて助かっています。",
    rating: 5,
  },
  {
    name: "山田 花子",
    company: "クリエイティブスタジオ WAVE",
    role: "マーケティングマネージャー",
    content:
      "分析機能が非常に詳細で、次回のイベント企画に活かせるデータが豊富に取得できます。ROIの向上に直結する素晴らしいツールです。",
    rating: 5,
  },
]

export default function OrganizersPage() {
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
              <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">法人・団体向けサービス</h1>
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

      {/* メインコンテンツ */}
      <main>
        {/* ヒーローセクション */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center max-w-4xl">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-gray-200 mb-6">
              イベントの成功を
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                次のレベルへ
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Fanlogueの法人向けソリューションで、イベント管理を効率化し、 参加者エンゲージメントを最大化しませんか？
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/business/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3"
                >
                  無料トライアルを開始
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-3">
                資料をダウンロード
              </Button>
            </div>
          </div>
        </section>

        {/* 統計セクション */}
        <section className="py-16 px-4 bg-white/50 dark:bg-gray-800/50">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">10,000+</div>
                <div className="text-gray-600 dark:text-gray-400">開催イベント数</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">500+</div>
                <div className="text-gray-600 dark:text-gray-400">導入企業・団体</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">98%</div>
                <div className="text-gray-600 dark:text-gray-400">顧客満足度</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">24/7</div>
                <div className="text-gray-600 dark:text-gray-400">サポート体制</div>
              </div>
            </div>
          </div>
        </section>

        {/* 機能セクション */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                イベント成功のための
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  強力な機能
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                プロフェッショナルなイベント運営に必要なすべての機能を一つのプラットフォームで
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 料金プラン */}
        <section className="py-20 px-4 bg-white/50 dark:bg-gray-800/50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                あなたに最適な
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  プランを選択
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                規模や用途に応じて選べる柔軟な料金プラン
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <Card
                  key={index}
                  className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative ${
                    plan.popular ? "ring-2 ring-indigo-500 scale-105" : ""
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                      人気プラン
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-200">{plan.name}</CardTitle>
                    <div className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                      {plan.price}
                      <span className="text-lg font-normal text-gray-600 dark:text-gray-400">{plan.period}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                          : "border border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      {plan.name === "エンタープライズ" ? "お問い合わせ" : "無料トライアル開始"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* お客様の声 */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                お客様の
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  成功事例
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Fanlogueを導入した企業・団体様からの声をご紹介します
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 italic">"{testimonial.content}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-gray-800 dark:text-gray-200">{testimonial.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA セクション */}
        <section className="py-20 px-4 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="container mx-auto text-center max-w-4xl">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              今すぐFanlogueで
              <br />
              イベントの可能性を広げませんか？
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              30日間の無料トライアルで、すべての機能をお試しいただけます。 クレジットカード登録は不要です。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/business/login">
                <Button size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3">
                  無料トライアルを開始
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-3">
                デモを予約
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
