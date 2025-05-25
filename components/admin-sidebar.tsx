"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, BarChart3, Users, Calendar, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

interface AdminSidebarProps {
  onLogout?: () => void
}

export function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    } else {
      router.push("/")
    }
  }

  const navigationItems = [
    { href: "/admin", icon: BarChart3, label: "ダッシュボード" },
    { href: "/admin/users", icon: Users, label: "一般ユーザー管理" },
    { href: "/admin/business-users", icon: Users, label: "ビジネスユーザー管理" },
    { href: "/admin/organizers", icon: Users, label: "主催者管理" },
    { href: "/admin/events", icon: Calendar, label: "イベント管理" },
    { href: "/admin/settings", icon: Settings, label: "システム設定" },
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
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">管理者パネル</p>
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
