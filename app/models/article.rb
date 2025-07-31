class Article < ApplicationRecord
    validates :title, presence: true
    validates :title, length: { minimum: 2, maximum: 100 }

    validates :content, presence: true
    validates :content, length: { minimum: 10 }

    def display_created_at
        I18n.l(self.created_at, format: :default)
    end
end
