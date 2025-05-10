import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const AiMethod = () => {
  return (
    <div className="container mx-auto p-6 animate-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI 方法配置</h1>
        <p className="text-muted-foreground">配置 AI 工具以进行客户信息抓取</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI 工具设置</CardTitle>
          <CardDescription>配置 AI 工具的参数</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="ai-tool">AI 工具</Label>
              <Select defaultValue="n8n">
                <SelectTrigger id="ai-tool">
                  <SelectValue placeholder="选择 AI 工具" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="n8n">N8N 工作流</SelectItem>
                  <SelectItem value="dify">DIFY 工具</SelectItem>
                  <SelectItem value="custom">自定义 AI 工具</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="ai-model">AI 模型</Label>
              <Select defaultValue="gpt4">
                <SelectTrigger id="ai-model">
                  <SelectValue placeholder="选择 AI 模型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt4">GPT-4</SelectItem>
                  <SelectItem value="claude">Claude</SelectItem>
                  <SelectItem value="gemini">Google Gemini</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor="ai-prompt">AI 提示词</Label>
                <Button size="sm" variant="ghost">编辑</Button>
              </div>
              <Textarea
                id="ai-prompt"
                className="font-mono text-sm"
                defaultValue="搜索{keyword}在{location}地区的公司信息，包括联系方式和网址"
              />
            </div>

            <Separator />

            <div className="flex items-center space-x-2">
              <Checkbox id="ai-enhanced" />
              <Label htmlFor="ai-enhanced">启用增强功能</Label>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>保存设置</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AiMethod;
