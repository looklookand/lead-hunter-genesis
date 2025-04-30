
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

const AiMethod = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "AI配置已保存",
      description: "您的AI工具抓取设置已成功更新",
    });
  };

  return (
    <div className="container mx-auto p-6 animate-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI模型工具配置</h1>
        <p className="text-muted-foreground">配置基于AI工具的客户信息抓取参数</p>
      </div>

      <Tabs defaultValue="n8n" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
          <TabsTrigger value="n8n">N8N工作流</TabsTrigger>
          <TabsTrigger value="dify">DIFY工具</TabsTrigger>
          <TabsTrigger value="custom">自定义工具</TabsTrigger>
        </TabsList>

        <TabsContent value="n8n">
          <Card>
            <CardHeader>
              <CardTitle>N8N工作流配置</CardTitle>
              <CardDescription>配置基于N8N的工作流</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="n8n-url">N8N实例URL</Label>
                  <Input
                    id="n8n-url"
                    placeholder="https://n8n.yourdomain.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="n8n-api-key">API密钥</Label>
                  <Input
                    id="n8n-api-key"
                    type="password"
                    placeholder="输入N8N API密钥"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="n8n-webhook">Webhook URL</Label>
                  <Input
                    id="n8n-webhook"
                    placeholder="https://n8n.yourdomain.com/webhook/lead-hunter"
                  />
                  <p className="text-xs text-muted-foreground">
                    系统将调用此Webhook来触发工作流
                  </p>
                </div>
              </div>

              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">工作流配置</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="n8n-workflow-id">工作流ID</Label>
                    <Input id="n8n-workflow-id" placeholder="12345" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="n8n-workflow-name">工作流名称</Label>
                    <Input id="n8n-workflow-name" placeholder="LeadHunter数据抓取" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="n8n-parameters">默认参数 (JSON)</Label>
                  <Textarea
                    id="n8n-parameters"
                    className="h-32"
                    placeholder='{"maxResults": 100, "delay": 1000, "parseDetails": true}'
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="n8n-active-workflow" defaultChecked />
                  <Label htmlFor="n8n-active-workflow">启用此工作流</Label>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">AI集成</h3>

                <div className="space-y-2">
                  <Label htmlFor="n8n-ai-node">AI节点类型</Label>
                  <Select defaultValue="openai">
                    <SelectTrigger id="n8n-ai-node">
                      <SelectValue placeholder="选择AI节点类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI</SelectItem>
                      <SelectItem value="claude">Claude</SelectItem>
                      <SelectItem value="gemini">Google Gemini</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="n8n-prompt-template">提示词模板</Label>
                  <Textarea
                    id="n8n-prompt-template"
                    className="h-40"
                    placeholder="请从以下网站抓取公司联系信息，包括公司名称、地址、电话、联系人和职位：{{url}}"
                  />
                  <p className="text-xs text-muted-foreground">
                    使用 {{keyword}}, {{url}} 等作为变量占位符
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" className="mr-2">
                  测试工作流
                </Button>
                <Button onClick={handleSave}>保存配置</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dify">
          <Card>
            <CardHeader>
              <CardTitle>DIFY工具配置</CardTitle>
              <CardDescription>配置基于DIFY的AI工具</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dify-url">DIFY实例URL</Label>
                  <Input
                    id="dify-url"
                    placeholder="https://dify.yourdomain.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dify-api-key">API密钥</Label>
                  <Input
                    id="dify-api-key"
                    type="password"
                    placeholder="输入DIFY API密钥"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dify-app-id">应用ID</Label>
                  <Input id="dify-app-id" placeholder="app-123456" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dify-api-endpoint">API端点</Label>
                  <Select defaultValue="chat">
                    <SelectTrigger id="dify-api-endpoint">
                      <SelectValue placeholder="选择API端点" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chat">对话API</SelectItem>
                      <SelectItem value="completion">补全API</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">模型配置</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="dify-model">默认模型</Label>
                    <Select defaultValue="gpt-4">
                      <SelectTrigger id="dify-model">
                        <SelectValue placeholder="选择默认模型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dify-temperature">温度</Label>
                    <Input
                      id="dify-temperature"
                      type="number"
                      defaultValue={0.7}
                      min={0}
                      max={1}
                      step={0.1}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dify-system-prompt">系统提示词</Label>
                  <Textarea
                    id="dify-system-prompt"
                    className="h-32"
                    placeholder="你是一个专业的数据抓取助手，擅长从网站中提取公司联系信息。请按照以下格式提取信息：公司名称、网站、地址、电话、联系人、职位。"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="dify-streaming" defaultChecked />
                  <Label htmlFor="dify-streaming">启用流式响应</Label>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">工具配置</h3>

                <div className="flex items-center space-x-2">
                  <Switch id="dify-web-search" defaultChecked />
                  <Label htmlFor="dify-web-search">启用网页搜索</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="dify-web-reader" defaultChecked />
                  <Label htmlFor="dify-web-reader">启用网页阅读器</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="dify-web-browser" />
                  <Label htmlFor="dify-web-browser">启用网页浏览器</Label>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" className="mr-2">
                  测试连接
                </Button>
                <Button onClick={handleSave}>保存配置</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>自定义AI工具配置</CardTitle>
              <CardDescription>配置自定义AI工具参数</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="custom-tool-name">工具名称</Label>
                  <Input id="custom-tool-name" placeholder="输入工具名称" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-tool-type">工具类型</Label>
                  <Select defaultValue="api">
                    <SelectTrigger id="custom-tool-type">
                      <SelectValue placeholder="选择工具类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="api">API服务</SelectItem>
                      <SelectItem value="webhook">Webhook</SelectItem>
                      <SelectItem value="script">自定义脚本</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="custom-endpoint">服务端点</Label>
                  <Input
                    id="custom-endpoint"
                    placeholder="https://your-custom-tool.com/api"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-auth-type">认证类型</Label>
                  <Select defaultValue="bearer">
                    <SelectTrigger id="custom-auth-type">
                      <SelectValue placeholder="选择认证类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">无认证</SelectItem>
                      <SelectItem value="bearer">Bearer Token</SelectItem>
                      <SelectItem value="apikey">API Key</SelectItem>
                      <SelectItem value="basic">基本认证</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-token">认证令牌</Label>
                  <Input
                    id="custom-token"
                    type="password"
                    placeholder="输入认证令牌"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">AI模型配置</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="custom-ai-provider">AI提供商</Label>
                    <Select defaultValue="openai">
                      <SelectTrigger id="custom-ai-provider">
                        <SelectValue placeholder="选择AI提供商" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">OpenAI</SelectItem>
                        <SelectItem value="anthropic">Anthropic (Claude)</SelectItem>
                        <SelectItem value="google">Google (Gemini)</SelectItem>
                        <SelectItem value="custom">自定义模型</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom-ai-model">模型名称</Label>
                    <Input id="custom-ai-model" placeholder="gpt-4" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom-max-tokens">最大Token</Label>
                    <Input
                      id="custom-max-tokens"
                      type="number"
                      defaultValue={2048}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom-temperature">温度</Label>
                    <Input
                      id="custom-temperature"
                      type="number"
                      defaultValue={0.5}
                      min={0}
                      max={1}
                      step={0.1}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">输入输出配置</h3>

                <div className="space-y-2">
                  <Label htmlFor="custom-input-format">请求格式</Label>
                  <Textarea
                    id="custom-input-format"
                    className="h-32 font-mono text-sm"
                    placeholder={`{
  "inputs": {
    "query": "{{keyword}}",
    "location": "{{location}}"
  },
  "parameters": {
    "max_results": 50
  }
}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-output-format">输出格式</Label>
                  <Textarea
                    id="custom-output-format"
                    className="h-32 font-mono text-sm"
                    placeholder={`{
  "company": "公司名称",
  "website": "网址",
  "address": "地址",
  "phone": "电话",
  "contact": "联系人",
  "position": "职位"
}`}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" className="mr-2">
                  测试工具
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

export default AiMethod;
