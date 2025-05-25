"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sparkles, Home, Calendar, Users, Plus, Star, User, Settings, LogOut, Bell, Clock } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

// モックデータ
const mockUser = {
  name: "田中 太郎",
  email: "tanaka@example.com",
  points: 1250,
  avatar: "/placeholder.svg?height=40&width=40",
}

const mockNotifications = [
  {
    id: 1,
    type: "event_reminder",
    title: "イベント開始まで1時間",
    message: "秋のグルメフェスティバルが間もなく開始されます",
    timestamp: "2024-01-20T10:00:00Z",
    read: false,
  },
  {
    id: 2,
    type: "points_earned",
    title: "ポイント獲得",
    message: "AI開発入門ワークショップの参加で50ポイント獲得しました",
    timestamp: "2024-01-19T14:30:00Z",
    read: false,
  },
  {
    id: 3,
    type: "friend_activity",
    title: "フレンドの活動",
    message: "佐藤花子さんが新しいイベントに参加しました",
    timestamp: "2024-01-18T16:45:00Z",
    read: true,
  },
]

interface SidebarProps {
  onLogout?: () => void
}

export function Sidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [notifications, setNotifications] = useState(mockNotifications)

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    } else {
      router.push("/")
    }
  }

  const markAsRead = (notificationId: number) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === notificationId ? { ...notification, read: true } : notification)),
    )
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "event_reminder":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "points_earned":
        return <Star className="w-4 h-4 text-yellow-500" />
      case "friend_activity":
        return <Users className="w-4 h-4 text-green-500" />
      default:
        return <Bell className="w-4 h-4 text-gray-500" />
    }
  }

  const navigationItems = [
    { href: "/dashboard", icon: Home, label: "ダッシュボード" },
    { href: "/events", icon: Calendar, label: "イベント" },
    { href: "/friends", icon: Users, label: "フレンド" },
    { href: "/create-event", icon: Plus, label: "イベント作成" },
    { href: "/rewards", icon: Star, label: "ポイント・スタンプ" },
    { href: "/profile", icon: User, label: "プロフィール" },
    { href: "/settings", icon: Settings, label: "設定" },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* ロゴ */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Fanlogue
          </span>
        </div>
      </div>

      {/* ユーザー情報 */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
              <AvatarFallback>{mockUser.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold text-gray-800 dark:text-gray-200">{mockUser.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{mockUser.points.toLocaleString()} ポイント</p>
            </div>
          </div>

          {/* 通知ドロップダウン */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-3 border-b">
                <h3 className="font-semibold">通知</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="p-3 cursor-pointer"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3 w-full">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium ${notification.read ? "text-gray-600 dark:text-gray-400" : "text-gray-800 dark:text-gray-200"}`}
                        >
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                          {new Date(notification.timestamp).toLocaleString("ja-JP")}
                        </p>
                      </div>
                      {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>}
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* ナビゲーション */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* ログアウト */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          ログアウト
        </Button>
      </div>
    </div>
  )
}
