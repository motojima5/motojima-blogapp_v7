class Article < ApplicationRecord
    has_one_attached :eyecatch
    has_rich_text :content

    validates :title, presence: true
    validates :title, length: { minimum: 2, maximum: 100 }
    validates :title, format: { with: /\A(?!\@).*\z/ }

    validates :content, presence: true

    has_many :comments, dependent: :destroy
    has_many :likes, dependent: :destroy
    belongs_to :user
end
