export const likePost = (postId: string) => {
  return new Promise<{ data: number }>(resolve =>
    setTimeout(() => resolve({ data: 100 }), 1000),
  )
}