class Profile < ApplicationRecord
    enum gender: { male: 0, female: 1, other: 2 }
    belongs_to :user

    def age
        return '不明' unless birthday.present?
        years = Time.zone.now.year - birthday.year
        days = Time.zone.now.yday - birthday.yday

        if days < 0
            "#{years - 1}歳"
        else
            "#{years}歳"
        end
    end
end
