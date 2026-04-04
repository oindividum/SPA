// определен интерфейс для пропсов для комнпонента POstCard
export interface Post {
    id: string;
    title: string;
    author: string;
    content: string; //полный текст поста который  будет использовать библеоеку react-mardown чтобы конвертировать текст в красивый html
    summary: string; // краткое описание для отображения в карточке
    createdAt: string;
    tags: string[];
    views: number;
    imageUrl?: string; // URL обложки поста
}

