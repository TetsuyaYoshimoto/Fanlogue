# データベース設計書

## 1. 概要

本設計書は、アーティストイベント管理SaaSサービス「Fanlogue」のデータベース構造を定義するものである。  
要件定義書に基づき、システム内で扱う主要なエンティティ（ユーザー、アーティスト、イベント、報酬、スタンプ、ポイントなど）とその関係性、および各テーブルの詳細なカラム情報を記述する。  
データベースには AWS Aurora Serverless v2 (PostgreSQL) を使用することを前提とする。

---

## 2. ER図（Entity-Relationship Diagram）設計書

### 2.1. エンティティと関係性の概要

本システムにおける主要なエンティティは以下の通り：

- **ユーザー (Users)**: Fanlogueサービスを利用する個人。  
- **アーティスト (Artists)**: ユーザーがフォローし、イベントを主催する対象。  
- **イベント (Events)**: アーティストが開催する、ユーザーが参加する対象。  
- **イベント参加記録 (EventAttendances)**: ユーザーがイベントに参加した事実を記録するもの。  
- **報酬 (Rewards)**: イベント参加等によってユーザーに付与されるスタンプやポイントの基盤となる情報。  
- **スタンプ (Stamps)**: イベント参加によって付与される報酬の一種。  
- **ポイント履歴 (PointHistories)**: ポイントの付与、消費の履歴。  
- **アーティストフォロー (ArtistFollows)**: ユーザーがアーティストをフォローする関係。  
- **イベントタグ (EventTags)**: イベントに付与されるカテゴリやジャンル。  
- **イベントタグ関連 (EventTagRelations)**: イベントとタグの多対多の関係を管理。

### 2.2. ER図

\`\`\`mermaid
erDiagram
    Users ||--o{ ArtistFollows : "follows"
    Users ||--o{ EventAttendances : "attends"
    Users ||--o{ PointHistories : "earns/spends"

    Artists ||--o{ ArtistFollows : "is_followed_by"
    Artists ||--o{ Events : "hosts"

    Events ||--o{ EventAttendances : "has_attendance"
    Events ||--o{ EventTagRelations : "has_tag"

    Rewards ||--o{ Stamps : "is_type_of"
    Rewards ||--o{ PointHistories : "is_type_of"

    Stamps }|--|| EventAttendances : "awarded_for"

    EventTags ||--o{ EventTagRelations : "is_related_to"
\`\`\`

## 3. テーブル定義書設計

本章では、Fanlogueサービスにおける各テーブルの構造（カラム名、データ型、主キー・外部キー制約など）を定義します。

---

### 3.1. `users` テーブル

ユーザー情報を格納するテーブル。

| カラム名           | 型        | 制約           | 説明                         |
|--------------------|-----------|----------------|------------------------------|
| user_id            | UUID      | PK             | ユーザーID                   |
| username           | String    |                | ユーザー名                   |
| email              | String    | UNIQUE         | メールアドレス               |
| password_hash      | String    |                | パスワード（ハッシュ）       |
| created_at         | Timestamp |                | 登録日時                     |
| updated_at         | Timestamp |                | 更新日時                     |
| last_login_at      | Timestamp |                | 最終ログイン日時             |
| current_points     | Int       |                | 現在の所持ポイント           |
| social_provider    | String    |                | ソーシャルログインプロバイダ |
| social_user_id     | String    |                | ソーシャルユーザーID         |

---

### 3.2. `artists` テーブル

アーティスト情報を格納するテーブル。

| カラム名              | 型        | 制約     | 説明                       |
|-----------------------|-----------|----------|----------------------------|
| artist_id             | UUID      | PK       | アーティストID             |
| artist_name           | String    | UNIQUE   | アーティスト名             |
| description           | Text      |          | アーティスト紹介文         |
| official_website_url  | String    |          | 公式サイトURL              |
| sns_links             | String    |          | SNSリンク（複数可）        |
| profile_image_url     | String    |          | プロフィール画像URL        |
| created_at            | Timestamp |          | 登録日時                   |
| updated_at            | Timestamp |          | 更新日時                   |

---

### 3.3. `events` テーブル

イベント情報を格納するテーブル。

| カラム名         | 型        | 制約 | 説明                   |
|------------------|-----------|------|------------------------|
| event_id         | UUID      | PK   | イベントID             |
| artist_id        | UUID      | FK   | 開催アーティストID     |
| event_name       | String    |      | イベント名             |
| description      | Text      |      | イベント説明           |
| start_datetime   | Timestamp |      | 開始日時               |
| end_datetime     | Timestamp |      | 終了日時               |
| location         | String    |      | 開催場所               |
| ticket_url       | String    |      | チケットURL            |
| event_image_url  | String    |      | イベント画像URL        |
| status           | String    |      | ステータス（予定・終了等） |
| created_at       | Timestamp |      | 登録日時               |
| updated_at       | Timestamp |      | 更新日時               |

---

### 3.4. `event_attendances` テーブル

ユーザーのイベント参加情報を記録するテーブル。

| カラム名              | 型        | 制約 | 説明                 |
|-----------------------|-----------|------|----------------------|
| event_attendance_id   | UUID      | PK   | 参加記録ID           |
| user_id               | UUID      | FK   | 参加ユーザーID       |
| event_id              | UUID      | FK   | 参加イベントID       |
| attendance_timestamp  | Timestamp |      | 参加日時             |
| attendance_method     | String    |      | 参加方法             |
| verification_status   | String    |      | 確認ステータス       |
| notes                 | Text      |      | メモ                 |
| created_at            | Timestamp |      | 登録日時             |
| updated_at            | Timestamp |      | 更新日時             |

---

### 3.5. `artist_follows` テーブル

ユーザーによるアーティストのフォロー情報を格納するテーブル。

| カラム名          | 型        | 制約 | 説明                 |
|-------------------|-----------|------|----------------------|
| artist_follow_id  | UUID      | PK   | フォローID           |
| user_id           | UUID      | FK   | フォローユーザーID   |
| artist_id         | UUID      | FK   | フォロー対象アーティストID |
| followed_at       | Timestamp |      | フォロー日時         |

---

### 3.6. `rewards` テーブル

スタンプ・ポイント報酬の定義テーブル。

| カラム名      | 型                     | 制約   | 説明                 |
|---------------|------------------------|--------|----------------------|
| reward_id     | UUID                   | PK     | 報酬ID               |
| reward_type   | ENUM("stamp", "point") |        | 報酬種別             |
| reward_name   | String                 |        | 報酬名               |
| description   | Text                   |        | 説明                 |
| value         | Int                    |        | 付与ポイントまたは数量 |
| created_at    | Timestamp              |        | 登録日時             |
| updated_at    | Timestamp              |        | 更新日時             |

---

### 3.7. `stamps` テーブル

スタンプ報酬の付与履歴テーブル。

| カラム名            | 型        | 制約   | 説明                   |
|---------------------|-----------|--------|------------------------|
| stamp_id            | UUID      | PK     | スタンプID             |
| reward_id           | UUID      | FK     | 紐づく報酬ID           |
| user_id             | UUID      | FK     | 付与対象ユーザーID     |
| event_attendance_id | UUID      | FK     | 関連する参加記録ID     |
| acquired_at         | Timestamp |        | 取得日時               |
| stamp_image_url     | String    |        | スタンプ画像URL        |
| unique_code         | String    | UNIQUE | スタンプの一意コード   |

---

### 3.8. `point_histories` テーブル

ポイントの付与・消費履歴を管理するテーブル。

| カラム名                    | 型        | 制約 | 説明                         |
|-----------------------------|-----------|------|------------------------------|
| point_history_id            | UUID      | PK   | 履歴ID                       |
| reward_id                   | UUID      | FK   | 元となる報酬ID               |
| user_id                     | UUID      | FK   | 対象ユーザーID               |
| event_attendance_id         | UUID?     | FK   | 関連するイベント参加ID（任意）|
| points_change               | Int       |      | 増減ポイント数               |
| change_reason               | String    |      | 変更理由                     |
| recorded_at                 | Timestamp |      | 記録日時                     |
| current_points_after_change | Int       |      | 変更後の保有ポイント         |

---

### 3.9. `event_tags` テーブル

イベントにタグを付与するためのマスターテーブル。

| カラム名   | 型     | 制約   | 説明         |
|------------|--------|--------|--------------|
| tag_id     | UUID   | PK     | タグID       |
| tag_name   | String | UNIQUE | タグ名       |

---

### 3.10. `event_tag_relations` テーブル

イベントとタグの関連（多対多）を管理するテーブル。

| カラム名             | 型   | 制約 | 説明               |
|----------------------|------|------|--------------------|
| event_tag_relation_id| UUID | PK   | 関係ID             |
| event_id             | UUID | FK   | イベントID         |
| tag_id               | UUID | FK   | タグID             |
