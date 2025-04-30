
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const McpMethod = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "MCP配置已保存",
      description: "您的Claude协议设置已成功更新",
    });
  };

  return (
    <div className="container mx-auto p-6 animate-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">MCP服务配置</h1>
        <p className="text-muted-foreground">配置基于Claude公开协议的客户信息抓取参数</p>
      </div>

      <Tabs defaultValue="standard" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
          <TabsTrigger value="standard">标准协议</TabsTrigger>
          <TabsTrigger value="enhanced">增强协议</TabsTrigger>
          <TabsTrigger value="custom">自定义协议</TabsTrigger>
        </TabsList>

        <TabsContent value="standard">
          <Card>
            <CardHeader>
              <CardTitle>Claude标准协议配置</CardTitle>
              <CardDescription>配置标准Claude API参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="claude-api-key">API密钥</Label>
                  <Input
                    id="claude-api-key"
                    type="password"
                    placeholder="输入Claude API密钥"
                  />
                  <p className="text-xs text-muted-foreground">
                    在Anthropic控制台获取API密钥
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="claude-model">模型版本</Label>
                  <Select defaultValue="claude-3-opus-20240229">
                    <SelectTrigger id="claude-model">
                      <SelectValue placeholder="选择Claude模型版本" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="claude-3-opus-20240229">Claude 3 Opus</SelectItem>
                      <SelectItem value="claude-3-sonnet-20240229">Claude 3 Sonnet</SelectItem>
                      <SelectItem value="claude-3-haiku-20240307">Claude 3 Haiku</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">标准参数设置</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="claude-temperature">温度</Label>
                    <Input
                      id="claude-temperature"
                      type="number"
                      defaultValue={0.7}
                      min={0}
                      max={1}
                      step={0.1}
                    />
                    <p className="text-xs text-muted-foreground">
                      控制输出的随机性 (0-1)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="claude-max-tokens">最大令牌数</Label>
                    <Input
                      id="claude-max-tokens"
                      type="number"
                      defaultValue={4096}
                    />
                    <p className="text-xs text-muted-foreground">
                      回复的最大长度
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="claude-top-p">Top P</Label>
                    <Input
                      id="claude-top-p"
                      type="number"
                      defaultValue={0.9}
                      min={0}
                      max={1}
                      step={0.1}
                    />
                    <p className="text-xs text-muted-foreground">
                      控制输出的多样性
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="claude-system-prompt">系统提示词</Label>
                    <Textarea
                      id="claude-system-prompt"
                      className="h-40"
                      placeholder="你是一个专业的数据抓取助手，擅长从网站中提取公司联系信息。请按照以下格式提取信息：公司名称、网站、地址、电话、联系人、职位。请始终以JSON格式返回结果。"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="claude-user-prompt">用户提示词模板</Label>
                    <Textarea
                      id="claude-user-prompt"
                      className="h-40"
                      placeholder="请从以下网站抓取公司联系信息：{url}。如果无法访问网站，请尝试从其他来源查找该公司的信息。"
                    />
                    <p className="text-xs text-muted-foreground">
                      使用 {'{keyword}'}, {'{url}'}, {'{location}'} 等作为变量占位符
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="claude-json-mode" defaultChecked />
                  <Label htmlFor="claude-json-mode">启用JSON模式</Label>
                  <p className="text-xs text-muted-foreground ml-2">
                    (强制模型以有效的JSON格式返回)
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">批处理设置</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="claude-batch-size">批处理大小</Label>
                    <Input
                      id="claude-batch-size"
                      type="number"
                      defaultValue={10}
                    />
                    <p className="text-xs text-muted-foreground">
                      每批处理的数据量
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="claude-parallel">并行请求数</Label>
                    <Input
                      id="claude-parallel"
                      type="number"
                      defaultValue={5}
                    />
                    <p className="text-xs text-muted-foreground">
                      同时处理的批次数
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="claude-auto-retry" defaultChecked />
                  <Label htmlFor="claude-auto-retry">自动重试失败请求</Label>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" className="mr-2">
                  测试API
                </Button>
                <Button onClick={handleSave}>保存配置</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enhanced">
          <Card>
            <CardHeader>
              <CardTitle>Claude增强协议配置</CardTitle>
              <CardDescription>配置增强版Claude API参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="enhanced-api-key">API密钥</Label>
                  <Input
                    id="enhanced-api-key"
                    type="password"
                    placeholder="输入增强协议API密钥"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="enhanced-model">增强模型版本</Label>
                  <Select defaultValue="claude-3-opus-20240229">
                    <SelectTrigger id="enhanced-model">
                      <SelectValue placeholder="选择增强Claude模型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="claude-3-opus-20240229">Claude 3 Opus</SelectItem>
                      <SelectItem value="claude-3-sonnet-20240229">Claude 3 Sonnet</SelectItem>
                      <SelectItem value="claude-3-haiku-20240307">Claude 3 Haiku</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">高级功能</h3>

                <div className="space-y-2">
                  <Label className="text-base">网络访问能力</Label>
                  <p className="text-muted-foreground text-sm mb-2">
                    允许Claude直接访问网络检索信息
                  </p>

                  <div className="flex items-center space-x-2">
                    <Switch id="enhanced-web-access" defaultChecked />
                    <Label htmlFor="enhanced-web-access">启用网络访问</Label>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <Label className="text-base">工具使用能力</Label>
                  <p className="text-muted-foreground text-sm mb-2">
                    允许Claude使用定义的工具
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch id="enhanced-web-search" defaultChecked />
                      <Label htmlFor="enhanced-web-search">网页搜索工具</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="enhanced-web-scraping" defaultChecked />
                      <Label htmlFor="enhanced-web-scraping">网页抓取工具</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="enhanced-email-verify" />
                      <Label htmlFor="enhanced-email-verify">邮箱验证工具</Label>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">数据抽取设置</h3>

                <div className="space-y-2">
                  <Label htmlFor="enhanced-extract-schema">抽取模式 (JSON Schema)</Label>
                  <Textarea
                    id="enhanced-extract-schema"
                    className="h-56 font-mono text-sm"
                    placeholder={`{
  "type": "object",
  "properties": {
    "company": {
      "type": "string",
      "description": "公司名称"
    },
    "website": {
      "type": "string",
      "description": "公司网址"
    },
    "address": {
      "type": "string",
      "description": "公司地址"
    },
    "phone": {
      "type": "string",
      "description": "联系电话"
    },
    "contact": {
      "type": "string",
      "description": "联系人姓名"
    },
    "position": {
      "type": "string",
      "description": "联系人职位"
    }
  },
  "required": ["company", "website"]
}`}
                  />
                  <p className="text-xs text-muted-foreground">
                    定义要抽取的数据结构
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="enhanced-strict-schema" defaultChecked />
                  <Label htmlFor="enhanced-strict-schema">严格模式</Label>
                  <p className="text-xs text-muted-foreground ml-2">
                    (强制完全匹配schema)
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" className="mr-2">
                  测试增强功能
                </Button>
                <Button onClick={handleSave}>保存配置</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>自定义协议配置</CardTitle>
              <CardDescription>配置自定义Claude协议参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="custom-protocol-name">协议名称</Label>
                  <Input id="custom-protocol-name" placeholder="自定义协议名称" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-protocol-version">协议版本</Label>
                  <Input id="custom-protocol-version" placeholder="1.0" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="custom-protocol-endpoint">API端点</Label>
                  <Input
                    id="custom-protocol-endpoint"
                    placeholder="https://api.custom-claude.com/v1"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">自定义请求格式</h3>

                <div className="space-y-2">
                  <Label htmlFor="custom-request-format">请求格式 (JSON)</Label>
                  <Textarea
                    id="custom-request-format"
                    className="h-56 font-mono text-sm"
                    placeholder={`{
  "model": "claude-custom",
  "max_tokens": 4096,
  "temperature": 0.7,
  "system": "你是一个专业的数据抓取助手",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "请从以下网站抓取数据: {url}"
        }
      ]
    }
  ],
  "tools": [
    {
      "name": "web_search",
      "description": "搜索网络信息"
    },
    {
      "name": "web_browser",
      "description": "浏览网页内容"
    }
  ]
}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-response-handling">响应处理代码</Label>
                  <Textarea
                    id="custom-response-handling"
                    className="h-40 font-mono text-sm"
                    placeholder={`// 处理API响应
function processResponse(response) {
  const data = response.content?.[0]?.text || "";
  
  try {
    // 尝试解析JSON
    return JSON.parse(data);
  } catch (e) {
    // 尝试从文本中提取结构化数据
    const company = extractField(data, "公司名称");
    const website = extractField(data, "网址");
    // ...其他字段提取
    
    return { company, website, ... };
  }
}`}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">认证设置</h3>

                <div className="space-y-2">
                  <Label htmlFor="custom-auth-type">认证类型</Label>
                  <Select defaultValue="bearer">
                    <SelectTrigger id="custom-auth-type">
                      <SelectValue placeholder="选择认证类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bearer">Bearer Token</SelectItem>
                      <SelectItem value="api-key">API Key</SelectItem>
                      <SelectItem value="basic">Basic Auth</SelectItem>
                      <SelectItem value="custom">自定义认证</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-auth-key">认证密钥</Label>
                  <Input
                    id="custom-auth-key"
                    type="password"
                    placeholder="输入认证密钥"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-auth-header">自定义认证头</Label>
                  <Input
                    id="custom-auth-header"
                    placeholder="X-Custom-Auth"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" className="mr-2">
                  验证自定义协议
                </Button>
                <Button onClick={handleSave}>保存配置</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default McpMethod;
