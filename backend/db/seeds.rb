puts "We are busy prepairing your snacks. Please wait..."

3.times do | i |
    User.create(username: "user_#{i +1}", email: Faker::Internet.email, password: "Abzedar#{i+1}", avatar: Faker::Avatar.image())    
end

3.times do | i |
    Admin.create(username: "admin_#{i + 1}", email: Faker::Internet.email, password: "Abzedar#{i+1}", avatar: Faker::Avatar.image(), is_admin: true)    
end

3.times do | i |
    Snack.create(name: Faker::Food.dish, price: 100 * (i + 1), flavors: [Faker::Food.ingredient], image: Faker::Avatar.image(), admin_id: i + 1, subtotal: 0, quantity: 0, snack_type: "salty")    
end

3.times do | i |
    Snack.create(name: Faker::Food.dish, price: 100 * (i + 1), flavors: [Faker::Food.ingredient], image: Faker::Avatar.image(), admin_id: i + 1, subtotal: 0, quantity: 0, snack_type: "hot")    
end

3.times do | i |
    Snack.create(name: Faker::Food.dish, price: 100 * (i + 1), flavors: [Faker::Food.ingredient], image: Faker::Avatar.image(), admin_id: i + 1, subtotal: 0, quantity: 0, snack_type: "sweet")    
end

3.times do | i |
    Account.create(user_id: i + 1, amount: 500 * (i + 1))    
end

Order.create(quantity: 5, user_id: 2, snack_id: 1)


puts "Enjoy!"