# API詳細定義書設計書

## 1. 概要
本設計書は、Fanlogueサービスが提供する各APIエンドポイントの詳細な仕様を定義するものである。  
リクエスト・レスポンスのデータ構造、HTTPステータスコード、エラーハンドリング、認証・認可の仕組み、および外部システム連携の具体的なインターフェースを明確にする。

## 2. 一般的なAPI仕様

### 2.1. 認証・認可
FanlogueのAPIは、主にJWT (JSON Web Token) ベースの認証メカニズムを使用する。

* **認証フロー:**
  - ユーザーが`/auth/login`または`/auth/social/login`エンドポイントに認証情報を送信する。
  - サーバーは認証成功後、アクセストークン（短寿命）とリフレッシュトークン（長寿命）を発行する。
  - クライアントはアクセストークンをHTTPリクエストのAuthorizationヘッダーにBearerスキームで含めて送信する。  
  例: `Authorization: Bearer <access_token>`
  - アクセストークンの有効期限が切れた場合、クライアントはリフレッシュトークンを使用して`/auth/refresh-token`エンドポイントで新しいアクセストークンを取得する。

* **認可:**
  * 各APIエンドポイントには、アクセスに必要なロール（例: ユーザー, 運営者, アーティスト）が定義される。
  * 認証トークンに含まれるユーザーのロールに基づき、APIへのアクセスが許可または拒否される。

---

### 2.2. 共通リクエストヘッダー

| ヘッダー名 | 必須/任意 | 説明 | 例 |
| -- | -- | -- | -- |
| Authorization | 必須 | 認証トークン (Bearer `<access_token>`) | `Bearer eyJ...` |
| Content-Type | 必須 | リクエストボディのメディアタイプ | `application/json` |
| Accept-Language | 任意 | クライアントが受け入れ可能な言語 | `ja-JP, ja;q=0.9, en;q=0.8` |
| X-Request-ID | 任意 | リクエストを一意に識別するID (トレース用) | `a1b2c3d4-e5f6-7890-1234-567890abcdef` |

---

### 2.3. 共通レスポンスヘッダー

| ヘッダー名 | 説明 | 例 |
| -- | -- | -- |
| Content-Type | レスポンスボディのメディアタイプ | `application/json` |
| X-Request-ID | リクエストを一意に識別するID (リクエストヘッダーが指定された場合) | `a1b2c3d4-e5f6-7890-1234-567890abcdef` |
| Cache-Control | キャッシュ制御指示 | `no-cache, no-store, must-revalidate` |

---

### 2.4. 標準エラーレスポンス

* APIリクエストが失敗した場合、以下の形式でエラーレスポンスが返される。
* **HTTPステータスコード:**
* エラーの種類を示す標準的なHTTPステータスコード。
* **レスポンスボディ:**
  * JSON形式でエラーの詳細情報を含む。

    \`\`\`json
    {
        "code": "ERROR_CODE",
        "message": "エラーメッセージ",
        "details": [
            {
            "field": "フィールド名 (バリデーションエラーの場合)",
            "description": "詳細なエラー説明"
            }
        ]
    }
    \`\`\`

| HTTPステータスコード | エラーコード | 例 | 説明 |
| -- | -- | -- | -- |
| 400 Bad Request | INVALID\_INPUT | リクエストの形式が不正、またはバリデーションエラー |  |
| 401 Unauthorized | UNAUTHORIZED | 認証情報がない、または無効 |  |
| 403 Forbidden | FORBIDDEN | 認証済みだが、リソースへのアクセス権限がない |  |
| 404 Not Found | NOT\_FOUND | 指定されたリソースが見つからない |  |
| 409 Conflict | DUPLICATE\_RESOURCE | リソースの重複など、競合が発生 |  |
| 500 Internal Server Error | INTERNAL\_SERVER\_ERROR | サーバー内部で予期せぬエラーが発生 |  |

## 3. API詳細定義

### 3.1. 認証・認可関連API

#### 3.1.1. POST /auth/register
新規ユーザーを登録する。
  * **概要:** メールアドレスとパスワード、またはソーシャルアカウント情報を使用して新規ユーザーを登録する。  
  * **認証:** 不要  
  * **認可:** 不要  

* **リクエスト:**  
  * ヘッダー:  
    `Content-Type: application/json`  
  * ボディ:  
    \`\`\`json
    {
        "username": "ユーザー名",
        "email": "user@example.com",
        "password": "secure_password_123",
        "social_provider": "Google",  // オプション: ソーシャルログインの場合
        "social_user_id": "google_user_id_123"  // オプション: ソーシャルログインの場合
    }
    \`\`\`
* レスポンス:
    * 201 Created: 登録成功
        \`\`\`json
        {
            "user_id": "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
            "username": "ユーザー名",
            "email": "user@example.com",
            "access_token": "eyJ...",
            "refresh_token": "eyJ..."
        }
        \`\`\`
    * `400 Bad Request`: バリデーションエラー、または必須項目不足
    * `409 Conflict`: メールアドレスが既に登録済み

#### 3.1.2. POST /auth/login
ユーザー認証を行い、認証トークンを発行する。

* **概要:** ユーザーのメールアドレスとパスワードを検証し、アクセストークンとリフレッシュトークンを発行する。  
* **認証:** 不要  
* **認可:** 不要  
* **リクエスト:**  
  * ヘッダー:
    `Content-Type: application/json`  
  * ボディ:  
    \`\`\`json
    {
        "email": "user@example.com",
        "password": "secure_password_123"
    }
    \`\`\`
* レスポンス
  * 200 OK: 認証成功
    \`\`\`json
    {
        "user_id": "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
        "username": "ユーザー名",
        "email": "user@example.com",
        "access_token": "eyJ...",
        "refresh_token": "eyJ..."
    }
    \`\`\`
  * `401 Unauthorized`: 認証情報が無効

### 3.2. ユーザー関連API

#### 3.2.1. GET /users/me
認証済みユーザーのプロフィール情報を取得する。

* **概要:** 認証済みのユーザー自身の詳細なプロフィール情報を取得する。  
* **認証:** 要  
* **認可:** ユーザー
* **リクエスト:**  
  * ヘッダー:
  `Authorization: Bearer <access_token>`
  * ボディ: - 

* **レスポンス:**  
  * `200 OK`: プロフィール情報取得成功  
    \`\`\`json
    {
        "user_id": "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
        "username": "ユーザー名",
        "email": "user@example.com",
        "current_points": 150,
        "social_provider": "Google",
        "social_user_id": "google_user_id_123",
        "created_at": "2023-01-01T10:00:00Z",
        "updated_at": "2023-05-20T15:30:00Z",
        "last_login_at": "2023-05-24T17:00:00Z"
    }
    \`\`\`
  * `401 Unauthorized`: 認証情報がない、または無効

#### 3.2.2. PUT /users/me  
認証済みユーザーのプロフィール情報を更新する。
* **概要:**  
  認証済みのユーザー自身のプロフィール情報を更新する。`username` や `email` などを変更できる。  
* **認証:** 要  
* **認可:** ユーザー  

* **リクエスト:**
  * ヘッダー:  
    `Authorization: Bearer <access_token>`  
    `Content-Type: application/json`  

  * ボディ:（更新したい項目のみ含める）  
    \`\`\`json
    {
        "username": "新しいユーザー名",
        "email": "new_email@example.com"
    }
    \`\`\`

* レスポンス:
  * `200 OK`: 更新成功
    \`\`\` json
    {
        "user_id": "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
        "username": "新しいユーザー名",
        "email": "new_email@example.com",
        "current_points": 150,
        "social_provider": "Google",
        "social_user_id": "google_user_id_123",
        "created_at": "2023-01-01T10:00:00Z",
        "updated_at": "2023-05-24T17:30:00Z",
        "last_login_at": "2023-05-24T17:00:00Z"
    }
    \`\`\`
  * `400 Bad Request`: バリデーションエラー
  * `401 Unauthorized`: 認証情報がない、または無効
  * `409 Conflict`: 指定されたメールアドレスが既に他のユーザーによって使用されている

### 3.3. アーティスト関連API

#### 3.3.1. GET /artists  
アーティストの一覧を取得する。

* **概要:** システムに登録されているアーティストの一覧を取得する。検索、フィルタリング、ページネーションが可能。
* **認証:** 不要  
* **認可:** 不要

* **リクエスト:**  
  * クエリパラメータ:  
    * `page`: ページ番号（デフォルト: 1）  
    * `limit`: 1ページあたりの件数（デフォルト: 10, 最大: 100）  
    * `search_query`: アーティスト名で部分一致検索  
  * サンプル呼び出し:
    * 最初の10件のアーティストを取得:
      * GET /artists
    * 2ページ目のアーティストを20件取得:
      * GET /artists?`page`=2&`limit`=20
    * "バンド"を含むアーティストを検索:
      * GET /artists?`search_query`=バンド
* **レスポンス:**
  * `200 OK`: アーティスト一覧取得成功  
    \`\`\`json
    {
        "total_count": 50,
        "page": 1,
        "limit": 10,
        "artists": [
            {
            "artist_id": "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
            "artist_name": "バンドA",
            "description": "ロックバンド",
            "profile_image_url": "https://example.com/artist_a.jpg"
            },
            {
            "artist_id": "yyyyyyyy-yyyy-4yyy-yzzz-yyyyyyyy",
            "artist_name": "シンガーB",
            "description": "ソロアーティスト",
            "profile_image_url": "https://example.com/artist_b.jpg"
            }
        ]
    }
    \`\`\`

#### 3.3.2. POST /artists/{artist_id}/follow  
特定アーティストをフォローする。

* **概要:**  認証済みユーザーが指定されたアーティストをフォローする。
* **認証:** 要
* **認可:** ユーザー

* **リクエスト:**
  * パスパラメータ:  
    * `artist_id`: フォローするアーティストのUUID  
  * ヘッダー:
    * `Authorization: Bearer <access_token>`  
  * ボディ: - 

* **レスポンス:**  
  * `200 OK`: フォロー成功（既にフォローしている場合もこのステータス）  
    \`\`\`json
    {
    "message": "アーティストをフォローしました。",
    "artist_follow_id": "zzzzzzzz-zzzz-4zzz-yzzz-zzzzzzzz"
    }
    \`\`\`
  * `401 Unauthorized`: 認証情報がない、または無効
  * `404 Not Found`: 指定されたアーティストが見つからない
  * `409 Conflict`: 既にフォロー済み


### 3.4. イベント関連API

#### 3.4.1. GET /events  
イベントの一覧を取得する。

* **概要:**  
  システムに登録されているイベントの一覧を取得する。検索、フィルタリング、ページネーションが可能。
* **認証:** 不要  
* **認可:** 不要  

* **リクエスト:**  
  * クエリパラメータ:
    - `page`: ページ番号 (デフォルト: 1)
    - `limit`: 1ページあたりの件数 (デフォルト: 10, 最大: 100)
    - `search_query`: イベント名または説明で部分一致検索
    - `artist_id`: 特定アーティストのイベントにフィルタリング
    - `tag_id`: 特定タグを持つイベントにフィルタリング
    - `start_date_from`: イベント開始日時 (YYYY-MM-DD)
    - `start_date_to`: イベント開始日時 (YYYY-MM-DD)
    - `status`: イベントステータス (`scheduled`, `active`, `completed`, `cancelled`)

  * サンプル呼び出し:
    * 2024年7月15日以降に開催されるイベントを検索:
      * GET /events?`start_date_from`=2024-07-15
    * 特定のアーティスト（ID: aaaaaaaa-aaaa-4aaa-yxxx-aaaaaaaaa）のイベントを検索:
      * GET /events?`artist_id`=aaaaaaaa-aaaa-4aaa-yxxx-aaaaaaaaa
    * "ライブ"というキーワードと"ロック"タグを含むイベントを検索 (複数タグは別途考慮が必要な場合あり):
      * GET /events?`search_query`=ライブ&`tag_id`=xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxx (タグIDは仮)

* **レスポンス:**  
  *  `200 OK`: イベント一覧取得成功
        \`\`\`json
        {
            "total_count": 120,
            "page": 1,
            "limit": 10,
            "events": [
                {
                "event_id": "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxx",
                "artist_id": "aaaaaaaa-aaaa-4aaa-yxxx-aaaaaaaaa",
                "event_name": "バンドA ライブ2024",
                "description": "夏のスペシャルライブ",
                "start_datetime": "2024-07-15T19:00:00Z",
                "end_datetime": "2024-07-15T21:00:00Z",
                "location": "渋谷ライブハウス",
                "ticket_url": "https://ticket.example.com/band_a_live",
                "event_image_url": "https://example.com/event_band_a.jpg",
                "status": "scheduled",
                "tags": ["ロック", "ライブ"]
                },
                {
                "event_id": "yyyyyyyy-yyyy-4yyy-yzzz-yyyyyyyyy",
                "artist_id": "bbbbbbbb-bbbb-4bbb-yxxx-bbbbbbbbb",
                "event_name": "シンガーB ファンミーティング",
                "description": "限定ファンイベント",
                "start_datetime": "2024-08-01T14:00:00Z",
                "end_datetime": "2024-08-01T16:00:00Z",
                "location": "都内某所",
                "ticket_url": null,
                "event_image_url": "https://example.com/event_singer_b.jpg",
                "status": "scheduled",
                "tags": ["ファンイベント"]
                }
            ]
        }
        \`\`\`
  * `400 Bad Request`: バリデーションエラー、または不正な参加方法
  * `401 Unauthorized`: 認証情報がない、または無効
  * `403 Forbidden`: 既にこのイベントへの参加を記録済み、または参加検証に失敗
  * `404 Not Found`: 指定されたイベントが見つからない

#### 3.4.2. POST /events/{event_id}/attend  
イベント参加を記録する。

- **概要:**  
  認証済みユーザーが指定されたイベントに参加したことを記録する。これによって報酬が付与される可能性がある。
- **認証:** 要  
- **認可:** ユーザー  

* **リクエスト:**  
    - **パスパラメータ:**  
    - `event_id`: 参加を記録するイベントのUUID  

    - **ヘッダー:**  
    - `Authorization: Bearer <access_token>`  
    - `Content-Type: application/json`  

    - **ボディ:**  
        \`\`\`json
        {
        "attendance_method": "qr_scan",
        "verification_data": "QRコードスキャンデータまたはチケット連携データ",
        "notes": "イベントがとても楽しかった！"
        }
        \`\`\`
* **レスポンス:**
  * `201 Created`: 参加記録成功、報酬付与情報を含む
    \`\`\`json
    {
        "event_attendance_id": "zzzzzzzz-zzzz-4zzz-yzzz-zzzzzzzzz",
        "user_id": "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxx",
        "event_id": "aaaaaaaa-aaaa-4aaa-yxxx-aaaaaaaaa",
        "attendance_timestamp": "2024-07-15T20:30:00Z",
        "attendance_method": "qr_scan",
        "verification_status": "verified",
        "notes": "イベントがとても楽しかった！",
        "awarded_rewards": [
            {
            "reward_id": "rrrrrrrr-rrrr-4rrr-yxxx-rrrrrrrrr",
            "reward_type": "stamp",
            "reward_name": "バンドAライブ参加スタンプ",
            "value": 1,
            "stamp_id": "ssssssss-ssss-4sss-yxxx-sssssssss",
            "stamp_image_url": "https://example.com/stamp_band_a.png"
            },
            {
            "reward_id": "pppppppp-pppp-4ppp-yxxx-ppppppppp",
            "reward_type": "point",
            "reward_name": "イベント参加ポイント",
            "value": 50,
            "point_history_id": "hhhhhhhh-hhhh-4hhh-yxxx-hhhhhhhhh",
            "current_points_after_change": 200
            }
        ]
    }
    \`\`\`
  * `400 Bad Request`: バリデーションエラー、または不正な参加方法
  * `401 Unauthorized`: 認証情報がない、または無効
  * `403 Forbidden`: 既にこのイベントへの参加を記録済み、または参加検証に失敗
  * `404 Not Found`: 指定されたイベントが見つからない



#### 3.5.1. GET /users/me/stamps  
認証済みユーザーが獲得したスタンプの一覧を取得する。

- **概要:**  
  認証済みユーザーがこれまでに獲得したスタンプのリストを、獲得日時順に取得する。
- **認証:** 要  
- **認可:** ユーザー  
* **リクエスト:**  
    - **ヘッダー:**  
        - `Authorization: Bearer <access_token>`  
    - **クエリパラメータ:**  
        - `page`: ページ番号（デフォルト: 1）  
        - `limit`: 1ページあたりの件数（デフォルト: 10、最大: 100）  
    * サンプル呼び出し:
      * 最初の5件のスタンプを取得:
        * GET /users/me/stamps?`limit`=5
      * 2ページ目のスタンプを取得:
        * GET /users/me/stamps?`page`=2

* **レスポンス:**  
    - `200 OK`: スタンプ一覧取得成功
        \`\`\`json
        {
        "total_count": 5,
        "page": 1,
        "limit": 10,
        "stamps": [
            {
                "stamp_id": "ssssssss-ssss-4sss-yxxx-ssssssssssss",
                "reward_id": "rrrrrrrr-rrrr-4rrr-yxxx-rrrrrrrrrrrr",
                "event_id": "aaaaaaaa-aaaa-4aaa-yxxx-aaaaaaaaaaaa",
                "event_name": "バンドA ライブ2024",
                "artist_name": "バンドA",
                "reward_name": "バンドAライブ参加スタンプ",
                "stamp_image_url": "https://example.com/stamp_band_a.png",
                "acquired_at": "2024-07-15T20:30:00Z",
                "unique_code": "STAMP-ABC-123"
            }
            // ... 他のスタンプ
        ]
        }
        \`\`\`
  * `401 Unauthorized` : 認証情報がない、または無効

### 3.6. 外部連携 API
Fanlogueは、外部システムからの情報受信や連携のために以下のAPIエンドポイントを提供する。これらのAPIは、外部システムからの特定の認証メカニズム（例: Webhook Secret, APIキー）によって保護される。

#### 3.6.1. GET/POST /integrations/ticket-platform/callback  
チケットプラットフォームからの連携コールバックを受け取る。

- **概要:**  
  外部のチケット販売プラットフォームから、チケット購入情報やイベント参加確認情報などのコールバックを受け取るためのエンドポイント。メソッドはプラットフォームの仕様に依存する（GET または POST）。
- **認証:** 特定の認証方式（例: 共有シークレット、IPホワイトリスト、カスタムヘッダー）  
- **認可:** なし（システム内部で検証）

* **リクエスト:**  
    - **ヘッダー:**  
        - `Content-Type`: プラットフォームの仕様に依存（例: `application/json`, `application/x-www-form-urlencoded`）

    - **ボディ:**  
        \`\`\`json
        {
            "ticket_id": "TKT-XYZ-789",
            "event_external_id": "EXT-EVT-456",
            "user_external_id": "EXT-USR-101",
            "status": "purchased", // or "attended"
            "timestamp": "2024-05-24T10:00:00Z",
            "signature": "webhook_signature_hash"
        }
        \`\`\`

* **レスポンス**:
  * `200 OK`: コールバック受信成功（通常、ボディは空または簡単な確認メッセージ）
    \`\`\`json
    {
        "message": "Callback received successfully."
    }
    \`\`\`
  * `401 Unauthorized`: 認証情報が無効
  * `400 Bad Request`: リクエスト形式が不正、または必須項目不足
  * `500 Internal Server Error`: 内部処理エラー



#### 3.6.2. POST /integrations/sns/webhook
SNSからのWebhookイベントを受け取る。
* **概要:** X (旧Twitter) やLINEなどのSNSプラットフォームから、特定のイベント（例: 新規投稿、メッセージ受信）に関するWebhook通知を受け取るためのエンドポイント。
* **認証:** 特定の認証 (例: Webhook Secret, 署名検証)
* **認可:** なし (システム内部で検証)

* **リクエスト:**
  * **ヘッダー:**
    - `Content-Type`: `application/json` (SNSプラットフォームに依存)
  * **ボディ:** SNSプラットフォームのWebhookペイロードに依存。
    \`\`\`json
    例 (Xの場合):
    {
        "for_user_id": "twitter_user_id",
        "tweet_create_events": [
                {
                "id": 1234567890,
                "text": "アーティストAが新しいイベントを発表しました！ #Fanlogue",
                "user": {
                    "id": 987654321,
                    "name": "アーティストA公式",
                    "screen_name": "ArtistA_Official"
                },
                "created_at": "Fri May 24 17:00:00 +0000 2024"
                }
            ]
        }
        \`\`\`

* **レスポンス:**
  * `200 OK`: Webhook受信成功 (通常、ボディは空または簡単な確認メッセージ)
    \`\`\`json
    {
        "message": "Webhook received successfully."
    }
    \`\`\`
  * `401 Unauthorized`: 認証情報が無効 (署名検証失敗など)
  * `400 Bad Request`: リクエスト形式が不正
  * `500 Internal Server Error`: 内部処理エラー
