class Article < ApplicationRecord
    validates :title, presence: true
    validates :title, length: { minimum: 2, maximum: 100 }
    validates :title, format: { with: /\A(?!\@).*\z/ }

    validates :content, presence: true
    validates :content, length: { minimum: 10 }
    validates :content, uniqueness: true

    validate :validate_title_and_content_length

    belongs_to :user

    def display_created_at
        I18n.l(self.created_at, format: :default)
    end

    def author_name
        user.display_name
    end

    private
    def validate_title_and_content_length
        char_count = self.title.length + self.content.length
        unless char_count > 100
            errors.add(:content, '100文字いじょうで！')
        end
    end
end
