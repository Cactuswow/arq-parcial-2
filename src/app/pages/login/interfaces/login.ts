export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar: string
}

export interface RawUser {
  id: number
  email: string
  // biome-ignore lint/style/useNamingConvention: <explanation>
  first_name: string
  // biome-ignore lint/style/useNamingConvention: <explanation>
  last_name: string
  avatar: string
}
