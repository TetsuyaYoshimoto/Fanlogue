"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Heart, Users, Music, ArrowLeft, MapPin, Calendar, ExternalLink } from "lucide-react"
import Link from "next/link"

// モックデータ
const mockArtists = [
  {
    id: 1,
    name: "BAND A",
    description: "エネルギッシュなロックバンド。全国ツアー開催中！",
    genre: "ロック",
    followers: 15420,
    upcomingEvents: 3,
    image: "/placeholder.svg?height=120&width=120",
    isFollowing: true,
    location: "東京",
    tags: ["ロック", "ライブ", "ツアー"],
  },
  {
    id: 2,
    name: "Singer B",
    description: "心に響くバラードを歌うソロアーティスト",
    genre: "ポップ",
    followers: 8750,
    upcomingEvents: 1,
    image: "/placeholder.svg?height=120&width=120",
    isFollowing: false,
    location: "大阪",
    tags: ["ポップ", "バラード", "ソロ"],
  },
  {
    id: 3,
    name: "DJ COSMIC",
    description: "宇宙をテーマにしたエレクトロニックミュージック",
    genre: "エレクトロニック",
    followers: 22100,
    upcomingEvents: 5,
    image: "/placeholder.svg?height=120&width=120",
    isFollowing: true,
    location: "東京",
    tags: ["エレクトロニック", "DJ", "クラブ"],
  },
  {
    id: 4,
    name: "Acoustic Duo",
    description: "アコースティックギターとボーカルのデュオ",
    genre: "フォーク",
    followers: 5200,
    upcomingEvents: 2,
    image: "/placeholder.svg?height=120&width=120",
    isFollowing: false,
    location: "京都",
    tags: ["アコースティック", "フォーク", "デュオ"],
  },
  {
    id: 5,
    name: "METAL STORM",
    description: "激しいメタルサウンドで魂を揺さぶる",
    genre: "メタル",
    followers: 18900,
    upcomingEvents: 4,
    image: "/placeholder.svg?height=120&width=120",
    isFollowing: true,
    location: "名古屋",
    tags: ["メタル", "ヘヴィ", "激しい"],
  },
  {
    id: 6,
    name: "Jazz Quartet",
    description: "クラシックジャズからモダンジャズまで",
    genre: "ジャズ",
    followers: 3400,
    upcomingEvents: 1,
    image: "/placeholder.svg?height=120&width=120",
    isFollowing: false,
    location: "横浜",
    tags: ["ジャズ", "クラシック", "モダン"],
  },
]

const genres = ["すべて", "ロック", "ポップ", "エレクトロニック", "フォーク", "メタル", "ジャズ"]

export default function ArtistsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("すべて")
  const [artists, setArtists] = useState(mockArtists)

  const handleFollow = (artistId: number) => {
    setArtists((prev) =>
      prev.map((artist) =>
        artist.id === artistId
          ? {
              ...artist,
              isFollowing: !artist.isFollowing,
              followers: artist.isFollowing ? artist.followers - 1 : artist.followers + 1,
            }
          : artist,
      ),
    )
  }

  const filteredArtists = artists.filter((artist) => {
    const matchesSearch =
      artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artist.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = selectedGenre === "すべて" || artist.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* ヘッダー */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  戻る
                </Button>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                アーティスト
              </h1>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Fanlogue
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* 検索・フィルター */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="アーティスト名で検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 border-0 bg-white dark:bg-gray-800 shadow-lg"
              />
            </div>
            <Button variant="outline" className="h-12 px-6">
              <Filter className="w-4 h-4 mr-2" />
              詳細フィルター
            </Button>
          </div>

          {/* ジャンルフィルター */}
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGenre(genre)}
                className={selectedGenre === genre ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white" : ""}
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>

        {/* 結果表示 */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">{filteredArtists.length}件のアーティストが見つかりました</p>
        </div>

        {/* アーティスト一覧 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtists.map((artist) => (
            <Card
              key={artist.id}
              className="group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800 overflow-hidden"
            >
              <CardContent className="p-0">
                {/* アーティスト画像エリア */}
                <div className="relative h-48 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                  <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                    <AvatarImage src={artist.image || "/placeholder.svg"} alt={artist.name} />
                    <AvatarFallback className="text-2xl font-bold">{artist.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  {/* フォローボタン */}
                  <Button
                    size="sm"
                    variant={artist.isFollowing ? "secondary" : "default"}
                    className={`absolute top-4 right-4 ${
                      artist.isFollowing
                        ? "bg-white text-gray-700 hover:bg-gray-100"
                        : "bg-white text-indigo-600 hover:bg-gray-100"
                    }`}
                    onClick={() => handleFollow(artist.id)}
                  >
                    <Heart className={`w-4 h-4 mr-1 ${artist.isFollowing ? "fill-current text-red-500" : ""}`} />
                    {artist.isFollowing ? "フォロー中" : "フォロー"}
                  </Button>
                </div>

                {/* アーティスト情報 */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-1">{artist.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{artist.description}</p>
                  </div>

                  {/* 統計情報 */}
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{artist.followers.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{artist.upcomingEvents}件のイベント</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{artist.location}</span>
                    </div>
                  </div>

                  {/* タグ */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {artist.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* アクションボタン */}
                  <div className="flex space-x-2">
                    <Link href={`/artists/${artist.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        詳細を見る
                      </Button>
                    </Link>
                    <Link href={`/artists/${artist.id}/events`}>
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 検索結果が空の場合 */}
        {filteredArtists.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              アーティストが見つかりませんでした
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">検索条件を変更してもう一度お試しください</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedGenre("すべて")
              }}
            >
              フィルターをリセット
            </Button>
          </div>
        )}

        {/* ページネーション */}
        {filteredArtists.length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              <Button variant="outline" disabled>
                前へ
              </Button>
              <Button variant="default" className="bg-gradient-to-r from-indigo-500 to-purple-600">
                1
              </Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">次へ</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
