"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Eye, EyeOff, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function BusinessLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const [registerData, setRegisterData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactName: "",
    phone: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // ビジネスログイン処理のシミュレーション
    setTimeout(() => {
      setIsLoading(false)
      if (loginData.email === "business@example.com" && loginData.password === "business123") {
        router.push("/business/dashboard")
      } else {
        setError("メールアドレスまたはパスワードが正しくありません")
      }
    }, 1500)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    if (registerData.password !== registerData.confirmPassword) {
      setError("パスワードが一致しません")
      setIsLoading(false)
      return
    }

    // ビジネス登録処理のシミュレーション
    setTimeout(() => {
      setIsLoading(false)
      setSuccess("アカウントが作成されました。審査完了後、ご利用いただけます。")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4">
      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-20 animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-gray-200 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            ホームに戻る
          </Link>

          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Fanlogue Business</span>
          </div>
          <p className="text-gray-300">法人・団体向けイベント管理プラットフォーム</p>
        </div>

        {/* 認証フォーム */}
        <Card className="glass border-0 shadow-2xl bg-white/10 backdrop-blur-md">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-white">ビジネスアカウント</CardTitle>
            <CardDescription className="text-gray-300">ログインまたは新規アカウント作成</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/10">
                <TabsTrigger value="login" className="text-sm text-white data-[state=active]:bg-white/20">
                  ログイン
                </TabsTrigger>
                <TabsTrigger value="register" className="text-sm text-white data-[state=active]:bg-white/20">
                  新規登録
                </TabsTrigger>
              </TabsList>

              {/* ログインタブ */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  {error && (
                    <div className="flex items-center space-x-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <span className="text-red-400 text-sm">{error}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-200">
                      メールアドレス
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="business@example.com"
                      className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-200">
                      パスワード
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="パスワードを入力"
                        className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
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

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-gray-300">ログイン状態を保持</span>
                    </label>
                    <Link href="/business/forgot-password" className="text-blue-400 hover:text-blue-300">
                      パスワードを忘れた方
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>ログイン中...</span>
                      </div>
                    ) : (
                      "ログイン"
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* 新規登録タブ */}
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  {error && (
                    <div className="flex items-center space-x-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <span className="text-red-400 text-sm">{error}</span>
                    </div>
                  )}

                  {success && (
                    <div className="flex items-center space-x-2 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm">{success}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-sm font-medium text-gray-200">
                      会社・団体名
                    </Label>
                    <Input
                      id="companyName"
                      type="text"
                      placeholder="株式会社○○"
                      className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      value={registerData.companyName}
                      onChange={(e) => setRegisterData({ ...registerData, companyName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactName" className="text-sm font-medium text-gray-200">
                      担当者名
                    </Label>
                    <Input
                      id="contactName"
                      type="text"
                      placeholder="田中 太郎"
                      className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      value={registerData.contactName}
                      onChange={(e) => setRegisterData({ ...registerData, contactName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-sm font-medium text-gray-200">
                      メールアドレス
                    </Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="business@example.com"
                      className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-200">
                      電話番号
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="03-1234-5678"
                      className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-sm font-medium text-gray-200">
                      パスワード
                    </Label>
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="8文字以上のパスワード"
                      className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-200">
                      パスワード（確認）
                    </Label>
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="パスワードを再入力"
                      className="h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>

                  <div className="text-sm">
                    <label className="flex items-start space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300 mt-1" required />
                      <span className="text-gray-300">
                        <Link href="/terms" className="text-blue-400 hover:text-blue-300">
                          利用規約
                        </Link>
                        および
                        <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
                          プライバシーポリシー
                        </Link>
                        に同意します
                      </span>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>アカウント作成中...</span>
                      </div>
                    ) : (
                      "アカウント作成"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* デモ用認証情報 */}
        <div className="mt-6 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
          <div className="text-sm text-blue-200">
            <p className="font-medium mb-2">デモ用認証情報:</p>
            <p>メール: business@example.com</p>
            <p>パスワード: business123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
