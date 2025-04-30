
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { CheckCheck, CheckCircle } from "lucide-react";

const AiMethod = () => {
  const { toast } = useToast();
  const [aiModel, setAiModel] = useState<string>("gpt4");
  const [activeTab, setActiveTab] = useState<string>("settings");
  
  // 示例提示词模版
  const promptTemplates = [
    {
      id: "basic",
      name: "基础提示词",
      description: "基本的客户信息抓取提示词",
      content: "请帮我搜索关于{keyword}的公司，我需要了解它们的联系方式、官网和地址。"
    },
    {
      id: "detailed",
      name: "详细提示词",
      description: "包含更多详细要求的提示词",
      content: "我正在寻找{location}地区的{keyword}相关公司。请提供公司名称、官网、联系电话、联系人、电子邮箱和详细地址。如果可能，也请提供他们的社交媒体账号。"
    },
    {
      id: "custom",
      name: "自定义提示词",
      description: "您可以自定义提示词",
      content: ""
    }
  ];
  
  // 示例AI工具配置
  const aiTools = [
    { id: "n8n", name: "N8N 工作流" },
    { id: "dify", name: "DIFY 工具" },
    { id: "alfred", name: "Alfred 机器人" },
    { id: "custom", name: "自定义工具" }
  ];
  
  // 示例AI模型
  const aiModels = [
    { id: "gpt4", name: "GPT-4", provider: "OpenAI", tokenLimit: 128000 },
    { id: "gpt4o", name: "GPT-4o", provider: "OpenAI", tokenLimit: 128000 },
    { id: "claude3", name: "Claude 3 Opus", provider: "Anthropic", tokenLimit: 200000 },
    { id: "gemini", name: "Gemini Ultra", provider: "Google", tokenLimit: 32000 },
    { id: "qwen", name: "Qwen Turbo", provider: "Alibaba", tokenLimit: 32000 }
  ];
  
  const [selectedTemplate, setSelectedTemplate] = useState<string>("basic");
  const [customPrompt, setCustomPrompt] = useState<string>("");
  
  const handleSaveSettings = () => {
    toast({
      title: "设置已保存",
      description: "AI抓取方法设置已更新"
    });
  };
  
  const handleTestConnection = () => {
    toast({
      title: "测试连接成功",
      description: "已成功连接到AI模型和工具"
    });
  };
  
  const handlePromptPreview = () => {
    toast({
      description: "预览和测试提示词功能将在下一版本推出"
    });
  };

  return (
    <div className="container mx-auto p-6 animate-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI 抓取方法配置</h1>
        <p className="text-muted-foreground">配置基于AI模型和工具的客户信息抓取方法</p>
      </div>
      
      <Tabs 
        defaultValue="settings"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="settings">基本设置</TabsTrigger>
            <TabsTrigger value="prompt">提示词配置</TabsTrigger>
            <TabsTrigger value="advanced">高级设置</TabsTrigger>
          </TabsList>
          
          <div className="space-x-2">
            <Button variant="outline" onClick={handleTestConnection}>测试连接</Button>
            <Button onClick={handleSaveSettings}>保存设置</Button>
          </div>
        </div>
        
        <TabsContent value="settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI 工具设置</CardTitle>
                <CardDescription>选择并配置用于客户信息抓取的AI工具</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="ai-tool">AI工具类型</Label>
                    <Select defaultValue="n8n">
                      <SelectTrigger id="ai-tool">
                        <SelectValue placeholder="选择AI工具" />
                      </SelectTrigger>
                      <SelectContent>
                        {aiTools.map(tool => (
                          <SelectItem key={tool.id} value={tool.id}>{tool.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="api-url">API接口地址</Label>
                    <Input id="api-url" placeholder="例如: https://n8n.example.com/webhook/..." />
                    <p className="text-xs text-muted-foreground mt-1">
                      该地址用于发送抓取请求到您的AI工具
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="api-key">API密钥</Label>
                    <Input id="api-key" type="password" placeholder="输入API密钥" />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="api-auth" defaultChecked />
                    <Label htmlFor="api-auth">启用API认证</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>AI 模型设置</CardTitle>
                <CardDescription>选择用于客户信息抓取的AI模型</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <RadioGroup 
                    defaultValue="gpt4" 
                    value={aiModel}
                    onValueChange={setAiModel}
                  >
                    {aiModels.map(model => (
                      <div 
                        key={model.id} 
                        className="flex items-center justify-between space-x-2 border rounded-lg p-4 hover:bg-muted/50 cursor-pointer"
                        onClick={() => setAiModel(model.id)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={model.id} id={`model-${model.id}`} />
                          <Label htmlFor={`model-${model.id}`} className="font-medium cursor-pointer">
                            {model.name}
                          </Label>
                        </div>
                        <div className="flex flex-col items-end">
                          <Badge variant="outline">{model.provider}</Badge>
                          <span className="text-xs text-muted-foreground mt-1">
                            {model.tokenLimit.toLocaleString()} 字符限制
                          </span>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                  
                  <div>
                    <Label htmlFor="temperature">温度值</Label>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">精确</span>
                      <input 
                        type="range" 
                        id="temperature" 
                        min="0" 
                        max="20" 
                        defaultValue="7" 
                        className="flex-1"
                      />
                      <span className="text-sm">创意</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      较低的数值产生更精确的结果，较高的数值产生更多样化的结果
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="prompt">
          <Card>
            <CardHeader>
              <CardTitle>提示词配置</CardTitle>
              <CardDescription>
                自定义AI生成客户信息的提示词，使用{"{keyword}"}和{"{location}"}作为变量占位符
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="prompt-template">选择提示词模板</Label>
                  <Select 
                    defaultValue="basic"
                    value={selectedTemplate}
                    onValueChange={setSelectedTemplate}
                  >
                    <SelectTrigger id="prompt-template">
                      <SelectValue placeholder="选择提示词模板" />
                    </SelectTrigger>
                    <SelectContent>
                      {promptTemplates.map(template => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="prompt-content">提示词内容</Label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handlePromptPreview}
                    >
                      预览效果
                    </Button>
                  </div>
                  <textarea
                    id="prompt-content"
                    rows={8}
                    className="w-full min-h-[200px] p-4 rounded-md border resize-y"
                    value={
                      selectedTemplate === "custom" 
                        ? customPrompt 
                        : promptTemplates.find(t => t.id === selectedTemplate)?.content
                    }
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    disabled={selectedTemplate !== "custom"}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    提示: 使用{"{keyword}"}插入搜索关键词，使用{"{location}"}插入地区信息
                  </p>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">提示词变量</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="cursor-pointer" onClick={() => {
                      if (selectedTemplate === "custom") {
                        setCustomPrompt(customPrompt + "{keyword}");
                      }
                    }}>
                      {"{keyword}"} - 搜索关键词
                    </Badge>
                    <Badge className="cursor-pointer" onClick={() => {
                      if (selectedTemplate === "custom") {
                        setCustomPrompt(customPrompt + "{location}");
                      }
                    }}>
                      {"{location}"} - 地区信息
                    </Badge>
                    <Badge className="cursor-pointer" onClick={() => {
                      if (selectedTemplate === "custom") {
                        setCustomPrompt(customPrompt + "{fields}");
                      }
                    }}>
                      {"{fields}"} - 抓取字段
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>保存提示词配置</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>高级设置</CardTitle>
              <CardDescription>配置AI抓取的高级参数</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="max-tokens">最大字符数</Label>
                    <Input id="max-tokens" type="number" defaultValue={4000} />
                    <p className="text-xs text-muted-foreground mt-1">
                      AI响应的最大字符数限制
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="max-results">结果数量限制</Label>
                    <Input id="max-results" type="number" defaultValue={50} />
                    <p className="text-xs text-muted-foreground mt-1">
                      每次搜索返回的最大结果数量
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="enable-cache" defaultChecked />
                    <div>
                      <Label htmlFor="enable-cache">启用结果缓存</Label>
                      <p className="text-xs text-muted-foreground">
                        缓存搜索结果以提高后续查询速度
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="retry-count">重试次数</Label>
                    <Input id="retry-count" type="number" defaultValue={3} />
                    <p className="text-xs text-muted-foreground mt-1">
                      失败时自动重试的次数
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="timeout">请求超时（秒）</Label>
                    <Input id="timeout" type="number" defaultValue={60} />
                    <p className="text-xs text-muted-foreground mt-1">
                      AI请求的最大等待时间
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="enable-log" defaultChecked />
                    <div>
                      <Label htmlFor="enable-log">启用详细日志</Label>
                      <p className="text-xs text-muted-foreground">
                        记录详细的API调用和响应日志
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>保存高级设置</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AiMethod;
