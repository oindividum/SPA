export interface FileNode {
  name: string;
  path: string;
  isDirectory: boolean;
  depth: number;
}

export function buildFlatTree(filePaths: string[]): FileNode[] {
  const rootNodes: any[] = [];
  
  for (const filePath of filePaths) {
    const parts = filePath.split('/');
    let currentLevel = rootNodes;
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (!part) continue;
        const isLast = i === parts.length - 1;
        let existingNode = currentLevel.find(n => n.name === part);
        if (!existingNode) {
            existingNode = {
                name: part,
                path: filePath,
                isDirectory: !isLast,
                children: []
            };
            currentLevel.push(existingNode);
        }
        currentLevel = existingNode.children;
    }
  }

  const result: FileNode[] = [];
  function traverse(nodes: any[], depth: number) {
     for (const node of nodes) {
         result.push({
             name: node.name,
             path: node.path,
             isDirectory: node.isDirectory,
             depth
         });
         traverse(node.children, depth + 1);
     }
  }
  traverse(rootNodes, 0);
  return result;
}
