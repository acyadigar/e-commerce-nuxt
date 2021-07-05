export default async ({ req, store }) => {
  if (process.server) {
    if (!req.headers.cookie) return
    const cookies = req.headers.cookie.split(';')
    const token = cookies.find((cookie) => cookie.startsWith('Token=')).slice(6)

    await store.dispatch('initAuth', token)
  }
}
