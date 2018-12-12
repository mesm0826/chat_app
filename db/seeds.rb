# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
i = 10 ** 4
j = 1
i.times do
  user = User.create(
    name: "TestUser" + j.to_s,
    email: "TestUser" + j.to_s + "@gmail.com",
    password: "password",
    image_name: nil
  )
  user.save!
  j = j + 1
  puts "#{j}人目"
end
