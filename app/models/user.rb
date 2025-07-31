class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :articles, dependent: :destroy
  has_one :profile, dependent: :destroy

  def has_written?(article)
    articles.exists?(id: article.id)
  end

  def display_name
    self.email.split('@').first
  end

  def prepare_profile
    profile || build_profile
  end
end
