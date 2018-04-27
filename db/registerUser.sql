insert into user_login_info (un, pw) 
values ($1, $2)
returning *;