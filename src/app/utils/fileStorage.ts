const STORAGE_KEY = "entrelink_users"

export function saveUser(user: any) {
  const users = getAllUsers()
  users[user.id] = user
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

export function getUser(id: string) {
  const users = getAllUsers()
  return users[id] || null
}

export function updateUser(id: string, data: any) {
  const user = getUser(id)
  if (user) {
    const updatedUser = { ...user, ...data }
    saveUser(updatedUser)
    return updatedUser
  }
  return null
}

function getAllUsers(): Record<string, any> {
  const usersJson = localStorage.getItem(STORAGE_KEY)
  return usersJson ? JSON.parse(usersJson) : {}
}

