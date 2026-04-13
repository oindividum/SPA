import { MessagesApi, Configuration } from '../api';
import { DownloadApi } from '../api/apis/DownloadApi';
import type { Post } from '../types/Post';

// Возвращаем использование относительных путей, чтобы работал прокси Vite
// Это решит проблему CORS, так как браузер будет думать, что общается с одним и тем же хостом
const BASE_URL = ''; 

const apiConfig = new Configuration({ basePath: BASE_URL });
const messagesApi = new MessagesApi(apiConfig);
const downloadApi = new DownloadApi(apiConfig);

/**
 * Получить список всех активных fiddId (инстансов)
 */
export async function getActiveFiddIds(): Promise<string[]> {
  try {
    const ids = await messagesApi.getFiddIds();
    return ids;
  } catch {
    return [];
  }
}

/**
 * Получить посты для конкретного fiddId
 */
export async function getPostsForFidd(fiddId: string, count: number = 10): Promise<Post[]> {
  try {
    // 1. Получить номера сообщений
    const messageNumbers = await messagesApi.getMessageNumbersTail({ fiddId, count });
    const posts: Post[] = [];

    for (const messageNumber of messageNumbers) {
      try {
        // 2. Получить список файлов (чтобы проверить наличие config.json)
        const logicalFiles = await messagesApi.getLogicalFileInfos({ fiddId, messageNumber });
        
        const configFile = logicalFiles.find(f => {
          const path = f.metadata?.filePath?.toLowerCase();
          return path === 'config.json' || path === '/config.json';
        });

        if (!configFile) {
          continue;
        }

        const configPath = configFile.metadata?.filePath || 'config.json';
        // 3. Загрузить и распарсить config.json
        const configBlob = await downloadApi.readLogicalFile({
          fiddId,
          messageNumber,
          logicalFilePath: configPath
        });
        const configText = await configBlob.text();
        const postConfig = JSON.parse(configText);

        // 4. Получить метаданные сообщения (для автора и даты)
        const metadata = await messagesApi.getFiddFileMetadata({ fiddId, messageNumber });

        // Находим реальный путь к файлу поста в списке логических файлов (без учета регистра)
        const actualPostFile = logicalFiles.find(f => 
          f.metadata?.filePath?.toLowerCase() === postConfig.post.toLowerCase()
        );
        const postFilePath = actualPostFile?.metadata?.filePath || postConfig.post;
        
        // 5. Скачать основной контент
        const contentBlob = await downloadApi.readLogicalFile({
          fiddId,
          messageNumber,
          logicalFilePath: postFilePath
        });
        const content = await contentBlob.text();

        const createdAtDate = metadata.messageCreationTime
          ? new Date(metadata.messageCreationTime).toLocaleDateString('ru-RU')
          : 'unknown';

        const author = metadata.authorsPublicKey
          ? metadata.authorsPublicKey.slice(0, 8) + '...'
          : 'unknown';

        let summaryText = '';
        if (postConfig.preview) {
          const actualPreviewFile = logicalFiles.find(f =>
            f.metadata?.filePath?.toLowerCase() === postConfig.preview.toLowerCase()
          );
          const previewPath = actualPreviewFile?.metadata?.filePath || postConfig.preview;
          summaryText = await (await downloadApi.readLogicalFile({ fiddId, messageNumber, logicalFilePath: previewPath })).text();
        } else if (postConfig.description) {
          summaryText = postConfig.description;
        } else {
          // Очищаем Markdown-разметку для аккуратного отображения (без символов вроде #, *, ссылок)
          const cleanContent = content
            .replace(/[#*`_>]/g, '')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/\n+/g, ' ')
            .trim();
          summaryText = cleanContent.slice(0, 200) + (cleanContent.length > 200 ? '...' : '');
        }
        
        let coverPath = postConfig.image || postConfig.cover;
        if (!coverPath) {
          const imageFile = logicalFiles.find(f => {
            const p = f.metadata?.filePath?.toLowerCase() || '';
            return p.endsWith('.png') || p.endsWith('.jpg') || p.endsWith('.jpeg') || p.endsWith('.webp');
          });
          if (imageFile) {
            coverPath = imageFile.metadata?.filePath;
          }
        }
        
        let imageUrl = undefined;
        if (coverPath) {
          imageUrl = `/${fiddId}/${messageNumber}/${encodeURIComponent(coverPath)}`;
        }

        posts.push({
          id: `${fiddId}_${messageNumber}`,
          title: postConfig.title,
          author,
          content,
          summary: summaryText || 'Здесь пока нет текста...', 
          createdAt: createdAtDate,
          tags: postConfig.tags || [],
          views: 0,
          imageUrl
        });
      } catch {
        continue;
      }
    }
    return posts;
  } catch {
    return [];
  }
}

/**
 * Агрегировать посты со всех активных инстансов
 */
export async function getAllPosts(countPerFidd: number = 10): Promise<Post[]> {
  try {
    const fiddIds = await getActiveFiddIds();
    const allPostsPromises = fiddIds.map(id => getPostsForFidd(id, countPerFidd));
    const results = await Promise.all(allPostsPromises);
    
    // Объединяем все массивы в один и сортируем (например, по ID или дате)
    // Сейчас просто объединяем
    return results.flat();
  } catch {
    throw e;
  }
}
