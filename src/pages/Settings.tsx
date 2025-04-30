
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "设置已保存",
      description: "您的配置已成功更新"
    });
  };

  return (
    <div className="container mx-auto p-6 animate-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">系统设置</h1>
        <p className="text-muted-foreground">配置抓取方法和数据字段设置</p>
      </div>

      <Tabs defaultValue="fields" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
          <TabsTrigger value="fields">数据字段</TabsTrigger>
          <TabsTrigger value="methods">抓取方法</TabsTrigger>
          <TabsTrigger value="system">系统设置</TabsTrigger>
        </TabsList>

        <TabsContent value="fields">
          <Card>
            <CardHeader>
              <CardTitle>数据字段配置</CardTitle>
              <CardDescription>管理抓取数据的字段设置</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">当前字段</h3>
                    <Button variant="outline" size="sm">添加字段</Button>
                  </div>

                  <div className="border rounded-md">
                    <div className="bg-muted/50 px-4 py-3 flex items-center justify-between">
                      <div className="font-medium">字段名称</div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">启用</div>
                        <div className="text-sm text-muted-foreground">必填</div>
                        <div className="text-sm text-muted-foreground w-16">操作</div>
                      </div>
                    </div>
                    
                    {[
                      { name: "公司名称", enabled: true, required: true },
                      { name: "网址", enabled: true, required: true },
                      { name: "地址", enabled: true, required: false },
                      { name: "电话", enabled: true, required: false },
                      { name: "联系人", enabled: true, required: false },
                      { name: "职位", enabled: true, required: false },
                    ].map((field, index) => (
                      <div 
                        key={index}
                        className="px-4 py-3 flex items-center justify-between border-t"
                      >
                        <div className="font-medium">
                          {field.name}
                          {field.required && (
                            <Badge variant="outline" className="ml-2 bg-red-50 text-red-600 border-red-200">
                              必填
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <Switch checked={field.enabled} />
                          <Switch checked={field.required} />
                          <div className="flex gap-2 w-16">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <span className="sr-only">编辑</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <span className="sr-only">删除</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleSave}>保存字段设置</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>API抓取配置</CardTitle>
                    <CardDescription>配置API抓取方式的参数</CardDescription>
                  </div>
                  <Badge className="bg-blue-50 text-blue-600 border-blue-200">API</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API密钥</Label>
                  <Input id="api-key" type="password" placeholder="输入API密钥" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="api-endpoint">API端点</Label>
                  <Input id="api-endpoint" placeholder="https://api.example.com/v1" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="api-rate-limit">请求限制</Label>
                  <Input id="api-rate-limit" type="number" defaultValue={60} />
                  <p className="text-sm text-muted-foreground">每分钟最大请求次数</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="api-enable" />
                  <Label htmlFor="api-enable">启用API抓取</Label>
                </div>

                <Button className="w-full" onClick={handleSave}>保存API配置</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>AI工具配置</CardTitle>
                    <CardDescription>配置AI模型工具的参数</CardDescription>
                  </div>
                  <Badge className="bg-green-50 text-green-600 border-green-200">AI</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ai-endpoint">工作流端点</Label>
                  <Input id="ai-endpoint" placeholder="https://n8n.example.com/webhook/..." />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ai-token">访问令牌</Label>
                  <Input id="ai-token" type="password" placeholder="输入访问令牌" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ai-model">默认模型</Label>
                  <Input id="ai-model" placeholder="gpt-4" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="ai-enable" />
                  <Label htmlFor="ai-enable">启用AI工具抓取</Label>
                </div>

                <Button className="w-full" onClick={handleSave}>保存AI配置</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>MCP服务配置</CardTitle>
                    <CardDescription>配置Claude协议的参数</CardDescription>
                  </div>
                  <Badge className="bg-purple-50 text-purple-600 border-purple-200">MCP</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mcp-key">API密钥</Label>
                  <Input id="mcp-key" type="password" placeholder="输入Claude API密钥" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mcp-model">模型版本</Label>
                  <Input id="mcp-model" placeholder="claude-3-opus-20240229" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mcp-temp">温度值</Label>
                  <Input id="mcp-temp" type="number" defaultValue={0.7} step={0.1} min={0} max={1} />
                  <p className="text-sm text-muted-foreground">控制输出的随机性 (0-1)</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="mcp-enable" defaultChecked />
                  <Label htmlFor="mcp-enable">启用MCP服务抓取</Label>
                </div>

                <Button className="w-full" onClick={handleSave}>保存MCP配置</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>系统设置</CardTitle>
              <CardDescription>配置系统全局参数</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">基本设置</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timeout">请求超时(秒)</Label>
                      <Input id="timeout" type="number" defaultValue={30} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="max-retries">最大重试次数</Label>
                      <Input id="max-retries" type="number" defaultValue={3} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="threads">并发线程数</Label>
                      <Input id="threads" type="number" defaultValue={5} />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="results-per-page">每页结果数</Label>
                      <Input id="results-per-page" type="number" defaultValue={20} />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">高级设置</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>代理设置</Label>
                        <p className="text-sm text-muted-foreground">
                          为请求配置HTTP代理
                        </p>
                      </div>
                      <Switch id="proxy-enable" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>数据缓存</Label>
                        <p className="text-sm text-muted-foreground">
                          启用本地数据缓存以提高性能
                        </p>
                      </div>
                      <Switch id="cache-enable" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>调试模式</Label>
                        <p className="text-sm text-muted-foreground">
                          启用详细日志记录和错误报告
                        </p>
                      </div>
                      <Switch id="debug-mode" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>自动保存抓取结果</Label>
                        <p className="text-sm text-muted-foreground">
                          抓取完成后自动保存结果
                        </p>
                      </div>
                      <Switch id="auto-save" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSave}>保存系统设置</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
