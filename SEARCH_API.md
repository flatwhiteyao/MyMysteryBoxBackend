# 盲盒搜索API文档

## 搜索盲盒

### 接口地址
`GET /blind-box/search`

### 请求参数
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| keyword | string | 否 | 搜索关键词，支持模糊搜索 |

### 请求示例

#### 1. 搜索包含特定关键词的盲盒
```bash
GET /blind-box/search?keyword=测试
```

#### 2. 搜索空关键词（返回所有盲盒）
```bash
GET /blind-box/search?keyword=
```

#### 3. 不传关键词参数（返回所有盲盒）
```bash
GET /blind-box/search
```

### 响应格式

#### 成功响应
```json
{
  "success": true,
  "blindBoxes": [
    {
      "id": 1,
      "name": "测试盲盒",
      "description": "这是一个测试盲盒",
      "price": 99.99,
      "photo": "uploads/1234567890.jpg"
    }
  ],
  "keyword": "测试",
  "count": 1,
  "message": "找到 1 个匹配的盲盒"
}
```

#### 无匹配结果
```json
{
  "success": true,
  "blindBoxes": [],
  "keyword": "不存在的关键词",
  "count": 0,
  "message": "未找到匹配的盲盒"
}
```

#### 错误响应
```json
{
  "success": false,
  "message": "搜索失败，请重试"
}
```

### 搜索规则
- 支持对盲盒名称（name）和描述（description）进行模糊搜索
- 搜索不区分大小写
- 使用SQL的LIKE操作符进行匹配
- 结果按ID降序排列（最新的在前）

### 前端使用示例

#### JavaScript/TypeScript
```javascript
// 搜索盲盒
async function searchBlindBoxes(keyword) {
  try {
    const response = await fetch(`/blind-box/search?keyword=${encodeURIComponent(keyword)}`);
    const data = await response.json();
    
    if (data.success) {
      console.log(`找到 ${data.count} 个盲盒:`, data.blindBoxes);
      return data.blindBoxes;
    } else {
      console.error('搜索失败:', data.message);
      return [];
    }
  } catch (error) {
    console.error('请求失败:', error);
    return [];
  }
}

// 使用示例
searchBlindBoxes('测试'); // 搜索包含"测试"的盲盒
searchBlindBoxes(''); // 获取所有盲盒
```

#### HTML表单示例
```html
<form onsubmit="handleSearch(event)">
  <input type="text" id="searchKeyword" placeholder="输入搜索关键词...">
  <button type="submit">搜索</button>
</form>

<script>
function handleSearch(event) {
  event.preventDefault();
  const keyword = document.getElementById('searchKeyword').value;
  searchBlindBoxes(keyword);
}
</script>
```

### 注意事项
1. 搜索功能支持中英文关键词
2. 空关键词或未传关键词参数时会返回所有盲盒
3. 搜索结果包含完整的盲盒信息，包括ID、名称、描述、价格和照片路径
4. 照片路径是相对于public目录的路径，需要拼接完整的URL来显示图片 