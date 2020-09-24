# README

## usersテーブル
|Column|Type|Option|
|------|----|------|
|name|string|null: false, add_index: true|
|password|string|null: false|
|nickname|string|null: false|
|email|string|null: false, unique: true|

### Association
- has_many :messages
- has_many :groups_users
- has_many :groups, through: :groups_users

## messagesテーブル
|Column|Type|Option|
|------|----|------|
|body|string||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|nul: false, foreign_key: true|

### Association
- belogns_to :users
- belogns_to :groups

## groups_usersテーブル
|Column|Type|Option|
|------|----|------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|nul: false,foreign_key: true|

### Association
- belogns_to :users
- belogns_to :groups

## groupsテーブル
|Column|Type|Option|
|------|----|------|
|name|integer|null: false, unique: true|

### Association
- has_many :messages
- has_many :groups_users
- has_many :users, through: :groups_users
