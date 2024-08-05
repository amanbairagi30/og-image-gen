export interface PostType {
    title: string,
    content: string,
    orgImageUrl: string,
    ogImage: string
}

export interface CardProps {
    postData: PostType,
    key: number
}
