export const useClipboardData = () => {
  const getClipboardData = async () => {
    if (!navigator.clipboard) {
      alert('Clipboard API not supported')
      return
    }
    // 遍历粘贴板
    const clipboardItems = await navigator.clipboard.read()
    for (const clipboardItem of clipboardItems) {
      for (const type of clipboardItem.types) {
        // 获取图片类型数据
        if (type.includes('image')) {
          const blob = await clipboardItem.getType(type)
          return { blob, type: 'image' }
        }
        else if (type.includes('plain')) {
          // 获取文本类型数据
          const text = await navigator.clipboard.readText()
          return { text, type: 'text' }
        }
      }
    }
  }
  return {
    getClipboardData,
  }
}
